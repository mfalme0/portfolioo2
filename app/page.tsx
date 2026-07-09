'use client';

import React, { useState, useEffect, useRef, useCallback, startTransition } from 'react';
import dynamic from 'next/dynamic';
import Header from './Components/header';
import PageLoader from './Components/page-loader';
import { Hero } from './Components/main/hero';
import Competencies from './Components/main/competencies';
import { WorkExperience } from './Components/main/mboka';
import { Projects } from './Components/main/projects';
import PersonalProjects from './Components/main/personal-projects';
import Skills from './Components/main/skills';
import Education from './Components/main/education';
import Github from './Components/main/github';
const Leetcode = dynamic(() => import('./Components/main/leetcode'), { ssr: false });
import End from './Components/end';
import CanvasPlayground from './Components/main/canvas-playground';
import VideoShowcase from './Components/main/video-showcase';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from './Context/theme';
import { RevealCard } from './Components/reveal-card';
import Terminal from './Components/terminal';

type ViewMode = 'sketch' | 'terminal' | 'dark';

const SECTION_NAMES = [
  'Hero', 'Competencies', 'Experience', 'Projects',
  'Personal', 'Skills', 'Education', 'GitHub',
  'LeetCode', 'Video', 'Contact',
];

const TOTAL_SECTIONS = 11;
const MOBILE_BP = '(max-width: 767px)';

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

function Section({ id, children }: { id?: string; children: React.ReactNode; }) {
  return (
    <section
      id={id}
      className="w-full"
    >
      {children}
    </section>
  );
}

function MobileLayout({ goTo }: { goTo: (i: number) => void }) {
  return (
    <main className="w-full overflow-y-auto overflow-x-hidden">
      <div className="sticky top-0 z-40 w-full px-4 py-2 text-center text-[10px] font-medium tracking-wider uppercase backdrop-blur-md border-b"
        style={{
          backgroundColor: 'rgb(var(--accent-rgb) / 0.06)',
          borderColor: 'rgb(var(--accent-rgb) / 0.12)',
          color: 'var(--color-muted)',
        }}
      >
        View on desktop for the full experience
      </div>
      <Section id="hero"><Hero onNavigate={goTo} /></Section>
      <Section id="competencies"><Competencies /></Section>
      <Section id="experience"><WorkExperience /></Section>
      <Section id="projects"><Projects /></Section>
      <Section id="personal"><PersonalProjects /></Section>
      <Section id="skills"><Skills /></Section>
      <Section id="education"><Education /></Section>
      <Section id="github"><Github /></Section>
      <Section id="leetcode"><Leetcode /></Section>
      <Section id="playground"><CanvasPlayground /></Section>
      <Section id="showcase"><VideoShowcase /></Section>
      <Section id="contact"><End /></Section>
    </main>
  );
}

function DesktopLayout({
  currentSection,
  goTo,
  renderSection,
}: {
  currentSection: number;
  goTo: (i: number) => void;
  renderSection: (i: number) => React.ReactNode;
}) {
  const { accent } = useTheme();
  const scrollBtnHoveredRef = useRef(false);
  const [scrollBtnHovered, setScrollBtnHovered] = useState(false);
  const isPastHero = currentSection > 0;
  const prevSection = useRef(currentSection);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setDirection(currentSection > prevSection.current ? 1 : -1);
    prevSection.current = currentSection;
  }, [currentSection]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '30vw' : '-30vw',
      opacity: 0,
      scale: 0.97,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100vw' : '100vw',
      opacity: 0,
      scale: 0.97,
      transition: { duration: 0.6, ease: [0.32, 0.08, 0.24, 1] as [number, number, number, number] },
    }),
  };

  return (
    <>
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
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={currentSection}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: [0.32, 0.08, 0.24, 1] }}
            className="h-dvh w-dvw overflow-hidden"
          >
            {renderSection(currentSection)}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Section dots */}
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

      {/* Scroll prompt */}
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

      {/* Scroll to top */}
      <AnimatePresence>
        {isPastHero && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => goTo(0)}
            onMouseEnter={() => { scrollBtnHoveredRef.current = true; setScrollBtnHovered(true); }}
            onMouseLeave={() => { scrollBtnHoveredRef.current = false; setScrollBtnHovered(false); }}
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
    </>
  );
}

