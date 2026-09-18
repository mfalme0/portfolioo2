'use client';

import React, { useRef, useEffect, useState } from 'react';
import { animate } from 'animejs';

interface AnimatedSvgProps {
  className?: string;
  size?: number;
  color?: string;
}

export default function AnimatedLogo({
  className = '',
  size = 48,
  color,
}: AnimatedSvgProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const accentColor = color || 'var(--accent-default)';

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = Array.from(svg.querySelectorAll('path'));

    paths.forEach((path, i) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      animate(path, {
        strokeDashoffset: 0,
        duration: 1200 + i * 200,
        delay: i * 150,
        ease: 'outExpo',
      });
    });

    const innerEls = svg.querySelectorAll('.logo-inner');
    animate(Array.from(innerEls), {
      opacity: [0, 1],
      duration: 600,
      delay: 800,
      ease: 'outQuad',
    });
  }, []);

  useEffect(() => {
    if (!isHovered) return;
    const svg = svgRef.current;
    if (!svg) return;

    const els = svg.querySelectorAll('.logo-inner');
    animate(Array.from(els), {
      scale: [1, 1.08, 1],
      duration: 400,
      ease: 'outQuad',
    });
  }, [isHovered]);

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <circle cx="6" cy="7" r="4" fill="#D02020" stroke={accentColor} strokeWidth="0.75" />
      <rect className="logo-inner" x="10" y="3" width="8" height="8" fill="#1040C0" opacity={0} />
      <path className="logo-inner" d="M6 20l5-9 5 9H6z" fill="#F0C020" opacity={0} />
    </svg>
  );
}
