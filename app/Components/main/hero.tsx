/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera, Trail } from '@react-three/drei';
import * as THREE from 'three';

// ─────────────────────────────────────────────
// 1)  3-D CRYSTAL  (unchanged geometry, amped lighting)
// ─────────────────────────────────────────────
const CrystalObject = ({ color, detail = 14 }: { color: string; detail?: number }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const innerMesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.18;
    mesh.current.rotation.x = Math.sin(t * 0.09) * 0.3;
    if (innerMesh.current) {
      innerMesh.current.rotation.y = -t * 0.25;
      innerMesh.current.rotation.z = t * 0.12;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
      {/* outer shell */}
      <mesh ref={mesh} scale={2.4}>
        <icosahedronGeometry args={[1, detail]} />
        <MeshDistortMaterial
          color={color}
          speed={2.5}
          distort={0.38}
          radius={1}
          metalness={0.95}
          roughness={0.08}
          emissive={color}
          emissiveIntensity={0.22}
          transparent
          opacity={0.92}
        />
      </mesh>
      {/* inner glowing core */}
      <mesh ref={innerMesh} scale={1.1}>
        <octahedronGeometry args={[1, 2]} />
        <MeshDistortMaterial
          color="#ffffff"
          speed={4}
          distort={0.5}
          metalness={1}
          roughness={0}
          emissive={color}
          emissiveIntensity={0.9}
          transparent
          opacity={0.18}
        />
      </mesh>
    </Float>
  );
};

const Scene = ({ color, lowPower = false }: { color: string; lowPower?: boolean }) => (
  <Canvas
    dpr={lowPower ? 1 : [1, 2]}
    gl={{ antialias: !lowPower, powerPreference: 'high-performance', alpha: true }}
  >
    <PerspectiveCamera makeDefault position={[0, 0, 5]} />
    <ambientLight intensity={0.15} />
    <pointLight position={[12, 12, 10]} intensity={2.2} color="#00d2ff" />
    <pointLight position={[-12, -10, -10]} intensity={2.2} color={color} />
    <pointLight position={[0, -8, 6]} intensity={1.4} color="#ffffff" />
    <spotLight position={[0, 10, 3]} intensity={3} angle={0.3} penumbra={1} color={color} />
    <Suspense fallback={null}>
      <CrystalObject color={color} detail={lowPower ? 6 : 14} />
    </Suspense>
  </Canvas>
);

// ─────────────────────────────────────────────
// 2)  ANIMATED BACKGROUND GRID
// ─────────────────────────────────────────────
const GridLines = ({ color }: { color: string }) => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity: 0.055 }}
  >
    <defs>
      <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke={color} strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);

