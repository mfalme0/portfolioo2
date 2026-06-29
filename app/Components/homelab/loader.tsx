'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const GREEN = '#33FF33';
const GREEN_RGB = '51, 255, 51';

const BOOT_LOGS = [
  'Award Modular BIOS v4.51PG, An Energy Star Ally',
  'Copyright (C) 1984-94, Award Software, Inc.',
  '',
  'Intel Pentium III CPU at 800MHz',
  'Memory Test: 65536K OK',
  '',
  'Primary IDE Master  : HP ProDesk 600 G2 MT',
  'Primary IDE Slave   : None',
  'Secondary IDE Master: Lenovo ThinkPad X230',
  '',
  'Starting Linux 2.0.32...',
  'Loading kernel...... done',
  'Uncompressing Linux... done',
  'Booting the kernel.',
  '',
  'hda: 40GB IBM-DTLA-307040 [LBA]',
  'hdc: ATAPI 52X CD-ROM',
  'eth0: Realtek RTL8139 at 0xdc00',
  '',
  'Mounting root filesystem...',
  'Starting syslogd................................ [OK]',
  'Starting crond................................. [OK]',
  'Starting docker daemon......................... [OK]',
  'Starting httpd................................ [OK]',
  '',
  'Debian GNU/Linux 13 (homelab)',
  'homelab login: ',
];

