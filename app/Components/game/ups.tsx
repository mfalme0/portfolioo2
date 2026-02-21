'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import {
  FaBolt,
  FaBatteryFull,
  FaShieldAlt,
  FaClock,
  FaChartLine,
} from 'react-icons/fa';
import { MdOutlet, MdPowerSettingsNew } from 'react-icons/md';
import { GiElectric } from 'react-icons/gi';

import apcUPS from '../Images/ups.png';

interface TechCardProps {
  title: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  accentColor: {
    text: string;
    bar: string;
  };
}

interface PowerGaugeProps {
  label: string;
  maxValue: number;
  unit: string;
  colorClass?: string;
}

// --- POWER GAUGE ---
const PowerGauge: React.FC<PowerGaugeProps> = ({
  label,
  maxValue,
  unit,
  colorClass = 'text-yellow-500',
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const totalSegments = 20;

  useEffect(() => {
    if (!isInView) return;

    let current = 0;
    const duration = 1200;
    const increment = maxValue > 1000 ? 50 : 10;
    const stepTime = Math.max(8, (duration / maxValue) * increment);

    const timer = setInterval(() => {
      current += increment;
      if (current > maxValue) current = maxValue;
      setCount(current);
      if (current === maxValue) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, maxValue]);

  const filledSegments = Math.round((count / maxValue) * totalSegments);

  return (
    <div ref={ref} className="w-full">
      <div className="flex justify-between items-end mb-2 font-mono">
        <span className="text-zinc-400 text-[11px] font-bold uppercase tracking-wider">
          {label}
        </span>
        <span className={`text-xl font-black ${colorClass}`}>
          {count}
          {unit}
        </span>
      </div>

      <div className="flex gap-[2px] h-6 bg-black/40 p-[2px] border border-white/10 rounded">
        {Array.from({ length: totalSegments }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: i < filledSegments ? 1 : 0.12,
              backgroundColor: i < filledSegments ? 'currentColor' : '#161616',
            }}
            transition={{ duration: 0.18, delay: i * 0.015 }}
            className={`flex-1 h-full rounded-sm ${colorClass}`}
          />
        ))}
      </div>
    </div>
  );
};

