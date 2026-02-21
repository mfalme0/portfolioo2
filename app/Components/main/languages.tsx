/* eslint-disable react/jsx-no-comment-textnodes */
'use client';

import React, { useRef, Suspense, useMemo } from 'react';
import {
  FaJava, FaPython, FaJs, FaReact, FaNodeJs, FaHtml5, FaVuejs
} from 'react-icons/fa';
import { SiFlutter, SiKotlin, SiNextdotjs, SiCplusplus } from 'react-icons/si';
import { TbBrandCSharp } from "react-icons/tb";
import {
  motion, useMotionValue, useSpring, useReducedMotion
} from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const languages = [
  { name: 'JavaScript', icon: <FaJs />, proficiency: 90 },
  { name: 'React', icon: <FaReact />, proficiency: 90 },
  { name: 'NextJS', icon: <SiNextdotjs />, proficiency: 85 },
  { name: 'Node.js', icon: <FaNodeJs />, proficiency: 85 },
  { name: 'Python', icon: <FaPython />, proficiency: 65 },
  { name: 'Java', icon: <FaJava />, proficiency: 60 },
  { name: 'C#', icon: <TbBrandCSharp />, proficiency: 80 },
  { name: 'Flutter', icon: <SiFlutter />, proficiency: 75 },
  { name: 'Kotlin', icon: <SiKotlin />, proficiency: 70 },
  { name: 'C++', icon: <SiCplusplus />, proficiency: 75 },
  { name: 'HTML', icon: <FaHtml5 />, proficiency: 95 },
  { name: 'VueJS', icon: <FaVuejs />, proficiency: 60 },
];

// --- 3D background ---
const BlueprintGeometry = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.06;
    meshRef.current.rotation.y = t * 0.1;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.35}>
      <mesh ref={meshRef}>
        <torusGeometry args={[4, 1.5, 14, 90]} />
        <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.04} />
      </mesh>
    </Float>
  );
};

const LanguageCard = ({ lang }: { lang: typeof languages[number] }) => {
  const prefersReducedMotion = useReducedMotion();

  // Only do tilt on desktop/hover devices
  const enableTilt = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }, []);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 160, damping: 24 });
  const rotateY = useSpring(ry, { stiffness: 160, damping: 24 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !enableTilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
    const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
    rx.set(dy * -8);
    ry.set(dx * 8);
  };

  const lvl = `LVL.0${Math.max(1, Math.min(3, Math.ceil(lang.proficiency / 30)))}`;

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
      onMouseMove={onMove}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{
        rotateX: prefersReducedMotion || !enableTilt ? 0 : rotateX,
        rotateY: prefersReducedMotion || !enableTilt ? 0 : rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1200,
      }}
      className="group relative"
    >
      <div className="relative p-6 bg-zinc-950/40 backdrop-blur-xl border border-white/5 rounded-sm transition-all duration-500 group-hover:bg-white/[0.03] group-hover:border-white/15 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="text-3xl mb-6 text-zinc-600 group-hover:text-white group-hover:scale-110 transition-all duration-500 ease-out">
            {lang.icon}
          </div>

          <h3 className="text-[9px] font-bold tracking-[0.3em] text-zinc-500 uppercase mb-6 group-hover:text-zinc-200">
            {lang.name}
          </h3>

          <div className="w-full space-y-3">
            <div className="h-[1px] w-full bg-zinc-900 relative">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${lang.proficiency}%` }}
                viewport={{ once: true }}
                transition={{ duration: prefersReducedMotion ? 0 : 1.1, ease: 'easeOut' }}
                className="absolute top-0 left-0 h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.35)]"
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
              </motion.div>
            </div>

            <div className="flex justify-between items-center text-[8px] font-mono tracking-widest text-zinc-600">
              <span className="group-hover:text-white/70 transition-colors">{lvl}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity italic">
                {lang.proficiency}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProgrammingLanguages() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative w-full py-32 bg-[#050505] overflow-hidden" id="languages">
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* 3D layer (low power) */}
      <div className="absolute inset-0 z-0 opacity-25">
        <Canvas
          dpr={prefersReducedMotion ? 1 : [1, 1.5]}
          gl={{ antialias: !prefersReducedMotion, powerPreference: 'high-performance', alpha: true }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
          <ambientLight intensity={0.45} />
          <pointLight position={[10, 10, 10]} intensity={0.9} />
          <Suspense fallback={null}>
            <BlueprintGeometry />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <header className="mb-24 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="space-y-4"
          >
            <span className="text-[10px] tracking-[0.5em] text-zinc-500 uppercase">
              Technical Linguistics
            </span>
            <h2 className="text-5xl md:text-8xl font-medium text-white tracking-tighter">
              Fluency<span className="text-zinc-700 italic">.sh</span>
            </h2>
          </motion.div>
        </header>

        <motion.div
          variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
        >
          {languages.map((lang) => (
            <LanguageCard key={lang.name} lang={lang} />
          ))}
        </motion.div>

        <footer className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 opacity-40 hover:opacity-100 transition-opacity duration-700">
          <div className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
            // STACK_AUDIT_COMPLETE
          </div>
          <div className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
            Total_Modules: {languages.length}
          </div>
        </footer>
      </div>
    </section>
  );
}