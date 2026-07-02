import type { MetadataRoute } from 'next';
import { gearItems } from '@/lib/gear-data';
import { homelabItems } from '@/lib/homelab-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://josephgitauc.vercel.app';

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 1 },
    { url: `${baseUrl}/gear`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/homelab`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/LAN`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
  ];

  const gearPages = gearItems.map((item) => ({
    url: `${baseUrl}/gear/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const homelabPages = homelabItems.map((item) => ({
    url: `${baseUrl}/homelab/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...gearPages, ...homelabPages];
}
