/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import modelOImage from '../Images/model0.png';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { FaMouse, FaBolt, FaWeightHanging, FaPalette, FaSkullCrossbones, FaArchive } from 'react-icons/fa';
import { MdSpeed } from 'react-icons/md';
import { RiAlertFill } from 'react-icons/ri';

// ---------------------------------------------
// 1) SEGMENT GAUGE (archived/disabled + smooth)
// ---------------------------------------------
interface SegmentedGaugeProps {
  label: string;
  maxValue: number;
  unit?: string;
  colorClass?: string;
  durationMs?: number;
}

const SegmentedGauge: React.FC<SegmentedGaugeProps> = ({
  label,
  maxValue,
  unit = '',
  colorClass = 'text-zinc-500',
  durationMs = 1200,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const prefersReducedMotion = useReducedMotion();

  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const totalSegments = 20;

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      setCount(maxValue);
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(maxValue * eased);
      setCount(value);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [isInView, maxValue, durationMs, prefersReducedMotion]);

  const filledSegments = Math.round((count / maxValue) * totalSegments);

  return (
    <div ref={ref} className="w-full opacity-70">
      <div className="flex justify-between items-end mb-2 font-mono">
        <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider line-through">
          {label}
        </span>
        <span className={`text-xl font-bold ${colorClass}`}>
          {count.toLocaleString()}{unit}
        </span>
      </div>

      <div className="flex gap-[2px] h-6 bg-black/40 p-[2px] border border-white/10 rounded-sm">
        {Array.from({ length: totalSegments }).map((_, i) => {
          const active = i < filledSegments;
          return (
            <div
              key={i}
              className={['flex-1 h-full', active ? 'opacity-60' : 'opacity-20', colorClass].join(' ')}
              style={{ backgroundColor: active ? 'currentColor' : '#2a2a2a' }}
            />
          );
        })}
      </div>
    </div>
  );
};

// ---------------------------------------------
// 2) TECH CARD (archived chip style)
// ---------------------------------------------
interface TechCardProps {
  title: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  kind?: 'archived' | 'status';
}

const TechCard: React.FC<TechCardProps> = ({ title, value, sub, icon, kind = 'archived' }) => {
  const isStatus = kind === 'status';

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
      className={[
        'relative p-5 rounded-sm overflow-hidden backdrop-blur-xl border',
        isStatus ? 'bg-red-950/20 border-red-900/40' : 'bg-white/[0.02] border-white/5',
        isStatus ? 'opacity-100' : 'opacity-70',
        'group',
      ].join(' ')}
    >
      {/* subtle X overlay on hover for archived */}
      {!isStatus && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-15 transition-opacity">
          <div className="text-red-600 text-6xl font-black">✕</div>
        </div>
      )}

      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className={isStatus ? 'text-3xl text-red-500' : 'text-3xl text-zinc-500 grayscale'}>
          {icon}
        </div>
        <div className={isStatus ? 'text-[10px] font-mono text-red-300 uppercase tracking-widest' : 'text-[10px] font-mono text-zinc-500 uppercase tracking-widest line-through'}>
          {title}
        </div>
      </div>

      <div className="relative z-10">
        <div className={isStatus ? 'text-2xl font-semibold text-red-200 tracking-tight' : 'text-2xl font-bold text-zinc-500 line-through'}>
          {value}
        </div>
        <div className={isStatus ? 'text-xs font-mono text-red-300/70 mt-1' : 'text-xs font-mono text-zinc-600 mt-1'}>
          {sub}
        </div>
      </div>

      <div
        className={[
          'absolute bottom-0 left-0 w-full h-[2px]',
          'transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left',
          isStatus ? 'bg-red-600' : 'bg-zinc-700',
        ].join(' ')}
      />
    </motion.div>
  );
};

