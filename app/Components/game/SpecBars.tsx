'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SpecBar {
  label: string;
  value: string;
  percent: number;
  color?: string;
}

export default function SpecBars({ bars, title }: { bars: SpecBar[]; title?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="space-y-5">
      {title && (
        <h3 className="text-[10px] font-black tracking-[0.3em] uppercase text-white/50 mb-6">
          <span className="rog-accent">◆</span> {title}
        </h3>
      )}
      {bars.map((bar, i) => (
        <motion.div
          key={bar.label}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-1.5"
        >
          <div className="flex items-center justify-between">
            <span className="rog-spec-label text-[10px]">{bar.label}</span>
            <span className="text-[11px] font-semibold text-white/80">{bar.value}</span>
          </div>
          <div className="rog-spec-bar-track">
            <motion.div
              className="rog-spec-bar-fill"
              initial={{ width: '0%' }}
              animate={inView ? { width: `${bar.percent}%` } : {}}
              transition={{ delay: i * 0.1 + 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: bar.color || 'linear-gradient(90deg, #ff1a1a, #ff4444)' }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
