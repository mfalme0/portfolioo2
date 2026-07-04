'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../Context/theme';

const skillGroups = [
  {
    title: 'Languages',
    items: [
      { name: 'C#', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'JavaScript / TypeScript', level: 88 },
      { name: 'C++', level: 70 },
      { name: 'Bash', level: 80 },
      { name: 'Kotlin', level: 65 },
      { name: 'Java (Spring Boot)', level: 60 },
    ],
  },
  {
    title: 'Backend & Data',
    items: [
      { name: 'PostgreSQL', level: 88 },
      { name: 'MySQL', level: 85 },
      { name: 'MongoDB', level: 75 },
      { name: 'Firebase', level: 70 },
      { name: 'API Development', level: 90 },
      { name: 'Schema Design', level: 85 },
      { name: 'Query Optimisation', level: 80 },
    ],
  },
  {
    title: 'Cloud & DevOps',
    items: [
      { name: 'Azure', level: 88 },
      { name: 'GCP', level: 60 },
      { name: 'Docker', level: 90 },
      { name: 'Kubernetes', level: 75 },
      { name: 'Proxmox', level: 80 },
      { name: 'CI/CD Pipelines', level: 85 },
    ],
  },
  {
    title: 'Reliability & Operations',
    items: [
      { name: 'Linux (Ubuntu/Debian)', level: 90 },
      { name: 'Incident Response', level: 85 },
      { name: 'Monitoring & Observability', level: 80 },
      { name: 'High-Availability Design', level: 82 },
      { name: 'Documentation & SOPs', level: 85 },
    ],
  },
  {
    title: 'Networking & Hardware',
    items: [
      { name: 'LAN/WAN', level: 80 },
      { name: 'VLAN & Switching', level: 75 },
      { name: 'Firewall Configuration', level: 78 },
      { name: 'Structured Cabling', level: 70 },
      { name: 'Server Hardware', level: 80 },
    ],
  },
  {
    title: 'Embedded & Cross-Platform',
    items: [
      { name: 'Arduino', level: 72 },
      { name: 'USB / Serial Protocols', level: 68 },
      { name: 'OpenRGB SDK', level: 65 },
      { name: 'Electron', level: 75 },
      { name: 'React Native', level: 78 },
      { name: 'Unity / Game Dev', level: 60 },
    ],
  },
];

function SkillBar({ name, level, index, accent }: { name: string; level: number; index: number; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-30px' }}
      className="flex items-center gap-3 py-1.5"
    >
      <span className="text-[10px] font-medium w-28 shrink-0 text-right" style={{ color: 'var(--color-muted)' }}>
        {name}
      </span>
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
        <motion.div
          initial={{ width: '0%' }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 0.8, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="h-full rounded-full"
          style={{ backgroundColor: accent }}
        />
      </div>
      <span className="text-[8px] font-semibold tabular-nums w-8 shrink-0" style={{ color: 'var(--color-muted)' }}>
        {level}%
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const { accent } = useTheme();

  return (
    <section className="section-grid relative w-full pt-20 md:pt-24 pb-12 md:pb-16 bg-background vintage-frame">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-[15%] right-[-5%] h-[500px] w-[500px] rounded-full blur-[250px]"
          style={{ background: accent, opacity: 0.025 }}
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
          <span className="apple-eyebrow">Technical Skills</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
          <div className="md:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="apple-heading-compact"
            >
              Full{' '}
              <span className="font-bold" style={{ color: accent }}>
                Toolbelt.
              </span>
            </motion.h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="apple-subtitle text-sm leading-relaxed"
            >
              Languages, platforms, and infrastructure I work with — from cloud
              down to microcontrollers and USB peripherals.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: '-40px' }}
              className="apple-card-flat p-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
                <span className="text-[9px] font-bold tracking-[0.12em] uppercase" style={{ color: accent }}>
                  {group.title}
                </span>
              </div>
              <div>
                {group.items.map((skill, i) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} accent={accent} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
