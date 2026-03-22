/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// ─────────────────────────────────────────────
// THEME SYNC (The "Pulse")
// ─────────────────────────────────────────────
function useThemeColor() {
  const [color, setColor] = useState('#f8fafc');
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12)      setColor('#7dd3fc'); // Morning
    else if (hour < 18) setColor('#f8fafc'); // Day
    else                setColor('#818cf8'); // Evening
  }, []);
  return color;
}

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
  const accentColor = useThemeColor();
  const pathname = usePathname();
  const isPortfolio = pathname === '/';
  const isGearPage = pathname === '/gear';
  const isLanPage = pathname === '/LAN';

  const navLinks = useMemo(() => (isGearPage ? gearLinks : portfolioLinks), [isGearPage]);
  const defaultHash = useMemo(() => navLinks[0]?.href ?? '#', [navLinks]);
  
  const [activeHash, setActiveHash] = useState<string>(defaultHash);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for Active Section
  useEffect(() => {
    if (!isPortfolio && !isGearPage) return;
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
  }, [isPortfolio, isGearPage, navLinks]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && (isPortfolio || isGearPage)) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
      setActiveHash(href);
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled ? 'py-4' : 'py-8'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className={`relative flex items-center justify-between p-2 px-6 transition-all duration-500 rounded-full border ${
            isScrolled 
              ? 'bg-zinc-950/50 backdrop-blur-xl border-white/[0.08] shadow-2xl' 
              : 'bg-transparent border-transparent'
          }`}>
            
            {/* ── LOGO ── */}
            <Link href="/" className="group flex items-center gap-4">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: accentColor }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: accentColor }} />
              </div>
              <span className="text-[11px] font-black tracking-[0.4em] text-white uppercase">
                JGITAU<span className="text-zinc-600">.pkg</span>
              </span>
            </Link>

            {/* ── DESKTOP NAVIGATION ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = (isPortfolio || isGearPage) && link.href === activeHash;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={`relative px-5 py-2 text-[9px] font-black tracking-[0.3em] uppercase transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 bg-white/[0.05] border border-white/[0.08] rounded-full -z-10"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* ── SYSTEM ACTIONS ── */}
            <div className="flex items-center gap-3">
              <Link
                href="/gear"
                className={`hidden md:block px-5 py-2 text-[9px] font-black tracking-[0.35em] uppercase border transition-all ${
                  isGearPage 
                    ? 'bg-white/5 border-white/20 text-white' 
                    : 'border-white/[0.05] text-zinc-500 hover:border-white/20 hover:text-white'
                } rounded-full`}
              >
                Module_Gear
              </Link>

              <Link
                href="/LAN"
                className={`hidden md:block px-5 py-2 text-[9px] font-black tracking-[0.35em] uppercase rounded-full transition-all ${
                  isLanPage
                    ? 'bg-white text-black'
                    : 'bg-white/10 border border-white/10 text-white hover:bg-white hover:text-black'
                }`}
                style={{ 
                   boxShadow: isLanPage ? `0 0 20px ${accentColor}44` : 'none',
                   backgroundColor: isLanPage ? accentColor : undefined 
                }}
              >
                Protocol_LAN
              </Link>

              {/* Mobile Trigger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              >
                <div className={`h-[1px] bg-white transition-all duration-300 ${mobileOpen ? 'w-6 rotate-45 translate-y-[3.5px]' : 'w-5'}`} />
                <div className={`h-[1px] bg-white transition-all duration-300 ${mobileOpen ? 'w-6 -rotate-45 -translate-y-[3.5px]' : 'w-3'}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── MOBILE OVERLAY (Terminal Mode) ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[49] bg-[#050505]/98 backdrop-blur-3xl lg:hidden flex flex-col items-center justify-center"
          >
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ 
              backgroundImage: `linear-gradient(${accentColor}11 1px, transparent 1px), linear-gradient(90deg, ${accentColor}11 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} />

            <nav className="relative z-10 flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`text-4xl font-black tracking-tighter uppercase ${
                    link.href === activeHash ? 'text-white' : 'text-zinc-700'
                  }`}
                  style={{ color: link.href === activeHash ? undefined : undefined }}
                >
                  {link.href === activeHash && <span className="mr-4" style={{ color: accentColor }}>&gt;</span>}
                  {link.name}
                </motion.a>
              ))}

              <div className="h-[1px] w-20 bg-white/10 my-4" />

              <div className="flex flex-col items-center gap-6">
                <Link href="/gear" onClick={() => setMobileOpen(false)} className="text-[10px] font-black tracking-[0.4em] text-zinc-500 uppercase">
                  Gear_Inventory
                </Link>
                <Link href="/LAN" onClick={() => setMobileOpen(false)} className="text-[10px] font-black tracking-[0.4em] uppercase" style={{ color: accentColor }}>
                  LAN_Active_Node
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}