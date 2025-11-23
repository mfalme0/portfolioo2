import React, { useState, useEffect } from "react";
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


interface GearLoaderProps {
  onComplete: () => void;
}

export default function GearLoader({ onComplete }: GearLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    // Total time for loader (approx 2.5 seconds)
    const totalDuration = 2500; 
    const intervalTime = 50;
    const steps = totalDuration / intervalTime;
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 / steps);
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500); // Small delay at 100%
          return 100;
        }
        return next;
      });
    }, intervalTime);

    // Cycle through logs based on progress
    const logTimer = setInterval(() => {
      setLogIndex((prev) => (prev < loadingLogs.length - 1 ? prev + 1 : prev));
    }, totalDuration / loadingLogs.length);

    return () => {
      clearInterval(timer);
      clearInterval(logTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 bg-[#050505] text-green-500 font-mono flex flex-col items-center justify-center p-6 overflow-hidden"
    >
      {/* Background Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'linear-gradient(transparent 50%, black 50%)', backgroundSize: '100% 4px' }} />

      <div className="relative z-10 w-full max-w-lg border border-green-900/50 bg-black/80 p-8 shadow-[0_0_50px_rgba(34,197,94,0.1)]">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-8 border-b border-green-900 pb-2">
          <div className="flex items-center gap-2">
            <FaTerminal className="animate-pulse" />
            <span className="text-sm font-bold tracking-widest">SYSTEM_BOOT</span>
          </div>
          <div className="text-xs opacity-50">V.2.0.4</div>
        </div>

        {/* Center: Progress & Counter */}
        <div className="flex flex-col items-center mb-8">
            <div className="text-6xl font-black mb-2 tabular-nums tracking-tighter text-white">
                {Math.round(progress)}%
            </div>
            <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                <motion.div 
                    className="h-full bg-green-500"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>

        {/* Console Logs */}
        <div className="h-16 flex flex-col justify-end items-start border-l-2 border-green-500/50 pl-4 bg-green-900/10 p-2 text-xs md:text-sm">
            <span className="opacity-50 mb-1">{loadingLogs[logIndex - 1] || "..."}</span>
            <span className="font-bold flex items-center gap-2 text-white">
                <span className="animate-ping w-1.5 h-1.5 bg-green-500 rounded-full" /> 
                {loadingLogs[logIndex]}
            </span>
        </div>

        {/* Footer Details */}
        <div className="mt-6 flex justify-between text-[10px] text-gray-500 uppercase tracking-wider">
            <div className="flex gap-4">
                <span>Mem: OK</span>
                <span>GPU: OK</span>
                <span>I/O: OK</span>
            </div>
            <div className="flex items-center gap-1">
                {progress === 100 ? <FaCheck /> : <FaCog className="animate-spin" />}
                {progress === 100 ? "READY" : "PROCESSING"}
            </div>
        </div>
      </div>
    </motion.div>
  );
}