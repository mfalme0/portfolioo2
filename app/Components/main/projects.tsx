'use client';

import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useTheme } from '../../Context/theme';

const projects = [
  {
    title: 'In-House ERP',
    subtitle: 'Steadfast Academy',
    category: 'Full-Stack',
    period: '2024–2025',
    description: 'Designed and shipped a full-stack ERP application end-to-end — from requirements through deployment — consolidating student records, attendance, finance, and communication workflows, with notification and messaging capabilities serving the entire institution.',
    highlights: ['Notification delivery (push, in-app)', 'Multi-channel messaging', 'Student records & finance', 'Real-time chat subsystem'],
    link: null,
  },
  {
    title: 'Notification & Auth Infrastructure',
    subtitle: 'Steadfast Academy',
    category: 'Backend',
    period: '2025',
    description: 'Designed and implemented real-time notification delivery (push, in-app) and authentication (password + biometric) subsystems within the ERP mobile and web platform, serving hundreds of daily active users.',
    highlights: ['Push & in-app notifications', 'Password + biometric auth', 'Channel fallback logic', 'Event-driven delivery'],
    link: null,
  },
  {
    title: 'BetterFarm',
    subtitle: 'AgriTech Platform',
    category: 'Cloud-Native',
    period: '2024',
    description: 'Lead architect for a cloud-native backend system on Azure; integrated real-time data pipelines and deployed scalable backend services using high-availability design principles for agricultural optimisation.',
    highlights: ['Azure cloud-native', 'Real-time data pipelines', 'High-availability design', 'Scalable microservices'],
    link: 'https://github.com/mfalme0/betterFarm',
  },
];

function ProjectCard({ project, index, accent }: { project: typeof projects[0]; index: number; accent: string }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-60px' }}
      className="group cursor-default"
    >
      <div className="apple-card-flat overflow-hidden p-5 md:p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[9px] font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--color-muted)' }}>
                {project.period}
              </span>
              <span className="apple-tag text-[8px]">{project.category}</span>
            </div>
            <h3 className="text-xl font-semibold tracking-tight mt-1" style={{ color: 'var(--color-foreground)' }}>
              {project.title}
            </h3>
            <span className="text-[11px] font-medium" style={{ color: accent }}>
              {project.subtitle}
            </span>
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="block transition-all duration-300 hover:opacity-60"
              aria-label={`View ${project.title} source`}
            >
              <FiArrowUpRight className="text-lg" style={{ color: 'var(--color-muted)' }} />
            </a>
          )}
        </div>

        <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--color-muted)' }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
          {project.highlights.map((h) => (
            <span
              key={h}
              className="text-[8px] font-semibold px-2.5 py-1 rounded-full tracking-[0.05em] uppercase"
              style={{
                backgroundColor: `${accent}0a`,
                color: accent,
              }}
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const { accent } = useTheme();

  return (
    <section className="section-grid relative w-full pt-20 md:pt-24 pb-12 md:pb-16 bg-background vintage-frame">
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
          <span className="apple-eyebrow">Professional</span>
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
              Selected{' '}
              <span className="font-bold" style={{ color: accent }}>
                Projects.
              </span>
            </motion.h2>
          </div>
          <div className="md:col-span-5 md:col-start-7">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="apple-subtitle text-sm"
            >
              Production systems and platforms I&apos;ve architected and delivered —
              from requirements through deployment.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} accent={accent} />
          ))}
        </div>
      </div>
    </section>
  );
}
