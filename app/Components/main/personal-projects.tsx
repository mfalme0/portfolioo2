'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../Context/theme';

const categories = [
  {
    title: 'Media & Entertainment',
    accent: '#4a9eff',
    items: [
      { name: 'Jellyfin Music Streaming Player', desc: 'Full-featured web client for self-hosted music libraries with real-time playback queueing and modern streaming-app UX on top of the open-source Jellyfin API.', tech: ['Next.js', 'Jellyfin API'] },
      { name: 'Jellyfin Yearly Wrapped', desc: 'Spotify-Wrapped-style analytics app that aggregates and visualizes a year of listening history from self-hosted media data.', tech: ['Data Viz', 'Analytics'] },
      { name: 'Electron Desktop Jellyfin Client', desc: 'Cross-platform native desktop app packaging a web media player with system tray, media-key, and OS-level integration.', tech: ['Electron', 'Desktop'] },
    ],
  },
  {
    title: 'Hardware, RGB & Embedded Systems',
    accent: '#e85d3a',
    items: [
      { name: 'Game-Telemetry LED Bridges', desc: 'Custom software bridges translating live in-game telemetry (Forza, Delta Force) into OpenRGB-controlled lighting, mapping software state to physical hardware in real time.', tech: ['Python', 'OpenRGB SDK', 'Real-Time'] },
      { name: 'OpenRGB ↔ SignalRGB Bridge', desc: 'Protocol-translation layer connecting two otherwise incompatible RGB device ecosystems, enabling cross-vendor lighting control.', tech: ['Python', 'Protocol'] },
      { name: 'Sound-Reactive LED Companion', desc: 'Mobile app analyzing live audio input and driving synchronized LED effects on connected hardware in real time.', tech: ['Mobile', 'Audio', 'IoT'] },
    ],
  },
  {
    title: 'Mobile Applications',
    accent: '#22c55e',
    items: [
      { name: 'React Native IEM Equalizer', desc: 'Mobile audio equalizer with automatic USB-C DAC detection, applying real-time signal processing to external audio hardware.', tech: ['React Native', 'Audio'] },
      { name: 'Farming Companion App', desc: 'Mobile app with map-based field mapping for tracking agricultural plots, activities, and yields.', tech: ['React Native', 'Maps'] },
      { name: 'Personal Finance Tracker', desc: 'Mobile budgeting and expense-tracking app with category-based spending insights.', tech: ['Mobile', 'Finance'] },
    ],
  },
  {
    title: 'Game Development',
    accent: '#a855f7',
    items: [
      { name: 'Unity FPS Game', desc: 'First-person shooter prototype in Unity/C# covering gameplay mechanics, physics, level design, and player systems.', tech: ['Unity', 'C#', 'Game Dev'] },
    ],
  },
  {
    title: 'Home Automation & IoT',
    accent: '#f59e0b',
    items: [
      { name: 'Home Automation Monorepo', desc: 'Multi-project repository spanning Arduino-based fan controllers, IoT lighting bridges, and automation bots — applying consistent tooling across a diverse hardware/software portfolio.', tech: ['Arduino', 'IoT', 'Monorepo'] },
    ],
  },
  {
    title: 'Security, Surveillance & Data Viz',
    accent: '#06b6d4',
    items: [
      { name: 'Hikvision Device Bridge', desc: 'Integration bridge for Hikvision surveillance hardware alongside a real-time access-control log monitoring tool.', tech: ['Integration', 'Security'] },
      { name: '3D Family Tree Visualization', desc: 'Interactive 3D genealogy visualization tool for exploring multi-generational family relationships.', tech: ['Data Viz', '3D'] },
    ],
  },
];

function CategoryCard({ cat, index }: { cat: typeof categories[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-40px' }}
      className="apple-card-flat overflow-hidden"
      style={{ borderColor: `${cat.accent}20` }}
    >
      <div
        className="px-4 py-3 flex items-center gap-3"
        style={{ borderBottom: '1px solid var(--color-border)', background: `${cat.accent}06` }}
      >
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.accent }} />
        <span className="text-[10px] font-bold tracking-[0.12em] uppercase" style={{ color: cat.accent }}>
          {cat.title}
        </span>
      </div>
      <div className="p-4 space-y-3">
        {cat.items.map((item, i) => (
          <div key={i}>
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-semibold" style={{ color: 'var(--color-foreground)' }}>
                {item.name}
              </span>
            </div>
            <p className="text-[10px] leading-relaxed mt-0.5 mb-1.5" style={{ color: 'var(--color-muted)' }}>
              {item.desc}
            </p>
            <div className="flex flex-wrap gap-1">
              {item.tech.map((t) => (
                <span
                  key={t}
                  className="text-[7px] font-semibold px-1.5 py-0.5 rounded-sm uppercase tracking-[0.05em]"
                  style={{ backgroundColor: `${cat.accent}12`, color: cat.accent }}
                >
                  {t}
                </span>
              ))}
            </div>
            {i < cat.items.length - 1 && (
              <div className="mt-3" style={{ borderBottom: '1px solid var(--color-border)' }} />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function PersonalProjects() {
  const { accent } = useTheme();

  return (
    <section className="section-grid relative w-full pt-20 md:pt-24 pb-12 md:pb-16 bg-background vintage-frame">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[10%] left-[-5%] h-[500px] w-[500px] rounded-full blur-[250px]"
          style={{ background: accent, opacity: 0.02 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-8"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-[2px] w-8 rounded-full origin-left"
            style={{ background: accent }}
          />
          <span className="apple-eyebrow">Personal</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          <div className="md:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="apple-heading-compact"
            >
              Personal Projects &{' '}
              <span className="font-bold" style={{ color: accent }}>
                Open Source.
              </span>
            </motion.h2>
          </div>
          <div className="md:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="apple-subtitle text-sm leading-relaxed"
            >
              Product-minded, full-stack engineering beyond the day job — spanning
              web, desktop, mobile, embedded, and game systems, applying the same
              reliability habits used in professional backend work.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.title} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
