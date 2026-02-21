/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// --- 1) CRYSTAL ---
const CrystalObject = ({ color, detail = 12 }: { color: string; detail?: number }) => {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.15;
    mesh.current.rotation.x = t * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={mesh} scale={2.2}>
        <icosahedronGeometry args={[1, detail]} />
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.3}
          radius={1}
          metalness={0.9}
          roughness={0.12}
          emissive={color}
          emissiveIntensity={0.18}
        />
      </mesh>
    </Float>
  );
};

const Scene = ({
  color,
  lowPower = false,
}: {
  color: string;
  lowPower?: boolean;
}) => {
  return (
    <Canvas
      dpr={lowPower ? 1 : [1, 1.5]}
      gl={{ antialias: !lowPower, powerPreference: 'high-performance', alpha: true }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.25} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#00d2ff" />
      <pointLight position={[-10, -10, -10]} intensity={1.2} color={color} />
      <spotLight position={[0, 6, 2]} intensity={1.6} />

      <Suspense fallback={null}>
        <CrystalObject color={color} detail={lowPower ? 6 : 14} />
      </Suspense>
    </Canvas>
  );
};

// --- 2) HERO ---
export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const [themeColor, setThemeColor] = useState('#f8fafc');

  // simple low-power heuristic (mobile / small screens)
  const [lowPower, setLowPower] = useState(false);

  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 160]);
  const opacityText = useTransform(scrollY, [0, 320], [1, 0]);
  const scaleCrystal = useTransform(scrollY, [0, 600], [1, 1.25]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setThemeColor('#e0f2fe');      // Ice Blue
    else if (hour < 18) setThemeColor('#f8fafc'); // Arctic White
    else setThemeColor('#818cf8');                // Twilight Indigo
  }, []);

  useEffect(() => {
    const onResize = () => setLowPower(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const bgClass = 'bg-[#050505]';

  const headlineMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, filter: 'blur(12px)' },
        animate: { opacity: 1, filter: 'blur(0px)' },
        transition: { duration: 1.1, delay: 0.15 },
      };

  return (
    <section className={`relative w-full min-h-screen overflow-hidden ${bgClass}`}>
      {/* subtle radial tint */}
      <div className="absolute inset-0 z-[0] pointer-events-none">
        <div className="absolute -top-40 left-1/2 h-[680px] w-[680px] -translate-x-1/2 rounded-full blur-3xl opacity-20"
             style={{ background: themeColor }} />
      </div>

      {/* grain */}
      <div className="absolute inset-0 z-[1] opacity-[0.035] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* 3D */}
      <motion.div
        style={{ scale: prefersReducedMotion ? 1 : scaleCrystal }}
        className="absolute inset-0 z-[0] opacity-80"
        aria-hidden="true"
      >
        {/* If reduced motion, still render but lowPower to reduce intensity */}
        <Scene color={themeColor} lowPower={lowPower || !!prefersReducedMotion} />
      </motion.div>

      {/* content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 pt-[16vh] md:pt-[18vh] pb-16">
        <motion.div
          style={{ y: prefersReducedMotion ? 0 : yText, opacity: prefersReducedMotion ? 1 : opacityText }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
        >
          {/* LEFT: text */}
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full" style={{ background: themeColor }} />
              <span className="text-[11px] tracking-[0.28em] text-zinc-300 uppercase">
                Software Engineer • Nairobi, KE
              </span>
            </div>

            <motion.h1
              {...headlineMotion}
              className="mt-6 text-[3.2rem] sm:text-[4rem] md:text-[5.2rem] font-medium text-white tracking-tight leading-[0.95]"
            >
              Joseph <span className="text-white/85">Gitau</span>
            </motion.h1>

            <p className="mt-5 text-base md:text-lg text-zinc-400 max-w-xl leading-relaxed">
              <TypeAnimation
                sequence={[
                  'Building clean, high-performance products.',
                  1800,
                  'Designing systems that scale.',
                  1800,
                  'Shipping modern web & mobile experiences.',
                  1800,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="https://github.com/mfalme0"
                target="_blank"
                className="group inline-flex items-center justify-center px-7 py-4 rounded-full font-medium bg-white text-black transition-transform hover:scale-[1.03] active:scale-[0.99]"
              >
                View GitHub
                <span className="ml-2 opacity-60 group-hover:opacity-100 transition-opacity">↗</span>
              </Link>

              <Link
                href="https://www.linkedin.com/in/josephgitauc/"
                target="_blank"
                className="inline-flex items-center justify-center px-7 py-4 rounded-full font-medium border border-white/15 text-white/90 bg-white/0 backdrop-blur-sm hover:bg-white/5 transition-colors"
              >
                LinkedIn
              </Link>

              {/* optional third action */}
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-7 py-4 rounded-full font-medium text-white/70 hover:text-white transition-colors"
              >
                See Projects ↓
              </a>
            </div>
          </div>

          {/* RIGHT: space for crystal / visual balance */}
          <div className="md:col-span-5 hidden md:block">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
              <div className="text-sm text-zinc-300 font-medium">Currently</div>
              <div className="mt-2 text-zinc-400 text-sm leading-relaxed">
                Shipping projects in <span className="text-white/80">Next.js</span>, <span className="text-white/80">React Native</span>, and backend tooling.
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 text-[12px]">
                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <div className="text-white/80 font-medium">Focus</div>
                  <div className="text-zinc-400 mt-1">UI/UX + Systems</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <div className="text-white/80 font-medium">Stack</div>
                  <div className="text-zinc-400 mt-1">TS • Node • C#</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* scroll indicator */}
        <div className="mt-16 flex items-center gap-4 text-zinc-500">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <span className="text-[10px] tracking-[0.35em] uppercase">Scroll</span>
          <motion.span
            animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="text-white/25"
          >
            ↓
          </motion.span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>
    </section>
  );
}