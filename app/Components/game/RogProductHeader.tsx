'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface TabItem {
  id: string;
  label: string;
}

export default function RogProductHeader({
  name,
  category,
  tabs,
  accent = '#FF003C',
}: {
  name: string;
  category: string;
  tabs: TabItem[];
  accent?: string;
}) {
  const [active, setActive] = useState(tabs[0]?.id ?? '');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const els = tabs.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [tabs]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!scrolled) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        backgroundColor: 'rgba(5,5,8,0.85)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-14 gap-4">
          {/* Product name */}
          <Link
            href={`/gear`}
            className="shrink-0 text-xs font-black tracking-[0.15em] uppercase"
            style={{ color: accent }}
          >
            {name}
          </Link>

          <span className="shrink-0 w-px h-5 bg-white/10" />

          {/* Category */}
          <span className="text-[9px] font-mono tracking-wider text-zinc-600 uppercase shrink-0">
            {category}
          </span>

          <div className="flex-1" />

          {/* Desktop tabs */}
          <nav className="hidden md:flex items-center gap-0">
            {tabs.map((tab) => {
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => scrollTo(tab.id)}
                  className="relative px-4 py-1 text-[10px] font-bold tracking-[0.15em] uppercase transition-colors duration-300"
                  style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.4)' }}
                >
                  {tab.label}
                  {isActive && (
                    <motion.span
                      layoutId="product-header-underline"
                      className="absolute left-2 right-2 -bottom-[1px] h-[2px] rounded-full"
                      style={{ backgroundColor: accent, boxShadow: `0 0 6px ${accent}66` }}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
