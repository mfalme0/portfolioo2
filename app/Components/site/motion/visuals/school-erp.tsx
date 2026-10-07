"use client";

import React from "react";
import { VizFrame } from "../viz-frame";
import { VIEWBOX, VizNode, VizEdge, VizFlow, VizBar, VizLabel } from "../viz-primitives";

/** All case study visuals are pure presentational — they take no props. */
export type VizProps = Record<string, never>;

export function ErpModularArchitecture() {
  return (
    <VizFrame
      title="Diagram: four ERP modules — student records, attendance, finance and communication — reading and writing to one shared data layer."
      caption="Modular application over shared data — RESTful APIs, one source of truth"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        {[
          { label: "STUDENT", x: 2 },
          { label: "ATTEND", x: 41 },
          { label: "FINANCE", x: 80 },
          { label: "COMMS", x: 119 },
        ].map((m, i) => (
          <VizNode key={m.label} x={m.x} y={6} w={39} h={16} label={m.label} index={i} />
        ))}

        {["M 21 22 L 21 34", "M 60 22 L 60 34", "M 99 22 L 99 34", "M 138 22 L 138 34"].map(
          (d, i) => (
            <VizEdge key={d} path={d} index={i} />
          )
        )}

        <VizNode x={2} y={36} w={156} h={20} label="SHARED DATA LAYER" sublabel="PostgreSQL / MySQL · RESTful APIs" tone="flag" index={4} />
        {["M 21 22 L 21 34", "M 60 22 L 60 34", "M 99 22 L 99 34", "M 138 22 L 138 34"].map((path, i) => (
          <VizFlow key={path} path={path} index={i} tone="water" />
        ))}

        {["M 21 56 L 21 66", "M 99 56 L 99 66"].map((d, i) => (
          <VizEdge key={d} path={d} index={i} dashed />
        ))}
        <VizFlow path="M 21 56 L 21 66" index={4} tone="flag" />
        <VizFlow path="M 99 56 L 99 66" index={5} tone="flag" />

        <VizNode x={2} y={68} w={39} h={16} label="ADMIN" sublabel="staff console" tone="muted" index={5} />
        <VizNode x={80} y={68} w={39} h={16} label="PARENTS" sublabel="mobile + web" tone="muted" index={6} />
        <VizEdge path="M 138 78 L 138 78" index={6} />
      </svg>
    </VizFrame>
  );
}

export function ErpNotificationPipeline() {
  return (
    <VizFrame
      title="Diagram: an event trigger fans out to push, in-app and messaging channels, with delivery confirmation and a fallback when a channel fails."
      caption="Event trigger → channel fan-out → confirmation → fallback"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizNode x={2} y={34} w={30} h={20} label="EVENT" sublabel="attendance, fee" index={0} />

        <VizEdge path="M 32 44 L 44 44" index={0} />
        <VizNode x={46} y={34} w={30} h={20} label="ROUTER" sublabel="priority" tone="flag" index={1} />

        <VizEdge path="M 76 44 L 86 20" index={1} />
        <VizEdge path="M 76 44 L 86 44" index={1} />
        <VizEdge path="M 76 44 L 86 68" index={1} />

        <VizNode x={88} y={10} w={32} h={16} label="PUSH" index={2} />
        <VizNode x={88} y={36} w={32} h={16} label="IN-APP" index={3} />
        <VizNode x={88} y={62} w={32} h={16} label="SMS / WA" index={4} />

        <VizEdge path="M 120 18 L 132 34" index={2} />
        <VizEdge path="M 120 44 L 132 44" index={3} />
        <VizEdge path="M 120 70 L 132 54" index={4} />

        <VizNode x={134} y={34} w={24} h={20} label="SENT" sublabel="confirmed" tone="bush" index={5} />

        <VizEdge path="M 104 28 L 104 58" index={5} dashed tone="flag" />
        <VizLabel x={108} y={46} text="fallback" tone="flag" size={4.5} />

        <VizFlow path="M 32 44 L 44 44" index={0} />
        <VizFlow path="M 76 44 L 86 44" index={1} tone="bush" />
        <VizFlow path="M 76 44 L 86 20" index={2} tone="water" />
        <VizFlow path="M 76 44 L 86 68" index={3} tone="water" />
        <VizFlow path="M 120 18 L 132 34" index={4} tone="bush" />
        <VizFlow path="M 120 70 L 132 54" index={5} tone="bush" />
        <VizFlow path="M 104 28 L 104 58" index={6} tone="flag" />
      </svg>
    </VizFrame>
  );
}

