'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '../../Context/theme';
import { usePerformance } from '../../Context/performance';
import CountUp from '../count-up';

const titles = [
  'Software Engineer',
  'Backend Systems',
  'Identity & Notification',
  'Cloud Reliability',
];

function TypewriterLine() {
  const [index, setIndex] = useState(0);
  const [char, setChar] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = titles[index];
    const timer = setTimeout(() => {
      if (!deleting) {
        if (char < current.length) setChar(char + 1);
        else setTimeout(() => setDeleting(true), 2000);
      } else {
        if (char > 0) setChar(char - 1);
        else { setDeleting(false); setIndex((index + 1) % titles.length); }
      }
    }, deleting ? 20 : 40);
    return () => clearTimeout(timer);
  }, [char, deleting, index]);

  return (
    <span className="relative">
      <span>{titles[index].substring(0, char)}</span>
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
  { value: null, label: 'Systems Thinking', suffix: '', text: 'Full Stack' },
  { value: 99.9, label: 'Uptime Delivered', suffix: '%' },
];

export function Hero({ onNavigate }: { onNavigate?: (index: number) => void }) {
  const { accent } = useTheme();
  const { reducedEffects } = usePerformance();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <section className="relative w-full h-full min-h-dvh flex flex-col bg-background overflow-hidden" id="hero">
      <div className="rog-hex-grid" />
      <div className="rog-scanline" />

      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={reducedEffects ? {} : { y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-10%] right-[-5%] h-[800px] w-[800px] rounded-full"
          style={{ background: accent, opacity: 0.06, filter: 'blur(300px)' }}
        />
        <motion.div
          animate={reducedEffects ? {} : { y: [0, 20, 0], x: [0, -15, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-10%] left-[-5%] h-[600px] w-[600px] rounded-full"
          style={{ background: accent, opacity: 0.04, filter: 'blur(250px)' }}
        />
      </div>

      {/* Content - fills the full height */}
      <div className="relative z-10 flex-1 flex flex-col mx-auto max-w-7xl w-full px-8 md:px-14">
        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between pt-6 md:pt-8 pb-4 md:pb-6"
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase" style={{ color: 'var(--color-muted)' }}>
              Nairobi, Kenya
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a
              href="mailto:josephgitauc@gmail.com"
              className="text-[10px] font-medium tracking-[0.1em] transition-all duration-300 hover:opacity-60"
              style={{ color: 'var(--color-muted)' }}
            >
              joseph.gitau.c@gmail.com
            </a>
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: `${accent}40` }} />
            <span className="text-[10px] font-medium tracking-[0.1em]" style={{ color: accent }}>
              +254 799 148 737
            </span>
          </div>
        </motion.div>

        {/* Center grid - grows to fill space */}
        <div className="flex-1 flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-10 items-center">
          {/* Left: Name + Typewriter + Summary + CTAs */}
          <div className="md:col-span-7 w-full flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.8rem,9vw,7rem)] font-extrabold leading-[0.88] tracking-[-0.04em]"
              style={{ color: 'var(--color-foreground)' }}
            >
              Joseph{' '}
              <span className="relative" style={{ color: accent }}>
                Gitau Chege
                <span
                  className="absolute -bottom-[3px] left-0 right-0 h-[3px] md:h-[4px] rounded-full"
                  style={{ background: `linear-gradient(90deg, ${accent}, ${accent}40, transparent)` }}
                />
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 md:mt-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-[1px] w-10" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
                <span className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
                  <TypewriterLine />
                </span>
              </div>
              <p className="text-sm leading-relaxed max-w-lg" style={{ color: 'var(--color-muted)' }}>
                3+ years building and operating production backend systems at scale in C#, Python, JavaScript/TypeScript, and C++.
                Specialised in notification & messaging platforms, authentication flows, and cloud infrastructure — delivering 99.9% uptime on mission-critical services.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 md:mt-7 flex flex-wrap gap-2.5"
            >
              <button
                onClick={() => onNavigate?.(3)}
                className="rog-btn-primary group relative overflow-hidden rounded-xl px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative flex items-center gap-2">
                  View Projects
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </button>
              <Link
                href="https://github.com/mfalme0"
                target="_blank"
                className="rog-btn-secondary group relative overflow-hidden rounded-xl border border-(--color-border) px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/josephgitauc/"
                target="_blank"
                className="rog-btn-secondary group relative overflow-hidden rounded-xl border border-(--color-border) px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </span>
              </Link>
              <a
                href="/Joseph_Chege.pdf"
                target="_blank"
                className="rog-btn-secondary group relative overflow-hidden rounded-xl border border-(--color-border) px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Resume
                </span>
              </a>
            </motion.div>
          </div>

          {/* Right: Stats */}
          <div className="md:col-span-4 md:col-start-9 w-full">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="rounded-2xl p-5 md:p-7 border"
                style={{
                  backgroundColor: 'rgb(var(--accent-rgb) / 0.03)',
                  borderColor: 'rgb(var(--accent-rgb) / 0.1)',
                }}
              >
                <span className="text-[8px] font-bold tracking-[0.25em] uppercase mb-4 block" style={{ color: `${accent}80` }}>
                  Impact
                </span>
                <div className="space-y-5">
                  {stats.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                      className="flex items-center justify-between gap-3"
                    >
                      <span className="text-[clamp(1.6rem,2.5vw,2.5rem)] font-extrabold tracking-tight leading-none" style={{ color: accent }}>
                        {s.value !== null ? <CountUp value={s.value} suffix={s.suffix} /> : s.text}
                      </span>
                      <span className="text-[10px] font-medium tracking-[0.05em] text-right leading-snug max-w-28" style={{ color: 'var(--color-muted)' }}>
                        {s.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgb(var(--accent-rgb) / 0.1)' }}>
                  <span className="text-[8px] font-medium tracking-[0.1em]" style={{ color: 'var(--color-muted)' }}>
                    Full-stack · Cloud-native · Production-grade
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Mobile contact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="md:hidden mt-3 flex items-center justify-center gap-2 text-[8px] font-medium tracking-[0.1em] flex-wrap"
              style={{ color: 'var(--color-muted)' }}
            >
              <span>joseph.gitau.c@gmail.com</span>
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: `${accent}40` }} />
              <span style={{ color: accent }}>+254 799 148 737</span>
            </motion.div>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex items-center justify-center py-4 md:py-5"
        >
          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-[7px] font-medium tracking-[0.2em] uppercase" style={{ color: `${accent}50` }}>
              Scroll
            </span>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" style={{ opacity: 0.4 }}>
              <path d="M2 3l2 2 2-2" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
