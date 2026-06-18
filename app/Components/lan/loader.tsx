'use client'
import React, { useState, useEffect } from "react";
import { useTheme } from '@/app/Context/theme';
import { motion, AnimatePresence } from "framer-motion";
import { FaTerminal, FaCog, FaCheck } from "react-icons/fa";

const loadingLogs = [
  "INITIALIZING_PERIPHERAL_DATABASE...",
  "DETECTING_INPUT_DEVICES...",
  "CALIBRATING_HERO_SENSORS...",
  "SYNCING_AULA_F75_FIRMWARE...",
  "ESTABLISHING_AUDIO_UPLINK (DTS:X)...",
  "OPTIMIZING_REFRESH_RATES (180Hz)...",
  "VERIFYING_UPS_VOLTAGE...",
  "LOADOUT_CONFIGURATION_VALIDATED."
];

interface LanLoaderProps {
  onComplete: () => void;
}

export default function LanLoader({ onComplete }: LanLoaderProps) {
  const { accent } = useTheme();
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const totalDuration = 2500;
    const intervalTime = 50;
    const steps = totalDuration / intervalTime;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 / steps);
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    const logTimer = setInterval(() => {
      setLogIndex((prev) => (prev < loadingLogs.length - 1 ? prev + 1 : prev));
    }, totalDuration / loadingLogs.length);

    return () => {
      clearInterval(timer);
      clearInterval(logTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ y: "-100%", transition: { duration: 0.8, ease: "easeInOut" } }}
        className="fixed inset-0 z-50 bg-[#050505] font-mono flex flex-col items-center justify-center p-6 overflow-hidden"
        style={{ color: accent }}
      >
        {/* ROG grid */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }} />
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }} />

        {/* Scan lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(transparent 50%, black 50%)', backgroundSize: '100% 4px' }} />

        <div className="relative z-10 w-full max-w-lg border bg-black/80 p-8"
          style={{ borderColor: accent + '66', boxShadow: `0 0 60px ${accent}14` }}>
          {/* Header */}
          <div className="flex justify-between items-end mb-8 pb-2"
            style={{ borderBottom: `1px solid ${accent}4d` }}>
            <div className="flex items-center gap-2">
              <FaTerminal className="animate-pulse" style={{ color: accent }} />
              <span className="text-sm font-bold tracking-widest" style={{ color: accent }}>SYSTEM_BOOT</span>
            </div>
            <div className="text-xs text-zinc-600">V.2.0.4</div>
          </div>

          {/* Progress */}
          <div className="flex flex-col items-center mb-8">
            <div className="text-6xl font-black mb-2 tabular-nums tracking-tighter text-white">
              {Math.round(progress)}%
            </div>
            <div className="w-full h-[2px] bg-zinc-900 overflow-hidden">
              <motion.div
                className="h-full"
                style={{ width: `${progress}%`, backgroundImage: `linear-gradient(to right, ${accent}, ${accent}cc, ${accent}cc)` }}
              />
            </div>
          </div>

          {/* Console Logs */}
          <div className="h-16 flex flex-col justify-end items-start border-l-2 pl-4 p-2 text-xs md:text-sm"
            style={{ borderColor: `${accent}4d`, background: `${accent}08` }}>
            <span className="text-zinc-600 mb-1">{loadingLogs[logIndex - 1] || "..."}</span>
            <span className="font-bold flex items-center gap-2 text-white">
              <span className="animate-ping w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
              {loadingLogs[logIndex]}
            </span>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-between text-[10px] text-zinc-600 uppercase tracking-wider">
            <div className="flex gap-4">
              <span style={{ color: `${accent}99` }}>Mem: OK</span>
              <span style={{ color: `${accent}99` }}>GPU: OK</span>
              <span style={{ color: `${accent}99` }}>I/O: OK</span>
            </div>
            <div className="flex items-center gap-1" style={{ color: `${accent}cc` }}>
              {progress === 100 ? <><FaCheck /> READY</> : <><FaCog className="animate-spin" /> PROCESSING</>}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
