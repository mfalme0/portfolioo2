"use client";

import React from "react";
import { VizFrame } from "../viz-frame";
import { VIEWBOX, VizNode, VizEdge, VizFlow, VizLabel } from "../viz-primitives";

export function ResuCleanVerifiedProfile() {
  return (
    <VizFrame
      title="Diagram: resume claims enter a pending review queue, and only facts explicitly approved by the user become trusted profile facts for future tailoring."
      caption="A user-approved profile is the source of truth"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizNode x={2} y={34} w={34} h={20} label="RESUME" sublabel="source facts" index={0} />
        <VizEdge path="M 36 44 L 48 44" index={0} />
        <VizNode x={50} y={34} w={34} h={20} label="CLAIMS" sublabel="extract" tone="water" index={1} />
        <VizEdge path="M 84 44 L 96 44" index={1} />
        <VizNode x={98} y={34} w={30} h={20} label="REVIEW" sublabel="you decide" tone="flag" index={2} />
        <VizEdge path="M 128 44 L 138 44" index={2} tone="bush" />
        <VizNode x={140} y={34} w={18} h={20} label="OK" tone="bush" index={3} />

        <VizEdge path="M 113 54 L 113 70 L 66 70 L 66 56" index={3} dashed tone="flag" />
        <VizLabel x={66} y={79} text="PENDING UNTIL APPROVED" anchor="middle" tone="flag" size={4.5} />
        <VizFlow path="M 36 44 L 48 44" index={0} tone="water" />
        <VizFlow path="M 84 44 L 96 44" index={1} tone="water" />
        <VizFlow path="M 128 44 L 138 44" index={2} tone="bush" />
        <VizFlow path="M 113 54 L 113 70 L 66 70 L 66 56" index={2} tone="flag" />
      </svg>
    </VizFrame>
  );
}

export function ResuCleanFabricationGuard() {
  return (
    <VizFrame
      title="Diagram: model-assisted resume edits pass a fact-validation gate against the original resume and approved profile; supported edits are accepted, while unsupported claims are discarded in favor of deterministic output."
      caption="Model output is checked before it can change the resume"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizNode x={2} y={18} w={36} h={18} label="SOURCE" sublabel="resume + profile" tone="water" index={0} />
        <VizNode x={2} y={56} w={36} h={18} label="MODEL" sublabel="proposed edit" index={1} />
        <VizEdge path="M 38 27 L 54 37" index={0} tone="water" />
        <VizEdge path="M 38 65 L 54 55" index={1} />
        <VizNode x={56} y={36} w={38} h={20} label="FACT CHECK" tone="flag" index={2} />

        <VizEdge path="M 94 40 L 108 24" index={2} tone="bush" />
        <VizEdge path="M 94 52 L 108 68" index={3} tone="muted" />
        <VizNode x={110} y={12} w={48} h={20} label="SUPPORTED" sublabel="accept edit" tone="bush" index={3} />
        <VizNode x={110} y={58} w={48} h={20} label="UNSUPPORTED" sublabel="use safe fallback" tone="muted" index={4} />

        <VizLabel x={80} y={86} text="NO INVENTED FACTS REACH THE OUTPUT" anchor="middle" tone="ink" size={4.5} />
        <VizFlow path="M 38 27 L 54 37" index={0} tone="water" />
        <VizFlow path="M 38 65 L 54 55" index={1} tone="flag" />
        <VizFlow path="M 94 40 L 108 24" index={1} tone="bush" />
        <VizFlow path="M 94 52 L 108 68" index={2} tone="ink" />
      </svg>
    </VizFrame>
  );
}

export function ResuCleanAtsPipeline() {
  return (
    <VizFrame
      title="Diagram: resume text and a job description feed deterministic cleaning and ATS checks, producing a score, keyword gaps, and prioritized improvement tips; model assistance is optional."
      caption="Deterministic checks first; model assistance stays optional"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizNode x={2} y={12} w={42} h={18} label="RESUME" sublabel="uploaded / pasted" tone="water" index={0} />
        <VizNode x={2} y={60} w={42} h={18} label="JOB POST" sublabel="target role" index={1} />
        <VizEdge path="M 44 21 L 58 39" index={0} tone="water" />
        <VizEdge path="M 44 69 L 58 51" index={1} />
        <VizNode x={60} y={36} w={38} h={20} label="CLEAN + ATS" tone="flag" index={2} />
        <VizEdge path="M 98 46 L 110 46" index={2} />
        <VizNode x={112} y={34} w={46} h={24} label="SCORE" sublabel="checks + gaps" tone="bush" index={3} />

        <VizEdge path="M 135 58 L 135 72 L 78 72 L 78 58" index={3} dashed tone="muted" />
        <VizLabel x={78} y={82} text="PRIORITISED TIPS · MODEL OPTIONAL" anchor="middle" tone="muted" size={4.3} />
        <VizFlow path="M 44 21 L 58 39" index={0} tone="water" />
        <VizFlow path="M 44 69 L 58 51" index={1} tone="flag" />
        <VizFlow path="M 98 46 L 110 46" index={1} tone="bush" />
        <VizFlow path="M 135 58 L 135 72 L 78 72 L 78 58" index={2} tone="ink" />
      </svg>
    </VizFrame>
  );
}

