'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../Context/theme';

type Phase = 'hype' | 'crash' | 'restart' | 'crt' | 'done';

const HITS = [
  { text: 'BACKEND', sub: 'C# · Python · TS', color: '#FF0080' },
  { text: 'CLOUD', sub: 'Azure · Docker · K8s', color: '#00DFD6' },
  { text: 'IDENTITY', sub: 'Auth · Notifications', color: '#E8A33D' },
  { text: 'RELIABILITY', sub: '99.9% Uptime', color: '#4a9eff' },
  { text: 'FULL-STACK', sub: 'Systems Thinker', color: '#22c55e' },
];

function WhiteFlash({ beat }: { beat: number }) {
  return (
    <AnimatePresence>
      {beat > 0 && (
        <motion.div
          key={beat}
          className="absolute inset-0 z-50 pointer-events-none"
          style={{ backgroundColor: '#fff' }}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.08 }}
        />
      )}
    </AnimatePresence>
  );
}

function SpeedLines() {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[1px]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${30 + Math.random() * 80}px`,
            background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)`,
          }}
          animate={{
            x: [0, 200 + Math.random() * 300],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 0.3 + Math.random() * 0.4,
            repeat: Infinity,
            delay: Math.random() * 0.5,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

function ShakeWrap({ children, active }: { children: React.ReactNode; active: boolean }) {
  return (
    <motion.div
      className="absolute inset-0"
      animate={active ? {
        x: [0, -6, 8, -4, 6, -2, 0],
        y: [0, 4, -6, 2, -4, 1, 0],
        rotate: [0, 0.5, -0.8, 0.3, -0.5, 0.2, 0],
      } : { x: 0, y: 0, rotate: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function SlamText({ text, sub, color, delay }: { text: string; sub: string; color: string; delay: number }) {
  const dir = delay % 2 === 0 ? -1 : 1;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-10"
      initial={{ opacity: 0, x: dir * 200, scale: 0.5, rotate: dir * 5 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: [dir * 200, 0, 0, dir * -150],
        scale: [0.5, 1.15, 1, 0.7],
        rotate: [dir * 5, 0, 0, dir * -3],
      }}
      transition={{
        duration: 1.0,
        delay,
        times: [0, 0.15, 0.5, 1],
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="text-center px-6">
        <span
          className="block text-[clamp(3rem,12vw,7rem)] font-black leading-[0.85] tracking-[-0.05em]"
          style={{
            color,
            textShadow: `0 0 60px ${color}60, 0 0 120px ${color}30, 4px 4px 0 #000`,
          }}
        >
          {text}
        </span>
        <span
          className="block text-[clamp(0.6rem,2vw,1rem)] font-bold tracking-[0.3em] uppercase mt-2"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          {sub}
        </span>
      </div>
    </motion.div>
  );
}

function StaticNoise({ active, intense }: { active: boolean; intense?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let running = true;

    const draw = () => {
      if (!running) return;
      const w = canvas.width, h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const alpha = intense ? 200 : 40;
      for (let i = 0; i < imageData.data.length; i += 4) {
        const v = Math.random() * 255;
        imageData.data[i] = v;
        imageData.data[i + 1] = v;
        imageData.data[i + 2] = v;
        imageData.data[i + 3] = alpha + Math.random() * 50;
      }
      ctx.putImageData(imageData, 0, 0);
      requestAnimationFrame(draw);
    };
    draw();
    return () => { running = false; };
  }, [active, intense]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-30 mix-blend-screen"
      width={160}
      height={90}
      style={{ width: '100%', height: '100%', imageRendering: 'pixelated' }}
    />
  );
}

function ChromaticAberration({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'rgba(255,0,0,0.04)',
          transform: 'translateX(4px)',
          mixBlendMode: 'screen',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'rgba(0,200,255,0.04)',
          transform: 'translateX(-3px)',
          mixBlendMode: 'screen',
        }}
      />
    </>
  );
}

function LoadingBar() {
  return (
    <div className="w-4/5 max-w-sm mx-auto mt-5">
      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(51,255,51,0.1)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: '#33ff33', boxShadow: '0 0 12px rgba(51,255,51,0.5)' }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
      <motion.p
        className="text-[9px] font-mono mt-2 text-center"
        style={{ color: 'rgba(51,255,51,0.4)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        100% — Systems Online
      </motion.p>
    </div>
  );
}

function TerminalBlink({ text }: { text: string }) {
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (chars >= text.length) return;
    const timer = setTimeout(() => setChars((c) => c + 1), 30 + Math.random() * 50);
    return () => clearTimeout(timer);
  }, [chars, text]);

  return (
    <span>
      {text.substring(0, chars)}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.4, repeat: Infinity }}
        style={{ color: '#33ff33' }}
      >_</motion.span>
    </span>
  );
}

export default function VideoShowcase() {
  const { accent } = useTheme();
  const [phase, setPhase] = useState<Phase>('hype');
  const [started, setStarted] = useState(false);
  const [beat, setBeat] = useState(0);
  const [shake, setShake] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const triggerShake = useCallback(() => {
    setShake(true);
    setTimeout(() => setShake(false), 200);
  }, []);

  const start = useCallback(() => {
    setStarted(true);
    setPhase('hype');
    setBeat(0);
  }, []);

  // Beat system
  useEffect(() => {
    if (phase !== 'hype') return;
    const interval = setInterval(() => {
      setBeat((b) => b + 1);
    }, 300);
    return () => clearInterval(interval);
  }, [phase]);

  // Trigger shake on every 2nd beat
  useEffect(() => {
    if (beat > 0 && beat % 2 === 0) triggerShake();
  }, [beat, triggerShake]);

  // Phase progression
  useEffect(() => {
    if (!started) return;
    if (phase === 'hype') {
      const t = setTimeout(() => {
        setPhase('crash');
        triggerShake();
      }, 5000);
      return () => clearTimeout(t);
    }
    if (phase === 'crash') {
      const t = setTimeout(() => setPhase('restart'), 1200);
      return () => clearTimeout(t);
    }
    if (phase === 'restart') {
      const t = setTimeout(() => setPhase('crt'), 2200);
      return () => clearTimeout(t);
    }
    if (phase === 'crt') {
      const t = setTimeout(() => setPhase('done'), 2800);
      return () => clearTimeout(t);
    }
  }, [phase, started, triggerShake]);

  if (!started) {
    return (
      <section className="section-grid relative bg-background vintage-frame h-dvh w-dvw overflow-hidden">
        <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
          <motion.button
            onClick={start}
            className="rog-btn-primary relative overflow-hidden rounded-xl px-10 py-4 text-base font-bold uppercase tracking-widest"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">▶ PLAY REEL</span>
          </motion.button>
          <span className="text-[9px] font-medium tracking-[0.15em] uppercase opacity-40" style={{ color: 'var(--color-muted)' }}>
            the full stack edit
          </span>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="section-grid relative bg-background vintage-frame overflow-hidden h-dvh w-dvw"
    >

      <WhiteFlash beat={beat > 0 && beat % 4 === 0 ? beat : 0} />

      <style>{`
        @keyframes crt-flicker {
          0%, 100% { opacity: 1; }
          3% { opacity: 0.6; }
          5% { opacity: 1; }
          7% { opacity: 0.8; }
          8% { opacity: 1; }
          53% { opacity: 1; }
          54% { opacity: 0.5; }
          55% { opacity: 1; }
        }
        @keyframes scanline-move {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .crt-active {
          animation: crt-flicker 0.12s infinite;
        }
        .crt-active::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.08) 2px,
            rgba(0,0,0,0.08) 3px
          );
          pointer-events: none;
          z-index: 10;
          animation: scanline-move 6s linear infinite;
        }
        .crt-active::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.2) 100%);
          pointer-events: none;
          z-index: 10;
        }
      `}</style>

      {/* ─── HYPE ──────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {phase === 'hype' && (
          <motion.div
            key="hype"
            className="absolute inset-0"
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
            transition={{ duration: 0.15 }}
          >
            <ShakeWrap active={shake}>
              <SpeedLines />

              {HITS.map((hit, i) => (
                <SlamText key={hit.text} {...hit} delay={i * 0.6} />
              ))}

              <div className="absolute inset-0 flex items-center justify-center z-20">
                <motion.div
                  animate={{
                    scale: beat % 2 === 0 ? [1, 1.03, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center px-4">
                    <span
                      className="text-[clamp(2.5rem,9vw,5.5rem)] font-black leading-[0.85] tracking-[-0.04em] block"
                      style={{ color: 'var(--color-foreground)', textShadow: `0 0 80px ${accent}20` }}
                    >
                      Gitau<span style={{ color: accent }}>.vercel.app</span>
                    </span>
                    <motion.span
                      className="block text-[8px] font-bold tracking-[0.3em] uppercase mt-2"
                      style={{ color: `${accent}80` }}
                      animate={{ opacity: [0.2, 0.8, 0.2] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    >
                      Full-Stack Systems
                    </motion.span>
                  </div>
                </motion.div>
              </div>
            </ShakeWrap>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── CRASH ──────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {phase === 'crash' && (
          <motion.div
            key="crash"
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ backgroundColor: '#0000cc' }}
            initial={{ opacity: 0, scale: 1.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <StaticNoise active={true} intense={true} />
            <motion.span
              className="text-[clamp(5rem,18vw,12rem)] font-black leading-none select-none"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              initial={{ y: -50, scale: 2 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ delay: 0.05, duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              :(
            </motion.span>
            <motion.p
              className="text-sm md:text-lg font-mono mt-3 max-w-md text-center px-6 font-bold"
              style={{ color: '#fff' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.2 }}
            >
              FATAL_ERROR
            </motion.p>
            <motion.p
              className="text-[10px] font-mono mt-2 px-4 text-center"
              style={{ color: 'rgba(255,255,255,0.3)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.2 }}
            >
              portfolio_brain_overload.sys
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── RESTART ────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {phase === 'restart' && (
          <motion.div
            key="restart"
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            style={{ backgroundColor: '#000' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="font-mono text-center w-full max-w-md">
              <motion.p
                className="text-sm md:text-base leading-relaxed"
                style={{ color: '#33ff33' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                &gt; <TerminalBlink text="System corrupted. Rebuilding Gitau.vercel.app... [Y/N]?" />
              </motion.p>
              <motion.p
                className="text-sm md:text-base mt-2"
                style={{ color: '#33ff33' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                &gt; Y
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
              >
                <LoadingBar />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── CRT ────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {phase === 'crt' && (
          <motion.div
            key="crt"
            className="absolute inset-0 crt-active flex flex-col items-center justify-center px-8"
            style={{ backgroundColor: 'var(--bg)' }}
            initial={{ opacity: 0, scale: 1.25, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <StaticNoise active={true} />
            <ChromaticAberration active={true} />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span
                className="text-[clamp(2.5rem,8vw,5rem)] font-black tracking-[-0.03em] text-center block leading-[0.9]"
                style={{
                  color: 'var(--color-foreground)',
                  textShadow: `0 0 60px ${accent}30, 0 0 120px ${accent}10`,
                }}
              >
                Joseph{' '}
                <span style={{ color: accent }}>Gitau</span>
              </span>
            </motion.div>

            <motion.p
              className="text-[10px] md:text-sm font-medium tracking-[0.15em] uppercase mt-3 text-center"
              style={{ color: 'var(--color-muted)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              Backend · Cloud · Identity · Systems
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-2 justify-center mt-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              {['C#', 'Python', 'TypeScript', 'Azure', 'Docker', 'K8s'].map((t) => (
                <span
                  key={t}
                  className="text-[7px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase"
                  style={{
                    backgroundColor: `${accent}10`,
                    color: accent,
                    border: `1px solid ${accent}20`,
                  }}
                >
                  {t}
                </span>
              ))}
            </motion.div>

            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
            >
              <span
                className="text-xs font-bold tracking-[0.2em] uppercase"
                style={{ color: accent, textShadow: `0 0 20px ${accent}40` }}
              >
                gitau.vercel.app
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── DONE ────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {phase === 'done' && (
          <motion.div
            key="done"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span
              className="text-[clamp(2rem,7vw,4rem)] font-black tracking-[-0.03em] text-center leading-[0.9]"
              style={{ color: 'var(--color-foreground)' }}
            >
              Gitau<span style={{ color: accent }}>.vercel.app</span>
            </span>
            <span className="text-[9px] font-bold tracking-[0.25em] uppercase" style={{ color: accent }}>
              Full-Stack Engineer · Nairobi
            </span>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {['Systems', 'Cloud', 'Auth', 'DevOps'].map((t) => (
                <span
                  key={t}
                  className="text-[7px] font-semibold px-2 py-1 rounded-sm tracking-widest uppercase"
                  style={{ backgroundColor: `${accent}0a`, color: accent, border: `1px solid ${accent}15` }}
                >
                  {t}
                </span>
              ))}
            </div>
            <motion.button
              onClick={() => { setStarted(false); setPhase('hype'); setBeat(0); }}
              className="mt-4 text-[9px] font-medium tracking-[0.15em] uppercase underline underline-offset-4 opacity-30 hover:opacity-70 transition-opacity"
              style={{ color: 'var(--color-muted)' }}
            >
              ↻ Replay
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