// ---------------------------------------------
// 3) MAIN COMPONENT (archive bay vibe)
// ---------------------------------------------
export default function GloriousModelOShowcase() {
  const prefersReducedMotion = useReducedMotion();

  const archivedMeta = useMemo(
    () => [
      { k: 'Archived', v: '2024', c: 'text-zinc-400' },
      { k: 'Successor', v: 'AULA SC660', c: 'text-red-300' },
    ],
    []
  );

  return (
    <section className="relative w-full py-20 bg-[#050505] text-white overflow-hidden">
      {/* Archive / maintenance bay background */}
      <div className="absolute inset-0 z-0">
        {/* cold spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.06),transparent_55%)]" />
        {/* faint “tracking surface” dots (keeps mouse consistency) */}
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />
        {/* warning stripes, very subtle */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(239,68,68,1) 60px, rgba(239,68,68,1) 70px)',
          }}
        />
        {/* noise */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* HEADER */}
        <div className="mb-14 border-l-4 border-zinc-600 pl-6 relative">
          <div className="absolute -left-3 top-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rotate-[-4deg] shadow-lg">
            DECOMMISSIONED
          </div>

          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-zinc-300">
            Glorious Model O
          </h1>

          <p className="font-mono text-zinc-500 text-sm md:text-base">
            DEVICE_CLASS: GAMING_MOUSE // <span className="text-red-500">STATUS: RETIRED</span>
          </p>

          {/* Warning Banner (cleaner module) */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 flex items-start gap-3 bg-red-950/20 border border-red-900/40 p-4 rounded-sm backdrop-blur-xl"
          >
            <RiAlertFill className="text-red-500 text-2xl flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-red-300 text-sm font-bold uppercase tracking-wider">
                Unit Retired
              </p>
              <p className="text-zinc-400 text-xs">
                Decommissioned after extended service. Replacement deployed: <span className="text-red-300">AULA SC660</span>.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {archivedMeta.map((m) => (
                  <span
                    key={m.k}
                    className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] font-mono text-[10px] tracking-widest uppercase text-zinc-500"
                  >
                    {m.k}: <span className={`font-semibold ${m.c}`}>{m.v}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* MAIN ROW */}
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          {/* IMAGE */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 md:p-8 rounded-sm overflow-hidden">
              {/* disabled sweep (very faint) */}
              {!prefersReducedMotion && (
                <motion.div
                  aria-hidden
                  initial={{ x: '-120%' }}
                  animate={{ x: '120%' }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/6 to-transparent blur-xl opacity-30"
                />
              )}

              <div className="absolute top-4 right-4 z-10">
                <FaArchive className="text-zinc-600 text-3xl opacity-60" />
              </div>

              <Image
                src={modelOImage}
                priority
                alt="Glorious Model O [DECOMMISSIONED]"
                className="relative z-10 w-full h-auto object-contain grayscale opacity-70 hover:opacity-80 transition-all duration-500"
              />

              <div className="absolute bottom-4 left-4 text-[10px] font-mono text-zinc-500">
                MODEL: GLORIOUS-O // ARCHIVED: 2024
              </div>
            </div>
          </div>

          {/* SPECS */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 uppercase flex items-center gap-3 text-zinc-300">
                <FaSkullCrossbones className="text-zinc-500" /> Legacy Specifications
              </h2>

              <p className="text-zinc-500 text-sm leading-relaxed mb-6 border-l border-white/10 pl-4">
                The <strong className="text-zinc-300">Glorious Model O</strong> served with a
                <strong className="text-zinc-300"> 12,000 DPI</strong> sensor and lightweight shell.
                This unit is now archived. <span className="text-red-400">Successor: AULA SC660</span>
              </p>

              <div className="space-y-6 bg-white/[0.02] p-6 border border-white/10 rounded-sm backdrop-blur-xl">
                <SegmentedGauge
                  label="DPI SENSITIVITY :: ARCHIVED SPEC"
                  maxValue={12000}
                  unit=""
                  colorClass="text-zinc-500"
                />
                <SegmentedGauge
                  label="POLLING RATE :: LEGACY SYSTEM"
                  maxValue={1000}
                  unit="Hz"
                  colorClass="text-zinc-600"
                />

                <div className="pt-5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                  <span> STORAGE_SEALED</span>
                  <span className="text-red-400">RETIRED</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TECH GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <TechCard title="DPI" sub="Legacy Sensor" value="12K" icon={<MdSpeed />} />
          <TechCard title="POLLING" sub="Archived" value="1000Hz" icon={<FaBolt />} />
          <TechCard title="WEIGHT" sub="Ultra-Light" value="67g" icon={<FaWeightHanging />} />
          <TechCard title="CABLE" sub="Wired Only" value="Braided" icon={<FaMouse />} />
          <TechCard title="STATUS" sub="Out of Service" value="RETIRED" icon={<FaArchive />} kind="status" />
          <TechCard title="RGB" sub="Honeycomb Shell" value="Multi" icon={<FaPalette />} />
        </div>
      </div>
    </section>
  );
}