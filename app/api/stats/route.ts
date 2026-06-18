import { db } from '@/db';
import { events, orders, attendees, discountCodes } from '@/db/schema';
import { eq, sql, desc } from 'drizzle-orm';
import { requireAdmin } from '@/lib/auth';
import { jsonResponse, errorResponse } from '@/lib/utils';

export async function GET() {
  try {
    await requireAdmin();

    const totalRevenue = await db
      .select({ total: sql<string>`COALESCE(SUM(CAST(${orders.totalAmount} AS DECIMAL)), 0)` })
      .from(orders)
      .where(eq(orders.status, 'paid'));

    const orderStats = await db
      .select({
        status: orders.status,
        count: sql<number>`COUNT(*)::int`,
      })
      .from(orders)
      .groupBy(orders.status);

    const totalAttendees = await db
      .select({ count: sql<number>`COUNT(*)::int` })
      .from(attendees);

    const activeDiscounts = await db
      .select({ count: sql<number>`COUNT(*)::int` })
      .from(discountCodes)
      .where(eq(discountCodes.active, true));

    const recentOrders = await db
      .select()
      .from(orders)
      .orderBy(desc(orders.createdAt))
      .limit(5);

    const eventList = await db
      .select({
        id: events.id,
        title: events.title,
        slug: events.slug,
        date: events.date,
        published: events.published,
        ticketCount: sql<number>`(SELECT COUNT(*)::int FROM ${attendees} WHERE ${attendees.eventId} = ${events.id})`,
        revenue: sql<string>`COALESCE((SELECT SUM(CAST(${orders.totalAmount} AS DECIMAL)) FROM ${orders} WHERE ${orders.eventId} = ${events.id} AND ${orders.status} = 'paid'), 0)`,
      })
      .from(events)
      .orderBy(desc(events.date));

    return jsonResponse({
      totalRevenue: totalRevenue[0]?.total || '0',
      orderStats,
      totalAttendees: totalAttendees[0]?.count || 0,
      activeDiscounts: activeDiscounts[0]?.count || 0,
      recentOrders,
      events: eventList,
    });
  } catch {
    return errorResponse('Unauthorized', 401);
  }
}
