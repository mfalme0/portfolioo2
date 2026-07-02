'use client';

import React from 'react';
import { FaPython, FaJs, FaReact, FaNodeJs } from 'react-icons/fa';
import { SiFlutter, SiKotlin, SiNextdotjs, SiCplusplus, SiTypescript } from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { motion } from 'framer-motion';
import { useTheme } from '../../Context/theme';

const languages = [
  { name: 'JavaScript', icon: <FaJs />, proficiency: 90 },
  { name: 'TypeScript', icon: <SiTypescript />, proficiency: 88 },
  { name: 'React', icon: <FaReact />, proficiency: 90 },
  { name: 'Next.js', icon: <SiNextdotjs />, proficiency: 85 },
  { name: 'Node.js', icon: <FaNodeJs />, proficiency: 85 },
  { name: 'C#', icon: <TbBrandCSharp />, proficiency: 80 },
  { name: 'Python', icon: <FaPython />, proficiency: 65 },
  { name: 'Flutter', icon: <SiFlutter />, proficiency: 75 },
  { name: 'Kotlin', icon: <SiKotlin />, proficiency: 70 },
  { name: 'C++', icon: <SiCplusplus />, proficiency: 75 },
];

const floatDelays = ['float-delay-1', 'float-delay-2', 'float-delay-3', 'float-delay-4', 'float-delay-5',
  'float-delay-6', 'float-delay-7', 'float-delay-8', 'float-delay-9', 'float-delay-10'];

function LangRow({ lang, index, accent }: { lang: typeof languages[0]; index: number; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -15 : 15 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-40px' }}
      style={{ borderBottom: '1px solid var(--color-border)' }}
      className={`flex items-center gap-4 py-2.5 min-w-0 ${floatDelays[index % floatDelays.length]}`}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-110"
        style={{
          backgroundColor: `${accent}08`,
          color: accent,
        }}
      >
        <span className="text-xs">{lang.icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium" style={{ color: 'var(--color-foreground)' }}>
            {lang.name}
          </span>
          <span className="text-[10px] font-medium tabular-nums" style={{ color: 'var(--color-muted)' }}>
            {lang.proficiency}%
          </span>
        </div>
        <div className="h-1 w-full rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
          <motion.div
            initial={{ width: '0%' }}
            whileInView={{ width: `${lang.proficiency}%` }}
            transition={{ duration: 1, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="h-full rounded-full transition-all duration-300"
            style={{ backgroundColor: accent }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function ProgrammingLanguages() {
  const { accent } = useTheme();

  return (
    <section className="section-grid relative w-full pt-20 md:pt-24 pb-12 md:pb-16 bg-background vintage-frame" id="languages">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-[10%] left-[-5%] h-[500px] w-[500px] rounded-full blur-[250px]"
          style={{ background: accent, opacity: 0.025 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-10"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-[2px] w-8 rounded-full origin-left"
            style={{ background: accent }}
          />
          <span className="apple-eyebrow">Languages</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
          <div className="md:col-span-6">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="apple-heading-compact"
            >
              Stack{' '}
              <span className="font-bold" style={{ color: accent }}>
                Fluency.
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
              Proficiency across my primary languages and frameworks. Depth over breadth — every tool here is production-ready.
            </motion.p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="apple-card-flat p-4 md:p-5">
            {languages.map((lang, i) => (
              <LangRow key={lang.name} lang={lang} index={i} accent={accent} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
