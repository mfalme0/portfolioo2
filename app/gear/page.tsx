'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import Header from "../Components/header";
import Footer from "../Components/footer";
import PageLoader from "../Components/page-loader";
import SpotlightCard from "../Components/game/SpotlightCard";
import { gearItems } from '@/lib/gear-data';
import type { GearCategory, GearItem } from '@/lib/gear-data';

const catColors: Record<GearCategory, { base: string; label: string }> = {
  system:     { base: '#10B981', label: 'CORE' },
  keyboard:   { base: '#ec4899', label: 'RGB' },
  mouse:      { base: '#06b6d4', label: 'WIRE' },
  audio:      { base: '#8B5CF6', label: 'DEPTH' },
  display:    { base: '#38BDF8', label: 'VISUAL' },
  power:      { base: '#F59E0B', label: 'UTILITY' },
  controller: { base: '#6366f1', label: 'PLAY' },
};

function hexToRgb(hex: string) {
  const v = parseInt(hex.slice(1), 16);
  return [(v >> 16) & 0xff, (v >> 8) & 0xff, v & 0xff] as const;
}

const sections: { id: string; label: string; hint: string; filter: GearCategory; icon: string }[] = [
  { id: 'rigs', label: 'SYSTEMS', hint: 'PRIMARY + SECONDARY', filter: 'system', icon: '⊞' },
  { id: 'keyboards', label: 'KEYBOARDS', hint: 'ACTIVE + RETIRED', filter: 'keyboard', icon: '⌨' },
  { id: 'mice', label: 'MICE', hint: 'COMPETITIVE + DAILY + LEGACY', filter: 'mouse', icon: '◇' },
  { id: 'audio', label: 'AUDIO', hint: 'IEMS + HEADSET', filter: 'audio', icon: '♫' },
  { id: 'display', label: 'DISPLAY', hint: 'MAIN MONITOR', filter: 'display', icon: '⊡' },
  { id: 'power', label: 'POWER', hint: 'UPS + PROTECTION', filter: 'power', icon: '⚡' },
  { id: 'controllers', label: 'CONTROLLERS', hint: 'PS4 + XBOX ONE', filter: 'controller', icon: '⊕' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

function GearCard({ item }: { item: GearItem }) {
  const c = catColors[item.category];
  const [r, g, b] = hexToRgb(c.base);
  const isWide = item.category === 'system' || item.category === 'display';
  const shadowColor = `rgba(${r},${g},${b},0.08)`;
  const borderColor = `rgba(${r},${g},${b},0.15)`;
  const borderHover = `rgba(${r},${g},${b},0.35)`;
  const glowColor = `rgba(${r},${g},${b},0.15)`;
  const isRetired = item.status === 'retired';

  return (
    <motion.div
      variants={cardVariants}
      className={`relative ${isWide ? 'md:col-span-2 lg:col-span-2' : ''} ${isRetired ? 'grayscale opacity-50' : ''}`}
    >
      <SpotlightCard accent={c.base}>
        <Link href={`/gear/${item.slug}`} className="block group h-full">
          <motion.div
            className="relative h-full overflow-hidden rounded-xl border backdrop-blur-sm bg-gradient-to-b from-white/[0.03] via-transparent to-transparent transition-all duration-500 ease-out
              before:absolute before:inset-0 before:rounded-xl before:opacity-0 before:transition-opacity before:duration-500
              before:bg-gradient-to-b before:from-white/[0.02] before:to-transparent group-hover:before:opacity-100"
            style={{ borderColor }}
            whileHover={{
              borderColor: borderHover,
              boxShadow: `0 0 40px -8px ${glowColor}`,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {isRetired && (
              <div className="absolute top-3 right-3 z-20">
                <span className="text-[8px] font-black tracking-[0.2em] uppercase px-2 py-1 rounded-md bg-zinc-900/80 border border-zinc-700/60 text-zinc-500">
                  RETIRED
                </span>
              </div>
            )}

            <div className="p-5 flex flex-col h-full">
              <div className="relative w-full aspect-[4/3] mb-4 rounded-lg overflow-hidden bg-zinc-900/40 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="w-full h-full flex items-center justify-center p-5"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={isWide ? 360 : 260}
                    height={isWide ? 220 : 160}
                    className="object-contain max-h-full w-auto transition-all duration-500"
                    style={{ filter: `drop-shadow(0 8px 24px ${shadowColor})` }}
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              <div className="flex-1 flex flex-col justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold tracking-[0.25em] uppercase opacity-70" style={{ color: c.base }}>
                      {item.category}
                    </span>
                    <span className="w-px h-3 bg-zinc-700/50" />
                    {item.tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[7px] font-mono tracking-[0.15em] uppercase px-1.5 py-0.5 rounded border"
                        style={{ borderColor, color: `rgba(${r},${g},${b},0.4)` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-sm md:text-base font-bold text-white/85 group-hover:text-white transition-colors duration-300 leading-tight tracking-tight">
                    {item.name}
                  </h3>
                  <p className="text-[10px] font-mono text-zinc-500 tracking-wider line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/60">
                  <div className="grid grid-cols-3 gap-2">
                    {item.specs.slice(0, 3).map((s) => (
                      <div key={s.label} className="text-center min-w-0">
                        <div className="text-[7px] font-bold tracking-[0.2em] uppercase text-zinc-600">
                          {s.label}
                        </div>
                        <div className="text-[9px] font-semibold text-zinc-400 mt-0.5 truncate group-hover:text-zinc-300 transition-colors">
                          {s.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="flex items-center gap-1.5 text-[9px] font-bold tracking-[0.2em] uppercase transition-colors duration-300"
                  style={{ color: `rgba(${r},${g},${b},0.5)` }}
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">View Details</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                </div>
              </div>
            </div>
          </motion.div>
        </Link>
      </SpotlightCard>
    </motion.div>
  );
}

function GearSection({ id, label, hint, filter, icon, searchQuery, activeFilter }: {
  id: string; label: string; hint?: string; filter: GearCategory; icon: string;
  searchQuery?: string; activeFilter?: GearCategory | 'all';
}) {
  const items = gearItems.filter((i) => {
    if (activeFilter !== 'all' && i.category !== activeFilter) return false;
    if (i.category !== filter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return i.name.toLowerCase().includes(q) || i.subtitle.toLowerCase().includes(q) || i.tags?.some(t => t.toLowerCase().includes(q));
    }
    return true;
  });
  const c = catColors[filter];
  const [r, g, b] = hexToRgb(c.base);

  if (items.length === 0) return null;

  return (
    <section id={id} className="relative scroll-mt-28">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 0%, rgba(${r},${g},${b},0.06) 0%, transparent 70%)`,
          }}
        />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(${r},${g},${b},0.2) 2px, rgba(${r},${g},${b},0.2) 3px)`,
          }}
        />
        <div
          className="absolute top-0 left-0 w-px h-full"
          style={{ background: `linear-gradient(to bottom, rgba(${r},${g},${b},0.3), transparent)` }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-6">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-[3px] h-7 rounded-full"
            style={{ backgroundColor: c.base, boxShadow: `0 0 10px ${c.base}40` }}
          />
          <span className="text-base font-mono" style={{ color: c.base }}>{icon}</span>
          <span className="text-[11px] font-black tracking-[0.35em] uppercase" style={{ color: c.base }}>
            {label}
          </span>
          <span className="px-2 py-[1px] rounded-sm text-[7px] font-mono tracking-wider uppercase bg-zinc-900/80 border border-zinc-800 text-zinc-500">
            {c.label}
          </span>
          <div className="flex-1" />
          {hint && (
            <span className="hidden md:block text-[8px] font-mono tracking-[0.25em] uppercase text-zinc-600">
              {hint}
            </span>
          )}
        </div>
        <div
          className="h-px w-full"
          style={{
            background: `linear-gradient(to right, rgba(${r},${g},${b},0.35), rgba(${r},${g},${b},0.04), transparent)`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto"
        >
          {items.map((item) => (
            <GearCard key={item.slug} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function GearPage() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<GearCategory | 'all'>('all');

  return (
    <div className="bg-background min-h-screen text-[#fafafa] selection:bg-[#a78bfa] selection:text-[#020202]">
      <AnimatePresence mode="wait">
        {loading && <PageLoader theme="gear" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className={`transition-opacity duration-700 ${loading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        <Header />

        <main className="flex flex-col">
          <div className="relative pt-28 pb-14 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(167,139,250,0.08)_0%,transparent_60%)] pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(167,139,250,0.4) 4px, rgba(167,139,250,0.4) 5px)`,
              }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-zinc-600">
                  {'// EQUIPMENT_MANIFEST'}
                </span>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                  THE GEAR
                </h1>
                <p className="text-xs md:text-sm text-zinc-500 font-mono max-w-xl leading-relaxed">
                  Every machine, peripheral, and component that powers my workflow — documented with full specifications and real-world context.
                </p>
              </div>

              {/* Search + filter bar */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <div className="relative flex-1 max-w-md">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search gear..."
                    className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-xs text-zinc-300 placeholder-zinc-600 font-mono tracking-wider focus:outline-none focus:border-zinc-600 transition-colors"
                  />
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {(['all', ...sections.map(s => s.filter)] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      className={`px-3 py-1.5 rounded-md text-[9px] font-bold tracking-wider uppercase transition-all duration-300 ${
                        activeFilter === f
                          ? 'bg-zinc-200 text-zinc-900'
                          : 'bg-zinc-900/60 text-zinc-500 border border-zinc-800 hover:text-zinc-300'
                      }`}
                    >
                      {f === 'all' ? 'All' : f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {sections.map((section) => (
            <GearSection
              key={section.id}
              id={section.id}
              label={section.label}
              hint={section.hint}
              filter={section.filter}
              icon={section.icon}
              searchQuery={searchQuery}
              activeFilter={activeFilter}
            />
          ))}

          <section className="relative border-t border-white/[0.03]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <p className="text-[7px] font-mono tracking-[0.1em] text-zinc-700 text-center leading-relaxed max-w-2xl mx-auto">
                All product names, logos, brands, and trademarks featured on this page are the property of their respective owners. The use of these names, logos, and brands does not imply endorsement or affiliation. All rights reserved to their respective companies.
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
