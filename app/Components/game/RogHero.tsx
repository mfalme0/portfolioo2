'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import type { GearItem } from '@/lib/gear-data';
import { SiNvidia, SiIntel, SiAmd } from 'react-icons/si';
import ActiveService from './ActiveService';
import TiltShowcase from './TiltShowcase';

function getCpuIcon(name: string) {
  if (name.includes('Intel')) return <SiIntel className="text-blue-500" />;
  if (name.includes('Ryzen') || name.includes('AMD')) return <SiAmd className="text-orange-500" />;
  return null;
}

function getGpuIcon(name: string) {
  if (name.includes('RTX') || name.includes('GTX')) return <SiNvidia className="text-emerald-500" />;
  return null;
}

function extractCpuInfo(item: GearItem) {
  const cpu = item.specs.find(s => s.label === 'CPU');
  if (!cpu) return null;
  const v = cpu.value;
  const cores = v.includes('i9') ? 24 : v.includes('i7') ? 20 : v.includes('i5') ? 14 : v.includes('Ryzen 7') ? 8 : v.includes('Ryzen 5') ? 6 : v.includes('Ryzen 9') ? 16 : 0;
  const ghzMatch = v.match(/(\d+\.?\d*)GHz/i);
  const ghz = ghzMatch ? parseFloat(ghzMatch[1]) : 0;
  return { name: v, cores, threads: cores * 2, ghz };
}

function extractGpuInfo(item: GearItem) {
  const gpu = item.specs.find(s => s.label === 'GPU');
  if (!gpu) return null;
  const v = gpu.value;
  const vramMatch = v.match(/(\d+)GB/i);
  const wattsMatch = v.match(/(\d+)W/i);
  return { name: v, vram: vramMatch ? parseInt(vramMatch[1]) : 0, tdp: wattsMatch ? parseInt(wattsMatch[1]) : 0 };
}

function extractRamInfo(item: GearItem) {
  const ram = item.specs.find(s => s.label === 'RAM');
  if (!ram) return null;
  const gb = parseInt(ram.value);
  return { name: ram.value, gb: isNaN(gb) ? 0 : gb };
}

