import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LAN — Party Photo Gallery',
  description:
    'LAN party photo gallery by Joseph Gitau. Event recaps, setup photos, and gaming sessions with the crew.',
  openGraph: {
    title: 'LAN — Joseph Gitau',
    description:
      'LAN party photo gallery: event recaps, battlestation setups, and gaming sessions.',
    images: [{ url: 'https://josephgitauc.vercel.app/opengraph-image.png', width: 1200, height: 630, alt: 'LAN — Joseph Gitau' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LAN — Joseph Gitau',
    description:
      'LAN party photo gallery: event recaps, battlestation setups, and gaming sessions.',
    images: ['https://josephgitauc.vercel.app/opengraph-image.png'],
  },
};

export default function LanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
