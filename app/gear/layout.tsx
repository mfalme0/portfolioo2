import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gear — Setup & Equipment',
  description:
    'Explore Joseph Gitau\'s curated gear collection — from custom keyboards and ultrawide monitors to precision mice and studio audio. Every component of the battlestation, documented with specs and stories.',
  openGraph: {
    title: 'Gear — Joseph Gitau',
    description:
      'Full gear showcase: systems, keyboards, mice, audio, displays, and power. Specs, stories, pros/cons for every item.',
    images: [{ url: 'https://josephgitauc.vercel.app/opengraph-image.png', width: 1200, height: 630, alt: 'Gear — Joseph Gitau' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gear — Joseph Gitau',
    description:
      'Full gear showcase: systems, keyboards, mice, audio, displays, and power.',
    images: ['https://josephgitauc.vercel.app/opengraph-image.png'],
  },
};

export default function GearLayout({ children }: { children: React.ReactNode }) {
  return children;
}