export default function RogHero({ item, accent = '#10b981' }: { item: GearItem; accent?: string }) {
  const isSystem = item.category === 'system';
  const cpuInfo = isSystem ? extractCpuInfo(item) : null;
  const gpuInfo = isSystem ? extractGpuInfo(item) : null;
  const ramInfo = isSystem ? extractRamInfo(item) : null;
  const [typed, setTyped] = useState('');
  const [showContent, setShowContent] = useState(false);
  const subtitleRef = useRef<string>(item.subtitle || '');
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    setShowContent(true);
    const text = subtitleRef.current;
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen bg-background text-[#fafafa] font-sans overflow-hidden">
      <div className="rog-hex-grid" />
      <div className="rog-hex-overlay" />
      <div className="rog-scanline" />

      {/* Atmospheric glow using category accent — parallaxes on scroll */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={reduceMotion ? undefined : { y: bgY }}
      >
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[120px]" style={{ backgroundColor: `${accent}0a` }} />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full blur-[100px]" style={{ backgroundColor: `${accent}08` }} />
        {/* ROG signature diagonal slash */}
        <div
          className="absolute -left-24 top-[38%] w-[160%] h-40 -rotate-6 opacity-70"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}14, transparent)` }}
        />
      </motion.div>

      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 min-h-screen flex flex-col justify-center"
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        {/* Tags + Active indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-2 mb-6"
        >
          {item.tags?.map((tag) => (
            <span key={tag} className="rog-tag text-[9px]">{tag}</span>
          ))}
          {item.status === 'retired' && (
            <span className="rog-tag border-red-900/50 text-red-400 bg-red-950/20">RETIRED</span>
          )}
          {item.status === 'active' && <ActiveService />}
        </motion.div>

        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {/* modelLabel — small, mono, accent */}
          {item.modelLabel && (
            <span className="text-[9px] font-mono tracking-wider mb-2 block" style={{ color: `${accent}cc` }}>
              {item.modelLabel}
            </span>
          )}
          <span className="text-[10px] font-black tracking-[0.4em] uppercase mb-3 block" style={{ color: accent }}>
            ROG · {item.category.toUpperCase()}
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-4">
            <span className="bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
              {item.name}
            </span>
          </h1>
          <div className="h-6 md:h-7 flex items-center">
            <span className="text-xs md:text-sm font-mono text-zinc-500 tracking-wider">
              <span style={{ color: accent }}>&gt;</span> {typed}
              <span className="inline-block w-[2px] h-4 ml-1 animate-pulse" style={{ backgroundColor: accent }} />
            </span>
          </div>

          {/* Quick-jump spec chips — ROG's icon strip w/ hover tooltip */}
          {item.specs.some((s) => s.icon) && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-2 mt-6"
            >
              {item.specs.filter((s) => s.icon).slice(0, 6).map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="group relative flex items-center gap-2 rounded-full border px-3 py-1.5 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ borderColor: `${accent}25`, backgroundColor: `${accent}0a` }}
                >
                  <span className="text-sm leading-none">{s.icon}</span>
                  <span className="text-[9px] font-bold tracking-[0.1em] uppercase text-zinc-400 group-hover:text-white transition-colors">
                    {s.label}
                  </span>
                  <span
                    className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-9 whitespace-nowrap rounded-md border px-2 py-1 text-[9px] font-mono opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1"
                    style={{ borderColor: `${accent}30`, backgroundColor: 'rgba(0,0,0,0.9)', color: '#fff' }}
                  >
                    {s.value}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Main showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 items-center">
          {/* Device image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={showContent ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-lg">
              {/* Atmospheric glow behind device */}
              <div
                className="absolute inset-0 blur-[60px] rounded-full"
                style={{
                  background: `radial-gradient(ellipse at center, ${accent}1a, transparent 70%)`,
                }}
              />
              <TiltShowcase src={item.image} alt={item.name} accent={accent} priority />
              {/* Status bar (footerLeft / footerRight) */}
              {(item.footerLeft || item.footerRight) && (
                <div className="absolute -bottom-1 left-0 right-0 flex items-center justify-between px-4 py-1.5 rounded-b-lg border-t border-white/[0.06] bg-black/40 backdrop-blur-sm">
                  {item.footerLeft ? (
                    <span className="text-[8px] font-mono tracking-wider text-zinc-500 uppercase">{item.footerLeft}</span>
                  ) : <span />}
                  {item.footerRight ? (
                    <span className="text-[8px] font-mono tracking-wider text-zinc-500 uppercase">{item.footerRight}</span>
                  ) : <span />}
                </div>
              )}
              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: `${accent}66` }} />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: `${accent}66` }} />
            </div>
          </motion.div>

          {/* Spec cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={showContent ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3"
          >
            {isSystem && cpuInfo && (
              <div className="rog-card p-4 flex items-center gap-4 transition-all duration-300" style={{ borderColor: `${accent}22` }}>
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl">
                  {getCpuIcon(cpuInfo.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="rog-spec-label text-[9px]">PROCESSOR</div>
                  <div className="text-sm font-semibold truncate">{cpuInfo.name}</div>
                  <div className="flex gap-3 mt-1">
                    <span className="text-[10px] font-mono text-zinc-500">{cpuInfo.cores}C / {cpuInfo.threads}T</span>
                    <span className="text-[10px] font-mono text-zinc-500">{cpuInfo.ghz}GHz</span>
                  </div>
                </div>
              </div>
            )}

            {isSystem && gpuInfo && (
              <div className="rog-card p-4 flex items-center gap-4 transition-all duration-300" style={{ borderColor: `${accent}22` }}>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xl">
                  {getGpuIcon(gpuInfo.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="rog-spec-label text-[9px]">GRAPHICS</div>
                  <div className="text-sm font-semibold truncate">{gpuInfo.name}</div>
                  <div className="flex gap-3 mt-1">
                    {gpuInfo.vram > 0 && <span className="text-[10px] font-mono text-zinc-500">{gpuInfo.vram}GB VRAM</span>}
                    {gpuInfo.tdp > 0 && <span className="text-[10px] font-mono text-zinc-500">{gpuInfo.tdp}W TGP</span>}
                  </div>
                </div>
              </div>
            )}

            {isSystem && ramInfo && (
              <div className="rog-card p-4 flex items-center gap-4 transition-all duration-300" style={{ borderColor: `${accent}22` }}>
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl">
                  <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="rog-spec-label text-[9px]">MEMORY</div>
                  <div className="text-sm font-semibold">{ramInfo.name}</div>
                  <div className="flex gap-3 mt-1">
                    <span className="text-[10px] font-mono text-zinc-500">{ramInfo.gb}GB CAPACITY</span>
                  </div>
                </div>
              </div>
            )}

            {!isSystem && item.specs.slice(0, 3).map((s) => (
              <div key={s.label} className="rog-card p-4 flex items-center gap-4 transition-all duration-300" style={{ borderColor: `${accent}22` }}>
                {s.icon && <div className="text-xl w-8 flex justify-center">{s.icon}</div>}
                <div className="flex-1 min-w-0">
                  <div className="rog-spec-label text-[9px]">{s.label}</div>
                  <div className="text-sm font-semibold">{s.value}</div>
                </div>
              </div>
            ))}

            {item.price && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={showContent ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="rog-price-tag mt-4"
              >
                <span className="text-[9px] font-black tracking-[0.3em] text-white/40 uppercase">PRICE</span>
                <span className="text-lg font-black text-white">{item.price}</span>
                {item.purchaseYear && (
                  <span className="text-[10px] font-mono text-zinc-600">{item.purchaseYear}</span>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Bottom scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[8px] tracking-[0.4em] text-zinc-600 uppercase font-mono">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
