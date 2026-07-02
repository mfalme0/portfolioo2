'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import Header from '../Components/header';
import Footer from '../Components/footer';
import PageLoader from '../Components/page-loader';
import ServiceModal from '../Components/homelab/ServiceModal';
import { homelabItems } from '@/lib/homelab-data';
import type { HomelabItem, HomelabService } from '@/lib/homelab-data';

const accentColor = '#EF4444';
const pr = 239, pg = 68, pb = 68;

// Deterministic color from string
function colorFromString(s: string) {
  let hash = 0;
  for (let i = 0; i < s.length; i++) hash = s.charCodeAt(i) + ((hash << 5) - hash);
  const hues = [0, 200, 270, 340, 190, 160, 300, 30, 220, 120, 350, 50, 280, 170, 20, 80, 320, 100, 240, 140, 60, 330, 110, 250, 10, 210, 310, 40, 70, 90];
  return hues[Math.abs(hash) % hues.length];
}

function ServiceIcon({ name, icon, size = 'md' }: { name: string; icon?: string; size?: 'sm' | 'md' | 'lg' }) {
  const hue = colorFromString(name);
  const letter = name.charAt(0).toUpperCase();
  const dims = size === 'sm' ? 'w-8 h-8 text-xs' : size === 'lg' ? 'w-14 h-14 text-xl' : 'w-10 h-10 text-sm';

  if (icon) {
    return (
      <div
        className={`${dims} rounded-xl flex items-center justify-center overflow-hidden shadow-lg`}
        style={{
          backgroundColor: `hsla(${hue}, 70%, 45%, 0.2)`,
          border: `1px solid hsla(${hue}, 70%, 55%, 0.15)`,
        }}
      >
        <Image src={icon} alt={name} width={32} height={32} className="w-4/5 h-4/5 object-contain" />
      </div>
    );
  }

  return (
    <div
      className={`${dims} rounded-xl flex items-center justify-center font-black tracking-tight shadow-lg`}
      style={{
        backgroundColor: `hsla(${hue}, 70%, 45%, 0.25)`,
        color: `hsla(${hue}, 80%, 65%, 1)`,
        border: `1px solid hsla(${hue}, 70%, 55%, 0.2)`,
        boxShadow: `0 0 20px hsla(${hue}, 70%, 50%, 0.1)`,
      }}
    >
      {letter}
    </div>
  );
}

function StatusDot({ status }: { status: HomelabService['status'] }) {
  if (status === 'active') {
    return (
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
    );
  }
  return <span className="inline-flex h-2 w-2 rounded-full bg-amber-400" />;
}

function PlatformBadge({ image, name }: { image: string; name: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]">
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Image
          src={image}
          alt={name}
          width={20}
          height={20}
          className="object-contain"
        />
      </div>
      <span className="text-[10px] font-semibold text-zinc-400">{name}</span>
    </div>
  );
}

