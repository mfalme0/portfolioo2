'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import type { GearItem } from '@/lib/gear-data';
import { SiNvidia, SiIntel, SiAmd } from 'react-icons/si';
import {
  FaMemory, FaHdd, FaThermometerHalf, FaDesktop, FaWifi,
  FaKeyboard, FaMouse, FaHeadphones, FaBolt, FaClock, FaCheck,
} from 'react-icons/fa';
import GearLoader from '@/app/Components/game/loader';
import RogHero from '@/app/Components/game/RogHero';
import SpecBars from '@/app/Components/game/SpecBars';
import PerformanceMetrics from '@/app/Components/game/PerformanceMetrics';
import AnimatedCounter from '@/app/Components/game/AnimatedCounter';

function extractCpuInfo(item: GearItem) {
  const cpu = item.specs.find(s => s.label === 'CPU');
  if (!cpu) return null;
  const v = cpu.value;
  const cores = v.includes('i9') ? 24 : v.includes('i7') ? 20 : v.includes('i5') ? 14 : v.includes('Ryzen 7') ? 8 : v.includes('Ryzen 5') ? 6 : v.includes('Ryzen 9') ? 16 : 0;
  const ghzMatch = v.match(/(\d+\.?\d*)GHz/i);
  const ghz = ghzMatch ? parseFloat(ghzMatch[1]) : 0;
  const threads = cores * 2;
  return { name: v, cores, threads, ghz };
}

function extractGpuInfo(item: GearItem) {
  const gpu = item.specs.find(s => s.label === 'GPU');
  if (!gpu) return null;
  const v = gpu.value;
  const vramMatch = v.match(/(\d+)GB/i);
  const wattsMatch = v.match(/(\d+)W/i);
  return { name: v, vram: vramMatch ? parseInt(vramMatch[1]) : 0, tdp: wattsMatch ? parseInt(wattsMatch[1]) : 0 };
}

const categoryIcons: Record<string, React.ReactNode> = {
  system: <FaDesktop className="text-cyan-500" />,
  keyboard: <FaKeyboard className="text-red-500" />,
  mouse: <FaMouse className="text-orange-500" />,
  audio: <FaHeadphones className="text-purple-500" />,
  display: <FaDesktop className="text-blue-500" />,
  power: <FaBolt className="text-yellow-500" />,
};

