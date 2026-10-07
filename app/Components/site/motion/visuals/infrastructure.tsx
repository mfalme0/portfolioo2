"use client";

import React from "react";
import { VizFrame } from "../viz-frame";
import { VIEWBOX, VizNode, VizEdge, VizFlow, VizBar, VizLabel } from "../viz-primitives";

export function InfraNetworkFoundation() {
  return (
    <VizFrame
      title="Diagram: a primary internet link and a failover path both reach the internal switch, which fans out to structured-cabled endpoints, keeping the institution online through link failure."
      caption="Deliberate switching, structured cabling and failover paths"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizNode x={2} y={10} w={40} h={16} label="PRIMARY LINK" index={0} />
        <VizNode x={2} y={62} w={40} h={16} label="FAILOVER" tone="water" index={1} />

        <VizEdge path="M 42 18 L 68 40" index={0} />
        <VizEdge path="M 42 70 L 68 48" index={1} dashed />

        <VizNode x={70} y={34} w={36} h={20} label="CORE SWITCH" sublabel="routing design" tone="flag" index={2} />

        <VizEdge path="M 106 44 L 118 20" index={2} />
        <VizEdge path="M 106 44 L 118 44" index={2} />
        <VizEdge path="M 106 44 L 118 68" index={2} />

        <VizNode x={120} y={10} w={38} h={16} label="STRUCTURED CABLING" index={3} />
        <VizNode x={120} y={36} w={38} h={16} label="ENDPOINTS" tone="muted" index={4} />
        <VizNode x={120} y={62} w={38} h={16} label="SERVERS" tone="muted" index={5} />

        <VizFlow path="M 42 18 L 68 40" index={0} tone="water" />
        <VizFlow path="M 42 70 L 68 48" index={1} tone="water" />
        <VizFlow path="M 106 44 L 118 20" index={2} tone="bush" />
        <VizFlow path="M 106 44 L 118 44" index={3} tone="bush" />
        <VizFlow path="M 106 44 L 118 68" index={4} tone="bush" />

        <VizLabel x={2} y={40} text="LINK FAILS →" tone="flag" size={4.5} />
        <VizLabel x={2} y={48} text="STAYS ONLINE" tone="flag" size={4.5} />
        <VizLabel x={2} y={56} text="NOT A TICKET" tone="muted" size={4.5} />
      </svg>
    </VizFrame>
  );
}

export function InfraStorageBackups() {
  return (
    <VizFrame
      title="Diagram: a TrueNAS high-availability storage pair with mirroring and a separate backup target, holding more than 10TB of institutional data."
      caption="Redundant storage with real backups — 10TB+ institutional data"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizNode x={2} y={6} w={48} h={16} label="PRIMARY POOL" index={0} />
        <VizNode x={2} y={26} w={48} h={16} label="MIRRORED POOL" tone="water" index={1} />

        <VizEdge path="M 50 14 L 68 14 L 68 34 L 50 34" index={0} />
        <VizLabel x={64} y={26} text="MIRROR" anchor="middle" tone="muted" size={4} />

        <VizEdge path="M 26 42 L 26 54" index={1} />
        <VizNode x={2} y={56} w={48} h={16} label="BACKUP TARGET" tone="flag" index={2} />
        <VizEdge path="M 26 56 L 26 42" index={2} dashed />

        <VizEdge path="M 50 22 L 78 22 L 78 40" index={0} />
        <VizNode x={80} y={32} w={78} h={18} label="INSTITUTIONAL DATA" sublabel="10TB+ · redundancy" tone="ink" index={3} />

        <VizLabel x={80} y={62} text="NOT SCATTERED" tone="muted" size={4.5} />
        <VizLabel x={80} y={70} text="NOT UNREPLICATED" tone="muted" size={4.5} />
        <VizLabel x={80} y={80} text="BACKUPS ARE REAL" tone="bush" size={4.5} />
        <VizFlow path="M 50 14 L 68 14 L 68 34 L 50 34" index={0} tone="water" />
        <VizFlow path="M 26 42 L 26 54" index={1} tone="flag" />
        <VizFlow path="M 50 22 L 78 22 L 78 40" index={2} tone="bush" />
      </svg>
    </VizFrame>
  );
}

export function InfraMonitoringOps() {
  return (
    <VizFrame
      title="Bar chart: internet downtime 50 percent lower, ISP support calls 90 percent fewer, printer issues 40 percent fewer."
      caption="Proactive monitoring replaced firefighting"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizBar x={4} y={20} w={92} label="INTERNET DOWNTIME" value={50} max={100} display="−50%" tone="bush" index={0} />
        <VizBar x={4} y={46} w={92} label="ISP SUPPORT" value={90} max={100} display="−90%" tone="bush" index={1} />
        <VizBar x={4} y={72} w={92} label="PRINTER ISSUES" value={40} max={100} display="−40%" tone="water" index={2} />

        <VizLabel x={104} y={20} text="MONITORING" tone="ink" size={4.5} />
        <VizLabel x={104} y={32} text="SCHEDULED" tone="muted" size={4.5} />
        <VizLabel x={104} y={44} text="MAINTENANCE" tone="muted" size={4.5} />
        <VizLabel x={104} y={56} text="ROOT CAUSE" tone="muted" size={4.5} />
        <VizLabel x={104} y={72} text="RESPONSE" tone="flag" size={4.5} />
      </svg>
    </VizFrame>
  );
}

export function InfraDeviceOps() {
  return (
    <VizFrame
      title="Diagram: recurring printer and endpoint faults traced to their root cause and fixed structurally, so recurring support tickets stop being generated."
      caption="Structural fixes on recurring device faults"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizNode x={2} y={12} w={36} h={16} label="SYMPTOM" sublabel="printer jam" index={0} />
        <VizEdge path="M 38 20 L 50 20" index={0} />
        <VizNode x={52} y={12} w={36} h={16} label="TRACE" index={1} />
        <VizEdge path="M 88 20 L 100 20" index={1} />
        <VizNode x={102} y={12} w={36} h={16} label="ROOT CAUSE" tone="flag" index={2} />
        <VizEdge path="M 120 28 L 120 38" index={2} />
        <VizNode x={102} y={40} w={56} h={16} label="STRUCTURAL FIX" tone="bush" index={3} />

        <VizEdge path="M 20 28 L 20 56" index={0} dashed />
        <VizNode x={2} y={58} w={36} h={16} label="TICKET" sublabel="no longer" tone="muted" index={4} />

        <VizLabel x={2} y={82} text="−40% PRINTER ISSUES" tone="ink" size={4.5} />
        <VizFlow path="M 38 20 L 50 20" index={0} />
        <VizFlow path="M 88 20 L 100 20" index={1} tone="flag" />
        <VizFlow path="M 120 28 L 120 38" index={2} tone="bush" />
      </svg>
    </VizFrame>
  );
}