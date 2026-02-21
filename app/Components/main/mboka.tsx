/* eslint-disable react/jsx-no-comment-textnodes */
'use client';

import React, { useRef, Suspense, useMemo } from 'react';
import { BsCodeSlash } from "react-icons/bs";
import { PiNetwork } from "react-icons/pi";
import { MdHowToVote } from "react-icons/md";
import { GrCloudComputer } from "react-icons/gr";
import { FaCalendarAlt } from "react-icons/fa";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const experiences = [
  {
    company: 'SteadFast Academy',
    role: 'HEAD OF IT',
    duration: 'APR 2025 - PRESENT',
    description: 'Leading technological strategy and managing digital infrastructure. Automating departmental workflows and ensuring system efficiency through custom internal tools.',
    icon: <GrCloudComputer />,
    id: "01"
  },
  {
    company: 'Gituamba Girls',
    role: 'IT CONSULTANT',
    duration: 'SEP 2024 - PRESENT',
    description: 'Managing cyber security infrastructure and network optimization for community-focused tech deployments.',
    icon: <GrCloudComputer />,
    id: "02"
  },
  {
    company: 'VisionFund Kenya',
    role: 'SOFTWARE ENGINEER',
    duration: 'OCT 2023 - DEC 2023',
    description: 'Architecting internal tools and cloud service frameworks within high-velocity financial environments.',
    icon: <BsCodeSlash />,
    id: "03"
  },
  {
    company: 'IEBC',
    role: 'DATA CLERK',
    duration: 'AUG 2023',
    description: 'Coordination of KIEMS voter lookup processes, maintaining 100% data retrieval accuracy during national operations.',
    icon: <MdHowToVote />,
    id: "04"
  },
  {
    company: 'Tangible Air',
    role: 'NETWORK ASSOCIATE',
    duration: 'APR 2021 - AUG 2021',
    description: 'Network maintenance and technical support infrastructure management.',
    icon: <PiNetwork />,
    id: "05"
  },
];

// Background core
const IceCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.4}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[4, 1]} />
        <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.022} />
      </mesh>
    </Float>
  );
};

const ExperienceCard = ({
  data,
  index,
  enableTilt,
}: {
  data: typeof experiences[number];
  index: number;
  enableTilt: boolean;
}) => {
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-120, 120], [6, -6]), { stiffness: 120, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-120, 120], [-6, 6]), { stiffness: 120, damping: 22 });

  const shouldTilt = enableTilt && !prefersReducedMotion;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: index * 0.06 }}
      viewport={{ once: true, margin: '-80px' }}
      onMouseMove={(e) => {
        if (!shouldTilt) return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - (rect.left + rect.width / 2));
        y.set(e.clientY - (rect.top + rect.height / 2));
      }}
      onMouseLeave={() => {
        x.set(0); y.set(0);
      }}
      style={{
        rotateX: shouldTilt ? rotateX : 0,
        rotateY: shouldTilt ? rotateY : 0,
        transformStyle: 'preserve-3d',
        perspective: 1200,
      }}
      className="relative h-full"
    >
      <div className="relative h-full min-h-[320px] p-8 bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors duration-500 overflow-hidden">
        {/* Hover aura */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 blur-[90px] opacity-0 hover:opacity-100 transition-opacity duration-1000" />

        <div className="relative z-10 flex flex-col h-full">
          {/* metadata */}
          <div className="flex items-start justify-between mb-8">
            <span className="text-[10px] font-mono tracking-[0.32em] text-zinc-600 uppercase">
              // LOG_{data.id}
            </span>
            <div className="text-zinc-500 text-xl">
              {data.icon}
            </div>
          </div>

          {/* title */}
          <div className="space-y-2 mb-6">
            <p className="text-[10px] font-bold tracking-[0.22em] text-cyan-500/80 uppercase">
              {data.role}
            </p>
            <h3 className="text-2xl md:text-3xl font-medium text-white tracking-tight">
              {data.company}
            </h3>
          </div>

          <p className="text-zinc-400/70 text-sm leading-relaxed">
            {data.description}
          </p>

          {/* footer */}
          <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600 tracking-widest">
              <FaCalendarAlt className="text-[9px]" />
              {data.duration}
            </div>
            <div className="w-10 h-[1px] bg-white/10" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function WorkExperience() {
  const prefersReducedMotion = useReducedMotion();

  // Only enable tilt on desktop-ish sizes (avoids weirdness on touch)
  const enableTilt = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(min-width: 1024px)').matches;
  }, []);

  // Low power canvas on small screens / reduced motion
  const lowPower = prefersReducedMotion;

  return (
    <section className="relative w-full py-32 bg-[#050505] overflow-hidden">
      {/* noise */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* background 3D (consider disabling if you already have canvas in Hero + About) */}
      <div className="absolute inset-0 z-0 opacity-35">
        <Canvas dpr={lowPower ? 1 : [1, 1.5]} gl={{ antialias: !lowPower, powerPreference: 'high-performance' }}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <IceCore />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <span className="text-[10px] tracking-[0.5em] text-zinc-500 uppercase">
              Professional Path
            </span>
            <h2 className="text-5xl md:text-7xl font-medium text-white tracking-tight">
              History<span className="text-zinc-700">.</span>
            </h2>
          </motion.div>
        </header>

        {/* clean bordered grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-white/5">
          {experiences.map((experience, index) => (
            <div key={experience.company} className="border-t border-white/5 md:border-t-0 md:border-l border-white/5">
              <ExperienceCard data={experience} index={index} enableTilt={enableTilt} />
            </div>
          ))}

          {/* future slot */}
          <div className="hidden lg:flex items-center justify-center border-t border-white/5 md:border-t-0 md:border-l border-white/5 bg-white/[0.01] min-h-[320px]">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full border border-dashed border-white/10 flex items-center justify-center mx-auto">
                <span className="text-white/25 text-xl font-light">+</span>
              </div>
              <p className="text-[10px] tracking-[0.3em] text-zinc-600 uppercase">
                Next Project
              </p>
            </div>
          </div>
        </div>

        {/* small note for spacing */}
        <div className="mt-10 text-[10px] text-zinc-600 tracking-[0.25em] uppercase font-mono">
          // Rendered as modular logs
        </div>
      </div>
    </section>
  );
}