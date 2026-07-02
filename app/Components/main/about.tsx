'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../Context/theme';

const domains = [
  {
    title: 'Frontend Engineering',
    desc: 'React • Next.js • Tailwind • TypeScript',
    detail: 'Pixel-perfect UIs with obsessive performance tuning. Motion that feels alive. Every component, every transition — intentional.',
    tools: ['React', 'Next.js', 'Tailwind', 'TypeScript', 'Framer'],
  },
  {
    title: 'Backend Systems',
    desc: 'Node.js • C# • .NET • Python',
    detail: 'APIs and services built for scale — clean architecture, reliable contracts. REST, GraphQL, and everything in between.',
    tools: ['Node.js', 'C#', '.NET', 'Python', 'PostgreSQL'],
  },
  {
    title: 'Mobile & Cross-Platform',
    desc: 'Kotlin • Flutter • React Native',
    detail: 'Native-feel experiences that are fast, smooth, and genuinely usable. From zero to app store — full lifecycle delivery.',
    tools: ['Kotlin', 'Flutter', 'React Native', 'Swift'],
  },
  {
    title: 'Infrastructure & DevOps',
    desc: 'Docker • Proxmox • Cloud • CI/CD',
    detail: 'Self-hosted, containerised, automated. I own the stack end-to-end, from bare metal to production deployment.',
    tools: ['Docker', 'Proxmox', 'AWS', 'Linux', 'CI/CD'],
  },
];

const floatDelays = ['float-delay-1', 'float-delay-2', 'float-delay-3', 'float-delay-4'];

function DomainCard({ domain, index, accent }: { domain: typeof domains[0]; index: number; accent: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-60px' }}
      onClick={() => setExpanded(!expanded)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(!expanded); } }}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      className={`apple-card-flat p-5 cursor-pointer group ${floatDelays[index]}`}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="apple-eyebrow-accent" style={{ color: accent }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <motion.span
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-lg font-light"
          style={{ color: 'var(--color-muted)' }}
        >
          +
        </motion.span>
      </div>
      <h3
        className="text-lg font-semibold tracking-tight mb-1 transition-colors duration-300"
        style={{ color: 'var(--color-foreground)' }}
      >
        {domain.title}
      </h3>
      <p className="text-sm font-light leading-relaxed mb-3" style={{ color: 'var(--color-muted)' }}>
        {domain.desc}
      </p>
      <motion.p
        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden text-sm leading-relaxed"
        style={{ color: 'var(--color-muted)' }}
      >
        {domain.detail}
      </motion.p>
      {expanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap gap-2 pt-4 mt-4"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          {domain.tools.map((tool) => (
            <span
              key={tool}
              className="text-[10px] font-semibold px-3 py-1 rounded-full tracking-[0.03em]"
              style={{
                backgroundColor: `${accent}0a`,
                color: accent,
              }}
            >
              {tool}
            </span>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function AboutMe() {
  const { accent } = useTheme();

  return (
    <section className="section-grid relative w-full pt-20 md:pt-24 pb-12 md:pb-16 bg-background vintage-frame" id="about-me">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[20%] left-[-5%] h-[500px] w-[500px] rounded-full blur-[250px]"
          style={{ background: accent, opacity: 0.02 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
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
          <span className="apple-eyebrow">About</span>
        </motion.div>

        <div className="mb-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="apple-heading-compact"
            >
              Engineering at{' '}
              <span className="font-bold" style={{ color: accent }}>
                Every Layer.
              </span>
            </motion.h2>
          </div>
          <div className="md:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="apple-subtitle leading-relaxed"
            >
              I don&apos;t just write code — I architect complete systems. From
              pixel-perfect React interfaces to containerised backend services
              deployed on self-hosted infrastructure, every layer is intentional.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {domains.map((domain, i) => (
            <DomainCard key={i} domain={domain} index={i} accent={accent} />
          ))}
        </div>
      </div>
    </section>
  );
}
