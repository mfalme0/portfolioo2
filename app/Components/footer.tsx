'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { BsGithub, BsLinkedin, BsTwitterX, BsInstagram } from 'react-icons/bs';

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

export default function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="w-full bg-background" style={{ borderTop: '1px solid var(--color-border)' }}>
      <div className="max-w-7xl mx-auto px-8 md:px-14 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-sm font-semibold tracking-tight" style={{ color: 'var(--color-foreground)' }}>
              JGITAU
            </Link>
            <p className="text-xs font-medium leading-relaxed max-w-xs" style={{ color: 'var(--color-muted)' }}>
              Full-stack engineer building production-grade software across the entire technology stack.
            </p>
            <div className="flex items-center gap-4 mt-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-all duration-300 hover:opacity-60"
                  style={{ color: 'var(--color-muted)' }}
                  aria-label={s.label}
                >
                  <span className="text-sm">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <span className="text-[9px] font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--color-muted)' }}>
              Explore
            </span>
            <div className="flex flex-col gap-2.5">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs font-medium transition-all duration-300 hover:opacity-60"
                  style={{ color: 'var(--color-foreground)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <span className="text-[9px] font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--color-muted)' }}>
              Contact
            </span>
            <div className="flex flex-col gap-2.5">
              <a
                href="https://github.com/mfalme0"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium transition-all duration-300 hover:opacity-60"
                style={{ color: 'var(--color-foreground)' }}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/josephgitauc/"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium transition-all duration-300 hover:opacity-60"
                style={{ color: 'var(--color-foreground)' }}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid var(--color-border)' }}>
          <p className="text-[10px] font-medium" style={{ color: 'var(--color-muted)' }}>
            &copy; {year} Joseph Gitau
          </p>
          <span className="text-[10px] font-medium" style={{ color: 'var(--color-muted)' }}>
            Designed & Built in Nairobi
          </span>
        </div>
      </div>
    </footer>
  );
}
