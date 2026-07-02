'use client';

import React from 'react';
import { SiMacos, SiAndroid, SiIos, SiLinux, SiProxmox } from 'react-icons/si';
import { FaAws, FaDocker, FaFigma } from 'react-icons/fa';
import { DiMongodb } from 'react-icons/di';
import { RiFirebaseFill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { useTheme } from '../../Context/theme';

const technologies = [
  { name: 'MacOS', icon: <SiMacos />, area: 'Platform' },
  { name: 'iOS', icon: <SiIos />, area: 'Mobile' },
  { name: 'Android', icon: <SiAndroid />, area: 'Mobile' },
  { name: 'Linux', icon: <SiLinux />, area: 'Platform' },
  { name: 'AWS', icon: <FaAws />, area: 'Cloud' },
  { name: 'MongoDB', icon: <DiMongodb />, area: 'Data' },
  { name: 'Firebase', icon: <RiFirebaseFill />, area: 'Backend' },
  { name: 'Docker', icon: <FaDocker />, area: 'DevOps' },
  { name: 'Proxmox', icon: <SiProxmox />, area: 'Infra' },
  { name: 'Figma', icon: <FaFigma />, area: 'Design' },
];

const floatDelays = ['float-delay-1', 'float-delay-2', 'float-delay-3', 'float-delay-4', 'float-delay-5',
  'float-delay-6', 'float-delay-7', 'float-delay-8', 'float-delay-9', 'float-delay-10'];

function TechItem({ tech, index, accent }: { tech: typeof technologies[0]; index: number; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-40px' }}
      className={`group cursor-default animate-float-glow ${floatDelays[index % floatDelays.length]}`}
    >
      <div
        className="apple-card-flat apple-card-glow p-3 flex flex-col items-center text-center gap-2 transition-all duration-300 group-hover:border-[var(--border-hover)] relative"
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-base transition-all duration-300 group-hover:scale-110"
          style={{
            backgroundColor: `${accent}08`,
            color: accent,
          }}
        >
          {tech.icon}
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[9px] font-semibold tracking-[0.06em]" style={{ color: 'var(--color-foreground)' }}>
            {tech.name}
          </span>
          <span className="text-[7px] font-medium tracking-[0.1em] uppercase" style={{ color: 'var(--color-muted)' }}>
            {tech.area}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function TechStack() {
  const { accent } = useTheme();

  return (
    <section className="section-grid relative w-full pt-20 md:pt-24 pb-12 md:pb-16 bg-background vintage-frame" id="techstack">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[10%] right-[0%] h-[600px] w-[600px] rounded-full blur-[300px]"
          style={{ background: accent, opacity: 0.03 }}
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
          <span className="apple-eyebrow">Infrastructure</span>
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
              My Tech{' '}
              <span className="font-bold" style={{ color: accent }}>
                Environment.
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
              The platforms and tools I work with daily — from bare metal to cloud.
              Every environment, optimised for performance.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {technologies.map((tech, i) => (
            <TechItem key={tech.name} tech={tech} index={i} accent={accent} />
          ))}
        </div>
      </div>
    </section>
  );
}
