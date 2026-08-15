'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TypeWriterProps {
  texts: string[];
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  cursorColor?: string;
}

export default function TypeWriter({
  texts,
  className = '',
  speed = 40,
  deleteSpeed = 20,
  pauseDuration = 2000,
  cursorColor,
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (charIndex < current.length) {
        timeout = setTimeout(() => {
          setDisplayText(current.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, speed + Math.random() * 30);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayText(current.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % texts.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed, deleteSpeed, pauseDuration]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
        className="ml-px font-light inline-block"
        style={{ color: cursorColor || 'var(--color-accent)' }}
      >
        |
      </motion.span>
    </span>
  );
}
