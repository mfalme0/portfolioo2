'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './Components/header';
import Preloader from './Components/preloader';
import { Hero } from './Components/main/hero';
import TechStack from './Components/main/techstack';
import ProgrammingLanguages from './Components/main/languages';
import AboutMe from './Components/main/about';
import { WorkExperience } from './Components/main/mboka';
import { Projects } from './Components/main/projects';
import Github from './Components/main/github';
import End from './Components/end';
import Testimonials from './Components/main/testimonials';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from './Context/theme';
import { RevealCard } from './Components/reveal-card';

const SECTION_NAMES = [
  'Hero',
  'About Me',
  'Experience',
  'Tech Stack',
  'Languages',
  'Projects',
  'Testimonials',
  'GitHub',
  'End',
];

const TOTAL_SECTIONS = 9;

export default function HomePage() {
  const { accent } = useTheme();
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollBtnHovered, setScrollBtnHovered] = useState(false);
  const lastTouchY = useRef(0);
  const touchActive = useRef(false);
  const isScrolling = useRef(false);

  const goTo = useCallback((index: number) => {
    setCurrentSection((prev) => {
      const clamped = Math.max(0, Math.min(index, TOTAL_SECTIONS - 1));
      if (clamped === prev) return prev;
      isScrolling.current = true;
      setTimeout(() => { isScrolling.current = false; }, 800);
      return clamped;
    });
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (isScrolling.current) return;
    e.preventDefault();
    if (e.deltaY > 0) goTo(currentSection + 1);
    else if (e.deltaY < 0) goTo(currentSection - 1);
  }, [currentSection, goTo]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 0) return;
    touchActive.current = true;
    lastTouchY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!touchActive.current || isScrolling.current || e.touches.length === 0) return;
    e.preventDefault();
    const deltaY = lastTouchY.current - e.touches[0].clientY;
    if (Math.abs(deltaY) > 40) {
      touchActive.current = false;
      if (deltaY > 0) goTo(currentSection + 1);
      else goTo(currentSection - 1);
    }
  }, [currentSection, goTo]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isScrolling.current) return;
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      goTo(currentSection + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      goTo(currentSection - 1);
    }
  }, [currentSection, goTo]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100dvh';
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, []);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, handleKeyDown]);

  const scrollToTop = () => goTo(0);
  const handlePreloaderComplete = () => setLoading(false);

  const isPastHero = currentSection > 0;

  return (
    <>
      <style>{`::selection{background:${accent}4d;color:#fff}`}</style>
      <div className="relative bg-background min-h-screen">
        <AnimatePresence mode="wait">
          {loading ? (
            <Preloader key="preloader" onComplete={handlePreloaderComplete} />
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
            >
              <Header currentSection={currentSection} onNavigate={goTo} />

              {/* Scroll progress bar */}
              <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] pointer-events-none">
                <div
                  className="h-full transition-all duration-[0.8s] ease-[cubic-bezier(0.32,0.08,0.24,1)]"
                  style={{
                    width: `${(currentSection / (TOTAL_SECTIONS - 1)) * 100}%`,
                    backgroundColor: accent,
                    boxShadow: `0 0 8px ${accent}60`,
                  }}
                />
              </div>

              <main id="main-content" className="relative z-10">
                <div
                  className="flex flex-col will-change-transform transition-transform duration-[0.8s] ease-[cubic-bezier(0.32,0.08,0.24,1)]"
                  style={{
                    transform: `translateY(-${currentSection * 100}vh)`,
                  }}
                >
                  {/* Hero — no card */}
                  <section id="hero" className="h-dvh w-full flex-shrink-0 relative z-10">
                    <Hero />
                  </section>

                  {/* Reveal sections — each wrapped in a card that slides away */}
                  <div className="h-dvh w-full flex-shrink-0" id="about-me">
                    <RevealCard index={0} isOpen={currentSection >= 1} title="About Me">
                      <AboutMe />
                    </RevealCard>
                  </div>

                  <div className="h-dvh w-full flex-shrink-0" id="experience">
                    <RevealCard index={1} isOpen={currentSection >= 2} title="Experience">
                      <WorkExperience />
                    </RevealCard>
                  </div>

                  <div className="h-dvh w-full flex-shrink-0" id="techstack">
                    <RevealCard index={2} isOpen={currentSection >= 3} title="Tech Stack">
                      <TechStack />
                    </RevealCard>
                  </div>

                  <div className="h-dvh w-full flex-shrink-0" id="languages">
                    <RevealCard index={3} isOpen={currentSection >= 4} title="Languages">
                      <ProgrammingLanguages />
                    </RevealCard>
                  </div>

                  <div className="h-dvh w-full flex-shrink-0" id="projects">
                    <RevealCard index={4} isOpen={currentSection >= 5} title="Projects">
                      <Projects />
                    </RevealCard>
                  </div>

                  <div className="h-dvh w-full flex-shrink-0" id="testimonials">
                    <RevealCard index={5} isOpen={currentSection >= 6} title="Testimonials">
                      <Testimonials />
                    </RevealCard>
                  </div>

                  <div className="h-dvh w-full flex-shrink-0" id="github">
                    <RevealCard index={6} isOpen={currentSection >= 7} title="GitHub">
                      <Github />
                    </RevealCard>
                  </div>

                  <div className="h-dvh w-full flex-shrink-0">
                    <RevealCard index={7} isOpen={currentSection >= 8} title="End">
                      <End />
                    </RevealCard>
                  </div>
                </div>
              </main>

              {/* Section dots navigation */}
              <div className="fixed right-7 top-1/2 -translate-y-1/2 z-[80] flex flex-col items-center gap-[10px]">
                {Array.from({ length: TOTAL_SECTIONS }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="group relative flex items-center justify-center"
                    aria-label={SECTION_NAMES[i]}
                  >
                    <span
                      className="block rounded-full transition-all duration-500"
                      style={{
                        width: currentSection === i ? '8px' : '4px',
                        height: currentSection === i ? '8px' : '4px',
                        backgroundColor: currentSection === i ? accent : 'var(--color-border)',
                        boxShadow: currentSection === i ? `0 0 12px ${accent}40` : 'none',
                      }}
                    />
                    <span className="absolute right-full mr-3 px-2.5 py-1 rounded-md text-[9px] font-medium tracking-[0.08em] uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-background border border-border"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {SECTION_NAMES[i]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Section counter */}
              <AnimatePresence>
                {isPastHero && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="fixed bottom-10 left-8 z-[80] select-none"
                  >
                    <span className="text-[11px] font-semibold tracking-[0.15em] tabular-nums" style={{ color: 'var(--color-muted)' }}>
                      {String(currentSection).padStart(2, '0')}
                      <span className="opacity-30 mx-1">/</span>
                      {String(TOTAL_SECTIONS - 1).padStart(2, '0')}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scroll prompt — fades out past hero */}
              <AnimatePresence>
                {!isPastHero && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[80] flex flex-col items-center gap-2"
                  >
                    <span className="text-[9px] font-medium tracking-[0.15em] uppercase" style={{ color: 'var(--color-muted)' }}>
                      Scroll
                    </span>
                    <motion.div
                      animate={{ y: [0, 6, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-[1px] h-6"
                      style={{ backgroundColor: 'var(--color-muted)' }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {isPastHero && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onClick={scrollToTop}
                    onMouseEnter={() => setScrollBtnHovered(true)}
                    onMouseLeave={() => setScrollBtnHovered(false)}
                    className="fixed bottom-10 right-8 z-[90] flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: scrollBtnHovered ? accent : 'var(--color-surface)',
                      color: scrollBtnHovered ? '#ffffff' : 'var(--color-muted)',
                      border: '1px solid var(--color-border)',
                      boxShadow: scrollBtnHovered ? `0 8px 24px ${accent}33` : 'none',
                    }}
                    aria-label="Return to top"
                  >
                    <span className="text-[10px] font-medium tracking-[0.08em] uppercase">Top</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 10V2M2 6l4-4 4 4" />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
