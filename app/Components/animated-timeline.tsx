'use client';

import React, { useRef, useEffect } from 'react';
import { animate, stagger } from 'animejs';
import { usePerformance } from '../Context/performance';

interface TimelineItem {
  year: string;
  title: string;
  subtitle?: string;
  description?: string;
}

interface AnimatedTimelineProps {
  items: TimelineItem[];
  accent?: string;
  className?: string;
}

export default function AnimatedTimeline({
  items,
  accent = 'var(--accent-default)',
  className = '',
}: AnimatedTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedEffects } = usePerformance();

  useEffect(() => {
    if (reducedEffects) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const dots = el.querySelectorAll('.timeline-dot');
          const lines = el.querySelectorAll('.timeline-line-fill');
          const contents = el.querySelectorAll('.timeline-content');

          animate(Array.from(dots), {
            scale: [0, 1.3, 1],
            opacity: [0, 1],
            delay: stagger(200),
            duration: 500,
            ease: 'outExpo',
          });

          animate(Array.from(lines), {
            scaleY: [0, 1],
            delay: stagger(200, { start: 100 }),
            duration: 600,
            ease: 'outExpo',
          });

          animate(Array.from(contents), {
            opacity: [0, 1],
            translateX: [-20, 0],
            delay: stagger(200, { start: 200 }),
            duration: 500,
            ease: 'outExpo',
          });

          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedEffects]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Vertical line */}
      <div
        className="absolute left-[11px] top-0 bottom-0 w-[1px]"
        style={{ backgroundColor: `${accent}15` }}
      />

      <div className="space-y-8">
        {items.map((item, i) => (
          <div key={i} className="relative flex gap-6">
            {/* Dot */}
            <div className="relative z-10 shrink-0 mt-1">
              <div
                className="timeline-dot w-[9px] h-[9px] rounded-full border-2"
                style={{
                  borderColor: accent,
                  backgroundColor: i === 0 ? accent : 'transparent',
                  boxShadow: i === 0 ? `0 0 12px ${accent}40` : 'none',
                }}
              />
              {/* Line fill */}
              {i < items.length - 1 && (
                <div
                  className="timeline-line-fill absolute left-1/2 -translate-x-1/2 top-[13px] w-[1px] origin-top"
                  style={{
                    height: 'calc(100% + 2rem)',
                    backgroundColor: `${accent}20`,
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div className="timeline-content pb-2">
              <span
                className="text-[9px] font-bold tracking-[0.15em] uppercase"
                style={{ color: accent }}
              >
                {item.year}
              </span>
              <h4
                className="text-sm font-semibold tracking-tight mt-1"
                style={{ color: 'var(--color-foreground)' }}
              >
                {item.title}
              </h4>
              {item.subtitle && (
                <p className="text-[11px] font-medium mt-0.5" style={{ color: 'var(--color-muted)' }}>
                  {item.subtitle}
                </p>
              )}
              {item.description && (
                <p className="text-[10px] leading-relaxed mt-1" style={{ color: 'var(--color-muted)' }}>
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
