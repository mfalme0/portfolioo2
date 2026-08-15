import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/gear',
      },
    ],
    sitemap: 'https://josephgitauc.vercel.app/sitemap.xml',
  };
}
