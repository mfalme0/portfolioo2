'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import type { HomelabItem } from '@/lib/homelab-data';
import { GiProcessor } from 'react-icons/gi';
import { FaMemory, FaHdd, FaTerminal, FaCube, FaServer } from 'react-icons/fa';
import HomelabLoader from '@/app/Components/homelab/loader';
import ServiceCard from '@/app/Components/homelab/ServiceCard';
import ActiveService from '@/app/Components/game/ActiveService';

const accentColor = '#EF4444';
const accentRgb: [number, number, number] = [239, 68, 68];

function specIcon(label: string) {
  switch (label) {
    case 'CPU': return <GiProcessor className="text-blue-500" />;
    case 'RAM': return <FaMemory className="text-purple-500" />;
    case 'STORAGE': return <FaHdd className="text-yellow-500" />;
    case 'OS': return <FaTerminal className="text-red-500" />;
    case 'DOCKER': return <FaCube className="text-cyan-500" />;
    case 'MODEL': return <FaServer className="text-green-500" />;
    default: return null;
  }
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

function SectionBg() {
  const [r, g, b] = accentRgb;
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

export default function HomelabDetailClient({
  item,
  related,
}: {
  item: HomelabItem;
  related: HomelabItem[];
}) {
  const [loading, setLoading] = useState(true);
  const [typed, setTyped] = useState('');
  const [showContent, setShowContent] = useState(false);
  const subtitleRef = useRef(item.subtitle);

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

  const [pr, pg, pb] = accentRgb;

  const servicesActive = item.services.filter(s => s.status === 'active');
  const servicesPassive = item.services.filter(s => s.status === 'passive');

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <HomelabLoader
            onComplete={() => setLoading(false)}
          />
        )}
      </AnimatePresence>

      <main className={`transition-opacity duration-700 ${loading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        {/* Breadcrumbs */}
        <nav className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <ol className="flex items-center gap-2 text-[10px] font-mono tracking-wider">
            <li>
              <Link href="/homelab" className="text-zinc-600 hover:text-zinc-400 transition-colors">HOMELAB</Link>
            </li>
            <li className="text-zinc-700">/</li>
            <li className="text-zinc-400 truncate max-w-[200px]">{item.name}</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="relative min-h-screen bg-background text-[#fafafa] font-sans overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[120px]" style={{ backgroundColor: `${accentColor}0a` }} />
          <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full blur-[100px]" style={{ backgroundColor: `${accentColor}08` }} />

          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 min-h-screen flex flex-col justify-center">
            {/* Tags + status */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-2 mb-6"
            >
              {item.tags?.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold tracking-[0.15em] uppercase border border-white/10 bg-white/[0.03] text-white/60 rounded">{tag}</span>
              ))}
              <ActiveService label="NODE_STATUS" />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={showContent ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <span className="text-[10px] font-black tracking-[0.4em] uppercase mb-3 block" style={{ color: accentColor }}>
                SERVER · {item.category.toUpperCase()}
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-4">
                <span className="bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
                  {item.name}
                </span>
              </h1>
              <div className="h-6 md:h-7 flex items-center">
                <span className="text-xs md:text-sm font-mono text-zinc-500 tracking-wider">
                  <span style={{ color: accentColor }}>&gt;</span> {typed}
                  <span className="inline-block w-[2px] h-4 ml-1 animate-pulse" style={{ backgroundColor: accentColor }} />
                </span>
              </div>
            </motion.div>

            {/* Main grid: image + key specs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={showContent ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex justify-center items-center"
              >
                <div className="relative w-full max-w-lg">
                  <div
                    className="absolute inset-0 blur-[60px] rounded-full"
                    style={{ background: `radial-gradient(ellipse at center, ${accentColor}1a, transparent 70%)` }}
                  />
                  <div className="relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={600}
                      height={400}
                      className="w-full h-auto object-contain opacity-60"
                      style={{ filter: `drop-shadow(0 20px 40px ${accentColor}26)` }}
                      priority
                    />
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: `${accentColor}66` }} />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: `${accentColor}66` }} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={showContent ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-3"
              >
                <div className="rounded-lg border p-4 flex items-center gap-4 transition-all duration-300" style={{ borderColor: `${accentColor}22` }}>
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl">
                    <GiProcessor className="text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] tracking-[0.2em] text-zinc-500 uppercase font-bold">PROCESSOR</div>
                    <div className="text-sm font-semibold truncate">{item.cpu}</div>
                    <div className="flex gap-3 mt-1">
                      <span className="text-[10px] font-mono text-zinc-500">{item.cpu.includes('i5-6500') ? '4C / 4T' : '2C / 4T'}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4 flex items-center gap-4 transition-all duration-300" style={{ borderColor: `${accentColor}22` }}>
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl">
                    <FaMemory className="text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] tracking-[0.2em] text-zinc-500 uppercase font-bold">MEMORY</div>
                    <div className="text-sm font-semibold">{item.ram}</div>
                  </div>
                </div>

                <div className="rounded-lg border p-4 flex items-center gap-4 transition-all duration-300" style={{ borderColor: `${accentColor}22` }}>
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-xl">
                    <FaHdd className="text-yellow-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] tracking-[0.2em] text-zinc-500 uppercase font-bold">STORAGE</div>
                    <div className="text-sm font-semibold">{item.storage}</div>
                  </div>
                </div>

                <div className="rounded-lg border p-4 flex items-center gap-4 transition-all duration-300" style={{ borderColor: `${accentColor}22` }}>
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-xl">
                    <FaTerminal className="text-red-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] tracking-[0.2em] text-zinc-500 uppercase font-bold">OPERATING SYSTEM</div>
                    <div className="text-sm font-semibold">{item.os}</div>
                    <div className="flex gap-3 mt-1">
                      <span className="text-[10px] font-mono text-zinc-500">{item.dockerWrapper}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={showContent ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <span className="text-[8px] tracking-[0.4em] text-zinc-600 uppercase font-mono">Scroll</span>
              <div className="w-[1px] h-8 bg-gradient-to-b from-white/20 to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Full Spec Bento Grid */}
        <section className="relative w-full py-16 bg-background overflow-hidden">
          <SectionBg />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealSection>
              <h3 className="text-[11px] font-black tracking-[0.3em] uppercase text-white/50 mb-8">
                <span style={{ color: accentColor }}>◆</span> {item.specTitle}
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
                  <div className="absolute top-0 left-0 right-0 h-[2px] opacity-60" style={{ backgroundColor: accentColor }} />
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(to right, transparent, rgba(${pr},${pg},${pb},0.4), transparent)` }}
                  />
                  {specIcon(s.label) && <div className="text-xl mb-2 flex justify-center">{specIcon(s.label)}</div>}
                  <div className="text-[8px] font-bold tracking-[0.2em] uppercase" style={{ color: `rgba(${pr},${pg},${pb},0.6)` }}>{s.label}</div>
                  <div className="text-xs font-semibold text-white/90 mt-1">{s.value}</div>
                  {s.tag && <div className="text-[8px] font-mono text-zinc-600 mt-1 uppercase tracking-wider">{s.tag}</div>}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="relative w-full py-16 bg-background overflow-hidden border-t border-white/[0.03]">
          <SectionBg />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealSection>
              <div className="flex items-center gap-4 mb-10">
                <div className="h-[2px] w-8 rounded-full" style={{ backgroundColor: accentColor }} />
                <span className="text-[9px] tracking-[0.5em] text-zinc-500 uppercase font-bold">Service Inventory</span>
                <span className="text-[9px] font-mono text-zinc-600 tracking-wider">
                  ({servicesActive.length} active{servicesPassive.length > 0 ? `, ${servicesPassive.length} passive` : ''})
                </span>
              </div>
            </RevealSection>

            {/* Active services */}
            {servicesActive.length > 0 && (
              <div className="mb-10">
                <RevealSection>
                  <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-emerald-400 mb-4 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-emerald-400/50" />
                    ACTIVE
                  </h4>
                </RevealSection>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {servicesActive.map((service, i) => (
                    <RevealSection key={service.name}>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.03, duration: 0.3 }}
                      >
                        <ServiceCard service={service} />
                      </motion.div>
                    </RevealSection>
                  ))}
                </div>
              </div>
            )}

            {/* Passive services */}
            {servicesPassive.length > 0 && (
              <div>
                <RevealSection>
                  <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-amber-400 mb-4 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-amber-400/50" />
                    PASSIVE / FAILOVER
                  </h4>
                </RevealSection>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {servicesPassive.map((service, i) => (
                    <RevealSection key={service.name}>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.03, duration: 0.3 }}
                      >
                        <ServiceCard service={service} />
                      </motion.div>
                    </RevealSection>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Story + Purchase Info */}
        <section className="relative w-full py-20 bg-background overflow-hidden border-t border-white/[0.03]">
          <SectionBg />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              <div className="lg:col-span-3">
                <RevealSection>
                  <h3 className="text-[11px] font-black tracking-[0.3em] uppercase text-white/50 mb-6">
                    <span style={{ color: accentColor }}>◆</span> THE STORY
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

              <div className="lg:col-span-2 space-y-6">
                <RevealSection>
                  <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-500 mb-4 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-zinc-600/50" />
                    QUICK STATS
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-1.5 px-3 rounded border border-white/[0.06]">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Services</span>
                      <span className="text-xs font-semibold text-white">{item.services.length}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 px-3 rounded border border-white/[0.06]">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Active</span>
                      <span className="text-xs font-semibold text-emerald-400">{servicesActive.length}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 px-3 rounded border border-white/[0.06]">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Passive</span>
                      <span className="text-xs font-semibold text-amber-400">{servicesPassive.length}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 px-3 rounded border border-white/[0.06]">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">CPU</span>
                      <span className="text-xs font-semibold text-white">{item.cpu.replace('Intel Core ', '')}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 px-3 rounded border border-white/[0.06]">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">RAM</span>
                      <span className="text-xs font-semibold text-white">{item.ram}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 px-3 rounded border border-white/[0.06]">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Storage</span>
                      <span className="text-xs font-semibold text-white">{item.storage}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 px-3 rounded border border-white/[0.06]">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">OS</span>
                      <span className="text-xs font-semibold text-white">{item.os}</span>
                    </div>
                  </div>
                </RevealSection>
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="relative w-full py-16 bg-background overflow-hidden border-t border-white/[0.03]">
            <div className="absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(${pr},${pg},${pb},0.3) 4px, rgba(${pr},${pg},${pb},0.3) 5px)`,
              }}
            />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <RevealSection>
                <div className="flex items-center gap-4 mb-10">
                  <div className="h-[2px] w-8 rounded-full" style={{ backgroundColor: accentColor }} />
                  <span className="text-[9px] tracking-[0.5em] text-zinc-500 uppercase font-bold">Other Nodes</span>
                </div>
              </RevealSection>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {related.map((r, i) => {
                  const rBorder = `rgba(${pr},${pg},${pb},0.1)`;
                  const rHoverBorder = `rgba(${pr},${pg},${pb},0.3)`;
                  const rGlow = `rgba(${pr},${pg},${pb},0.1)`;
                  return (
                    <motion.div
                      key={r.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={`/homelab/${r.slug}`}
                        className="group relative overflow-hidden rounded-lg border p-6 flex flex-col items-center text-center transition-all duration-300"
                        style={{
                          borderColor: rBorder,
                          background: `linear-gradient(180deg, rgba(${pr},${pg},${pb},0.03), transparent)`,
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
                            className="object-contain max-h-full opacity-50 group-hover:opacity-80 transition-opacity duration-300"
                          />
                        </div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-white/70 group-hover:text-white transition-colors">
                          {r.name}
                        </h4>
                        <span className="text-[9px] font-mono text-zinc-600 mt-1 uppercase tracking-wider">
                          {r.model}
                        </span>
                        <span className="text-[8px] font-mono text-zinc-700 mt-1">
                          {r.services.length} services
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
              href="/homelab"
              className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase transition-colors duration-300 group"
              style={{ color: `rgba(${pr},${pg},${pb},0.5)` }}
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-300" style={{ color: accentColor }}>&larr;</span>
              BACK TO ALL NODES
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