function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function GearDetailClient({
  item,
  related,
}: {
  item: GearItem;
  related: GearItem[];
}) {
  const [loading, setLoading] = useState(true);
  const isSystem = item.category === 'system';
  const cpuInfo = isSystem ? extractCpuInfo(item) : null;
  const gpuInfo = isSystem ? extractGpuInfo(item) : null;

  // Build spec bars for system items
  const specBars = isSystem
    ? item.specs.map((s) => {
        const pctMap: Record<string, number> = {
          CPU: 95, GPU: 88, RAM: 90, STORAGE: 72,
          DISPLAY: 92, NETWORK: 85, COOLING: 80,
        };
        return {
          label: s.label,
          value: s.value,
          percent: pctMap[s.label] || 70,
        };
      })
    : [];

  // Performance metrics for system items
  const perfMetrics = isSystem && cpuInfo
    ? [
        { label: 'CORES', value: cpuInfo.cores, suffix: '', icon: <SiIntel className="text-blue-400" /> },
        { label: 'THREADS', value: cpuInfo.threads, suffix: '', icon: <SiIntel className="text-blue-400" /> },
        { label: 'CLOCK', value: cpuInfo.ghz, suffix: 'GHz', decimals: 1 as const, icon: <FaBolt className="text-yellow-400" /> },
        ...(gpuInfo ? [{ label: 'VRAM', value: gpuInfo.vram, suffix: 'GB', icon: <SiNvidia className="text-emerald-400" /> }] : []),
      ]
    : [];

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <GearLoader
            onComplete={() => setLoading(false)}
            logs={[
              `INITIALIZING_${item.category.toUpperCase()}_MODULE...`,
              `LOADING_${item.name.replace(/\s+/g, '_')}_FIRMWARE...`,
              'CALIBRATING_PERFORMANCE_PROFILES...',
              'SYNCING_RGB_CHANNELS...',
              'ESTABLISHING_DEVICE_UPLINK...',
              'OPTIMIZING_LATENCY_PARAMETERS...',
              'VERIFYING_SYSTEM_INTEGRITY...',
              `${item.name.replace(/\s+/g, '_')}_READY.`,
            ]}
            version={`V.${item.slug.replace(/[^0-9]/g, '')}.0` || 'V.2.1.0'}
          />
        )}
      </AnimatePresence>

      <main className={`transition-opacity duration-700 ${loading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        {/* ─── HERO ─── */}
        <RogHero item={item} />

        {/* ─── SPEC BARS (system only) ─── */}
        {isSystem && specBars.length > 0 && (
          <section className="relative w-full py-20 bg-[#050505] overflow-hidden border-t border-white/[0.04]">
            <div className="rog-hex-overlay" />
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
              <RevealSection>
                <div className="flex items-center gap-4 mb-12">
                  <div className="h-[2px] w-8 rounded-full bg-[#ff1a1a]" />
                  <span className="text-[9px] tracking-[0.5em] text-zinc-500 uppercase font-bold">Performance Profile</span>
                </div>
              </RevealSection>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <RevealSection>
                  <SpecBars bars={specBars} title="HARDWARE UTILIZATION" />
                </RevealSection>

                <RevealSection>
                  <PerformanceMetrics metrics={perfMetrics} title="SYSTEM METRICS" />
                </RevealSection>
              </div>
            </div>
          </section>
        )}

        {/* ─── SPEC LAYOUT (for non-system items) ─── */}
        {!isSystem && (
          <section className="relative w-full py-20 bg-[#050505] overflow-hidden border-t border-white/[0.04]">
            <div className="rog-hex-overlay" />
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
              <RevealSection>
                <h3 className="text-xs font-black tracking-[0.3em] uppercase text-white/50 mb-8">
                  <span className="rog-accent">◆</span> {item.specTitle}
                </h3>
              </RevealSection>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {item.specs.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="rog-card p-5 text-center group hover:border-[#ff1a1a]/30 transition-all duration-300"
                  >
                    {s.icon && <div className="text-2xl mb-2 flex justify-center">{s.icon}</div>}
                    <div className="rog-spec-label text-[9px]">{s.label}</div>
                    <div className="text-xs font-semibold text-white/90 mt-1">{s.value}</div>
                    {s.tag && <div className="text-[8px] font-mono text-zinc-600 mt-1 uppercase tracking-wider">{s.tag}</div>}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── STORY / PROS / CONS ─── */}
        <section className="relative w-full py-24 bg-[#050505] overflow-hidden border-t border-white/[0.04]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#ff1a1a]/[0.02] to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                <RevealSection>
                  <h3 className="text-xs font-black tracking-[0.3em] uppercase text-white/50 mb-6">
                    <span className="rog-accent">◆</span> THE STORY
                  </h3>
                  <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-mono">
                    {item.story}
                  </p>

                  {item.price && (
                    <div className="mt-8 flex items-center gap-4">
                      <span className="rog-tag">PRICE PAID</span>
                      <span className="text-lg font-black text-white tracking-tight">{item.price}</span>
                      {item.purchaseYear && (
                        <span className="text-[10px] font-mono text-zinc-600">— {item.purchaseYear}</span>
                      )}
                    </div>
                  )}
                </RevealSection>
              </div>

              <div className="lg:col-span-2 space-y-8">
                {item.pros && item.pros.length > 0 && (
                  <RevealSection>
                    <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-green-500 mb-4 flex items-center gap-2">
                      <span className="w-4 h-[1px] bg-green-500/50" />
                      PROS
                    </h4>
                    <ul className="space-y-3">
                      {item.pros.map((pro, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 0.3 }}
                          className="flex items-start gap-3 text-xs text-zinc-400 font-mono"
                        >
                          <span className="w-5 h-5 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <FaCheck className="text-green-500 text-[8px]" />
                          </span>
                          {pro}
                        </motion.li>
                      ))}
                    </ul>
                  </RevealSection>
                )}

                {item.cons && item.cons.length > 0 && (
                  <RevealSection>
                    <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-red-500 mb-4 flex items-center gap-2">
                      <span className="w-4 h-[1px] bg-red-500/50" />
                      CONS
                    </h4>
                    <ul className="space-y-3">
                      {item.cons.map((con, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, duration: 0.3 }}
                          className="flex items-start gap-3 text-xs text-zinc-400 font-mono"
                        >
                          <span className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-red-500 text-[10px]">&ndash;</span>
                          </span>
                          {con}
                        </motion.li>
                      ))}
                    </ul>
                  </RevealSection>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ─── RELATED GEAR ─── */}
        {related.length > 0 && (
          <section className="relative w-full py-20 bg-[#050505] overflow-hidden border-t border-white/[0.04]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <RevealSection>
                <div className="flex items-center gap-4 mb-12">
                  <div className="h-[2px] w-8 rounded-full bg-[#ff1a1a]" />
                  <span className="text-[9px] tracking-[0.5em] text-zinc-500 uppercase font-bold">Related Gear</span>
                </div>
              </RevealSection>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {related.map((r, i) => (
                  <motion.div
                    key={r.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={`/gear/${r.slug}`}
                      className="group rog-card p-6 flex flex-col items-center text-center hover:border-[#ff1a1a]/40 transition-all duration-300"
                    >
                      <div className="w-full h-32 relative mb-4 flex items-center justify-center">
                        <Image
                          src={r.image}
                          alt={r.name}
                          width={200}
                          height={120}
                          className="object-contain max-h-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-white/70 group-hover:text-white transition-colors">
                        {r.name}
                      </h4>
                      <span className="text-[9px] font-mono text-zinc-600 mt-1 uppercase tracking-wider">
                        {r.category}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── BACK LINK ─── */}
        <section className="py-12 border-t border-white/[0.04]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-center">
            <Link
              href="/gear"
              className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-600 hover:text-[#ff1a1a] transition-colors duration-300 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-300">&larr;</span>
              BACK TO ALL GEAR
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
