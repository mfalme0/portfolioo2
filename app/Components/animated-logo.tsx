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
      <path
        d="M12 2L2 7v10l10 5 10-5V7L12 2z"
        stroke={accentColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="logo-inner"
        d="M12 7l-5 2.5v5L12 17l5-2.5v-5L12 7z"
        stroke={accentColor}
        strokeWidth="1"
        fill={`${accentColor}15`}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0}
      />
      <path
        className="logo-inner"
        d="M7 9.5L12 12l5-2.5M12 12v5"
        stroke={accentColor}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0}
      />
      <text
        x="12"
        y="14.5"
        textAnchor="middle"
        fill={accentColor}
        fontSize="5"
        fontWeight="bold"
        fontFamily="monospace"
        className="logo-inner"
        opacity={0}
      >
        JG
      </text>
    </svg>
  );
}
