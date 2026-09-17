'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import type { HomelabItem } from '@/lib/homelab-data';
import PageLoader from '@/app/Components/page-loader';
import ServiceCard from '@/app/Components/homelab/ServiceCard';
import ActiveService from '@/app/Components/game/ActiveService';
import RogSideAnchor from '@/app/Components/game/RogSideAnchor';
import RogProductHeader from '@/app/Components/game/RogProductHeader';

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

  const servicesActive = item.services.filter(s => s.status === 'active');
  const servicesPassive = item.services.filter(s => s.status === 'passive');

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'specs', label: 'Specs' },
    { id: 'tech-specs', label: 'Tech Specs' },
    { id: 'services', label: 'Services' },
    { id: 'story', label: 'Story' },
    ...(related.length > 0 ? [{ id: 'related', label: 'Related' }] : []),
  ];

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <PageLoader
            theme="homelab"
            onComplete={() => setLoading(false)}
          />
        )}
      </AnimatePresence>

      <RogProductHeader
        name={item.name}
        category="SERVER"
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
              <Link href="/homelab" className="text-zinc-600 hover:text-zinc-400 transition-colors">HOMELAB</Link>
            </li>
            <li className="text-zinc-700">/</li>
            <li className="text-zinc-400 truncate max-w-[200px]">{item.name}</li>
          </ol>
        </nav>

        <RogSideAnchor items={sections} />

        {/* ═══ KV HERO ═══ */}
        <section id="overview" className="relative min-h-screen bg-background text-[#fafafa] font-sans overflow-hidden">
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
              <span className="text-[10px] font-black tracking-[0.4em] uppercase mb-3 block text-white/50">
                SERVER · {item.category.toUpperCase()}
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-4">
                <span className="bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
                  {item.name}
                </span>
              </h1>
              <div className="h-6 md:h-7 flex items-center">
                <span className="text-xs md:text-sm font-mono text-zinc-500 tracking-wider">
                  <span className="text-white/80">&gt;</span> {typed}
                  <span className="inline-block w-[2px] h-4 ml-1 animate-pulse bg-white/80" />
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
                  <div className="relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={600}
                      height={400}
                      className="w-full h-auto object-contain opacity-70"
                      priority
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={showContent ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-3"
              >
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 flex items-center gap-4 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center text-xl text-white/60">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" /></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] tracking-[0.2em] text-zinc-500 uppercase font-bold">PROCESSOR</div>
                    <div className="text-sm font-semibold truncate">{item.cpu}</div>
                    <div className="flex gap-3 mt-1">
                      <span className="text-[10px] font-mono text-zinc-500">{item.cpu.includes('i5-6500') ? '4C / 4T' : '2C / 4T'}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 flex items-center gap-4 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center text-xl text-white/60">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" /></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] tracking-[0.2em] text-zinc-500 uppercase font-bold">MEMORY</div>
                    <div className="text-sm font-semibold">{item.ram}</div>
                  </div>
                </div>

                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 flex items-center gap-4 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center text-xl text-white/60">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] tracking-[0.2em] text-zinc-500 uppercase font-bold">STORAGE</div>
                    <div className="text-sm font-semibold">{item.storage}</div>
                  </div>
                </div>

                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 flex items-center gap-4 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center text-xl text-white/60">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>
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

        {/* ROG-style brand strip */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between border-t border-b border-white/5 py-3">
            <div className="flex items-center gap-3">
              <span className="text-[8px] font-bold tracking-[0.3em] text-zinc-600 uppercase">HOMELAB</span>
              <div className="w-px h-4 bg-white/10" />
              <span className="text-[8px] font-mono tracking-wider text-zinc-600 uppercase">{item.model}</span>
            </div>
            <div className="flex items-center gap-2">
              <ActiveService label="ACTIVE" />
              {item.price && (
                <span className="text-[9px] font-bold font-mono text-white/60">
                  {item.price}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ═══ KSP GRID — Key Specs ═══ */}
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
                        <div className="text-[8px] tracking-[0.2em] uppercase font-semibold text-white/40">{spec.label}</div>
                        <div className="text-sm font-semibold text-white/90 truncate">{spec.value}</div>
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

        {/* ═══ SPECS ═══ */}
        <section id="specs" className="rog-strix-section scroll-mt-32" style={{ background: '#000' }}>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealSection>
              <div className="rog-strix-eyebrow mb-4">Full Specifications</div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white mb-2">
                Machine Details
              </h2>
              <p className="text-sm text-zinc-500 font-mono max-w-xl mb-10">
                Complete hardware and software specifications for this node.
              </p>
            </RevealSection>

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
          </div>
        </section>

        {/* ═══ TECH SPECS TABLE ═══ */}
        <section id="tech-specs" className="rog-strix-section scroll-mt-32" style={{ background: '#000' }}>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealSection>
              <div className="rog-strix-eyebrow mb-4">Technical Specifications</div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white mb-2">
                Full Spec Sheet
              </h2>
              <p className="text-sm text-zinc-500 font-mono max-w-xl mb-10">
                Complete hardware specifications and technical data for {item.name}.
              </p>
            </RevealSection>

            <RevealSection>
              <div className="border border-white/[0.06] rounded-lg overflow-hidden">
                <table className="w-full text-left">
                  <tbody>
                    {item.specs.map((spec, i) => (
                      <tr key={spec.label} className={i % 2 === 0 ? 'bg-white/[0.02]' : ''}>
                        <td className="px-4 py-3 text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 w-1/3 border-b border-white/[0.04]">
                          {spec.label}
                        </td>
                        <td className="px-4 py-3 text-sm text-white/80 border-b border-white/[0.04]">
                          {spec.value}
                          {spec.tag && <span className="ml-2 text-[9px] font-mono text-zinc-600 uppercase tracking-wider">{spec.tag}</span>}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-white/[0.02]">
                      <td className="px-4 py-3 text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 border-b border-white/[0.04]">CPU</td>
                      <td className="px-4 py-3 text-sm text-white/80 border-b border-white/[0.04]">{item.cpu}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 border-b border-white/[0.04]">RAM</td>
                      <td className="px-4 py-3 text-sm text-white/80 border-b border-white/[0.04]">{item.ram}</td>
                    </tr>
                    <tr className="bg-white/[0.02]">
                      <td className="px-4 py-3 text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 border-b border-white/[0.04]">STORAGE</td>
                      <td className="px-4 py-3 text-sm text-white/80 border-b border-white/[0.04]">{item.storage}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 border-b border-white/[0.04]">OS</td>
                      <td className="px-4 py-3 text-sm text-white/80 border-b border-white/[0.04]">{item.os}</td>
                    </tr>
                    <tr className="bg-white/[0.02]">
                      <td className="px-4 py-3 text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 border-b border-white/[0.04]">DOCKER</td>
                      <td className="px-4 py-3 text-sm text-white/80 border-b border-white/[0.04]">{item.dockerWrapper}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 border-b border-white/[0.04]">SERVICES</td>
                      <td className="px-4 py-3 text-sm text-white/80 border-b border-white/[0.04]">{item.services.length} ({servicesActive.length} active, {servicesPassive.length} passive)</td>
                    </tr>
                    {item.price && (
                      <tr className="bg-white/[0.02]">
                        <td className="px-4 py-3 text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 border-b border-white/[0.04]">PRICE</td>
                        <td className="px-4 py-3 text-sm text-white/80 border-b border-white/[0.04]">{item.price}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </RevealSection>
          </div>
        </section>

        {/* ═══ SERVICES ═══ */}
        <section id="services" className="rog-strix-section scroll-mt-32" style={{ background: '#000' }}>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RevealSection>
              <div className="rog-strix-eyebrow mb-4">Service Inventory</div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white mb-2">
                Running Services
              </h2>
              <p className="text-sm text-zinc-500 font-mono max-w-xl mb-4">
                All containerized workloads currently deployed on this node.
              </p>
              <span className="text-[9px] font-mono text-zinc-600 tracking-wider">
                ({servicesActive.length} active{servicesPassive.length > 0 ? `, ${servicesPassive.length} passive` : ''})
              </span>
            </RevealSection>

            {servicesActive.length > 0 && (
              <div className="mb-10 mt-8">
                <RevealSection>
                  <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40 mb-4 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-white/20" />
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

            {servicesPassive.length > 0 && (
              <div>
                <RevealSection>
                  <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40 mb-4 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-white/20" />
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

        {/* ═══ STORY ═══ */}
        <section id="story" className="rog-strix-section scroll-mt-32" style={{ background: '#000' }}>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              <div className="lg:col-span-3">
                <RevealSection>
                  <div className="rog-strix-eyebrow mb-4">The Story</div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white mb-6">
                    How This Node Came to Be
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
                    </div>
                  )}
                </RevealSection>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <RevealSection>
                  <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40 mb-4 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-white/20" />
                    QUICK STATS
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-1.5 px-3 rounded border border-white/[0.06]">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Services</span>
                      <span className="text-xs font-semibold text-white">{item.services.length}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 px-3 rounded border border-white/[0.06]">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Active</span>
                      <span className="text-xs font-semibold text-white/80">{servicesActive.length}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 px-3 rounded border border-white/[0.06]">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Passive</span>
                      <span className="text-xs font-semibold text-white/60">{servicesPassive.length}</span>
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

        {/* ═══ RELATED ═══ */}
        {related.length > 0 && (
          <section id="related" className="rog-strix-section scroll-mt-32" style={{ background: '#000' }}>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <RevealSection>
                <div className="rog-strix-eyebrow mb-4">Other Nodes</div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white mb-2">
                  Related Machines
                </h2>
                <p className="text-sm text-zinc-500 font-mono max-w-xl mb-10">
                  More servers in the homelab cluster.
                </p>
              </RevealSection>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {related.map((r, i) => (
                  <motion.div
                    key={r.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={`/homelab/${r.slug}`}
                      className="group relative overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.01] p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-white/[0.15]"
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
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back link */}
        <section className="py-10 border-t border-white/[0.03]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
            <Link
              href="/homelab"
              className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-white/30 transition-colors duration-300 group hover:text-white/60"
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-300">&larr;</span>
              BACK TO ALL NODES
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
