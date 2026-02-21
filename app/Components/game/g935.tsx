/* eslint-disable react/jsx-no-comment-textnodes */
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import {
  FaWifi,
  FaBatteryFull,
  FaMicrophone,
  FaHeadphones,
} from 'react-icons/fa';
import { GiSoundWaves } from 'react-icons/gi';
import { SiLogitech } from 'react-icons/si';

import g935Headset from '../Images/g935.webp';

// ---------------------------------------------
// 1. LOG SEGMENT GAUGE (for Audio ranges)
// ---------------------------------------------
interface LogSegmentGaugeProps {
  label: string;
  value: number;     // e.g. 20000
  maxValue: number;  // e.g. 20000
  unit?: string;     // "Hz"
  colorClass?: string;
  note?: string;     // small subtitle
}

const LogSegmentGauge: React.FC<LogSegmentGaugeProps> = ({
  label,
  value,
  maxValue,
  unit = '',
  colorClass = 'text-cyan-500',
  note,
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });

  const totalSegments = 20;

  // log scale: great for frequency
  const log01 = (n: number) => {
    const safe = Math.max(1, n);
    return Math.log10(safe);
  };

  const ratio = useMemo(() => {
    const v = Math.min(Math.max(value, 1), maxValue);
    const r = log01(v) / log01(maxValue);
    return Number.isFinite(r) ? r : 0;
  }, [value, maxValue]);

  const targetSegments = Math.max(0, Math.min(totalSegments, Math.round(ratio * totalSegments)));

  const [filled, setFilled] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let current = 0;
    const step = () => {
      current += 1;
      setFilled(current);
      if (current >= targetSegments) return;
      window.setTimeout(step, 35);
    };

    step();
    return () => {};
  }, [isInView, targetSegments]);

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-end justify-between mb-2 font-mono">
        <div className="flex flex-col gap-1">
          <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">{label}</span>
          {note ? (
            <span className="text-[10px] text-gray-600 tracking-widest uppercase">{note}</span>
          ) : null}
        </div>

        <span className={`text-xl font-bold ${colorClass}`}>
          {value.toLocaleString()}
          {unit}
        </span>
      </div>

      <div className="flex gap-[2px] h-6 bg-black/50 p-[2px] border border-white/10 rounded">
        {Array.from({ length: totalSegments }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: i < filled ? 1 : 0.15,
              backgroundColor: i < filled ? 'currentColor' : '#1a1a1a',
            }}
            transition={{ duration: 0.15, delay: i * 0.015 }}
            className={`flex-1 h-full rounded-sm ${colorClass}`}
          />
        ))}
      </div>
    </div>
  );
};

// ---------------------------------------------
// 2. TECH CARD (same as your gear style)
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
      whileHover={{ y: -5 }}
      className="relative bg-[#111] border border-gray-800 p-5 group overflow-hidden rounded"
    >
      <div
        className="absolute top-0 right-0 w-0 h-0 
          border-t-[16px] border-r-[16px] 
          border-t-transparent border-r-gray-800 
          z-0"
      />
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className={`text-3xl ${accentColor.text}`}>{icon}</div>
        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{title}</div>
      </div>

      <div className="relative z-10">
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-xs font-mono text-gray-400 mt-1">{sub}</div>
      </div>

      <div
        className={`absolute bottom-0 left-0 w-full h-1 
          transform scale-x-0 group-hover:scale-x-100 
          transition-transform duration-300 origin-left 
          ${accentColor.bar}`}
      />
    </motion.div>
  );
};

