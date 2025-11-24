'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import {
  FaDesktop,
  FaTv,
  FaPalette,
  FaClock,
  FaEye,
  FaAdjust,
} from 'react-icons/fa';
import { MdHighQuality } from 'react-icons/md';
import { IoMdSpeedometer } from 'react-icons/io';

import targMonitor from '../Images/tar-g.png'; // Replace with your actual image

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

interface RefreshRateGaugeProps {
  maxHz: number;
  colorClass?: string;
}

// --- REFRESH RATE GAUGE ---
const RefreshRateGauge: React.FC<RefreshRateGaugeProps> = ({
  maxHz,
  colorClass = 'text-cyan-500',
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const totalSegments = 20;

  useEffect(() => {
    if (!isInView) return;

    let current = 0;
    const duration = 1500;
    const stepTime = (duration / maxHz) * 10;

    const timer = setInterval(() => {
      current += 10;
      if (current > maxHz) current = maxHz;
      setCount(current);
      if (current === maxHz) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, maxHz]);

  const filledSegments = Math.round((count / maxHz) * totalSegments);

  return (
    <div ref={ref} className="w-full">
      <div className="flex justify-between items-end mb-2 font-mono">
        <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
          Refresh Rate :: Display Performance
        </span>
        <span className={`text-xl font-bold ${colorClass}`}>{count}Hz</span>
      </div>

      <div className="flex gap-[2px] h-6 bg-black/50 p-[2px] border border-white/10 rounded">
        {Array.from({ length: totalSegments }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: i < filledSegments ? 1 : 0.15,
              backgroundColor: i < filledSegments ? 'currentColor' : '#1a1a1a',
            }}
            transition={{ duration: 0.15, delay: i * 0.02 }}
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
      className="relative bg-[#111] border border-gray-800 p-5 group overflow-hidden rounded"
    >
      {/* CORNER DECORATION */}
      <div
        className="absolute top-0 right-0 w-0 h-0 
          border-t-[16px] border-r-[16px] 
          border-t-transparent border-r-gray-800 
          z-0"
      />

      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className={`text-3xl ${accentColor.text}`}>{icon}</div>
        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
          {title}
        </div>
      </div>

      <div className="relative z-10">
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-xs font-mono text-gray-400 mt-1">{sub}</div>
      </div>

      {/* HOVER BAR */}
      <div
        className={`absolute bottom-0 left-0 w-full h-1 
          transform scale-x-0 group-hover:scale-x-100 
          transition-transform duration-300 origin-left 
          ${accentColor.bar}`}
      />
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
export default function TARGMonitor() {
  return (
    <section className="relative w-full py-20 bg-black text-white font-sans">
      {/* GRID BG */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* HEADER */}
        <div className="mb-16 border-l-4 border-cyan-600 pl-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-2">
            TARG 27&ldquo; Monitor
          </h1>

          <p className="font-mono text-gray-400 text-sm md:text-base">
            DISPLAY_ID: VISUAL_COMMAND_CENTER //{" "}
            <span className="text-cyan-500">QHD_180HZ</span>
          </p>
        </div>

        {/* MAIN ROW */}
        <div className="flex flex-col lg:flex-row gap-12 mb-20 lg:flex-row-reverse">
          {/* IMAGE */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full border-2 border-gray-800 bg-[#050505] p-8">
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white"></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white"></div>

              <Image
                src={targMonitor}
                alt="TARG 27 Monitor"
                className="w-full h-auto object-contain grayscale-[20%] contrast-125 hover:grayscale-0 transition-all duration-500"
                priority
              />

              <div className="absolute bottom-4 left-4 text-[10px] font-mono text-gray-600">
                MODEL: TARG-27 // QHD GAMING PANEL
              </div>
            </div>
          </div>

          {/* SPECS + GAUGE */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4 uppercase flex items-center gap-3">
                <FaDesktop className="text-cyan-500" /> Display & Performance
              </h2>

              <ul className="text-gray-400 text-sm leading-relaxed mb-8 border-l border-gray-700 pl-4 space-y-1">
                <li>
                  <strong>Resolution:</strong> 2560 x 1440 (QHD)
                </li>
                <li>
                  <strong>Refresh Rate:</strong> 180Hz
                </li>
                <li>
                  <strong>Panel Type:</strong> IPS / Fast Response
                </li>
                <li>
                  <strong>Size:</strong> 27&quot; Display
                </li>
                <li>
                  <strong>Response Time:</strong> 1ms (GtG)
                </li>
                <li>
                  <strong>Color Accuracy:</strong> 99% sRGB
                </li>
              </ul>

              <div className="space-y-6 bg-[#0a0a0a] p-6 border border-gray-800">
                <RefreshRateGauge
                  maxHz={180}
                  colorClass="text-cyan-500"
                />

                <div className="space-y-4 mt-6">
                  <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                      Pixel Density
                    </span>
                    <span className="text-lg font-bold text-purple-500">
                      109 PPI
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                      Aspect Ratio
                    </span>
                    <span className="text-lg font-bold text-blue-500">
                      16:9
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TECH GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <TechCard
            title="RESOLUTION"
            sub="Quad HD"
            value="1440p"
            icon={<MdHighQuality />}
            accentColor={{
              text: "text-cyan-500",
              bar: "bg-cyan-500",
            }}
          />

          <TechCard
            title="REFRESH"
            sub="High speed"
            value="180 Hz"
            icon={<IoMdSpeedometer />}
            accentColor={{
              text: "text-green-500",
              bar: "bg-green-500",
            }}
          />

          <TechCard
            title="PANEL"
            sub="IPS Technology"
            value="27 inch"
            icon={<FaTv />}
            accentColor={{
              text: "text-purple-500",
              bar: "bg-purple-500",
            }}
          />

          <TechCard
            title="RESPONSE"
            sub="Gray to Gray"
            value="1 ms"
            icon={<FaClock />}
            accentColor={{
              text: "text-yellow-500",
              bar: "bg-yellow-500",
            }}
          />

          <TechCard
            title="COLOR"
            sub="Coverage"
            value="99% sRGB"
            icon={<FaPalette />}
            accentColor={{
              text: "text-pink-500",
              bar: "bg-pink-500",
            }}
          />

          <TechCard
            title="ADAPTIVE"
            sub="Tear-free"
            value="FreeSync"
            icon={<FaAdjust />}
            accentColor={{
              text: "text-orange-500",
              bar: "bg-orange-500",
            }}
          />
        </div>
      </div>
    </section>
  );
}