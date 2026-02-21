'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import f75Image from '../Images/f75.webp';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { FaKeyboard, FaBolt, FaWifi, FaPalette, FaClock, FaUsb } from 'react-icons/fa';
import { MdSpeed } from 'react-icons/md';

// ---------------------------------------------
// 1) SEGMENT GAUGE (smooth)
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
  colorClass = 'text-zinc-300',
  durationMs = 1100,
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
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
    <div ref={ref} className="w-full">
      <div className="flex justify-between items-end mb-2 font-mono">
        <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
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
              className={['flex-1 h-full', active ? 'opacity-90' : 'opacity-25', colorClass].join(' ')}
              style={{ backgroundColor: active ? 'currentColor' : '#2a2a2a' }}
            />
          );
        })}
      </div>
    </div>
  );
};

// ---------------------------------------------
// 2) TECH CARD (keeb chip style)
// ---------------------------------------------
interface TechCardProps {
  title: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  accent: 'purple' | 'cyan' | 'pink' | 'blue' | 'green' | 'yellow';
}

const accentMap: Record<TechCardProps['accent'], { text: string; bar: string; glow: string }> = {
  purple: { text: 'text-purple-400', bar: 'bg-purple-400', glow: 'shadow-[0_0_18px_rgba(192,132,252,0.25)]' },
  cyan: { text: 'text-cyan-300', bar: 'bg-cyan-300', glow: 'shadow-[0_0_18px_rgba(34,211,238,0.22)]' },
  pink: { text: 'text-pink-400', bar: 'bg-pink-400', glow: 'shadow-[0_0_18px_rgba(244,114,182,0.22)]' },
  blue: { text: 'text-blue-400', bar: 'bg-blue-400', glow: 'shadow-[0_0_18px_rgba(96,165,250,0.22)]' },
  green: { text: 'text-emerald-300', bar: 'bg-emerald-300', glow: 'shadow-[0_0_18px_rgba(110,231,183,0.18)]' },
  yellow: { text: 'text-yellow-300', bar: 'bg-yellow-300', glow: 'shadow-[0_0_18px_rgba(253,224,71,0.18)]' },
};

const TechCard: React.FC<TechCardProps> = ({ title, value, sub, icon, accent }) => {
  const a = accentMap[accent];

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
      className={`relative bg-white/[0.02] border border-white/10 p-5 group overflow-hidden rounded-sm backdrop-blur-xl`}
    >
      {/* subtle glow wash */}
      <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className={`absolute inset-0 ${a.glow}`} />
      </div>

      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className={`text-3xl ${a.text}`}>{icon}</div>
        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          {title}
        </div>
      </div>

      <div className="relative z-10">
        <div className="text-2xl font-semibold text-white tracking-tight">{value}</div>
        <div className="text-xs font-mono text-zinc-500 mt-1">{sub}</div>
      </div>

      {/* bottom bar */}
      <div
        className={`absolute bottom-0 left-0 w-full h-[2px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${a.bar}`}
      />
    </motion.div>
  );
};

// ---------------------------------------------
// 3) MAIN COMPONENT
// ---------------------------------------------
export default function AulaF75Showcase() {
  const profile = useMemo(
    () => [
      { k: 'Mount', v: 'Gasket', c: 'text-purple-300' },
      { k: 'Layout', v: '75%', c: 'text-zinc-200' },
      { k: 'Mode', v: 'Tri-Mode', c: 'text-cyan-200' },
      { k: 'PCB', v: 'Hot-Swap', c: 'text-yellow-200' },
    ],
    []
  );

  return (
    <section className="relative w-full py-20 bg-[#050505] text-white overflow-hidden">
      {/* Keeb background: dot field + soft highlights */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(192,132,252,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(34,211,238,0.10),transparent_55%)]" />

        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* HEADER */}
        <div className="mb-14 border-l-4 border-purple-500/80 pl-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            AULA F75
          </h1>
          <p className="font-mono text-zinc-500 text-sm md:text-base">
            KEYBOARD_CLASS: MECHANICAL_WARRIOR //{' '}
            <span className="text-purple-300">GASKET_MOUNT</span>
          </p>

          {/* keeb “build chips” */}
          <div className="mt-5 flex flex-wrap gap-2">
            {profile.map((p) => (
              <span
                key={p.k}
                className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] font-mono text-[10px] tracking-widest uppercase text-zinc-500"
              >
                {p.k}: <span className={`font-semibold ${p.c}`}>{p.v}</span>
              </span>
            ))}
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          {/* LEFT IMAGE */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 md:p-8 rounded-sm overflow-hidden">
              <Image
                src={f75Image}
                priority
                alt="AULA F75 Keyboard"
                className="w-full h-auto object-contain grayscale-[15%] contrast-125 hover:grayscale-0 transition-all duration-500"
              />

              <div className="absolute bottom-4 left-4 text-[10px] font-mono text-zinc-500">
                MODEL: F75-GASKET // 75% LAYOUT
              </div>
            </div>
          </div>

          {/* RIGHT SPECS */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 uppercase flex items-center gap-3">
                <FaBolt className="text-yellow-300" /> Performance Metrics
              </h2>

              <p className="text-zinc-500 text-sm leading-relaxed mb-6 border-l border-white/10 pl-4">
                The <strong className="text-white">AULA F75</strong> uses gasket-mounted construction with a hot-swappable PCB.
                <strong className="text-white"> 1000Hz polling</strong> keeps it snappy for gaming + clean for typing sessions.
              </p>

              <div className="space-y-6 bg-white/[0.02] p-6 border border-white/10 rounded-sm backdrop-blur-xl">
                <SegmentedGauge
                  label="POLLING RATE :: ULTRA-RESPONSIVE"
                  maxValue={1000}
                  unit="Hz"
                  colorClass="text-cyan-300"
                />
                <SegmentedGauge
                  label="BATTERY LIFE :: WIRELESS MODE"
                  maxValue={200}
                  unit="H"
                  colorClass="text-purple-300"
                />

                {/* little “sound profile” block */}
                <div className="pt-5 border-t border-white/10">
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                    <span> SOUND_PROFILE</span>
                    <span className="text-zinc-300">THOCKY / SOFT</span>
                  </div>
                  <div className="mt-3 h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[72%] bg-white/60" />
                  </div>
                  <div className="mt-2 text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
                    Dampening: plate foam + case foam
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TECH CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <TechCard title="LAYOUT" sub="Compact Design" value="75%" icon={<FaKeyboard />} accent="purple" />
          <TechCard title="POLLING" sub="Zero Latency" value="1000 Hz" icon={<MdSpeed />} accent="cyan" />
          <TechCard title="RGB" sub="Per-Key Lighting" value="16.8M" icon={<FaPalette />} accent="pink" />
          <TechCard title="WIRELESS" sub="Tri-Mode Connect" value="2.4GHz" icon={<FaWifi />} accent="blue" />
          <TechCard title="BATTERY" sub="High Capacity" value="200H" icon={<FaClock />} accent="green" />
          <TechCard title="CONNECT" sub="Hot-Swap PCB" value="USB-C" icon={<FaUsb />} accent="yellow" />
        </div>
      </div>
    </section>
  );
}