// ---------------------------------------------
// 3. MAIN COMPONENT
// ---------------------------------------------
export default function G935Headset() {
  return (
    <section className="relative w-full py-20 bg-black text-white font-sans">
      {/* GRID BG */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* HEADER */}
        <div className="mb-16 border-l-4 border-blue-600 pl-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-2">
            Logitech G935
          </h1>

          <p className="font-mono text-gray-400 text-sm md:text-base">
            AUDIO_ID: WIRELESS_GAMING_HEADSET //{' '}
            <span className="text-blue-500">DTS_X_2.0_SURROUND</span>
          </p>

          {/* “Special” chip row */}
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[10px] tracking-[0.25em] uppercase text-gray-300 font-mono">
              PRO-G 50MM
            </span>
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[10px] tracking-[0.25em] uppercase text-gray-300 font-mono">
              LIGHTSPEED
            </span>
            <span className="px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-[10px] tracking-[0.25em] uppercase text-blue-300 font-mono">
              FLIP-TO-MUTE
            </span>
          </div>
        </div>

        {/* MAIN ROW */}
        <div className="flex flex-col lg:flex-row gap-12 mb-20 lg:flex-row-reverse">
          {/* IMAGE */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full border-2 border-gray-800 bg-[#050505] p-8">
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white" />

              <Image
                src={g935Headset}
                alt="Logitech G935"
                className="w-full h-auto object-contain grayscale-[20%] contrast-125 hover:grayscale-0 transition-all duration-500"
                priority
              />

              <div className="absolute bottom-4 left-4 text-[10px] font-mono text-gray-600">
                MODEL: G935 // PRO-G 50MM DRIVERS
              </div>
            </div>
          </div>

          {/* SPECS + GAUGES */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4 uppercase flex items-center gap-3">
                <GiSoundWaves className="text-blue-500" /> Audio & Features
              </h2>

              <ul className="text-gray-400 text-sm leading-relaxed mb-8 border-l border-gray-700 pl-4 space-y-1">
                <li>
                  <strong>Drivers:</strong> Pro-G 50mm
                </li>
                <li>
                  <strong>Surround:</strong> DTS Headphone:X 2.0
                </li>
                <li>
                  <strong>Connection:</strong> LIGHTSPEED Wireless
                </li>
                <li>
                  <strong>Battery:</strong> 12 hours (RGB on)
                </li>
                <li>
                  <strong>Microphone:</strong> 6mm Flip-to-mute
                </li>
                <li>
                  <strong>RGB:</strong> LIGHTSYNC customizable
                </li>
              </ul>

              <div className="space-y-6 bg-[#0a0a0a] p-6 border border-gray-800">
                <LogSegmentGauge
                  label="Frequency Response"
                  note="LOW END"
                  value={100}
                  maxValue={20000}
                  unit="Hz"
                  colorClass="text-purple-500"
                />

                <LogSegmentGauge
                  label="Frequency Response"
                  note="HIGH END"
                  value={20000}
                  maxValue={20000}
                  unit="Hz"
                  colorClass="text-cyan-500"
                />

                {/* “Spectrum” micro-bar */}
                <div className="pt-4 border-t border-gray-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                      Sound Profile
                    </span>
                    <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                      V-curve
                    </span>
                  </div>

                  <div className="flex gap-1 h-10">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, height: 6 }}
                        whileInView={{
                          opacity: 1,
                          height: 6 + Math.abs(Math.sin((i + 2) * 0.55)) * 28,
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.02 }}
                        className="flex-1 bg-white/10 rounded-sm"
                      />
                    ))}
                  </div>

                  <div className="space-y-4 mt-6">
                    <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                      <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                        Impedance
                      </span>
                      <span className="text-lg font-bold text-green-500">39 Ohms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                        Wireless Range
                      </span>
                      <span className="text-lg font-bold text-blue-500">15 meters</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* TECH GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <TechCard
            title="DRIVERS"
            sub="Pro-G Audio"
            value="50 mm"
            icon={<FaHeadphones />}
            accentColor={{ text: 'text-blue-500', bar: 'bg-blue-500' }}
          />

          <TechCard
            title="SURROUND"
            sub="Immersive"
            value="DTS:X 2.0"
            icon={<GiSoundWaves />}
            accentColor={{ text: 'text-purple-500', bar: 'bg-purple-500' }}
          />

          <TechCard
            title="WIRELESS"
            sub="2.4GHz"
            value="LIGHTSPEED"
            icon={<FaWifi />}
            accentColor={{ text: 'text-cyan-500', bar: 'bg-cyan-500' }}
          />

          <TechCard
            title="BATTERY"
            sub="RGB Active"
            value="12 hrs"
            icon={<FaBatteryFull />}
            accentColor={{ text: 'text-green-500', bar: 'bg-green-500' }}
          />

          <TechCard
            title="MIC"
            sub="Flip-to-mute"
            value="6 mm"
            icon={<FaMicrophone />}
            accentColor={{ text: 'text-yellow-500', bar: 'bg-yellow-500' }}
          />

          <TechCard
            title="RGB"
            sub="Customizable"
            value="LIGHTSYNC"
            icon={<SiLogitech />}
            accentColor={{ text: 'text-pink-500', bar: 'bg-pink-500' }}
          />
        </div>
      </div>
    </section>
  );
}