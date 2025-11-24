'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
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
export default function GProWireless() {
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
        <div className="mb-16 border-l-4 border-blue-600 pl-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-2">
            G Pro Wireless
          </h1>

          <p className="font-mono text-gray-400 text-sm md:text-base">
            DEVICE_ID: ESPORTS_MOUSE_ALPHA //{" "}
            <span className="text-blue-500">LIGHTSPEED_ENABLED</span>
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
                src={gpro}
                alt="G Pro Wireless"
                className="w-full h-auto object-contain grayscale-[20%] contrast-125 hover:grayscale-0 transition-all duration-500"
                priority
              />

              <div className="absolute bottom-4 left-4 text-[10px] font-mono text-gray-600">
                MODEL: G-PRO-WIRELESS // HERO 25K SENSOR
              </div>
            </div>
          </div>

          {/* SPECS */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4 uppercase flex items-center gap-3">
                <FaBolt className="text-blue-500" /> Performance & Specs
              </h2>

              <ul className="text-gray-400 text-sm leading-relaxed mb-8 border-l border-gray-700 pl-4 space-y-1">
                <li>
                  <strong>Sensor:</strong> HERO 25K
                </li>
                <li>
                  <strong>Connection:</strong> LIGHTSPEED Wireless
                </li>
                <li>
                  <strong>Weight:</strong> 80g Ultra-lightweight
                </li>
                <li>
                  <strong>Battery:</strong> 48-60 hours
                </li>
                <li>
                  <strong>Switches:</strong> Mechanical 50M clicks
                </li>
                <li>
                  <strong>Latency:</strong> 1ms Response time
                </li>
              </ul>

              <div className="bg-[#0a0a0a] p-6 border border-gray-800">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                      DPI Range
                    </span>
                    <span className="text-lg font-bold text-blue-500">
                      100 - 25,600
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                      IPS Tracking
                    </span>
                    <span className="text-lg font-bold text-purple-500">
                      400+ IPS
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                      Acceleration
                    </span>
                    <span className="text-lg font-bold text-cyan-500">
                      40G Max
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
            title="SENSOR"
            sub="Zero smoothing"
            value="HERO 25K"
            icon={<FaMicrochip />}
            accentColor={{
              text: "text-blue-500",
              bar: "bg-blue-500",
            }}
          />

          <TechCard
            title="WIRELESS"
            sub="1ms latency"
            value="LIGHTSPEED"
            icon={<FaWifi />}
            accentColor={{
              text: "text-cyan-500",
              bar: "bg-cyan-500",
            }}
          />

          <TechCard
            title="WEIGHT"
            sub="Ultra-light"
            value="80 g"
            icon={<FaWeightHanging />}
            accentColor={{
              text: "text-purple-500",
              bar: "bg-purple-500",
            }}
          />

          <TechCard
            title="BATTERY"
            sub="Continuous use"
            value="48-60 hrs"
            icon={<FaBatteryFull />}
            accentColor={{
              text: "text-green-500",
              bar: "bg-green-500",
            }}
          />

          <TechCard
            title="CHARGING"
            sub="Micro-USB"
            value="PowerPlay"
            icon={<FaBolt />}
            accentColor={{
              text: "text-yellow-500",
              bar: "bg-yellow-500",
            }}
          />

          <TechCard
            title="SWITCHES"
            sub="Rated clicks"
            value="50M"
            icon={<SiLogitech />}
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