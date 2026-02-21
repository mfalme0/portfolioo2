/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import sc660Image from '../Images/aula.png';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { FaBolt, FaWifi, FaPalette, FaClock, FaWeightHanging } from 'react-icons/fa';
import { MdSpeed } from 'react-icons/md';

// ---------------------------------------------
// 1) SEGMENTED GAUGE (smooth + reliable)
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
  colorClass = 'text-white',
  durationMs = 1400,
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
    const from = 0;
    const to = maxValue;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const value = Math.round(from + (to - from) * eased);

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
    <div ref={ref} className="w-full">
      <div className="flex justify-between items-end mb-2 font-mono">
        <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
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
              className={[
                'flex-1 h-full transition-opacity duration-200',
                active ? 'opacity-100' : 'opacity-25',
                colorClass,
              ].join(' ')}
              style={{ backgroundColor: active ? 'currentColor' : '#2a2a2a' }}
            />
          );
        })}
      </div>
    </div>
  );
};

// ---------------------------------------------
// 2) TECH CARD (mouse “spec chip” style)
// ---------------------------------------------
interface TechCardProps {
  title: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  accentColor: { text: string; bar: string };
}

const TechCard: React.FC<TechCardProps> = ({ title, value, sub, icon, accentColor }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="relative bg-white/[0.02] border border-white/5 p-5 group overflow-hidden rounded-sm backdrop-blur-xl"
    >
      <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-white/6 via-transparent to-transparent" />

      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className={`text-3xl ${accentColor.text}`}>{icon}</div>
        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          {title}
        </div>
      </div>

      <div className="relative z-10">
        <div className="text-2xl font-semibold text-white tracking-tight">{value}</div>
        <div className="text-xs font-mono text-zinc-400 mt-1">{sub}</div>
      </div>

      <div
        className={[
          'absolute bottom-0 left-0 w-full h-[2px]',
          'transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left',
          accentColor.bar,
        ].join(' ')}
      />
    </motion.div>
  );
};

// ---------------------------------------------
// 3) MAIN COMPONENT (special mouse styling)
// ---------------------------------------------
export default function AulaSC660Showcase() {
  const prefersReducedMotion = useReducedMotion();

  const quickStats = useMemo(
    () => [
      { k: 'DPI', v: '26,000', c: 'text-red-400' },
      { k: 'Polling', v: '1000Hz', c: 'text-orange-400' },
      { k: 'Weight', v: '59g', c: 'text-cyan-400' },
    ],
    []
  );

  return (
    <section className="relative w-full py-20 bg-[#050505] text-white overflow-hidden">
      {/* Mouse-only background: tracking surface + RGB aura */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(239,68,68,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.10),transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* HEADER */}
        <div className="mb-14 border-l-4 border-red-600 pl-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            AULA SC660
          </h1>
          <p className="font-mono text-zinc-400 text-sm md:text-base">
            DEVICE_CLASS: GAMING_MOUSE // <span className="text-red-500">ULTRA_LIGHTWEIGHT</span>
          </p>
        </div>

        {/* MAIN ROW */}
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          {/* IMAGE */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 md:p-8 rounded-sm overflow-hidden">
              {/* sensor sweep */}
              {!prefersReducedMotion && (
                <motion.div
                  aria-hidden
                  initial={{ x: '-120%' }}
                  animate={{ x: '120%' }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/8 to-transparent blur-xl opacity-60"
                />
              )}

              <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-white/40" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-white/40" />

              <Image
                src={sc660Image}
                priority
                alt="AULA SC660 Mouse"
                className="relative z-10 w-full h-auto object-contain grayscale-[15%] contrast-125 hover:grayscale-0 transition-all duration-500"
              />

              <div className="absolute bottom-4 left-4 text-[10px] font-mono text-zinc-500">
                MODEL: SC660-PRO // LIGHTWEIGHT CHASSIS
              </div>
            </div>
          </div>

          {/* SPECS */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 uppercase flex items-center gap-3">
                <FaBolt className="text-yellow-500" /> Precision Gaming
              </h2>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6 border-l border-white/10 pl-4">
                The <strong className="text-white">AULA SC660</strong> pairs an ultra-lightweight chassis with a
                high-precision <strong className="text-white">26K DPI sensor</strong>. Tri-mode connectivity and
                long battery life make it a clean daily + competitive pick.
              </p>

              {/* Quick stat pills (mouse vibe) */}
              <div className="flex flex-wrap gap-2 mb-6">
                {quickStats.map((s) => (
                  <span
                    key={s.k}
                    className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] font-mono text-[10px] tracking-widest uppercase text-zinc-400"
                  >
                    {s.k}: <span className={`font-semibold ${s.c}`}>{s.v}</span>
                  </span>
                ))}
              </div>

              <div className="space-y-6 bg-white/[0.02] p-6 border border-white/10 rounded-sm backdrop-blur-xl">
                <SegmentedGauge
                  label="DPI SENSITIVITY :: ULTRA-PRECISE"
                  maxValue={26000}
                  unit=""
                  colorClass="text-red-500"
                />
                <SegmentedGauge
                  label="POLLING RATE :: ZERO LATENCY"
                  maxValue={1000}
                  unit="Hz"
                  colorClass="text-orange-500"
                />

                <div className="pt-5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                  <span> AIM_PROFILE_READY</span>
                  <span className="text-emerald-400">STABLE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TECH GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <TechCard
            title="DPI"
            sub="Precision Sensor"
            value="26K"
            icon={<MdSpeed />}
            accentColor={{ text: 'text-red-500', bar: 'bg-red-500' }}
          />
          <TechCard
            title="POLLING"
            sub="Ultra-Fast"
            value="1000Hz"
            icon={<FaBolt />}
            accentColor={{ text: 'text-orange-500', bar: 'bg-orange-500' }}
          />
          <TechCard
            title="WEIGHT"
            sub="Ultra-Light"
            value="59g"
            icon={<FaWeightHanging />}
            accentColor={{ text: 'text-cyan-500', bar: 'bg-cyan-500' }}
          />
          <TechCard
            title="WIRELESS"
            sub="Tri-Mode"
            value="2.4GHz"
            icon={<FaWifi />}
            accentColor={{ text: 'text-blue-500', bar: 'bg-blue-500' }}
          />
          <TechCard
            title="BATTERY"
            sub="Long-Lasting"
            value="150H"
            icon={<FaClock />}
            accentColor={{ text: 'text-emerald-500', bar: 'bg-emerald-500' }}
          />
          <TechCard
            title="RGB"
            sub="Customizable"
            value="Multi"
            icon={<FaPalette />}
            accentColor={{ text: 'text-purple-500', bar: 'bg-purple-500' }}
          />
        </div>
      </div>
    </section>
  );
}