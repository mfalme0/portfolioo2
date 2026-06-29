'use client';

import { usePerformance } from '../Context/performance';

const cloudPatterns = [
  'M120,40 C120,17.9 102.1,0 80,0 C57.9,0 40,17.9 40,40 C17.9,40 0,57.9 0,80 C0,102.1 17.9,120 40,120 L120,120 C142.1,120 160,102.1 160,80 C160,57.9 142.1,40 120,40Z',
  'M140,50 C140,22.4 117.6,0 90,0 C62.4,0 40,22.4 40,50 C17.9,50 0,67.9 0,90 C0,112.1 17.9,130 40,130 L140,130 C162.1,130 180,112.1 180,90 C180,67.9 162.1,50 140,50Z',
  'M100,30 C100,13.4 86.6,0 70,0 C53.4,0 40,13.4 40,30 C20.1,30 4,46.1 4,66 C4,85.9 20.1,102 40,102 L100,102 C116.6,102 130,88.6 130,72 C130,55.4 116.6,42 100,42Z',
];

const clouds = [
  { id: 1, cls: 'cloud-1', d: cloudPatterns[0], top: '8%', width: 120, opacity: 0.15 },
  { id: 2, cls: 'cloud-2', d: cloudPatterns[1], top: '22%', width: 160, opacity: 0.1 },
  { id: 3, cls: 'cloud-3', d: cloudPatterns[0], top: '45%', width: 100, opacity: 0.08 },
  { id: 4, cls: 'cloud-4', d: cloudPatterns[2], top: '60%', width: 140, opacity: 0.12 },
  { id: 5, cls: 'cloud-5', d: cloudPatterns[1], top: '15%', width: 90, opacity: 0.06 },
  { id: 6, cls: 'cloud-6', d: cloudPatterns[0], top: '78%', width: 110, opacity: 0.1 },
  { id: 7, cls: 'cloud-7', d: cloudPatterns[2], top: '35%', width: 130, opacity: 0.07 },
  { id: 8, cls: 'cloud-8', d: cloudPatterns[1], top: '90%', width: 150, opacity: 0.05 },
];

export default function Clouds() {
  const { reducedEffects } = usePerformance();

  if (reducedEffects) return null;

  return (
    <div className="cloud-layer" aria-hidden>
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className={`cloud ${cloud.cls}`}
          style={{
            top: cloud.top,
            left: 0,
            width: cloud.width,
            opacity: cloud.opacity,
          }}
        >
          <svg
            viewBox={`0 0 ${cloud.d.includes('180') ? 180 : cloud.d.includes('130') ? 130 : 160} 130`}
            width="100%"
            height="auto"
            style={{ fill: `rgb(var(--accent-rgb) / ${cloud.opacity})` }}
          >
            <path d={cloud.d} />
          </svg>
        </div>
      ))}
    </div>
  );
}
