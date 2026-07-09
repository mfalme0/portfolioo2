'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export interface Pillar {
  id: string;
  index: string;
  sub: string;
  label: string;
  image: string;
}

export default function KspTrio({ pillars, accent }: { pillars: Pillar[]; accent: string }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative w-full bg-background py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pillars.map((p, i) => (
            <motion.button
              key={`${p.id}-${i}`}
              type="button"
              onClick={() => scrollTo(p.id)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-xl border border-white/10 text-left"
            >
              <Image
                src={p.image}
                alt={p.label}
                fill
                className="object-cover opacity-55 grayscale-[15%] transition-all duration-700 group-hover:opacity-85 group-hover:grayscale-0 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `linear-gradient(180deg, transparent 40%, ${accent}22 100%)` }}
              />
              <div
                className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"
                style={{ backgroundColor: accent }}
              />

              <span
                className="absolute top-4 left-4 text-6xl md:text-7xl font-black tabular-nums opacity-20 transition-all duration-500 group-hover:opacity-40 group-hover:-translate-y-1"
                style={{ color: accent }}
              >
                {p.index}
              </span>

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="block text-[9px] font-bold tracking-[0.3em] uppercase mb-1.5" style={{ color: accent }}>
                  {p.sub}
                </span>
                <span className="flex items-center gap-2 text-lg md:text-xl font-black uppercase tracking-tight text-white">
                  {p.label}
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
