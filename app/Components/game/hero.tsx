/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import front from '../Images/g18side.png';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { FaMemory, FaHdd, FaDesktop, FaBolt, FaThermometerHalf } from 'react-icons/fa';
import { SiNvidia, SiIntel } from 'react-icons/si';

// ---------------------------------------------
// 1) SEGMENT GAUGE (smooth + reliable)
// ---------------------------------------------
interface SegmentedGaugeProps {
  label: string;
  maxWatts: number;
  colorClass?: string;
  durationMs?: number;
}

const SegmentedGauge: React.FC<SegmentedGaugeProps> = ({
  label,
  maxWatts,
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
      setCount(maxWatts);
      return;
    }

    const start = performance.now();
    const from = 0;
    const to = maxWatts;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(from + (to - from) * eased);

      setCount(value);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [isInView, maxWatts, durationMs, prefersReducedMotion]);

  const filledSegments = Math.round((count / maxWatts) * totalSegments);

  return (
    <div ref={ref} className="w-full">
      <div className="flex justify-between items-end mb-2 font-mono">
        <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
          {label}
        </span>
        <span className={`text-xl font-bold ${colorClass}`}>{count}W</span>
      </div>

      <div className="flex gap-[2px] h-6 bg-black/40 p-[2px] border border-gray-800 rounded-sm">
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
              style={{
                backgroundColor: active ? 'currentColor' : '#2a2a2a',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// ---------------------------------------------
// 2) TECH CARD (cleaner, consistent border + glow)
// ---------------------------------------------
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

const TechCard: React.FC<TechCardProps> = ({ title, value, sub, icon, accentColor }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="relative bg-white/[0.02] border border-white/5 p-5 group overflow-hidden rounded-sm backdrop-blur-xl"
    >
      {/* subtle hover glow */}
      <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-white/5 via-transparent to-transparent" />

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
// 3) MAIN COMPONENT
// ---------------------------------------------
export default function PerformanceSpecs() {
  return (
    <section className="relative w-full py-20 bg-[#050505] text-white font-sans overflow-hidden">
      {/* subtle grid + noise = matches your portfolio */}
      <div
        className="absolute inset-0 z-0 opacity-15"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* HEADER */}
        <div className="mb-14 border-l-4 border-red-600 pl-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            ROG Strix G18
          </h1>
          <p className="font-mono text-zinc-400 text-sm md:text-base">
            SYSTEM_ID: BATTLE_STATION_ALPHA // <span className="text-red-500">MAX_PERFORMANCE</span>
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          {/* LEFT IMAGE */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 md:p-8 rounded-sm overflow-hidden">
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-white/40" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-white/40" />

              <Image
                src={front}
                priority
                alt="G18 Rig"
                className="w-full h-auto object-contain grayscale-[20%] contrast-125 hover:grayscale-0 transition-all duration-500"
              />

              <div className="absolute bottom-4 left-4 text-[10px] font-mono text-zinc-500">
                MODEL: G814JVR // 18-INCH CHASSIS
              </div>
            </div>
          </div>

          {/* RIGHT SPECS */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 uppercase flex items-center gap-3">
                <FaBolt className="text-yellow-500" /> Power Distribution
              </h2>

              <p className="text-zinc-400 text-sm leading-relaxed mb-8 border-l border-white/10 pl-4">
                The <strong className="text-white">i9-14900HX</strong> and{' '}
                <strong className="text-white">RTX 4060</strong> run unthrottled. Massive 3TB storage array
                and 32GB RAM handle high-load compilation & 4K assets seamlessly.
              </p>

              <div className="space-y-6 bg-white/[0.02] p-6 border border-white/10 rounded-sm backdrop-blur-xl">
                <SegmentedGauge
                  label="CPU :: INTEL CORE i9-14900HX"
                  maxWatts={175}
                  colorClass="text-blue-500"
                />
                <SegmentedGauge
                  label="GPU :: NVIDIA RTX 4060"
                  maxWatts={140}
                  colorClass="text-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* TECH CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <TechCard
            title="GPU"
            sub="NVIDIA GeForce"
            value="RTX 4060"
            icon={<SiNvidia />}
            accentColor={{ text: "text-emerald-500", bar: "bg-emerald-500" }}
          />
          <TechCard
            title="CPU"
            sub="24 Cores / 32 Threads"
            value="i9-14900HX"
            icon={<SiIntel />}
            accentColor={{ text: "text-blue-500", bar: "bg-blue-500" }}
          />
          <TechCard
            title="RAM"
            sub="DDR5 5600MHz"
            value="32 GB"
            icon={<FaMemory />}
            accentColor={{ text: "text-purple-500", bar: "bg-purple-500" }}
          />
          <TechCard
            title="DISPLAY"
            sub="1600p Nebula"
            value="240 Hz"
            icon={<FaDesktop />}
            accentColor={{ text: "text-cyan-500", bar: "bg-cyan-500" }}
          />
          <TechCard
            title="STORAGE"
            sub="NVMe Gen4"
            value="3 TB"
            icon={<FaHdd />}
            accentColor={{ text: "text-yellow-500", bar: "bg-yellow-500" }}
          />
          <TechCard
            title="THERMALS"
            sub="Liquid Metal"
            value="Tri-Fan"
            icon={<FaThermometerHalf />}
            accentColor={{ text: "text-red-500", bar: "bg-red-500" }}
          />
        </div>
      </div>
    </section>
  );
}