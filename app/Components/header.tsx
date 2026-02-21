/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLink {
  name: string;
  href: string;
}

const portfolioLinks: NavLink[] = [
  { name: 'Identity', href: '#about-me' },
  { name: 'History', href: '#experience' },
  { name: 'Arsenal', href: '#techstack' },
  { name: 'Fluency', href: '#languages' },
  { name: 'Archive', href: '#projects' },
  { name: 'Ledger', href: '#github' },
];

const gearLinks: NavLink[] = [
  { name: 'Systems', href: '#rigs' },
  { name: 'Keyboards', href: '#keyboards' },
  { name: 'Mice', href: '#mice' },
  { name: 'Audio', href: '#audio' },
  { name: 'Display', href: '#display' },
  { name: 'Power', href: '#power' },
];

export default function Header() {
  const pathname = usePathname();
  const isPortfolio = pathname === '/';
  const isGearPage = pathname === '/gear';
  const isLanPage = pathname === '/LAN';

  const navLinks = useMemo(() => {
    if (isGearPage) return gearLinks;
    return portfolioLinks;
  }, [isGearPage]);

  const defaultHash = useMemo(() => navLinks[0]?.href ?? '#', [navLinks]);
  const [activeHash, setActiveHash] = useState<string>(defaultHash);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // if user lands with a hash, respect it
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!isPortfolio && !isGearPage) return;

    const hash = window.location.hash;
    if (hash) setActiveHash(hash);
    else setActiveHash(defaultHash);
  }, [isPortfolio, isGearPage, defaultHash]);

  // observe sections to set active link (portfolio + gear)
  useEffect(() => {
    if (!isPortfolio && !isGearPage) return;

    const ids = navLinks
      .map((l) => (l.href.startsWith('#') ? l.href.slice(1) : null))
      .filter(Boolean) as string[];

    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActiveHash(`#${visible.target.id}`);
      },
      {
        root: null,
        rootMargin: '-35% 0px -55% 0px',
        threshold: [0.08, 0.15, 0.25],
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isPortfolio, isGearPage, navLinks]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isHash = href.startsWith('#');
    const allowHashScroll = isPortfolio || isGearPage;

    if (isHash && allowHashScroll) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileOpen(false);
      setActiveHash(href);

      // keep url hash in sync
      if (typeof window !== 'undefined') {
        history.replaceState(null, '', href);
      }
    } else {
      setMobileOpen(false);
    }
  };

  const navItemVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
  };

  const desktopNav = useMemo(() => navLinks, [navLinks]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-6 ${
          isScrolled ? 'md:py-4' : 'md:py-8'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 p-2 rounded-full border ${
            isScrolled
              ? 'bg-zinc-950/40 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
              : 'bg-transparent border-transparent'
          }`}
        >
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 pl-4 group">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 blur-sm opacity-50" />
            </div>
            <span className="text-[11px] font-bold tracking-[0.3em] text-white uppercase transition-colors group-hover:text-zinc-400">
              JGITAU<span className="text-zinc-600">.pkg</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-1">
            {desktopNav.map((link, i) => {
              const isActive = (isPortfolio || isGearPage) && link.href === activeHash;

              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  variants={navItemVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: i * 0.04 }}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`relative px-4 py-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${
                    isActive ? 'text-white' : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  <span
                    className={`absolute inset-0 rounded-full transition-all duration-500 ${
                      isActive ? 'bg-white/5 border border-white/10' : 'bg-transparent'
                    }`}
                  />
                  <span className="relative z-10">{link.name}</span>
                </motion.a>
              );
            })}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">
            <Link
              href="/gear"
              className={`hidden md:block px-5 py-2 text-[9px] font-bold tracking-[0.3em] rounded-full transition-all uppercase ${
                isGearPage
                  ? 'bg-white/5 text-white border border-white/10'
                  : 'text-zinc-400 border border-white/5 hover:bg-white/5 hover:text-white'
              }`}
            >
              Module_Gear
            </Link>

            <Link
              href="/LAN"
              className={`hidden md:block px-5 py-2 text-[9px] font-bold tracking-[0.3em] rounded-full transition-all uppercase ${
                isLanPage
                  ? 'bg-emerald-500 text-black shadow-[0_0_18px_rgba(16,185,129,0.35)]'
                  : 'bg-white text-black hover:scale-105'
              }`}
            >
              Protocol_LAN
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 transition-all"
            >
              <div
                className={`h-[1px] bg-white transition-all ${
                  mobileOpen ? 'w-6 rotate-45 translate-y-[3px]' : 'w-4'
                }`}
              />
              <div
                className={`h-[1px] bg-white transition-all ${
                  mobileOpen ? 'w-6 -rotate-45 -translate-y-[4px]' : 'w-6'
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[49] bg-[#050505]/95 backdrop-blur-2xl lg:hidden flex flex-col items-center justify-center"
            onClick={() => setMobileOpen(false)}
          >
            <motion.nav
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center gap-7"
            >
              {navLinks.map((link, i) => {
                const isActive = (isPortfolio || isGearPage) && link.href === activeHash;

                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={(e) => handleClick(e, link.href)}
                    className={`text-2xl font-medium tracking-tighter transition-colors ${
                      isActive ? 'text-white' : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </motion.a>
                );
              })}

              <div className="h-px w-12 bg-white/10 my-3" />

              <Link href="/gear" className="text-sm tracking-[0.3em] text-zinc-400 uppercase">
                Gear_Inventory
              </Link>

              <Link
                href="/LAN"
                className={`text-sm tracking-[0.3em] uppercase ${
                  isLanPage ? 'text-emerald-400' : 'text-emerald-500'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                LAN_Active
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}