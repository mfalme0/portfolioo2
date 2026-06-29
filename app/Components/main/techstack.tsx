'use client';

import React, { useRef } from 'react';
import { SiMacos, SiAndroid, SiIos, SiLinux, SiProxmox } from 'react-icons/si';
import { FaAws, FaDocker, FaFigma } from 'react-icons/fa';
import { DiMongodb } from 'react-icons/di';
import { RiFirebaseFill } from 'react-icons/ri';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30 * (index % 2 === 0 ? 1 : -1), -30 * (index % 2 === 0 ? 1 : -1)]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 3 : -3, index % 2 === 0 ? -3 : 3]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-50px' }}
      style={{ y, rotateX }}
      className={`group cursor-default animate-float-glow ${floatDelays[index % floatDelays.length]}`}
    >
      <div
        className="apple-card-flat apple-card-glow p-5 flex flex-col items-center text-center gap-3 transition-all duration-300 group-hover:border-[var(--border-hover)] relative"
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-300 group-hover:scale-110"
          style={{
            backgroundColor: `${accent}08`,
            color: accent,
          }}
        >
          {tech.icon}
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[10px] font-semibold tracking-[0.06em]" style={{ color: 'var(--color-foreground)' }}>
            {tech.name}
          </span>
          <span className="text-[8px] font-medium tracking-[0.1em] uppercase" style={{ color: 'var(--color-muted)' }}>
            {tech.area}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function TechStack() {
  const { accent } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  return (
    <section ref={sectionRef} className="relative w-full py-32 md:py-44 bg-background overflow-hidden vintage-frame" id="techstack">
      {/* Parallax background glow */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[10%] right-[0%] h-[600px] w-[600px] rounded-full blur-[300px]"
          style={{ background: accent, opacity: 0.03 }}
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-[2px] w-8 rounded-full origin-left"
            style={{ background: accent }}
          />
          <span className="apple-eyebrow">Infrastructure</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-6">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="apple-heading"
            >
              My Tech<br />
              <span className="font-semibold" style={{ color: accent }}>
                Environment.
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
              The platforms and tools I work with daily — from bare metal to cloud.
              Every environment, optimised for performance.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 perspective-[1000px]">
          {technologies.map((tech, i) => (
            <TechItem key={tech.name} tech={tech} index={i} accent={accent} />
          ))}
        </div>
      </div>
    </section>
  );
}
