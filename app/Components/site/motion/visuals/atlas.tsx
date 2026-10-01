import React from "react";
import { VIEWBOX, VizNode, VizEdge, VizBar, VizLabel } from "../viz-primitives";
import { VizFrame } from "../viz-frame";

export function AtlasGraphEngine() {
  return (
    <VizFrame
      title="Diagram: a directed graph of infrastructure nodes, with a highlighted traversal path crossing several nodes to show pathfinding and cycle detection."
      caption="BFS · DFS · Dijkstra · A* · topological sort · Tarjan SCC"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizNode x={4} y={30} w={26} h={16} label="A" tone="flag" index={0} />
        <VizNode x={40} y={10} w={26} h={16} label="B" index={1} />
        <VizNode x={40} y={50} w={26} h={16} label="C" index={2} />
        <VizNode x={78} y={30} w={26} h={16} label="D" index={3} />
        <VizNode x={116} y={10} w={26} h={16} label="E" index={4} />
        <VizNode x={116} y={50} w={26} h={16} label="F" index={5} />

        <VizEdge path="M 30 38 L 40 22" index={0} />
        <VizEdge path="M 30 42 L 40 54" index={0} />
        <VizEdge path="M 66 18 L 78 34" index={1} />
        <VizEdge path="M 66 58 L 78 42" index={1} />
        <VizEdge path="M 104 34 L 116 22" index={2} tone="bush" />
        <VizEdge path="M 104 42 L 116 54" index={2} tone="flag" />
        <VizEdge path="M 129 26 L 129 46" index={3} dashed />

        <VizLabel x={4} y={78} text="SHORTEST PATH" tone="bush" size={4.5} />
        <VizLabel x={4} y={86} text="CYCLE DETECTED" tone="flag" size={4.5} />
      </svg>
    </VizFrame>
  );
}

export function AtlasDataStructures() {
  const rows = [
    ["BINARY HEAP", 78],
    ["AVL TREE", 66],
    ["HASH MAP", 88],
    ["LRU CACHE", 54],
    ["TRIE", 72],
  ] as const;

  return (
    <VizFrame
      title="Bar chart of relative throughput across sixteen benchmarked data structure workloads, including binary heap, AVL tree, hash map, LRU cache and trie."
      caption="16 workloads · timed in-process for runtime, memory and throughput"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        {rows.map(([label, v], i) => (
          <VizBar key={label} x={4} y={14 + i * 13} w={92} label={label} value={v} tone="ink" index={i} />
        ))}
        <VizLabel x={104} y={14} text="RELATIVE" tone="muted" size={4.5} />
        <VizLabel x={104} y={24} text="THROUGHPUT" tone="muted" size={4.5} />
        <VizLabel x={104} y={40} text="FROM" tone="ink" size={4.5} />
        <VizLabel x={104} y={50} text="SCRATCH" tone="ink" size={4.5} />
        <VizLabel x={104} y={66} text="NO EXTERNAL" tone="flag" size={4.5} />
      </svg>
    </VizFrame>
  );
}

export function AtlasScheduler() {
  const factors = [
    ["CPU", 82],
    ["MEMORY", 74],
    ["GPU", 58],
    ["NETWORK", 66],
    ["HEALTH", 88],
    ["AFFINITY", 61],
  ] as const;

  return (
    <VizFrame
      title="Bar chart breaking down a scheduler score into weighted factors: CPU 82, memory 74, GPU 58, network 66, health 88, affinity 61, less a utilisation penalty plus a priority bonus."
      caption="Every scheduling decision carries a visible, auditable breakdown"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        {factors.map(([label, v], i) => (
          <VizBar key={label} x={4} y={12 + i * 11} w={84} label={label} value={v} tone="ink" index={i} />
        ))}

        <VizLabel x={96} y={12} text="WEIGHTED" tone="muted" size={4.5} />
        <VizLabel x={96} y={23} text="SUM" tone="muted" size={4.5} />
        <VizLabel x={96} y={40} text="− PENALTY" tone="flag" size={4.5} />
        <VizLabel x={96} y={51} text="  UTILISATION" tone="muted" size={4.5} />
        <VizLabel x={96} y={64} text="+ PRIORITY" tone="bush" size={4.5} />
        <VizLabel x={96} y={75} text="  BONUS" tone="muted" size={4.5} />
        <VizLabel x={96} y={87} text="= PLACED" tone="ink" size={5} />
      </svg>
    </VizFrame>
  );
}

