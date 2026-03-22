/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useRef, Suspense, useMemo, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { BsLinkedin, BsTwitch, BsTwitterX, BsInstagram, BsDiscord, BsGithub } from 'react-icons/bs';
import { motion, useScroll, useTransform, useReducedMotion, useSpring, useMotionValue } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { footer } from 'framer-motion/client';

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
// 3D TERMINAL ENVIRONMENT
// ─────────────────────────────────────────────
const IceGrid = ({ color }: { color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <group position={[0, -2, 0]}>
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[60, 60, 40, 40]} />
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.2}
          radius={1}
          wireframe
          opacity={0.08}
          transparent
        />
      </mesh>
      {/* Central Core Crystal */}
      <Float speed={2} rotationIntensity={0.5}>
        <mesh position={[0, 4, -10]} scale={2.5}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={color} wireframe transparent opacity={0.1} />
        </mesh>
      </Float>
    </group>
  );
};

// ─────────────────────────────────────────────
// SOCIAL PORT (The "Module" UI)
// ─────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SocialPort = ({ data, accentColor }: { data: any; accentColor: string }) => {
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  return (
    <motion.a
      href={data.url}
      target="_blank"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); x.set(0); y.set(0); }}
      onMouseMove={onMove}
      className="relative w-16 h-16 flex items-center justify-center bg-zinc-950/50 backdrop-blur-xl border border-white/[0.06] transition-all duration-500 overflow-hidden"
      style={{ borderColor: hovered ? `${accentColor}44` : undefined }}
    >
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${accentColor}1a 0%, transparent 70%)` }}
      />
      
<motion.span
  style={{ x: springX, y: springY, color: hovered ? accentColor : '#52525b' }}
  className="relative z-10 text-xl transition-colors duration-300"
>
        {data.icon}
      </motion.span>

      {/* Label Tooltip */}
      <motion.span 
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 5 }}
        className="absolute bottom-1 text-[7px] font-black tracking-[0.2em] text-zinc-500 uppercase"
      >
        {data.label}
      </motion.span>
    </motion.a>
  );
};

// ─────────────────────────────────────────────
// MAIN FOOTER
// ─────────────────────────────────────────────
export default function Footer() {
  const accentColor = useThemeColor();
  const pathname = usePathname();
  const year = useMemo(() => new Date().getFullYear(), []);
  const [mode, setMode] = useState('auto');

  const socials = [
    { icon: <BsGithub />, url: 'https://github.com/mfalme0', label: 'GH' },
    { icon: <BsLinkedin />, url: 'https://linkedin.com/in/joseph-g-471678208/', label: 'LI' },
    { icon: <BsTwitterX />, url: 'https://x.com/joemfalme001', label: 'TW' },
    { icon: <BsDiscord />, url: 'https://discord.gg/rHF5c4mCYS', label: 'DC' },
    { icon: <BsInstagram />, url: 'https://instagram.com/mfalme.01/', label: 'IG' },
  ];

  return (
    <footer className="relative w-full py-40 bg-[#050505] overflow-hidden">
      
      {/* ── ATMOSPHERE ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 h-[800px] w-[800px] rounded-full blur-[160px]"
             style={{ background: accentColor, opacity: 0.04 }} />
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]">
        <pattern id="footer-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke={accentColor} strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#footer-grid)" />
      </svg>

      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* 3D Visual - The Ice Grid Floor */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas gl={{ alpha: true }}>
          <PerspectiveCamera makeDefault position={[0, 5, 15]} fov={45} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color={accentColor} />
          <Suspense fallback={null}>
            <IceGrid color={accentColor} />
          </Suspense>
        </Canvas>
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14 flex flex-col items-center">
        
        {/* Label */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-4 mb-16">
          <span className="text-[10px] tracking-[0.5em] text-zinc-500 uppercase font-black">
            System Shutdown
          </span>
          <div className="h-[40px] w-[1px]" style={{ background: accentColor }} />
        </motion.div>

        {/* Huge Call to Action */}
        <header className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-[3.5rem] sm:text-[6rem] md:text-[8.5rem] font-black leading-[0.82] tracking-[-0.04em] text-white uppercase"
          >
            Build the
            <br />
            <span style={{ WebkitTextStroke: `2px ${accentColor}`, color: 'transparent' }}>
              Unseen.
            </span>
          </motion.h2>
        </header>

        {/* Social Terminal Ports */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-px bg-white/[0.05] border border-white/[0.05] mb-32">
          {socials.map((social, i) => (
            <div key={i} className="bg-[#050505]">
              <SocialPort data={social} accentColor={accentColor} />
            </div>
          ))}
        </div>

        {/* System Controls / Theme Toggle */}
        <div className="flex flex-col items-center gap-8 mb-40">
           <button 
             onClick={() => setMode(mode === 'auto' ? 'manual' : 'auto')}
             className="px-8 py-3 bg-zinc-950/50 border border-white/[0.06] backdrop-blur-xl text-[9px] font-black tracking-[0.4em] uppercase text-zinc-500 hover:text-white transition-all"
             style={{ borderColor: mode === 'manual' ? accentColor : undefined }}
           >
             Control_Mode: {mode.toUpperCase()}
           </button>
        </div>

        {/* Final Metadata Bar */}
        <div className="w-full pt-12 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-col items-center md:items-start gap-3">
             <p className="text-[10px] font-black tracking-[0.3em] text-zinc-600 uppercase">
               &copy; {year} Registry // Joseph Gitau
             </p>
             <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: accentColor }} />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: accentColor }} />
                </span>
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Available_For_Hire</span>
             </div>
          </div>

          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex flex-col items-center gap-4"
          >
             <div className="w-[1px] h-12 bg-white/10 group-hover:h-16 transition-all duration-500" style={{ background: `linear-gradient(to top, ${accentColor}, transparent)` }} />
             <span className="text-[9px] font-black tracking-[0.4em] text-zinc-500 uppercase group-hover:text-white transition-colors">Return_To_Top</span>
          </button>

          <div className="hidden md:flex flex-col items-end gap-2 text-right">
             <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Designed_In: Nairobi_KE</span>
             <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">Built_With: Next.js // Three.js</span>
          </div>
        </div>

      </div>
  </footer>
  
  );

}