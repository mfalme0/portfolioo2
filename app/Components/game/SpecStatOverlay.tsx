'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { GearItem } from '@/lib/gear-data';

/**
 * Mirrors the ROG "Power up" stat block — a full-bleed background image with
 * a stacked intro paragraph and a grid of value/label spec pairs. Works for
 * any gear category since it only ever reads the item's own real specs.
 */
export default function SpecStatOverlay({ item, accent }: { item: GearItem; accent: string }) {
  const stats = item.specs.slice(0, 6);
  if (stats.length === 0) return null;

  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={item.image}
          alt=""
          fill
          className="object-cover opacity-[0.12] blur-[2px] scale-110"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="rog-hex-grid opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-12 md:mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[2px] w-8 rounded-full" style={{ backgroundColor: accent }} />
            <span className="text-[9px] tracking-[0.5em] uppercase font-bold text-zinc-500">Power Up</span>
          </div>
          <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-mono">
            {item.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-0"
            >
              {s.icon && <div className="text-lg mb-2" style={{ color: accent }}>{s.icon}</div>}
              <div className="text-xl md:text-2xl font-black tracking-tight text-white leading-tight truncate">
                {s.value}
              </div>
              <div className="text-[9px] font-bold tracking-[0.25em] uppercase mt-1.5" style={{ color: accent }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
