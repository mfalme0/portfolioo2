import EventDetailClient from './client';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/events?slug=${slug}`, { cache: 'no-store' });
    if (!res.ok) return { title: 'Event Not Found' };
    const event = await res.json();
    return {
      title: `${event.title} - LAN Events`,
      description: event.description,
    };
  } catch {
    return { title: 'Event - LAN Events' };
  }
}

export default async function EventDetailPage({ params }: PageProps) {
  return <EventDetailClient slug={(await params).slug} />;
}
