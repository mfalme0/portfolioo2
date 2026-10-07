"use client";

import React from "react";
import { VizFrame } from "../viz-frame";
import { VIEWBOX, VizNode, VizEdge, VizFlow, VizBar, VizLabel } from "../viz-primitives";

export function NexusEvidence() {
  return (
    <VizFrame
      title="Diagram contrasting an evidence-backed conclusion, built from observations and required-evidence coverage, against a confidence claim invented by the model."
      caption="Confidence derived from observations, never invented"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        {["OBSERVE", "CONTRADICT", "COVERAGE"].map((s, i) => (
          <VizNode key={s} x={2 + i * 32} y={8} w={28} h={16} label={s} index={i} />
        ))}
        <VizEdge path="M 30 16 L 33 16" index={0} />
        <VizEdge path="M 62 16 L 65 16" index={1} />

        <VizEdge path="M 96 20 L 96 30 L 46 30 L 46 38" index={2} tone="bush" />
        <VizNode x={6} y={40} w={82} h={18} label="VERIFIED ROOT CAUSE" tone="bush" index={3} />
        <VizLabel x={94} y={52} text="EVIDENCE-BACKED" tone="bush" size={4.5} />

        <VizEdge path="M 96 20 L 96 68 L 46 68 L 46 60" index={2} dashed tone="flag" />
        <VizNode x={6} y={60} w={82} h={18} label={'"DISK USAGE IS NORMAL"'} sublabel="unverified claim" tone="muted" index={4} />
        <VizLabel x={94} y={72} text="REJECTED" tone="flag" size={4.5} />

        <VizLabel x={6} y={86} text='UNVERIFIED → "I COULD NOT VERIFY"' tone="ink" size={4.5} />
        <VizFlow path="M 96 20 L 96 30 L 46 30 L 46 38" index={0} tone="bush" />
        <VizFlow path="M 96 20 L 96 68 L 46 68 L 46 60" index={1} tone="flag" />
      </svg>
    </VizFrame>
  );
}

export function NexusPermissions() {
  return (
    <VizFrame
      title="Diagram of four permission classes enforced outside the model: read only, low risk, requires approval and forbidden, with no arbitrary shell access anywhere."
      caption="Authorization is enforced outside the LLM — it cannot bypass the permission layer"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        {[
          { label: "READ_ONLY", tone: "bush" as const, x: 2 },
          { label: "LOW_RISK", tone: "water" as const, x: 41 },
          { label: "REQUIRES_APPROVAL", tone: "flag" as const, x: 80 },
          { label: "FORBIDDEN", tone: "muted" as const, x: 119 },
        ].map((p, i) => (
          <VizNode key={p.label} x={p.x} y={10} w={39} h={18} label={p.label} tone={p.tone} index={i} />
        ))}

        <VizLabel x={2} y={42} text="ALLOWLIST, NOT DENYLIST" tone="ink" size={5} />
        <VizLabel x={2} y={52} text="NO ARBITRARY SHELL" tone="flag" size={5} />

        <VizNode x={2} y={60} w={48} h={16} label="EVERY TOOL" sublabel="typed, with class" index={4} />
        <VizNode x={56} y={60} w={48} h={16} label="PERMISSION LAYER" sublabel="outside the model" tone="flag" index={5} />
        <VizNode x={110} y={60} w={48} h={16} label="AUDIT TRAIL" tone="bush" index={6} />

        <VizEdge path="M 50 68 L 55 68" index={5} />
        <VizEdge path="M 104 68 L 109 68" index={6} />
        <VizFlow path="M 50 68 L 55 68" index={0} tone="water" />
        <VizFlow path="M 104 68 L 109 68" index={1} tone="bush" />
      </svg>
    </VizFrame>
  );
}

export function NexusApproval() {
  return (
    <VizFrame
      title="Diagram of an approval gate: a destructive action stops before execution, waits for a human decision, and only then runs, with read only as the default."
      caption="Default mode is READ_ONLY — destructive ops must be explicitly enabled"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizNode x={2} y={28} w={34} h={20} label="AGENT" index={0} />
        <VizEdge path="M 36 38 L 48 38" index={0} />

        <VizNode x={50} y={28} w={40} h={20} label="GATE" sublabel="approval layer" tone="flag" index={1} />

        <VizEdge path="M 90 32 L 104 16" index={1} tone="bush" />
        <VizEdge path="M 90 38 L 104 34" index={1} tone="flag" />
        <VizEdge path="M 90 44 L 104 74" index={1} tone="muted" />

        <VizNode x={106} y={8} w={52} h={16} label="READ ONLY" sublabel="default" tone="bush" index={2} />
        <VizNode x={106} y={26} w={52} h={16} label="HUMAN SAYS YES" tone="flag" index={3} />
        <VizNode x={106} y={48} w={52} h={16} label="EXECUTE" tone="bush" index={5} />
        <VizNode x={106} y={68} w={52} h={16} label="FORBIDDEN" sublabel="never runs" tone="muted" index={4} />

        <VizEdge path="M 132 42 L 132 46" index={3} tone="bush" />
        <VizLabel x={2} y={18} text="NOPE — STOPS HERE" tone="flag" size={4.5} />
        <VizFlow path="M 36 38 L 48 38" index={0} />
        <VizFlow path="M 90 38 L 104 34" index={1} tone="flag" />
        <VizFlow path="M 132 42 L 132 46" index={2} tone="bush" />
      </svg>
    </VizFrame>
  );
}

