'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '../Context/theme';
import { BsGithub, BsLinkedin, BsTwitterX, BsInstagram } from 'react-icons/bs';


const items = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind',
  'Framer Motion', 'Docker', 'PostgreSQL', 'C#', 'Kotlin',
  'Flutter', 'AWS', 'Firebase', 'Prisma', 'GraphQL',
  'React Native', '.NET', 'Python', 'MongoDB', 'Linux',
];

const socials = [
  { icon: <BsGithub />, url: 'https://github.com/mfalme0', label: 'GitHub' },
  { icon: <BsLinkedin />, url: 'https://linkedin.com/in/joseph-g-471678208/', label: 'LinkedIn' },
  { icon: <BsTwitterX />, url: 'https://x.com/joemfalme001', label: 'X' },
  { icon: <BsInstagram />, url: 'https://instagram.com/mfalme.01/', label: 'Instagram' },
];

const footerLinks = [
  { label: 'GitHub', href: 'https://github.com/mfalme0' },
  { label: 'Gear', href: '/gear' },
  { label: 'LAN', href: '/LAN' },
];

export default function End() {
  const { accent } = useTheme();
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto">
      {/* Hex grid background */}
      <div className="rog-hex-grid" />

      {/* Marquee strip */}
      <div
        className="w-full overflow-hidden py-6 border-y border-(--color-border) flex-shrink-0 relative"
        style={{ background: `linear-gradient(180deg, transparent 0%, ${accent}02 50%, transparent 100%)` }}
      >
        <motion.div
          className="flex gap-12"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
        >
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="text-[11px] font-bold tracking-[0.15em] uppercase whitespace-nowrap"
              style={{
                color: `${accent}`,
                opacity: 0.35 + (i % 3) * 0.15,
              }}
            >
              <span className="mr-3 opacity-30">//</span>
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <section className="relative w-full py-20 md:py-28 bg-background overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-[10%] left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full blur-[250px]"
            style={{ background: accent, opacity: 0.03 }}
          />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{
              background: `radial-gradient(ellipse at 50% 100%, ${accent} 0%, transparent 70%)`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-8 md:px-14 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: accent }} />
            <span className="text-[8px] font-bold tracking-[0.3em] uppercase" style={{ color: `${accent}99` }}>
              Contact
            </span>
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: accent }} />
          </div>

          <h2 className="text-[clamp(2.8rem,8vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.03em] mb-6" style={{ color: 'var(--color-foreground)' }}>
            DEPLOY<br />
            <span className="relative" style={{ color: accent }}>
              CONNECTION
              <span className="absolute -bottom-[2px] left-0 right-0 h-[3px] rounded-full"
                style={{ background: `linear-gradient(90deg, ${accent}, ${accent}40, transparent)` }}
              />
            </span>
          </h2>

          <p className="text-sm leading-relaxed mx-auto mb-12 max-w-lg" style={{ color: 'var(--color-muted)' }}>
            Whether it&apos;s a full-scale application, a design system, or
            architectural guidance — let&apos;s build something together.
          </p>

          {/* Contact form */}
          <form
            action="https://formspree.io/f/xvgonqog"
            method="POST"
            className="max-w-md mx-auto text-left space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-4 py-3 text-xs text-zinc-300 placeholder-zinc-600 font-mono tracking-wider focus:outline-none focus:border-zinc-600 transition-colors"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-4 py-3 text-xs text-zinc-300 placeholder-zinc-600 font-mono tracking-wider focus:outline-none focus:border-zinc-600 transition-colors"
              />
            </div>
            <textarea
              name="message"
              placeholder="Message"
              required
              rows={4}
              className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg px-4 py-3 text-xs text-zinc-300 placeholder-zinc-600 font-mono tracking-wider focus:outline-none focus:border-zinc-600 transition-colors resize-none"
            />
            <button
              type="submit"
              className="rog-btn-primary w-full rounded-lg px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
            >
              Send Message
            </button>
            <p className="text-[9px] font-mono text-zinc-700 text-center">
              or email directly at{' '}
              <a href="mailto:josephgitauc@gmail.com" className="text-zinc-500 hover:text-zinc-400 underline underline-offset-2">
                josephgitauc@gmail.com
              </a>
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative w-full bg-background flex-shrink-0" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.015]"
            style={{
              background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${accent} 2px, ${accent} 3px)`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-14 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke={accent} strokeWidth="1.5" fill={`${accent}15`} />
                  <text x="12" y="14" textAnchor="middle" fill={accent} fontSize="7" fontWeight="bold" fontFamily="monospace">R</text>
                </svg>
                <span className="text-sm font-extrabold tracking-tight" style={{ color: accent }}>
                  J.GITAU
                </span>
              </div>
              <p className="text-xs font-medium leading-relaxed max-w-xs" style={{ color: 'var(--color-muted)' }}>
                Full-stack engineer building production-grade software across the entire technology stack.
              </p>
              <div className="flex items-center gap-4 mt-2">
                {socials.map((s, i) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block transition-all duration-300 hover:-translate-y-0.5"
                    style={{ color: 'var(--color-muted)' }}
                    aria-label={s.label}
                  >
                    <span className="text-sm block" style={{ color: 'var(--color-muted)' }}>{s.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-[8px] font-bold tracking-[0.25em] uppercase" style={{ color: `${accent}80` }}>Explore</span>
              <div className="flex flex-col gap-2.5">
                {footerLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-xs font-medium transition-all duration-300 hover:text-accent"
                    style={{ color: 'var(--color-foreground)' }}
                  >
                    <span className="mr-2 opacity-30" style={{ color: accent }}>~</span>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-[8px] font-bold tracking-[0.25em] uppercase" style={{ color: `${accent}80` }}>Connect</span>
              <div className="flex flex-col gap-2.5">
                <a href="https://github.com/mfalme0" target="_blank" rel="noreferrer" className="text-xs font-medium transition-all duration-300 hover:text-accent" style={{ color: 'var(--color-foreground)' }}>
                  <span className="mr-2 opacity-30" style={{ color: accent }}>~</span>GitHub
                </a>
                <a href="https://www.linkedin.com/in/josephgitauc/" target="_blank" rel="noreferrer" className="text-xs font-medium transition-all duration-300 hover:text-accent" style={{ color: 'var(--color-foreground)' }}>
                  <span className="mr-2 opacity-30" style={{ color: accent }}>~</span>LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="relative my-12 flex items-center gap-4">
            <div className="flex-1 h-[1px]"
              style={{ background: `linear-gradient(90deg, transparent, ${accent}30, transparent)` }}
            />
            <div className="flex items-center gap-4">
              <span className="text-[8px] font-bold tracking-[0.3em] uppercase" style={{ color: `${accent}50` }}>Craft</span>
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: `${accent}40` }} />
              <span className="text-[8px] font-bold tracking-[0.3em] uppercase" style={{ color: `${accent}50` }}>Code</span>
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: `${accent}40` }} />
              <span className="text-[8px] font-bold tracking-[0.3em] uppercase" style={{ color: `${accent}50` }}>Ship</span>
            </div>
            <div className="flex-1 h-[1px]"
              style={{ background: `linear-gradient(90deg, transparent, ${accent}30, transparent)` }}
            />
          </div>

          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid var(--color-border)' }}>
            <p className="text-[10px] font-medium" style={{ color: 'var(--color-muted)' }}>
              &copy; {year} Joseph Gitau
            </p>
            <div className="flex items-center gap-4">
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: `${accent}60` }}>Est. 2006</span>
              <div className="w-[1px] h-3" style={{ backgroundColor: 'var(--color-border)' }} />
              <span className="text-[10px] font-medium" style={{ color: 'var(--color-muted)' }}>
                Nairobi
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
