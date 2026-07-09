'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import type { GearItem } from '@/lib/gear-data';
import PageLoader from '@/app/Components/page-loader';
import RogHero from '@/app/Components/game/RogHero';
import ProductGallery from '@/app/Components/game/ProductGallery';
import SpecBars from '@/app/Components/game/SpecBars';
import PerformanceMetrics from '@/app/Components/game/PerformanceMetrics';
import ConnectivityTerminal from '@/app/Components/game/ConnectivityTerminal';
import RogSideAnchor from '@/app/Components/game/RogSideAnchor';
import RogProductHeader from '@/app/Components/game/RogProductHeader';
import ActiveService from '@/app/Components/game/ActiveService';
import CategorySpotlight from '@/app/Components/game/CategorySpotlight';

const SPOTLIGHT_CATEGORIES = new Set(['display', 'keyboard', 'mouse', 'audio', 'controller']);

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

export default function GearDetailClient({
  item,
  related,
}: {
  item: GearItem;
  related: GearItem[];
}) {
  const [loading, setLoading] = useState(true);
  const [typedSubtitle, setTypedSubtitle] = useState('');
  const isSystem = item.category === 'system';
  const cpuInfo = isSystem ? extractCpuInfo(item) : null;
  const gpuInfo = isSystem ? extractGpuInfo(item) : null;

  useEffect(() => {
    const text = item.subtitle || '';
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setTypedSubtitle(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [item.subtitle]);

  const specBars = isSystem
    ? item.specs.map((s) => {
        const pctMap: Record<string, number> = {
          CPU: 95, GPU: 88, RAM: 90, STORAGE: 72,
          DISPLAY: 92, NETWORK: 85, COOLING: 80,
        };
        return { label: s.label, value: s.value, percent: pctMap[s.label] || 70 };
      })
    : [];

  const perfMetrics = isSystem && cpuInfo
    ? [
        { label: 'CORES', value: cpuInfo.cores, suffix: '' },
        { label: 'THREADS', value: cpuInfo.threads, suffix: '' },
        { label: 'CLOCK', value: cpuInfo.ghz, suffix: 'GHz', decimals: 1 as const },
        ...(gpuInfo ? [{ label: 'VRAM', value: gpuInfo.vram, suffix: 'GB' }] : []),
      ]
    : [];

  const showSpotlight = SPOTLIGHT_CATEGORIES.has(item.category);
  const spotlightLabel: Record<string, string> = {
    display: 'Panel',
    keyboard: 'Switch & Feel',
    mouse: 'Sensor & Grip',
    audio: 'Sound',
    controller: 'Input Layout',
  };

  const sections = [
    { id: 'overview', label: 'Overview' },
    ...(showSpotlight ? [{ id: 'spotlight', label: spotlightLabel[item.category] || 'Spotlight' }] : []),
    { id: 'specs', label: isSystem ? 'Performance' : 'Specs' },
    ...(item.gallery && item.gallery.length > 0 ? [{ id: 'gallery', label: 'Gallery' }] : []),
    ...(isSystem && item.benchmarks && item.benchmarks.length > 0 ? [{ id: 'benchmarks', label: 'Benchmarks' }] : []),
    { id: 'tech-specs', label: 'Tech Specs' },
    { id: 'story', label: 'Story' },
    ...(item.connectivity && item.connectivity.length > 0 ? [{ id: 'connectivity', label: 'Connectivity' }] : []),
    ...(related.length > 0 ? [{ id: 'related', label: 'Related' }] : []),
  ];

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
              'ESTABLISHING_DEVICE_UPLINK...',
              'OPTIMIZING_LATENCY_PARAMETERS...',
              'VERIFYING_SYSTEM_INTEGRITY...',
              `${item.name.replace(/\s+/g, '_')}_READY.`,
            ]}
            version={`V.${item.slug.replace(/[^0-9]/g, '')}.0` || 'V.2.1.0'}
          />
        )}
      </AnimatePresence>

      <RogProductHeader
        name={item.name}
        category={item.category}
        tabs={sections}
      />

      <main
        className={`transition-opacity duration-700 ${loading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}
        style={{ '--accent-rgb': '255 255 255' } as React.CSSProperties}
      >
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

        {/* Side Anchor Navigation */}
        <RogSideAnchor items={sections} />

        {/* ═══ OVERVIEW / KV HERO ═══ */}
        <section id="overview">
          <RogHero item={item} />
        </section>

        {/* ROG-style brand strip */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between border-t border-b border-white/5 py-3">
            <div className="flex items-center gap-3">
              <span className="text-[8px] font-bold tracking-[0.3em] text-zinc-600 uppercase">ROG</span>
              <div className="w-px h-4 bg-white/10" />
              <span className="text-[8px] font-mono tracking-wider text-zinc-600 uppercase">{item.category}</span>
              {item.modelLabel && (
                <>
                  <div className="w-px h-4 bg-white/10" />
                  <span className="text-[8px] font-mono text-zinc-700">{item.modelLabel}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              {item.status === 'active' && <ActiveService label="ACTIVE" />}
              {item.price && (
                <span className="text-[9px] font-bold font-mono text-white/60">
                  {item.price}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ═══ KSP GRID — Key Selling Points ═══ */}
        {item.specs.length > 0 && (
          <section className="relative w-full py-10 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <RevealSection>
                <div className="rog-strix-eyebrow mb-6">Key Specifications</div>
              </RevealSection>
              <div className="rog-ksp-grid">
                {item.specs.slice(0, 6).map((spec, i) => (
                  <RevealSection key={spec.label}>
                    <div className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-white/[0.15] hover:-translate-y-0.5">
                      {spec.icon && (
                        <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0 text-lg text-white/60">
                          {spec.icon}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="rog-spec-label">{spec.label}</div>
                        <div className="rog-spec-value text-sm truncate">{spec.value}</div>
                        {spec.tag && (
                          <span className="text-[7px] font-mono text-zinc-600 uppercase tracking-wider">{spec.tag}</span>
                        )}
                      </div>
                    </div>
                  </RevealSection>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══ CATEGORY SPOTLIGHT ═══ */}
        {showSpotlight && (
          <div id="spotlight">
            <CategorySpotlight item={item} />
          </div>
        )}

        {/* ═══ PERFORMANCE / SPECS ═══ */}
        <section id="specs" className="rog-strix-section scroll-mt-32" style={{ background: '#000' }}>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealSection>
              <div className="rog-strix-eyebrow mb-4">{isSystem ? 'Performance Profile' : 'Specifications'}</div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white mb-2">
                {isSystem ? 'Hardware Utilization' : 'Full Specifications'}
              </h2>
              <p className="text-sm text-zinc-500 font-mono max-w-xl mb-10">
                {isSystem
                  ? 'Real-world performance metrics and hardware utilization benchmarks for your workflow.'
                  : 'Detailed technical specifications and measurements for this device.'}
              </p>
            </RevealSection>

            {isSystem && specBars.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <RevealSection>
                  <SpecBars bars={specBars} title="HARDWARE UTILIZATION" />
                </RevealSection>
                <RevealSection>
                  <PerformanceMetrics metrics={perfMetrics} title="SYSTEM METRICS" />
                </RevealSection>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {item.specs.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.02] p-4 text-center transition-all duration-300 group hover:border-white/[0.2]"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/10" />
                    {s.icon && <div className="text-xl mb-2 flex justify-center text-white/50">{s.icon}</div>}
                    <div className="text-[8px] font-bold tracking-[0.2em] uppercase text-white/40">{s.label}</div>
                    <div className="text-xs font-semibold text-white/90 mt-1">{s.value}</div>
                    {s.tag && <div className="text-[8px] font-mono text-zinc-600 mt-1 uppercase tracking-wider">{s.tag}</div>}
                  </motion.div>
                ))}
              </div>
            )}

            <RevealSection>
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
                  className="rog-read-more"
                >
                  Read more about this device <span className="w-3 h-3 inline-flex items-center justify-center">&rarr;</span>
                </button>
              </div>
            </RevealSection>
          </div>
        </section>

        {/* ═══ BENCHMARKS ═══ */}
        {isSystem && item.benchmarks && item.benchmarks.length > 0 && (
          <section id="benchmarks" className="rog-strix-section scroll-mt-32" style={{ background: '#000' }}>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <RevealSection>
                <div className="rog-strix-eyebrow mb-4">Benchmarks</div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white mb-2">
                  Synthetic Performance
                </h2>
                <p className="text-sm text-zinc-500 font-mono max-w-xl mb-10">
                  Standardized benchmark scores measuring real-world processing, graphics, and system capabilities.
                </p>
              </RevealSection>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {item.benchmarks.map((b, i) => (
                  <motion.div
                    key={b.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 text-center"
                  >
                    <div className="text-lg md:text-2xl font-black tabular-nums text-white">
                      {b.score.toLocaleString()}
                      {b.unit && <span className="text-[10px] text-zinc-600 ml-0.5">{b.unit}</span>}
                    </div>
                    <div className="text-[8px] font-bold tracking-[0.2em] uppercase mt-1 text-white/40">{b.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══ GALLERY ═══ */}
        {item.gallery && item.gallery.length > 0 && (
          <section id="gallery" className="rog-strix-section scroll-mt-32" style={{ background: '#000' }}>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <RevealSection>
                <div className="rog-strix-eyebrow mb-4">Gallery</div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white mb-2">
                  A Closer Look
                </h2>
                <p className="text-sm text-zinc-500 font-mono max-w-xl mb-10">
                  Detailed views of the {item.name} from every angle.
                </p>
              </RevealSection>
              <ProductGallery images={item.gallery} name={item.name} />
            </div>
          </section>
        )}

        {/* ═══ TECH SPECS ═══ */}
        <section id="tech-specs" className="rog-strix-section scroll-mt-32" style={{ background: '#000' }}>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealSection>
              <div className="rog-strix-eyebrow mb-4">Technical Specifications</div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white mb-2">
                Full Spec Sheet
              </h2>
              <p className="text-sm text-zinc-500 font-mono max-w-xl mb-10">
                Complete hardware specifications and technical data for the {item.name}.
              </p>
            </RevealSection>

            <RevealSection>
              <div className="border border-white/[0.06] rounded-lg overflow-hidden">
                <table className="w-full text-left">
                  <tbody>
                    {item.specs.map((spec, i) => (
                      <tr key={spec.label} className={i % 2 === 0 ? 'bg-white/[0.02]' : ''}>
                        <td className="px-4 py-3 text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 w-1/3 border-b border-white/[0.04]">
                          <div className="flex items-center gap-2">
                            {spec.icon && <span className="text-xs text-white/40">{spec.icon}</span>}
                            {spec.label}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-white/80 border-b border-white/[0.04]">
                          {spec.value}
                          {spec.tag && <span className="ml-2 text-[9px] font-mono text-zinc-600 uppercase tracking-wider">{spec.tag}</span>}
                        </td>
                      </tr>
                    ))}
                    {item.category === 'system' && cpuInfo && (
                      <tr className="bg-white/[0.02]">
                        <td className="px-4 py-3 text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 border-b border-white/[0.04]">CORES / THREADS</td>
                        <td className="px-4 py-3 text-sm text-white/80 border-b border-white/[0.04]">{cpuInfo.cores}C / {cpuInfo.threads}T</td>
                      </tr>
                    )}
                    {item.category === 'system' && gpuInfo && (
                      <tr>
                        <td className="px-4 py-3 text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 border-b border-white/[0.04]">GPU VRAM / TGP</td>
                        <td className="px-4 py-3 text-sm text-white/80 border-b border-white/[0.04]">{gpuInfo.vram}GB / {gpuInfo.tdp}W</td>
                      </tr>
                    )}
                    {item.price && (
                      <tr className="bg-white/[0.02]">
                        <td className="px-4 py-3 text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 border-b border-white/[0.04]">PRICE PAID</td>
                        <td className="px-4 py-3 text-sm text-white/80 border-b border-white/[0.04]">{item.price}{item.purchaseYear ? <span className="ml-2 text-[9px] font-mono text-zinc-600">— {item.purchaseYear}</span> : ''}</td>
                      </tr>
                    )}
                    {item.status && (
                      <tr>
                        <td className="px-4 py-3 text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">STATUS</td>
                        <td className="px-4 py-3 text-sm text-white/80">{item.status === 'active' ? 'Active Service' : 'Retired'}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </RevealSection>
          </div>
        </section>

        {/* ═══ STORY ═══ */}
        <section id="story" className="rog-strix-section scroll-mt-32" style={{ background: '#000' }}>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                <RevealSection>
                  <div className="rog-strix-eyebrow mb-4">The Story</div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white mb-6">
                    Why It&apos;s in My Setup
                  </h2>
                  <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-mono">
                    {item.story}
                  </p>

                  {item.price && (
                    <div className="mt-8 flex items-center gap-4">
                      <span className="text-[8px] font-bold tracking-[0.2em] uppercase px-2 py-1 rounded border border-white/10 text-white/50">
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
                    <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-400 mb-4 flex items-center gap-2">
                      <span className="w-4 h-[1px] bg-white/20" />
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
                          <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-white/30" />
                          {pro}
                        </motion.li>
                      ))}
                    </ul>
                  </RevealSection>
                )}

                {item.cons && item.cons.length > 0 && (
                  <RevealSection>
                    <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-500 mb-4 flex items-center gap-2">
                      <span className="w-4 h-[1px] bg-white/20" />
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
                          <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-white/30" />
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

        {/* ═══ CONNECTIVITY ═══ */}
        {item.connectivity && item.connectivity.length > 0 && (
          <section id="connectivity" className="rog-strix-section scroll-mt-32" style={{ background: '#000' }}>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <RevealSection>
                  <div className="rog-strix-eyebrow mb-4">I/O & Ports</div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white mb-2">
                    Connectivity
                  </h2>
                  <p className="text-sm text-zinc-500 font-mono max-w-xl mb-6">
                    All ports, connectors, and wireless interfaces available on this device.
                  </p>
                </RevealSection>
                <RevealSection>
                  <ConnectivityTerminal slug={item.slug} connectivity={item.connectivity} />
                </RevealSection>
              </div>
            </div>
          </section>
        )}

        {/* ═══ RELATED GEAR ═══ */}
        {related.length > 0 && (
          <section id="related" className="rog-strix-section scroll-mt-32" style={{ background: '#000' }}>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <RevealSection>
                <div className="rog-strix-eyebrow mb-4">Complete the Setup</div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white mb-2">
                  Related Gear
                </h2>
                <p className="text-sm text-zinc-500 font-mono max-w-xl mb-10">
                  More {item.category} equipment from the collection.
                </p>
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
                      className="group relative overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.01] p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-white/[0.15]"
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

        {/* Back link */}
        <section className="py-10 border-t border-white/[0.03]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
            <Link
              href="/gear"
              className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-white/30 transition-colors duration-300 group hover:text-white/60"
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-300">&larr;</span>
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
