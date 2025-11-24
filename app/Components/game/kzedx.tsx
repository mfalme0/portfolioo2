import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import edxImage from '../Images/kz-edx.png';
import { motion, useInView } from 'framer-motion';
import { FaHeadphones, FaBolt, FaMusic, FaMicrophone, FaPlug, FaVolumeUp } from 'react-icons/fa';
import { GiSoundWaves } from 'react-icons/gi';

// ---------------------------------------------
// 1. SEGMENT GAUGE
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
    <div ref={ref} className="w-full">
      <div className="flex justify-between items-end mb-2 font-mono">
        <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">{label}</span>
        <span className={`text-xl font-bold ${colorClass}`}>{count}{unit}</span>
      </div>

      <div className="flex gap-[2px] h-6 bg-black p-[2px] border border-gray-700">
        {Array.from({ length: totalSegments }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: i < filledSegments ? 1 : 0.2,
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
// 2. TECH CARD
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
      className="relative bg-[#111] border border-gray-800 p-5 group overflow-hidden rounded"
    >
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
        <div className={`text-3xl ${accentColor.text}`}>{icon}</div>
        <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{title}</div>
      </div>

      <div className="relative z-10">
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-xs font-mono text-gray-400 mt-1">{sub}</div>
      </div>

      {/* Bottom Hover Bar */}
      <div
        className={`
          absolute bottom-0 left-0 w-full h-1 
          transform scale-x-0 group-hover:scale-x-100 
          transition-transform duration-300 origin-left 
          ${accentColor.bar}
        `}
      />
    </motion.div>
  );
};

// ---------------------------------------------
// 3. MAIN COMPONENT
// ---------------------------------------------

export default function KZEDXUltraShowcase() {
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* HEADER */}
        <div className="mb-16 border-l-4 border-cyan-600 pl-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">KZ EDX Ultra</h1>
          <p className="font-mono text-gray-400 text-sm md:text-base">
            AUDIO_CLASS: IN-EAR_MONITOR // <span className="text-cyan-500">DYNAMIC_DRIVER</span>
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="flex flex-col lg:flex-row gap-12 mb-20">

          {/* LEFT IMAGE */}
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full border-2 border-gray-800 bg-[#050505] p-8">
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white" />

              <Image
                src={edxImage}
                priority
                alt="KZ EDX Ultra"
                className="w-full h-auto object-contain grayscale-[20%] contrast-125 hover:grayscale-0 transition-all duration-500"
              />

              <div className="absolute bottom-4 left-4 text-[10px] font-mono text-gray-600">
                MODEL: EDX-ULTRA // 10MM DYNAMIC
              </div>
            </div>
          </div>

          {/* RIGHT SIDE SPECS */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4 uppercase flex items-center gap-3">
                <FaBolt className="text-yellow-500" /> Audio Performance
              </h2>

              <p className="text-gray-400 text-sm leading-relaxed mb-8 border-l border-gray-700 pl-4">
                The <strong className="text-white">10mm dynamic driver</strong> delivers rich, balanced sound with 
                impressive bass response. <strong className="text-white">Wide frequency range</strong> from 20Hz to 40kHz 
                captures every detail in your music with crystal clarity.
              </p>

              <div className="space-y-6 bg-[#0a0a0a] p-6 border border-gray-800">
                <SegmentedGauge
                  label="FREQUENCY RESPONSE :: ULTRA-WIDE"
                  maxValue={40}
                  unit="kHz"
                  colorClass="text-cyan-500"
                />
                <SegmentedGauge
                  label="IMPEDANCE :: EASY TO DRIVE"
                  maxValue={23}
                  unit="Ω"
                  colorClass="text-purple-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* TECH CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

          <TechCard
            title="DRIVER"
            sub="Dynamic Driver"
            value="10mm"
            icon={<GiSoundWaves />}
            accentColor={{
              text: "text-cyan-500",
              border: "border-r-cyan-500",
              bar: "bg-cyan-500"
            }}
          />

          <TechCard
            title="FREQ"
            sub="20Hz - 40kHz"
            value="Ultra"
            icon={<FaMusic />}
            accentColor={{
              text: "text-blue-500",
              border: "border-r-blue-500",
              bar: "bg-blue-500"
            }}
          />

          <TechCard
            title="IMPEDANCE"
            sub="Easy Drive"
            value="23Ω"
            icon={<FaBolt />}
            accentColor={{
              text: "text-purple-500",
              border: "border-r-purple-500",
              bar: "bg-purple-500"
            }}
          />

          <TechCard
            title="SENSITIVITY"
            sub="High Output"
            value="108dB"
            icon={<FaVolumeUp />}
            accentColor={{
              text: "text-green-500",
              border: "border-r-green-500",
              bar: "bg-green-500"
            }}
          />

          <TechCard
            title="CABLE"
            sub="Detachable"
            value="0.75mm"
            icon={<FaPlug />}
            accentColor={{
              text: "text-yellow-500",
              border: "border-r-yellow-500",
              bar: "bg-yellow-500"
            }}
          />

          <TechCard
            title="MIC"
            sub="Built-in Control"
            value="In-Line"
            icon={<FaMicrophone />}
            accentColor={{
              text: "text-red-500",
              border: "border-r-red-500",
              bar: "bg-red-500"
            }}
          />

        </div>
      </div>
    </section>
  );
}