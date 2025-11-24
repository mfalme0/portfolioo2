import React, { useEffect, useState } from "react";
import Image from "next/image";
import frontG15 from "../Images/g513ic.png";
import { motion, useInView } from "framer-motion";
import {
  FaMemory,
  FaHdd,
  FaDesktop,
  FaBolt,
  FaThermometerHalf,
} from "react-icons/fa";
import { SiNvidia, SiAmd } from "react-icons/si";
import { BsNvidia } from "react-icons/bs";

interface SegmentedGaugeProps {
  label: string;
  maxWatts: number;
  colorClass?: string;
}

interface TechCardProps {
  title: string;
  value: number | string;
  sub: string;
  icon: React.ReactNode;
  accentColor: {
    text: string;
    bar: string;
  };
}

// --- SEGMENTED GAUGE ---
const SegmentedGauge: React.FC<SegmentedGaugeProps> = ({
  label,
  maxWatts,
  colorClass,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const totalSegments = 20;

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1500;
      const stepTime = duration / maxWatts;
      const timer = setInterval(() => {
        start += 5;
        if (start > maxWatts) start = maxWatts;
        setCount(start);
        if (start === maxWatts) clearInterval(timer);
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, maxWatts]);

  const filledSegments = Math.round((count / maxWatts) * totalSegments);

  return (
    <div ref={ref} className="w-full">
      <div className="flex justify-between items-end mb-2 font-mono">
        <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
          {label}
        </span>
        <span className={`text-xl font-bold ${colorClass}`}>{count}W</span>
      </div>

      <div className="flex gap-[2px] h-6 bg-black p-[2px] border border-gray-700">
        {Array.from({ length: totalSegments }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: i < filledSegments ? 1 : 0.2,
              backgroundColor: i < filledSegments ? "currentColor" : "#333",
            }}
            transition={{ duration: 0.1 }}
            className={`flex-1 h-full ${colorClass}`}
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
export default function SecondaryRigSpecs() {
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
        <div className="mb-16 border-l-4 border-red-600 pl-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-2">
            ROG Strix G15
          </h1>

          <p className="font-mono text-gray-400 text-sm md:text-base">
            SYSTEM_ID: BATTLE_STATION_BETA //{" "}
            <span className="text-red-500">MAX_PERFORMANCE</span>
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
                src={frontG15}
                alt="ROG Strix G15"
                className="w-full h-auto object-contain grayscale-[20%] contrast-125 hover:grayscale-0 transition-all duration-500"
                priority
              />

              <div className="absolute bottom-4 left-4 text-[10px] font-mono text-gray-600">
                MODEL: G513IC // 15.6-INCH CHASSIS
              </div>
            </div>
          </div>

          {/* SPECS + GAUGES */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4 uppercase flex items-center gap-3">
                <FaBolt className="text-yellow-500" /> Power & Specs
              </h2>

              <ul className="text-gray-400 text-sm leading-relaxed mb-8 border-l border-gray-700 pl-4 space-y-1">
                <li>
                  <strong>CPU:</strong> AMD Ryzen 7 4800H
                </li>
                <li>
                  <strong>GPU:</strong> NVIDIA RTX 3050
                </li>
                <li>
                  <strong>RAM:</strong> 16GB DDR4
                </li>
                <li>
                  <strong>Storage:</strong> 1TB NVMe SSD
                </li>
                <li>
                  <strong>Cooling:</strong> Liquid Metal
                </li>
                <li>
                  <strong>Display:</strong> 15.6 HD, 144Hz
                </li>
              </ul>

              <div className="space-y-6 bg-[#0a0a0a] p-6 border border-gray-800">
                <SegmentedGauge
                  label="CPU :: AMD Ryzen 7 4800H"
                  maxWatts={90}
                  colorClass="text-orange-500"
                />

                <SegmentedGauge
                  label="GPU :: NVIDIA RTX 3050"
                  maxWatts={75}
                  colorClass="text-green-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* TECH GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <TechCard
            title="GPU"
            sub="NVIDIA GeForce"
            value="RTX 3050"
            icon={<BsNvidia />}
            accentColor={{
              text: "text-green-500",
              bar: "bg-green-500",
            }}
          />

          <TechCard
            title="CPU"
            sub="8 Cores / 16 Threads"
            value="Ryzen 7 4800H"
            icon={<SiAmd />}
            accentColor={{
              text: "text-orange-500",
              bar: "bg-orange-500",
            }}
          />

          <TechCard
            title="RAM"
            sub="DDR4 3200MHz"
            value="16 GB"
            icon={<FaMemory />}
            accentColor={{
              text: "text-purple-500",
              bar: "bg-purple-500",
            }}
          />

          <TechCard
            title="DISPLAY"
            sub="15.6 HD"
            value="144 Hz"
            icon={<FaDesktop />}
            accentColor={{
              text: "text-cyan-500",
              bar: "bg-cyan-500",
            }}
          />

          <TechCard
            title="STORAGE"
            sub="NVMe SSD"
            value="1 TB"
            icon={<FaHdd />}
            accentColor={{
              text: "text-yellow-500",
              bar: "bg-yellow-500",
            }}
          />

          <TechCard
            title="THERMALS"
            sub="Liquid Metal"
            value="Dual-Fan"
            icon={<FaThermometerHalf />}
            accentColor={{
              text: "text-red-500",
              bar: "bg-red-500",
            }}
          />
        </div>
      </div>
    </section>
  );
}
