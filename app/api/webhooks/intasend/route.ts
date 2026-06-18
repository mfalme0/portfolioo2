import { NextRequest } from 'next/server';
import { db } from '@/db';
import { orders, attendees, tickets, events, discountCodes } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { generateId, generateTicketNumber, jsonResponse } from '@/lib/utils';
import { sendOrderConfirmation } from '@/lib/email';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const invoiceId = body.invoice_id || body.invoice?.invoice_id;
    const trackingId = body.tracking_id;
    const status = body.state || body.status;
    const apiRef = body.api_ref;

    if (!apiRef) {
      return jsonResponse({ received: true });
    }

    if (status === 'COMPLETE' || status === 'complete' || status === 'paid') {
      const [order] = await db.select().from(orders).where(eq(orders.id, apiRef)).limit(1);
      if (!order || order.status === 'paid') {
        return jsonResponse({ received: true });
      }

      await db.update(orders).set({
        status: 'paid',
        intasendInvoiceId: invoiceId || order.intasendInvoiceId,
        intasendTrackingId: trackingId,
        paidAt: new Date(),
      }).where(eq(orders.id, apiRef));

      if (order.discountCodeId) {
        const [code] = await db.select().from(discountCodes).where(eq(discountCodes.id, order.discountCodeId)).limit(1);
        if (code) {
      await db.update(discountCodes).set({
        usedCount: sql`${discountCodes.usedCount} + 1`,
      }).where(eq(discountCodes.id, order.discountCodeId));
        }
      }

      const [event] = await db.select().from(events).where(eq(events.id, order.eventId)).limit(1);
      const eventTickets = await db.select().from(tickets).where(eq(tickets.eventId, order.eventId));

      const attendeeList = [];
      const firstTicket = eventTickets[0];

      if (firstTicket) {
        const id = generateId('att');
        const ticketNumber = generateTicketNumber(event.slug);
        const qrData = JSON.stringify({
          ticketNumber,
          orderId: apiRef,
          eventId: order.eventId,
          attendeeId: id,
        });

        await db.insert(attendees).values({
          id,
          orderId: apiRef,
          ticketId: firstTicket.id,
          eventId: order.eventId,
          name: order.customerName,
          email: order.customerEmail,
          phone: order.customerPhone,
          ticketNumber,
          qrCodeData: qrData,
        });

        attendeeList.push({
          ticketNumber,
          ticketName: firstTicket.name,
          attendeeName: order.customerName,
          qrCodeData: qrData,
        });
      }

      if (attendeeList.length > 0 && event) {
        await sendOrderConfirmation({
          to: order.customerEmail,
          customerName: order.customerName,
          eventTitle: event.title,
          eventDate: event.date.toLocaleDateString(),
          eventLocation: event.location,
          tickets: attendeeList,
          totalAmount: order.totalAmount,
          currency: order.currency,
          orderId: apiRef,
        });
      }
    }

    if (status === 'FAILED' || status === 'failed') {
      await db.update(orders).set({ status: 'failed' }).where(eq(orders.id, apiRef));

      const order = await db.select().from(orders).where(eq(orders.id, apiRef)).limit(1);
      if (order.length > 0) {
      await db.update(tickets)
        .set({ remaining: sql`${tickets.remaining} + 1` })
        .where(eq(tickets.eventId, order[0].eventId));
      }
    }

    return jsonResponse({ received: true });
  } catch (e) {
    console.error('Webhook error:', e);
    return jsonResponse({ received: true });
  }
}
