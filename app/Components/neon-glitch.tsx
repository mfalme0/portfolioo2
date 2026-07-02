'use client';

import { useState, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function NeonGlitch({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [hovering, setHovering] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (reduceMotion) return;
    setHovering(true);
  }, [reduceMotion]);

  const handleMouseLeave = useCallback(() => {
    setHovering(false);
  }, []);

  return (
    <div
      className={`relative ${className} ${hovering && !reduceMotion ? 'chromatic-glitching' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="chromatic-overlay chromatic-overlay-magenta" aria-hidden />
      <div className="chromatic-overlay chromatic-overlay-cyan" aria-hidden />
      <div className="absolute inset-0 pointer-events-none z-[1] transition-opacity duration-300 rounded-[inherit]"
        style={{
          opacity: hovering && !reduceMotion ? 1 : 0,
          boxShadow: 'inset 0 0 30px rgba(255, 0, 128, 0.06), 0 0 20px rgba(0, 255, 255, 0.04)',
        }}
      />
      {children}
    </div>
  );
}
