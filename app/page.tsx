'use client'

import { useState, useEffect } from 'react';
import Header from './Components/header';
import Preloader from './Components/preloader';
import { Hero } from './Components/main/hero';
import TechStack from './Components/main/techstack';
import LanguageCard from './Components/main/languages';
import Github from './Components/main/github';
import AboutMe from './Components/main/about';
import { WorkExperience } from './Components/main/mboka';
import { Projects } from './Components/main/projects';
import Footer from './Components/footer';
import { CiCircleChevUp } from 'react-icons/ci';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  // Detect scroll to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Preloader */}
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Main Content - Only show after loading */}
      {!loading && (
        <>
          {/* Header */}
          <Header />

          {/* Main Sections */}
          <main className="relative">
            <section id="hero">
              <Hero />
            </section>

            <section id="about">
              <AboutMe />
            </section>

            <section id="work-experience">
              <WorkExperience />
            </section>

            <section id="techstack">
              <TechStack />
            </section>

            <section id="languages">
              <LanguageCard />
            </section>

            <section id="projects">
              <Projects />
            </section>

            <section id="github">
              <Github />
            </section>
          </main>

          {/* Footer */}
          <Footer />

          {/* Back to Top Button */}
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-black shadow-lg hover:scale-110  text-white text-3xl transition-all duration-300"
              aria-label="Back to Top"
            >
              <CiCircleChevUp />
            </button>
          )}
        </>
      )}
    </div>
  );
}
