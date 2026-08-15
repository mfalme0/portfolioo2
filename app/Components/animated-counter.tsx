'use client';

import React, { useRef, useEffect, useState } from 'react';
import { animate } from 'animejs';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimatedCounter({
  value,
  suffix = '',
  decimals = 0,
  duration = 1500,
  className = '',
  style,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState('0');
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || animatedRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;

          const obj = { val: 0 };
          animate(obj, {
            val: value,
            duration,
            ease: 'outExpo',
            onUpdate: () => {
              setDisplay(obj.val.toFixed(decimals));
            },
          });

          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, decimals, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`} style={style}>
      {display}{suffix}
    </span>
  );
}
