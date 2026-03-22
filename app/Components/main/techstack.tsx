/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/purity */
'use client';

import React, { Suspense, useState, useEffect, useRef } from 'react';
import { SiMacos, SiAndroid, SiIos, SiLinux, SiProxmox } from 'react-icons/si';
import { FaAws, FaDocker, FaFigma } from 'react-icons/fa';
import { DiMongodb } from 'react-icons/di';
import { RiFirebaseFill } from 'react-icons/ri';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ─────────────────────────────────────────────
// TYPES & DATA
// ─────────────────────────────────────────────
interface Technology {
  name: string;
  icon: React.ReactElement;
  proficiency: 'Intermediate' | 'Advanced' | 'Expert';
}

const technologies: Technology[] =[
  { name: 'MacOS', icon: <SiMacos />, proficiency: 'Intermediate' },
  { name: 'iOS', icon: <SiIos />, proficiency: 'Expert' },
  { name: 'Android', icon: <SiAndroid />, proficiency: 'Advanced' },
  { name: 'Linux', icon: <SiLinux />, proficiency: 'Advanced' },
  { name: 'AWS', icon: <FaAws />, proficiency: 'Intermediate' },
  { name: 'MongoDB', icon: <DiMongodb />, proficiency: 'Intermediate' },
  { name: 'Firebase', icon: <RiFirebaseFill />, proficiency: 'Advanced' },
  { name: 'Docker', icon: <FaDocker />, proficiency: 'Advanced' },
  { name: 'Proxmox', icon: <SiProxmox />, proficiency: 'Advanced' },
  { name: 'Figma', icon: <FaFigma />, proficiency: 'Advanced' },
];

const proficiencyToWidth = (p: Technology['proficiency']) => {
  if (p === 'Expert') return '100%';
  if (p === 'Advanced') return '70%';
  return '40%';
};

const proficiencyToLevel = (p: Technology['proficiency']) => {
  if (p === 'Expert') return '03';
  if (p === 'Advanced') return '02';
  return '01';
};

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
  },[]);
  return color;
}

