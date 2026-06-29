'use client';

import { motion, useScroll } from 'framer-motion';
import { useTheme } from '../Context/theme';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const { accent } = useTheme();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-[0%]"
      style={{ scaleX: scrollYProgress, backgroundColor: accent }}
    />
  );
}