// --- TECH CARD ---
const TechCard: React.FC<TechCardProps> = ({
  title,
  value,
  sub,
  icon,
  accentColor,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative bg-[#0b0b0b] border border-white/10 p-5 group overflow-hidden rounded-sm"
    >
      {/* corner chip */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[16px] border-r-[16px] border-t-transparent border-r-white/10" />

      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className={`text-3xl ${accentColor.text}`}>{icon}</div>
        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          {title}
        </div>
      </div>

      <div className="relative z-10">
        <div className="text-2xl font-black text-white">{value}</div>
        <div className="text-xs font-mono text-zinc-400 mt-1">{sub}</div>
      </div>

      <div
        className={`absolute bottom-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${accentColor.bar}`}
      />
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
export default function APCBackUPS() {
  // Core specs (keep as constants so you can reuse)
  const VA = 1400;
  const W = 810;
  const baselineLoadW = 400;
  const baselineRuntimeMin = 12;

  // UX: interactive load -> runtime estimate
  const [loadW, setLoadW] = useState<number>(baselineLoadW);

  const { estRuntimeMin, utilizationPct, isOverload } = useMemo(() => {
    const safeLoad = Math.max(10, loadW);
    const raw = (baselineRuntimeMin * baselineLoadW) / safeLoad; // simple inverse curve
    const clamped = Math.max(2, Math.min(90, raw));
    const util = Math.min(140, Math.round((safeLoad / W) * 100));
    return {
      estRuntimeMin: Math.round(clamped),
      utilizationPct: util,
      isOverload: safeLoad > W,
    };
  }, [loadW, W]);

  return (
    <section className="relative w-full py-20 bg-[#050505] text-white font-sans overflow-hidden">
      {/* INDUSTRIAL POWER-GRID THEME */}
      {/* Subtle grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Hazard stripes (very subtle) */}
      <div
        className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, transparent, transparent 44px, #f59e0b 44px, #f59e0b 54px)',
        }}
      />
      {/* Soft pulse glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-yellow-500/10 blur-[120px] animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* HEADER */}
        <div className="mb-12 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-6">
            <div className="border-l-4 border-yellow-500 pl-6">
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-2">
                APC Back-UPS 1400VA
              </h1>

              <p className="font-mono text-zinc-400 text-sm md:text-base">
                POWER_ID: BACKUP_PROTECTION_SYSTEM //{' '}
                <span className="text-yellow-400">SURGE_PROTECTED</span>
              </p>
            </div>

            <div className="hidden md:flex flex-col items-end gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2">
                <span className={`h-2 w-2 rounded-full ${isOverload ? 'bg-red-500' : 'bg-emerald-500'} animate-pulse`} />
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400">
                  {isOverload ? 'OVERLOAD' : 'READY'}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setLoadW(baselineLoadW)}
                className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400 hover:text-white transition"
              >
                <MdPowerSettingsNew className="text-lg" />
                Reset Load
              </button>
            </div>
          </div>

          {/* Status strip */}
          <div className="rounded-sm border border-white/10 bg-black/35 px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <FaShieldAlt className="text-yellow-400 text-xl" />
              <div>
                <p className="text-[11px] font-mono text-zinc-300 uppercase tracking-widest">
                  Protection Layer Active
                </p>
                <p className="text-xs text-zinc-400">
                  Surge / spike guard + battery failover for your rigs.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  Est. Runtime
                </p>
                <p className={`text-xl font-black ${isOverload ? 'text-red-400' : 'text-emerald-400'}`}>
                  {isOverload ? '—' : `${estRuntimeMin} min`}
                </p>
              </div>

              <div className="text-right">
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  Utilization
                </p>
                <p className={`text-xl font-black ${utilizationPct >= 90 ? 'text-yellow-300' : 'text-zinc-200'}`}>
                  {utilizationPct}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN ROW */}
        <div className="flex flex-col lg:flex-row gap-12 mb-14 lg:flex-row-reverse">
          {/* IMAGE */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full border border-white/10 bg-black/30 p-8 rounded-sm overflow-hidden">
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(circle_at_30%_10%,rgba(245,158,11,0.5),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(34,197,94,0.25),transparent_50%)]" />

              <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-white/50" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-white/50" />

              <Image
                src={apcUPS}
                alt="APC Back-UPS 1400VA"
                className="w-full h-auto object-contain grayscale-[10%] contrast-125 hover:grayscale-0 transition-all duration-500"
                priority
              />

              <div className="absolute bottom-4 left-4 text-[10px] font-mono text-zinc-500">
                MODEL: BX1400U-MS // TOWER CONFIG
              </div>
            </div>
          </div>

          {/* SPECS + GAUGES */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="mb-10">
              <h2 className="text-2xl font-black mb-4 uppercase flex items-center gap-3">
                <FaBolt className="text-yellow-400" /> Power Telemetry
              </h2>

              <ul className="text-zinc-400 text-sm leading-relaxed mb-6 border-l border-white/10 pl-4 space-y-1">
                <li>
                  <strong className="text-white">Capacity:</strong> {VA}VA / {W}W
                </li>
                <li>
                  <strong className="text-white">Outlets:</strong> 10 Total (5 Surge + 5 Battery)
                </li>
                <li>
                  <strong className="text-white">Runtime:</strong> ~{baselineRuntimeMin} min @ {baselineLoadW}W load
                </li>
                <li>
                  <strong className="text-white">Protection:</strong> Surge, Spike, Lightning
                </li>
                <li>
                  <strong className="text-white">Waveform:</strong> Simulated Sine Wave
                </li>
              </ul>

              {/* Load slider */}
              <div className="mb-6 rounded-sm border border-white/10 bg-black/35 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <FaChartLine className="text-yellow-300" />
                    <div>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                        Load Simulation
                      </p>
                      <p className="text-xs text-zinc-400">
                        Adjust to preview runtime (rough estimate).
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                      Current Load
                    </p>
                    <p className={`text-lg font-black ${isOverload ? 'text-red-400' : 'text-white'}`}>
                      {loadW}W
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <input
                    type="range"
                    min={50}
                    max={1000}
                    step={10}
                    value={loadW}
                    onChange={(e) => setLoadW(Number(e.target.value))}
                    className="w-full accent-yellow-400"
                    aria-label="Load in watts"
                  />

                  <div className="mt-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                    <span>50W</span>
                    <span>{W}W max</span>
                    <span>1000W</span>
                  </div>

                  {isOverload && (
                    <div className="mt-4 rounded-sm border border-red-500/30 bg-red-950/20 p-3">
                      <p className="text-red-300 text-[11px] font-mono tracking-widest uppercase">
                        Overload Detected
                      </p>
                      <p className="text-zinc-400 text-xs">
                        Load exceeds {W}W. Move devices to surge-only outlets or reduce load.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6 bg-black/35 p-6 border border-white/10 rounded-sm">
                <PowerGauge
                  label="Capacity :: VA Rating"
                  maxValue={VA}
                  unit="VA"
                  colorClass="text-yellow-400"
                />

                <PowerGauge
                  label="Output Power :: Max Watts"
                  maxValue={W}
                  unit="W"
                  colorClass="text-orange-400"
                />

                <div className="space-y-4 mt-6">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      Transfer Time
                    </span>
                    <span className="text-lg font-black text-cyan-300">2ms Typical</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      Estimated Runtime
                    </span>
                    <span className={`text-lg font-black ${isOverload ? 'text-red-400' : 'text-emerald-400'}`}>
                      {isOverload ? 'N/A' : `${estRuntimeMin} min`}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-[10px] text-zinc-500 font-mono tracking-widest uppercase opacity-70">
                 NOTE: runtime estimate is approximate and varies with battery health & load profile.
              </p>
            </div>
          </div>
        </div>

        {/* TECH GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <TechCard
            title="CAPACITY"
            sub="Power Rating"
            value={`${VA} VA`}
            icon={<GiElectric />}
            accentColor={{ text: 'text-yellow-400', bar: 'bg-yellow-400' }}
          />

          <TechCard
            title="OUTPUT"
            sub="Maximum Load"
            value={`${W} W`}
            icon={<FaBolt />}
            accentColor={{ text: 'text-orange-400', bar: 'bg-orange-400' }}
          />

          <TechCard
            title="OUTLETS"
            sub="5 Surge + 5 Battery"
            value="10 Total"
            icon={<MdOutlet />}
            accentColor={{ text: 'text-purple-400', bar: 'bg-purple-400' }}
          />

          <TechCard
            title="RUNTIME"
            sub={`At ~${baselineLoadW}W`}
            value={`${baselineRuntimeMin} min`}
            icon={<FaClock />}
            accentColor={{ text: 'text-cyan-300', bar: 'bg-cyan-300' }}
          />

          <TechCard
            title="BATTERY"
            sub="Replaceable"
            value="SLA Pack"
            icon={<FaBatteryFull />}
            accentColor={{ text: 'text-emerald-400', bar: 'bg-emerald-400' }}
          />

          <TechCard
            title="PROTECTION"
            sub="Surge + Lightning"
            value="Shielded"
            icon={<FaShieldAlt />}
            accentColor={{ text: 'text-blue-400', bar: 'bg-blue-400' }}
          />
        </div>

        {/* Footer tag */}
        <div className="mt-10 text-[10px] font-mono tracking-[0.4em] uppercase text-zinc-600 flex items-center justify-between">
          <span>JGITAU // POWER_GRID_NODE</span>
          <span className="hidden md:inline">APC_BACKUP_PROTOCOL :: v1.0</span>
        </div>
      </div>
    </section>
  );
}