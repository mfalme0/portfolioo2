/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react/jsx-no-comment-textnodes */
'use client';

import React, { useRef, Suspense, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import { FaCalendarAlt } from "react-icons/fa";
import { BsCodeSlash } from "react-icons/bs";
import { PiNetwork } from "react-icons/pi";
import { MdHowToVote } from "react-icons/md";
import { GrCloudComputer } from "react-icons/gr";
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
// 3D EXPERIENCE CRYSTAL
// ─────────────────────────────────────────────
const ExperienceCrystal = ({ color }: { color: string }) => {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.12;
    mesh.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={mesh} scale={2.8}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.08} />
      </mesh>
      <mesh scale={1.2}>
        <octahedronGeometry args={[1, 0]} />
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
// EXPERIENCE CARD (The "Glass" UI)
// ─────────────────────────────────────────────
const ExperienceCard = ({
  data,
  index,
  accentColor,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  index: number;
  accentColor: string;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative p-8 md:p-10 bg-zinc-950/50 backdrop-blur-xl border border-white/[0.06] overflow-hidden transition-all duration-500 h-full"
      style={{ borderColor: hovered ? `${accentColor}44` : undefined }}
    >
      {/* Hover fill */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        style={{
          background: `radial-gradient(circle at top right, ${accentColor}0a 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header Metadata */}
        <div className="flex items-center justify-between mb-12">
          <span className="text-[10px] font-black tracking-[0.4em] text-zinc-600 tabular-nums uppercase">
            // LOG_{data.id}
          </span>
          <motion.div 
            animate={{ color: hovered ? accentColor : '#52525b', scale: hovered ? 1.1 : 1 }}
            className="text-xl"
          >
            {data.icon}
          </motion.div>
        </div>

        {/* Core Content */}
        <div className="mb-8">
          <h3 className="text-[11px] font-black tracking-[0.3em] uppercase mb-3" style={{ color: accentColor }}>
            {data.role}
          </h3>
          <h4 className="text-3xl md:text-4xl font-bold text-white tracking-tighter leading-none mb-6">
            {data.company}
          </h4>
          <p className="text-zinc-400 text-sm leading-relaxed font-light max-w-sm">
            {data.description}
          </p>
        </div>

        {/* Footer Meta */}
        <div className="mt-auto pt-8 border-t border-white/[0.05] flex items-center justify-between">
          <div className="flex items-center gap-3 text-[9px] font-bold tracking-[0.25em] text-zinc-500 uppercase">
            <FaCalendarAlt style={{ color: hovered ? accentColor : 'inherit' }} />
            {data.duration}
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
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────
export function WorkExperience() {
  const accentColor = useThemeColor();
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const crystalY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const experiences = [
    { company: 'SteadFast Academy', role: 'Head of IT', duration: 'APR 2025 - PRESENT', description: 'Leading technological strategy and managing digital infrastructure. Automating departmental workflows via internal tools.', icon: <GrCloudComputer />, id: "01" },
    { company: 'Gituamba Girls', role: 'IT Consultant', duration: 'SEP 2024 - PRESENT', description: 'Managing cyber security infrastructure and network optimization for community-focused tech deployments.', icon: <GrCloudComputer />, id: "02" },
    { company: 'VisionFund Kenya', role: 'Software Engineer', duration: 'OCT 2023 - DEC 2023', description: 'Architecting internal tools and cloud service frameworks within high-velocity financial environments.', icon: <BsCodeSlash />, id: "03" },
    { company: 'IEBC', role: 'Data Clerk', duration: 'AUG 2023', description: 'Coordination of KIEMS voter lookup processes, maintaining 100% data retrieval accuracy during national operations.', icon: <MdHowToVote />, id: "04" },
    { company: 'Tangible Air', role: 'Network Associate', duration: 'APR 2021 - AUG 2021', description: 'Network maintenance and technical support infrastructure management for reliable connectivity.', icon: <PiNetwork />, id: "05" },
  ];

  return (
    <section ref={sectionRef} className="relative w-full py-40 bg-[#050505] overflow-hidden">
      
      {/* ── BACKGROUND ATMOSPHERE ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] h-[800px] w-[800px] rounded-full blur-[150px]"
             style={{ background: accentColor, opacity: 0.04 }} />
        <div className="absolute bottom-[10%] right-[-5%] h-[600px] w-[600px] rounded-full blur-[120px]"
             style={{ background: '#00d2ff', opacity: 0.03 }} />
      </div>

      {/* Engineering Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }}>
        <pattern id="work-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke={accentColor} strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#work-grid)" />
      </svg>

      {/* Grain Overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Floating 3D Element */}
      <motion.div style={{ y: crystalY }} className="absolute right-0 top-0 w-1/2 h-full z-0 opacity-40 pointer-events-none">
        <Canvas gl={{ alpha: true }}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color={accentColor} />
          <Suspense fallback={null}>
            <ExperienceCrystal color={accentColor} />
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
            Professional Path
          </span>
        </motion.div>

        {/* Heavy Brutalist Headline */}
        <header className="mb-32">
          <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="text-[4rem] sm:text-[6rem] md:text-[8.5rem] font-black leading-[0.85] tracking-[-0.04em] text-white uppercase">
            Work
            <br />
            <span style={{ WebkitTextStroke: `2px ${accentColor}`, color: 'transparent' }}>
              History.
            </span>
          </motion.h2>
        </header>

        {/* The Grid-Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05] border border-white/[0.05]">
          {experiences.map((exp, i) => (
            <div key={i} className="bg-[#050505]">
              <ExperienceCard data={exp} index={i} accentColor={accentColor} />
            </div>
          ))}

          {/* Call to Action Slot */}
          <div className="bg-[#050505] group cursor-pointer relative min-h-[300px] flex flex-col items-center justify-center p-10 border border-transparent hover:border-white/10 transition-all">
             <div className="text-center">
                <div className="w-16 h-16 rounded-full border border-dashed border-zinc-800 flex items-center justify-center mx-auto mb-6 group-hover:border-zinc-500 transition-colors">
                  <span className="text-zinc-600 text-2xl font-light group-hover:text-white">+</span>
                </div>
                <p className="text-[10px] tracking-[0.4em] text-zinc-600 uppercase font-black group-hover:text-zinc-400">
                  Next Chapter
                </p>
             </div>
          </div>
        </div>

        {/* Footer Metadata */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
           <span className="text-[9px] tracking-[0.3em] uppercase font-mono text-zinc-500">
             // End of Transmission
           </span>
           <div className="h-[1px] flex-grow mx-8 bg-white/5 hidden md:block" />
           <span className="text-[9px] tracking-[0.3em] uppercase font-mono text-zinc-500">
             Loc: 01.2921° S, 36.8219° E
           </span>
        </div>

      </div>
    </section>
  );
}