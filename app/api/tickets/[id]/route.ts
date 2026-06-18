import { NextRequest } from 'next/server';
import { db } from '@/db';
import { tickets } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [ticket] = await db.select().from(tickets).where(eq(tickets.id, id)).limit(1);
  if (!ticket) return Response.json({ error: 'Ticket not found' }, { status: 404 });
  return Response.json(ticket);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const allowed = ['name', 'description', 'price', 'currency', 'quantity', 'remaining', 'maxPerOrder'];
    const updates: Record<string, unknown> = {};
    for (const key of allowed) {
      if (body[key] !== undefined) updates[key] = body[key];
    }
    await db.update(tickets).set(updates).where(eq(tickets.id, id));
    const [ticket] = await db.select().from(tickets).where(eq(tickets.id, id)).limit(1);
    return Response.json(ticket);
  } catch {
    return Response.json({ error: 'Failed to update ticket' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.delete(tickets).where(eq(tickets.id, id));
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Failed to delete ticket' }, { status: 500 });
  }
}