export function AtlasRaft() {
  return (
    <VizFrame
      title="Diagram of a Raft cluster: one leader replicating log entries to two followers, with a term marker and heartbeats shown between them."
      caption="Leader election · log replication · heartbeats · terms · snapshots"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizNode x={8} y={28} w={34} h={20} label="LEADER" sublabel="term 7" tone="flag" index={0} />
        <VizNode x={62} y={8} w={34} h={18} label="FOLLOWER" sublabel="term 7" index={1} />
        <VizNode x={62} y={50} w={34} h={18} label="FOLLOWER" sublabel="term 6" tone="muted" index={2} />

        <VizEdge path="M 42 32 L 62 22" index={0} tone="bush" />
        <VizEdge path="M 42 46 L 62 56" index={0} dashed tone="flag" />

        <VizNode x={116} y={28} w={42} h={20} label="KV STORE" sublabel="replicated" tone="water" index={3} />
        <VizEdge path="M 96 38 L 116 38" index={3} />
        <VizEdge path="M 79 26 L 79 28" index={1} />

        <VizLabel x={4} y={78} text="HEARTBEAT" tone="muted" size={4.5} />
        <VizLabel x={4} y={86} text="SNAPSHOT ON LAG" tone="muted" size={4.5} />
        <VizLabel x={116} y={62} text="CONSISTENT" tone="ink" size={4.5} />
        <VizLabel x={116} y={70} text="FROM SCRATCH" tone="muted" size={4.5} />
      </svg>
    </VizFrame>
  );
}

export function AtlasHashing() {
  return (
    <VizFrame
      title="Diagram of a hash ring with virtual nodes: four shards positioned around a circle, keys hashing clockwise onto them, and minimal rebalancing when a node is added."
      caption="Virtual nodes keep re-balancing minimal when the node set changes"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <circle cx={80} cy={44} r={30} fill="none" stroke="var(--ink)" strokeWidth={1.2} strokeDasharray="4 4" />

        {[
          { x: 80, y: 14, t: "S1" },
          { x: 110, y: 44, t: "S2" },
          { x: 80, y: 74, t: "S3" },
          { x: 50, y: 44, t: "S4" },
        ].map((s, i) => (
          <VizNode key={s.t} x={s.x - 12} y={s.y - 8} w={24} h={16} label={s.t} tone={i === 3 ? "flag" : "ink"} index={i} />
        ))}

        <VizEdge path="M 68 22 A 22 22 0 0 1 98 26" index={4} tone="bush" />
        <VizEdge path="M 100 52 A 22 22 0 0 1 92 68" index={4} tone="bush" />

        <VizLabel x={4} y={20} text="KEY → RING" tone="ink" size={4.5} />
        <VizLabel x={4} y={32} text="CLOCKWISE" tone="muted" size={4.5} />
        <VizLabel x={126} y={78} text="NEW NODE" tone="flag" size={4.5} />
        <VizLabel x={126} y={86} text="SMALL MOVE" tone="muted" size={4.5} />
      </svg>
    </VizFrame>
  );
}

export function AtlasChaos() {
  return (
    <VizFrame
      title="Diagram of a chaos experiment lifecycle: an injected fault flows through the event bus into anomaly detection and incident correlation, then reverts automatically with blast-radius analysis."
      caption="Five chaos primitives wired into the event bus so failures flow naturally"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        {["KILL", "PARTITION", "LATENCY", "CPU", "MEMORY"].map((p, i) => (
          <VizNode key={p} x={2 + i * 31} y={8} w={27} h={14} label={p} tone="flag" index={i} />
        ))}
        <VizEdge path="M 15 22 L 15 32" index={0} />
        <VizNode x={2} y={34} w={31} h={16} label="EVENT BUS" tone="ink" index={5} />
        <VizEdge path="M 40 42 L 54 42" index={5} />
        <VizNode x={56} y={34} w={34} h={16} label="ANOMALY" index={6} />
        <VizEdge path="M 90 42 L 104 42" index={6} />
        <VizNode x={106} y={34} w={34} h={16} label="INCIDENT" sublabel="blast radius" index={7} />
        <VizEdge path="M 123 50 L 123 60 L 15 60 L 15 52" index={7} dashed tone="bush" />
        <VizLabel x={80} y={66} text="AUTOMATIC REVERT" anchor="middle" tone="bush" size={4.5} />
        <VizLabel x={2} y={82} text="DELIBERATE FAILURE" tone="ink" size={4.5} />
        <VizLabel x={2} y={90} text="NOT A PRODUCTION SURPRISE" tone="muted" size={4.5} />
      </svg>
    </VizFrame>
  );
}

