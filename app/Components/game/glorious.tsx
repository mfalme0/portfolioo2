import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import modelOImage from '../Images/model0.png';
import { motion, useInView } from 'framer-motion';
import { FaMouse, FaBolt, FaWeightHanging, FaPalette, FaSkullCrossbones, FaArchive } from 'react-icons/fa';
import { MdSpeed } from 'react-icons/md';
import { RiAlertFill } from 'react-icons/ri';

// ---------------------------------------------
// 1. SEGMENT GAUGE (Modified for decommissioned look)
// ---------------------------------------------

interface SegmentedGaugeProps {
  label: string;
  maxValue: number;
  unit: string;
  colorClass?: string;
}

const SegmentedGauge: React.FC<SegmentedGaugeProps> = ({ label, maxValue, unit, colorClass }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  const totalSegments = 20;

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1500;
      const stepTime = duration / maxValue;

      const timer = setInterval(() => {
        start += Math.ceil(maxValue / 100);
        if (start > maxValue) start = maxValue;
        setCount(start);
        if (start === maxValue) clearInterval(timer);
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, maxValue]);

  const filledSegments = Math.round((count / maxValue) * totalSegments);

  return (
    <div ref={ref} className="w-full opacity-60">
      <div className="flex justify-between items-end mb-2 font-mono">
        <span className="text-gray-500 text-xs font-bold uppercase tracking-wider line-through">{label}</span>
        <span className={`text-xl font-bold ${colorClass}`}>{count}{unit}</span>
      </div>

      <div className="flex gap-[2px] h-6 bg-black p-[2px] border border-gray-700">
        {Array.from({ length: totalSegments }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: i < filledSegments ? 0.5 : 0.2,
              backgroundColor: i < filledSegments ? 'currentColor' : '#333'
            }}
            transition={{ duration: 0.1 }}
            className={`flex-1 h-full ${colorClass}`}
          />
        ))}
      </div>
    </div>
  );
};

// ---------------------------------------------
// 2. TECH CARD (Modified for decommissioned look)
// ---------------------------------------------

interface TechCardProps {
  title: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  accentColor: {
    text: string;
    border: string;
    bar: string;
  };
}

