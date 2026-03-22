/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useEffect } from 'react';
import Header from './Components/header';
import Preloader from './Components/preloader';
import { Hero } from './Components/main/hero';
import TechStack from './Components/main/techstack';
import ProgrammingLanguages from './Components/main/languages'; // Renamed for consistency
import Github from './Components/main/github';
import AboutMe from './Components/main/about';
import { WorkExperience } from './Components/main/mboka';
import { Projects } from './Components/main/projects';
import Footer from './Components/footer';
import { motion, AnimatePresence } from 'framer-motion';

// ─────────────────────────────────────────────
// THEME SYNC (Global Hub)
// ─────────────────────────────────────────────
function useThemeColor() {
  const [color, setColor] = useState('#f8fafc');
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12)      setColor('#7dd3fc'); // Morning: sky blue
    else if (hour < 18) setColor('#f8fafc'); // Day: arctic white
    else                setColor('#818cf8'); // Evening: indigo
  }, []);
  return color;
}

export default function HomePage() {
  const accentColor = useThemeColor();
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative bg-[#050505] min-h-screen selection:bg-white/10 selection:text-white">
      
      {/* ── GLOBAL SYSTEM OVERLAYS ── */}
      
      {/* Persistent Noise Overlay (Highest Z-Index) */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Global Smooth Scroll Container */}
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header / Command Center */}
            <Header />

            {/* Main Deployment Sections */}
            <main className="relative z-10">
              
              <section id="hero">
                <Hero />
              </section>

              {/* ID updated to match Header: #about-me */}
              <section id="about-me">
                <AboutMe />
              </section>

              {/* ID updated to match Header: #experience */}
              <section id="experience">
                <WorkExperience />
              </section>

              <section id="techstack">
                <TechStack />
              </section>

              <section id="languages">
                <ProgrammingLanguages />
              </section>

              <section id="projects">
                <Projects />
              </section>

              <section id="github">
                <Github />
              </section>

            </main>

            {/* Footer / System Shutdown */}
            <Footer />

            {/* ── BACK TO TOP MODULE ── */}
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 20 }}
                  onClick={scrollToTop}
                  className="fixed bottom-10 right-10 z-[90] group flex items-center gap-4"
                  aria-label="Return to top"
                >
                  <div className="flex flex-col items-end">
                    <span className="text-[8px] font-black tracking-[0.3em] text-zinc-500 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                      Top
                    </span>
                    <span className="text-[10px] font-mono text-zinc-600 uppercase">
                      SYS_UP
                    </span>
                  </div>
                  
                  {/* Brutalist Trigger Square */}
                  <div className="w-12 h-12 bg-zinc-950/50 backdrop-blur-xl border border-white/[0.08] flex items-center justify-center transition-all duration-300 group-hover:border-white/20">
                     <motion.div 
                        animate={{ y: [0, -4, 0] }} 
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-white text-lg"
                     >
                       ↑
                     </motion.div>
                     
                     {/* Dynamic Corner Accent */}
                     <div 
                        className="absolute top-0 right-0 w-1 h-1" 
                        style={{ background: accentColor }} 
                     />
                  </div>
                </motion.button>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Global CSS for technical aesthetics */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 5px;
        }
        ::-webkit-scrollbar-track {
          background: #050505;
        }
        ::-webkit-scrollbar-thumb {
          background: #1a1a1a;
          border-radius: 0px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #252525;
        }
        html {
          scrollbar-color: #1a1a1a #050505;
          scrollbar-width: thin;
        }
      `}</style>

    </div>
  );
}