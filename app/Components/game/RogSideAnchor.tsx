'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnchorItem {
  id: string;
  label: string;
}

export default function RogSideAnchor({ items, accent = '#FF003C' }: { items: AnchorItem[]; accent?: string }) {
  const [active, setActive] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-15% 0px -45% 0px', threshold: [0, 0.25, 0.5] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (items.length === 0) return null;

  return (
    <nav className="fixed left-4 sm:left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
      <div className="flex flex-col gap-3 relative">
        {/* Vertical track line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/5" />

        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className="group flex items-center gap-3 transition-all duration-300"
            >
              {/* Dot indicator */}
              <div
                className="relative w-[15px] h-[15px] flex items-center justify-center"
              >
                <div
                  className={`absolute rounded-full transition-all duration-300 ${
                    isActive ? 'w-[15px] h-[15px]' : 'w-[5px] h-[5px]'
                  }`}
                  style={{
                    backgroundColor: isActive ? accent : 'rgba(255,255,255,0.15)',
                    boxShadow: isActive ? `0 0 12px ${accent}66` : 'none',
                  }}
                />
                {isActive && (
                  <motion.div
                    layoutId="anchor-dot-ring"
                    className="absolute inset-0 rounded-full border"
                    style={{ borderColor: `${accent}44` }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </div>

              {/* Label - hidden by default, shown on hover */}
              <span
                className={`text-[9px] font-bold tracking-[0.2em] uppercase whitespace-nowrap transition-all duration-300 ${
                  isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0'
                }`}
                style={{ color: isActive ? accent : 'rgba(255,255,255,0.6)' }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
