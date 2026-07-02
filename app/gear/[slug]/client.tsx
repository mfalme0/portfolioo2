'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import type { GearItem, GearCategory } from '@/lib/gear-data';
import { SiNvidia, SiIntel } from 'react-icons/si';
import { FaBolt } from 'react-icons/fa';
import PageLoader from '@/app/Components/page-loader';
import RogHero from '@/app/Components/game/RogHero';
import ProductGallery from '@/app/Components/game/ProductGallery';
import SpecBars from '@/app/Components/game/SpecBars';
import PerformanceMetrics from '@/app/Components/game/PerformanceMetrics';
import ConnectivityTerminal from '@/app/Components/game/ConnectivityTerminal';
import NeonGlitch from '@/app/Components/neon-glitch';

const catPalette: Record<GearCategory, { base: string; rgb: [number, number, number] }> = {
  system:     { base: '#10B981', rgb: [16, 185, 129] },
  keyboard:   { base: '#ec4899', rgb: [236, 72, 153] },
  mouse:      { base: '#06b6d4', rgb: [6, 182, 212] },
  audio:      { base: '#8B5CF6', rgb: [139, 92, 246] },
  display:    { base: '#38BDF8', rgb: [56, 189, 248] },
  power:      { base: '#F59E0B', rgb: [245, 158, 11] },
  controller: { base: '#6366f1', rgb: [99, 102, 241] },
};

function extractCpuInfo(item: GearItem) {
  const cpu = item.specs.find(s => s.label === 'CPU');
  if (!cpu) return null;
  const v = cpu.value;
  const cores = v.includes('i9') ? 24 : v.includes('i7') ? 20 : v.includes('i5') ? 14 : v.includes('Ryzen 7') ? 8 : v.includes('Ryzen 5') ? 6 : v.includes('Ryzen 9') ? 16 : 0;
  const ghzMatch = v.match(/(\d+\.?\d*)GHz/i);
  let ghz = ghzMatch ? parseFloat(ghzMatch[1]) : 0;
  if (ghz === 0) {
    const freqMap: Record<string, number> = {
      'i9-14900HX': 5.8, 'i7-': 4.8, 'i5-': 4.5,
      'Ryzen 7 4800H': 4.2, 'Ryzen 9': 5.0,
    };
    for (const [key, freq] of Object.entries(freqMap)) {
      if (v.includes(key)) { ghz = freq; break; }
    }
  }
  const threadMap: Record<string, number> = {
    'i9-14900HX': 32, 'Ryzen 7 4800H': 16,
  };
  let threads = cores * 2;
  for (const [key, t] of Object.entries(threadMap)) {
    if (v.includes(key)) { threads = t; break; }
  }
  return { name: v, cores, threads, ghz };
}

function extractGpuInfo(item: GearItem) {
  const gpu = item.specs.find(s => s.label === 'GPU');
  if (!gpu) return null;
  const v = gpu.value;
  const vramMatch = v.match(/(\d+)GB/i);
  let vram = vramMatch ? parseInt(vramMatch[1]) : 0;
  if (vram === 0) {
    const vramMap: Record<string, number> = {
      'RTX 4060': 8, 'RTX 3050': 4, 'RTX 3060': 6,
      'RTX 4050': 6, 'RTX 4070': 8, 'RTX 4080': 12, 'RTX 4090': 16,
    };
    for (const [key, val] of Object.entries(vramMap)) {
      if (v.includes(key)) { vram = val; break; }
    }
  }
  const wattsMatch = v.match(/(\d+)W/i);
  const tdp = wattsMatch ? parseInt(wattsMatch[1]) : 0;
  return { name: v, vram, tdp };
}

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

