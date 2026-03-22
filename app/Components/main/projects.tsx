/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react/jsx-no-comment-textnodes */
'use client';

import React, { Suspense, useMemo, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import project1 from "../Images/better.jpeg";
import project3 from "../Images/ndai.jpeg";
import project4 from "../Images/archie.jpeg";
import ganji from "../Images/ganji.png";

import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// ─────────────────────────────────────────────
// THEME SYNC (The "Pulse")
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
// 3D PROJECT SHARD
// ─────────────────────────────────────────────
const ProjectShard = ({ color }: { color: string }) => {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    mesh.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={mesh} scale={3.2}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.06} />
      </mesh>
      <mesh scale={1.5}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color={color}
          speed={3}
          distort={0.3}
          metalness={1}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.2}
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
};

// ─────────────────────────────────────────────
// PROJECT CARD (The "Asset Module")
// ─────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProjectCard = ({ project, index, accentColor }: { project: any; index: number; accentColor: string }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-zinc-950/50 backdrop-blur-xl border border-white/[0.06] overflow-hidden transition-all duration-500 flex flex-col h-full"
      style={{ borderColor: hovered ? `${accentColor}44` : undefined }}
    >
      {/* Asset Header Tags */}
      <div className="relative z-20 flex justify-between items-center p-6 border-b border-white/[0.05] bg-black/20">
         <span className="text-[10px] font-black tracking-[0.4em] text-zinc-500 tabular-nums uppercase">
           ID_{project.id}
         </span>
         <span className="text-[9px] font-black tracking-[0.2em] text-zinc-600 uppercase border border-white/10 px-2 py-1">
           {project.category}
         </span>
      </div>

      {/* Image Container */}
      <div className="relative h-72 md:h-80 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Scanline overlay effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] opacity-20" />
        
        {/* Accent hover fill */}
        <motion.div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          animate={{ opacity: hovered ? 0.2 : 0 }}
          style={{ background: `linear-gradient(to top, ${accentColor}, transparent)` }}
        />
      </div>

      {/* Content */}
      <div className="p-8 md:p-10 flex flex-col flex-grow relative">
        <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-none mb-6">
          {project.title}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed font-light mb-10 max-w-sm">
          {project.description}
        </p>

        {/* Footer Actions */}
        <div className="mt-auto pt-8 border-t border-white/[0.05] flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-zinc-500 hover:text-white transition-colors uppercase">
              <FiGithub style={{ color: hovered ? accentColor : 'inherit' }} /> Source
            </a>
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-zinc-500 hover:text-white transition-colors uppercase">
                <FiExternalLink style={{ color: hovered ? accentColor : 'inherit' }} /> Live
              </a>
            )}
          </div>
          <div className="flex gap-1">
             <div className="w-1 h-1 rounded-full bg-white/10" />
             <div className="w-1 h-1 rounded-full bg-white/10" />
          </div>
        </div>
      </div>

      {/* Dynamic accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] z-20"
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: accentColor }}
      />
    </motion.article>
  );
};

// ─────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────
export function Projects() {
  const accentColor = useThemeColor();
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const shardY = useTransform(scrollYProgress, [0, 1], [-120, 120]);

  const projects = [
    { title: 'Better Farm', id: '01', description: 'Farming AI assistant featuring a specialized neural-chat architecture for agricultural optimization.', image: project1, category: 'APP_MOBILE', github: 'https://github.com/mfalme0/betterFarm' },
    { title: 'Ganji', id: '02', description: 'Financial ledger system designed for high-fidelity expense tracking and asset management.', image: ganji, category: 'APP_FINTECH', github: 'https://github.com/mfalme0/ganji' },
    { title: 'Ndai', id: '03', description: 'Comprehensive vehicle management infrastructure and logistics monitoring suite.', image: project3, category: 'WEB_SYSTEM', github: 'https://github.com/mfalme0/ndai.com' },
    { title: 'Archie', id: '04', description: 'High-security file archival protocol and distributed retrieval system.', image: project4, category: 'WEB_SECURITY', github: 'https://github.com/mfalme0/Archiewebapp' },
  ];

  return (
    <section ref={sectionRef} className="relative w-full py-40 bg-[#050505] overflow-hidden" id="projects">
      
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[30%] left-[-15%] h-[900px] w-[900px] rounded-full blur-[180px]"
             style={{ background: accentColor, opacity: 0.04 }} />
        <div className="absolute bottom-[20%] right-[-10%] h-[700px] w-[700px] rounded-full blur-[140px]"
             style={{ background: '#00d2ff', opacity: 0.03 }} />
      </div>

      {/* Grid Pattern */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }}>
        <pattern id="project-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke={accentColor} strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#project-grid)" />
      </svg>

      {/* Film Grain Texture */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* 3D Visual - Distorted Project Shard */}
      <motion.div style={{ y: shardY }} className="absolute right-0 top-0 w-1/2 h-full z-0 opacity-40 pointer-events-none">
        <Canvas gl={{ alpha: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 12]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color={accentColor} />
          <Suspense fallback={null}>
            <ProjectShard color={accentColor} />
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
            Deployed Assets
          </span>
        </motion.div>

        {/* Brutalist Headline */}
        <header className="mb-32">
          <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="text-[4rem] sm:text-[6.5rem] md:text-[8.5rem] font-black leading-[0.82] tracking-[-0.04em] text-white uppercase">
            Portfolio
            <br />
            <span style={{ WebkitTextStroke: `2px ${accentColor}`, color: 'transparent' }}>
              Archive.
            </span>
          </motion.h2>
        </header>

        {/* Gap Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.05] border border-white/[0.05]">
          {projects.map((project, i) => (
            <div key={project.id} className="bg-[#050505]">
              <ProjectCard project={project} index={i} accentColor={accentColor} />
            </div>
          ))}
        </div>

        {/* Audit Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 pt-12 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-10 opacity-40"
        >
          <div className="flex gap-10 text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
             <span>Status: Active_Deployment</span>
             <span>Registry: Verified</span>
          </div>
          <div className="flex gap-1">
             {[...Array(8)].map((_, i) => (
               <div key={i} className="w-1.5 h-1.5 border border-white/20" />
             ))}
          </div>
          <div className="text-[9px] font-mono tracking-[0.3em] text-zinc-500 uppercase">
            // END_OF_REGISTRY
          </div>
        </motion.footer>

      </div>
    </section>
  );
}