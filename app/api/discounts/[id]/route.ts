import { NextRequest } from 'next/server';
import { db } from '@/db';
import { discountCodes } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const allowed = ['code', 'type', 'value', 'eventId', 'maxUses', 'expiresAt', 'active'];
    const updates: Record<string, unknown> = {};
    for (const key of allowed) {
      if (body[key] !== undefined) {
        if (key === 'expiresAt') updates[key] = body[key] ? new Date(body[key]) : null;
        else updates[key] = body[key];
      }
    }
    await db.update(discountCodes).set(updates).where(eq(discountCodes.id, id));
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.delete(discountCodes).where(eq(discountCodes.id, id));
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