export function ResuCleanJobSearch() {
  return (
    <VizFrame
      title="Diagram: configured job sources are fetched and parsed into a common job shape, then duplicate postings are collapsed and the resulting jobs are ranked and saved for review."
      caption="Multiple sources become one deduplicated, reviewable job list"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizNode x={2} y={10} w={34} h={16} label="FEED" tone="water" index={0} />
        <VizNode x={2} y={37} w={34} h={16} label="API" tone="water" index={1} />
        <VizNode x={2} y={64} w={34} h={16} label="HTML" tone="water" index={2} />

        <VizEdge path="M 36 18 L 48 38" index={0} />
        <VizEdge path="M 36 45 L 48 45" index={1} />
        <VizEdge path="M 36 72 L 48 52" index={2} />
        <VizNode x={50} y={35} w={34} h={20} label="NORMALISE" sublabel="one job shape" index={3} />
        <VizEdge path="M 84 45 L 96 45" index={3} />
        <VizNode x={98} y={35} w={28} h={20} label="DEDUPE" tone="flag" index={4} />
        <VizEdge path="M 126 45 L 136 45" index={4} />
        <VizNode x={138} y={35} w={20} h={20} label="RANK" tone="bush" index={5} />

        <VizLabel x={2} y={90} text="SEARCH · REVIEW · SAVE" tone="ink" size={4.5} />
        <VizFlow path="M 36 18 L 48 38" index={0} tone="water" />
        <VizFlow path="M 36 45 L 48 45" index={1} tone="water" />
        <VizFlow path="M 36 72 L 48 52" index={2} tone="water" />
        <VizFlow path="M 126 45 L 136 45" index={4} tone="bush" />
      </svg>
    </VizFrame>
  );
}

export function ResuCleanKitGeneration() {
  return (
    <VizFrame
      title="Diagram: a tailored resume and job details are assembled into cover text, an email draft and a downloadable application kit, then the person reviews and sends it themselves."
      caption="Prepare the application; the user stays in control of sending"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizNode x={2} y={18} w={42} h={18} label="TAILORED CV" sublabel="verified facts" tone="water" index={0} />
        <VizNode x={2} y={56} w={42} h={18} label="JOB DETAILS" sublabel="role + company" index={1} />
        <VizEdge path="M 44 27 L 56 40" index={0} tone="water" />
        <VizEdge path="M 44 65 L 56 52" index={1} />
        <VizNode x={58} y={36} w={36} h={20} label="ASSEMBLE" tone="flag" index={2} />
        <VizEdge path="M 94 46 L 104 46" index={2} />
        <VizNode x={106} y={18} w={50} h={18} label="COVER + EMAIL" index={3} />
        <VizNode x={106} y={56} w={50} h={18} label="EML + ZIP KIT" tone="bush" index={4} />
        <VizEdge path="M 94 40 L 104 27" index={3} />
        <VizEdge path="M 94 52 L 104 65" index={4} />
        <VizEdge path="M 131 36 L 131 44 L 98 44 L 98 80" index={5} dashed tone="muted" />
        <VizEdge path="M 131 74 L 131 80 L 98 80" index={6} dashed tone="muted" />
        <VizLabel x={76} y={89} text="REVIEW · COPY · SEND YOURSELF" anchor="middle" tone="ink" size={4.2} />
        <VizFlow path="M 44 27 L 56 40" index={0} tone="water" />
        <VizFlow path="M 44 65 L 56 52" index={1} />
        <VizFlow path="M 94 40 L 104 27" index={2} />
        <VizFlow path="M 94 52 L 104 65" index={3} tone="bush" />
        <VizFlow path="M 131 36 L 131 44 L 98 44 L 98 80" index={4} tone="ink" />
        <VizFlow path="M 131 74 L 131 80 L 98 80" index={5} tone="bush" />
      </svg>
    </VizFrame>
  );
}