export function ErpAuthLayers() {
  return (
    <VizFrame
      title="Diagram: access to institutional data passes through four layers — password login, on-device biometric verification, session management and account lifecycle."
      caption="Password + biometric, gated behind session and account lifecycle"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        {[
          { label: "PASSWORD", tone: "ink" as const, x: 2 },
          { label: "BIOMETRIC", tone: "flag" as const, x: 41 },
          { label: "SESSION", tone: "ink" as const, x: 80 },
          { label: "LIFECYCLE", tone: "muted" as const, x: 119 },
        ].map((n, i) => (
          <VizNode key={n.label} x={n.x} y={16} w={39} h={20} label={n.label} tone={n.tone} index={i} />
        ))}

        {["M 41 26 L 43 26", "M 80 26 L 82 26", "M 119 26 L 121 26"].map((d, i) => (
          <VizEdge key={d} path={d} index={i} />
        ))}

        <VizNode x={2} y={46} w={156} h={18} label="SENSITIVE INSTITUTIONAL DATA" sublabel="records · attendance · finance" tone="water" index={4} />

        {["M 21 36 L 21 44", "M 60 36 L 60 44", "M 99 36 L 99 44", "M 138 36 L 138 44"].map((d, i) => (
          <VizEdge key={d} path={d} index={i + 4} />
        ))}
        {["M 21 36 L 21 44", "M 60 36 L 60 44", "M 99 36 L 99 44", "M 138 36 L 138 44"].map((path, i) => (
          <VizFlow key={path} path={path} index={i} tone="water" />
        ))}

        <VizLabel x={2} y={78} text="ON-DEVICE VERIFICATION" tone="muted" />
        <VizLabel x={2} y={85} text="NO SHARED CREDENTIALS BETWEEN USERS" tone="muted" />
      </svg>
    </VizFrame>
  );
}

export function ErpDeliveryInfrastructure() {
  return (
    <VizFrame
      title="Diagram: Azure cloud hosting containerised services on Docker and Kubernetes, with Bash and CI/CD pipelines handling releases, and TrueNAS providing redundant 10TB-plus storage."
      caption="Azure · Docker · Kubernetes · TrueNAS, releases through pipelines"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizNode x={2} y={8} w={40} h={16} label="GIT" index={0} />
        <VizEdge path="M 42 16 L 52 16" index={0} />
        <VizNode x={54} y={8} w={44} h={16} label="CI / CD PIPELINE" sublabel="Bash automation" tone="flag" index={1} />

        <VizEdge path="M 76 24 L 76 32" index={1} />
        <VizNode x={54} y={34} w={44} h={18} label="DOCKER" index={2} />
        <VizEdge path="M 76 52 L 76 58" index={2} />
        <VizNode x={54} y={60} w={44} h={16} label="KUBERNETES" index={3} />

        <VizEdge path="M 54 43 L 44 43" index={2} />
        <VizNode x={2} y={34} w={40} h={18} label="AZURE" sublabel="managed cloud" tone="bush" index={4} />

        <VizEdge path="M 98 43 L 110 43" index={3} dashed />
        <VizNode x={112} y={34} w={46} h={18} label="TRUENAS" sublabel="10TB+ redundant" tone="water" index={5} />

        <VizLabel x={2} y={70} text="MANUAL RELEASES" tone="muted" size={4.5} />
        <VizLabel x={2} y={77} text="REPLACED BY PIPELINES" tone="flag" size={4.5} />
        <VizLabel x={2} y={85} text="−45% DEPLOYMENT ERRORS" tone="flag" size={4.5} />
        <VizFlow path="M 42 16 L 52 16" index={0} tone="flag" />
        <VizFlow path="M 76 24 L 76 32" index={1} tone="flag" />
        <VizFlow path="M 76 52 L 76 58" index={2} tone="flag" />
        <VizFlow path="M 54 43 L 44 43" index={3} tone="bush" />
      </svg>
    </VizFrame>
  );
}

export function ErpOperationsUptime() {
  return (
    <VizFrame
      title="Bar chart: uptime 99.9 percent, internet downtime 50 percent lower, ISP support tickets 90 percent fewer, deployment errors 45 percent down."
      caption="Measured results — monitored and maintained through a school year"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizBar x={4} y={16} w={96} label="UPTIME" value={99.9} max={100} display="99.9%" index={0} />
        <VizBar x={4} y={36} w={96} label="INTERNET DOWNTIME" value={50} max={100} display="−50%" tone="bush" index={1} />
        <VizBar x={4} y={56} w={96} label="ISP TICKETS" value={90} max={100} display="−90%" tone="bush" index={2} />
        <VizBar x={4} y={76} w={96} label="DEPLOYMENT ERRORS" value={45} max={100} display="−45%" tone="water" index={3} />

        <VizLabel x={112} y={16} text="MONITOR" tone="ink" size={4.5} />
        <VizLabel x={112} y={26} text="MAINTAIN" tone="muted" size={4.5} />
        <VizLabel x={112} y={36} text="RESPOND" tone="muted" size={4.5} />
        <VizLabel x={112} y={46} text="ROOT CAUSE" tone="flag" size={4.5} />
      </svg>
    </VizFrame>
  );
}