export function AtlasAnomaly() {
  return (
    <VizFrame
      title="Diagram of rolling-window z-score anomaly detection against absolute thresholds, feeding a correlated incident that moves from open to investigating to resolved."
      caption="Rolling z-score plus absolute rules · CPU above 90, memory above 85"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <line x1={4} y1={44} x2={76} y2={44} stroke="var(--gravel)" strokeWidth={0.8} />
        <line x1={4} y1={30} x2={76} y2={30} stroke="var(--flag)" strokeWidth={0.8} strokeDasharray="3 3" />
        <VizLabel x={4} y={27} text="THRESHOLD" tone="flag" size={4} />

        <VizEdge path="M 8 44 L 14 42 L 20 45 L 26 41 L 32 44 L 38 43 L 44 12 L 50 44" index={0} tone="bush" />
        <circle cx={44} cy={12} r={2.6} fill="var(--flag)" />

        <VizEdge path="M 80 40 L 92 40" index={1} />
        <VizNode x={94} y={30} w={62} h={20} label="INCIDENT" sublabel="cluster correlation" index={2} />

        <VizLabel x={4} y={64} text="OPEN" tone="flag" size={4.5} />
        <VizLabel x={54} y={64} text="INVESTIGATING" tone="ink" size={4.5} />
        <VizLabel x={126} y={64} text="RESOLVED" tone="bush" size={4.5} />
        <VizEdge path="M 24 62 L 50 62" index={3} tone="flag" />
        <VizEdge path="M 84 62 L 122 62" index={3} tone="bush" />
      </svg>
    </VizFrame>
  );
}

export function AtlasAdvisory() {
  const archetypes = [
    "DELIBERATE INJECTION",
    "DEPENDENCY CASCADE",
    "SINGLE COMPONENT",
    "CLUSTER PRESSURE",
    "CAPACITY BOTTLENECK",
    "LATENCY DEGRADATION",
  ];

  return (
    <VizFrame
      title="Diagram of read-only advisory AI: evidence flows into six failure archetypes, whose output requires explicit human approval before anything is acted on."
      caption="Advisory output is read-only · every recommendation needs explicit approval"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizNode x={2} y={30} w={26} h={18} label="EVIDENCE" tone="ink" index={0} />
        <VizEdge path="M 28 39 L 38 39" index={0} />

        {archetypes.slice(0, 3).map((a, i) => (
          <VizNode key={a} x={40} y={6 + i * 14} w={62} h={12} label={a} index={i + 1} />
        ))}
        {archetypes.slice(3).map((a, i) => (
          <VizNode key={a} x={40} y={48 + i * 14} w={62} h={12} label={a} index={i + 4} />
        ))}

        <VizEdge path="M 102 12 L 116 36" index={4} />
        <VizEdge path="M 102 26 L 116 38" index={4} />
        <VizEdge path="M 102 40 L 116 40" index={4} />
        <VizEdge path="M 102 54 L 116 42" index={4} />
        <VizEdge path="M 102 68 L 116 44" index={4} />

        <VizNode x={118} y={30} w={40} h={20} label="ADVISORY" sublabel="read-only" tone="flag" index={5} />
        <VizEdge path="M 138 50 L 138 60" index={5} tone="bush" />
        <VizNode x={116} y={62} w={42} h={14} label="HUMAN APPROVAL" tone="bush" index={6} />
      </svg>
    </VizFrame>
  );
}

export function AtlasObservability() {
  return (
    <VizFrame
      title="Diagram of the observability surface: a Prometheus metrics endpoint, an operational CLI and a dark-theme dashboard all reading from the same in-process event bus."
      caption="Prometheus text + JSON · event counters · structured logging · atlas-cli"
    >
      <svg viewBox={VIEWBOX} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        <VizNode x={2} y={30} w={40} h={18} label="EVENT BUS" sublabel="in-memory" tone="flag" index={0} />

        <VizEdge path="M 42 34 L 56 16" index={0} />
        <VizEdge path="M 42 39 L 56 42" index={0} />
        <VizEdge path="M 42 44 L 56 68" index={0} />

        <VizNode x={58} y={6} w={44} h={16} label="PROMETHEUS" sublabel="text + JSON" index={1} />
        <VizNode x={58} y={34} w={44} h={16} label="atlas-cli" tone="muted" index={2} />
        <VizNode x={58} y={62} w={44} h={16} label="DASHBOARD" sublabel="topology" index={3} />

        <VizEdge path="M 102 14 L 116 30" index={1} tone="bush" />
        <VizEdge path="M 102 42 L 116 42" index={2} tone="bush" />
        <VizEdge path="M 102 70 L 116 54" index={3} tone="bush" />

        <VizNode x={118} y={30} w={40} h={24} label="ALGORITHMIC" sublabel="TRANSPARENCY" tone="bush" index={4} />
        <VizLabel x={2} y={86} text="NO MANAGED SERVICE TO HIDE BEHIND" tone="muted" size={4.5} />
      </svg>
    </VizFrame>
  );
}