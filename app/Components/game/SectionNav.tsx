'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface NavItem {
  id: string;
  label: string;
}

export default function SectionNav({
  title,
  items,
  accent,
}: {
  title: string;
  items: NavItem[];
  accent: string;
}) {
  const [active, setActive] = useState(items[0]?.id ?? '');
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (items.length === 0) return null;

  return (
    <div
      className="sticky top-[64px] md:top-[76px] z-30 w-full border-b transition-colors duration-300"
      style={{
        borderColor: scrolled ? 'rgba(255,255,255,0.1)' : 'transparent',
        backgroundColor: scrolled ? 'rgba(5,5,8,0.72)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 h-12 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span
            className="shrink-0 text-[11px] font-black tracking-[0.3em] uppercase"
            style={{ color: accent }}
          >
            {title}
          </span>
          <span className="shrink-0 h-4 w-px" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
          <nav className="flex items-center gap-5 shrink-0">
            {items.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className="relative shrink-0 whitespace-nowrap py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.18em] transition-colors duration-300"
                  style={{ color: isActive ? accent : 'rgba(255,255,255,0.45)' }}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="gear-nav-underline"
                      className="absolute left-0 right-0 -bottom-[1px] h-[2px] rounded-full"
                      style={{ backgroundColor: accent, boxShadow: `0 0 8px ${accent}80` }}
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
