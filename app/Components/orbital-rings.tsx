'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { animate, stagger } from 'animejs';
import { usePerformance } from '../Context/performance';

interface OrbitalRingsProps {
  className?: string;
  accent?: string;
}

export default function OrbitalRings({ className = '', accent }: OrbitalRingsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reducedEffects } = usePerformance();

  useEffect(() => {
    if (reducedEffects) return;
    const container = containerRef.current;
    if (!container) return;

    const dots = container.querySelectorAll('.orbital-dot');
    animate(Array.from(dots), {
      opacity: [0, 1],
      scale: [0, 1],
      delay: stagger(80, { start: 300 }),
      duration: 600,
      ease: 'outExpo',
    });
  }, [reducedEffects]);

  if (reducedEffects) return null;

  const ringColor = accent || 'rgb(var(--accent-rgb))';

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: '900px', height: '900px' }}
      >
        <svg width="900" height="900" viewBox="0 0 900 900" fill="none">
          <ellipse
            cx="450" cy="450" rx="440" ry="280"
            stroke={ringColor}
            strokeWidth="0.5"
            strokeDasharray="4 8"
            opacity="0.1"
          />
          <circle className="orbital-dot" cx="890" cy="450" r="3" fill={ringColor} opacity="0.4" />
          <circle className="orbital-dot" cx="10" cy="450" r="2" fill={ringColor} opacity="0.2" />
        </svg>
      </motion.div>

      {/* Middle ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: '700px', height: '700px' }}
      >
        <svg width="700" height="700" viewBox="0 0 700 700" fill="none">
          <ellipse
            cx="350" cy="350" rx="340" ry="200"
            stroke={ringColor}
            strokeWidth="0.5"
            strokeDasharray="2 6"
            opacity="0.08"
            transform="rotate(30 350 350)"
          />
          <circle className="orbital-dot" cx="690" cy="350" r="2.5" fill={ringColor} opacity="0.35" />
        </svg>
      </motion.div>

      {/* Inner ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: '500px', height: '500px' }}
      >
        <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
          <ellipse
            cx="250" cy="250" rx="240" ry="140"
            stroke={ringColor}
            strokeWidth="0.5"
            strokeDasharray="3 10"
            opacity="0.06"
            transform="rotate(-20 250 250)"
          />
          <circle className="orbital-dot" cx="490" cy="250" r="2" fill={ringColor} opacity="0.3" />
          <circle className="orbital-dot" cx="10" cy="250" r="1.5" fill={ringColor} opacity="0.15" />
        </svg>
      </motion.div>

      {/* Floating accent dots */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[20%] right-[15%] w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: ringColor }}
      />
      <motion.div
        animate={{
          y: [0, 15, 0],
          x: [0, -10, 0],
          opacity: [0.15, 0.4, 0.15],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[30%] left-[10%] w-1 h-1 rounded-full"
        style={{ backgroundColor: ringColor }}
      />
      <motion.div
        animate={{
          y: [0, -10, 0],
          x: [0, 8, 0],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute top-[60%] right-[8%] w-2 h-2 rounded-full"
        style={{ backgroundColor: ringColor }}
      />
    </div>
  );
}