function SectionBg({ palette }: { palette: typeof catPalette[GearCategory] }) {
  const [r, g, b] = palette.rgb;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 0%, rgba(${r},${g},${b},0.05) 0%, transparent 70%)`,
        }}
      />
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(${r},${g},${b},0.2) 2px, rgba(${r},${g},${b},0.2) 3px)`,
        }}
      />
    </div>
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
  const palette = catPalette[item.category];
  const [pr, pg, pb] = palette.rgb;

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
          <PageLoader
            theme="gear"
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
        {/* Breadcrumbs */}
        <nav className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <ol className="flex items-center gap-2 text-[10px] font-mono tracking-wider">
            <li>
              <Link href="/gear" className="text-zinc-600 hover:text-zinc-400 transition-colors">GEAR</Link>
            </li>
            <li className="text-zinc-700">/</li>
            <li>
              <Link href={`/gear#${item.category}s`} className="text-zinc-600 hover:text-zinc-400 transition-colors">{item.category.toUpperCase()}</Link>
            </li>
            <li className="text-zinc-700">/</li>
            <li className="text-zinc-400 truncate max-w-[200px]">{item.name}</li>
          </ol>
        </nav>

        <RogHero item={item} accent={palette.base} />

        {item.gallery && item.gallery.length > 0 && (
          <ProductGallery images={item.gallery} name={item.name} />
        )}

        {/* System: Performance Profile (SpecBars + Metrics) */}
        {isSystem && specBars.length > 0 && (
          <section className="relative w-full py-16 bg-background overflow-hidden">
            <SectionBg palette={palette} />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <RevealSection>
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-[2px] w-8 rounded-full" style={{ backgroundColor: palette.base }} />
                  <span className="text-[9px] tracking-[0.5em] text-zinc-500 uppercase font-bold">Performance Profile</span>
                </div>
              </RevealSection>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <RevealSection>
                  <SpecBars bars={specBars} title="HARDWARE UTILIZATION" accent={palette.base} />
                </RevealSection>
                <RevealSection>
                  <PerformanceMetrics metrics={perfMetrics} title="SYSTEM METRICS" accent={palette.base} />
                </RevealSection>
              </div>
            </div>
          </section>
        )}

        {/* Non-system: Spec Bento Grid */}
        {!isSystem && (
          <section className="relative w-full py-16 bg-background overflow-hidden">
            <SectionBg palette={palette} />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <RevealSection>
                <h3 className="text-[11px] font-black tracking-[0.3em] uppercase text-white/50 mb-8">
                  <span style={{ color: palette.base }}>◆</span> {item.specTitle}
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
                    className="relative overflow-hidden rounded-lg border p-4 text-center transition-all duration-300 group"
                    style={{
                      borderColor: `rgba(${pr},${pg},${pb},0.12)`,
                      background: `linear-gradient(135deg, rgba(${pr},${pg},${pb},0.04), transparent)`,
                    }}
                    whileHover={{
                      borderColor: `rgba(${pr},${pg},${pb},0.3)`,
                      boxShadow: `0 0 30px -8px rgba(${pr},${pg},${pb},0.12)`,
                    }}
                  >
                    <NeonGlitch className="w-full h-full">
                      {/* Top accent border */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
                        style={{ backgroundColor: palette.base }}
                      />
                      <div
                        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(to right, transparent, rgba(${pr},${pg},${pb},0.4), transparent)`,
                        }}
                      />
                      {s.icon && <div className="text-xl mb-2 flex justify-center" style={{ color: palette.base }}>{s.icon}</div>}
                      <div className="text-[8px] font-bold tracking-[0.2em] uppercase" style={{ color: `rgba(${pr},${pg},${pb},0.6)` }}>{s.label}</div>
                      <div className="text-xs font-semibold text-white/90 mt-1">{s.value}</div>
                      {s.tag && <div className="text-[8px] font-mono text-zinc-600 mt-1 uppercase tracking-wider">{s.tag}</div>}

                      {item.slug === 'glorious-model-o' && s.label === 'WEIGHT' && (
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                          <div className="relative bg-zinc-900 border border-zinc-700 rounded-lg p-3 shadow-xl min-w-[100px]">
                            <div className="relative h-[80px]">
                              <pre className="animate-arms-up absolute inset-0 text-[10px] leading-relaxed text-cyan-400 font-mono text-center whitespace-pre flex items-center justify-center"
>{`  \\ | /
   \\|/
    67
  /   \\`}</pre>
                              <pre className="animate-arms-down absolute inset-0 text-[10px] leading-relaxed text-cyan-400 font-mono text-center whitespace-pre flex items-center justify-center"
>{`  / | \\
 /  |  \\
    67
  /   \\`}</pre>
                            </div>
                          </div>
                          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-zinc-700" />
                        </div>
                      )}
                    </NeonGlitch>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Benchmarks (systems only) */}
        {isSystem && item.benchmarks && item.benchmarks.length > 0 && (
          <section className="relative w-full py-16 bg-background overflow-hidden">
            <SectionBg palette={palette} />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <RevealSection>
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-[2px] w-8 rounded-full" style={{ backgroundColor: palette.base }} />
                  <span className="text-[9px] tracking-[0.5em] text-zinc-500 uppercase font-bold">Benchmarks</span>
                </div>
              </RevealSection>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {item.benchmarks.map((b, i) => (
                  <motion.div
                    key={b.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="rog-card p-4 text-center"
                  >
                    <NeonGlitch>
                      <div className="text-lg md:text-2xl font-black tabular-nums" style={{ color: palette.base }}>
                        {b.score.toLocaleString()}
                        {b.unit && <span className="text-[10px] text-zinc-600 ml-0.5">{b.unit}</span>}
                      </div>
                      <div className="rog-spec-label text-center mt-1">{b.label}</div>
                    </NeonGlitch>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Story + Pros/Cons */}
        <section className="relative w-full py-20 bg-background overflow-hidden">
          <SectionBg palette={palette} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              <div className="lg:col-span-3">
                <RevealSection>
                  <h3 className="text-[11px] font-black tracking-[0.3em] uppercase text-white/50 mb-6">
                    <span style={{ color: palette.base }}>◆</span> THE STORY
                  </h3>
                  <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-mono">
                    {item.story}
                  </p>

                  {item.price && (
                    <div className="mt-8 flex items-center gap-4">
                      <span
                        className="text-[8px] font-bold tracking-[0.2em] uppercase px-2 py-1 rounded border"
                        style={{
                          borderColor: `rgba(${pr},${pg},${pb},0.2)`,
                          color: `rgba(${pr},${pg},${pb},0.7)`,
                        }}
                      >
                        PRICE PAID
                      </span>
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
                    <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-emerald-400 mb-4 flex items-center gap-2">
                      <span className="w-4 h-[1px] bg-emerald-400/50" />
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
                          className="relative pl-4 text-xs text-zinc-400 font-mono leading-relaxed"
                        >
                          {/* Left border accent */}
                          <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-emerald-400/60" />
                          {pro}
                        </motion.li>
                      ))}
                    </ul>
                  </RevealSection>
                )}

                {item.cons && item.cons.length > 0 && (
                  <RevealSection>
                    <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-rose-400 mb-4 flex items-center gap-2">
                      <span className="w-4 h-[1px] bg-rose-400/50" />
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
                          className="relative pl-4 text-xs text-zinc-400 font-mono leading-relaxed"
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-rose-400/60" />
                          {con}
                        </motion.li>
                      ))}
                    </ul>
                  </RevealSection>
                )}

                {/* Connectivity Terminal */}
                {item.connectivity && item.connectivity.length > 0 && (
                  <RevealSection>
                    <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-500 mb-4 flex items-center gap-2">
                      <span className="w-4 h-[1px] bg-zinc-600/50" />
                      CONNECTIVITY
                    </h4>
                    <ConnectivityTerminal slug={item.slug} connectivity={item.connectivity} />
                  </RevealSection>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Related Gear */}
        {related.length > 0 && (
          <section className="relative w-full py-16 bg-background overflow-hidden">
            <div className="absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(${pr},${pg},${pb},0.3) 4px, rgba(${pr},${pg},${pb},0.3) 5px)`,
              }}
            />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <RevealSection>
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-[2px] w-8 rounded-full" style={{ backgroundColor: palette.base }} />
                  <span className="text-[9px] tracking-[0.5em] text-zinc-500 uppercase font-bold">Related Gear</span>
                </div>
              </RevealSection>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {related.map((r, i) => {
                  const rPalette = catPalette[r.category];
                  const rBorder = `rgba(${rPalette.rgb[0]},${rPalette.rgb[1]},${rPalette.rgb[2]},0.1)`;
                  const rHoverBorder = `rgba(${rPalette.rgb[0]},${rPalette.rgb[1]},${rPalette.rgb[2]},0.3)`;
                  const rGlow = `rgba(${rPalette.rgb[0]},${rPalette.rgb[1]},${rPalette.rgb[2]},0.1)`;
                  return (
                    <motion.div
                      key={r.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={`/gear/${r.slug}`}
                        className="group relative overflow-hidden rounded-lg border p-6 flex flex-col items-center text-center transition-all duration-300"
                        style={{
                          borderColor: rBorder,
                          background: `linear-gradient(180deg, rgba(${rPalette.rgb[0]},${rPalette.rgb[1]},${rPalette.rgb[2]},0.03), transparent)`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = rHoverBorder;
                          e.currentTarget.style.boxShadow = `0 0 30px -8px ${rGlow}`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = rBorder;
                          e.currentTarget.style.boxShadow = '';
                        }}
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
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Back link */}
        <section className="py-10 border-t border-white/[0.03]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
            <Link
              href="/gear"
              className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase transition-colors duration-300 group"
              style={{ color: `rgba(${pr},${pg},${pb},0.5)` }}
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-300" style={{ color: palette.base }}>&larr;</span>
              BACK TO ALL GEAR
            </Link>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="relative border-t border-white/[0.03]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-[7px] font-mono tracking-[0.1em] text-zinc-700 text-center leading-relaxed max-w-2xl mx-auto">
              All product names, logos, brands, and trademarks featured on this page are the property of their respective owners. The use of these names, logos, and brands does not imply endorsement or affiliation. All rights reserved to their respective companies.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
