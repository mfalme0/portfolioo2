'use client';

import { useRef, type MouseEvent } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

interface TiltShowcaseProps {
  src: string;
  alt: string;
  accent: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

export default function TiltShowcase({
  src,
  alt,
  accent,
  width = 600,
  height = 400,
  priority,
  className = '',
}: TiltShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(my, [0, 1], [9, -9]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-11, 11]), { stiffness: 220, damping: 22 });
  const glareBackground = useTransform([mx, my], (latest) => {
    const [gx, gy] = latest as [number, number];
    return `radial-gradient(circle at ${gx * 100}% ${gy * 100}%, rgba(255,255,255,0.20), transparent 55%)`;
  });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative ${className}`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="rog-float relative"
        style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="w-full h-auto object-contain select-none pointer-events-none"
          style={{ filter: `drop-shadow(0 20px 40px ${accent}26)` }}
        />
        {!reduceMotion && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{ background: glareBackground, mixBlendMode: 'screen' }}
          />
        )}
      </motion.div>
    </div>
  );
}
