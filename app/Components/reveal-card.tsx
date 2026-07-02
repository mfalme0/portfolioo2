'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface RevealCardProps {
  children: React.ReactNode;
  index: number;
  isOpen: boolean;
  title?: string;
}

export function RevealCard({ children, index, isOpen, title }: RevealCardProps) {
  const isUp = index % 2 === 0;
  const num = String(index + 1).padStart(2, '0');

  return (
    <div className="section-grid relative w-full h-dvh overflow-hidden bg-background">
      {/* Hex grid background */}
      <div className="rog-hex-grid" />
      {/* Scan line */}
      <div className="rog-scanline" />

      {/* Content — always mounted, animates in */}
      <motion.div
        className="absolute inset-0 overflow-y-auto overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          transition: { duration: 0.6, delay: isOpen ? 0.65 : 0, ease: [0.65, 0, 0.35, 1] },
        }}
      >
        {children}
      </motion.div>

      {/* Cover overlay — slides up/down with premium ease */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{
          backgroundColor: 'var(--color-surface)',
          willChange: 'transform',
        }}
        initial={false}
        animate={{
          y: isOpen ? (isUp ? '-100%' : '100%') : '0%',
          transition: {
            duration: 0.75,
            delay: isOpen ? 0.5 : 0,
            ease: [0.65, 0, 0.35, 1],
          },
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{
              background: 'linear-gradient(90deg, transparent, rgb(var(--accent-rgb) / 0.4), transparent)',
            }}
          />
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[200px]"
            style={{ background: 'rgb(var(--accent-rgb) / 0.06)' }}
          />
          <div
            className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full blur-[180px]"
            style={{ background: 'rgb(var(--accent-rgb) / 0.04)' }}
          />
        </div>

        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              background: `radial-gradient(ellipse at 50% ${isUp ? '30%' : '70%'}, rgb(var(--accent-rgb) / 1) 0%, transparent 70%)`,
            }}
          />

          <div className="relative z-10 text-center px-12 max-w-lg">
            <motion.span
              className="block text-[clamp(6rem,20vw,14rem)] font-bold leading-none tracking-[-0.08em] select-none pointer-events-none"
              style={{ color: 'rgb(var(--accent-rgb) / 0.06)' }}
              aria-hidden
            >
              {num}
            </motion.span>

            <div className="text-[9px] font-bold tracking-[0.25em] uppercase -mt-2 mb-3 rog-accent">
              {title || `Section ${num}`}
            </div>

            {title && (
              <motion.h2
                className="text-[clamp(1.8rem,4.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] mb-6"
                style={{ color: 'var(--color-foreground)' }}
                initial={false}
                animate={isOpen ? { scale: [1, 1.02, 1], opacity: [1, 1, 0] } : {}}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.65, 0, 0.35, 1] }}
              >
                {title}
              </motion.h2>
            )}

            <div
              className="w-12 h-[2px] mx-auto mb-6 rounded-full"
              style={{ backgroundColor: 'rgb(var(--accent-rgb) / 0.4)' }}
            />

            <motion.p
              className="text-[9px] font-bold tracking-[0.2em] uppercase"
              style={{ color: 'rgba(255,255,255,0.3)' }}
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              Scroll to Explore
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
