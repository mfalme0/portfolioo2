/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaTerminal, FaCog, FaCheck } from "react-icons/fa";

const DEFAULT_LOGS = [
  "INITIALIZING_PERIPHERAL_DATABASE...",
  "DETECTING_INPUT_DEVICES...",
  "CALIBRATING_HERO_SENSORS...",
  "SYNCING_AULA_F75_FIRMWARE...",
  "ESTABLISHING_AUDIO_UPLINK (DTS:X)...",
  "OPTIMIZING_REFRESH_RATES (180Hz)...",
  "VERIFYING_UPS_VOLTAGE...",
  "LOADOUT_CONFIGURATION_VALIDATED.",
];

type GearLoaderProps = {
  onComplete: () => void;
  logs?: string[];
  version?: string;
  durationMs?: number; // total loader time
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function GearLoader({
  onComplete,
  logs = DEFAULT_LOGS,
  version = "V.2.1.0",
  durationMs = 2400,
}: GearLoaderProps) {
  const reduceMotion = useReducedMotion();

  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [typed, setTyped] = useState("");

  const rafRef = useRef<number | null>(null);
  const doneRef = useRef(false);

  // A slightly “alive” progress curve (smooth + a little easing)
  useEffect(() => {
    doneRef.current = false;

    const start = performance.now();
    const tick = (now: number) => {
      const t = clamp((now - start) / durationMs, 0, 1);

      // easeOutExpo-ish
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

      // tiny wobble early (disabled on reduced motion)
      const wobble =
        reduceMotion || t > 0.9 ? 0 : Math.sin(t * Math.PI * 2) * 0.6;

      const next = clamp(eased * 100 + wobble, 0, 100);
      setProgress(next);

      // Sync log index to progress
      const idx = Math.min(
        logs.length - 1,
        Math.floor((next / 100) * logs.length)
      );
      setLogIndex(idx);

      if (t >= 1 && !doneRef.current) {
        doneRef.current = true;
        setProgress(100);

        // brief “READY” settle
        window.setTimeout(() => onComplete(), reduceMotion ? 150 : 450);
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [durationMs, logs.length, onComplete, reduceMotion, logs]);

  // Typewriter effect for the current log line
  useEffect(() => {
    const line = logs[logIndex] ?? "";
    if (reduceMotion) {
      setTyped(line);
      return;
    }

    setTyped("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 2; // faster typing
      setTyped(line.slice(0, i));
      if (i >= line.length) window.clearInterval(id);
    }, 18);

    return () => window.clearInterval(id);
  }, [logIndex, logs, reduceMotion]);

  const prevLine = useMemo(() => {
    const prev = logs[Math.max(0, logIndex - 1)];
    return prev ?? "...";
  }, [logIndex, logs]);

  const pct = Math.round(progress);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={
          reduceMotion
            ? { opacity: 0, transition: { duration: 0.2 } }
            : { y: "-100%", transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } }
        }
        className="fixed inset-0 z-50 bg-[#050505] text-[#ff1a1a] font-mono flex items-center justify-center p-6 overflow-hidden"
      >
        {/* Subtle grain */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Soft vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_55%)]" />

        {/* Scanlines (less aggressive) */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 50%)",
            backgroundSize: "100% 6px",
          }}
        />

        <div className="relative z-10 w-full max-w-xl rounded-xl border border-white/10 bg-black/60 backdrop-blur-md shadow-[0_0_80px_rgba(255,26,26,0.08)]">
          {/* Header */}
          <div className="flex items-end justify-between px-6 pt-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                <FaTerminal className={reduceMotion ? "" : "animate-pulse"} />
              </span>
              <div className="leading-tight">
                <div className="text-[11px] tracking-[0.35em] text-white/70 uppercase font-bold">
                  ARMOURY_CRATE::BOOT_SEQ
                </div>
                <div className="text-[10px] tracking-[0.25em] text-white/40 uppercase">
                  ROG device initialization
                </div>
              </div>
            </div>

            <div className="text-[10px] tracking-[0.3em] text-white/35 uppercase">
              {version}
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-6">
            {/* Big % */}
            <div className="flex items-end justify-between mb-4">
              <div className="text-5xl md:text-6xl font-black tracking-tighter text-white tabular-nums">
                {pct < 10 ? `0${pct}` : pct}
                <span className="text-white/35">%</span>
              </div>

              <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-white/40">
                {pct >= 100 ? (
                  <>
                    <FaCheck className="text-[#ff1a1a]" />
                    READY
                  </>
                ) : (
                  <>
                    <FaCog className={reduceMotion ? "" : "animate-spin"} />
                    PROCESSING
                  </>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden border border-white/10">
              <motion.div
                className="h-full bg-[#ff1a1a]/90"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
              />
            </div>

            {/* Console area */}
            <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.03] overflow-hidden">
              <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between">
                <span className="text-[10px] tracking-[0.25em] uppercase text-white/45">
                  system_logs
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-white/35">
                  node: active
                </span>
              </div>

              <div className="px-4 py-4">
                <div className="text-[11px] text-white/35 mb-2">
                  <span className="opacity-70">&gt;</span> {prevLine}
                </div>

                <div className="text-[12px] text-white flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-[#ff1a1a]/90 shadow-[0_0_18px_rgba(255,26,26,0.35)]">
                    <span className={reduceMotion ? "" : "animate-ping"} />
                  </span>
                  <span className="font-bold tracking-wide">
                    <span className="opacity-70">&gt;</span>{" "}
                    {reduceMotion ? logs[logIndex] : typed}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer meta */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-[0.25em] text-white/35">
              <div className="flex gap-4">
                <span className="text-[#ff1a1a]/60">mem: ok</span>
                <span className="text-[#ff1a1a]/60">io: ok</span>
                <span className="text-[#ff1a1a]/60">gpu: ok</span>
              </div>

              {/* Optional skip (nice UX) */}
              <button
                type="button"
                onClick={() => {
                  if (doneRef.current) return;
                  doneRef.current = true;
                  setProgress(100);
                  onComplete();
                }}
                className="px-3 py-1 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition"
              >
                skip
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}