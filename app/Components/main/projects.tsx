/* eslint-disable react/jsx-no-comment-textnodes */
'use client';

import React, { Suspense, useMemo } from 'react';
import Image, { StaticImageData } from 'next/image';
import project1 from "../Images/better.jpeg";
import project3 from "../Images/ndai.jpeg";
import project4 from "../Images/archie.jpeg";
import ganji from "../Images/ganji.png";

import { FiGithub, FiExternalLink } from 'react-icons/fi';
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion
} from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Icosahedron, PerspectiveCamera } from '@react-three/drei';

// --- 1) DATA ---
type Project = {
  title: string;
  id: string;
  description: string;
  image: StaticImageData;
  category: string;
  github: string;
  live?: string; // optional
};

const projects: Project[] = [
  {
    title: 'Better Farm',
    id: '01',
    description: 'Farming AI assistant featuring a specialized neural-chat architecture for agricultural optimization.',
    image: project1,
    category: 'APP_MOBILE',
    github: 'https://github.com/mfalme0/betterFarm',
  },
  {
    title: 'Ganji',
    id: '02',
    description: 'Financial ledger system designed for high-fidelity expense tracking and asset management.',
    image: ganji,
    category: 'APP_FINTECH',
    github: 'https://github.com/mfalme0/ganji',
  },
  {
    title: 'Ndai',
    id: '03',
    description: 'Comprehensive vehicle management infrastructure and logistics monitoring suite.',
    image: project3,
    category: 'WEB_SYSTEM',
    github: 'https://github.com/mfalme0/ndai.com',
  },
  {
    title: 'Archie',
    id: '04',
    description: 'High-security file archival protocol and distributed retrieval system.',
    image: project4,
    category: 'WEB_SECURITY',
    github: 'https://github.com/mfalme0/Archiewebapp',
  },
];

// --- 2) BACKGROUND (low-power) ---
const ShardBackground = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 -z-0 opacity-20 pointer-events-none">
      <Canvas
        dpr={prefersReducedMotion ? 1 : [1, 1.5]}
        gl={{ antialias: !prefersReducedMotion, powerPreference: 'high-performance', alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.45} />
        <pointLight position={[10, 10, 10]} intensity={0.9} />
        <Suspense fallback={null}>
          <Float speed={prefersReducedMotion ? 0.6 : 1.2} rotationIntensity={0.8} floatIntensity={0.8}>
            <Icosahedron args={[3, 1]} position={[-8, 4, -5]}>
              <meshStandardMaterial color="#fff" wireframe transparent opacity={0.08} />
            </Icosahedron>
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
};

// --- 3) CARD ---
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const prefersReducedMotion = useReducedMotion();

  // hover-only tilt devices
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
    rx.set(dy * -6);
    ry.set(dx * 6);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: index * 0.06 }}
      viewport={{ once: true, margin: '-60px' }}
      onMouseMove={onMove}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{
        rotateX: prefersReducedMotion || !enableTilt ? 0 : rotateX,
        rotateY: prefersReducedMotion || !enableTilt ? 0 : rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1200,
      }}
      className="group relative h-full"
    >
      <div className="relative flex flex-col h-full bg-zinc-950/20 backdrop-blur-xl transition-colors duration-700 overflow-hidden">
        {/* image */}
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/45 group-hover:bg-black/15 transition-colors duration-1000" />

          {/* meta */}
          <div className="absolute top-6 left-6 flex flex-col gap-1">
            <span className="text-[9px] font-mono tracking-[0.2em] text-white bg-black/70 px-2 py-1 backdrop-blur-md">
              {project.id}
            </span>
            <span className="text-[8px] font-mono tracking-[0.1em] text-zinc-300 bg-black/70 px-2 py-1 backdrop-blur-md">
              [ {project.category} ]
            </span>
          </div>
        </div>

        {/* content */}
        <div className="p-8 flex flex-col flex-grow">
          <h3 className="text-2xl md:text-3xl font-medium text-white tracking-tight mb-4 group-hover:text-cyan-300 transition-colors duration-500">
            {project.title}
          </h3>

          <p className="text-zinc-400/70 text-sm leading-relaxed mb-8 flex-grow">
            {project.description}
          </p>

          {/* actions */}
          <div className="flex items-center justify-between pt-6 border-t border-white/5">
            <div className="flex items-center gap-6">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-zinc-500 hover:text-white transition-colors uppercase"
              >
                <FiGithub /> Source
              </a>

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-zinc-500 hover:text-white transition-colors uppercase"
                >
                  <FiExternalLink /> Live
                </a>
              )}
            </div>

            <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-cyan-400 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.7)] transition-all duration-500" />
          </div>
        </div>
      </div>
    </motion.article>
  );
};

// --- 4) MAIN ---
export function Projects() {
  return (
    <section className="relative w-full py-32 bg-[#050505] overflow-hidden" id="projects">
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* keep or remove if you decide "Hero-only 3D" */}
      <ShardBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="space-y-4"
          >
            <span className="text-[10px] tracking-[0.5em] text-zinc-500 uppercase">
              Deployed Assets
            </span>
            <h2 className="text-5xl md:text-7xl font-medium text-white tracking-tight">
              Portfolio<span className="text-zinc-700 italic">.pkg</span>
            </h2>
          </motion.div>
        </header>

        {/* clean bordered grid (no double borders) */}
        <div className="grid grid-cols-1 md:grid-cols-2 border border-white/5">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="border-t border-white/5 md:border-t-0 md:border-l border-white/5"
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>

        <footer className="mt-16 flex flex-col md:flex-row justify-between items-center gap-4 opacity-50 hover:opacity-100 transition-opacity duration-700">
          <div className="flex gap-10 text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
            <span>Status: Active</span>
            <span>Integrity: Verified</span>
          </div>
          <div className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
            // END_OF_ARCHIVE
          </div>
        </footer>
      </div>
    </section>
  );
}