export function NexusExplainable() {
  return (
    <VizFrame
      title="Diagram of an explainable reasoning step: observations, a hypothesis, the test run, and the conclusion, each shown with the evidence collected alongside it."
      caption="Reasoning summaries and evidence at every step — never hidden chain of thought"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        {["OBSERVATION", "HYPOTHESIS", "TEST", "CONCLUSION"].map((s, i) => (
          <VizNode key={s} x={2 + i * 40} y={8} w={36} h={16} label={s} tone={i === 3 ? "bush" : "ink"} index={i} />
        ))}
        {["M 38 16 L 41 16", "M 78 16 L 81 16", "M 118 16 L 121 16"].map((d, i) => (
          <VizEdge key={d} path={d} index={i} />
        ))}

        {["EVIDENCE", "CHECKS", "RESULT", "EVIDENCE"].map((s, i) => (
          <VizNode key={s} x={2 + i * 40} y={36} w={36} h={16} label={s} tone="muted" index={i + 4} />
        ))}
        {["M 20 24 L 20 34", "M 60 24 L 60 34", "M 100 24 L 100 34", "M 140 24 L 140 34"].map((d, i) => (
          <VizEdge key={d} path={d} index={i + 4} dashed />
        ))}
        {["M 20 24 L 20 34", "M 60 24 L 60 34", "M 100 24 L 100 34", "M 140 24 L 140 34"].map((path, i) => (
          <VizFlow key={path} path={path} index={i} tone="water" />
        ))}

        <VizLabel x={2} y={66} text="SHOWN" tone="bush" size={5} />
        <VizLabel x={2} y={76} text="NOT: HIDDEN CHAIN OF THOUGHT" tone="flag" size={4.5} />
      </svg>
    </VizFrame>
  );
}

export function NexusLifecycle() {
  const steps = ["CLASSIFY", "CONTEXT", "EVIDENCE", "HYPOTHESIS", "TEST", "ROOT CAUSE", "REMEDIATE"];

  return (
    <VizFrame
      title="Diagram of the investigation lifecycle from classify through context, evidence, hypothesis, test, root cause and remediate, with a loop back when evidence is insufficient."
      caption="When evidence is insufficient the loop iterates instead of inventing a root cause"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        {steps.map((s, i) => (
          <VizNode key={s} x={2 + i * 22} y={30} w={19} h={16} label={s} tone={i === 5 ? "flag" : "ink"} index={i} />
        ))}
        {steps.slice(0, -1).map((_, i) => {
          const path = `M ${21 + i * 22} 38 L ${24 + i * 22} 38`;
          return <VizEdge key={path} path={path} index={i} />;
        })}
        {steps.slice(0, -1).map((_, i) => {
          const path = `M ${21 + i * 22} 38 L ${24 + i * 22} 38`;
          return <VizFlow key={path} path={path} index={i} tone={i === 5 ? "bush" : "water"} />;
        })}

        <VizEdge path="M 22 22 L 110 22 L 110 28" index={0} dashed tone="flag" />
        <VizLabel x={112} y={20} text="NOT ENOUGH" tone="flag" size={4.5} />
        <VizLabel x={112} y={26} text="EVIDENCE → LOOP" tone="flag" size={4.5} />

        <VizLabel x={2} y={14} text="INVESTIGATE LIKE A CAREFUL OPERATOR" tone="ink" size={5} />

        <VizEdge path="M 130 46 L 130 60 L 12 60 L 12 48" index={7} dashed tone="bush" />
        <VizLabel x={72} y={68} text="LOOP" anchor="middle" tone="bush" size={4.5} />

        <VizLabel x={2} y={82} text="APPROVAL → EXECUTE → VERIFY → CLOSE" tone="ink" size={4.5} />
        <VizFlow path="M 130 46 L 130 60 L 12 60 L 12 48" index={0} tone="bush" />
      </svg>
    </VizFrame>
  );
}

export function NexusPhase1() {
  return (
    <VizFrame
      title="Bar chart of the verified phase 1 foundation components: FastAPI application factory, PostgreSQL 16 persistence, Redis and structured logging, all verified against live services."
      caption="CI runs ruff, strict mypy and pytest against real PostgreSQL and Redis"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizBar x={4} y={18} w={84} label="POSTGRESQL 16" value={100} display="LIVE" tone="bush" index={0} />
        <VizBar x={4} y={40} w={84} label="REDIS 7" value={100} display="LIVE" tone="bush" index={1} />
        <VizBar x={4} y={62} w={84} label="FASTAPI FACTORY" value={100} display="LIVE" tone="bush" index={2} />
        <VizBar x={4} y={82} w={84} label="CI: RUFF MYPY PYTEST" value={100} display="PASS" tone="bush" index={3} />

        <VizLabel x={96} y={18} text="ASYNC" tone="muted" size={4.5} />
        <VizLabel x={96} y={30} text="SQLALCHEMY" tone="muted" size={4.5} />
        <VizLabel x={96} y={40} text="ALEMBIC" tone="muted" size={4.5} />
        <VizLabel x={96} y={52} text="STRUCTLOG" tone="muted" size={4.5} />
        <VizLabel x={96} y={62} text="DOCKER" tone="muted" size={4.5} />
        <VizLabel x={96} y={80} text="DEGRADES" tone="ink" size={4.5} />
        <VizLabel x={96} y={89} text="GRACEFULLY" tone="ink" size={4.5} />
      </svg>
    </VizFrame>
  );
}