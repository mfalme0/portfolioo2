  'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FaTerminal, FaCog, FaCheck } from 'react-icons/fa';

type LoaderTheme = 'home' | 'gear' | 'homelab' | 'lan';

interface PageLoaderProps {
  theme: LoaderTheme;
  onComplete: () => void;
  logs?: string[];
  version?: string;
  durationMs?: number;
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function postBeep() {
  try {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    osc.type = 'square';
    const t = ctx.currentTime;
    gain.gain.setValueAtTime(0.12, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    osc.start(t + 0.02);
    osc.stop(t + 0.1);
  } catch {}
}

const LOGS: Record<LoaderTheme, string[]> = {
  home: [''],
  gear: [
    'INITIALIZING_PERIPHERAL_DATABASE...',
    'DETECTING_INPUT_DEVICES...',
    'CALIBRATING_HERO_SENSORS...',
    'SYNCING_AULA_F75_FIRMWARE...',
    'ESTABLISHING_AUDIO_UPLINK (DTS:X)...',
    'OPTIMIZING_REFRESH_RATES (180Hz)...',
    'VERIFYING_UPS_VOLTAGE...',
    'LOADOUT_CONFIGURATION_VALIDATED.',
  ],
  homelab: [
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
  ],
  lan: [
    'INITIALIZING_PERIPHERAL_DATABASE...',
    'DETECTING_INPUT_DEVICES...',
    'CALIBRATING_HERO_SENSORS...',
    'SYNCING_AULA_F75_FIRMWARE...',
    'ESTABLISHING_AUDIO_UPLINK (DTS:X)...',
    'OPTIMIZING_REFRESH_RATES (180Hz)...',
    'VERIFYING_UPS_VOLTAGE...',
    'LOADOUT_CONFIGURATION_VALIDATED.',
  ],
};

const DEFAULTS: Record<LoaderTheme, { duration: number; version: string; label: string }> = {
  home: { duration: 2000, version: '', label: '' },
  gear: { duration: 2400, version: 'V.2.1.0', label: 'ARMOURY_CRATE::BOOT_SEQ' },
  homelab: { duration: 3000, version: '', label: '' },
  lan: { duration: 2500, version: 'V.2.0.4', label: 'SYSTEM_BOOT' },
};

const PHASES = [
  { threshold: 0, label: 'BIOS POST - Testing system...' },
  { threshold: 30, label: 'Loading Linux kernel...' },
  { threshold: 55, label: 'Starting system services...' },
  { threshold: 95, label: 'System ready.' },
] as const;

const LAN_SERVERS = [
  'de_dust2', 'de_inferno', 'de_nuke', 'de_mirage',
  'de_cache', 'de_overpass', 'de_train', 'de_vertigo',
  'fy_pool_day', 'awp_lego_2', 'cs_assault', 'zm_cbble',
];

const LOGIN_PROMPT = 'homelab login: ';
const ERROR_LINE_INDEX = 6;

export default function PageLoader({
  theme,
  onComplete,
  logs: customLogs,
  version: customVersion,
  durationMs: customDuration,
}: PageLoaderProps) {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const rafRef = useRef<number>(null);
  const doneRef = useRef(false);
  const pctRef = useRef(0);

  const activeLogs = customLogs ?? LOGS[theme];
  const activeDuration = customDuration ?? DEFAULTS[theme].duration;
  const activeVersion = customVersion ?? DEFAULTS[theme].version;
  const pct = Math.round(progress);

  const exitAnimation = theme === 'home' || theme === 'homelab'
    ? { opacity: 0, transition: { duration: reduceMotion ? 0.2 : 0.6, ease: 'easeInOut' as const } }
    : { y: '-100%', transition: { duration: reduceMotion ? 0.2 : 0.8, ease: [0.19, 1, 0.22, 1] as const } };

  const handleSkip = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setProgress(100);
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    doneRef.current = false;
    const start = performance.now();
    const tick = (now: number) => {
      const t = clamp((now - start) / activeDuration, 0, 1);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      const wobble = reduceMotion || t > 0.9 ? 0 : Math.sin(t * Math.PI * 2) * 0.6;
      const next = clamp(eased * 100 + wobble, 0, 100);
      setProgress(next);
      pctRef.current = next;

      const idx = Math.min(activeLogs.length - 1, Math.floor((next / 100) * activeLogs.length));
      setLogIndex(idx);

      if (t >= 1 && !doneRef.current) {
        doneRef.current = true;
        setProgress(100);
        window.setTimeout(() => onComplete(), reduceMotion ? 150 : 450);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [activeDuration, activeLogs.length, onComplete, reduceMotion]);

  useEffect(() => {
    const line = activeLogs[logIndex] ?? '';
    if (theme === 'home' || reduceMotion) {
      setTyped(line);
      return;
    }
    setTyped('');
    let i = 0;
    const id = window.setInterval(() => {
      i += 2;
      setTyped(line.slice(0, i));
      if (i >= line.length) window.clearInterval(id);
    }, theme === 'homelab' ? 28 : 18);
    return () => window.clearInterval(id);
  }, [logIndex, activeLogs, theme, reduceMotion]);

  useEffect(() => {
    if (theme !== 'homelab' || reduceMotion) return;
    const id = setInterval(() => setShowCursor(v => !v), 530);
    return () => clearInterval(id);
  }, [theme, reduceMotion]);

  const bootPhase = useMemo(() => {
    if (theme !== 'homelab') return 0;
    let phase = 0;
    for (let i = PHASES.length - 1; i >= 0; i--) {
      if (progress >= PHASES[i].threshold) { phase = i; break; }
    }
    return phase;
  }, [theme, progress]);

  const displayLogs = useMemo(() => {
    if (theme !== 'homelab') return [];
    return activeLogs.slice(0, logIndex + 1);
  }, [theme, activeLogs, logIndex]);

  const prevLine = useMemo(() => {
    if (theme === 'home' || theme === 'homelab') return '';
    return activeLogs[Math.max(0, logIndex - 1)] ?? '...';
  }, [theme, activeLogs, logIndex]);

  const barGlow = reduceMotion ? undefined : '0 0 12px rgba(255, 0, 128, 0.4), 0 0 40px rgba(0, 255, 255, 0.15)';

  const [glitching, setGlitching] = useState(false);
  const glitchTriggeredRef = useRef(false);

  const [sensors, setSensors] = useState({ cpu: 42, gpu: 38, fan: 2100 });

  const [showWelcome, setShowWelcome] = useState(false);

  const [errorState, setErrorState] = useState<'idle' | 'fail' | 'retry' | 'resolved'>('idle');
  const errorProcessedRef = useRef(false);

  const [hexLines, setHexLines] = useState<string[]>([]);
  const hexDoneRef = useRef(false);

  const keyBuffer = useRef<string[]>([]);
  const [verbose, setVerbose] = useState(false);

  const [beepPlayed, setBeepPlayed] = useState(false);
  const isReady = PHASES[bootPhase]?.label === 'System ready.';

  const [loginInput, setLoginInput] = useState('');
  const [loginMode, setLoginMode] = useState(false);
  const loginLineIndex = LOGS.homelab.length - 1;

  const [pingResult, setPingResult] = useState('');
  const [peersFound, setPeersFound] = useState(0);
  const [serverIndex, setServerIndex] = useState(0);

  const isGlitching = glitching && (theme === 'gear' || theme === 'lan');

  /* Big glitch at ~70% for gear */
  useEffect(() => {
    if (progress >= 68 && progress <= 72 && !glitchTriggeredRef.current && !reduceMotion && theme === 'gear') {
      glitchTriggeredRef.current = true;
      setGlitching(true);
      const id = setTimeout(() => setGlitching(false), 250);
      return () => clearTimeout(id);
    }
  }, [progress, theme, reduceMotion]);

  /* Random mini-glitches throughout gear/lan loading */
  useEffect(() => {
    if (theme !== 'gear' && theme !== 'lan' || reduceMotion) return;
    const id = setInterval(() => {
      if (pctRef.current < 20 || pctRef.current >= 98) return;
      if (Math.random() < 0.35) {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 60 + Math.random() * 100);
      }
    }, 2200);
    return () => clearInterval(id);
  }, [theme, reduceMotion]);

  useEffect(() => {
    if (theme !== 'gear' || reduceMotion) return;
    const id = setInterval(() => {
      setSensors({
        cpu: 42 + Math.round(Math.random() * 8),
        gpu: 38 + Math.round(Math.random() * 6),
        fan: 1800 + Math.round(Math.random() * 600),
      });
    }, 400);
    return () => clearInterval(id);
  }, [theme, reduceMotion]);

  useEffect(() => {
    if (theme !== 'home') return;
    if (pct >= 100 && !reduceMotion) {
      const id = setTimeout(() => setShowWelcome(true), 300);
      return () => clearTimeout(id);
    }
  }, [theme, pct, reduceMotion]);

  useEffect(() => {
    if (theme !== 'homelab' || errorProcessedRef.current) return;
    if (logIndex >= ERROR_LINE_INDEX && logIndex < ERROR_LINE_INDEX + 1) {
      errorProcessedRef.current = true;
      setErrorState('fail');
      const t1 = setTimeout(() => setErrorState('retry'), 1000);
      const t2 = setTimeout(() => setErrorState('resolved'), 1600);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [theme, logIndex]);

  useEffect(() => {
    if (theme !== 'homelab' || bootPhase !== 0 || hexDoneRef.current || reduceMotion) return;
    hexDoneRef.current = true;
    const id = setInterval(() => {
      const addr = (Math.random() * 0xFFFFFFFF).toString(16).toUpperCase().padStart(8, '0');
      setHexLines(prev => [...prev.slice(-8), `0x${addr}`]);
    }, 80);
    return () => clearInterval(id);
  }, [theme, bootPhase, reduceMotion]);

  useEffect(() => {
    if (theme !== 'homelab' || verbose) return;
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      keyBuffer.current = [...keyBuffer.current.slice(-3), e.key.toUpperCase()];
      if (keyBuffer.current.join('') === 'HELP') {
        setVerbose(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [theme, verbose]);

  useEffect(() => {
    if (theme !== 'homelab' || !isReady || beepPlayed || reduceMotion) return;
    setBeepPlayed(true);
    const id = setTimeout(postBeep, 100);
    return () => clearTimeout(id);
  }, [theme, isReady, beepPlayed, reduceMotion]);

  useEffect(() => {
    if (theme !== 'homelab') return;
    const line = activeLogs[logIndex] ?? '';
    if (logIndex === loginLineIndex && typed === line && !loginMode) {
      setLoginMode(true);
    }
  }, [theme, logIndex, typed, activeLogs, loginLineIndex, loginMode]);

  useEffect(() => {
    if (theme !== 'homelab' || !loginMode) return;
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      e.preventDefault();
      if (e.key === 'Enter') {
        setLoginInput('');
        return;
      }
      if (e.key === 'Backspace') {
        setLoginInput(prev => prev.slice(0, -1));
        return;
      }
      if (e.key.length === 1) {
        setLoginInput(prev => prev + e.key);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [theme, loginMode]);

  useEffect(() => {
    if (theme !== 'lan') return;
    const id = setInterval(() => {
      const ip = `192.168.1.${Math.floor(Math.random() * 254) + 1}`;
      const ms = (Math.random() * 20 + 2).toFixed(1);
      setPingResult(`PING ${ip}: ${ms}ms`);
    }, 600);
    return () => clearInterval(id);
  }, [theme]);

  useEffect(() => {
    if (theme !== 'lan') return;
    const target = 8;
    const intervalMs = activeDuration / target;
    const id = setInterval(() => {
      setPeersFound(prev => Math.min(prev + 1, target));
    }, intervalMs);
    return () => clearInterval(id);
  }, [theme, activeDuration]);

  useEffect(() => {
    if (theme !== 'lan') return;
    const id = setInterval(() => {
      setServerIndex(prev => (prev + 1) % LAN_SERVERS.length);
    }, 300);
    return () => clearInterval(id);
  }, [theme]);



  if (theme === 'home') {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 1 }}
          exit={exitAnimation}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ backgroundColor: 'var(--color-background)' }}
        >
          <div className="flex flex-col items-center gap-6">
            {reduceMotion ? (
              <span className="text-5xl font-light tracking-tighter" style={{ color: 'var(--color-foreground)' }}>
                JG
              </span>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <motion.div className="flex items-center gap-3 overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <motion.span
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl font-light tracking-[-0.04em]"
                    style={{ color: 'var(--color-foreground)' }}
                  >
                    J
                  </motion.span>
                  <motion.span
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-6xl font-light tracking-[-0.04em]"
                    style={{ color: 'var(--color-foreground)' }}
                  >
                    G
                  </motion.span>
                </motion.div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[2px] w-16 origin-center overflow-hidden rounded-full"
                  style={{ backgroundColor: 'var(--accent-default)' }}
                />
              </div>
            )}
            <div className="w-32 h-[2px] overflow-hidden rounded-full" style={{ backgroundColor: 'var(--color-border)' }}>
              <div
                className="h-full w-full rounded-full"
                style={{ width: `${pct}%`, backgroundColor: 'var(--accent-default)', transition: 'width 0.15s ease-out' }}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: 'var(--color-muted)' }}>
                Loading
              </span>
              {showWelcome && (
                <motion.span
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[11px] font-normal tracking-[0.15em]"
                  style={{ color: 'var(--accent-default)' }}
                >
                  Welcome back.
                </motion.span>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (theme === 'homelab') {
    const GREEN = '#33FF33';
    const GREEN_RGB = '51, 255, 51';
    const verboseLogs = verbose && displayLogs.length < activeLogs.length
      ? activeLogs.slice(0, logIndex + 1)
      : displayLogs;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 1 }}
          exit={exitAnimation}
          className="fixed inset-0 z-50 overflow-hidden"
          style={{ backgroundColor: '#000000' }}
        >
          <div className="absolute inset-0 pointer-events-none z-10" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7) 50%)', backgroundSize: '100% 3px', opacity: 0.4 }} />
          <div className="absolute inset-0 pointer-events-none z-10" style={{ background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.5) 100%)' }} />
          <div className="absolute inset-0 pointer-events-none z-10" style={{ boxShadow: 'inset 0 0 150px rgba(0,0,0,0.7)' }} />

          <div className="relative z-[5] w-full h-full px-4 sm:px-8 py-4 sm:py-6 flex flex-col">
              <div className="flex items-center justify-between pb-1.5 mb-2 border-b shrink-0" style={{ borderColor: `rgba(${GREEN_RGB},0.1)` }}>
                <div className="flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.1em]" style={{ color: `rgba(${GREEN_RGB},0.5)` }}>
                  <span className="inline-flex h-2 w-2 rounded-full" style={{
                    backgroundColor: isReady ? GREEN : `rgba(${GREEN_RGB},0.3)`,
                    boxShadow: isReady ? `0 0 8px ${GREEN}` : 'none',
                  }} />
                  {PHASES[bootPhase].label}{verbose && ' [VERBOSE]'}
                </div>
                <div className="text-[9px] sm:text-[10px] tabular-nums" style={{ color: `rgba(${GREEN_RGB},0.3)` }}>
                  [{pct}%]
                </div>
              </div>

            <div className="flex-1 overflow-hidden relative">
              <div className="font-mono text-[13px] sm:text-[14px] md:text-[15px] leading-relaxed" style={{ color: GREEN }}>
                {verboseLogs.map((line, i) => {
                  const isLast = i === verboseLogs.length - 1;
                  const isLoginLine = line.startsWith(LOGIN_PROMPT);
                  const dim = i < verboseLogs.length - 3 ? `rgba(${GREEN_RGB},0.35)` : GREEN;

                  if (i === ERROR_LINE_INDEX && errorState !== 'idle') {
                    const isResolved = errorState === 'resolved';
                    const eColor = errorState === 'fail' ? '#FF4444' : errorState === 'retry' ? '#FFAA00' : GREEN;
                    const eText = errorState === 'fail'
                      ? 'Primary IDE Master  : FAIL'
                      : errorState === 'retry'
                      ? '...RETRY...'
                      : 'Primary IDE Master  : HP ProDesk 600 G2 MT [OK]';
                    return <div key="error" style={{ color: eColor }}>{eText}{isResolved && <span className="ml-1" style={{ color: GREEN }}>✓</span>}</div>;
                  }

                  if (isLoginLine && isLast) {
                    const displayText = loginMode ? loginInput : typed.replace(LOGIN_PROMPT, '');
                    return (
                      <div key={i} className="flex items-center" style={{ color: GREEN }}>
                        <span>{LOGIN_PROMPT}</span>
                        <span className="relative">
                          {displayText}
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

                  if (line === '') return <div key={i} className="h-[0.6em]" />;

                  return (
                    <div key={i} style={{ color: isLast ? dim : (i < verboseLogs.length - 8 ? `rgba(${GREEN_RGB},0.5)` : dim), opacity: isLast ? 1 : (i < verboseLogs.length - 8 ? 0.5 : 1) }}>
                      {line}
                      {isLast && !reduceMotion && (
                        <span className="inline-block w-[7px] h-[14px] sm:w-[8px] sm:h-[16px] ml-0.5 align-middle animate-pulse" style={{ backgroundColor: GREEN }} />
                      )}
                    </div>
                  );
                })}
              </div>

              {bootPhase === 0 && hexLines.length > 0 && !reduceMotion && (
                <div className="absolute right-0 top-12 bottom-0 font-mono text-[10px] leading-relaxed text-right overflow-hidden"
                  style={{ color: `rgba(${GREEN_RGB},0.15)` }}>
                  {hexLines.map((h, i) => (
                    <div key={i}>{h}</div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-1.5 mt-2 border-t shrink-0" style={{ borderColor: `rgba(${GREEN_RGB},0.08)` }}>
              <div className="flex items-center gap-3 text-[8px] sm:text-[9px] uppercase tracking-[0.15em]" style={{ color: `rgba(${GREEN_RGB},0.25)` }}>
                <span>HDD: ACTIVE</span>
                <span className="hidden sm:inline">|</span>
                <span className="hidden sm:inline">RAM: 65536K</span>
                <span className="hidden sm:inline">|</span>
                <span className="hidden sm:inline">CPU: PIII 800MHz</span>
              </div>
              <div className="flex items-center gap-2 text-[8px] sm:text-[9px] uppercase tracking-[0.15em]" style={{ color: `rgba(${GREEN_RGB},0.25)` }}>
                <span className="inline-flex items-center gap-1">
                  <span className="inline-flex h-1.5 w-1.5 rounded-full" style={{
                    backgroundColor: isReady ? GREEN : `rgba(${GREEN_RGB},0.2)`,
                    boxShadow: isReady ? `0 0 6px ${GREEN}` : 'none',
                  }} />
                  POWER
                </span>
                <span className="mx-1">|</span>
                <button type="button" onClick={handleSkip}
                  className="hover:text-white transition-colors" style={{ color: `rgba(${GREEN_RGB},0.3)` }}>
                  SKIP &gt;
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={exitAnimation}
        className={`fixed inset-0 z-50 font-mono flex items-center justify-center p-6 overflow-hidden ${isGlitching ? 'chromatic-glitching scale-[1.01]' : ''}`}
        style={{
          backgroundColor: 'var(--bg)',
          color: 'var(--accent-default)',
          transition: isGlitching ? 'all 0.05s' : undefined,
          filter: isGlitching ? 'invert(0.08) hue-rotate(90deg)' : undefined,
        }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        {/* Synthwave grid */}
        <div className="absolute inset-0 pointer-events-none synthwave-grid opacity-[0.25]" />
        <div className="absolute inset-0 pointer-events-none synthwave-flare" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,0,128,0.04),transparent_55%)]" />
        {theme === 'lan' && (
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }} />
        )}
        <div className="absolute inset-0 pointer-events-none opacity-[0.10]" style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 50%)',
          backgroundSize: '100% 6px',
        }} />

        <div className="relative z-10 w-full max-w-xl rounded-xl border border-white/10 bg-black/60 backdrop-blur-md overflow-hidden"
          style={{ boxShadow: '0 0 80px rgb(var(--accent-rgb) / 0.08)' }}>
          {theme === 'gear' && !reduceMotion && (
            <div className="absolute inset-0 pointer-events-none z-10" style={{ overflow: 'hidden' }}>
              <motion.div
                className="absolute left-0 right-0 h-[2px]"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgb(var(--accent-rgb) / 0.15), transparent)',
                }}
                animate={{ top: ['-2%', '102%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          )}

          <div className="flex items-end justify-between px-6 pt-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                <FaTerminal className={reduceMotion ? '' : 'animate-pulse'} />
              </span>
              <div className="leading-tight">
                <div className={`text-[11px] tracking-[0.35em] text-white/70 uppercase font-bold ${isGlitching ? 'chromatic-split' : ''}`}
                  data-text={isGlitching ? DEFAULTS[theme].label : undefined}>
                  {DEFAULTS[theme].label}
                </div>
                {theme === 'gear' && (
                  <div className={`text-[10px] tracking-[0.25em] text-white/40 uppercase ${isGlitching ? 'chromatic-split' : ''}`}
                    data-text={isGlitching ? 'ROG device initialization' : undefined}>
                    ROG device initialization
                  </div>
                )}
              </div>
            </div>
            {activeVersion && (
              <div className={`text-[10px] tracking-[0.3em] text-white/35 uppercase ${isGlitching ? 'chromatic-split' : ''}`}
                data-text={isGlitching ? activeVersion : undefined}>
                {activeVersion}
              </div>
            )}
          </div>

          <div className="px-6 py-6">
            <div className="flex items-end justify-between mb-4">
              <div className="text-5xl md:text-6xl font-black tracking-tighter text-white tabular-nums">
                <motion.span
                  key={pct}
                  initial={reduceMotion ? undefined : { scale: 1.35 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className={`inline-block ${isGlitching ? 'chromatic-split' : ''}`}
                  data-text={`${pct < 10 ? `0${pct}` : pct}`}
                >
                  {pct < 10 ? `0${pct}` : pct}
                </motion.span>
                <span className={`text-white/35 ${isGlitching ? 'chromatic-split' : ''}`}
                  data-text="%">%</span>
              </div>
              <div className={`flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-white/40 ${isGlitching ? 'chromatic-split' : ''}`}
                data-text={isGlitching ? (pct >= 100 ? 'READY' : 'PROCESSING') : undefined}>
                {pct >= 100 ? (
                  <><FaCheck style={{ color: 'var(--accent-default)' }} /> READY</>
                ) : (
                  <><FaCog className={reduceMotion ? '' : 'animate-spin'} /> PROCESSING</>
                )}
              </div>
            </div>

            <div className="w-full h-2 rounded-full overflow-hidden border border-white/10 neon-glow-magenta"
              style={{ background: 'rgba(255,255,255,0.05)' }}>
              <motion.div
                className="h-full"
                style={{
                  background: `linear-gradient(90deg, #FF0080, #FF00FF, #00FFFF)`,
                  width: `${progress}%`,
                  boxShadow: barGlow,
                  transition: 'width 0.15s ease-out',
                }}
              />
            </div>

            {theme === 'gear' && !reduceMotion && (
              <div className="mt-3 flex gap-4 text-[9px] font-mono tracking-wider justify-center"
                style={{ color: 'rgba(255,255,255,0.3)' }}>
                <span>CPU: {sensors.cpu}°C</span>
                <span>GPU: {sensors.gpu}°C</span>
                <span>FAN: {sensors.fan}RPM</span>
              </div>
            )}

            <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.03] overflow-hidden">
              <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between">
                <span className="text-[10px] tracking-[0.25em] uppercase text-white/45">
                  {theme === 'lan' ? 'network_scan' : 'system_logs'}
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-white/35">
                  {theme === 'lan' ? 'scanning...' : 'node: active'}
                </span>
              </div>
              <div className="px-4 py-4 flex gap-4">
                <div className="flex-1 min-w-0">
                  <div className={`text-[11px] text-white/35 mb-2 ${isGlitching ? 'chromatic-split' : ''}`}
                    data-text={isGlitching ? `> ${prevLine}` : undefined}>
                    <span className="opacity-70">&gt;</span> {prevLine}
                  </div>
                  <div className="text-[12px] text-white flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: 'rgb(var(--accent-rgb) / 0.9)', boxShadow: '0 0 18px rgb(var(--accent-rgb) / 0.35)' }} />
                    <span className={`font-bold tracking-wide ${isGlitching ? 'chromatic-split' : ''}`}
                      data-text={`> ${typed}`}>
                      <span className="opacity-70">&gt;</span>{' '}
                      {typed}
                      {!reduceMotion && (
                        <motion.span
                          className="inline-block w-[2px] h-[14px] ml-0.5 align-middle"
                          style={{ backgroundColor: 'rgb(var(--accent-rgb) / 0.9)' }}
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                        />
                      )}
                    </span>
                  </div>
                </div>
                {theme === 'lan' && !reduceMotion && (
                  <div className="shrink-0 text-[9px] leading-relaxed text-right font-mono"
                    style={{ color: 'rgba(255,255,255,0.15)' }}>
                    <div className="text-[7px] tracking-[0.2em] uppercase mb-1 text-white/10">servers</div>
                    {LAN_SERVERS.slice(serverIndex, serverIndex + 5).map((s, i) => (
                      <div key={i} className={i === 0 ? 'text-white/30' : ''}>{s}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-[0.25em] text-white/35">
              {theme === 'lan' ? (
                <div className="flex gap-4">
                  <span style={{ color: 'rgb(var(--accent-rgb) / 0.6)' }}>
                    {pingResult || 'PING: scanning...'}
                  </span>
                  <span style={{ color: 'rgb(var(--accent-rgb) / 0.6)' }}>
                    PEERS: {peersFound}/8
                  </span>
                </div>
              ) : (
                <div className="flex gap-4">
                  <span style={{ color: 'rgb(var(--accent-rgb) / 0.6)' }}>mem: ok</span>
                  <span style={{ color: 'rgb(var(--accent-rgb) / 0.6)' }}>io: ok</span>
                  <span style={{ color: 'rgb(var(--accent-rgb) / 0.6)' }}>gpu: ok</span>
                </div>
              )}
              <button type="button" onClick={handleSkip}
                className="px-3 py-1 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition">
                skip
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
