'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../../Context/theme';

const experiences = [
  {
    company: 'SteadFast Academy',
    role: 'Head of IT',
    duration: 'APR 2025 — Present',
    description: 'Leading technological strategy and managing digital infrastructure. Automating workflows via internal tools and implementing DevOps practices across the institution.',
  },
  {
    company: 'Gituamba Girls',
    role: 'IT Consultant',
    duration: 'SEP 2024 — Present',
    description: 'Managing cybersecurity and network optimisation for a 500+ device environment. Security audits, infrastructure monitoring, and community-focused tech deployment.',
  },
  {
    company: 'VisionFund Kenya',
    role: 'Software Engineer',
    duration: 'OCT 2023 — DEC 2023',
    description: 'Architected microservice-based internal tools for loan processing. Migrated legacy systems to cloud-native architecture within a high-velocity financial environment.',
  },
  {
    company: 'IEBC',
    role: 'Data Clerk',
    duration: 'AUG 2023',
    description: 'Coordinated KIEMS voter lookup processes during national elections, maintaining 100% data retrieval accuracy across 200+ polling stations.',
  },
  {
    company: 'Tangible Air',
    role: 'Network Associate',
    duration: 'APR 2021 — AUG 2021',
    description: 'Network maintenance and technical support for ISP operations. Infrastructure upgrades and equipment management.',
  },
];

function TimelineDot({ active, accent }: { active: boolean; accent: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        animate={{ scale: active ? 1.3 : 1 }}
        transition={{ duration: 0.3 }}
        className="w-3 h-3 rounded-full border-2 transition-all duration-500 z-10"
        style={{
          backgroundColor: active ? accent : 'transparent',
          borderColor: active ? accent : 'var(--color-border)',
          boxShadow: active ? `0 0 12px ${accent}44` : 'none',
        }}
      />
    </div>
  );
}

function TimelineBar() {
  return (
    <div
      className="w-[1px] flex-1 min-h-[40px] mx-auto transition-all duration-500"
      style={{ backgroundColor: 'var(--color-border)' }}
    />
  );
}

function ExpCard({ exp, index, expanded, onClick, accent }: {
  exp: typeof experiences[0];
  index: number;
  expanded: boolean;
  onClick: () => void;
  accent: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const cardY = useTransform(scrollYProgress, [0, 1], [15, -15]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-60px' }}
      style={{ y: cardY }}
      className="flex gap-6"
    >
      <div className="flex flex-col items-center pt-1">
        <TimelineDot active={expanded} accent={accent} />
        {index < experiences.length - 1 && <TimelineBar />}
      </div>
      <div className="flex-1 pb-12">
        <div
          onClick={onClick}
          className="apple-card-flat p-6 cursor-pointer group transition-all duration-300"
          style={{
            borderColor: expanded ? 'var(--border-hover)' : undefined,
          }}
        >
          <div className="flex items-start justify-between mb-1">
            <span className="text-[9px] font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--color-muted)' }}>
              {exp.duration}
            </span>
            <motion.span
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-base font-light leading-none"
              style={{ color: 'var(--color-muted)' }}
            >
              +
            </motion.span>
          </div>
          <h3 className="text-sm font-semibold tracking-[0.03em] uppercase mb-0.5" style={{ color: accent }}>
            {exp.role}
          </h3>
          <h4 className="text-xl font-semibold tracking-tight mb-3" style={{ color: 'var(--color-foreground)' }}>
            {exp.company}
          </h4>
          <motion.div
            animate={{
              height: expanded ? 'auto' : 0,
              opacity: expanded ? 1 : 0,
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              {exp.description}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function WorkExperience() {
  const { accent } = useTheme();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  return (
    <section ref={sectionRef} className="relative w-full py-32 md:py-44 bg-background overflow-hidden" id="experience">
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[30%] right-[-5%] h-[450px] w-[450px] rounded-full blur-[250px]"
          style={{ background: accent, opacity: 0.02 }}
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="h-[2px] w-8 rounded-full" style={{ background: accent }} />
          <span className="apple-eyebrow">Experience</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-20">
          <div className="md:col-span-6">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="apple-heading"
            >
              Where I&apos;ve<br />
              <span className="font-semibold" style={{ color: accent }}>
                Made Impact.
              </span>
            </motion.h2>
          </div>
          <div className="md:col-span-5 md:col-start-7">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="apple-subtitle text-sm leading-relaxed"
            >
              From financial services to education — I&apos;ve delivered across
              industries. Each role sharpened my ability to ship reliable software
              in high-stakes environments.
            </motion.p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, i) => (
            <ExpCard
              key={i}
              exp={exp}
              index={i}
              expanded={expandedIndex === i}
              onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              accent={accent}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
