'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  triggerOnView?: boolean;
  duration?: number;
  scrambleChars?: string;
  style?: React.CSSProperties;
}

export default function ScrambleText({
  text,
  className = '',
  triggerOnView = true,
  duration = 1200,
  scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*',
  style,
}: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState(triggerOnView ? '' : text);
  const animatedRef = useRef(false);

  const runScramble = useCallback(() => {
    if (animatedRef.current) return;
    animatedRef.current = true;

    const chars = scrambleChars.split('');
    let frame = 0;
    const totalFrames = Math.ceil(duration / 16);

    const tick = () => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      let result = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          result += ' ';
        } else if (i / text.length < eased) {
          result += text[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setDisplayed(result);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplayed(text);
      }
    };

    tick();
  }, [text, duration, scrambleChars]);

  useEffect(() => {
    if (!triggerOnView || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runScramble();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [triggerOnView, runScramble]);

  return (
    <span ref={ref} className={className} style={style}>
      {displayed}
    </span>
  );
}