// ─────────────────────────────────────────────
// 3)  SPLIT CHAR ANIMATION
// ─────────────────────────────────────────────
const SplitText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.55,
            delay: delay + i * 0.038,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
          style={{ transformOrigin: 'bottom center', perspective: '400px' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

// ─────────────────────────────────────────────
// 4)  MARQUEE SKILL STRIP
// ─────────────────────────────────────────────
const skills = [
  'Next.js', '·', 'React Native', '·', 'TypeScript', '·',
  'Node.js', '·', 'C#', '·', '.NET', '·', 'PostgreSQL', '·',
  'Tailwind CSS', '·', 'Docker', '·', 'REST APIs', '·',
  'UI/UX', '·', 'System Design', '·',
];

const Marquee = ({ color }: { color: string }) => {
  const doubled = [...skills, ...skills];
  return (
    <div className="relative overflow-hidden w-full py-3 border-y border-white/[0.07]"
         style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((s, i) => (
          <span
            key={i}
            className="text-[11px] tracking-[0.2em] uppercase font-medium"
            style={{ color: s === '·' ? color : 'rgba(255,255,255,0.35)' }}
          >
            {s}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────
// 5)  STAT COUNTER
// ─────────────────────────────────────────────
const stats = [
  { value: '3+', label: 'Years building' },
  { value: '20+', label: 'Projects shipped' },
  { value: 'KE', label: 'Based in Nairobi' },
];

// ─────────────────────────────────────────────
// 6)  TYPING SEQUENCES
// ─────────────────────────────────────────────
const sequences = [
  'High-performance web & mobile.',
  'Systems that scale elegantly.',
  'Products users actually love.',
  'Code that ships — and sticks.',
];

const TypingLine = () => {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = sequences[idx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 38);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 18);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((idx + 1) % sequences.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx]);

  return (
    <span>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.55, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-[2px] h-[1.1em] bg-current align-middle ml-[2px]"
      />
    </span>
  );
};

// ─────────────────────────────────────────────
// 7)  HERO
// ─────────────────────────────────────────────
export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [themeColor, setThemeColor] = useState('#f8fafc');
  const [lowPower, setLowPower] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 140]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);
  const scaleCrystal = useTransform(scrollY, [0, 600], [1, 1.3]);
  const crystalY = useTransform(scrollY, [0, 600], [0, -80]);

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    if (hour < 12)       setThemeColor('#7dd3fc'); // Morning: sky blue
    else if (hour < 18)  setThemeColor('#f8fafc'); // Day: arctic white
    else                 setThemeColor('#818cf8'); // Evening: indigo

    const onResize = () => setLowPower(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const accentHex = themeColor;

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#050505] font-sans">

      {/* ── BACKGROUND LAYERS ── */}

      {/* deep radial bloom */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-[-20%] left-[30%] h-[900px] w-[900px] rounded-full blur-[160px]"
          style={{ background: accentHex, opacity: 0.07 }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full blur-[120px]"
          style={{ background: '#00d2ff', opacity: 0.05 }}
        />
      </div>

      {/* animated grid */}
      <GridLines color={accentHex} />

      {/* grain */}
      <div className="absolute inset-0 z-[1] opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* ── 3D CRYSTAL  (right-aligned, slightly behind content) ── */}
      <motion.div
        style={{
          scale: prefersReducedMotion ? 1 : scaleCrystal,
          y: prefersReducedMotion ? 0 : crystalY,
        }}
        className="absolute right-[-10vw] md:right-[-4vw] top-0 h-full w-[65vw] md:w-[52vw] z-[2] opacity-90"
        aria-hidden="true"
      >
        <Scene color={accentHex} lowPower={lowPower || !!prefersReducedMotion} />
      </motion.div>

      {/* ── MAIN CONTENT ── */}
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : yText, opacity: prefersReducedMotion ? 1 : opacityText }}
        className="relative z-10 mx-auto max-w-7xl px-6 md:px-14 pt-[14vh] md:pt-[18vh] pb-10"
      >

        {/* ── STATUS BADGE ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ background: accentHex }}
            />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: accentHex }} />
          </span>
          <span className="text-[10px] tracking-[0.32em] text-zinc-300 uppercase font-medium">
            Available for new projects
          </span>
        </motion.div>

        {/* ── HEADLINE ── */}
        <div className="overflow-hidden">
          <h1 className="text-[3.8rem] sm:text-[5.5rem] md:text-[7.5rem] font-black leading-[0.88] tracking-[-0.03em] text-white uppercase">
            {mounted && !prefersReducedMotion ? (
              <>
                <SplitText text="Joseph" className="block" delay={0.2} />
                <SplitText
                  text="Gitau"
                  className="block"
                  delay={0.5}
                />
              </>
            ) : (
              <>
                <span className="block">Joseph</span>
                <span className="block" style={{ WebkitTextStroke: `2px ${accentHex}`, color: 'transparent' }}>Gitau</span>
              </>
            )}
          </h1>
        </div>

        {/* second line — outlined */}
        {mounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <h2
              className="text-[3.8rem] sm:text-[5.5rem] md:text-[7.5rem] font-black leading-[0.88] tracking-[-0.03em] uppercase"
              style={{ WebkitTextStroke: `2px ${accentHex}`, color: 'transparent' }}
            >
              Software Eng.
            </h2>
          </motion.div>
        )}

        {/* ── SUBLINE ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-8 flex items-center gap-4"
        >
          <div className="h-[1px] w-10 bg-white/20" />
          <p className="text-base md:text-lg text-zinc-400 font-light">
            <TypingLine />
          </p>
        </motion.div>

        {/* ── STATS ROW ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 0.6 }}
          className="mt-12 flex gap-8 md:gap-12"
        >
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span
                className="text-3xl md:text-4xl font-black tabular-nums leading-none"
                style={{ color: accentHex }}
              >
                {s.value}
              </span>
              <span className="text-[11px] tracking-[0.2em] uppercase text-zinc-500 font-medium">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── CTA BUTTONS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.75, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 items-start"
        >
          {/* Primary */}
          <Link
            href="https://github.com/mfalme0"
            target="_blank"
            className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-sm tracking-[0.08em] uppercase overflow-hidden text-black transition-transform hover:scale-[1.04] active:scale-[0.98]"
            style={{ background: accentHex }}
          >
            <span className="relative z-10 flex items-center gap-2">
              GitHub
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                ↗
              </motion.span>
            </span>
          </Link>

          {/* Secondary */}
          <Link
            href="https://www.linkedin.com/in/josephgitauc/"
            target="_blank"
            className="group inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-sm tracking-[0.08em] uppercase border-2 text-white/90 bg-transparent backdrop-blur-sm hover:bg-white/5 transition-all"
            style={{ borderColor: `${accentHex}55` }}
          >
            LinkedIn
          </Link>

          {/* Ghost */}
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-2 py-4 text-sm tracking-[0.08em] uppercase text-white/40 hover:text-white/80 transition-colors font-medium"
          >
            <span>Projects</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              ↓
            </motion.span>
          </a>
        </motion.div>
      </motion.div>

      {/* ── MARQUEE SKILLS STRIP (pinned to bottom) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <Marquee color={accentHex} />
      </motion.div>

    </section>
  );
}