const PHASE_LABELS = {
  post: 'BIOS POST - Testing system...',
  kernel: 'Loading Linux kernel...',
  init: 'Starting system services...',
  ready: 'System ready.',
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function HomelabLoader({ onComplete }: { onComplete: () => void }) {
  const reduceMotion = useReducedMotion();

  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [bootPhase, setBootPhase] = useState<'post' | 'kernel' | 'init' | 'ready'>('post');

  const rafRef = useRef<number | null>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setShowCursor(v => !v), 530);
    return () => clearInterval(id);
  }, [reduceMotion]);

  useEffect(() => {
    doneRef.current = false;
    const start = performance.now();
    const durationMs = 3000;

    const tick = (now: number) => {
      const t = clamp((now - start) / durationMs, 0, 1);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      const wobble = reduceMotion || t > 0.9 ? 0 : Math.sin(t * Math.PI * 2) * 0.6;
      const next = clamp(eased * 100 + wobble, 0, 100);
      setProgress(next);

      const idx = Math.min(BOOT_LOGS.length - 1, Math.floor((next / 100) * BOOT_LOGS.length));
      setLogIndex(idx);

      if (next < 30) setBootPhase('post');
      else if (next < 55) setBootPhase('kernel');
      else if (next < 95) setBootPhase('init');
      else setBootPhase('ready');

      if (t >= 1 && !doneRef.current) {
        doneRef.current = true;
        setProgress(100);
        setBootPhase('ready');
        window.setTimeout(() => onComplete(), reduceMotion ? 150 : 500);
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onComplete, reduceMotion]);

  useEffect(() => {
    const line = BOOT_LOGS[logIndex] ?? '';
    if (logIndex < BOOT_LOGS.length - 1) {
      setTyped(line);
      return;
    }
    if (reduceMotion) { setTyped(line); return; }
    setTyped('');
    let i = 0;
    const id = window.setInterval(() => {
      i += 2;
      setTyped(line.slice(0, i));
      if (i >= line.length) window.clearInterval(id);
    }, 28);
    return () => window.clearInterval(id);
  }, [logIndex, reduceMotion]);

  const displayLogs = useMemo(() => {
    return BOOT_LOGS.slice(0, logIndex + 1);
  }, [logIndex]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={
          reduceMotion
            ? { opacity: 0, transition: { duration: 0.2 } }
            : { opacity: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }
        }
        className="fixed inset-0 z-50 overflow-hidden"
        style={{ backgroundColor: '#000000' }}
      >
        {/* Scanlines - full screen */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7) 50%)',
            backgroundSize: '100% 3px',
            opacity: 0.4,
          }}
        />

        {/* Subtle screen glow */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.5) 100%)',
          }}
        />

        {/* Corner burn / CRT curvature */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            boxShadow: 'inset 0 0 150px rgba(0,0,0,0.7)',
          }}
        />

        {/* Main content area - top aligned like DOS */}
        <div className="relative z-[5] w-full h-full px-4 sm:px-8 py-4 sm:py-6 flex flex-col">
          {/* Status bar line */}
          <div className="flex items-center justify-between pb-1.5 mb-2 border-b shrink-0"
            style={{ borderColor: `rgba(${GREEN_RGB},0.1)` }}
          >
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.1em]"
              style={{ color: `rgba(${GREEN_RGB},0.5)` }}
            >
              <span className="inline-flex h-2 w-2 rounded-full"
                style={{
                  backgroundColor: bootPhase === 'ready' ? GREEN : `rgba(${GREEN_RGB},0.3)`,
                  boxShadow: bootPhase === 'ready' ? `0 0 8px ${GREEN}` : 'none',
                }}
              />
              {PHASE_LABELS[bootPhase]}
            </div>
            <div className="text-[9px] sm:text-[10px] tabular-nums" style={{ color: `rgba(${GREEN_RGB},0.3)` }}>
              [{Math.round(progress)}%]
            </div>
          </div>

          {/* Boot log - fills remaining space */}
          <div className="flex-1 overflow-hidden">
            <div className="font-mono text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed"
              style={{ color: GREEN }}
            >
              {displayLogs.map((line, i) => {
                const isLast = i === displayLogs.length - 1;
                const isLoginLine = line.startsWith('homelab login:');
                const dim = i < displayLogs.length - 3 ? `rgba(${GREEN_RGB},0.35)` : GREEN;

                if (isLoginLine && isLast) {
                  return (
                    <div key={i} className="flex items-center" style={{ color: GREEN }}>
                      <span>homelab login: </span>
                      <span className="relative">
                        {typed.replace('homelab login: ', '')}
                        <span
                          className="inline-block w-[7px] h-[14px] sm:w-[8px] sm:h-[16px] ml-0.5 align-middle"
                          style={{
                            backgroundColor: showCursor ? GREEN : 'transparent',
                            boxShadow: showCursor ? `0 0 6px ${GREEN}` : 'none',
                          }}
                        />
                      </span>
                    </div>
                  );
                }

                if (line === '') {
                  return <div key={i} className="h-[0.6em]" />;
                }

                if (isLast) {
                  return (
                    <div key={i} className="flex items-center" style={{ color: dim }}>
                      <span>{line}</span>
                      {!reduceMotion && (
                        <span
                          className="inline-block w-[7px] h-[14px] sm:w-[8px] sm:h-[16px] ml-0.5 align-middle animate-pulse"
                          style={{ backgroundColor: GREEN }}
                        />
                      )}
                    </div>
                  );
                }

                return (
                  <div key={i}
                    style={{
                      color: dim,
                      opacity: i < displayLogs.length - 8 ? 0.5 : 1,
                    }}
                  >
                    {line}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between pt-1.5 mt-2 border-t shrink-0"
            style={{ borderColor: `rgba(${GREEN_RGB},0.08)` }}
          >
            <div className="flex items-center gap-3 text-[8px] sm:text-[9px] uppercase tracking-[0.15em]"
              style={{ color: `rgba(${GREEN_RGB},0.25)` }}
            >
              <span>HDD: ACTIVE</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">RAM: 65536K</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">CPU: PIII 800MHz</span>
            </div>
            <div className="flex items-center gap-2 text-[8px] sm:text-[9px] uppercase tracking-[0.15em]"
              style={{ color: `rgba(${GREEN_RGB},0.25)` }}
            >
              <span className="inline-flex items-center gap-1">
                <span className="inline-flex h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: bootPhase === 'ready' ? GREEN : `rgba(${GREEN_RGB},0.2)`,
                    boxShadow: bootPhase === 'ready' ? `0 0 6px ${GREEN}` : 'none',
                  }}
                />
                POWER
              </span>
              <span className="mx-1">|</span>
              <button
                type="button"
                onClick={() => {
                  if (doneRef.current) return;
                  doneRef.current = true;
                  setProgress(100);
                  onComplete();
                }}
                className="hover:text-white transition-colors"
                style={{ color: `rgba(${GREEN_RGB},0.3)` }}
              >
                SKIP &gt;
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