const TechCard: React.FC<TechCardProps> = ({ title, value, sub, icon, accentColor }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative bg-[#111] border border-gray-800 p-5 group overflow-hidden rounded opacity-70"
    >
      {/* X Overlay for decommissioned */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity">
        <div className="text-red-600 text-6xl font-black">✕</div>
      </div>

      {/* Decorative Corner */}
      <div
        className={`
          absolute top-0 right-0 w-0 h-0 
          border-t-[14px] border-r-[14px] 
          border-t-transparent border-r-gray-800 
          transition-colors duration-300 
          group-hover:bg-transparent
        `}
      />

      <div className="flex items-start justify-between mb-4">
        <div className={`text-3xl ${accentColor.text} grayscale`}>{icon}</div>
        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest line-through">{title}</div>
      </div>

      <div className="relative z-10">
        <div className="text-2xl font-bold text-gray-500 line-through">{value}</div>
        <div className="text-xs font-mono text-gray-600 mt-1">{sub}</div>
      </div>

      {/* Bottom Hover Bar */}
      <div
        className={`
          absolute bottom-0 left-0 w-full h-1 
          transform scale-x-0 group-hover:scale-x-100 
          transition-transform duration-300 origin-left 
          bg-gray-700
        `}
      />
    </motion.div>
  );
};

// ---------------------------------------------
// 3. MAIN COMPONENT
// ---------------------------------------------

export default function GloriousModelOShowcase() {
  return (
    <section className="relative w-full py-20 bg-black text-white font-sans">

      {/* GRID BACKGROUND */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Diagonal Warning Stripes */}
      <div 
        className="absolute inset-0 z-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 50px, #ff0000 50px, #ff0000 60px)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* HEADER */}
        <div className="mb-16 border-l-4 border-gray-600 pl-6 relative">
          <div className="absolute -left-3 top-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rotate-[-5deg] shadow-lg">
            DECOMMISSIONED
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-400">
            Glorious Model O
          </h1>
          <p className="font-mono text-gray-500 text-sm md:text-base">
            DEVICE_CLASS: GAMING_MOUSE // <span className="text-red-500">STATUS: RETIRED</span>
          </p>
          
          {/* Warning Banner */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-3 bg-red-950/30 border border-red-900/50 p-3 rounded"
          >
            <RiAlertFill className="text-red-500 text-2xl flex-shrink-0" />
            <div>
              <p className="text-red-400 text-sm font-bold uppercase">Unit Retired</p>
              <p className="text-gray-400 text-xs">This device has been decommissioned and replaced by AULA SC660</p>
            </div>
          </motion.div>
        </div>

        {/* MAIN GRID */}
        <div className="flex flex-col lg:flex-row gap-12 mb-20">

          {/* LEFT IMAGE */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full border-2 border-gray-800 bg-[#050505] p-8">
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-gray-600" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-gray-600" />

              {/* Archived Stamp */}
              <div className="absolute top-4 right-4 z-10">
                <FaArchive className="text-gray-600 text-4xl opacity-50" />
              </div>

              <Image
                src={modelOImage}
                priority
                alt="Glorious Model O [DECOMMISSIONED]"
                className="w-full h-auto object-contain grayscale opacity-60 hover:opacity-70 transition-all duration-500"
              />

              <div className="absolute bottom-4 left-4 text-[10px] font-mono text-gray-600">
                MODEL: GLORIOUS-O // ARCHIVED: 2024
              </div>
            </div>
          </div>

          {/* RIGHT SIDE SPECS */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4 uppercase flex items-center gap-3 text-gray-400">
                <FaSkullCrossbones className="text-gray-600" /> Legacy Specifications
              </h2>

              <p className="text-gray-500 text-sm leading-relaxed mb-8 border-l border-gray-700 pl-4">
                The <strong className="text-gray-400">Glorious Model O</strong> served admirably with its 
                <strong className="text-gray-400"> 12000 DPI sensor</strong> and ultra-lightweight design. 
                After extensive service, this unit has been retired and archived. 
                <span className="text-red-500"> Successor: AULA SC660</span>
              </p>

              <div className="space-y-6 bg-[#0a0a0a] p-6 border border-gray-800">
                <SegmentedGauge
                  label="DPI SENSITIVITY :: ARCHIVED SPEC"
                  maxValue={12000}
                  unit=""
                  colorClass="text-gray-500"
                />
                <SegmentedGauge
                  label="POLLING RATE :: LEGACY SYSTEM"
                  maxValue={1000}
                  unit="Hz"
                  colorClass="text-gray-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* TECH CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

          <TechCard
            title="DPI"
            sub="Legacy Sensor"
            value="12K"
            icon={<MdSpeed />}
            accentColor={{
              text: "text-gray-500",
              border: "border-r-gray-600",
              bar: "bg-gray-700"
            }}
          />

          <TechCard
            title="POLLING"
            sub="Archived"
            value="1000Hz"
            icon={<FaBolt />}
            accentColor={{
              text: "text-gray-500",
              border: "border-r-gray-600",
              bar: "bg-gray-700"
            }}
          />

          <TechCard
            title="WEIGHT"
            sub="Ultra-Light"
            value="67g"
            icon={<FaWeightHanging />}
            accentColor={{
              text: "text-gray-500",
              border: "border-r-gray-600",
              bar: "bg-gray-700"
            }}
          />

          <TechCard
            title="CABLE"
            sub="Wired Only"
            value="Braided"
            icon={<FaMouse />}
            accentColor={{
              text: "text-gray-500",
              border: "border-r-gray-600",
              bar: "bg-gray-700"
            }}
          />

          <TechCard
            title="STATUS"
            sub="Out of Service"
            value="RETIRED"
            icon={<FaArchive />}
            accentColor={{
              text: "text-red-600",
              border: "border-r-red-600",
              bar: "bg-red-700"
            }}
          />

          <TechCard
            title="RGB"
            sub="Honeycomb Shell"
            value="Multi"
            icon={<FaPalette />}
            accentColor={{
              text: "text-gray-500",
              border: "border-r-gray-600",
              bar: "bg-gray-700"
            }}
          />

        </div>
      </div>
    </section>
  );
}