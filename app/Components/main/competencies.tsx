'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../Context/theme';

const competencies = [
  {
    title: 'Identity, Notification & Messaging',
    desc: 'Notification delivery services (push, in-app, multi-channel) · Authentication flows (password, biometric) · Real-time messaging & presence · Security signals & account lifecycle',
    detail: 'Designed and built notification delivery capabilities within an in-house ERP system, enabling real-time push notifications, in-app alerts, and multi-channel messaging across mobile and web. Implemented authentication flows including password-based login and on-device biometric verification. Built a real-time chat and messaging subsystem handling message delivery, presence, and read-receipt patterns at institutional scale.',
    tags: ['Push Notifications', 'In-App', 'Multi-Channel', 'Biometric Auth', 'Real-Time Messaging', 'Session Management'],
  },
  {
    title: 'Backend & Distributed Systems',
    desc: 'C#, Python, JavaScript/TypeScript, C++ · API & backend service development · Queue-based architectures · Scalable, high-availability service design',
    detail: 'Architected and developed full-stack ERP systems consolidating student records, attendance, finance, and communication workflows. Built RESTful APIs and database schemas (PostgreSQL/MySQL) serving daily operations. Developed internal automation tools and refactored database schemas cutting query response times by 15%.',
    tags: ['C#', 'Python', 'TypeScript', 'PostgreSQL', 'MySQL', 'MongoDB', 'REST APIs', 'Queue Architecture'],
  },
  {
    title: 'Cloud & DevOps',
    desc: 'Azure · Docker · Kubernetes · CI/CD pipelines · Bash automation · Proxmox · Resource & cost optimisation',
    detail: 'Managed Azure cloud infrastructure end-to-end, optimising resource allocation and cutting cloud operating costs by 20%. Wrote Bash automation scripts and CI/CD pipelines that reduced deployment errors by 45% and reclaimed 15+ hours per week. Deployed and maintained containerised services using Docker and Kubernetes, improving system uptime by 50% and reducing latency by 30%.',
    tags: ['Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Bash', 'Proxmox', 'Linux'],
  },
  {
    title: 'Reliability & Live-Site Operations',
    desc: 'Incident triage & escalation · Post-incident reviews · 99.9% uptime delivery · Monitoring & health checks · Enterprise-grade SLAs',
    detail: 'Delivered 99.9% uptime on mission-critical systems through proactive monitoring, scheduled maintenance, and disciplined, fully documented incident response — including root-cause analysis and follow-up action tracking after every incident. Designed a high-availability storage architecture on TrueNAS supporting 10TB+ of institutional data with redundancy and failover patterns.',
    tags: ['Incident Response', 'Monitoring', '99.9% Uptime', 'SLA', 'Root-Cause Analysis', 'High-Availability'],
  },
  {
    title: 'Systems Thinking Across the Stack',
    desc: 'Embedded/hardware-adjacent software · Cross-platform app development · Product-minded engineering · Real-time/interactive systems',
    detail: 'A wide personal project portfolio spanning media platforms, embedded/hardware-adjacent software (Arduino, USB & serial protocols, GPU firmware), mobile apps, and game development. Brings an AI-first mindset with a focus on reliability, observability, security, and continuous modernisation, thriving across cross-functional and cross-team engineering groups.',
    tags: ['Embedded', 'Arduino', 'Electron', 'React Native', 'Unity', 'IoT', 'Game Dev'],
  },
];

function CompetencyCard({ item, index, accent }: { item: typeof competencies[0]; index: number; accent: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-40px' }}
      onClick={() => setExpanded(!expanded)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(!expanded); } }}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      className="apple-card-flat p-5 cursor-pointer group"
      style={{
        borderColor: expanded ? 'var(--border-hover)' : undefined,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="apple-eyebrow-accent text-[9px]" style={{ color: accent }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="h-[1px] w-6" style={{ background: `linear-gradient(90deg, ${accent}60, transparent)` }} />
        </div>
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
        className="text-base font-semibold tracking-tight mb-1.5"
        style={{ color: 'var(--color-foreground)' }}
      >
        {item.title}
      </h3>
      <p className="text-xs leading-relaxed mb-2" style={{ color: 'var(--color-muted)' }}>
        {item.desc}
      </p>
      <motion.div
        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--color-muted)' }}>
          {item.detail}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[8px] font-semibold px-2.5 py-1 rounded-full tracking-[0.05em] uppercase"
              style={{
                backgroundColor: `${accent}0a`,
                color: accent,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Competencies() {
  const { accent } = useTheme();

  return (
    <section className="section-grid relative w-full pt-20 md:pt-24 pb-12 md:pb-16 bg-background vintage-frame">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[20%] right-[-5%] h-[500px] w-[500px] rounded-full blur-[250px]"
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
          <span className="apple-eyebrow">Core Competencies</span>
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
              Specialised{' '}
              <span className="font-bold" style={{ color: accent }}>
                Expertise.
              </span>
            </motion.h2>
          </div>
          <div className="md:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              viewport={{ once: true }}
              className="apple-subtitle leading-relaxed text-sm"
            >
              From identity-layer security to embedded systems — five core areas
              where I deliver production-grade engineering.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {competencies.map((item, i) => (
            <CompetencyCard key={i} item={item} index={i} accent={accent} />
          ))}
        </div>
      </div>
    </section>
  );
}
