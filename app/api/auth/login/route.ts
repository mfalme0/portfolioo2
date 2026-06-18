import { NextRequest } from 'next/server';
import { db } from '@/db';
import { admin } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { verifyPassword, signToken, setAuthCookie } from '@/lib/auth';
import { jsonResponse, errorResponse } from '@/lib/utils';
import { z } from 'zod';

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = schema.parse(body);

    const user = await db.select().from(admin).where(eq(admin.username, username)).limit(1);
    if (user.length === 0) {
      return errorResponse('Invalid credentials', 401);
    }

    const valid = await verifyPassword(password, user[0].passwordHash);
    if (!valid) {
      return errorResponse('Invalid credentials', 401);
    }

    const token = signToken({ username: user[0].username, role: 'admin' });
    const response = jsonResponse({ success: true });
    response.cookies.set(setAuthCookie(token));
    return response;
  } catch {
    return errorResponse('Invalid request', 400);
  }
}
