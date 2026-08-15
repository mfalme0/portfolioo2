'use client';

import React, { useRef, useEffect } from 'react';
import { animate, stagger } from 'animejs';
import { usePerformance } from '../Context/performance';

interface Skill {
  name: string;
  level: number;
}

interface SkillsRadarProps {
  skills: Skill[];
  size?: number;
  color?: string;
  className?: string;
}

export default function SkillsRadar({
  skills,
  size = 280,
  color,
  className = '',
}: SkillsRadarProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { reducedEffects } = usePerformance();

  const accentColor = color || 'rgb(var(--accent-rgb))';
  const center = size / 2;
  const maxRadius = (size / 2) * 0.75;
  const levels = 5;
  const count = skills.length;
  const angleStep = (Math.PI * 2) / count;

  const getPoint = (index: number, radius: number) => {
    const angle = angleStep * index - Math.PI / 2;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  const gridPaths = Array.from({ length: levels }, (_, i) => {
    const r = (maxRadius / levels) * (i + 1);
    const points = Array.from({ length: count }, (_, j) => {
      const p = getPoint(j, r);
      return `${p.x},${p.y}`;
    }).join(' ');
    return points;
  });

  const axisLines = Array.from({ length: count }, (_, i) => {
    const p = getPoint(i, maxRadius);
    return { x1: center, y1: center, x2: p.x, y2: p.y };
  });

  const dataPoints = skills.map((skill, i) => {
    const r = (skill.level / 100) * maxRadius;
    return getPoint(i, r);
  });

  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  useEffect(() => {
    if (reducedEffects) return;
    const svg = svgRef.current;
    if (!svg) return;

    const dataPolygon = svg.querySelector('.radar-data');
    if (dataPolygon) {
      const length = (dataPolygon as SVGGeometryElement).getTotalLength();
      (dataPolygon as SVGGeometryElement).style.strokeDasharray = `${length}`;
      (dataPolygon as SVGGeometryElement).style.strokeDashoffset = `${length}`;
      (dataPolygon as SVGGeometryElement).style.fill = 'transparent';

      animate(dataPolygon as SVGElement, {
        strokeDashoffset: [length, 0],
        duration: 1200,
        delay: 400,
        ease: 'outExpo',
      });

      animate(dataPolygon as SVGElement, {
        fill: `${accentColor}15`,
        duration: 800,
        delay: 1000,
        ease: 'outQuad',
      });
    }

    const dots = svg.querySelectorAll('.radar-dot');
    animate(Array.from(dots), {
      scale: [0, 1],
      opacity: [0, 1],
      delay: stagger(50, { start: 800 }),
      duration: 400,
      ease: 'outExpo',
    });

    const labels = svg.querySelectorAll('.radar-label')
    animate(Array.from(labels), {
      opacity: [0, 1],
      translateY: [8, 0],
      delay: stagger(60, { start: 600 }),
      duration: 500,
      ease: 'outExpo',
    });
  }, [reducedEffects, accentColor]);

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
    >
      {/* Grid */}
      {gridPaths.map((points, i) => (
        <polygon
          key={i}
          points={points}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="0.5"
          opacity={0.3}
        />
      ))}

      {/* Axes */}
      {axisLines.map((line, i) => (
        <line
          key={i}
          x1={line.x1} y1={line.y1}
          x2={line.x2} y2={line.y2}
          stroke="var(--color-border)"
          strokeWidth="0.5"
          opacity={0.2}
        />
      ))}

      {/* Data polygon */}
      <path
        className="radar-data"
        d={dataPath}
        stroke={accentColor}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill={`${accentColor}15`}
      />

      {/* Data dots */}
      {dataPoints.map((p, i) => (
        <circle
          key={i}
          className="radar-dot"
          cx={p.x}
          cy={p.y}
          r="3"
          fill={accentColor}
          opacity={0.8}
        />
      ))}

      {/* Labels */}
      {skills.map((skill, i) => {
        const p = getPoint(i, maxRadius + 18);
        const anchor = p.x < center - 5 ? 'end' : p.x > center + 5 ? 'start' : 'middle';
        return (
          <text
            key={i}
            className="radar-label"
            x={p.x}
            y={p.y}
            textAnchor={anchor}
            dominantBaseline="central"
            fill="var(--color-muted)"
            fontSize="8"
            fontWeight="500"
          >
            {skill.name}
          </text>
        );
      })}
    </svg>
  );
}
