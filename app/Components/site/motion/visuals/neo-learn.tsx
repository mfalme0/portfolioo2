"use client";

import React from "react";
import { VizFrame } from "../viz-frame";
import { VIEWBOX, VizNode, VizEdge, VizFlow, VizLabel } from "../viz-primitives";

export function NeoTransportAbstraction() {
  return (
    <VizFrame
      title="Diagram: a learner reaches the same learning platform through either a rich web and mobile interface or an SMS and SIM Toolkit fallback, with the platform holding all learner and course state centrally."
      caption="Two interfaces, one platform — the interface changes, the learning state does not"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizNode x={2} y={32} w={26} h={22} label="STUDENT" index={0} />

        <VizEdge path="M 28 38 L 42 18" index={0} tone="bush" />
        <VizEdge path="M 28 48 L 42 66" index={0} tone="flag" />

        <VizNode x={44} y={8} w={46} h={16} label="WEB / MOBILE UI" sublabel="rich, connected" tone="bush" index={1} />
        <VizNode x={44} y={58} w={46} h={16} label="SMS / STK" sublabel="low connectivity" tone="flag" index={2} />

        <VizEdge path="M 90 16 L 104 38" index={1} />
        <VizEdge path="M 90 66 L 104 50" index={2} />

        <VizNode x={106} y={28} w={30} h={24} label="API" index={3} />

        <VizEdge path="M 136 40 L 148 40" index={3} />
        <VizNode x={2} y={82} w={156} h={8} label="CENTRAL STATE" tone="water" index={4} />
        <VizEdge path="M 121 52 L 121 80" index={4} tone="water" />

        <VizFlow path="M 28 38 L 42 18" index={0} tone="bush" />
        <VizFlow path="M 28 48 L 42 66" index={1} tone="flag" />
        <VizFlow path="M 90 16 L 104 38" index={2} tone="bush" />
        <VizFlow path="M 90 66 L 104 50" index={3} tone="flag" />
        <VizFlow path="M 136 40 L 148 40" index={4} tone="water" />
        <VizFlow path="M 121 52 L 121 80" index={5} tone="water" />
      </svg>
    </VizFrame>
  );
}

export function NeoTransportPipeline() {
  return (
    <VizFrame
      title="Diagram: a learning event passes through a message queue and a transport router, which selects SMS or SIM Toolkit to reach the learner, so adding a channel adds a transport rather than rewriting the learning engine."
      caption="Adding a channel means adding a transport, not rewriting the learning engine"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizNode x={2} y={32} w={28} h={20} label="EVENT" index={0} />
        <VizEdge path="M 30 42 L 40 42" index={0} />
        <VizNode x={42} y={32} w={28} h={20} label="QUEUE" index={1} />
        <VizEdge path="M 70 42 L 80 42" index={1} />
        <VizNode x={82} y={32} w={28} h={20} label="ROUTER" tone="flag" index={2} />

        <VizEdge path="M 110 38 L 118 22" index={2} />
        <VizEdge path="M 110 46 L 118 62" index={2} />
        <VizNode x={120} y={14} w={38} h={14} label="SMS" tone="bush" index={3} />
        <VizNode x={120} y={56} w={38} h={14} label="STK" tone="water" index={4} />

        <VizFlow path="M 30 42 L 40 42" index={0} tone="flag" />
        <VizFlow path="M 70 42 L 80 42" index={1} tone="flag" />
        <VizFlow path="M 110 38 L 118 22" index={1} tone="bush" />
        <VizFlow path="M 110 46 L 118 62" index={2} tone="water" />

        <VizLabel x={2} y={78} text="LEARNING ENGINE NEVER SEES THE TRANSPORT" tone="ink" size={4.5} />
        <VizLabel x={2} y={86} text="WEB · ANDROID · SMS · STK · WHATSAPP · EMAIL · PUSH" tone="muted" size={4} />
      </svg>
    </VizFrame>
  );
}

export function NeoStateUnification() {
  return (
    <VizFrame
      title="Diagram: a learner's answer resolves to the same single record whether it arrives through the app interface or an SMS reply, with the backend processing one learner action either way."
      caption="One learner action, one record — whichever interface it arrived through"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizNode x={2} y={10} w={44} h={16} label="APP SUBMIT" sublabel="answer B" tone="bush" index={0} />
        <VizNode x={2} y={58} w={44} h={16} label="SMS REPLY" sublabel="answer B" tone="flag" index={1} />

        <VizEdge path="M 46 18 L 62 38" index={0} tone="bush" />
        <VizEdge path="M 46 66 L 62 46" index={1} tone="flag" />

        <VizNode x={64} y={34} w={32} h={16} label="PROCESS" index={2} />
        <VizEdge path="M 96 42 L 108 42" index={2} />

        <VizNode x={110} y={30} w={48} h={24} label="SAME RECORD" sublabel="progress set" tone="water" index={3} />

        <VizLabel x={2} y={40} text="LEARNER → COURSE →" tone="muted" size={4.5} />
        <VizLabel x={2} y={50} text="LESSON → ANSWER" tone="muted" size={4.5} />
        <VizFlow path="M 46 18 L 62 38" index={0} tone="bush" />
        <VizFlow path="M 46 66 L 62 46" index={1} tone="flag" />
        <VizFlow path="M 96 42 L 108 42" index={2} tone="water" />
      </svg>
    </VizFrame>
  );
}

