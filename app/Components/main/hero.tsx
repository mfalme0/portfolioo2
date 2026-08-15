'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../Context/theme';
import { usePerformance } from '../../Context/performance';
import CountUp from '../count-up';
import Link from 'next/link';
import { homelabItems } from '@/lib/homelab-data';

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
        className="ml-px"
        style={{ color: 'var(--color-accent)' }}
      >|</motion.span>
    </span>
  );
}

function useTick() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

const clock = (d: Date) =>
  d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

export function Hero() {
  const { accent } = useTheme();
  const { reducedEffects } = usePerformance();
  const [mounted, setMounted] = useState(false);
  const now = useTick();

  useEffect(() => { setMounted(true); }, []);

  const board = useMemo(() => {
    const all = homelabItems.flatMap((item) => item.services.map((s) => ({ ...s, node: item.name })));
    const online = all.filter((s) => s.status === 'active').length;
    const nodes = homelabItems.filter((i) => i.status === 'active').length;
    return { total: all.length, online, nodes };
  }, []);

  if (!mounted) return null;

  return (
    <section
      className="relative w-full h-full min-h-dvh flex flex-col overflow-hidden section-grid"
      id="hero"
      style={{ backgroundColor: 'var(--paper)' }}
    >
      {/* Masthead rules */}
      <div className="absolute inset-y-0 left-6 md:left-14 w-px pointer-events-none" style={{ background: 'color-mix(in srgb, var(--ink) 8%, transparent)' }} />
      <div className="absolute inset-y-0 right-6 md:right-14 w-px pointer-events-none" style={{ background: 'color-mix(in srgb, var(--ink) 8%, transparent)' }} />

      {/* Survey-flag corner tag */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[52px] border-l-[52px] border-t-(--color-flag) border-l-transparent" style={{ borderTopWidth: 52, borderLeftWidth: 52 }} />

      {/* Soft flag wash */}
      {!reducedEffects && (
        <div className="absolute -top-1/3 right-[-10%] h-[80vh] w-[60vw] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, color-mix(in srgb, var(--flag) 10%, transparent) 0%, transparent 70%)' }} />
      )}

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col mx-auto max-w-7xl w-full px-6 md:px-14">
        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between pt-6 md:pt-8 pb-4 md:pb-6 border-b"
          style={{ borderColor: 'var(--rule)' }}
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase" style={{ color: 'var(--color-muted)' }}>
              Field Report &middot; 2026 &middot; Nairobi, Kenya
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a
              href="mailto:josephgitauc@gmail.com"
              className="text-[10px] font-mono font-medium tracking-[0.08em] transition-all duration-300 hover:opacity-60"
              style={{ color: 'var(--color-muted)' }}
            >
              joseph.gitau.c@gmail.com
            </a>
            <span className="h-3 w-px" style={{ background: 'var(--rule)' }} />
            <span className="text-[10px] font-mono font-semibold tracking-[0.08em]" style={{ color: accent }}>
              +254 799 148 737
            </span>
          </div>
        </motion.div>

        {/* Center grid */}
        <div className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-10 items-center py-8">
          {/* Left: Masthead */}
          <div className="lg:col-span-7 w-full flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 flex items-center gap-3"
            >
              <span className="text-[9px] font-mono font-bold tracking-[0.25em] uppercase px-2 py-1" style={{ color: 'var(--color-accent)', border: '1px solid color-mix(in srgb, var(--flag) 35%, transparent)' }}>
                Op 2026
              </span>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: 'var(--color-muted)' }}>
                Compiled by J. Gitau Chege
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.9rem,8vw,6.4rem)] leading-[0.95] tracking-[-0.02em] font-display"
              style={{ color: 'var(--color-foreground)' }}
            >
              Systems that
              <br />
              <span className="font-display-italic" style={{ color: accent }}>
                stay up.
                <span
                  className="block -mt-1 h-[4px] md:h-[5px]"
                  style={{ background: 'repeating-linear-gradient(90deg, var(--flag) 0 6px, transparent 6px 12px)' }}
                />
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 flex items-center gap-3"
            >
              <div className="h-[1px] w-10" style={{ background: 'var(--flag)' }} />
              <span className="text-sm font-mono font-medium tracking-[0.1em]" style={{ color: 'var(--color-foreground)' }}>
                <TypewriterLine />
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-sm md:text-[15px] leading-relaxed max-w-xl"
              style={{ color: 'var(--color-muted)' }}
            >
              Field engineer for production backend systems in C#, Python, JavaScript/TypeScript, and C++.
              Notification &amp; messaging platforms, authentication flows, and cloud infrastructure — holding 99.9% uptime on mission-critical services from Nairobi.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 flex flex-wrap gap-3"
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="rog-btn-primary relative overflow-hidden rounded-[2px] px-5 py-2.5 text-[11px] font-bold uppercase font-mono"
              >
                <span className="relative flex items-center gap-2">
                  Open Works Ledger
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </span>
              </button>
              <a
                href="https://github.com/mfalme0"
                target="_blank"
                rel="noopener noreferrer"
                className="rog-btn-secondary group relative overflow-hidden rounded-[2px] px-5 py-2.5 text-[11px] font-bold uppercase inline-flex font-mono"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </span>
              </a>
              <a
                href="/Joseph_Chege.pdf"
                target="_blank"
                className="rog-btn-secondary group relative overflow-hidden rounded-[2px] px-5 py-2.5 text-[11px] font-bold uppercase inline-flex font-mono"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Field Notes
                </span>
              </a>
            </motion.div>
          </div>

          {/* Right: Service Status Board */}
          <div className="lg:col-span-5 w-full">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="relative rounded-[4px] border p-5 md:p-6"
                style={{
                  backgroundColor: 'var(--sheet)',
                  borderColor: 'var(--rule)',
                  boxShadow: '4px 4px 0 0 color-mix(in srgb, var(--rule-strong) 45%, transparent)',
                }}
              >
                {/* Board header */}
                <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--rule)' }}>
                  <span className="text-[9px] font-mono font-bold tracking-[0.22em] uppercase" style={{ color: 'var(--color-foreground)' }}>
                    Service Status
                  </span>
                  <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold tracking-[0.18em] uppercase" style={{ color: 'var(--bush)' }}>
                    <motion.span
                      animate={reducedEffects ? {} : { opacity: [1, 0.25, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: 'var(--bush)' }}
                    />
                    Live
                  </span>
                </div>

                {/* Ink stamp */}
                <div className="flex justify-center py-5">
                  <motion.div
                    initial={{ scale: 1.6, opacity: 0, rotate: -18 }}
                    animate={{ scale: 1, opacity: 1, rotate: -6 }}
                    transition={reducedEffects
                      ? { duration: 0.2 }
                      : { type: 'spring', stiffness: 380, damping: 18, delay: 0.6 }}
                    className="rounded-[3px] border-2 px-3 py-1.5"
                    style={{
                      borderColor: 'var(--bush)',
                      color: 'var(--bush)',
                      boxShadow: '0 0 0 3px var(--sheet), 0 0 0 4px color-mix(in srgb, var(--bush) 60%, transparent)',
                    }}
                  >
                    <span className="text-[13px] font-mono font-bold tracking-[0.18em] uppercase whitespace-nowrap">
                      All Systems Operational
                    </span>
                  </motion.div>
                </div>

                {/* Aggregate row */}
                <div className="grid grid-cols-3 gap-2 pb-4">
                  <div className="rounded-[3px] border p-2.5" style={{ borderColor: 'var(--rule)', background: 'var(--sheet-2)' }}>
                    <div className="text-[8px] font-mono tracking-[0.18em] uppercase mb-1" style={{ color: 'var(--color-muted)' }}>
                      Services
                    </div>
                    <div className="text-xl font-bold leading-none font-display" style={{ color: 'var(--bush)' }}>
                      <CountUp value={board.total} />
                    </div>
                  </div>
                  <div className="rounded-[3px] border p-2.5" style={{ borderColor: 'var(--rule)', background: 'var(--sheet-2)' }}>
                    <div className="text-[8px] font-mono tracking-[0.18em] uppercase mb-1" style={{ color: 'var(--color-muted)' }}>
                      Online
                    </div>
                    <div className="text-xl font-bold leading-none font-display" style={{ color: 'var(--bush)' }}>
                      <CountUp value={board.online} />
                    </div>
                  </div>
                  <div className="rounded-[3px] border p-2.5" style={{ borderColor: 'var(--rule)', background: 'var(--sheet-2)' }}>
                    <div className="text-[8px] font-mono tracking-[0.18em] uppercase mb-1" style={{ color: 'var(--color-muted)' }}>
                      Nodes
                    </div>
                    <div className="text-xl font-bold leading-none font-display" style={{ color: 'var(--water)' }}>
                      <CountUp value={board.nodes} />
                    </div>
                  </div>
                </div>

                {/* Node rows */}
                <div className="space-y-1.5 pb-4">
                  {homelabItems.filter((i) => i.status === 'active').map((item) => (
                    <div key={item.slug} className="flex items-center justify-between gap-2 text-[11px] font-mono">
                      <span className="flex items-center gap-2 truncate" style={{ color: 'var(--color-foreground)' }}>
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--bush)' }} />
                        {item.name.toUpperCase()}
                      </span>
                      <span className="truncate" style={{ color: 'var(--color-muted)' }}>
                        {item.services.filter((s) => s.status === 'active').length} SERVICES
                      </span>
                    </div>
                  ))}
                </div>

                {/* Board footer */}
                <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--rule)' }}>
                  <span className="text-[9px] font-mono tracking-[0.12em] uppercase" style={{ color: 'var(--color-muted)' }}>
                    Last checked {clock(now)} EAT
                  </span>
                  <Link
                    href="/homelab"
                    className="text-[9px] font-mono font-bold tracking-[0.14em] uppercase hover:opacity-60 transition-opacity"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    Inspect rack &rarr;
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Mobile contact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="lg:hidden mt-4 flex items-center justify-center gap-2 text-[9px] font-mono tracking-[0.08em] flex-wrap"
              style={{ color: 'var(--color-muted)' }}
            >
              <span>joseph.gitau.c@gmail.com</span>
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: `${accent}40` }} />
              <span style={{ color: accent }}>+254 799 148 737</span>
            </motion.div>
          </div>
        </div>

        {/* Bottom ledger strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex items-center justify-between py-3 border-t"
          style={{ borderColor: 'var(--rule)' }}
        >
          <span className="text-[9px] font-mono tracking-[0.16em] uppercase" style={{ color: 'var(--color-muted)' }}>
            34 services &middot; 99.9% uptime &middot; Nairobi GMT+3
          </span>
        </motion.div>
      </div>
    </section>
  );
}
