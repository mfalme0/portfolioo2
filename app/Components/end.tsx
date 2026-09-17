'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '../Context/theme';
import { usePerformance } from '../Context/performance';
import { BsGithub, BsLinkedin, BsTwitterX, BsInstagram } from 'react-icons/bs';
import dynamic from 'next/dynamic';
import MagneticButton from './magnetic-button';
import ScrambleText from './scramble-text';

const AnimeParticles = dynamic(() => import('./anime-particles'), { ssr: false });
const WaveBackground = dynamic(() => import('./wave-background'), { ssr: false });


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
  { label: 'Homelab', href: '/homelab' },
  { label: 'LAN', href: '/LAN' },
];

export default function End() {
  const { accent } = useTheme();
  const { reducedEffects } = usePerformance();
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="flex flex-col min-h-dvh bg-background overflow-y-auto">
      {/* Hex grid background */}
      <div className="rog-hex-grid" />

      {/* Particles background */}
      {!reducedEffects && (
        <div className="absolute inset-0 pointer-events-none z-[1]">
          <AnimeParticles particleCount={30} connectDistance={90} />
        </div>
      )}

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
              <span className="mr-3 opacity-30">{'//'}</span>
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <section className="relative w-full py-20 md:py-28 bg-background overflow-hidden flex-shrink-0">
        <WaveBackground opacity={0.04} />
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

          <h2 className="text-[clamp(2.8rem,8vw,6rem)] leading-[0.9] tracking-[-0.02em] mb-6 font-display" style={{ color: 'var(--color-foreground)' }}>
            OPEN A<br />
            <span className="font-display-italic" style={{ color: accent }}>
              <ScrambleText text="CHANNEL" triggerOnView={true} />
              <span className="block -mt-1 h-[4px]"
                style={{ background: 'repeating-linear-gradient(90deg, var(--flag) 0 6px, transparent 6px 12px)' }}
              />
            </span>
          </h2>

          <p className="text-sm leading-relaxed mx-auto mb-12 max-w-lg" style={{ color: 'var(--color-muted)' }}>
            Building production backend systems at scale — from identity and
            notification platforms to cloud-native infrastructure.
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
                className="w-full rounded-[3px] px-4 py-3 text-xs font-mono tracking-wider outline-none transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-foreground)',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-default)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full rounded-[3px] px-4 py-3 text-xs font-mono tracking-wider outline-none transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-foreground)',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-default)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
              />
            </div>
            <textarea
              name="message"
              placeholder="Message"
              required
              rows={4}
              className="w-full rounded-[3px] px-4 py-3 text-xs font-mono tracking-wider outline-none transition-all duration-300 resize-none"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-foreground)',
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent-default)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
            />
            <button
              type="submit"
              className="w-full rounded-[3px] px-6 py-3 text-[11px] font-mono font-bold uppercase tracking-[0.14em] transition-all duration-300"
              style={{
                backgroundColor: 'var(--accent-default)',
                color: '#FFF8EC',
                border: '1px solid var(--accent-default)',
                boxShadow: '3px 3px 0 0 color-mix(in srgb, var(--flag) 30%, var(--ink))',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '4px 4px 0 0 color-mix(in srgb, var(--flag) 42%, var(--ink))')}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '3px 3px 0 0 color-mix(in srgb, var(--flag) 30%, var(--ink))')}
            >
              Send Transmission
            </button>
            <p className="text-[9px] font-mono text-center" style={{ color: 'var(--color-muted)' }}>
              or email directly at{' '}
              <a href="mailto:joseph.gitau.c@gmail.com" className="underline underline-offset-2 transition-colors" style={{ color: 'var(--accent-default)' }}>
                joseph.gitau.c@gmail.com
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
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-[2px] flex items-center justify-center" style={{ backgroundColor: accent }} aria-hidden>
                  <span className="text-[8px] font-mono font-bold text-[#FFF8EC]">0</span>
                </span>
                <span className="text-[11px] font-mono font-bold tracking-[0.24em] uppercase" style={{ color: accent }}>
                  Mfalme&middot;0
                </span>
              </div>
              <p className="text-xs font-medium leading-relaxed max-w-xs font-mono" style={{ color: 'var(--color-muted)' }}>
                Field report compiled by Joseph Gitau Chege — backend systems, identity &amp; notification platforms, cloud reliability. Nairobi, Kenya.
              </p>
              <div className="flex items-center gap-4 mt-2">
                {socials.map((s) => (
                  <MagneticButton key={s.label} strength={0.4}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block transition-all duration-300 hover:-translate-y-0.5"
                      style={{ color: 'var(--color-muted)' }}
                      aria-label={s.label}
                    >
                      <span className="text-sm block" style={{ color: 'var(--color-muted)' }}>{s.icon}</span>
                    </a>
                  </MagneticButton>
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
              <span className="text-[8px] font-bold tracking-[0.3em] uppercase" style={{ color: `${accent}80` }}>Compiled</span>
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: `${accent}40` }} />
              <span className="text-[8px] font-bold tracking-[0.3em] uppercase" style={{ color: `${accent}80` }}>Reviewed</span>
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: `${accent}40` }} />
              <span className="text-[8px] font-bold tracking-[0.3em] uppercase" style={{ color: `${accent}80` }}>Signed</span>
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
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase font-mono" style={{ color: `${accent}70` }}>Ref: Mfalme&middot;0-2026</span>
              <div className="w-[1px] h-3" style={{ backgroundColor: 'var(--color-border)' }} />
              <span className="text-[10px] font-medium" style={{ color: 'var(--color-muted)' }}>
                Nairobi &middot; EAT (GMT+3)
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
