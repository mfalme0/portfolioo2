'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  const prev = () => setActiveIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActiveIdx((i) => (i === images.length - 1 ? 0 : i + 1));

  if (images.length === 0) return null;

  return (
    <section className="relative w-full py-20 overflow-hidden"
      style={{ backgroundColor: 'var(--bg)', borderTop: '1px solid rgb(var(--accent-rgb) / 0.04)' }}>
      <div className="rog-hex-overlay" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-[2px] w-8 rounded-full" style={{ backgroundColor: 'var(--accent-default)' }} />
          <span className="text-[9px] tracking-[0.5em] text-zinc-500 uppercase font-bold">Gallery</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Thumbnails */}
          <div className="hidden lg:flex flex-col gap-3 order-1">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`relative w-full aspect-[4/3] rounded-lg overflow-hidden transition-all duration-300 ${
                  i === activeIdx ? 'opacity-100' : 'opacity-50 hover:opacity-80'
                }`}
                style={i === activeIdx ? { boxShadow: '0 0 0 2px var(--accent-default), 0 0 0 4px var(--bg)' } : {}}
              >
                <Image
                  src={src}
                  alt={`${name} view ${i + 1}`}
                  fill
                  className="object-contain p-2"
                  sizes="180px"
                />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="lg:col-span-4 order-2 relative">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gradient-to-b"
              style={{
                backgroundImage: 'linear-gradient(to bottom, rgb(var(--accent-rgb) / 0.15), transparent)',
                border: '1px solid rgb(var(--accent-rgb) / 0.06)',
              }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex items-center justify-center p-8"
                >
                  <Image
                    src={images[activeIdx]}
                    alt={`${name} view ${activeIdx + 1}`}
                    fill
                    className="object-contain"
                    style={{ filter: 'drop-shadow(0 20px 40px rgb(var(--accent-rgb) / 0.1))' }}
                    sizes="(max-width: 1024px) 100vw, 800px"
                    priority={activeIdx === 0}
                  />
                </motion.div>
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all duration-300 z-10"
                    aria-label="Previous image"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 12L6 8l4-4" />
                    </svg>
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all duration-300 z-10"
                    aria-label="Next image"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 4l4 4-4 4" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Dots indicator */}
            {images.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-4 lg:hidden">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === activeIdx ? 'w-4' : 'bg-white/20'
                    }`}
                    style={i === activeIdx ? { backgroundColor: 'var(--accent-default)' } : {}}
                    aria-label={`View ${i + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Counter */}
            <div className="hidden lg:flex items-center justify-end mt-4 gap-2">
              <span className="text-[10px] font-mono text-zinc-500">
                {String(activeIdx + 1).padStart(2, '0')}
                <span className="mx-1">/</span>
                {String(images.length).padStart(2, '0')}
              </span>
              <div className="flex gap-1">
                <button onClick={prev} className="w-7 h-7 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all" aria-label="Previous">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 8L3 5l3-3" /></svg>
                </button>
                <button onClick={next} className="w-7 h-7 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all" aria-label="Next">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 2l3 3-3 3" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
