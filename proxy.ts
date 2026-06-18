import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

const protectedPaths = ['/LAN/admin/dashboard', '/LAN/admin/events', '/LAN/admin/orders', '/LAN/admin/discounts', '/LAN/admin/attendees'];
const apiProtectedPaths = ['/api/events', '/api/tickets', '/api/discounts', '/api/upload', '/api/stats', '/api/attendees'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedPage = protectedPaths.some(p => pathname.startsWith(p));
  const isApiRoute = apiProtectedPaths.some(p => pathname.startsWith(p));
  const isMutateMethod = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method);
  const isApiProtected = isApiRoute && isMutateMethod;

  if (!isProtectedPage && !isApiProtected) {
    return NextResponse.next();
  }

  const token = request.cookies.get('lan_token')?.value;
  if (!token) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/LAN/admin/login', request.url));
  }

  const session = verifyToken(token);
  if (!session || session.role !== 'admin') {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/LAN/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/LAN/admin/:path*',
    '/api/events/:path*',
    '/api/tickets/:path*',
    '/api/discounts/:path*',
    '/api/upload/:path*',
    '/api/stats/:path*',
    '/api/attendees/:path*',
  ],
};
