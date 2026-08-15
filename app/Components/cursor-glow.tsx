'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePerformance } from '../Context/performance';

interface CursorGlowProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function CursorGlow({
  className = '',
  size = 300,
  color,
}: CursorGlowProps) {
  const { reducedEffects } = usePerformance();
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducedEffects) return;

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
    };
  }, [reducedEffects, visible]);

  if (reducedEffects) return null;

  const glowColor = color || 'rgb(var(--accent-rgb) / 0.06)';

  return (
    <motion.div
      className={`fixed pointer-events-none z-[1] ${className}`}
      animate={{
        x: pos.x - size / 2,
        y: pos.y - size / 2,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
        borderRadius: '50%',
        filter: 'blur(40px)',
      }}
    />
  );
}
