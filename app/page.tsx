'use client';

import React, { useState } from 'react';
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
import End from './Components/end';
import { AnimatePresence, motion } from 'framer-motion';

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <div className="relative bg-background min-h-screen">
        <AnimatePresence mode="wait">
          {loading ? (
            <PageLoader key="page-loader" theme="home" onComplete={() => setLoading(false)} />
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
            >
              <Header />

              <main className="w-full overflow-x-hidden">
                <section id="hero"><Hero /></section>
                <section id="competencies"><Competencies /></section>
                <section id="experience"><WorkExperience /></section>
                <section id="projects"><Projects /></section>
                <section id="personal"><PersonalProjects /></section>
                <section id="skills"><Skills /></section>
                <section id="education"><Education /></section>
                <section id="github"><Github /></section>
                <section id="contact"><End /></section>
              </main>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
