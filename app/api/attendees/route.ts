import { NextRequest } from 'next/server';
import { db } from '@/db';
import { attendees, events } from '@/db/schema';
import { eq, desc, sql } from 'drizzle-orm';
import { requireAdmin } from '@/lib/auth';
import { jsonResponse, errorResponse } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get('eventId');

    const where = eventId ? eq(attendees.eventId, eventId) : undefined;
    const result = await db.select({
      id: attendees.id,
      ticketNumber: attendees.ticketNumber,
      name: attendees.name,
      email: attendees.email,
      phone: attendees.phone,
      checkedIn: attendees.checkedIn,
      checkedInAt: attendees.checkedInAt,
      createdAt: attendees.createdAt,
      eventId: attendees.eventId,
      orderId: attendees.orderId,
      ticketId: attendees.ticketId,
    }).from(attendees).where(where).orderBy(desc(attendees.createdAt));

    const eventMap: Record<string, string> = {};
    if (!eventId) {
      const allEvents = await db.select({ id: events.id, title: events.title }).from(events);
      for (const e of allEvents) eventMap[e.id] = e.title;
    } else {
      const [evt] = await db.select({ title: events.title }).from(events).where(eq(events.id, eventId)).limit(1);
      if (evt) eventMap[eventId] = evt.title;
    }

    return jsonResponse({ attendees: result, eventMap });
  } catch {
    return errorResponse('Unauthorized', 401);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return errorResponse('Attendee ID required');

    await db.delete(attendees).where(eq(attendees.id, id));
    return jsonResponse({ success: true });
  } catch {
    return errorResponse('Unauthorized', 401);
  }
}
