'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote: "Working with Joseph felt like having a dedicated engineering team in one person. He architected our entire platform from the ground up — clean, scalable, and delivered ahead of schedule.",
    name: "Samuel K.",
    role: "CTO, SteadFast Academy",
  },
  {
    quote: "Joseph's ability to bridge frontend and backend seamlessly is rare. He took our concept and turned it into a production-grade system that we still run today without issues.",
    name: "Mercy W.",
    role: "Product Lead, Gituamba Girls",
  },
  {
    quote: "He rebuilt our entire financial data pipeline with C# and .NET. The performance improvements were immediate — reports that took minutes now run in seconds.",
    name: "Patrick M.",
    role: "Systems Admin, VisionFund Kenya",
  },
  {
    quote: "Joseph brought both technical depth and a builder's mindset to every project. He doesn't just write code — he solves problems end-to-end.",
    name: "Faith A.",
    role: "Engineering Manager",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const next = () => setActive((i) => (i + 1) % testimonials.length);
  const prev = () => setActive((i) => (i - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[active];

  return (
    <section className="relative w-full h-full flex items-center justify-center bg-background overflow-hidden pt-20 md:pt-24 px-8 md:px-14">
      <div className="rog-hex-grid" />

      <div className="relative z-10 max-w-2xl w-full text-center">
        <span className="text-[8px] font-bold tracking-[0.3em] uppercase rog-accent mb-8 block">
          Testimonials
        </span>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <blockquote className="text-sm md:text-base leading-relaxed font-medium mb-8"
              style={{ color: 'var(--color-foreground)' }}
            >
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <div className="space-y-1">
              <p className="text-xs font-bold tracking-wide rog-accent">{t.name}</p>
              <p className="text-[10px] font-mono tracking-wider" style={{ color: 'var(--color-muted)' }}>
                {t.role}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={prev}
            className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 hover:scale-105"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
            aria-label="Previous testimonial"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M7 9L4 6l3-3" /></svg>
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i === active ? 'var(--accent-default)' : 'var(--color-border)',
                  width: i === active ? 6 : 4,
                  height: i === active ? 6 : 4,
                }}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 hover:scale-105"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
            aria-label="Next testimonial"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 3l3 3-3 3" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
