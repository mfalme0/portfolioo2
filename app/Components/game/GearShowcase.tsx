'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { GearItem } from '@/lib/gear-data';

export default function GearShowcase({ item }: { item: GearItem }) {
  const isRetired = item.status === 'retired';
  const isUps = item.slug === 'apc-back-ups-1400va';

  return (
    <section className={`relative w-full py-20 bg-[#050505] text-white font-sans overflow-hidden ${isRetired ? 'opacity-90' : ''}`}>
      <div className="rog-hex-overlay" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-14 border-l-2 border-[#ff1a1a] pl-6 relative">
          {isRetired && (
            <div className="absolute -left-3 -top-3 bg-[#ff1a1a] text-white text-[10px] font-black px-3 py-1 tracking-widest uppercase shadow-lg shadow-red-500/20">
              DECOMMISSIONED
            </div>
          )}
          <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tighter ${isRetired ? 'text-white/70' : ''}`}>
            {item.name}
          </h2>
          <p className="text-xs font-mono text-white/40 mt-2 tracking-wider">
            {item.subtitle}
          </p>
          {item.tags && item.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => {
                if (isUps && tag === 'READY') {
                  return (
                    <span key={tag} className="inline-flex items-center gap-2 rog-tag">
                      <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      READY
                    </span>
                  );
                }
                return (
                  <span key={tag} className="rog-tag">{tag}</span>
                );
              })}
            </div>
          )}
        </div>

        {/* Main content */}
        <div className={`flex flex-col ${item.imagePosition === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 mb-16`}>
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <div className={`rog-card p-6 md:p-8 h-full flex flex-col ${isRetired ? 'opacity-70' : ''}`}>
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-[#ff1a1a]/60" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-[#ff1a1a]/60" />
              <Image
                src={item.image}
                alt={item.name}
                width={600}
                height={400}
                className={`w-full h-auto object-contain ${isRetired ? 'opacity-60' : ''}`}
                priority
              />
              {item.modelLabel && (
                <div className="mt-auto pt-4 text-[10px] font-mono text-white/30 tracking-widest uppercase">
                  {item.modelLabel}
                </div>
              )}
            </div>
          </div>

          {/* Specs */}
          <div className="w-full lg:w-1/2">
            <div className={`rog-card p-6 md:p-8 h-full ${isRetired ? 'border-red-900/30' : ''}`}>
              <h3 className="text-xs font-black tracking-[0.3em] uppercase text-white/50 mb-6">
                <span className="rog-accent">◆</span> {item.specTitle}
              </h3>

              {item.specLayout === 'flat' ? (
                /* All specs as rows */
                <div className="space-y-0">
                  {item.specs.map((s, i) => (
                    <div
                      key={s.label}
                      className={`flex items-center justify-between py-3 ${i < item.specs.length - 1 ? 'border-b border-white/5' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        {s.icon && <span className="text-lg">{s.icon}</span>}
                        <span className="rog-spec-label">{s.label}</span>
                      </div>
                      <span className={`rog-spec-value text-sm ${isRetired ? 'text-white/50' : ''}`}>{s.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                /* Split: first 4 as rows, last 2 as grid */
                <>
                  <div className="space-y-0">
                    {item.specs.slice(0, 4).map((s, i) => (
                      <div key={s.label} className={`flex items-center justify-between py-3 ${i < 3 ? 'border-b border-white/5' : ''}`}>
                        <div className="flex items-center gap-3">
                          {s.icon && <span className="text-lg">{s.icon}</span>}
                          <span className="rog-spec-label">{s.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {s.tag && <span className="rog-tag">{s.tag}</span>}
                          <span className={`rog-spec-value text-sm ${isRetired ? 'text-white/50' : ''}`}>{s.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={`mt-6 pt-4 border-t ${isRetired ? 'border-red-900/30' : 'border-white/5'} grid grid-cols-2 gap-4`}>
                    {item.specs.slice(4).map((s) => (
                      <div
                        key={s.label}
                        className={`text-center p-3 rounded-sm ${isRetired && s.label === 'STATUS' ? 'bg-red-950/30 border border-red-900/40' : ''}`}
                      >
                        {s.icon && <div className="flex justify-center text-lg mb-1">{s.icon}</div>}
                        <div className="rog-spec-label text-center">{s.label}</div>
                        <div className={`rog-spec-value text-xs mt-1 ${isRetired && s.label === 'STATUS' ? 'rog-accent' : isRetired ? 'text-white/50' : ''}`}>
                          {s.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {item.footerLeft && (
                <div className={`mt-6 pt-4 border-t ${isRetired ? 'border-red-900/30' : 'border-white/5'}`}>
                  <div className="flex items-center justify-between text-[10px] font-mono text-white/30 tracking-widest">
                    <span>{item.footerLeft}</span>
                    {item.footerRight && (
                      <span className={isRetired ? 'rog-accent' : 'rog-accent'}>{item.footerRight}</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="rog-divider" />

        {/* Bottom grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {item.specs.map((s) => {
            const isStatus = s.label === 'STATUS';
            return (
              <motion.div
                key={s.label}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className={`rog-card p-4 text-center group ${isRetired && isStatus ? 'border-red-900/40 bg-red-950/10 opacity-90' : isRetired ? 'opacity-50' : ''}`}
              >
                {s.icon && <div className="text-2xl mb-2">{s.icon}</div>}
                <div className={`rog-spec-label text-center ${isRetired && isStatus ? 'rog-accent' : ''}`}>{s.label}</div>
                <div className={`rog-spec-value text-sm mt-1 ${isRetired && isStatus ? 'rog-accent' : isRetired ? 'text-white/50' : ''}`}>
                  {s.value}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
