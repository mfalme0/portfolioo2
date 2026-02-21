"use client";

import React, { useEffect, useRef, useState, Suspense, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// --- 1. THE "SHARD" LOADER CORE ---
const LoadingShard = ({ progress, reduced }: { progress: number; reduced: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // keep motion subtle if reduced
    const base = reduced ? 0.25 : 1;
    const speed = (0.2 + (progress / 100) * 2) * base;

    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * speed;
    meshRef.current.rotation.x = t * (speed * 0.5);
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 1]} />
      <meshStandardMaterial
        color="#ffffff"
        wireframe
        transparent
        opacity={0.1 + (progress / 100) * 0.35}
      />
    </mesh>
  );
};

// --- 2. MAIN PRELOADER ---
export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const prefersReducedMotion = useReducedMotion();

  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("BOOT_SEQUENCE_INIT");
  const [isLoading, setIsLoading] = useState(true);

  const intervalRef = useRef<number | null>(null);
  const doneRef = useRef(false);

  const messages = useMemo(
    () => [
      { at: 20, text: "LINKING_SECURE_NODES" },
      { at: 45, text: "SYNCHRONIZING_CORE_STATE" },
      { at: 75, text: "DECRYPTING_ASSETS" },
      { at: 100, text: "SYSTEM_READY" },
    ],
    []
  );

  useEffect(() => {
    // avoid strict mode double-mount issues
    doneRef.current = false;

    const tick = () => {
      setProgress((prev) => {
        if (prev >= 100) return 100;

        // smoother ramp: fast early, slows near the end
        const remaining = 100 - prev;
        const maxStep = remaining > 30 ? 7 : remaining > 10 ? 4 : 2;
        const minStep = 1;
        const increment = Math.floor(Math.random() * (maxStep - minStep + 1)) + minStep;

        const next = Math.min(100, prev + increment);

        // update message by thresholds
        for (const m of messages) {
          if (next >= m.at) setMessage(m.text);
        }

        if (next >= 100 && intervalRef.current) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;

          // fade out after short delay
          window.setTimeout(() => setIsLoading(false), 700);
        }

        return next;
      });
    };

    intervalRef.current = window.setInterval(tick, prefersReducedMotion ? 160 : 120);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [messages, prefersReducedMotion]);

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        if (doneRef.current) return;
        doneRef.current = true;
        onComplete?.();
      }}
    >
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.9, ease: [0.19, 1, 0.22, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
        >
          {/* Grain */}
          <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          {/* 3D Visual Layer (disable if reduced motion for UX + perf) */}
          {!prefersReducedMotion && (
            <div className="absolute inset-0 z-0 opacity-50">
              <Canvas
                dpr={[1, 1.5]}
                gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
              >
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
                <ambientLight intensity={0.45} />
                <pointLight position={[10, 10, 10]} intensity={1.2} />
                <Suspense fallback={null}>
                  <LoadingShard progress={progress} reduced={false} />
                </Suspense>
              </Canvas>
            </div>
          )}

          {/* Reduced-motion fallback: still looks premium */}
          {prefersReducedMotion && (
            <div className="absolute inset-0 z-0 opacity-40">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05),transparent_40%,rgba(255,255,255,0.03))]" />
            </div>
          )}

          {/* UI Layer */}
          <div className="z-10 flex flex-col items-center justify-center w-full max-w-xl px-8 md:px-12">
            {/* Percentage */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative mb-20 md:mb-24">
              <h1 className="text-[110px] md:text-[180px] font-medium text-white tracking-tighter leading-none opacity-90 tabular-nums">
                {progress < 10 ? `0${progress}` : progress}
              </h1>
              <span className="absolute -top-4 -right-8 text-xs font-mono text-zinc-600 tracking-[0.4em] uppercase">
                Progress_State
              </span>
            </motion.div>

            {/* Status */}
            <div className="w-full space-y-8">
              <div className="flex justify-between items-end border-b border-white/5 pb-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] text-zinc-600 tracking-[0.3em] font-mono uppercase">
                    System_Protocol
                  </span>
                  <p className="text-[10px] text-white tracking-[0.2em] font-mono uppercase">
                    &gt; {message}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[8px] text-zinc-600 tracking-[0.3em] font-mono uppercase">
                    Node_Status
                  </span>
                  <p className="text-[10px] text-emerald-500 tracking-[0.2em] font-mono uppercase animate-pulse">
                    Active
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-[1px] bg-zinc-900 relative">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.45)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.35 }}
                />
              </div>

              {/* Bottom Metadata */}
              <div className="flex justify-between w-full">
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] text-zinc-700 font-mono tracking-widest uppercase">
                    Encryption
                  </span>
                  <span className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase">
                    AES_256_GCM
                  </span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="text-[8px] text-zinc-700 font-mono tracking-widest uppercase">
                    System_Clock
                  </span>
                  <span className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase tabular-nums">
                    00:00:{progress < 10 ? `0${progress}` : progress}:F0
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Corner Tags */}
          <div className="absolute top-12 left-12 text-[9px] text-zinc-700 font-mono tracking-[0.4em] uppercase">
            JGITAU // BIOS_V2.2
          </div>
          <div className="absolute bottom-12 right-12 text-[9px] text-zinc-700 font-mono tracking-[0.4em] uppercase">
            Institutional_Tech_Node
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}