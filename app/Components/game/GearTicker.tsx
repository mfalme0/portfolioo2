'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function GearTicker({ label, accent }: { label: string; accent: string }) {
  const reduceMotion = useReducedMotion();
  const items = Array.from({ length: 6 }, () => label);

  return (
    <div
      className="relative w-full overflow-hidden border-y"
      style={{ borderColor: `${accent}1f`, background: `${accent}09` }}
      aria-hidden="true"
    >
      <motion.div
        className="flex gap-12 py-3 whitespace-nowrap will-change-transform"
        animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
        transition={reduceMotion ? undefined : { duration: 24, ease: 'linear', repeat: Infinity }}
      >
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-12 text-[10px] md:text-[11px] font-black tracking-[0.4em] uppercase"
            style={{ color: accent }}
          >
            {t}
            <span className="opacity-25 text-white">&#9670;</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