export function NeoOfflineSync() {
  return (
    <VizFrame
      title="Diagram of the offline-first sync loop: a user action goes to local store and sync queue, waits while the internet is unavailable, then syncs through the backend with conflict resolution once connectivity returns."
      caption="Offline actions queue locally, then resolve conflicts on reconnect"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizNode x={2} y={10} w={30} h={16} label="ACTION" index={0} />
        <VizEdge path="M 32 18 L 42 18" index={0} />
        <VizNode x={44} y={10} w={38} h={16} label="LOCAL STORE" index={1} />
        <VizEdge path="M 63 26 L 63 34" index={1} />
        <VizNode x={44} y={36} w={38} h={16} label="SYNC QUEUE" tone="flag" index={2} />

        <VizEdge path="M 82 44 L 92 44" index={2} />
        <VizNode x={94} y={36} w={30} h={16} label="ONLINE?" tone="water" index={3} />

        <VizEdge path="M 109 52 L 109 62 L 63 62 L 63 54" index={3} dashed tone="muted" />
        <VizLabel x={112} y={66} text="NO — WAIT" tone="muted" size={4.5} />

        <VizEdge path="M 94 44 L 84 44" index={3} dashed />
        <VizEdge path="M 124 44 L 136 44" index={3} tone="bush" />
        <VizNode x={138} y={36} w={20} h={16} label="SYNC" tone="bush" index={4} />

        <VizLabel x={2} y={78} text="CONFLICT RESOLUTION → SYNCED STATE" tone="ink" size={4.5} />
        <VizLabel x={2} y={87} text="SMS IS THE SECOND PATH WHEN IT CANNOT WAIT" tone="flag" size={4.5} />
        <VizFlow path="M 32 18 L 42 18" index={0} tone="water" />
        <VizFlow path="M 63 26 L 63 34" index={1} tone="flag" />
        <VizFlow path="M 82 44 L 92 44" index={2} tone="flag" />
        <VizFlow path="M 124 44 L 136 44" index={3} tone="bush" />
      </svg>
    </VizFrame>
  );
}

export function NeoIdempotency() {
  return (
    <VizFrame
      title="Diagram of idempotent SMS processing: each response is reduced to a message ID, checked against processed events, and either ignored as a duplicate or processed into an acknowledged answer."
      caption="A learner who taps send twice is scored once"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizNode x={2} y={30} w={30} h={20} label="RESPONSE" index={0} />
        <VizEdge path="M 32 40 L 42 40" index={0} />
        <VizNode x={44} y={30} w={34} h={20} label="MSG ID" index={1} />
        <VizEdge path="M 78 40 L 88 40" index={1} />
        <VizNode x={90} y={30} w={34} h={20} label="SEEN?" tone="flag" index={2} />

        <VizEdge path="M 124 36 L 132 20" index={2} tone="muted" />
        <VizEdge path="M 124 44 L 132 60" index={2} tone="bush" />

        <VizNode x={104} y={8} w={54} h={14} label="ALREADY PROCESSED" sublabel="ignore" tone="muted" index={3} />
        <VizNode x={104} y={54} w={54} h={14} label="NEW → PROCESS" tone="bush" index={4} />

        <VizEdge path="M 131 68 L 131 82 L 14 82 L 14 52" index={4} dashed />
        <VizLabel x={16} y={76} text="UPDATE PROGRESS → ACKNOWLEDGE" tone="bush" size={4.5} />

        <VizLabel x={2} y={14} text="HANDLED" tone="ink" size={4.5} />
        <VizLabel x={2} y={22} text="DUPLICATES · OUT OF ORDER · RETRIES" tone="muted" size={4.5} />
        <VizFlow path="M 32 40 L 42 40" index={0} tone="water" />
        <VizFlow path="M 78 40 L 88 40" index={1} tone="flag" />
        <VizFlow path="M 124 36 L 132 20" index={2} tone="ink" />
        <VizFlow path="M 124 44 L 132 60" index={3} tone="bush" />
        <VizFlow path="M 131 68 L 131 82 L 14 82 L 14 52" index={4} tone="bush" />
      </svg>
    </VizFrame>
  );
}

export function NeoMultitenancy() {
  return (
    <VizFrame
      title="Diagram of multi-tenant control: institutions own classes and courses, teachers own content and grading, and learners own their own progress, all inside one platform with role-scoped access."
      caption="Institution-level controls with role-scoped access"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizNode x={2} y={6} w={156} h={14} label="PLATFORM" tone="ink" index={0} />

        {[
          { label: "SCHOOL", sub: "institution", tone: "water" as const, x: 2 },
          { label: "TEACHER", sub: "content + grading", tone: "flag" as const, x: 53 },
          { label: "LEARNER", sub: "own progress", tone: "bush" as const, x: 104 },
        ].map((r, i) => (
          <VizNode key={r.label} x={r.x} y={30} w={54} h={20} label={r.label} sublabel={r.sub} tone={r.tone} index={i + 1} />
        ))}

        {["M 29 20 L 29 28", "M 80 20 L 80 28", "M 131 20 L 131 28"].map((d, i) => (
          <VizEdge key={d} path={d} index={i} />
        ))}
        {["M 29 20 L 29 28", "M 80 20 L 80 28", "M 131 20 L 131 28"].map((path, i) => (
          <VizFlow key={path} path={path} index={i} tone="water" />
        ))}

        <VizLabel x={2} y={62} text="CLASSES · COURSES · MESSAGING STATS" tone="muted" size={4.5} />
        <VizLabel x={2} y={70} text="PERMISSIONS · USAGE ANALYTICS" tone="muted" size={4.5} />
        <VizLabel x={2} y={78} text="DELIVERY STATUS · SYSTEM HEALTH" tone="muted" size={4.5} />
        <VizLabel x={2} y={88} text="SAAS TENANCY, DEMONSTRATED" tone="ink" size={4.5} />
      </svg>
    </VizFrame>
  );
}