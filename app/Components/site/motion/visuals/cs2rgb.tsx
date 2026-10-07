"use client";

import React from "react";
import { VizFrame } from "../viz-frame";
import { VIEWBOX, VizNode, VizEdge, VizFlow, VizBar, VizLabel } from "../viz-primitives";

export function Cs2rgbGsi() {
  return (
    <VizFrame
      title="Diagram: Counter-Strike 2 publishes signed game state over HTTP to a local listener. The game process is never hooked or injected into."
      caption="The game publishes its own state — no hooks, no injection, no overlay"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizNode x={2} y={28} w={44} h={24} label="CS2" sublabel="game process" tone="flag" index={0} />

        <VizEdge path="M 46 40 L 62 40" index={0} tone="bush" />
        <VizLabel x={54} y={34} text="GSI" anchor="middle" tone="bush" size={4.5} />

        <VizNode x={64} y={28} w={40} h={24} label="SIGNED JSON" sublabel="structured state" index={1} />
        <VizEdge path="M 104 40 L 118 40" index={1} />
        <VizNode x={120} y={28} w={38} h={24} label="LISTENER" sublabel="local" tone="water" index={2} />

        <VizLabel x={2} y={70} text="PLAYER · ROUND · MAP · PROVIDER" tone="muted" size={4.5} />
        <VizLabel x={2} y={80} text="GAME NEVER TOUCHED" tone="ink" size={5} />
        <VizLabel x={2} y={89} text="100% READ-ONLY FROM THE GAME" tone="muted" size={4.5} />
        <VizFlow path="M 46 40 L 62 40" index={0} tone="bush" />
        <VizFlow path="M 104 40 L 118 40" index={1} tone="water" />
      </svg>
    </VizFrame>
  );
}

export function Cs2rgbListener() {
  return (
    <VizFrame
      title="Diagram of the secure listener: an incoming payload is validated against a secret key from the GSI config before any state is trusted, blocking spoofed or stale streams."
      caption="Secret-key validation before state is trusted"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizNode x={2} y={12} w={44} h={18} label="INBOUND" sublabel="JSON payload" index={0} />
        <VizEdge path="M 46 21 L 58 21" index={0} />
        <VizNode x={60} y={12} w={44} h={18} label="SECRET KEY" sublabel="from GSI config" tone="flag" index={1} />
        <VizEdge path="M 82 30 L 82 40" index={1} />

        <VizNode x={60} y={42} w={44} h={18} label="VALIDATE" tone="ink" index={2} />

        <VizEdge path="M 104 47 L 118 30" index={2} tone="bush" />
        <VizEdge path="M 104 53 L 118 66" index={2} tone="flag" />

        <VizNode x={120} y={20} w={38} h={18} label="TRUSTED" tone="bush" index={3} />
        <VizNode x={120} y={56} w={38} h={18} label="BLOCKED" sublabel="spoofed" tone="muted" index={4} />

        <VizLabel x={2} y={48} text="NO SHARED KEY" tone="muted" size={4.5} />
        <VizLabel x={2} y={86} text="NO SPOOFED EVENTS" tone="flag" size={4.5} />
        <VizFlow path="M 46 21 L 58 21" index={0} tone="water" />
        <VizFlow path="M 82 30 L 82 40" index={1} tone="flag" />
        <VizFlow path="M 104 47 L 118 30" index={2} tone="bush" />
        <VizFlow path="M 104 53 L 118 66" index={3} tone="flag" />
      </svg>
    </VizFrame>
  );
}

export function Cs2rgbClient() {
  return (
    <VizFrame
      title="Diagram: openrgb-python talks to the running OpenRGB daemon, so lighting changes work across manufacturers without vendor specific SDKs."
      caption="Works across manufacturers — no vendor-specific SDKs"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizNode x={2} y={30} w={40} h={20} label="LISTENER" index={0} />
        <VizEdge path="M 42 40 L 54 40" index={0} />
        <VizNode x={56} y={30} w={44} h={20} label="openrgb-python" sublabel="client" tone="flag" index={1} />
        <VizEdge path="M 100 40 L 112 40" index={1} tone="bush" />
        <VizNode x={114} y={30} w={44} h={20} label="OPENRGB DAEMON" index={2} />

        <VizEdge path="M 136 50 L 136 70 L 20 70" index={2} tone="bush" />
        {[20, 58, 96, 134].map((x, i) => (
          <VizEdge key={x} path={`M ${x} 70 L ${x} 74`} index={i + 3} tone="bush" />
        ))}
        <VizLabel x={80} y={89} text="CROSS-VENDOR RGB DEVICES" anchor="middle" tone="bush" size={4.5} />
        <VizFlow path="M 42 40 L 54 40" index={0} />
        <VizFlow path="M 100 40 L 112 40" index={1} tone="bush" />
        <VizFlow path="M 136 50 L 136 70 L 20 70" index={2} tone="water" />
        {[20, 58, 96, 134].map((x, i) => (
          <VizFlow key={x} path={`M ${x} 70 L ${x} 74`} index={i + 3} tone="bush" />
        ))}

        {["KB", "MOUSE", "RAM", "FAN"].map((d, i) => (
          <VizNode key={d} x={4 + i * 38} y={74} w={32} h={12} label={d} tone="muted" index={i + 3} />
        ))}
      </svg>
    </VizFrame>
  );
}

