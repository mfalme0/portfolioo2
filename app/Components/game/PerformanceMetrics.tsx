'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

interface Metric {
  label: string;
  value: number;
  suffix: string;
  decimals?: number;
  icon?: React.ReactNode;
}

export default function PerformanceMetrics({
  metrics,
  title,
  accent = 'var(--accent-default)',
}: {
  metrics: Metric[];
  title?: string;
  accent?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref}>
      {title && (
        <h3 className="text-[10px] font-black tracking-[0.3em] uppercase text-white/50 mb-6">
          <span style={{ color: accent }}>◆</span> {title}
        </h3>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rog-card p-5 text-center group transition-all duration-300"
            whileHover={{
              borderColor: `${accent}4d`,
              boxShadow: `0 0 30px ${accent}0d`,
            }}
          >
            {metric.icon && (
              <div className="text-xl mb-2 flex justify-center">{metric.icon}</div>
            )}
            <div className="text-3xl md:text-4xl font-black tracking-tight mb-1">
              <AnimatedCounter
                end={metric.value}
                suffix={metric.suffix}
                decimals={metric.decimals ?? 0}
              />
            </div>
            <div className="rog-spec-label text-[9px]">{metric.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
