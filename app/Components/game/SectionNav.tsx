'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface NavItem {
  id: string;
  label: string;
}

export default function SectionNav({ items, accent }: { items: NavItem[]; accent: string }) {
  const [active, setActive] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (items.length === 0) return null;

  return (
    <div className="sticky top-[76px] md:top-[88px] z-30 w-full flex justify-center pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/10 bg-black/55 backdrop-blur-xl px-1.5 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className="relative px-3.5 py-1.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-300"
              style={{ color: isActive ? '#050505' : 'rgba(255,255,255,0.5)' }}
            >
              {isActive && (
                <motion.span
                  layoutId="gear-nav-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: accent }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
