/* eslint-disable react-hooks/purity */
'use client';

import React, { Suspense, useMemo } from 'react';
import { SiMacos, SiAndroid, SiIos, SiLinux, SiProxmox } from 'react-icons/si';
import { FaAws, FaDocker, FaFigma } from 'react-icons/fa';
import { DiMongodb } from 'react-icons/di';
import { RiFirebaseFill } from 'react-icons/ri';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Icosahedron, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';

interface Technology {
  name: string;
  icon: React.ReactElement;
  proficiency: 'Intermediate' | 'Advanced' | 'Expert';
}

const technologies: Technology[] = [
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

// --- Floating background ---
const FloatingShards = () => {
  const prefersReducedMotion = useReducedMotion();

  // Stable particle positions (generated once)
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }).map(() => ([
        Math.random() * 18 - 9,
        Math.random() * 18 - 9,
        -5 - Math.random() * 2,
      ] as const)),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden -z-0 pointer-events-none">
      <Canvas
        dpr={prefersReducedMotion ? 1 : [1, 1.5]}
        gl={{ antialias: !prefersReducedMotion, powerPreference: 'high-performance', alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.25} color="#00d2ff" />

        <Float speed={1.2} rotationIntensity={1.2} floatIntensity={1.2}>
          <Icosahedron args={[1, 0]} position={[-5, 3, -2]} scale={1.7}>
            <meshStandardMaterial color="#fff" wireframe opacity={0.045} transparent />
          </Icosahedron>
        </Float>

        <Float speed={2.0} rotationIntensity={0.8} floatIntensity={0.9}>
          <Icosahedron args={[1, 0]} position={[6, -2, 0]} scale={1.15}>
            <MeshDistortMaterial color="#888" speed={2} distort={0.35} opacity={0.08} transparent />
          </Icosahedron>
        </Float>

        {particles.map((pos, i) => (
          <Float key={i} speed={prefersReducedMotion ? 0.6 : 1.6}>
            <mesh position={pos}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshBasicMaterial color="#ffffff" opacity={0.2} transparent />
            </mesh>
          </Float>
        ))}
      </Canvas>
    </div>
  );
};

// --- Card ---
const TechCard = ({ tech }: { tech: Technology }) => {
  const prefersReducedMotion = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);

  const rotateX = useSpring(rx, { stiffness: 140, damping: 22 });
  const rotateY = useSpring(ry, { stiffness: 140, damping: 22 });

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const { currentTarget, clientX, clientY } = event;
    const rect = currentTarget.getBoundingClientRect();
    const dx = (clientX - (rect.left + rect.width / 2)) / rect.width;
    const dy = (clientY - (rect.top + rect.height / 2)) / rect.height;

    rx.set(dy * -10);
    ry.set(dx * 10);
  };

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1200,
      }}
      className="group relative"
    >
      <div className="relative p-8 rounded-2xl border border-white/5 bg-zinc-900/20 backdrop-blur-md transition-all duration-500 group-hover:bg-white/[0.03] group-hover:border-white/10 overflow-hidden">
        <div className="absolute -inset-px bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="text-4xl mb-6 text-zinc-500 group-hover:text-white group-hover:scale-110 transition-all duration-700 ease-out">
            {tech.icon}
          </div>

          <h3 className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase mb-4">
            {tech.name}
          </h3>

          <div className="w-full space-y-2">
            <div className="h-[1px] w-full bg-zinc-800 relative">
              <motion.div
                initial={{ width: 0 }}
                whileInView={prefersReducedMotion ? { width: proficiencyToWidth(tech.proficiency) } : { width: proficiencyToWidth(tech.proficiency) }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute top-0 left-0 h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.45)]"
              />
            </div>

            <div className="flex justify-between items-center px-0.5">
              <span className="text-[8px] text-zinc-600 font-mono uppercase tracking-widest">
                {tech.proficiency}
              </span>
              <span className="text-[8px] text-zinc-700 font-mono">
                {proficiencyToLevel(tech.proficiency)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function TechStack() {
  return (
    <section className="relative w-full py-32 bg-[#050505] overflow-hidden" id="techstack">
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <Suspense fallback={null}>
        <FloatingShards />
      </Suspense>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="space-y-4"
          >
            <span className="text-[10px] tracking-[0.5em] text-zinc-500 uppercase">
              System Capabilities
            </span>
            <h2 className="text-5xl md:text-7xl font-medium text-white tracking-tighter">
              The <span className="italic text-zinc-400">Stack</span>.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-zinc-500 text-sm max-w-xs font-light leading-relaxed border-l border-zinc-800 pl-6"
          >
            A technical breakdown of the tools and environments used to develop high-performance consumer applications.
          </motion.p>
        </header>

        <motion.div
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {technologies.map((tech) => (
            <TechCard key={tech.name} tech={tech} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}