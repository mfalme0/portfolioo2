import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { homelabItems, getHomelabItem, getRelatedHomelabItems } from '@/lib/homelab-data';
import HomelabDetailClient from './client';
import Header from '@/app/Components/header';
import Footer from '@/app/Components/footer';

export async function generateStaticParams() {
  return homelabItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getHomelabItem(slug);
  if (!item) return { title: 'Not Found' };
  return {
    title: `${item.name} — Homelab`,
    description: item.description,
  };
}

export default async function HomelabProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getHomelabItem(slug);
  if (!item) notFound();

  const related = getRelatedHomelabItems(item);

  return (
    <div className="bg-background min-h-screen text-[#fafafa] selection:bg-[#a78bfa] selection:text-[#020202]">
      <Header />
      <HomelabDetailClient item={item} related={related} />
      <Footer />
    </div>
  );
}
