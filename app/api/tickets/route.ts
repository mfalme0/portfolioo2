import { NextRequest } from 'next/server';
import { db } from '@/db';
import { tickets } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { generateId, jsonResponse, errorResponse } from '@/lib/utils';
import { z } from 'zod';

const ticketSchema = z.object({
  eventId: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.string().or(z.number()),
  currency: z.string().default('KES'),
  quantity: z.number().int().positive(),
  maxPerOrder: z.number().int().positive().default(10),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const eventId = searchParams.get('eventId');
  if (!eventId) return errorResponse('eventId required');

  const result = await db.select().from(tickets).where(eq(tickets.eventId, eventId));
  return jsonResponse(result);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = ticketSchema.parse(body);
    const id = generateId('tkt');
    await db.insert(tickets).values({
      id,
      eventId: data.eventId,
      name: data.name,
      description: data.description,
      price: String(data.price),
      currency: data.currency,
      quantity: data.quantity,
      remaining: data.quantity,
      maxPerOrder: data.maxPerOrder,
    });
    const [ticket] = await db.select().from(tickets).where(eq(tickets.id, id)).limit(1);
    return jsonResponse(ticket, 201);
  } catch (e) {
    if (e instanceof z.ZodError) return errorResponse(e.issues.map(i => i.message).join(', '));
    return errorResponse('Failed to create ticket', 500);
  }
}
