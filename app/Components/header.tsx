'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGamepad, FaCode, FaBars, FaTimes } from 'react-icons/fa';
import { Canvas } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';

// Define nav links for portfolio
interface NavLink {
  name: string;
  href: string; // # for section anchors or /gear for page links
}

const navLinks: NavLink[] = [
  { name: 'About', href: '#about-me' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Tech Stack', href: '#tech-stack' },
  { name: 'GitHub', href: '#github' },
];

// 3D Orb for portfolio header
const HeaderOrb = ({ color, scale = 1.2, position = [0, 0, 0] }: { color: string; scale?: number; position?: [number, number, number] }) => (
  <Float speed={2} rotationIntensity={1} floatIntensity={2}>
    <Sphere args={[1, 32, 32]} scale={scale} position={position}>
      <MeshDistortMaterial color={color} distort={0.4} speed={2} roughness={0} transparent opacity={0.6} />
    </Sphere>
  </Float>
);

export default function Header() {
  const pathname = usePathname();
  const isPortfolio = pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll detection for blur/shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicks: smooth scroll or navigate page
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && isPortfolio) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileOpen(false);
    }
  };

  // Portfolio header
  if (isPortfolio) {
    return (
      <>
        <motion.header
          initial={{ y: -120 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-gray-800/50 shadow-lg shadow-indigo-500/5' : 'bg-transparent'
          }`}
        >
          {/* 3D orb background */}
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <Canvas className="absolute inset-0">
              <ambientLight intensity={0.5} />
              <HeaderOrb color="#4f46e5" scale={1.5} position={[2, 2, 0]} />
              <HeaderOrb color="#a78bfa" scale={1} position={[-2, 1, -1]} />
              <HeaderOrb color="#818cf8" scale={1.2} position={[0, -2, -2]} />
            </Canvas>
          </div>

          <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
            {/* Logo */}
            <motion.div className="flex items-center gap-3 cursor-pointer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/">
                <div className="relative w-12 h-12 rounded-full bg-gray-400/50 items-center justify-center shadow-lg shadow-indigo-500/50">
                  <FaGamepad className="text-white text-xl" />
                </div>
              </Link>
            </motion.div>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-2 bg-white/5 backdrop-blur-md rounded-full px-2 py-2 border border-white/10">
              {navLinks.map((link) => {
                if (link.href.startsWith('#')) {
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleClick(e, link.href)}
                      className="relative px-5 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-full overflow-hidden"
                    >
                      {link.name}
                    </motion.a>
                  );
                } else {
                  return (
                    <Link key={link.name} href={link.href}
                       className="relative px-5 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-full overflow-hidden">
                        {link.name}
                      
                    </Link>
                  );
                }
              })}
            </div>

            {/* Right CTA + mobile */}
            <div className="flex items-center gap-4">
              <Link href="/gear"
                 className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gray-400/50 text-white text-sm font-bold rounded-full shadow-lg shadow-indigo-500/50">
                  <FaCode className="text-lg" /> Gear
               
              </Link>
              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10"
              >
                {mobileOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
              </motion.button>
            </div>
          </nav>
        </motion.header>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            >
              <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="absolute right-0 top-0 bottom-0 w-full sm:w-80 bg-gradient-to-b from-gray-900 to-black border-l border-gray-800 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col h-full p-8">
                  <div className="flex justify-end mb-8">
                    <button
                      onClick={() => setMobileOpen(false)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
                    >
                      <FaTimes className="text-white text-xl" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-4 flex-grow">
                    {navLinks.map((link) =>
                      link.href.startsWith('#') ? (
                        <a
                          key={link.name}
                          href={link.href}
                          onClick={(e) => handleClick(e, link.href)}
                          className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-center font-bold"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link key={link.name} href={link.href}
                           className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-center font-bold">
                            {link.name}
                          
                        </Link>
                      )
                    )}
                    <Link href="/gear"
                       className="px-6 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-center font-bold">
                        Gear
                    
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Gear/performance page header (simpler)
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800 shadow-lg shadow-red-500/20">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full bg-red-700 flex items-center justify-center shadow-lg shadow-red-500/50">
            <FaGamepad className="text-white text-xl" />
          </div>
          <Link href="/"
             className="text-xl font-black text-white tracking-tight">Joseph<span className="text-red-500">.</span>
          </Link>
        </div>
        <div className="text-white font-mono uppercase tracking-widest text-sm">ROG Strix G18 // MAX PERFORMANCE</div>
      </nav>
    </header>
  );
}