function MachineSection({ item, rank }: { item: HomelabItem; rank: number }) {
  const [selectedService, setSelectedService] = useState<HomelabService | null>(null);
  const activeServices = item.services.filter(s => s.status === 'active');
  const passiveServices = item.services.filter(s => s.status === 'passive');

  return (
    <>
      <section className="relative w-full py-16 md:py-24 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(${pr},${pg},${pb},0.04) 0%, transparent 70%)`,
            }}
          />
          <div className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(${pr},${pg},${pb},0.3) 4px, rgba(${pr},${pg},${pb},0.3) 5px)`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header with rank */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="text-[10px] font-mono text-zinc-700 tracking-widest">
              NODE_{String(rank).padStart(2, '0')}
            </span>
            <div className="h-px flex-1" style={{ background: `linear-gradient(to right, rgba(${pr},${pg},${pb},0.2), transparent)` }} />
          </motion.div>

          {/* Machine header: image + info */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4 flex justify-center items-start"
            >
              <div className="relative w-full max-w-xs">
                <div
                  className="absolute inset-0 blur-[60px] rounded-full"
                  style={{ background: `radial-gradient(ellipse at center, ${accentColor}15, transparent 70%)` }}
                />
                <div className="relative flex items-center justify-center aspect-[4/3] bg-zinc-900/30 rounded-xl border border-white/[0.04] p-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={300}
                    height={200}
                    className="object-contain w-full h-auto opacity-80 hover:opacity-100 transition-opacity duration-500"
                    priority={rank === 1}
                  />
                </div>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-8 space-y-5"
            >
              {/* Name + status */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                      {item.name}
                    </h2>
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </span>
                  </div>
                  <p className="text-sm font-mono text-zinc-500 tracking-wide">
                    {item.model}
                  </p>
                  <p className="text-[10px] font-mono text-zinc-600 mt-1 tracking-wider">
                    <span style={{ color: accentColor }}>&gt;</span> {item.subtitle}
                  </p>
                </div>
                <Link
                  href={`/homelab/${item.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[9px] font-bold tracking-[0.25em] uppercase transition-all duration-300 border"
                  style={{
                    borderColor: `rgba(${pr},${pg},${pb},0.2)`,
                    color: `rgba(${pr},${pg},${pb},0.7)`,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = `rgba(${pr},${pg},${pb},0.4)`; e.currentTarget.style.boxShadow = `0 0 20px -8px ${accentColor}40`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = `rgba(${pr},${pg},${pb},0.2)`; e.currentTarget.style.boxShadow = ''; }}
                >
                  FULL SPECS
                  <span className="text-xs">&rarr;</span>
                </Link>
              </div>

              {/* Spec badges */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label: item.cpu.replace('Intel Core ', ''), tag: item.slug === 'potato' ? '4C/4T' : '2C/4T' },
                  { label: item.ram, tag: item.slug === 'potato' ? 'SODIMM' : 'SODIMM' },
                  { label: item.storage, tag: item.slug === 'potato' ? 'MEDIA POOL' : 'BOOT DRIVE' },
                ].map((spec, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02]"
                  >
                    <span className="text-[10px] font-semibold text-zinc-300">{spec.label}</span>
                    <span className="text-[7px] font-mono tracking-wider text-zinc-600 uppercase">{spec.tag}</span>
                  </div>
                ))}
              </div>

              {/* Platform badges */}
              <div className="flex flex-wrap gap-2">
                <PlatformBadge image="/images/homelab/debian.svg" name={item.os === 'DietPi' ? 'DietPi' : 'Debian 13'} />
                <PlatformBadge image="/images/homelab/docker.png" name="Docker" />
                <PlatformBadge image="/images/homelab/casaos.svg" name="CasaOS" />
                {item.os === 'DietPi' && (
                  <PlatformBadge image="/images/homelab/dietpi.svg" name="DietPi" />
                )}
              </div>
            </motion.div>
          </div>

          {/* Services grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-[2px] w-6 rounded-full" style={{ backgroundColor: accentColor }} />
              <span className="text-[9px] tracking-[0.4em] text-zinc-500 uppercase font-bold">Services</span>
              <span className="text-[8px] font-mono text-zinc-700 tracking-wider">
                {item.services.length} total · {activeServices.length} active{passiveServices.length > 0 ? ` · ${passiveServices.length} passive` : ''}
              </span>
              <div className="flex-1" />
              <Link
                href={`/homelab/${item.slug}`}
                className="text-[8px] font-mono tracking-wider text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                view all &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
              {item.services.map((service) => (
                <motion.button
                  key={service.name}
                  onClick={() => setSelectedService(service)}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group flex flex-col items-center gap-2 p-3 rounded-xl border border-white/[0.04] bg-white/[0.01] transition-all duration-300 text-left cursor-pointer"
                  style={{
                    borderColor: `rgba(${pr},${pg},${pb},0.04)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `rgba(${pr},${pg},${pb},0.15)`;
                    e.currentTarget.style.background = `rgba(${pr},${pg},${pb},0.03)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `rgba(${pr},${pg},${pb},0.04)`;
                    e.currentTarget.style.background = '';
                  }}
                >
                  {/* Status dot */}
                  <div className="absolute top-2 right-2">
                    <StatusDot status={service.status} />
                  </div>

                  <ServiceIcon name={service.name} icon={service.icon} size="sm" />
                  <span className="text-[9px] font-semibold text-zinc-400 group-hover:text-zinc-200 transition-colors text-center leading-tight line-clamp-2">
                    {service.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px w-full" style={{ background: `linear-gradient(to right, transparent, rgba(${pr},${pg},${pb},0.08), transparent)` }} />
      </div>

      {/* Service detail modal */}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            service={selectedService}
            machineName={item.name}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default function HomelabPage() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-background min-h-screen text-[#fafafa] selection:bg-[#a78bfa] selection:text-[#020202]">
      <AnimatePresence mode="wait">
        {loading && <PageLoader theme="homelab" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className={`transition-opacity duration-700 ${loading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        <Header />

        <main className="flex flex-col">
          {/* Hero header */}
          <div className="relative pt-28 pb-10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.08)_0%,transparent_60%)] pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(239,68,68,0.4) 4px, rgba(239,68,68,0.4) 5px)`,
              }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-zinc-600">
                  {'// SERVER_FARM_MANIFEST'}
                </span>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                  THE HOMELAB
                </h1>
                <p className="text-xs md:text-sm text-zinc-500 font-mono max-w-xl leading-relaxed">
                  Every machine, service, and stack running in my home infrastructure — click any service to see its role.
                </p>
              </div>
            </div>
          </div>

          {/* Machine sections */}
          {homelabItems.map((item, i) => (
            <MachineSection key={item.slug} item={item} rank={i + 1} />
          ))}

          {/* Footer disclaimer */}
          <section className="relative border-t border-white/[0.03]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <p className="text-[7px] font-mono tracking-[0.1em] text-zinc-700 text-center leading-relaxed max-w-2xl mx-auto">
                All product names, logos, brands, and trademarks featured on this page are the property of their respective owners.
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
