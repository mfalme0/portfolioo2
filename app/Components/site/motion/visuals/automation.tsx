"use client";

import React from "react";
import { VizFrame } from "../viz-frame";
import { VIEWBOX, VizNode, VizEdge, VizFlow, VizBar, VizLabel } from "../viz-primitives";

export function AutomationDeliveryPipeline() {
  return (
    <VizFrame
      title="Diagram: a commit passes through build, test, deploy and verify stages, replacing manual release steps and cutting deployment errors by 45 percent."
      caption="Manual release steps replaced by pipeline stages"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        {["COMMIT", "BUILD", "TEST", "DEPLOY", "VERIFY"].map((s, i) => (
          <VizNode key={s} x={2 + i * 32} y={34} w={26} h={18} label={s} tone={i === 4 ? "bush" : "ink"} index={i} />
        ))}
        {["M 28 43 L 33 43", "M 60 43 L 65 43", "M 92 43 L 97 43", "M 124 43 L 129 43"].map((d, i) => (
          <VizEdge key={d} path={d} index={i} />
        ))}
        <VizFlow path="M 28 43 L 130 43" index={0} tone="bush" />

        <VizLabel x={4} y={20} text="MANUAL — ERROR-PRONE" tone="muted" size={4.5} />
        <VizLabel x={4} y={70} text="PIPELINED — REPEATABLE" tone="bush" size={4.5} />
        <VizBar x={4} y={78} w={100} label="DEPLOYMENT ERRORS" value={45} max={100} display="−45%" tone="bush" index={1} />
      </svg>
    </VizFrame>
  );
}

export function AutomationAdminBurden() {
  return (
    <VizFrame
      title="Bar chart: automation reclaimed 15 hours per week at one institution and 4 hours per week at the other, removing repetitive administrative work."
      caption="Reclaimed staff time — repetitive work automated, not eliminated"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizLabel x={4} y={14} text="HOURS REGAINED PER WEEK" tone="ink" size={5} />
        <VizBar x={4} y={30} w={140} label="OPERATIONS TEAM" value={15} max={16} display="15+" index={0} />
        <VizBar x={4} y={52} w={140} label="ADMIN WORKLOAD" value={4} max={16} display="4" tone="water" index={1} />

        <VizLabel x={4} y={74} text="REPORTING" tone="muted" size={4.5} />
        <VizLabel x={4} y={81} text="DATA ENTRY" tone="muted" size={4.5} />
        <VizLabel x={4} y={88} text="FOLLOW-UPS" tone="muted" size={4.5} />
      </svg>
    </VizFrame>
  );
}

export function AutomationOperationalLoop() {
  return (
    <VizFrame
      title="Diagram: a loop from monitoring to health check to preventive fix to ticket, showing recurring issues being resolved at the source instead of generating repeat support load."
      caption="Recurring problems stop generating tickets"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizNode x={2} y={30} w={32} h={20} label="MONITOR" index={0} />
        <VizEdge path="M 34 40 L 44 40" index={0} />
        <VizNode x={46} y={30} w={32} h={20} label="HEALTH CHECK" index={1} />
        <VizEdge path="M 78 40 L 88 40" index={1} />
        <VizNode x={90} y={30} w={32} h={20} label="PREVENTIVE FIX" tone="flag" index={2} />
        <VizEdge path="M 122 40 L 132 40" index={2} />
        <VizNode x={134} y={30} w={24} h={20} label="NO TICKET" tone="bush" index={3} />

        <VizEdge path="M 106 30 L 106 16 L 18 16 L 18 28" index={3} dashed />
        <VizLabel x={62} y={13} text="CONTINUOUS" anchor="middle" tone="muted" size={4.5} />

        <VizLabel x={4} y={70} text="WAS: FIREFIGHTING" tone="muted" size={4.5} />
        <VizLabel x={4} y={78} text="NOW: CAUGHT BEFORE USERS NOTICE" tone="ink" size={4.5} />
      </svg>
    </VizFrame>
  );
}