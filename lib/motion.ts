import { useReducedMotion } from "framer-motion";
import { usePerformance } from "@/app/Context/performance";

/**
 * Shared motion tokens.
 *
 * The easing curve below was already duplicated inline across ~20 components
 * before this file existed; it is the project's house curve
 * (`cubic-bezier(0.22, 1, 0.36, 1)`), so it stays identical to what ships
 * today. Durations follow the brief: 120-250ms micro, 250-450ms transitions,
 * 600-1500ms intros.
 */
export const motion = {
  /** Micro-interactions: hovers, ticks, state flips. */
  fast: 0.18,
  /** UI transitions: entering, revealing, swapping. */
  base: 0.32,
  /** Larger reveals and multi-step sequences. */
  slow: 0.55,
  /** Hero / intro sequences. Nothing blocks past ~1s. */
  intro: 0.9,
  /** Offset between related elements. */
  stagger: 0.06,
  /** House easing. Entrance and general movement. */
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  /** Accelerating curve for exits. */
  exit: [0.4, 0, 1, 1] as [number, number, number, number],
} as const;

/**
 * The single reduced-motion gate for case study visuals.
 *
 * Two independent conditions collapse to the same behaviour:
 *
 * 1. `useReducedMotion()` — the user's OS/browser accessibility setting. This
 *    matters for framer-motion specifically: the global
 *    `prefers-reduced-motion` block in `app/globals.css` forces
 *    `animation-duration: 0.01ms !important`, which neutralises CSS keyframes
 *    but does NOT touch the inline styles framer-motion writes. A graphic built
 *    on framer-motion has to check this hook itself.
 *
 * 2. `reducedEffects` — the low-performance tier from `PerformanceProvider`.
 *    This is a different problem (a weak device, not an a11y preference) but
 *    the correct response is identical: draw the finished diagram, skip the
 *    movement.
 *
 * When either is true, visuals render at their final state with no transform
 * and no looping. Content is never hidden behind an animation.
 */
export function useSectionMotion() {
  const prefersReduced = useReducedMotion();
  const { reducedEffects } = usePerformance();

  return { reduced: Boolean(prefersReduced || reducedEffects) };
}