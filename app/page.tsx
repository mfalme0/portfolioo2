'use client';

import React, { useState, useEffect } from 'react';
import Header from './Components/header';
import Preloader from './Components/preloader';
import { Hero } from './Components/main/hero';
import TechStack from './Components/main/techstack';
import ProgrammingLanguages from './Components/main/languages';
import AboutMe from './Components/main/about';
import { WorkExperience } from './Components/main/mboka';
import { Projects } from './Components/main/projects';
import Github from './Components/main/github';
import Footer from './Components/footer';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from './Context/theme';

export default function HomePage() {
  const { accent } = useTheme();
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollBtnHovered, setScrollBtnHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const handlePreloaderComplete = () => setLoading(false);

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
              <Header />

              <main className="relative z-10">
                <section id="hero"><Hero /></section>
                <section id="about-me"><AboutMe /></section>
                <section id="experience"><WorkExperience /></section>
                <section id="techstack"><TechStack /></section>
                <section id="languages"><ProgrammingLanguages /></section>
                <section id="projects"><Projects /></section>
                <section id="github"><Github /></section>
              </main>

              <Footer />

              <AnimatePresence>
                {showScrollTop && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={scrollToTop}
                    onMouseEnter={() => setScrollBtnHovered(true)}
                    onMouseLeave={() => setScrollBtnHovered(false)}
                    className="fixed bottom-8 right-8 z-[90] w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: scrollBtnHovered ? accent : 'var(--color-surface)',
                      color: scrollBtnHovered ? '#ffffff' : 'var(--color-foreground)',
                      border: '1px solid var(--color-border)',
                      boxShadow: scrollBtnHovered ? `0 4px 20px ${accent}33` : '0 1px 3px rgba(0,0,0,0.04)',
                    }}
                    aria-label="Return to top"
                  >
                    &uarr;
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
