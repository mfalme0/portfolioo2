import { NextRequest } from 'next/server';
import { db } from '@/db';
import { orders, attendees } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { jsonResponse, errorResponse } from '@/lib/utils';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('id');
  const eventId = searchParams.get('eventId');

  try {
    if (orderId) {
      const [order] = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
      if (!order) return errorResponse('Order not found', 404);
      const orderAttendees = await db.select().from(attendees).where(eq(attendees.orderId, orderId));
      return jsonResponse({ ...order, attendees: orderAttendees });
    }

    const where = eventId ? eq(orders.eventId, eventId) : undefined;
    const result = await db.select().from(orders).where(where).orderBy(desc(orders.createdAt));
    return jsonResponse(result);
  } catch {
    return errorResponse('Failed to fetch orders', 500);
  }
}
