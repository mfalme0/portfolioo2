import { NextRequest } from 'next/server';
import { db } from '@/db';
import { events, tickets } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [event] = await db.select().from(events).where(eq(events.id, id)).limit(1);
  if (!event) {
    return Response.json({ error: 'Event not found' }, { status: 404 });
  }
  const eventTickets = await db.select().from(tickets).where(eq(tickets.eventId, id));
  return Response.json({ ...event, ticketTypes: eventTickets });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const allowed = ['title', 'slug', 'description', 'date', 'endDate', 'location', 'bannerUrl', 'posterUrl', 'maxAttendees', 'published'];
    const updates: Record<string, unknown> = {};
    for (const key of allowed) {
      if (body[key] !== undefined) {
        updates[key] = key === 'date' || key === 'endDate' ? new Date(body[key]) : body[key];
      }
    }
    updates.updatedAt = new Date();
    await db.update(events).set(updates).where(eq(events.id, id));
    const [event] = await db.select().from(events).where(eq(events.id, id)).limit(1);
    return Response.json(event);
  } catch {
    return Response.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.delete(events).where(eq(events.id, id));
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
