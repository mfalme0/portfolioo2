import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { gearItems, getGearItem, getRelatedGearItems } from '@/lib/gear-data';
import GearDetailClient from './client';
import Header from '@/app/Components/header';
import Footer from '@/app/Components/footer';

export async function generateStaticParams() {
  return gearItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getGearItem(slug);
  if (!item) return { title: 'Not Found' };
  return {
    title: `${item.name} — Gear`,
    description: item.description,
  };
}

export default async function GearProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getGearItem(slug);
  if (!item) notFound();

  const related = getRelatedGearItems(item);

  return (
    <div className="bg-background min-h-screen text-[#fafafa] selection:bg-[#a78bfa] selection:text-[#020202]">
      <Header />
      <GearDetailClient item={item} related={related} />
      <Footer />
    </div>
  );
}