export default function HomePage() {
  const { accent } = useTheme();
  const isMobile = useMediaQuery(MOBILE_BP);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [mode, setMode] = useState<ViewMode>('sketch');
  const lastTouchY = useRef(0);
  const touchActive = useRef(false);
  const isScrolling = useRef(false);

  const goTo = useCallback((index: number) => {
    if (isMobile) return;
    startTransition(() => {
      setCurrentSection((prev) => {
        const clamped = Math.max(0, Math.min(index, TOTAL_SECTIONS - 1));
        if (clamped === prev) return prev;
        isScrolling.current = true;
        setTimeout(() => { isScrolling.current = false; }, 800);
        return clamped;
      });
    });
  }, [isMobile]);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (isMobile || isScrolling.current) return;
    e.preventDefault();
    if (e.deltaY > 0) goTo(currentSection + 1);
    else if (e.deltaY < 0) goTo(currentSection - 1);
  }, [currentSection, goTo, isMobile]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (isMobile) return;
    if (e.touches.length === 0) return;
    touchActive.current = true;
    lastTouchY.current = e.touches[0].clientY;
  }, [isMobile]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isMobile || !touchActive.current || isScrolling.current || e.touches.length === 0) return;
    e.preventDefault();
    const deltaY = lastTouchY.current - e.touches[0].clientY;
    if (Math.abs(deltaY) > 40) {
      touchActive.current = false;
      if (deltaY > 0) goTo(currentSection + 1);
      else goTo(currentSection - 1);
    }
  }, [currentSection, goTo, isMobile]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isMobile || isScrolling.current) return;
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      goTo(currentSection + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      goTo(currentSection - 1);
    }
  }, [currentSection, goTo, isMobile]);

  useEffect(() => {
    document.body.style.overflow = isMobile ? '' : 'hidden';
    document.body.style.height = isMobile ? '' : '100dvh';
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
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
  }, [handleWheel, handleTouchStart, handleTouchMove, handleKeyDown, isMobile]);

  const handlePreloaderComplete = () => setLoading(false);

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

  const handleBuildComplete = useCallback(() => setMode('dark'), []);
  const handleTerminalExit = useCallback(() => setMode('sketch'), []);
  const handleThemeChange = useCallback((theme: 'sketch' | 'dark') => setMode(theme), []);
  const toggleMode = useCallback(() => setMode(m => m === 'terminal' ? 'sketch' : 'terminal'), []);

  const renderSection = useCallback((i: number) => {
    const isOpen = currentSection >= i;
    const props = { isOpen, index: i };
    if (i === 0) return <Hero onNavigate={goTo} />;
    if (i === 1) return <RevealCard {...props} title="Competencies"><Competencies /></RevealCard>;
    if (i === 2) return <RevealCard {...props} title="Experience"><WorkExperience /></RevealCard>;
    if (i === 3) return <RevealCard {...props} title="Projects"><Projects /></RevealCard>;
    if (i === 4) return <RevealCard {...props} title="Personal"><PersonalProjects /></RevealCard>;
    if (i === 5) return <RevealCard {...props} title="Skills"><Skills /></RevealCard>;
    if (i === 6) return <RevealCard {...props} title="Education"><Education /></RevealCard>;
    if (i === 7) return <RevealCard {...props} title="GitHub"><Github /></RevealCard>;
    if (i === 8) return <RevealCard {...props} title="LeetCode"><Leetcode /></RevealCard>;
    if (i === 9) return <VideoShowcase />;
    if (i === 10) return <RevealCard {...props} title="Contact"><End /></RevealCard>;
    return null;
  }, [currentSection, goTo]);

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

              {isMobile ? (
                <MobileLayout goTo={goTo} />
              ) : (
                <DesktopLayout
                  currentSection={currentSection}
                  goTo={goTo}
                  renderSection={renderSection}
                />
              )}
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
