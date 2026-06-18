'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../../Context/theme';
import { usePerformance } from '../../Context/performance';

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
  { value: '3+', label: 'Years Engineering' },
  { value: '20+', label: 'Projects Shipped' },
  { value: 'Full Stack', label: 'End-to-End Delivery' },
];

export function Hero() {
  const { accent } = useTheme();
  const { reducedEffects } = usePerformance();
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 800], [0, -80]);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-background"
      id="hero"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-15%] right-[-5%] h-[700px] w-[700px] rounded-full blur-[250px] transition-all duration-1000"
          style={{ background: accent, opacity: 0.04 }}
        />
        <div
          className="absolute bottom-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full blur-[200px] transition-all duration-1000"
          style={{ background: accent, opacity: 0.025 }}
        />
      </div>

      <motion.div style={{ y: reducedEffects ? 0 : heroParallax }} className="relative z-10 mx-auto max-w-7xl px-8 md:px-14 pt-[20vh] md:pt-[22vh]">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-14"
          style={{
            backgroundColor: `${accent}0d`,
            border: `1px solid ${accent}20`,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: accent }}
          />
          <span
            className="text-[10px] font-semibold tracking-[0.1em] uppercase"
            style={{ color: `${accent}cc` }}
          >
            Available for Projects
          </span>
        </motion.div>

        {/* Main headline */}
        <div className="max-w-[90%] md:max-w-[75%]">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="apple-eyebrow-accent mb-4"
          >
            Joseph Gitau
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="apple-heading-xl mb-5 leading-[0.95]"
          >
            Building Systems<br />
            <span
              className="font-semibold"
              style={{ color: accent }}
            >that Deliver.</span>
          </motion.h1>
        </div>

        {/* Typewriter + description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-6" style={{ backgroundColor: accent }} />
            <span className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
              <TypewriterLine />
            </span>
          </div>
          <p className="apple-body text-sm">
            I architect and ship production-grade software across the full stack —
            from React and Next.js frontends to C# and Node.js backends,
            containerised with Docker and deployed on Linux.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex gap-12 md:gap-20"
        >
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-xl md:text-2xl font-semibold tabular-nums leading-none" style={{ color: accent }}>
                {s.value}
              </span>
              <span className="text-[10px] tracking-[0.1em] font-medium uppercase" style={{ color: 'var(--color-muted)' }}>
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-col sm:flex-row gap-4 items-start"
        >
          <Link
            href="#projects"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-semibold tracking-[0.01em] transition-all duration-300 hover:opacity-85 active:scale-[0.97]"
            style={{
              backgroundColor: accent,
              color: '#ffffff',
            }}
          >
            View My Work
            <svg className="ml-2 w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <Link
            href="https://github.com/mfalme0"
            target="_blank"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-medium border transition-all duration-300 hover:opacity-60 active:scale-[0.97]"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-foreground)',
            }}
          >
            GitHub
            <svg className="ml-2 w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
          </Link>
          <Link
            href="https://www.linkedin.com/in/josephgitauc/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-medium transition-all duration-300 hover:opacity-60"
            style={{ color: 'var(--color-muted)' }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] font-medium tracking-[0.15em] uppercase" style={{ color: 'var(--color-muted)' }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1px] h-6"
            style={{ backgroundColor: 'var(--color-muted)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
