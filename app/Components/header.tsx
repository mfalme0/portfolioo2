'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../Context/theme';

type PageType = 'home' | 'gear' | 'gear-detail' | 'lan';

interface NavLink {
  name: string;
  href: string;
  index: number;
}

const portfolioNavLinks: NavLink[] = [
  { name: 'Hero', href: '#hero', index: 0 },
  { name: 'About', href: '#about-me', index: 1 },
  { name: 'Work', href: '#experience', index: 2 },
  { name: 'Tech', href: '#techstack', index: 3 },
  { name: 'Languages', href: '#languages', index: 4 },
  { name: 'Projects', href: '#projects', index: 5 },
];

const gearNavLinks: NavLink[] = [
  { name: 'Systems', href: '#rigs', index: 0 },
  { name: 'Keyboards', href: '#keyboards', index: 1 },
  { name: 'Mice', href: '#mice', index: 2 },
  { name: 'Audio', href: '#audio', index: 3 },
  { name: 'Display', href: '#display', index: 4 },
  { name: 'Power', href: '#power', index: 5 },
  { name: 'Controllers', href: '#controllers', index: 6 },
];

const gearDetailNavLinks: NavLink[] = [
  { name: 'Systems', href: '/gear#rigs', index: 0 },
  { name: 'Keyboards', href: '/gear#keyboards', index: 1 },
  { name: 'Mice', href: '/gear#mice', index: 2 },
  { name: 'Audio', href: '/gear#audio', index: 3 },
  { name: 'Display', href: '/gear#display', index: 4 },
  { name: 'Power', href: '/gear#power', index: 5 },
  { name: 'Controllers', href: '/gear#controllers', index: 6 },
];

const lanNavLinks: NavLink[] = [
  { name: 'Home', href: '/', index: 0 },
  { name: 'Gear', href: '/gear', index: 1 },
  { name: 'LAN', href: '/LAN', index: 2 },
];

function getPageType(pathname: string): PageType {
  if (pathname === '/') return 'home';
  if (pathname === '/gear') return 'gear';
  if (pathname.startsWith('/gear/')) return 'gear-detail';
  if (pathname === '/LAN') return 'lan';
  return 'home';
}

interface HeaderProps {
  currentSection?: number;
  onNavigate?: (index: number) => void;
}

export default function Header({ currentSection, onNavigate }: HeaderProps) {
  const { theme, toggleTheme, accent } = useTheme();
  const pathname = usePathname();

  const pageType = useMemo(() => getPageType(pathname), [pathname]);
  const isSectionPage = pageType === 'home' || pageType === 'gear';

  const links = useMemo(() => {
    switch (pageType) {
      case 'home': return portfolioNavLinks;
      case 'gear': return gearNavLinks;
      case 'gear-detail': return gearDetailNavLinks;
      case 'lan': return lanNavLinks;
    }
  }, [pageType]);

  const [activeHash, setActiveHash] = useState('#hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (currentSection !== undefined) {
      setIsScrolled(currentSection > 0);
      return;
    }
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection]);

  useEffect(() => {
    if (!isSectionPage) return;
    if (pageType === 'home' && currentSection !== undefined) return;

    const ids = links.map((l) => l.href.replace(/^\/gear#/, '#'));
    const els = ids
      .filter((id) => id.startsWith('#'))
      .map((id) => document.getElementById(id.slice(1)))
      .filter(Boolean) as HTMLElement[];

    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveHash(`#${visible.target.id}`);
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0.1 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pageType, isSectionPage, currentSection, links]);

  const activeIndex = currentSection !== undefined
    ? currentSection
    : links.findIndex((l) => l.href.endsWith(activeHash));

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, index: number) => {
    const isHashLink = href.startsWith('#');
    const isSectionHash = isHashLink && isSectionPage;

    if (isSectionHash) {
      e.preventDefault();
      if (pageType === 'home' && onNavigate) {
        onNavigate(index);
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileOpen(false);
      setActiveHash(href);
      return;
    }

    setMobileOpen(false);
  };

  const showGearLink = pageType !== 'gear';
  const showLanLink = pageType !== 'lan';

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
            <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
              <span className="text-sm font-semibold tracking-tight" style={{ color: 'var(--color-foreground)' }}>
                JGITAU
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {links.map((link) => {
                const isActive = link.index === activeIndex;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href, link.index)}
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

              {showGearLink && (
                <Link
                  href="/gear"
                  className="hidden md:block text-[10px] font-medium tracking-[0.08em] uppercase transition-all hover:opacity-60"
                  style={{ color: 'var(--color-muted)' }}
                >
                  Gear
                </Link>
              )}
              {showLanLink && (
                <Link
                  href="/LAN"
                  className="hidden md:block text-[10px] font-medium tracking-[0.08em] uppercase transition-all hover:opacity-60"
                  style={{ color: 'var(--color-muted)' }}
                >
                  LAN
                </Link>
              )}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
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
              {links.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={(e) => handleClick(e, link.href, link.index)}
                  className={`text-2xl font-medium tracking-tight ${
                    link.index === activeIndex ? 'text-(--color-foreground)' : 'text-(--color-muted)'
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
              <div className="h-[1px] w-16" style={{ backgroundColor: 'var(--color-border)' }} />
              <div className="flex gap-8">
                {showGearLink && (
                  <Link href="/gear" onClick={() => setMobileOpen(false)} className="text-xs font-medium tracking-[0.08em] uppercase" style={{ color: 'var(--color-muted)' }}>
                    Gear
                  </Link>
                )}
                {showLanLink && (
                  <Link href="/LAN" onClick={() => setMobileOpen(false)} className="text-xs font-medium tracking-[0.08em] uppercase" style={{ color: 'var(--color-muted)' }}>
                    LAN
                  </Link>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
