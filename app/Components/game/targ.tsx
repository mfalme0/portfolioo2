/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react/jsx-no-comment-textnodes */
'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { FaDesktop, FaTv, FaPalette, FaClock, FaAdjust } from 'react-icons/fa';
import { MdHighQuality } from 'react-icons/md';
import { IoMdSpeedometer } from 'react-icons/io';

import targMonitor from '../Images/tar-g.png';

// -----------------------------
// Types
// -----------------------------
interface TechCardProps {
  title: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  accent: {
    text: string;
    bar: string;
    ring: string;
  };
}

interface RefreshRateGaugeProps {
  maxHz: number;
  colorClass?: string;
  label?: string;
}

// -----------------------------
// Refresh Rate Gauge (smoother, less jank)
// -----------------------------
const RefreshRateGauge: React.FC<RefreshRateGaugeProps> = ({
  maxHz,
  colorClass = 'text-cyan-500',
  label = 'Refresh Rate :: Display Performance',
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' });
  const prefersReducedMotion = useReducedMotion();

  const [count, setCount] = useState(0);
  const totalSegments = 20;

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      setCount(maxHz);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const duration = 1200;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(eased * maxHz);
      setCount(next);

      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, maxHz, prefersReducedMotion]);

  const filledSegments = Math.round((count / maxHz) * totalSegments);

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-end justify-between mb-2 font-mono">
        <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">{label}</span>
        <span className={`text-xl font-bold ${colorClass}`}>{count}Hz</span>
      </div>

      <div className="flex gap-[2px] h-6 bg-black/40 p-[2px] border border-white/10 rounded-sm">
        {Array.from({ length: totalSegments }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: i < filledSegments ? 1 : 0.12,
              backgroundColor: i < filledSegments ? 'currentColor' : '#151515',
            }}
            transition={{ duration: 0.12, delay: Math.min(i * 0.01, 0.18) }}
            className={`flex-1 h-full rounded-[2px] ${colorClass}`}
          />
        ))}
      </div>
    </div>
  );
};

