import { NextRequest } from 'next/server';
import { db } from '@/db';
import { events, tickets } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { requireAdmin } from '@/lib/auth';
import { generateId, jsonResponse, errorResponse } from '@/lib/utils';
import { z } from 'zod';

const eventSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  description: z.string().min(1),
  date: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  location: z.string().min(1),
  bannerUrl: z.string().optional(),
  posterUrl: z.string().optional(),
  maxAttendees: z.number().int().positive().optional(),
  published: z.boolean().optional(),
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const includeUnpublished = searchParams.get('all') === 'true';

  try {
    if (includeUnpublished) {
      await requireAdmin();
    }

    const where = slug
      ? eq(events.slug, slug)
      : includeUnpublished ? undefined : eq(events.published, true);

    const result = slug
      ? await db.select().from(events).where(where).limit(1)
      : await db.select().from(events).where(where).orderBy(desc(events.date));

    if (slug && result.length === 0) {
      return errorResponse('Event not found', 404);
    }

    return jsonResponse(slug ? result[0] : result);
  } catch {
    return errorResponse('Unauthorized', 401);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const data = eventSchema.parse(body);

    const id = generateId('evt');
    await db.insert(events).values({
      id,
      ...data,
      date: new Date(data.date),
      endDate: data.endDate ? new Date(data.endDate) : null,
    });

    const event = await db.select().from(events).where(eq(events.id, id)).limit(1);
    return jsonResponse(event[0], 201);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return errorResponse(e.issues.map(i => i.message).join(', '));
    }
    return errorResponse('Failed to create event', 500);
  }
}
