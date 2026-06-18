import { NextRequest } from 'next/server';
import { db } from '@/db';
import { discountCodes } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { generateId, jsonResponse, errorResponse } from '@/lib/utils';
import { z } from 'zod';

const discountSchema = z.object({
  code: z.string().min(1).transform(v => v.toUpperCase()),
  type: z.enum(['percentage', 'fixed']),
  value: z.string().or(z.number()),
  eventId: z.string().optional().nullable(),
  maxUses: z.number().int().positive().optional().nullable(),
  expiresAt: z.string().datetime().optional().nullable(),
  active: z.boolean().default(true),
});

export async function GET() {
  const result = await db.select().from(discountCodes).orderBy(desc(discountCodes.createdAt));
  return jsonResponse(result);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = discountSchema.parse(body);

    const existing = await db.select().from(discountCodes).where(eq(discountCodes.code, data.code)).limit(1);
    if (existing.length > 0) {
      return errorResponse('Discount code already exists', 409);
    }

    const id = generateId('dsc');
    await db.insert(discountCodes).values({
      id,
      code: data.code,
      type: data.type,
      value: String(data.value),
      eventId: data.eventId || null,
      maxUses: data.maxUses || null,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      active: data.active,
    });

    const [code] = await db.select().from(discountCodes).where(eq(discountCodes.id, id)).limit(1);
    return jsonResponse(code, 201);
  } catch (e) {
    if (e instanceof z.ZodError) return errorResponse(e.issues.map(i => i.message).join(', '));
    return errorResponse('Failed to create discount code', 500);
  }
}
