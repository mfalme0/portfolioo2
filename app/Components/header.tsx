'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../Context/theme';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'Hero', href: '#hero' },
  { name: 'About', href: '#about-me' },
  { name: 'Work', href: '#experience' },
  { name: 'Tech', href: '#techstack' },
  { name: 'Languages', href: '#languages' },
  { name: 'Projects', href: '#projects' },
];

export default function Header() {
  const { theme, toggleTheme, accent } = useTheme();
  const pathname = usePathname();
  const isPortfolio = pathname === '/';

  const [activeHash, setActiveHash] = useState('#hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isPortfolio) return;
    const ids = navLinks.map((l) => l.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveHash(`#${visible.target.id}`);
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0.1 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isPortfolio]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && isPortfolio) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
      setActiveHash(href);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
              isScrolled
                ? 'bg-(--color-background) backdrop-blur-2xl shadow-sm border border-(--color-border)'
                : 'bg-transparent'
            }`}
          >
            <Link href="/" className="flex items-center gap-3">
              <span className="text-sm font-semibold tracking-tight" style={{ color: 'var(--color-foreground)' }}>
                JGITAU
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = isPortfolio && link.href === activeHash;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={`relative px-4 py-2 text-[11px] font-medium tracking-[0.08em] uppercase transition-all duration-300 ${
                      isActive
                        ? 'text-(--color-foreground)'
                        : 'text-(--color-muted) hover:text-(--color-foreground)'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
                        style={{ backgroundColor: accent }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="w-8 h-8 flex items-center justify-center text-sm transition-all duration-300 hover:opacity-60"
                style={{ color: 'var(--color-foreground)' }}
              >
                {theme === 'light' ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                )}
              </button>

              <Link
                href="/gear"
                className="hidden md:block text-[10px] font-medium tracking-[0.08em] uppercase transition-all"
                style={{ color: 'var(--color-muted)' }}
              >
                Gear
              </Link>
              <Link
                href="/LAN"
                className="hidden md:block text-[10px] font-medium tracking-[0.08em] uppercase transition-all"
                style={{ color: 'var(--color-muted)' }}
              >
                LAN
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              >
                <div
                  className={`h-[1.5px] transition-all duration-300 ${
                    mobileOpen ? 'w-6 rotate-45 translate-y-[3.5px]' : 'w-5'
                  }`}
                  style={{ backgroundColor: 'var(--color-foreground)' }}
                />
                <div
                  className={`h-[1.5px] transition-all duration-300 ${
                    mobileOpen ? 'w-6 -rotate-45 -translate-y-[3.5px]' : 'w-3'
                  }`}
                  style={{ backgroundColor: 'var(--color-foreground)' }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[49] bg-(--color-background) lg:hidden flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`text-2xl font-medium tracking-tight ${
                    link.href === activeHash ? 'text-(--color-foreground)' : 'text-(--color-muted)'
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
              <div className="h-[1px] w-16" style={{ backgroundColor: 'var(--color-border)' }} />
              <div className="flex gap-8">
                <Link href="/gear" onClick={() => setMobileOpen(false)} className="text-xs font-medium tracking-[0.08em] uppercase" style={{ color: 'var(--color-muted)' }}>
                  Gear
                </Link>
                <Link href="/LAN" onClick={() => setMobileOpen(false)} className="text-xs font-medium tracking-[0.08em] uppercase" style={{ color: 'var(--color-muted)' }}>
                  LAN
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
