import { NextRequest } from 'next/server';
import { db } from '@/db';
import { events, tickets, discountCodes, orders } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { generateId, jsonResponse, errorResponse, parseAmount } from '@/lib/utils';
import { z } from 'zod';

const checkoutSchema = z.object({
  eventId: z.string().min(1),
  items: z.array(z.object({
    ticketId: z.string().min(1),
    quantity: z.number().int().positive(),
  })).min(1),
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  customerPhone: z.string().optional(),
  discountCode: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = checkoutSchema.parse(body);

    const [event] = await db.select().from(events).where(eq(events.id, data.eventId)).limit(1);
    if (!event) return errorResponse('Event not found', 404);
    if (!event.published) return errorResponse('Event is not available', 400);

    let totalAmount = 0;
    let discountAmount = 0;
    let discountCodeId: string | null = null;
    const orderItems: { ticketId: string; name: string; quantity: number; unitPrice: number }[] = [];

    for (const item of data.items) {
      const [ticket] = await db.select().from(tickets).where(eq(tickets.id, item.ticketId)).limit(1);
      if (!ticket) return errorResponse(`Ticket ${item.ticketId} not found`, 404);
      if (ticket.remaining < item.quantity) {
        return errorResponse(`Not enough tickets available for ${ticket.name}`, 400);
      }
      if (item.quantity > ticket.maxPerOrder) {
        return errorResponse(`Max ${ticket.maxPerOrder} tickets per order for ${ticket.name}`, 400);
      }
      const unitPrice = parseAmount(ticket.price);
      totalAmount += unitPrice * item.quantity;
      orderItems.push({ ticketId: ticket.id, name: ticket.name, quantity: item.quantity, unitPrice });
    }

    if (data.discountCode) {
      const [code] = await db.select().from(discountCodes)
        .where(eq(discountCodes.code, data.discountCode.toUpperCase()))
        .limit(1);

      if (code && code.active && (!code.maxUses || code.usedCount < code.maxUses) && (!code.expiresAt || new Date() < code.expiresAt)) {
        if (!code.eventId || code.eventId === data.eventId) {
          discountCodeId = code.id;
          if (code.type === 'percentage') {
            discountAmount = totalAmount * (parseAmount(code.value) / 100);
          } else {
            discountAmount = parseAmount(code.value);
          }
          discountAmount = Math.min(discountAmount, totalAmount);
        }
      }
    }

    const finalAmount = totalAmount - discountAmount;
    const orderId = generateId('ord');

    await db.insert(orders).values({
      id: orderId,
      eventId: data.eventId,
      customerEmail: data.customerEmail,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      totalAmount: String(finalAmount),
      currency: 'KES',
      status: 'pending',
      discountCodeId,
      discountAmount: String(discountAmount),
    });

    for (const item of orderItems) {
      await db.update(tickets)
        .set({ remaining: sql`${tickets.remaining} - ${item.quantity}` })
        .where(eq(tickets.id, item.ticketId));
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || request.headers.get('origin') || 'http://localhost:3000';
    const redirectUrl = `${baseUrl}/LAN/thank-you?order=${orderId}`;

    const IntaSend = require('intasend-node');
    const intasend = new IntaSend(
      process.env.INTASEND_PUBLISHABLE_KEY!,
      process.env.INTASEND_SECRET_KEY!,
      process.env.INTASEND_TEST === 'true',
    );

    const collection = intasend.collection();
    const resp = await collection.charge({
      first_name: data.customerName.split(' ')[0] || data.customerName,
      last_name: data.customerName.split(' ').slice(1).join(' ') || 'N/A',
      email: data.customerEmail,
      host: baseUrl,
      amount: finalAmount,
      currency: 'KES',
      api_ref: orderId,
      redirect_url: redirectUrl,
      method: 'M-PESA',
    });

    await db.update(orders)
      .set({ intasendInvoiceId: resp.invoice?.invoice_id || resp.invoice_id })
      .where(eq(orders.id, orderId));

    return jsonResponse({
      orderId,
      checkoutUrl: resp.url,
      amount: finalAmount,
      currency: 'KES',
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return errorResponse(e.issues.map(i => i.message).join(', '));
    }
    console.error('Checkout error:', e);
    return errorResponse('Failed to create checkout', 500);
  }
}
