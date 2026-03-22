/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { Suspense, useMemo, useState, useEffect, useRef } from "react";
import {GitHubCalendar} from "react-github-calendar";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import { FaGithubAlt } from "react-icons/fa";
import * as THREE from "three";

// ─────────────────────────────────────────────
// THEME SYNC
// ─────────────────────────────────────────────
function useThemeColor() {
  const [color, setColor] = useState('#f8fafc');
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12)      setColor('#7dd3fc'); // Morning: sky blue
    else if (hour < 18) setColor('#f8fafc'); // Day: arctic white
    else                setColor('#818cf8'); // Evening: indigo
  }, []);
  return color;
}

// ─────────────────────────────────────────────
// 3D COMMIT SHARD
// ─────────────────────────────────────────────
const CommitShard = ({ color }: { color: string }) => {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.15;
    mesh.current.rotation.z = Math.sin(t * 0.5) * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={mesh} scale={3}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.06} />
      </mesh>
      <mesh scale={1.4}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color={color}
          speed={4}
          distort={0.4}
          metalness={1}
          roughness={0}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
};

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function Github() {
  const accentColor = useThemeColor();
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const nowYear = new Date().getFullYear();
  const [year, setYear] = useState(nowYear);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const shardY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  // Dynamically generate the GitHub color scale based on current accent
  const githubTheme = useMemo(() => ({
    light: ['#111111', `${accentColor}22`, `${accentColor}44`, `${accentColor}88`, accentColor],
    dark: ['#111111', `${accentColor}22`, `${accentColor}44`, `${accentColor}88`, accentColor],
  }), [accentColor]);

  return (
    <section ref={sectionRef} className="relative w-full py-40 bg-[#050505] overflow-hidden" id="github">
      
      {/* ── ATMOSPHERE ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] h-[800px] w-[800px] rounded-full blur-[150px]"
             style={{ background: accentColor, opacity: 0.04 }} />
      </div>

      {/* Engineering Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }}>
        <pattern id="github-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke={accentColor} strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#github-grid)" />
      </svg>

      {/* Grain Overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* 3D Shard Visual */}
      <motion.div style={{ y: shardY }} className="absolute left-0 top-0 w-1/2 h-full z-0 opacity-40 pointer-events-none">
        <Canvas gl={{ alpha: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color={accentColor} />
          <Suspense fallback={null}>
            <CommitShard color={accentColor} />
          </Suspense>
        </Canvas>
      </motion.div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14">
        
        {/* Label */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="flex items-center gap-4 mb-20">
          <div className="h-[1px] w-12" style={{ background: accentColor }} />
          <span className="text-[10px] tracking-[0.5em] text-zinc-500 uppercase font-black">
            External Contribution Protocol
          </span>
        </motion.div>

        {/* Brutalist Headline */}
        <header className="mb-32">
          <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="text-[4rem] sm:text-[6.5rem] md:text-[8.5rem] font-black leading-[0.82] tracking-[-0.04em] text-white uppercase">
            Commit
            <br />
            <span style={{ WebkitTextStroke: `2px ${accentColor}`, color: 'transparent' }}>
              Ledger.
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-zinc-500 text-[10px] font-mono tracking-[0.3em] uppercase max-w-sm mt-12 border-l border-white/10 pl-6">
            Tracking development velocity and cycles across decentralized repositories.
          </motion.p>
        </header>

        {/* The Glass Calendar Module */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-8 md:p-12 bg-zinc-950/50 backdrop-blur-xl border border-white/[0.06] group"
        >
          {/* Header Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="flex items-center gap-4">
              <FaGithubAlt className="text-xl text-zinc-400" />
              <div className="flex flex-col">
                <span className="text-[8px] font-black tracking-[0.3em] text-zinc-600 uppercase mb-1">Source_Node</span>
                <span className="text-sm font-mono text-zinc-200">github.com/mfalme0</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-black/40 border border-white/5 px-4 py-2">
              <span className="text-[9px] font-black tracking-[0.2em] text-zinc-500 uppercase">Year_Index</span>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="bg-transparent text-white text-[10px] font-mono outline-none cursor-pointer hover:text-white transition-colors"
                style={{ color: accentColor }}
              >
                {[nowYear, nowYear - 1, nowYear - 2, nowYear - 3].map(y => (
                  <option key={y} value={y} className="bg-[#050505]">{y}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Heatmap Container */}
          <div className="overflow-x-auto pb-4 custom-scrollbar">
            <GitHubCalendar
              username="mfalme0"
              year={year}
              blockSize={14}
              blockMargin={5}
              fontSize={12}
              theme={githubTheme}
            />
          </div>

          {/* Module Footer Metrics */}
          <footer className="mt-12 pt-8 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: accentColor }} />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: accentColor }} />
                </span>
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Sync_Status: Live</span>
              </div>
              <div className="hidden md:block w-12 h-[1px] bg-white/5" />
              <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Verified_Archive: 200 OK</span>
            </div>

            <div className="flex gap-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1 h-4 bg-white/5" style={{ backgroundColor: i < 3 ? `${accentColor}33` : undefined }} />
              ))}
            </div>
          </footer>
        </motion.div>

        {/* Section Footer Metadata */}
        <div className="mt-20 flex justify-end opacity-30">
           <span className="text-[9px] tracking-[0.3em] uppercase font-mono text-zinc-500">
             // End_Of_Ledger
           </span>
        </div>

      </div>
    </section>
  );
}