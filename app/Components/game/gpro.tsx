'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import {
  FaWifi,
  FaBolt,
  FaWeightHanging,
  FaMicrochip,
  FaBatteryFull,
} from 'react-icons/fa';
import { SiLogitech } from 'react-icons/si';

import gpro from '../Images/gpro.webp';

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
      {/* subtle hover sheen */}
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

export default function GProWireless() {
  const prefersReducedMotion = useReducedMotion();

  const stats = useMemo(
    () => [
      { k: 'DPI Range', v: '100 – 25,600', c: 'text-blue-500' },
      { k: 'IPS Tracking', v: '400+ IPS', c: 'text-purple-500' },
      { k: 'Acceleration', v: '40G Max', c: 'text-cyan-500' },
    ],
    []
  );

  return (
    <section className="relative w-full py-20 bg-[#050505] text-white overflow-hidden">
      {/* “tracking surface” background: softer than grid */}
      <div className="absolute inset-0 z-0">
        {/* spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(59,130,246,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(34,211,238,0.10),transparent_55%)]" />

        {/* micro-dot tracking texture */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />

        {/* noise */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* HEADER */}
        <div className="mb-14 border-l-4 border-blue-600 pl-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-2">
            G Pro Wireless
          </h1>
          <p className="font-mono text-zinc-400 text-sm md:text-base">
            DEVICE_ID: ESPORTS_MOUSE_ALPHA //{' '}
            <span className="text-blue-500">LIGHTSPEED_ENABLED</span>
          </p>
        </div>

        {/* MAIN ROW */}
        <div className="flex flex-col lg:flex-row-reverse gap-12 mb-16">
          {/* IMAGE */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full border border-white/10 bg-white/[0.02] backdrop-blur-xl p-6 md:p-8 rounded-sm overflow-hidden">
              {/* sensor sweep (subtle) */}
              {!prefersReducedMotion && (
                <motion.div
                  aria-hidden
                  initial={{ x: '-120%' }}
                  animate={{ x: '120%' }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/8 to-transparent blur-xl opacity-60"
                />
              )}

              <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-white/40" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-white/40" />

              <Image
                src={gpro}
                alt="G Pro Wireless"
                className="relative z-10 w-full h-auto object-contain grayscale-[15%] contrast-125 hover:grayscale-0 transition-all duration-500"
                priority
              />

              <div className="absolute bottom-4 left-4 text-[10px] font-mono text-zinc-500">
                MODEL: G-PRO-WIRELESS // HERO 25K SENSOR
              </div>
            </div>
          </div>

          {/* SPECS */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 uppercase flex items-center gap-3">
                <FaBolt className="text-blue-500" /> Performance & Specs
              </h2>

              <ul className="text-zinc-400 text-sm leading-relaxed mb-8 border-l border-white/10 pl-4 space-y-1">
                <li><strong className="text-white">Sensor:</strong> HERO 25K</li>
                <li><strong className="text-white">Connection:</strong> LIGHTSPEED Wireless</li>
                <li><strong className="text-white">Weight:</strong> 80g Ultra-lightweight</li>
                <li><strong className="text-white">Battery:</strong> 48–60 hours</li>
                <li><strong className="text-white">Switches:</strong> Mechanical 50M clicks</li>
                <li><strong className="text-white">Latency:</strong> 1ms Response time</li>
              </ul>

              {/* STAT PANEL (feels like “instrument readout”) */}
              <div className="bg-white/[0.02] p-6 border border-white/10 rounded-sm backdrop-blur-xl">
                <div className="space-y-4">
                  {stats.map((s) => (
                    <div key={s.k} className="flex justify-between items-center border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                      <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                        {s.k}
                      </span>
                      <span className={`text-lg font-semibold ${s.c}`}>
                        {s.v}
                      </span>
                    </div>
                  ))}
                </div>

                {/* tiny footer */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                  <span> SENSOR_PROFILE_LOCKED</span>
                  <span className="text-blue-400">READY</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TECH GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <TechCard
            title="SENSOR"
            sub="Zero smoothing"
            value="HERO 25K"
            icon={<FaMicrochip />}
            accentColor={{ text: 'text-blue-500', bar: 'bg-blue-500' }}
          />
          <TechCard
            title="WIRELESS"
            sub="1ms latency"
            value="LIGHTSPEED"
            icon={<FaWifi />}
            accentColor={{ text: 'text-cyan-500', bar: 'bg-cyan-500' }}
          />
          <TechCard
            title="WEIGHT"
            sub="Ultra-light"
            value="80 g"
            icon={<FaWeightHanging />}
            accentColor={{ text: 'text-purple-500', bar: 'bg-purple-500' }}
          />
          <TechCard
            title="BATTERY"
            sub="Continuous use"
            value="48–60 hrs"
            icon={<FaBatteryFull />}
            accentColor={{ text: 'text-emerald-500', bar: 'bg-emerald-500' }}
          />
          <TechCard
            title="CHARGING"
            sub="Micro-USB"
            value="PowerPlay"
            icon={<FaBolt />}
            accentColor={{ text: 'text-yellow-500', bar: 'bg-yellow-500' }}
          />
          <TechCard
            title="SWITCHES"
            sub="Rated clicks"
            value="50M"
            icon={<SiLogitech />}
            accentColor={{ text: 'text-orange-500', bar: 'bg-orange-500' }}
          />
        </div>
      </div>
    </section>
  );
}