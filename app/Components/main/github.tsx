/* eslint-disable react/jsx-no-comment-textnodes */
'use client';

import React, { Suspense, useMemo, useState } from "react";
import {GitHubCalendar} from "react-github-calendar";
import { motion, useReducedMotion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import { FaGithubAlt } from "react-icons/fa";
import * as THREE from "three";

// --- BACKGROUND SHARD ---
const DataShard = ({
  position,
  scale,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
}) => {
  const meshRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * (speed * 0.08);
    meshRef.current.rotation.x = t * (speed * 0.04);
  });

  return (
    <Float speed={speed} rotationIntensity={0.45} floatIntensity={0.45}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.04} />
      </mesh>
    </Float>
  );
};

const ShardField = ({ enabled }: { enabled: boolean }) => {
  const prefersReducedMotion = useReducedMotion();
  if (!enabled) return null;

  return (
    <div className="absolute inset-0 -z-0 opacity-35">
      <Canvas
        dpr={prefersReducedMotion ? 1 : [1, 1.5]}
        gl={{ antialias: !prefersReducedMotion, powerPreference: "high-performance", alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <ambientLight intensity={0.45} />
        <pointLight position={[10, 10, 10]} intensity={0.9} />
        <Suspense fallback={null}>
          <DataShard position={[-6, 3, -2]} scale={1.5} speed={1} />
          <DataShard position={[7, -2, 0]} scale={1.2} speed={1.4} />
          <DataShard position={[-2, -4, -3]} scale={0.8} speed={0.8} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default function Github() {
  const prefersReducedMotion = useReducedMotion();

  // If you decide "Hero-only 3D", set this false
  const enableBackground3D = true;

  const nowYear = new Date().getFullYear();
  const [year, setYear] = useState(nowYear);

  const theme = useMemo(
    () => ({
      light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
      dark: ['#111111', '#072714', '#0a4a25', '#168039', '#22c55e'],
    }),
    []
  );

  return (
    <section className="relative w-full py-32 bg-[#050505] overflow-hidden" id="github">
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <ShardField enabled={enableBackground3D} />

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <header className="mb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="space-y-4"
          >
            <div className="flex flex-col items-center gap-2">
              <FaGithubAlt className="text-zinc-600 text-xl" />
              <span className="text-[10px] tracking-[0.5em] text-zinc-500 uppercase">
                External Contribution Protocol
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-medium text-white tracking-tight">
              The <span className="italic text-zinc-700 font-light">Ledger</span>.
            </h2>

            <p className="text-zinc-500 text-[10px] font-mono tracking-[0.2em] uppercase max-w-sm mx-auto pt-4 border-t border-white/5">
              Tracking development velocity and commit cycles across decentralized repositories.
            </p>
          </motion.div>
        </header>

        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-full max-w-5xl mx-auto"
        >
          <div className="bg-zinc-950/40 backdrop-blur-xl border border-white/5 rounded-sm p-6 md:p-10 relative group">
            <div className="absolute -inset-px bg-gradient-to-tr from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            {/* controls */}
            <div className="relative z-10 flex items-center justify-between gap-4 mb-6">
              <div className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                User: mfalme0
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono tracking-widest text-zinc-600 uppercase">
                  Year
                </span>
                <select
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="bg-black/30 border border-white/10 text-zinc-200 text-[10px] tracking-widest font-mono px-3 py-2 rounded-full outline-none focus:border-white/20"
                >
                  {Array.from({ length: 4 }).map((_, i) => {
                    const y = nowYear - i;
                    return (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* calendar */}
            <div className="flex justify-center overflow-x-auto pb-4">
              <GitHubCalendar
                username="mfalme0"
                year={year}
                blockSize={prefersReducedMotion ? 12 : 13}
                blockMargin={4}
                fontSize={12}
                theme={theme}
              />
            </div>

            <footer className="mt-6 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] text-zinc-600 font-mono tracking-widest uppercase">
                    System_State
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] text-zinc-400 font-mono uppercase">
                      Syncing_Live
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[8px] text-zinc-600 font-mono tracking-widest uppercase">
                    Node_Source
                  </span>
                  <span className="text-[9px] text-zinc-400 font-mono uppercase italic">
                    @github/mfalme0
                  </span>
                </div>
              </div>

              <div className="h-px flex-1 bg-white/5 hidden md:block mx-8 opacity-60" />

              <div className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase opacity-40 group-hover:opacity-100 transition-opacity">
                // REPO_ARCHIVE_VERIFIED
              </div>
            </footer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}