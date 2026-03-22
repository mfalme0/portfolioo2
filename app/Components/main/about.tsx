'use client';

import React, { useRef, Suspense, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import { FaLaptopCode, FaServer, FaMobileAlt } from "react-icons/fa";
import { SiLinux } from "react-icons/si";
import * as THREE from "three";

// ─────────────────────────────────────────────
// TIME-BASED ACCENT (mirrors Hero)
// ─────────────────────────────────────────────
function useThemeColor() {
  const [color, setColor] = useState('#f8fafc');
  useEffect(() => {
    const hour = new Date().getHours();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (hour < 12)      setColor('#7dd3fc'); // Morning: sky blue
    else if (hour < 18) setColor('#f8fafc'); // Day: arctic white
    else                setColor('#818cf8'); // Evening: indigo
  }, []);
  return color;
}

// ─────────────────────────────────────────────
// 3-D BACKGROUND SHARD  (amped)
// ─────────────────────────────────────────────
const ShardEntity = ({ color }: { color: string }) => {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (outer.current) {
      outer.current.rotation.y = t * 0.06;
      outer.current.rotation.x = t * 0.04;
    }
    if (inner.current) {
      inner.current.rotation.y = -t * 0.1;
      inner.current.rotation.z = t * 0.07;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={outer}>
        <icosahedronGeometry args={[4, 1]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.04} />
      </mesh>
      <mesh ref={inner} scale={0.45}>
        <icosahedronGeometry args={[4, 2]} />
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.4}
          metalness={1}
          roughness={0}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.12}
        />
      </mesh>
    </Float>
  );
};

const ShardScene = ({ color }: { color: string }) => (
  <Canvas gl={{ alpha: true, antialias: true }}>
    <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
    <ambientLight intensity={0.2} />
    <pointLight position={[10, 10, 10]} intensity={2} color="#00d2ff" />
    <pointLight position={[-10, -10, -10]} intensity={2} color={color} />
    <Suspense fallback={null}>
      <ShardEntity color={color} />
    </Suspense>
  </Canvas>
);

// ─────────────────────────────────────────────
// DOMAINS DATA
// ─────────────────────────────────────────────
const domains = [
  {
    title: "Frontend Engineering",
    code: "01",
    icon: FaLaptopCode,
    desc: "React / Next.js / Vue / Tailwind",
    detail: "Pixel-perfect UIs with obsessive performance tuning and motion that feels alive.",
  },
  {
    title: "Backend Systems",
    code: "02",
    icon: FaServer,
    desc: "Node.js / Express / C# / Python",
    detail: "APIs and services built for scale — clean architecture, reliable contracts.",
  },
  {
    title: "Mobile Protocols",
    code: "03",
    icon: FaMobileAlt,
    desc: "Kotlin / Flutter / Cross-platform",
    detail: "Native-feel experiences across platforms. Fast, smooth, and genuinely usable.",
  },
  {
    title: "Infrastructure",
    code: "04",
    icon: SiLinux,
    desc: "Proxmox / Docker / Linux Virtualization",
    detail: "Self-hosted, containerised, automated. I own the whole stack end-to-end.",
  },
];

