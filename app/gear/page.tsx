'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';

import Header from "../Components/header";
import Footer from "../Components/footer";
import GearLoader from "../Components/game/loader";
import GearShowcase from "../Components/game/GearShowcase";
import { gearItems } from '@/lib/gear-data';
import type { GearCategory, GearItem } from '@/lib/gear-data';

const sectionConfig: { id: string; label: string; hint: string; filter: GearCategory }[] = [
  { id: 'rigs', label: 'SYSTEMS', hint: 'PRIMARY + SECONDARY', filter: 'system' },
  { id: 'keyboards', label: 'KEYBOARDS', hint: 'ACTIVE + RETIRED', filter: 'keyboard' },
  { id: 'mice', label: 'MICE', hint: 'COMPETITIVE + DAILY + LEGACY', filter: 'mouse' },
  { id: 'audio', label: 'AUDIO', hint: 'IEMS + HEADSET', filter: 'audio' },
  { id: 'display', label: 'DISPLAY', hint: 'MAIN MONITOR', filter: 'display' },
  { id: 'power', label: 'POWER', hint: 'UPS + PROTECTION', filter: 'power' },
];

function SectionBlock({
  id, label, hint, children,
}: {
  id: string; label: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="rog-section scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16">
        <div className="flex items-end justify-between pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-[3px] h-6 bg-[#ff1a1a]" />
            <span className="text-xs font-black tracking-[0.35em] uppercase rog-accent">
              {label}
            </span>
          </div>
          {hint && (
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/25">
              {hint}
            </span>
          )}
        </div>
        <div className="rog-divider" />
      </div>
      {children}
    </section>
  );
}

function GearCardWrapper({ item }: { item: GearItem }) {
  return (
    <div className="relative group/card">
      <Link href={`/gear/${item.slug}`} className="block">
        <GearShowcase item={item} />
      </Link>

      <div className="flex justify-center py-6">
        <Link
          href={`/gear/${item.slug}`}
          className="inline-flex items-center gap-2 px-6 py-3 text-[10px] font-black tracking-[0.25em] uppercase border border-white/[0.1] text-zinc-400 hover:text-white hover:border-[#ff1a1a]/50 transition-all duration-300 group/btn"
        >
          VIEW DETAILS
          <span className="group-hover/btn:translate-x-1 transition-transform duration-300">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}

export default function GearPage() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-[#ff1a1a] selection:text-black">
      <AnimatePresence mode="wait">
        {loading && <GearLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className={`transition-opacity duration-700 ${loading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        <Header />

        <main className="flex flex-col">
          {sectionConfig.map((section) => {
            const items = gearItems.filter((i) => i.category === section.filter);
            if (items.length === 0) return null;
            return (
              <SectionBlock key={section.id} id={section.id} label={section.label} hint={section.hint}>
                {items.map((item) => (
                  <GearCardWrapper key={item.slug} item={item} />
                ))}
              </SectionBlock>
            );
          })}
        </main>

        <Footer />
      </div>
    </div>
  );
}
