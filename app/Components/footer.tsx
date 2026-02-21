/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useRef, Suspense, useMemo, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  BsLinkedin, BsTwitch, BsTwitterX, BsInstagram, BsDiscord, BsGithub
} from 'react-icons/bs';
import {
  motion, useMotionValue, useSpring, useReducedMotion
} from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// --- DATA ---
const socials = [
  { icon: <BsGithub />, url: 'https://github.com/mfalme0', label: 'GitHub' },
  { icon: <BsLinkedin />, url: 'https://www.linkedin.com/in/joseph-g-471678208/', label: 'LinkedIn' },
  { icon: <BsTwitterX />, url: 'https://x.com/joemfalme001', label: 'X' },
  { icon: <BsTwitch />, url: 'https://twitch.tv/joe_mfalme', label: 'Twitch' },
  { icon: <BsDiscord />, url: 'https://discord.gg/rHF5c4mCYS', label: 'Discord' },
  { icon: <BsInstagram />, url: 'https://www.instagram.com/mfalme.01/', label: 'Instagram' },
];

// --- 3D ICE FLOOR ---
const IceFloor = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.04;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
      <planeGeometry args={[50, 50, 48, 48]} />
      <MeshDistortMaterial
        color="#111"
        speed={1}
        distort={0.18}
        radius={1}
        wireframe
        opacity={0.14}
        transparent
      />
    </mesh>
  );
};

// --- SOCIAL BUTTON ---
const SocialButton = ({ data }: { data: typeof socials[number] }) => {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mx = useSpring(x, { stiffness: 220, damping: 22 });
  const my = useSpring(y, { stiffness: 220, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion) return;
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    x.set(dx * 0.18);
    y.set(dy * 0.18);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative w-14 h-14 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md flex items-center justify-center transition-colors duration-500 hover:border-white/10 hover:bg-white/[0.04]"
      aria-label={data.label}
      title={data.label}
    >
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <span className="absolute inset-0 rounded-full bg-white/5 blur-xl" />
      </span>

      <motion.span
        style={{ x: mx, y: my }}
        className="relative z-10 text-2xl text-zinc-500 group-hover:text-white transition-colors duration-500"
      >
        {data.icon}
      </motion.span>

      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.2em] uppercase text-zinc-400 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
        {data.label}
      </span>
    </motion.a>
  );
};

type ThemeMode = 'auto' | 'portfolio' | 'gear';
const THEME_KEY = 'jg_theme_mode_v1';

export default function Footer() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const enableFooter3D = true;
  const year = useMemo(() => new Date().getFullYear(), []);

  const [mode, setMode] = useState<ThemeMode>('auto');

  // load + apply theme
  useEffect(() => {
    const saved = (localStorage.getItem(THEME_KEY) as ThemeMode) || 'auto';
    setMode(saved);
  }, []);

  useEffect(() => {
    const routeTheme = pathname === '/gear' ? 'gear' : 'portfolio';
    const applied = mode === 'auto' ? routeTheme : mode;
    document.documentElement.setAttribute('data-theme', applied);
  }, [mode, pathname]);

  const isGearTheme = (() => {
    const routeTheme = pathname === '/gear' ? 'gear' : 'portfolio';
    return (mode === 'auto' ? routeTheme : mode) === 'gear';
  })();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const cycleMode = () => {
    const next: ThemeMode = mode === 'auto' ? 'gear' : mode === 'gear' ? 'portfolio' : 'auto';
    setMode(next);
    localStorage.setItem(THEME_KEY, next);
  };

  // theme accents (no CSS changes required)
  const footerBg = isGearTheme ? 'bg-[#050505]' : 'bg-[#050505]';
  const accentText = isGearTheme ? 'text-emerald-400' : 'text-zinc-400';
  const accentDot = isGearTheme ? 'bg-emerald-500' : 'bg-emerald-500';

  return (
    <footer className={`relative w-full min-h-[60vh] flex flex-col items-center justify-between ${footerBg} overflow-hidden pt-24 pb-12`}>
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* 3D */}
      {enableFooter3D && (
        <div className="absolute inset-0 z-0">
          <Canvas
            dpr={prefersReducedMotion ? 1 : [1, 1.5]}
            gl={{ antialias: !prefersReducedMotion, powerPreference: 'high-performance', alpha: true }}
          >
            <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={50} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />

            <Suspense fallback={null}>
              <IceFloor />
              <Float speed={prefersReducedMotion ? 0.7 : 1.6} rotationIntensity={0.4} floatIntensity={0.4}>
                <mesh position={[0, 4, -5]}>
                  <icosahedronGeometry args={[1, 0]} />
                  <meshStandardMaterial color="#fff" wireframe opacity={0.08} transparent />
                </mesh>
              </Float>
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* TOP */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-4"
        >
          <span className={`text-[10px] tracking-[0.5em] uppercase ${accentText}`}>
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tight">
            Let&lsquo;s build the <span className="italic text-zinc-400">unseen</span>.
          </h2>
        </motion.div>

        {/* THEME SWITCH */}
        <button
          onClick={cycleMode}
          className="mt-8 px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition text-[10px] tracking-[0.35em] uppercase text-zinc-300"
          title="Theme Mode: auto → gear → portfolio"
        >
          Theme: {mode.toUpperCase()}
        </button>

        {/* SOCIALS */}
        <div className="flex flex-wrap justify-center gap-3 mt-14">
          {socials.map((social, idx) => (
            <SocialButton key={idx} data={social} />
          ))}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="relative z-10 w-full max-w-7xl px-8 mt-24 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5 pt-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="text-[10px] text-zinc-600 font-bold tracking-[0.3em] uppercase">
            &copy; {year} Joseph Gitau
          </p>
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${accentDot} animate-pulse`} />
            <span className="text-[9px] text-zinc-500 tracking-[0.2em] uppercase">
              Status: Available for Projects
            </span>
          </div>
        </div>

        <button
          onClick={scrollToTop}
          className="group flex flex-col items-center gap-2 transition-transform hover:-translate-y-1"
        >
          <div className="w-[1px] h-8 bg-gradient-to-t from-white to-transparent opacity-20 group-hover:opacity-100 transition-opacity" />
          <span className="text-[9px] tracking-[0.4em] text-zinc-500 uppercase">
            Back to Top
          </span>
        </button>

        <div className="hidden md:block">
          <p className="text-[10px] text-zinc-600 tracking-[0.2em] uppercase">
            Designed for the <span className="text-zinc-400">Future</span>
          </p>
        </div>
      </div>
    </footer>
  );
}