// ─────────────────────────────────────────────
// DOMAIN CARD
// ─────────────────────────────────────────────
const DomainCard = ({
  domain,
  index,
  accentColor,
}: {
  domain: typeof domains[0];
  index: number;
  accentColor: string;
}) => {
  const [hovered, setHovered] = useState(false);
  const Icon = domain.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-60px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative p-8 bg-zinc-950/50 backdrop-blur-xl border border-white/[0.06] overflow-hidden cursor-default transition-all duration-500"
      style={{
        borderColor: hovered ? `${accentColor}44` : undefined,
      }}
    >
      {/* hover fill sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: `radial-gradient(ellipse at 0% 0%, ${accentColor}0d 0%, transparent 70%)`,
        }}
      />

      {/* top row */}
      <div className="relative z-10 flex items-start justify-between mb-8">
        <motion.div
          animate={{ color: hovered ? accentColor : '#52525b' }}
          transition={{ duration: 0.3 }}
          className="text-2xl"
        >
          <Icon />
        </motion.div>
        <span
          className="text-[10px] font-black tracking-[0.4em] tabular-nums"
          style={{ color: `${accentColor}55` }}
        >
          {domain.code}
        </span>
      </div>

      {/* title */}
      <h3 className="relative z-10 text-[11px] font-black tracking-[0.28em] text-zinc-500 uppercase mb-3 group-hover:text-zinc-300 transition-colors duration-300">
        {domain.title}
      </h3>

      {/* stack */}
      <p className="relative z-10 text-[13px] text-zinc-400 font-mono leading-relaxed mb-4">
        {domain.desc}
      </p>

      {/* detail — slides in on hover */}
      <motion.p
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
        transition={{ duration: 0.35 }}
        className="relative z-10 text-[12px] text-zinc-500 leading-relaxed"
      >
        {domain.detail}
      </motion.p>

      {/* bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px]"
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: accentColor }}
      />
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// ABOUT ME SECTION
// ─────────────────────────────────────────────
export default function AboutMe() {
  const accentColor = useThemeColor();
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-40 bg-[#050505] overflow-hidden"
    >

      {/* ── BACKGROUND ── */}

      {/* radial blooms */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-[10%] right-[-15%] h-[700px] w-[700px] rounded-full blur-[140px]"
          style={{ background: accentColor, opacity: 0.05 }}
        />
        <div
          className="absolute bottom-[-5%] left-[-10%] h-[500px] w-[500px] rounded-full blur-[120px]"
          style={{ background: '#00d2ff', opacity: 0.04 }}
        />
      </div>

      {/* SVG grid */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.04 }}
      >
        <defs>
          <pattern id="about-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke={accentColor} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#about-grid)" />
      </svg>

      {/* 3-D shard */}
      <motion.div
        style={{ y: prefersReducedMotion ? '0%' : bgY }}
        className="absolute inset-0 z-0 opacity-50 pointer-events-none"
      >
        <ShardScene color={accentColor} />
      </motion.div>

      {/* noise */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-14">

        {/* ── SECTION LABEL ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-20"
        >
          <div className="h-[1px] w-10" style={{ background: accentColor }} />
          <span className="text-[10px] tracking-[0.45em] text-zinc-500 uppercase font-bold">
            Identity Overview
          </span>
        </motion.div>

        {/* ── HEADLINE BLOCK ── */}
        <div className="mb-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-end">

          {/* big headline */}
          <div className="md:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="text-[3.2rem] sm:text-[4.5rem] md:text-[6rem] font-black leading-[0.88] tracking-[-0.03em] text-white uppercase"
            >
              Engineering
              <br />
              <span
                className="block"
                style={{ WebkitTextStroke: `2px ${accentColor}`, color: 'transparent' }}
              >
                at the
              </span>
              <span className="block text-white">Systems</span>
              <span
                className="block italic font-black"
                style={{ color: accentColor }}
              >
                Level.
              </span>
            </motion.h2>
          </div>

          {/* right: bio + pull quote */}
          <div className="md:col-span-5 space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              viewport={{ once: true }}
              className="text-zinc-400 text-base font-light leading-relaxed"
            >
              Architecting scalable digital products with a strong focus on performance,
              modularity, and visual precision. I build systems designed to evolve,
              adapt, and solve real-world consumer challenges.
            </motion.p>

            {/* pull quote */}
            <motion.blockquote
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              viewport={{ once: true }}
              className="border-l-2 pl-5 text-sm text-zinc-500 italic leading-relaxed"
              style={{ borderColor: accentColor }}
            >
              &quot;I don&apos;t just ship features — I build the foundation that makes everything else possible.&quot;
            </motion.blockquote>
          </div>
        </div>

        {/* ── DOMAIN CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04]">
          {domains.map((domain, i) => (
            <div key={i} className="bg-[#050505]">
              <DomainCard domain={domain} index={i} accentColor={accentColor} />
            </div>
          ))}
        </div>

        {/* ── FOOTER METADATA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 pt-12 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* location */}
          <div className="flex items-center gap-4">
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: accentColor }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: accentColor }}
              />
            </span>
            <span className="text-[11px] tracking-[0.35em] uppercase font-mono text-zinc-400">
              Nairobi&nbsp;//&nbsp;Kenya
            </span>
          </div>

          {/* stack signature */}
          <div className="flex items-center gap-3">
            {['TS', 'Node', 'C#', 'Next.js', 'Docker'].map((t, i) => (
              <span
                key={i}
                className="text-[10px] tracking-[0.2em] uppercase font-bold px-3 py-1.5 border border-white/[0.07] text-zinc-500"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}