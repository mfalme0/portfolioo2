'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../Context/theme';

const experiences = [
  {
    company: 'Steadfast Academy',
    role: 'Engineering Team Lead & Head of IT',
    duration: 'APR 2025 — Present',
    location: 'Nairobi, Kenya',
    highlights: [
      'Designed and built notification delivery capabilities within an in-house ERP system — real-time push, in-app alerts, and multi-channel messaging across mobile and web, including event triggers, delivery confirmation, and channel fallback logic.',
      'Implemented authentication flows including password-based login and on-device biometric verification, securing access to sensitive institutional data.',
      'Built a real-time chat and messaging subsystem handling message delivery, presence, and read-receipt patterns at institutional scale.',
      'Architected and developed a full-stack ERP system consolidating student records, attendance, finance, and communication workflows.',
      'Wrote Bash automation scripts and CI/CD pipelines that reduced deployment errors by 45% and reclaimed 15+ hours per week.',
      'Managed Azure cloud infrastructure end-to-end, cutting cloud operating costs by 20%.',
      'Delivered 99.9% uptime through proactive monitoring, scheduled maintenance, and disciplined incident response with root-cause analysis.',
      'Deployed and maintained containerised services using Docker and Kubernetes, improving uptime by 50% and reducing latency by 30%.',
      'Designed a high-availability storage architecture on TrueNAS supporting 10TB+ of institutional data.',
      'Led a cross-functional engineering team; specced, built, and maintained on-premises server and network infrastructure from the ground up.',
    ],
  },
  {
    company: 'Gituamba Girls',
    role: 'Software Consultant',
    duration: 'JAN 2024 — MAR 2025',
    location: 'Kenya',
    highlights: [
      'Designed and built a full-stack school management system as a solo developer (C#, Python), covering student records, finance, attendance, and academic reporting — owning delivery end-to-end from design through deployment.',
      'Developed RESTful APIs and database schemas (PostgreSQL/MySQL) serving daily school operations.',
      'Wrote automation scripts that reduced manual administrative work by 4 hours/week.',
      'Managed deployment and maintenance on cloud/on-prem infrastructure end-to-end.',
    ],
  },
  {
    company: 'VisionFund Kenya (MicroFinance)',
    role: 'Software Engineering Intern',
    duration: 'OCT 2023 — DEC 2023',
    location: 'Kenya',
    highlights: [
      'Built internal automation tools in C# and Node.js and refactored MySQL database schemas, cutting query response times by 15% on critical financial reporting systems.',
      'Contributed to backend maintenance and debugging on live production financial systems, developing habits of careful, low-risk, well-documented changes within a regulated, high-accountability environment.',
    ],
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-40px' }}
      className="flex gap-4 md:gap-6"
    >
      <div className="flex flex-col items-center pt-1 shrink-0">
        <TimelineDot active={expanded} accent={accent} />
        {index < experiences.length - 1 && <TimelineBar />}
      </div>
      <div className="flex-1 min-w-0 pb-6">
        <div
          onClick={onClick}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
          role="button"
          tabIndex={0}
          aria-expanded={expanded}
          className="apple-card-flat p-4 cursor-pointer group transition-all duration-300"
          style={{
            borderColor: expanded ? 'var(--border-hover)' : undefined,
          }}
        >
          <div className="flex items-start justify-between mb-2">
            <span className="text-[9px] font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--color-muted)' }}>
              {exp.duration}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-medium" style={{ color: 'var(--color-muted)' }}>
                {exp.location}
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
            <ul className="space-y-2">
              {exp.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  <span className="mt-[5px] w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: `${accent}60` }} />
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function WorkExperience() {
  const { accent } = useTheme();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section className="section-grid relative w-full pt-20 md:pt-24 pb-12 md:pb-16 bg-background overflow-x-hidden vintage-frame">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[30%] right-[-5%] h-[450px] w-[450px] rounded-full blur-[250px]"
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
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-[2px] w-8 rounded-full origin-left"
            style={{ background: accent }}
          />
          <span className="apple-eyebrow">Experience</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          <div className="md:col-span-6">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="apple-heading-compact"
            >
              Production{' '}
              <span className="font-bold" style={{ color: accent }}>
                Experience.
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
              From education technology to microfinance — building and operating
              production backend systems at scale.
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