// -----------------------------
// Tech Card (cleaner + consistent accents)
// -----------------------------
const TechCard: React.FC<TechCardProps> = ({ title, value, sub, icon, accent }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className={`relative bg-[#0e0e0e] border border-white/10 p-5 group overflow-hidden rounded-sm ${accent.ring}`}
    >
      {/* Top-right cut */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[16px] border-r-[16px] border-t-transparent border-r-white/10" />

      {/* subtle HUD line */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/5" />

      <div className="relative z-10 flex items-start justify-between gap-4 mb-4">
        <div className={`text-3xl ${accent.text}`}>{icon}</div>
        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest text-right">
          {title}
        </div>
      </div>

      <div className="relative z-10">
        <div className="text-2xl font-bold text-white leading-tight">{value}</div>
        <div className="text-xs font-mono text-gray-400 mt-1">{sub}</div>
      </div>

      {/* bottom bar */}
      <div
        className={`absolute bottom-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${accent.bar}`}
      />
    </motion.div>
  );
};

// -----------------------------
// MAIN
// -----------------------------
export default function TARGMonitor() {
  const stats = useMemo(
    () => ({
      resolution: '2560×1440',
      hz: 180,
      panel: 'IPS',
      size: '27"',
      response: '1ms (GtG)',
      color: '99% sRGB',
      ppi: '109 PPI',
      aspect: '16:9',
      adaptive: 'FreeSync',
    }),
    []
  );

  return (
    <section className="relative w-full py-20 bg-black text-white font-sans overflow-hidden">
      {/* Theme: “HUD / Scanline Display” (no big gradients, just texture) */}
      <div
        className="absolute inset-0 z-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div
        className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(180deg, transparent, transparent 6px, rgba(0,255,255,0.25) 7px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <header className="mb-14 border-l-4 border-cyan-500 pl-6">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-2"
          >
            TARG 27&ldquo; Monitor
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            viewport={{ once: true }}
            className="font-mono text-gray-400 text-sm md:text-base"
          >
            DISPLAY_ID: VISUAL_COMMAND_CENTER //{' '}
            <span className="text-cyan-400">QHD_{stats.hz}HZ</span>
          </motion.p>

          {/* Quick badges */}
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              `QHD ${stats.resolution}`,
              `${stats.hz}Hz`,
              `${stats.panel}`,
              `sRGB ${stats.color}`,
              `${stats.adaptive}`,
            ].map((b) => (
              <span
                key={b}
                className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-sm border border-white/10 bg-white/[0.03] text-zinc-300"
              >
                {b}
              </span>
            ))}
          </div>
        </header>

        {/* Main */}
        <div className="flex flex-col lg:flex-row gap-12 mb-16 lg:flex-row-reverse">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 flex items-center justify-center"
          >
            <div className="relative w-full border border-white/10 bg-[#070707] p-8 rounded-sm overflow-hidden">
              {/* corner marks */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white/60" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white/60" />

              <Image
                src={targMonitor}
                alt="TARG 27 Monitor"
                className="w-full h-auto object-contain grayscale-[12%] contrast-125 hover:grayscale-0 transition-all duration-500"
                priority
              />

              {/* HUD label */}
              <div className="absolute bottom-4 left-4 text-[10px] font-mono text-gray-500 tracking-widest uppercase">
                MODEL: TARG-27 // PANEL: {stats.panel} // {stats.hz}HZ
              </div>
            </div>
          </motion.div>

          {/* Specs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 flex flex-col justify-center"
          >
            <h2 className="text-2xl font-bold mb-4 uppercase flex items-center gap-3">
              <FaDesktop className="text-cyan-400" /> Display & Performance
            </h2>

            <ul className="text-gray-300/80 text-sm leading-relaxed mb-8 border-l border-white/10 pl-4 space-y-1">
              <li>
                <strong className="text-white">Resolution:</strong> {stats.resolution} (QHD)
              </li>
              <li>
                <strong className="text-white">Refresh Rate:</strong> {stats.hz}Hz
              </li>
              <li>
                <strong className="text-white">Panel Type:</strong> {stats.panel} / Fast Response
              </li>
              <li>
                <strong className="text-white">Size:</strong> {stats.size}
              </li>
              <li>
                <strong className="text-white">Response Time:</strong> {stats.response}
              </li>
              <li>
                <strong className="text-white">Color Accuracy:</strong> {stats.color}
              </li>
            </ul>

            <div className="space-y-6 bg-[#0b0b0b] p-6 border border-white/10 rounded-sm">
              <RefreshRateGauge maxHz={stats.hz} colorClass="text-cyan-400" />

              <div className="space-y-4 mt-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                    Pixel Density
                  </span>
                  <span className="text-lg font-bold text-purple-400">{stats.ppi}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                    Aspect Ratio
                  </span>
                  <span className="text-lg font-bold text-blue-400">{stats.aspect}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tech grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          <TechCard
            title="RESOLUTION"
            sub="Quad HD"
            value="1440p"
            icon={<MdHighQuality />}
            accent={{ text: 'text-cyan-400', bar: 'bg-cyan-400', ring: 'hover:ring-1 hover:ring-cyan-400/30' }}
          />
          <TechCard
            title="REFRESH"
            sub="High speed"
            value={`${stats.hz} Hz`}
            icon={<IoMdSpeedometer />}
            accent={{ text: 'text-emerald-400', bar: 'bg-emerald-400', ring: 'hover:ring-1 hover:ring-emerald-400/30' }}
          />
          <TechCard
            title="PANEL"
            sub="IPS Technology"
            value={`${stats.size}`}
            icon={<FaTv />}
            accent={{ text: 'text-purple-400', bar: 'bg-purple-400', ring: 'hover:ring-1 hover:ring-purple-400/30' }}
          />
          <TechCard
            title="RESPONSE"
            sub="Gray to Gray"
            value="1 ms"
            icon={<FaClock />}
            accent={{ text: 'text-yellow-400', bar: 'bg-yellow-400', ring: 'hover:ring-1 hover:ring-yellow-400/30' }}
          />
          <TechCard
            title="COLOR"
            sub="Coverage"
            value="99% sRGB"
            icon={<FaPalette />}
            accent={{ text: 'text-pink-400', bar: 'bg-pink-400', ring: 'hover:ring-1 hover:ring-pink-400/30' }}
          />
          <TechCard
            title="ADAPTIVE"
            sub="Tear-free"
            value="FreeSync"
            icon={<FaAdjust />}
            accent={{ text: 'text-orange-400', bar: 'bg-orange-400', ring: 'hover:ring-1 hover:ring-orange-400/30' }}
          />
        </motion.div>

        {/* tiny footer */}
        <div className="mt-14 pt-8 border-t border-white/10 flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-zinc-500">
          <span>// VISUAL_NODE_READY</span>
          <span>PROFILE: GAMING + WORK</span>
        </div>
      </div>
    </section>
  );
}