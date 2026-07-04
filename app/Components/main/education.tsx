'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../Context/theme';
import { FiBookOpen, FiCalendar, FiMapPin } from 'react-icons/fi';

const modules = [
  'Data Structures & Algorithms',
  'Database Management Systems',
  'Network Security',
  'Operating Systems',
  'Computer Architecture',
];

export default function Education() {
  const { accent } = useTheme();

  return (
    <section className="section-grid relative w-full pt-20 md:pt-24 pb-12 md:pb-16 bg-background vintage-frame">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[20%] left-[10%] h-[400px] w-[400px] rounded-full blur-[200px]"
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
          <span className="apple-eyebrow">Education</span>
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
              Academic{' '}
              <span className="font-bold" style={{ color: accent }}>
                Foundation.
              </span>
            </motion.h2>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="apple-card-flat p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FiBookOpen className="text-sm" style={{ color: accent }} />
                  <span className="text-xs font-bold tracking-[0.08em] uppercase" style={{ color: accent }}>
                    B.Sc. Computer Science
                  </span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight" style={{ color: 'var(--color-foreground)' }}>
                  Umma University
                </h3>
              </div>
              <div className="flex flex-col gap-1.5 shrink-0">
                <div className="flex items-center gap-2 text-[10px] font-medium" style={{ color: 'var(--color-muted)' }}>
                  <FiCalendar className="text-[10px]" />
                  2021 – 2024
                </div>
                <div className="flex items-center gap-2 text-[10px] font-medium" style={{ color: 'var(--color-muted)' }}>
                  <FiMapPin className="text-[10px]" />
                  Nairobi, Kenya
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)' }} className="pt-5">
              <span className="text-[8px] font-bold tracking-[0.15em] uppercase mb-3 block" style={{ color: 'var(--color-muted)' }}>
                Key Modules
              </span>
              <div className="flex flex-wrap gap-2">
                {modules.map((mod) => (
                  <span
                    key={mod}
                    className="text-[9px] font-medium px-3 py-1.5 rounded-full tracking-[0.03em]"
                    style={{
                      backgroundColor: `${accent}08`,
                      color: 'var(--color-foreground)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    {mod}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
