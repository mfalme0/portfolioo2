'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait" onExitComplete={() => onComplete?.()}>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ backgroundColor: 'var(--color-background)' }}
        >
          <div className="flex flex-col items-center gap-8">
            <span className="text-5xl font-light tracking-tighter" style={{ color: 'var(--color-foreground)' }}>
              JG
            </span>
            <div className="w-32 h-[2px] overflow-hidden rounded-full" style={{ backgroundColor: 'var(--color-border)' }}>
              <div
                className="h-full w-full rounded-full animate-apple-progress"
                style={{ backgroundColor: 'var(--accent-default)' }}
              />
            </div>
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: 'var(--color-muted)' }}>
              Loading
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
