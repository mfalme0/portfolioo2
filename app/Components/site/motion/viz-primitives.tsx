"use client";

import React from "react";
import { motion } from "framer-motion";
import { motion as tokens, useSectionMotion } from "@/lib/motion";

/**
 * Inline SVG primitives shared by every case study visual.
 *
 * All of these read colours from the existing CSS custom properties, so a
 * diagram re-themes with the site (Bauhaus day / Field Station night / synth)
 * without any component knowing which theme is active.
 */

/** Standard viewBox for every visual. 160x90 keeps numbers readable. */
export const VIEWBOX = "0 0 160 90";

/**
 * A bordered box, matching the hard-shadow Bauhaus card language used across
 * the site. `tone` maps to existing tokens.
 */
export function VizNode({
  x,
  y,
  w,
  h,
  label,
  sublabel,
  tone = "ink",
  index = 0,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sublabel?: string;
  tone?: "ink" | "flag" | "water" | "bush" | "muted";
  index?: number;
}) {
  const { reduced } = useSectionMotion();

  const fill = {
    ink: "var(--sheet)",
    flag: "var(--flag)",
    water: "var(--water)",
    bush: "var(--bush)",
    muted: "var(--sheet-2)",
  }[tone];

  const textColor =
    tone === "flag" || tone === "water" || tone === "bush" ? "#FFFFFF" : "var(--ink)";

  // Auto-fit the label to the node so text can never overflow the 160-unit
  // viewBox and get clipped. CHAR_W is measured conservatively (0.66em) from
  // the rendered mono face: underestimate it and long labels spill past the
  // border, which is exactly the bug this exists to prevent.
  const CHAR_W = 0.66;
  const fitted = Math.max(3, Math.min(6, (w - 3) / (label.length * CHAR_W)));
  const subFitted = sublabel ? Math.max(2.6, Math.min(5, (w - 3) / (sublabel.length * CHAR_W))) : 0;

  return (
    <motion.g
      initial={reduced ? false : { opacity: 0, y: 4 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: reduced ? 0 : tokens.base,
        delay: reduced ? 0 : index * tokens.stagger,
        ease: tokens.ease,
      }}
    >
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={fill}
        stroke="var(--ink)"
        strokeWidth={1.5}
      />
      <text
        x={x + w / 2}
        y={sublabel ? y + h / 2 - 1 : y + h / 2 + fitted * 0.36}
        textAnchor="middle"
        fontSize={fitted}
        fontWeight={700}
        letterSpacing="0.02em"
        fill={textColor}
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={x + w / 2}
          y={y + h / 2 + subFitted + 1.5}
          textAnchor="middle"
          fontSize={subFitted}
          fill={textColor}
          opacity={0.7}
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {sublabel}
        </text>
      )}
    </motion.g>
  );
}

/**
 * A connector that draws itself in via `strokeDashoffset`.
 *
 * `path` is an SVG path `d` string. Draw-on is the cheapest way to show
 * direction or dependency without any JS timer.
 */
export function VizEdge({
  path,
  index = 0,
  dashed = false,
  tone = "ink",
}: {
  path: string;
  index?: number;
  dashed?: boolean;
  tone?: "ink" | "flag" | "water" | "bush" | "muted";
}) {
  const { reduced } = useSectionMotion();
  const stroke = {
    ink: "var(--ink)",
    flag: "var(--flag)",
    water: "var(--water)",
    bush: "var(--bush)",
    muted: "var(--gravel)",
  }[tone];

  return (
    <motion.path
      d={path}
      fill="none"
      stroke={stroke}
      strokeWidth={1.2}
      strokeDasharray={dashed ? "3 3" : undefined}
      strokeLinecap="round"
      initial={reduced ? false : { pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: dashed ? 0.6 : 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: reduced ? 0 : tokens.slow,
        delay: reduced ? 0 : 0.1 + index * tokens.stagger,
        ease: tokens.ease,
      }}
    />
  );
}

/**
 * A packet travelling along a path — the one genuinely looping element in the
 * kit, and therefore the one reduced-motion has the most to say about.
 *
 * Under `reduced` it does not render at all. Its position is only meaningful
 * while moving, and a frozen mid-path dot reads as a stray artefact sitting on
 * top of the diagram's labels. Direction is already carried by the edges
 * themselves, so nothing is lost.
 */
export function VizFlow({
  path,
  index = 0,
  tone = "flag",
}: {
  path: string;
  index?: number;
  tone?: "flag" | "water" | "bush" | "ink";
}) {
  const { reduced } = useSectionMotion();
  if (reduced) return null;

  const fill = {
    flag: "var(--flag)",
    water: "var(--water)",
    bush: "var(--bush)",
    ink: "var(--ink)",
  }[tone];

  return (
    <motion.circle
      r={2.4}
      fill={fill}
      initial={{ offsetDistance: "0%", opacity: 0 }}
      whileInView={{ offsetDistance: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
      viewport={{ once: true }}
      animate={{ offsetDistance: ["0%", "100%"] }}
      transition={{
        duration: 2.2,
        delay: 0.5 + index * 0.25,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0.8,
      }}
      style={{ offsetPath: `path('${path}')`, offsetRotate: "0deg" }}
    />
  );
}

/**
 * Horizontal meter for numeric outcomes. The track is `--sheet-2`, the fill is
 * the accent. Grows from the left with a transform, never `width`.
 */
export function VizBar({
  x,
  y,
  w,
  label,
  value,
  max = 100,
  display,
  tone = "flag",
  index = 0,
}: {
  x: number;
  y: number;
  w: number;
  label: string;
  /** 0..max */
  value: number;
  max?: number;
  /** Text shown at the bar end, e.g. "99.9%". */
  display?: string;
  tone?: "flag" | "water" | "bush" | "ink";
  index?: number;
}) {
  const { reduced } = useSectionMotion();
  const pct = max === 0 ? 0 : Math.max(0, Math.min(1, value / max));
  const fill = {
    flag: "var(--flag)",
    water: "var(--water)",
    bush: "var(--bush)",
    ink: "var(--ink)",
  }[tone];

  return (
    <g>
      <text
        x={x}
        y={y - 2}
        fontSize={5}
        fontWeight={700}
        fill="var(--ink)"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </text>
      <rect x={x} y={y} width={w} height={4} fill="var(--sheet-2)" stroke="var(--ink)" strokeWidth={0.6} />
      <motion.rect
        y={y}
        height={4}
        fill={fill}
        stroke="var(--ink)"
        strokeWidth={0.6}
        initial={reduced ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{
          duration: reduced ? 0 : tokens.slow,
          delay: reduced ? 0 : index * tokens.stagger,
          ease: tokens.ease,
        }}
        style={{ width: w * pct, transformOrigin: `${x}px ${y + 2}px` }}
        x={x}
      />
      {display && (
        <text
          x={x + w}
          y={y - 2}
          fontSize={5}
          fontWeight={700}
          textAnchor="end"
          fill={fill}
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {display}
        </text>
      )}
    </g>
  );
}

/** Small caption text inside a diagram. */
export function VizLabel({
  x,
  y,
  text,
  anchor = "start",
  tone = "muted",
  size = 5,
}: {
  x: number;
  y: number;
  text: string;
  anchor?: "start" | "middle" | "end";
  tone?: "ink" | "muted" | "flag" | "water" | "bush";
  size?: number;
}) {
  const fill = {
    ink: "var(--ink)",
    muted: "var(--gravel)",
    flag: "var(--flag)",
    water: "var(--ink)",
    bush: "var(--bush)",
  }[tone];

  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fill={fill}
      style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}
    >
      {text}
    </text>
  );
}