// ─────────────────────────────────────────────
// 3D INFRASTRUCTURE CORE
// ─────────────────────────────────────────────
const InfraCore = ({ color }: { color: string }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const innerMesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.08;
      mesh.current.rotation.x = t * 0.04;
    }
    if (innerMesh.current) {
      innerMesh.current.rotation.y = -t * 0.12;
      innerMesh.current.rotation.z = t * 0.06;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      {/* Outer Wireframe Box */}
      <mesh ref={mesh} scale={2.5}>
        <icosahedronGeometry args={[2, 1]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.06} />
      </mesh>
      {/* Inner Distorted Data Shard */}
      <mesh ref={innerMesh} scale={1.2}>
        <octahedronGeometry args={[2, 2]} />
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.4}
          metalness={1}
          roughness={0}
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
// MODULE CARD (The "Glass" UI)
// ─────────────────────────────────────────────
const TechModule = ({ tech, index, accentColor }: { tech: Technology; index: number; accentColor: string }) => {
  const [hovered, setHovered] = useState(false);
  const pLevel = proficiencyToLevel(tech.proficiency);
  const pWidth = proficiencyToWidth(tech.proficiency);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.5, ease:[0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative p-6 md:p-8 bg-zinc-950/50 backdrop-blur-xl border border-white/[0.06] overflow-hidden transition-all duration-500 h-full"
      style={{ borderColor: hovered ? `${accentColor}44` : undefined }}
    >
      {/* Radial Hover Sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        style={{
          background: `radial-gradient(ellipse at 0% 0%, ${accentColor}0d 0%, transparent 80%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header Metadata */}
        <div className="flex items-start justify-between mb-10">
          <span className="text-[10px] font-black tracking-[0.4em] text-zinc-600 tabular-nums uppercase">
            SYS.0{pLevel}
          </span>
          <motion.div 
            animate={{ color: hovered ? accentColor : '#52525b', scale: hovered ? 1.15 : 1 }}
            className="text-3xl transition-colors duration-300"
          >
            {tech.icon}
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-[11px] font-black tracking-[0.3em] uppercase text-zinc-500 mb-8 transition-colors group-hover:text-zinc-300">
          {tech.name}
        </h3>

        {/* Bottom Metrics */}
        <div className="mt-auto w-full space-y-3">
          <div className="h-[1px] w-full bg-white/5 relative overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              whileInView={{ width: pWidth }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="absolute top-0 left-0 h-full"
              style={{ background: accentColor }}
            />
          </div>
          
          <div className="flex justify-between items-center">
             <span className="text-[8px] font-mono tracking-widest text-zinc-600 uppercase">
               {tech.proficiency}
             </span>
             <span className="text-[8px] font-mono font-bold" style={{ color: hovered ? accentColor : '#52525b' }}>
               L_{pLevel}
             </span>
          </div>
        </div>
      </div>

      {/* Dynamic accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] w-0"
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.5, ease:[0.22, 1, 0.36, 1] }}
        style={{ background: accentColor }}
      />
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────
export default function TechStack() {
  const accentColor = useThemeColor();
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset:["start end", "end start"]
  });

  const infraY = useTransform(scrollYProgress, [0, 1],[-80, 80]);

  return (
    <section ref={sectionRef} className="relative w-full py-40 bg-[#050505] overflow-hidden" id="techstack">
      
      {/* ── ATMOSPHERE ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] h-[800px] w-[800px] rounded-full blur-[150px]"
             style={{ background: accentColor, opacity: 0.04 }} />
        <div className="absolute bottom-[-10%] right-[-5%] h-[600px] w-[600px] rounded-full blur-[120px]"
             style={{ background: '#00d2ff', opacity: 0.03 }} />
      </div>

      {/* Engineering SVG Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }}>
        <pattern id="infra-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke={accentColor} strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#infra-grid)" />
      </svg>

      {/* Film Grain */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* 3D Visual - Distorted Infra Core */}
      <motion.div 
        style={{ y: prefersReducedMotion ? 0 : infraY }} 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
      >
        <Canvas gl={{ alpha: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 12]} />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={2} color={accentColor} />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />
          <Suspense fallback={null}>
            <InfraCore color={accentColor} />
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
            System Capabilities
          </span>
        </motion.div>

        {/* Brutalist Header Layout */}
        <header className="mb-32 flex flex-col xl:flex-row xl:items-end justify-between gap-12">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true }}
            className="text-[4rem] sm:text-[6.5rem] md:text-[8.5rem] font-black leading-[0.82] tracking-[-0.04em] text-white uppercase"
          >
            Infra
            <br />
            <span style={{ WebkitTextStroke: `2px ${accentColor}`, color: 'transparent' }}>
              Structure.
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-sm border-l-2 pl-6"
            style={{ borderColor: accentColor }}
          >
            <p className="text-zinc-400 text-sm font-light leading-relaxed">
              A technical breakdown of the environments, virtualization platforms, and cloud infrastructure leveraged to deploy high-performance applications.
            </p>
          </motion.div>
        </header>

        {/* The Gap Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-white/[0.05] border border-white/[0.05]">
          {technologies.map((tech, i) => (
            <div key={tech.name} className="bg-[#050505]">
              <TechModule tech={tech} index={i} accentColor={accentColor} />
            </div>
          ))}
        </div>

        {/* Engineering Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 pt-10 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="flex items-center gap-4">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: accentColor }} />
               <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: accentColor }} />
             </span>
             <span className="text-[9px] tracking-[0.3em] font-mono text-zinc-500 uppercase">
               ENV_READY // DEPLOYMENT_ACTIVE
             </span>
          </div>

          <div className="text-[9px] tracking-[0.3em] font-mono text-zinc-600 uppercase">
             Nodes_Indexed: {technologies.length}
          </div>
        </motion.footer>

      </div>
    </section>
  );
}