'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import project1 from '../Images/better.jpeg';
import project3 from '../Images/ndai.jpeg';
import project4 from '../Images/archie.jpeg';
import ganji from '../Images/ganji.png';
import { FiGithub, FiArrowUpRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useTheme } from '../../Context/theme';

const categories = ['ALL', 'APP_MOBILE', 'APP_FINTECH', 'WEB_SYSTEM', 'WEB_SECURITY'] as const;
type Category = (typeof categories)[number];

const projects = [
  { title: 'Better Farm', subtitle: 'AI-Powered Agriculture',
    description: 'Farming AI assistant with specialised neural-chat architecture for agricultural optimisation. Real-time crop insights, pest detection, and yield prediction.',
    image: project1, category: 'APP_MOBILE' as Category, github: 'https://github.com/mfalme0/betterFarm' },
  { title: 'Ganji', subtitle: 'Financial Ledger System',
    description: 'High-fidelity expense tracking and asset management platform. Real-time reconciliation, multi-account support, and analytics dashboards.',
    image: ganji, category: 'APP_FINTECH' as Category, github: 'https://github.com/mfalme0/ganji' },
  { title: 'Ndai', subtitle: 'Vehicle Management',
    description: 'Comprehensive logistics monitoring suite. Fleet tracking, maintenance scheduling, driver management, and operational analytics.',
    image: project3, category: 'WEB_SYSTEM' as Category, github: 'https://github.com/mfalme0/ndai.com' },
  { title: 'Archie', subtitle: 'Secure File Archival',
    description: 'High-security file archival protocol with distributed retrieval. End-to-end encryption, version control, and granular access policies.',
    image: project4, category: 'WEB_SECURITY' as Category, github: 'https://github.com/mfalme0/Archiewebapp' },
];

function ProjectCard({ project, index, accent }: { project: typeof projects[0]; index: number; accent: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-80px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group cursor-default"
    >
      <div className="apple-card-flat overflow-hidden">
        {/* Image container */}
        <div className="relative h-36 md:h-40 w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            loading="lazy"
            className="object-cover transition-all duration-700 ease-out"
            style={{
              filter: hovered ? 'none' : 'grayscale(0.4) brightness(0.85)',
              transform: hovered ? 'scale(1.03)' : 'scale(1)',
            }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Overlay gradient */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: `linear-gradient(180deg, transparent 40%, var(--bg) 100%)`,
            }}
          />
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="apple-tag-subtle text-[9px]">
              {project.category.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="text-[10px] font-semibold tracking-[0.05em] uppercase mb-1 block" style={{ color: accent }}>
                {project.subtitle}
              </span>
              <h3 className="text-lg font-semibold tracking-tight" style={{ color: 'var(--color-foreground)' }}>
                {project.title}
              </h3>
            </div>
            <motion.div
              animate={{ x: hovered ? 2 : 0, y: hovered ? -2 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiArrowUpRight className="text-base" style={{ color: 'var(--color-muted)' }} />
            </motion.div>
          </div>
          <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: 'var(--color-muted)' }}>
            {project.description}
          </p>

          {/* Footer */}
          <div className="flex items-center gap-6 pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
            <a href={project.github} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-xs font-medium transition-all hover:opacity-60"
              style={{ color: 'var(--color-foreground)' }}>
              <FiGithub className="text-sm" /> View Source
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const { accent } = useTheme();
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');
  const filtered = activeCategory === 'ALL' ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="section-grid relative w-full pt-20 md:pt-24 pb-12 md:pb-16 bg-background vintage-frame" id="projects">
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
          <span className="apple-eyebrow">Projects</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
          <div className="md:col-span-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="apple-heading-compact"
            >
              What I&apos;ve{' '}
              <span className="font-bold" style={{ color: accent }}>
                Built.
              </span>
            </motion.h2>
          </div>
          <div className="md:col-span-5 md:col-start-7">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="apple-subtitle"
            >
              Production applications spanning fintech, agriculture, security, and
              logistics. Every project ships with clean architecture and a strong
              focus on user experience.
            </motion.p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 text-[10px] font-semibold tracking-[0.06em] uppercase rounded-full border transition-all duration-300 active:scale-[0.97]"
              style={{
                backgroundColor: activeCategory === cat ? accent : 'transparent',
                borderColor: activeCategory === cat ? accent : 'var(--color-border)',
                color: activeCategory === cat ? '#ffffff' : 'var(--color-muted)',
              }}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} accent={accent} />
          ))}
        </div>
      </div>
    </section>
  );
}
