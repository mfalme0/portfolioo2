"use client";

import { createElement } from "react";
import type { VisualKey } from "@/lib/case-studies";
import { getVisual } from "./registry";

/**
 * Renders the motion graphic for a case study approach section.
 *
 * Deliberately tolerant of a missing `visual`: a section without one renders
 * nothing rather than throwing. That keeps the page buildable if a section is
 * added before its graphic exists, while the authoring guide states the
 * convention is one graphic per section.
 */
export function SectionVisual({ visual }: { visual?: VisualKey }) {
  if (!visual) return null;

  // createElement rather than <Visual />: the component reference is resolved
  // from the registry inside render, which the react-hooks/static-components
  // rule correctly treats as creating a component during render.
  return createElement(getVisual(visual));
}