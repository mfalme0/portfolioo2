'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import iemImage from '../Images/kz-edx.png';
import { motion, useInView } from 'framer-motion';
import { FaBolt, FaMusic, FaMicrophone, FaPlug, FaVolumeUp } from 'react-icons/fa';
import { GiSoundWaves } from 'react-icons/gi';

interface SegmentedGaugeProps {
  label: string;
  maxValue: number;
  unit: string;
  colorClass?: string;
  step?: number;
}

const SegmentedGauge: React.FC<SegmentedGaugeProps> = ({
  label,
  maxValue,
  unit,
  colorClass = 'text-cyan-400',
  step,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [count, setCount] = useState(0);

  const totalSegments = 24;

  useEffect(() => {
    if (!isInView) return;

    let current = 0;
    const duration = 1400;
    const inc = step ?? Math.max(1, Math.ceil(maxValue / 120));
    const stepTime = Math.max(10, (duration / maxValue) * inc);

    const timer = setInterval(() => {
      current += inc;
      if (current > maxValue) current = maxValue;
      setCount(current);
      if (current === maxValue) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, maxValue, step]);

  const filledSegments = Math.round((count / maxValue) * totalSegments);

  return (
    <div ref={ref} className="w-full">
      <div className="flex justify-between items-end mb-2 font-mono">
        <span className="text-zinc-400 text-[11px] font-bold uppercase tracking-wider">{label}</span>
        <span className={`text-xl font-black ${colorClass}`}>
          {count}
          {unit}
        </span>
      </div>

      <div className="flex gap-[2px] h-6 bg-black/30 p-[2px] border border-white/10 rounded">
        {Array.from({ length: totalSegments }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: i < filledSegments ? 1 : 0.12,
              backgroundColor: i < filledSegments ? 'currentColor' : '#151515',
            }}
            transition={{ duration: 0.15, delay: i * 0.01 }}
            className={`flex-1 h-full rounded-sm ${colorClass}`}
          />
        ))}
      </div>
    </div>
  );
};

interface TechCardProps {
  title: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  accent: { text: string; bar: string };
}

const TechCard: React.FC<TechCardProps> = ({ title, value, sub, icon, accent }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="relative bg-zinc-950/40 border border-white/10 p-5 group overflow-hidden rounded-md"
    >
      <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10" />

      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className={`text-3xl ${accent.text}`}>{icon}</div>
        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{title}</div>
      </div>

      <div className="relative z-10">
        <div className="text-2xl font-black text-white tracking-tight">{value}</div>
        <div className="text-xs font-mono text-zinc-400 mt-1">{sub}</div>
      </div>

      <div
        className={`absolute bottom-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${accent.bar}`}
      />
    </motion.div>
  );
};

export default function IEMs_KZEDXUltra_HiFiLab() {
  return (
    <section className="relative w-full py-20 bg-[#050505] text-white">
      {/* HI-FI LAB: waveform glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.35),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.25),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(transparent 0, transparent 11px, rgba(255,255,255,0.06) 12px)',
            backgroundSize: '100% 12px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 border-l-4 border-cyan-500 pl-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            KZ EDX Ultra
          </h1>
          <p className="font-mono text-zinc-400 text-sm md:text-base">
            AUDIO_CLASS: IN_EAR_MONITOR // <span className="text-cyan-400">HI_FI_LAB_MODE</span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          {/* Image */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full border border-white/10 bg-zinc-950/40 p-8 rounded-md overflow-hidden">
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/10 blur-[80px]" />
              <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/10 blur-[90px]" />

              <Image
                src={iemImage}
                priority
                alt="KZ EDX Ultra"
                className="w-full h-auto object-contain grayscale-[15%] contrast-125 hover:grayscale-0 transition-all duration-700"
              />

              <div className="absolute bottom-4 left-4 text-[10px] font-mono text-zinc-500">
                MODEL: EDX_ULTRA // 10MM_DYNAMIC
              </div>
            </div>
          </div>

          {/* Specs */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-2xl font-black uppercase flex items-center gap-3">
              <GiSoundWaves className="text-cyan-400" /> Reference Tuning
            </h2>

            <p className="text-zinc-400 text-sm leading-relaxed mt-4 mb-8 border-l border-white/10 pl-4">
              A compact daily-driver IEM with a <strong className="text-white">10mm dynamic driver</strong>, tuned for
              punchy lows and crisp highs. Built to scale nicely with EQ and better sources.
            </p>

            <div className="space-y-6 bg-zinc-950/40 p-6 border border-white/10 rounded-md">
              <SegmentedGauge
                label="FREQUENCY RANGE :: EXTENDED"
                maxValue={40}
                unit="kHz"
                colorClass="text-cyan-400"
                step={1}
              />
              <SegmentedGauge
                label="IMPEDANCE :: EASY DRIVE"
                maxValue={23}
                unit="Ω"
                colorClass="text-purple-400"
                step={1}
              />

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-4 border border-white/10 rounded-md bg-black/20">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Sensitivity</div>
                  <div className="text-lg font-black text-emerald-400 mt-1">108dB</div>
                </div>
                <div className="p-4 border border-white/10 rounded-md bg-black/20">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Connector</div>
                  <div className="text-lg font-black text-cyan-300 mt-1">0.75mm</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <TechCard
            title="DRIVER"
            sub="Dynamic"
            value="10mm"
            icon={<GiSoundWaves />}
            accent={{ text: 'text-cyan-400', bar: 'bg-cyan-400' }}
          />
          <TechCard
            title="FREQ"
            sub="20Hz - 40kHz"
            value="Wide"
            icon={<FaMusic />}
            accent={{ text: 'text-blue-400', bar: 'bg-blue-400' }}
          />
          <TechCard
            title="IMPEDANCE"
            sub="Easy"
            value="23Ω"
            icon={<FaBolt />}
            accent={{ text: 'text-purple-400', bar: 'bg-purple-400' }}
          />
          <TechCard
            title="OUTPUT"
            sub="Sensitivity"
            value="108dB"
            icon={<FaVolumeUp />}
            accent={{ text: 'text-emerald-400', bar: 'bg-emerald-400' }}
          />
          <TechCard
            title="CABLE"
            sub="Detachable"
            value="0.75mm"
            icon={<FaPlug />}
            accent={{ text: 'text-yellow-400', bar: 'bg-yellow-400' }}
          />
          <TechCard
            title="MIC"
            sub="In-line"
            value="Yes"
            icon={<FaMicrophone />}
            accent={{ text: 'text-rose-400', bar: 'bg-rose-400' }}
          />
        </div>
      </div>
    </section>
  );
}