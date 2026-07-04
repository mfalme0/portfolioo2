'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './Components/header';
import PageLoader from './Components/page-loader';
import { Hero } from './Components/main/hero';
import Competencies from './Components/main/competencies';
import { WorkExperience } from './Components/main/mboka';
import { Projects } from './Components/main/projects';
import PersonalProjects from './Components/main/personal-projects';
import Skills from './Components/main/skills';
import Education from './Components/main/education';
import End from './Components/end';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from './Context/theme';
import { RevealCard } from './Components/reveal-card';
import Terminal from './Components/terminal';

type ViewMode = 'sketch' | 'terminal' | 'dark';

const SECTION_NAMES = [
  'Hero',
  'Competencies',
  'Experience',
  'Projects',
  'Personal',
  'Skills',
  'Education',
  'Contact',
];

const TOTAL_SECTIONS = 8;

export default function HomePage() {
  const { accent } = useTheme();
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollBtnHovered, setScrollBtnHovered] = useState(false);
  const [mode, setMode] = useState<ViewMode>('sketch');
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

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        setMode(m => m === 'terminal' ? 'sketch' : 'terminal');
      }
      if (e.key === 'Escape' && mode === 'terminal') {
        setMode('sketch');
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [mode]);

  const handleBuildComplete = useCallback(() => {
    setMode('dark');
  }, []);

  const handleTerminalExit = useCallback(() => {
    setMode('sketch');
  }, []);

  const handleThemeChange = useCallback((theme: 'sketch' | 'dark') => {
    setMode(theme);
  }, []);

  const toggleMode = useCallback(() => {
    setMode(m => m === 'terminal' ? 'sketch' : 'terminal');
  }, []);

  return (
    <>
      <style>{`::selection{background:${accent}4d;color:#fff}`}</style>
      <div className={`relative bg-background min-h-screen ${mode === 'sketch' ? 'blueprint-mode' : ''}`}>
        <AnimatePresence mode="wait">
          {loading ? (
            <PageLoader key="page-loader" theme="home" onComplete={handlePreloaderComplete} />
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
            >
              <Header currentSection={currentSection} onNavigate={goTo} />

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

              <main id="main-content" className="relative z-10 w-full overflow-hidden">
                <div
                  className="flex flex-row will-change-transform transition-transform duration-[0.8s] ease-[cubic-bezier(0.32,0.08,0.24,1)]"
                  style={{
                    transform: `translateX(-${currentSection * 100}vw)`,
                  }}
                >
                  <section id="hero" className="h-dvh w-dvw flex-shrink-0 relative z-10">
                    <Hero onNavigate={goTo} />
                  </section>

                  <div className="h-dvh w-dvw flex-shrink-0 overflow-hidden" id="competencies">
                    <RevealCard index={0} isOpen={currentSection >= 1} title="Competencies">
                      <Competencies />
                    </RevealCard>
                  </div>

                  <div className="h-dvh w-dvw flex-shrink-0 overflow-hidden" id="experience">
                    <RevealCard index={1} isOpen={currentSection >= 2} title="Experience">
                      <WorkExperience />
                    </RevealCard>
                  </div>

                  <div className="h-dvh w-dvw flex-shrink-0 overflow-hidden" id="projects">
                    <RevealCard index={2} isOpen={currentSection >= 3} title="Projects">
                      <Projects />
                    </RevealCard>
                  </div>

                  <div className="h-dvh w-dvw flex-shrink-0 overflow-hidden" id="personal">
                    <RevealCard index={3} isOpen={currentSection >= 4} title="Personal">
                      <PersonalProjects />
                    </RevealCard>
                  </div>

                  <div className="h-dvh w-dvw flex-shrink-0 overflow-hidden" id="skills">
                    <RevealCard index={4} isOpen={currentSection >= 5} title="Skills">
                      <Skills />
                    </RevealCard>
                  </div>

                  <div className="h-dvh w-dvw flex-shrink-0 overflow-hidden" id="education">
                    <RevealCard index={5} isOpen={currentSection >= 6} title="Education">
                      <Education />
                    </RevealCard>
                  </div>

                  <div className="h-dvh w-dvw flex-shrink-0 overflow-hidden">
                    <RevealCard index={6} isOpen={currentSection >= 7} title="Contact">
                      <End />
                    </RevealCard>
                  </div>
                </div>
              </main>

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

        <motion.button
          onClick={toggleMode}
          className="mode-toggle-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={`Switch to ${mode === 'terminal' ? 'sketch' : 'terminal'} mode (Ctrl+\`)`}
          aria-label="Toggle terminal mode"
        >
          {mode === 'terminal' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="9" y1="9" x2="15" y2="15" />
              <line x1="15" y1="9" x2="9" y2="15" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
          )}
        </motion.button>

        <AnimatePresence>
          {mode === 'terminal' && (
            <Terminal
              key="terminal"
              onBuildComplete={handleBuildComplete}
              onExit={handleTerminalExit}
              onThemeChange={handleThemeChange}
            />
          )}
        </AnimatePresence>
      </div>

      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="pencil-sketch" x="-2%" y="-2%" width="104%" height="104%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" result="sketch" />
          </filter>
        </defs>
      </svg>
    </>
  );
}
