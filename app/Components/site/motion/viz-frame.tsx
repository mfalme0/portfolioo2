"use client";

import React from "react";
import { motion } from "framer-motion";
import { motion as tokens, useSectionMotion } from "@/lib/motion";

/**
 * The single entrance wrapper for every case study visual.
 *
 * Responsibilities that would otherwise be duplicated 32 times:
 * - Reserves its own box so nothing jumps on load (brief §4, no layout shift).
 * - Fades and lifts the whole diagram in once, on first intersection.
 * - Collapses to the final state instantly when motion is reduced, so the
 *   diagram is never a blank frame waiting for an animation that will not run.
 *
 * Children are plain divs/SVG, not motion components, so a visual can be
 * written declaratively and still get correct reduced-motion behaviour.
 */
export function VizFrame({
  title,
  caption,
  className = "",
  children,
}: {
  /** Accessible name for the diagram. Required: these are meaningful, not decorative. */
  title: string;
  /** Optional short caption under the diagram. */
  caption?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { reduced } = useSectionMotion();

  return (
    <motion.figure
      initial={reduced ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: reduced ? 0 : tokens.slow, ease: tokens.ease }}
      className={`mt-4 ${className}`}
    >
      <div
        role="img"
        aria-label={title}
        className="apple-card-flat relative w-full overflow-hidden"
        style={{ backgroundColor: "var(--sheet)", aspectRatio: "16 / 9" }}
      >
        {children}
      </div>
      {caption && (
        <figcaption
          className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em]"
          style={{ color: "var(--gravel)" }}
        >
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

/**
 * Staggered reveal for sibling nodes inside a diagram.
 *
 * `delay` is the index-based offset. Under reduced motion every child renders
 * at its final position immediately.
 */
export function VizGroup({
  index = 0,
  reduced,
  children,
}: {
  index?: number;
  reduced: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.g
      initial={reduced ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: reduced ? 0 : tokens.base,
        delay: reduced ? 0 : index * tokens.stagger,
        ease: tokens.ease,
      }}
    >
      {children}
    </motion.g>
  );
}