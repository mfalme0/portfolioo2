/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useRef, Suspense, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import { FaJava, FaPython, FaJs, FaReact, FaNodeJs, FaHtml5, FaVuejs } from 'react-icons/fa';
import { SiFlutter, SiKotlin, SiNextdotjs, SiCplusplus } from 'react-icons/si';
import { TbBrandCSharp } from "react-icons/tb";
import * as THREE from 'three';

// ─────────────────────────────────────────────
// THEME SYNC
// ─────────────────────────────────────────────
function useThemeColor() {
  const [color, setColor] = useState('#f8fafc');
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12)      setColor('#7dd3fc'); // Morning
    else if (hour < 18) setColor('#f8fafc'); // Day
    else                setColor('#818cf8'); // Evening
  }, []);
  return color;
}

// ─────────────────────────────────────────────
// 3D DATA CORE
// ─────────────────────────────────────────────
const DataCore = ({ color }: { color: string }) => {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.2;
  });

  return (
    <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={mesh}>
        <torusKnotGeometry args={[3, 0.8, 128, 16]} />
        <MeshDistortMaterial
          color={color}
          speed={3}
          distort={0.25}
          radius={1}
          metalness={1}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.15}
          transparent
          opacity={0.12}
          wireframe
        />
      </mesh>
    </Float>
  );
};

// ─────────────────────────────────────────────
// LANGUAGE MODULE (The "Glass" UI)
// ─────────────────────────────────────────────
const LanguageModule = ({ lang, accentColor }: { lang: any; accentColor: string }) => {
  const [hovered, setHovered] = useState(false);
  const lvl = `LVL.0${Math.max(1, Math.min(3, Math.ceil(lang.proficiency / 30)))}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative p-6 bg-zinc-950/50 backdrop-blur-xl border border-white/[0.06] overflow-hidden transition-all duration-500"
      style={{ borderColor: hovered ? `${accentColor}44` : undefined }}
    >
      {/* Radial Hover Sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        style={{
          background: `radial-gradient(circle at center, ${accentColor}0d 0%, transparent 80%)`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Icon & LVL Tag */}
        <div className="w-full flex justify-between items-start mb-6">
          <span className="text-[8px] font-black tracking-[0.3em] text-zinc-600 tabular-nums">
            {lvl}
          </span>
          <motion.div 
            animate={{ color: hovered ? accentColor : '#3f3f46', scale: hovered ? 1.2 : 1 }}
            className="text-2xl"
          >
            {lang.icon}
          </motion.div>
        </div>

        <h3 className="text-[10px] font-black tracking-[0.35em] uppercase text-zinc-400 mb-6 transition-colors group-hover:text-white">
          {lang.name}
        </h3>

        {/* Progress System */}
        <div className="w-full space-y-3">
          <div className="h-[1px] w-full bg-white/5 relative overflow-hidden">
            <motion.div
              initial={{ x: '-100%' }}
              whileInView={{ x: `${lang.proficiency - 100}%` }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="absolute inset-0 w-full h-full"
              style={{ background: accentColor }}
            />
          </div>
          
          <div className="flex justify-between items-center">
             <span className="text-[8px] font-mono tracking-widest text-zinc-600">INT_SYS_CHECK</span>
             <span className="text-[8px] font-mono font-bold" style={{ color: hovered ? accentColor : '#52525b' }}>
               {lang.proficiency}%
             </span>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] w-0"
        animate={{ width: hovered ? '100%' : '0%' }}
        style={{ background: accentColor }}
      />
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────
export default function ProgrammingLanguages() {
  const accentColor = useThemeColor();
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const coreScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  const languages = [
    { name: 'JavaScript', icon: <FaJs />, proficiency: 90 },
    { name: 'React', icon: <FaReact />, proficiency: 90 },
    { name: 'NextJS', icon: <SiNextdotjs />, proficiency: 85 },
    { name: 'Node.js', icon: <FaNodeJs />, proficiency: 85 },
    { name: 'TypeScript', icon: <FaJs />, proficiency: 88 }, // Added consistency
    { name: 'C#', icon: <TbBrandCSharp />, proficiency: 80 },
    { name: 'Python', icon: <FaPython />, proficiency: 65 },
    { name: 'Flutter', icon: <SiFlutter />, proficiency: 75 },
    { name: 'Kotlin', icon: <SiKotlin />, proficiency: 70 },
    { name: 'C++', icon: <SiCplusplus />, proficiency: 75 },
    { name: 'PostgreSQL', icon: <FaNodeJs />, proficiency: 82 },
    { name: 'Docker', icon: <FaNodeJs />, proficiency: 78 },
  ];

  return (
    <section ref={sectionRef} className="relative w-full py-40 bg-[#050505] overflow-hidden">
      
      {/* ── ATMOSPHERE ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 h-[900px] w-[900px] rounded-full blur-[160px]"
             style={{ background: accentColor, opacity: 0.03 }} />
      </div>

      {/* Engineering Grid Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }}>
        <pattern id="lang-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke={accentColor} strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#lang-grid)" />
      </svg>

      {/* Grain Overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* 3D Visual - Distorted Data Core */}
      <motion.div style={{ scale: coreScale }} className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <Canvas gl={{ alpha: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color={accentColor} />
          <Suspense fallback={null}>
            <DataCore color={accentColor} />
          </Suspense>
        </Canvas>
      </motion.div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14">
        
        {/* Section Label */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="flex items-center gap-4 mb-20">
          <div className="h-[1px] w-12" style={{ background: accentColor }} />
          <span className="text-[10px] tracking-[0.5em] text-zinc-500 uppercase font-black">
            Technical Linguistics
          </span>
        </motion.div>

        {/* Brutalist Headline */}
        <header className="mb-32">
          <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="text-[4.2rem] sm:text-[6.5rem] md:text-[9rem] font-black leading-[0.82] tracking-[-0.05em] text-white uppercase">
            Stack
            <br />
            <span style={{ WebkitTextStroke: `2px ${accentColor}`, color: 'transparent' }}>
              Fluency.
            </span>
          </motion.h2>
        </header>

        {/* The Module Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-white/[0.05] border border-white/[0.05]">
          {languages.map((lang, i) => (
            <div key={i} className="bg-[#050505]">
              <LanguageModule lang={lang} accentColor={accentColor} />
            </div>
          ))}
        </div>

        {/* Audit Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 pt-12 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-8"
        >
          <div className="flex items-center gap-6">
             <div className="flex flex-col">
                <span className="text-[8px] font-black tracking-[0.3em] text-zinc-600 uppercase mb-1">Status</span>
                <span className="text-[10px] font-mono text-zinc-400">// AUDIT_COMPLETE</span>
             </div>
             <div className="w-[1px] h-8 bg-white/10" />
             <div className="flex flex-col">
                <span className="text-[8px] font-black tracking-[0.3em] text-zinc-600 uppercase mb-1">Modules</span>
                <span className="text-[10px] font-mono text-zinc-400">TOTAL_{languages.length}</span>
             </div>
          </div>

          <div className="flex gap-2">
             {[...Array(4)].map((_, i) => (
               <div key={i} className="w-2 h-2 border border-white/10" style={{ backgroundColor: i < 2 ? accentColor : 'transparent', opacity: i < 2 ? 0.5 : 1 }} />
             ))}
          </div>
        </motion.footer>

      </div>
    </section>
  );
}