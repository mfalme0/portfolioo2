'use client';

import React, { useRef, useCallback } from 'react';
import { animate } from 'animejs';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  style?: React.CSSProperties;
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  onClick,
  href,
  target,
  rel,
  style,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    animate(el, {
      translateX: x * strength,
      translateY: y * strength,
      duration: 300,
      ease: 'outQuad',
    });

    if (glowRef.current) {
      const glowX = ((e.clientX - rect.left) / rect.width) * 100;
      const glowY = ((e.clientY - rect.top) / rect.height) * 100;
      glowRef.current.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(var(--accent-rgb) / 0.12) 0%, transparent 60%)`;
      glowRef.current.style.opacity = '1';
    }
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    animate(el, {
      translateX: 0,
      translateY: 0,
      duration: 500,
      ease: 'outElastic(1, .6)',
    });
    if (glowRef.current) {
      glowRef.current.style.opacity = '0';
    }
  }, []);

  const inner = (
    <div
      ref={ref}
      className={`relative ${className}`}
      style={{ ...style, willChange: 'transform' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className="inline-block">
        {inner}
      </a>
    );
  }

  return inner;
}
