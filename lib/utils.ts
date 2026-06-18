import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';

export function generateId(prefix?: string): string {
  const id = nanoid(16);
  return prefix ? `${prefix}_${id}` : id;
}

export function generateTicketNumber(eventSlug: string): string {
  const num = nanoid(8).toUpperCase();
  return `${eventSlug.toUpperCase()}-${num}`;
}

export function jsonResponse(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function parseAmount(amount: string | number): number {
  return typeof amount === 'string' ? parseFloat(amount) : amount;
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(date: Date | string): string {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });
}