export function Cs2rgbColourMap() {
  const tiers = [
    { label: "GREEN", range: "80–100", tone: "bush" as const, v: 100 },
    { label: "YELLOW", range: "50–79", tone: "water" as const, v: 72 },
    { label: "ORANGE", range: "20–49", tone: "flag" as const, v: 42 },
    { label: "RED", range: "1–19", tone: "flag" as const, v: 15 },
  ];

  return (
    <VizFrame
      title="Bar chart mapping health to colour tiers: green 80 to 100, yellow 50 to 79, orange 20 to 49, red 1 to 19, alongside environment effects and round events."
      caption="Health tiers · environment effects · game phase · round events"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        {tiers.map((t, i) => (
          <VizBar key={t.label} x={4} y={16 + i * 15} w={62} label={t.label} value={t.v} tone={t.tone} display={t.range} index={i} />
        ))}

        <VizLabel x={88} y={16} text="ENVIRONMENT" tone="muted" size={4.5} />
        <VizLabel x={88} y={28} text="WHITE FLASH" tone="muted" size={4.5} />
        <VizLabel x={88} y={38} text="BURN FLICKER" tone="flag" size={4.5} />
        <VizLabel x={88} y={48} text="GREY SMOKE" tone="muted" size={4.5} />
        <VizLabel x={88} y={64} text="ROUND EVENTS" tone="muted" size={4.5} />
        <VizLabel x={88} y={76} text="BOMB PLANTED" tone="flag" size={4.5} />
        <VizLabel x={88} y={86} text="ROUND WIN" tone="bush" size={4.5} />

        <VizNode x={4} y={72} w={16} h={12} label="GSI" tone="water" index={4} />
        <VizEdge path="M 20 78 L 30 78" index={4} />
        <VizNode x={32} y={72} w={18} h={12} label="MAP" tone="flag" index={5} />
        <VizEdge path="M 50 78 L 58 78" index={5} tone="bush" />
        <VizNode x={60} y={72} w={16} h={12} label="RGB" tone="bush" index={6} />
        <VizFlow path="M 20 78 L 30 78" index={4} tone="water" />
        <VizFlow path="M 50 78 L 58 78" index={5} tone="bush" />
      </svg>
    </VizFrame>
  );
}

export function Cs2rgbObservability() {
  return (
    <VizFrame
      title="Diagram of the observability pipeline: every game state payload and system event is written to a structured log for debugging mappings and tracing missed events."
      caption="Every payload and event logged — for debugging mappings and missed events"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        {["STATE PAYLOAD", "EVENT"].map((s, i) => (
          <VizNode key={s} x={2 + i * 44} y={10} w={40} h={16} label={s} index={i} />
        ))}
        <VizEdge path="M 22 26 L 22 36" index={0} />
        <VizEdge path="M 66 26 L 66 36" index={1} />

        <VizNode x={2} y={38} w={84} h={18} label="STRUCTURED LOG" tone="flag" index={2} />
        <VizEdge path="M 86 47 L 100 47" index={2} />

        <VizNode x={102} y={28} w={56} h={18} label="DEBUG MAPPING" index={3} />
        <VizNode x={102} y={56} w={56} h={18} label="TRACE MISSED" sublabel="events" index={4} />
        <VizEdge path="M 86 47 L 100 65" index={3} />

        <VizLabel x={2} y={72} text="DEPENDENCY-LIGHT" tone="ink" size={5} />
        <VizLabel x={2} y={82} text="PYTHON + LOCAL HTTP + GSI + OPENRGB" tone="muted" size={4.5} />
        <VizFlow path="M 22 26 L 22 36" index={0} tone="water" />
        <VizFlow path="M 66 26 L 66 36" index={1} tone="water" />
        <VizFlow path="M 86 47 L 100 47" index={2} tone="flag" />
        <VizFlow path="M 86 47 L 100 65" index={3} tone="flag" />
      </svg>
    </VizFrame>
  );
}