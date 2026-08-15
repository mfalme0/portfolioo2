'use client';

import React, { useRef, useEffect, useState } from 'react';
import { animate } from 'animejs';

interface AnimatedBarProps {
  value: number;
  label?: string;
  showValue?: boolean;
  color?: string;
  height?: number;
  className?: string;
  delay?: number;
}

export default function AnimatedBar({
  value,
  label,
  showValue = true,
  color,
  height = 6,
  className = '',
  delay = 0,
}: AnimatedBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const animatedRef = useRef(false);

  const accentColor = color || 'var(--accent-default)';

  useEffect(() => {
    const el = ref.current;
    const fill = fillRef.current;
    if (!el || !fill) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;

          fill.style.width = '0%';
          animate(fill, {
            width: `${value}%`,
            duration: 1000,
            delay,
            ease: 'outExpo',
          });

          const obj = { val: 0 };
          animate(obj, {
            val: value,
            duration: 1000,
            delay,
            ease: 'outExpo',
            onUpdate: () => setDisplayValue(Math.round(obj.val)),
          });

          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, delay]);

  return (
    <div ref={ref} className={`${className}`}>
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <span
            className="text-[10px] font-medium"
            style={{ color: 'var(--color-muted)' }}
          >
            {label}
          </span>
          {showValue && (
            <span
              className="text-[9px] font-semibold tabular-nums"
              style={{ color: 'var(--color-muted)' }}
            >
              {displayValue}%
            </span>
          )}
        </div>
      )}
      <div
        className="w-full rounded-full overflow-hidden"
        style={{
          height,
          backgroundColor: 'var(--color-border)',
        }}
      >
        <div
          ref={fillRef}
          className="h-full rounded-full"
          style={{
            width: '0%',
            background: `linear-gradient(90deg, ${accentColor}, ${accentColor}cc)`,
            boxShadow: `0 0 8px ${accentColor}30`,
          }}
        />
      </div>
    </div>
  );
}
