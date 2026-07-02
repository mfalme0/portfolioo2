import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Homelab — Self-Hosted Infrastructure',
  description:
    'Browse Joseph Gitau\'s homelab services — self-hosted infrastructure running on Proxmox, Docker, and bare metal. Status monitoring, service details, and system architecture.',
  openGraph: {
    title: 'Homelab — Joseph Gitau',
    description:
      'Self-hosted infrastructure dashboard: services, status, resource monitors, and system architecture.',
    images: [{ url: 'https://josephgitauc.vercel.app/opengraph-image.png', width: 1200, height: 630, alt: 'Homelab — Joseph Gitau' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Homelab — Joseph Gitau',
    description:
      'Self-hosted infrastructure dashboard: services, status, resource monitors, and system architecture.',
    images: ['https://josephgitauc.vercel.app/opengraph-image.png'],
  },
};

export default function HomelabLayout({ children }: { children: React.ReactNode }) {
  return children;
}
