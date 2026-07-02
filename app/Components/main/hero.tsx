'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '../../Context/theme';
import { usePerformance } from '../../Context/performance';
import CountUp from '../count-up';

const roles = [
  'Full-Stack Engineer',
  'Systems Architect',
  'React Native Developer',
  'DevOps & Infrastructure',
];

function TypewriterLine() {
  const [index, setIndex] = useState(0);
  const [char, setChar] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    const timer = setTimeout(() => {
      if (!deleting) {
        if (char < current.length) setChar(char + 1);
        else setTimeout(() => setDeleting(true), 2000);
      } else {
        if (char > 0) setChar(char - 1);
        else { setDeleting(false); setIndex((index + 1) % roles.length); }
      }
    }, deleting ? 20 : 40);
    return () => clearTimeout(timer);
  }, [char, deleting, index]);

  return (
    <span className="relative">
      <span>{roles[index].substring(0, char)}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
        className="ml-px font-light"
        style={{ color: 'var(--color-accent)' }}
      >|</motion.span>
    </span>
  );
}

const stats = [
  { value: 3, label: 'Years Engineering', suffix: '+' },
  { value: 20, label: 'Projects Shipped', suffix: '+' },
  { value: null, label: 'End-to-End Delivery', suffix: '', text: 'Full Stack' },
];

export function Hero({ onNavigate }: { onNavigate?: (index: number) => void }) {
  const { accent } = useTheme();
  const { reducedEffects } = usePerformance();
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-background"
      id="hero"
    >
      <div className="rog-hex-grid" />
      <div className="rog-scanline" />

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={reducedEffects ? {} : {
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-15%] right-[-5%] h-[700px] w-[700px] rounded-full"
          style={{ background: accent, opacity: 0.06, filter: 'blur(250px)' }}
        />
        <motion.div
          animate={reducedEffects ? {} : {
            y: [0, 20, 0],
            x: [0, -15, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full"
          style={{ background: accent, opacity: 0.04, filter: 'blur(200px)' }}
        />
        <motion.div
          animate={reducedEffects ? {} : {
            y: [0, 15, 0],
            x: [0, 10, 0],
            scale: [1, 1.03, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[40%] left-[20%] h-[300px] w-[300px] rounded-full"
          style={{ background: accent, opacity: 0.03, filter: 'blur(150px)' }}
        />
      </div>

      <motion.div className="relative z-10 mx-auto max-w-7xl px-8 md:px-14 pt-[16vh] md:pt-[18vh]">
        <div className="max-w-full">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,9vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.04em]"
            style={{ color: 'var(--color-foreground)' }}
          >
            Joseph<br />
            <span
              className="relative"
              style={{ color: accent }}
            >
              Gitau
              <span
                className="absolute -bottom-[2px] left-0 right-0 h-[3px] rounded-full"
                style={{ background: `linear-gradient(90deg, ${accent}, ${accent}40, transparent)` }}
              />
            </span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 max-w-2xl"
        >
          <div className="flex items-center gap-4 mb-4">
            <div
              className="h-[1px] flex-1"
              style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
            />
            <span className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
              <TypewriterLine />
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            I architect and ship production-grade software across the full stack —
            from React and Next.js frontends to C# and Node.js backends,
            containerised with Docker and deployed on Linux.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 grid grid-cols-3 gap-8 md:gap-16 max-w-lg"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col"
            >
              <span className="rog-spec-value mb-1">
                {s.value !== null ? <CountUp value={s.value} suffix={s.suffix} /> : s.text}
              </span>
              <span className="rog-spec-label">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-col sm:flex-row gap-4 items-start"
        >
          <button
            onClick={() => onNavigate?.(5)}
            className="rog-btn-primary group relative overflow-hidden rounded-xl px-7 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="relative flex items-center gap-2">
              View My Work
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </button>
          <Link
            href="https://github.com/mfalme0"
            target="_blank"
            className="rog-btn-secondary group relative overflow-hidden rounded-xl border border-(--color-border) px-7 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/josephgitauc/"
            target="_blank"
            className="rog-btn-secondary group relative overflow-hidden rounded-xl border border-(--color-border) px-7 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </span>
          </Link>
          <a
            href="/Joseph_Chege.pdf"
            target="_blank"
            className="rog-btn-secondary group relative overflow-hidden rounded-xl border border-(--color-border) px-7 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Resume
            </span>
          </a>
        </motion.div>



        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 right-8 md:right-14 hidden md:block"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-[1px]"
              style={{ background: `linear-gradient(90deg, ${accent}60, transparent)` }}
            />
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: `${accent}60` }}>
              Est. 2023
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
