/**
 * Keys for the motion graphics that illustrate each section.
 *
 * The union is derived from the visual registry in
 * `app/Components/site/motion/registry.ts`, so a typo here is a TypeScript
 * error rather than a section that silently renders without a graphic.
 */
export type VisualKey =
  | "erp-modular-architecture"
  | "erp-notification-pipeline"
  | "erp-auth-layers"
  | "erp-delivery-infrastructure"
  | "erp-operations-uptime"
  | "automation-delivery-pipeline"
  | "automation-admin-burden"
  | "automation-operational-loop"
  | "infra-network-foundation"
  | "infra-storage-backups"
  | "infra-monitoring-ops"
  | "infra-device-ops"
  | "atlas-graph-engine"
  | "atlas-data-structures"
  | "atlas-scheduler"
  | "atlas-raft"
  | "atlas-hashing"
  | "atlas-chaos"
  | "atlas-anomaly"
  | "atlas-advisory"
  | "atlas-observability"
  | "nexus-evidence"
  | "nexus-permissions"
  | "nexus-approval"
  | "nexus-explainable"
  | "nexus-lifecycle"
  | "nexus-phase1"
  | "cs2rgb-gsi"
  | "cs2rgb-listener"
  | "cs2rgb-client"
  | "cs2rgb-colour-map"
  | "cs2rgb-observability"
  | "neo-transport-abstraction"
  | "neo-transport-pipeline"
  | "neo-state-unification"
  | "neo-offline-sync"
  | "neo-idempotency"
  | "neo-multitenancy";

export interface CaseStudySection {
  heading: string;
  body: string;
  bullets?: string[];
  /**
   * Motion graphic illustrating this section. See
   * `MOTION_GRAPHICS_CASE_STUDIES.md` for the authoring guide.
   */
  visual?: VisualKey;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
  detail?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  kind: "Professional Work" | "Engineering Project" | "Personal Infrastructure" | "Business Systems";
  timeframe: string;
  context: string;
  tags: string[];
  summary: string;
  problem: string[];
  approach: CaseStudySection[];
  outcomes: string[];
  metrics: CaseStudyMetric[];
  stack: string[];
  github?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "school-erp",
    title: "Full-Stack School ERP",
    category: "Software Engineering",
    kind: "Professional Work",
    timeframe: "2024 \u2013 2025",
    context:
      "A school running on paper registers, disconnected spreadsheets and after-the-fact reporting needed one system for student records, attendance, finance and communication.",
    tags: [
      "ERP",
      "Full-Stack",
      "Notifications",
      "Authentication",
      "Azure",
      "Docker",
      "Kubernetes",
      "CI/CD",
    ],
    summary:
      "Designed and shipped a full-stack ERP end-to-end \u2014 from requirements through deployment \u2014 consolidating student records, attendance, finance and communication, with notification, messaging and authentication capabilities serving the whole institution.",
    problem: [
      "Student, attendance, finance and communication data lived in separate tools with no single source of truth.",
      "Administrative and teaching staff spent hours on repetitive data-entry and follow-up tasks.",
      "Software releases were manual and error-prone, and infrastructure costs were not controlled.",
      "Parents and staff had no reliable channel for notices, payments and urgent updates.",
    ],
    approach: [
      {
        heading: "Architecture",
        body:
          "A modular full-stack system \u2014 student records, attendance, finance and communication as connected modules over shared data. RESTful APIs with PostgreSQL/MySQL schemas designed around daily school operations.",
        visual: "erp-modular-architecture",
      },
      {
        heading: "Notifications & messaging",
        body:
          "Real-time push, in-app alerts and multi-channel messaging across mobile and web, with event triggers, delivery confirmation and channel fallback logic. A real-time chat subsystem handled presence and read receipts at institutional scale.",
        visual: "erp-notification-pipeline",
      },
      {
        heading: "Authentication",
        body:
          "Password-based login and on-device biometric verification secured access to sensitive institutional data, with session and account-lifecycle management.",
        visual: "erp-auth-layers",
      },
      {
        heading: "Infrastructure & delivery",
        body:
          "Azure cloud managed end-to-end. Containerised services on Docker and Kubernetes. Bash automation and CI/CD pipelines replaced manual releases. TrueNAS storage architecture held 10TB+ of institutional data with redundancy.",
        visual: "erp-delivery-infrastructure",
      },
      {
        heading: "Operations",
        body:
          "Proactive monitoring, scheduled maintenance and disciplined incident response with root-cause analysis kept the system at 99.9% uptime through a school year.",
        visual: "erp-operations-uptime",
      },
    ],
    outcomes: [
      "One system now holds student, attendance, finance and communication data for the institution.",
      "Teachers and administrators work from a live, connected record instead of reconciling spreadsheets.",
      "Notifications reach parents and staff through channels that confirm delivery.",
      "Releases deploy through pipelines instead of manual, error-prone steps.",
    ],
    metrics: [
      {
        label: "Uptime",
        value: "99.9%",
        detail: "Through proactive monitoring and disciplined incident response.",
      },
      {
        label: "Cloud cost reduction",
        value: "20%",
        detail: "Azure resources re-allocated and optimised end-to-end.",
      },
      {
        label: "Deployment error reduction",
        value: "45%",
        detail: "Manual releases replaced by Bash scripts and CI/CD pipelines.",
      },
      {
        label: "Automation savings",
        value: "15+ hrs/week",
        detail: "Reclaimed through scripted and pipelined operations.",
      },
      {
        label: "Internet downtime reduction",
        value: "50%",
        detail: "Network and failover improvements across the institution.",
      },
      {
        label: "ISP support tickets",
        value: "90% fewer",
        detail: "Root-cause fixes stopped recurring external-support calls.",
      },
    ],
    stack: [
      "C#",
      "Python",
      "TypeScript",
      "React / Next.js",
      "PostgreSQL",
      "MySQL",
      "Azure",
      "Docker",
      "Kubernetes",
      "Bash",
      "TrueNAS",
      "Linux",
    ],
  },
  {
    slug: "atlas",
    title: "Atlas \u2014 Distributed Infrastructure Engine",
    category: "Distributed Systems",
    kind: "Engineering Project",
    timeframe: "Ongoing engineering project",
    context:
      "An open-source distributed infrastructure intelligence engine and systems-engineering laboratory \u2014 every data structure, algorithm, scheduler, consensus layer and failure-injection engine implemented from first principles. No external database, message broker or AI service to hide behind.",
    github: "https://github.com/mfalme0/atlas",
    tags: [
      "Raft",
      "Consistent Hashing",
      "Chaos Engineering",
      "Anomaly Detection",
      "Scheduler",
      "Graph Engine",
      "Go",
    ],
    summary:
      "Atlas discovers and models infrastructure as a graph, schedules workloads, replicates state through a from-scratch Raft layer, injects controlled failures, correlates them into incidents and produces advisory AI analysis \u2014 running entirely over an in-memory event bus on a single machine, with real-time visualization and algorithmic transparency.",
    problem: [
      "Most distributed systems are consumed as managed black boxes \u2014 the mechanics and the failure modes stay hidden until something breaks in production.",
      "Infrastructure understanding is scattered: discovery, scheduling, consensus, chaos, anomaly detection and incident management usually live in separate tools that never talk to each other.",
      "AI in operations is expected to be trusted on vibes \u2014 recommendations arrive without a transparent path from evidence to conclusion.",
    ],
    approach: [
      {
        heading: "Graph engine",
        body:
          "Infrastructure is modelled as a graph \u2014 BFS, DFS, Dijkstra and A* pathfinding, topological sort, cycle detection, connected components, Tarjan SCCs, articulation points and bridges, across directed and undirected representations.",
        visual: "atlas-graph-engine",
      },
      {
        heading: "Data structures & algorithms",
        body:
          "A from-scratch library covering dynamic arrays, singly and doubly linked lists, stacks, queues, circular queues, binary min-heaps, priority queues, chaining hash maps, BST and AVL trees, tries and an LRU cache \u2014 with an in-process benchmark harness timing all 16 workloads and recording runtime, memory and throughput.",
        visual: "atlas-data-structures",
      },
      {
        heading: "Scheduler & job queue",
        body:
          "Resource-aware scheduling with a transparent score breakdown (CPU, memory, GPU, network, health and affinity, plus a utilisation penalty and priority bonus), and a priority-based job queue with retries.",
        visual: "atlas-scheduler",
      },
      {
        heading: "Raft consensus & replicated KV",
        body:
          "Leader election, log replication, heartbeats, term management and snapshots implemented directly. A replicated key\u2013value store commits writes through the Raft log and serves reads from a consistent view.",
        visual: "atlas-raft",
      },
      {
        heading: "Consistent hashing",
        body:
          "A hash ring with virtual nodes places shards and keeps re-balancing minimal when the node set changes.",
        visual: "atlas-hashing",
      },
      {
        heading: "Chaos engineering",
        body:
          "kill_node, network_partition, latency, cpu_stress and memory_pressure experiments with automatic revert and blast-radius impact analysis \u2014 wired into the event bus so failures flow naturally into anomaly and incident systems.",
        visual: "atlas-chaos",
      },
      {
        heading: "Anomaly detection & incident correlation",
        body:
          "Rolling-window z-score detection plus absolute threshold rules (defaults: CPU > 90, memory usage > 85) feed an incident manager that coalesces related events, correlates across the cluster and drives a lifecycle from open to investigating to resolved.",
        visual: "atlas-anomaly",
      },
      {
        heading: "Advisory AI, read-only",
        body:
          "Rule-based archetype analysis \u2014 deliberate failure injection, dependency cascade, single-component failure, cluster-wide pressure, capacity bottleneck, latency degradation. Advisory output is read-only and every recommendation requires explicit approval before anything is acted on.",
        visual: "atlas-advisory",
      },
      {
        heading: "Observability & tooling",
        body:
          "Prometheus text and JSON metrics endpoints, event counters, structured logging, an operational CLI (atlas-cli) and a Next.js dark-theme dashboard showing topology, services, open incidents, anomalies and active chaos.",
        visual: "atlas-observability",
      },
    ],
    outcomes: [
      "A single-machine systems lab that exercises real distributed-systems ideas end-to-end: chaos experiment \u2192 event \u2192 anomaly \u2192 incident \u2192 advisory analysis \u2192 resolution.",
      "Raft, consistent hashing, scheduling and correlation mechanics implemented from first principles with zero managed services.",
      "A benchmark suite recording runtime, memory and throughput for all 16 algorithm workloads.",
      "Algorithmic transparency: every scheduler decision and every AI recommendation carries a visible, auditable breakdown.",
    ],
    metrics: [
      {
        label: "Implemented from scratch",
        value: "Everything",
        detail: "Graphs, DSA, Raft, scheduler, chaos \u2014 no external DB or broker.",
      },
      {
        label: "Consensus",
        value: "Raft",
        detail: "Election, log replication, heartbeats, terms, snapshots.",
      },
      {
        label: "Algorithm workloads",
        value: "16",
        detail: "Timed in-process with runtime, memory and throughput.",
      },
      {
        label: "Chaos primitives",
        value: "5",
        detail: "kill_node, partition, latency, cpu_stress, memory_pressure.",
      },
    ],
    stack: [
      "Go",
      "chi (REST API)",
      "Raft",
      "Consistent Hashing",
      "Prometheus",
      "Event Bus Architecture",
      "Next.js",
      "Docker",
    ],
  },
  {
    slug: "nexus",
    title: "NEXUS \u2014 Autonomous Homelab SRE",
    category: "AI & Operations",
    kind: "Engineering Project",
    timeframe: "Ongoing engineering project",
    context:
      "An AI SRE for real infrastructure that has to show its work: it observes the live system, collects evidence with typed tools, forms hypotheses, tests them, and only then explains a root cause \u2014 and it refuses to sound confident when it cannot prove something.",
    github: "https://github.com/mfalme0/nexus",
    tags: [
      "LLM Agents",
      "SRE",
      "Evidence-Based AI",
      "LangGraph",
      "FastAPI",
      "Approval Workflows",
      "PostgreSQL",
      "Redis",
    ],
    summary:
      "An evidence-first autonomous SRE agent built around four hard rules \u2014 evidence over vibes, allowlisted typed tools, approval enforced outside the model, and explainable reasoning. Investigates incidents the way a careful operator would, verified live against PostgreSQL and Redis.",
    problem: [
      "Most \u201cAI ops\u201d demos ask an LLM to guess and let confidence stand in for correctness.",
      "Without structured tools and permissions, agents either do nothing useful or have an alarming amount of power \u2014 arbitrary bash, rm -rf \u2014 with no audit trail.",
      "Explainability gets sacrificed: conclusions arrive without observable evidence or a reasoning path you can verify.",
    ],
    approach: [
      {
        heading: "Evidence over vibes",
        body:
          "Confidence is derived from observations, contradictions and required-evidence coverage \u2014 never invented by the model. When NEXUS cannot verify something, the honest output is \u201cI could not verify disk usage because the host did not respond\u201d \u2014 not \u201cdisk usage is normal.\u201d",
        visual: "nexus-evidence",
      },
      {
        heading: "Allowlist, not denylist",
        body:
          "No arbitrary shell. Every capability is a typed tool with a permission class (READ_ONLY, LOW_RISK, REQUIRES_APPROVAL, FORBIDDEN). The model cannot bypass the permission layer because authorization is enforced outside the LLM.",
        visual: "nexus-permissions",
      },
      {
        heading: "Approval before risk",
        body:
          "REQUIRES_APPROVAL actions cannot run until a human says yes. Default mode is READ_ONLY \u2014 no destructive operations until the permission system is explicitly enabled.",
        visual: "nexus-approval",
      },
      {
        heading: "Explainable reasoning",
        body:
          "The console shows reasoning summaries and the evidence collected at every step \u2014 never hidden chain-of-thought.",
        visual: "nexus-explainable",
      },
      {
        heading: "Investigation lifecycle",
        body:
          "classify \u2192 context \u2192 evidence \u2192 hypothesis \u2192 test \u2192 root cause \u2192 remediation \u2192 approval \u2192 execute \u2192 verify \u2192 close. When evidence is insufficient the reasoning loop iterates instead of inventing a root cause just to finish.",
        visual: "nexus-lifecycle",
      },
      {
        heading: "Phase 1 \u2014 verified foundation",
        body:
          "FastAPI application factory with a live /api/v1/health database check, PostgreSQL 16 persistence (SQLAlchemy 2.0 async, Alembic migrations), Redis, structured logging with structlog, a sandbox Docker Compose stack, and CI running ruff, strict mypy and pytest against real PostgreSQL and Redis \u2014 with graceful degradation when a dependency is down.",
        visual: "nexus-phase1",
      },
    ],
    outcomes: [
      "An agent architecture where sounding confident is never confused with being correct \u2014 the core fix for the AI-ops hype problem.",
      "Safety enforced structurally: READ_ONLY by default, four permission classes, human approval outside the model, and a complete audit trail.",
      "Phase 1 foundation verified against live PostgreSQL and Redis; subsequent phases \u2014 discovery, typed tools, LangGraph agent, evaluation framework \u2014 documented and scheduled in verifiable milestones.",
      "An honest feature ledger: everything is marked REAL, SIMULATED, MOCK or NOT IMPLEMENTED \u2014 nothing is claimed before it is tested.",
    ],
    metrics: [
      {
        label: "Default mode",
        value: "READ_ONLY",
        detail: "No destructive ops until the permission system is enabled.",
      },
      {
        label: "Permission classes",
        value: "4",
        detail: "READ_ONLY, LOW_RISK, REQUIRES_APPROVAL, FORBIDDEN.",
      },
      {
        label: "Phase 1",
        value: "Complete",
        detail: "Verified against live PostgreSQL 16 + Redis 7.",
      },
      {
        label: "Root causes",
        value: "Evidence-backed",
        detail: "Hypotheses tested against the live system before claiming anything.",
      },
    ],
    stack: [
      "Python",
      "FastAPI",
      "LangGraph",
      "PostgreSQL 16",
      "Redis 7",
      "SQLAlchemy 2.0 (async)",
      "Alembic",
      "Docker",
      "structlog",
      "pydantic-settings",
    ],
  },
  {
    slug: "cs2rgb",
    title: "CS2RGB \u2014 Counter-Strike \u00d7 OpenRGB Lighting",
    category: "Automation & Hardware",
    kind: "Engineering Project",
    timeframe: "Ongoing engineering project",
    context:
      "Bridging a game's internal state to physical RGB hardware through Counter-Strike 2's Game State Integration API and a local OpenRGB client \u2014 no injection, no overlays, no touching the game process. Just the game publishing its state and hardware reacting to it.",
    github: "https://github.com/mfalme0/CS2RGB",
    tags: [
      "Python",
      "Game State Integration",
      "OpenRGB",
      "CS2",
      "Local HTTP Server",
      "Hardware Automation",
    ],
    summary:
      "A Python service that taps CS2's Game State Integration API and drives OpenRGB directly \u2014 lighting reacts to health, flash/smoke/burn status, game phase and round events (bomb, kills, round wins) with secure secret-key authentication and full event logging.",
    problem: [
      "PC lighting is static \u2014 a machine with a full RGB setup runs the same light show whether you're winning, burning, or dead.",
      "Games expose no lighting hooks; most reactive setups rely on heuristics, screen capture or hooking the game process \u2014 fragile and invasive.",
      "CS2 already broadcasts rich match state, but nothing was mapping it to hardware.",
    ],
    approach: [
      {
        heading: "Game State Integration",
        body:
          "CS2 publishes player, round, map and provider state over HTTP to a local listener using a signed Game State Integration config \u2014 every update arrives as structured JSON, so the game is never touched or injected into.",
        visual: "cs2rgb-gsi",
      },
      {
        heading: "Secure listener",
        body:
          "A local HTTP server validates requests against a secret key from the GSI config before any state is trusted, blocking spoofed or stale event streams.",
        visual: "cs2rgb-listener",
      },
      {
        heading: "OpenRGB client",
        body:
          "openrgb-python talks to the running OpenRGB daemon, so lighting changes work across manufacturers and devices without vendor-specific SDKs.",
        visual: "cs2rgb-client",
      },
      {
        heading: "Event \u2192 colour mapping",
        body:
          "Health tiers (green 80\u2013100, yellow 50\u201379, orange 20\u201349, red 1\u201319), environment effects (white flash, orange burn flicker, grey smoke), game phase (loading, searching, main menu) and round events (bomb planted/exploded, kill confirmed, round wins) each resolve to a deterministic colour and effect.",
        visual: "cs2rgb-colour-map",
      },
      {
        heading: "Observability",
        body:
          "Every game-state payload and system event is written to a structured log for debugging mappings and tracing missed events.",
        visual: "cs2rgb-observability",
      },
    ],
    outcomes: [
      "A working pipeline from in-game event to physical RGB change, driven entirely by the game's own state feed.",
      "Reactive ambience for health, status effects and round moments \u2014 with zero modification of the game.",
      "A small, dependency-light pattern (Python + local HTTP + GSI + OpenRGB) reusable for any game that publishes GSI state.",
    ],
    metrics: [
      {
        label: "Event groups mapped",
        value: "4",
        detail: "Health, environment, game phase, round events.",
      },
      {
        label: "Health tiers",
        value: "4",
        detail: "Green, yellow, orange and red based on HP.",
      },
      {
        label: "Game untouched",
        value: "100%",
        detail: "Only GSI data flows \u2014 no hooks, no injection.",
      },
    ],
    stack: [
      "Python",
      "Game State Integration",
      "OpenRGB",
      "openrgb-python",
      "Local HTTP Server",
      "JSON",
    ],
  },
  {
    slug: "infrastructure",
    title: "On-Premises Infrastructure Build",
    category: "IT & Infrastructure",
    kind: "Personal Infrastructure",
    timeframe: "2024 \u2013 2025",
    context:
      "Taking an institution from loose desktops and repeated network failures to a deliberate, monitored, high-availability environment \u2014 built from the ground up.",
    tags: [
      "Networking",
      "Servers",
      "TrueNAS",
      "Linux",
      "Monitoring",
      "Backups",
      "Failover",
    ],
    summary:
      "Specced, built and operated on-premises server and network infrastructure from the ground up \u2014 switching, structured cabling, storage and monitoring \u2014 that cut internet downtime by 50% and eliminated recurring ISP support calls.",
    problem: [
      "Network interruptions and internet downtime disrupted operations, with repeated calls to the ISP instead of real fixes.",
      "Storage was scattered and unreplicated, putting institutional data at risk.",
      "No monitoring meant failures were discovered by users, not by systems.",
      "Printers and devices caused recurring support load that could be prevented.",
    ],
    approach: [
      {
        heading: "Network foundation",
        body:
          "Deliberate switching, structured cabling and routing design replaced the ad-hoc setup \u2014 with failover paths that kept the institution online when the primary link degraded.",
        visual: "infra-network-foundation",
      },
      {
        heading: "Storage & backups",
        body:
          "A high-availability TrueNAS storage architecture supported 10TB+ of institutional data with redundancy and failover patterns.",
        visual: "infra-storage-backups",
      },
      {
        heading: "Monitoring & operations",
        body:
          "Proactive monitoring and scheduled maintenance replaced firefighting. Incident response with root-cause analysis stopped recurring problems at the source.",
        visual: "infra-monitoring-ops",
      },
      {
        heading: "Device operations",
        body:
          "Printers and endpoint issues traced to their causes and fixed structurally, cutting recurring support tickets.",
        visual: "infra-device-ops",
      },
    ],
    outcomes: [
      "The institution stays online through link failure \u2014 failover instead of a support call.",
      "Institutional data lives on redundant storage with real backups.",
      "Problems are caught by monitoring before users notice.",
    ],
    metrics: [
      {
        label: "Internet downtime",
        value: "50% lower",
        detail: "Failover and root-cause network fixes.",
      },
      {
        label: "ISP support reduction",
        value: "90%",
        detail: "Recurring external-support calls eliminated.",
      },
      {
        label: "Printer issue reduction",
        value: "40%",
        detail: "Structural fixes on recurring device faults.",
      },
      {
        label: "Storage",
        value: "10TB+",
        detail: "On redundant TrueNAS architecture.",
      },
    ],
    stack: [
      "Networking",
      "Structured Cabling",
      "TrueNAS",
      "Debian / Linux",
      "Docker",
      "Monitoring",
      "Backups",
      "Failover",
    ],
  },
  {
    slug: "automation",
    title: "Business Automation & Operations",
    category: "AI & Automation",
    kind: "Business Systems",
    timeframe: "2024 \u2013 2025",
    context:
      "Repetitive operations work \u2014 manual releases, routine administration and recurring device issues \u2014 consuming staff hours every week across two institutions.",
    tags: [
      "Automation",
      "Bash",
      "CI/CD",
      "Scripting",
      "Operations",
      "Process Design",
    ],
    summary:
      "Identified where staff time was being burned on repetitive work, then scripted and automated it \u2014 reclaiming 15+ hours per week and cutting release errors by 45%.",
    problem: [
      "Software releases were manual, scripted-by-memory and error-prone.",
      "Routine administrative work \u2014 reporting, data entry, follow-ups \u2014 consumed hours every week.",
      "Recurring device and network issues generated support load that never ended.",
    ],
    approach: [
      {
        heading: "Delivery automation",
        body:
          "Bash scripts and CI/CD pipelines replaced manual release steps, cutting deployment errors by 45% and removing the human-error path from shipping.",
        visual: "automation-delivery-pipeline",
      },
      {
        heading: "Administrative automation",
        body:
          "Automation scripts handled repetitive administrative work \u2014 at one institution reclaiming 4 hours per week of manual work, at the other 15+ hours weekly across the operations team.",
        visual: "automation-admin-burden",
      },
      {
        heading: "Operational automation",
        body:
          "Monitoring, health checks and preventive fixes automated so recurring problems stopped generating tickets.",
        visual: "automation-operational-loop",
      },
    ],
    outcomes: [
      "Deployments ship through pipelines.\nAutomation handles the repetitive work.\nOperations stop generating recurring incidents.",
    ],
    metrics: [
      {
        label: "Automation savings",
        value: "15+ hrs/week",
        detail: "Operations time reclaimed at Steadfast Academy.",
      },
      {
        label: "Deployment errors",
        value: "\u221245%",
        detail: "Pipelines replaced manual releases.",
      },
      {
        label: "Admin workload",
        value: "4 hrs/week",
        detail: "Manual work removed at Gituamba Girls.",
      },
    ],
    stack: [
      "Bash",
      "CI/CD",
      "Python",
      "Scripting",
      "Monitoring",
      "Process Design",
    ],
  },
  {
    slug: "neo-learn",
    title: "Neo Learn — SMS as a Transport Layer",
    category: "Distributed Systems",
    kind: "Engineering Project",
    timeframe: "Active design, experimental side project",
    context:
      "An offline-capable learning platform that keeps a modern web and mobile experience while retaining SMS and SIM Toolkit as a fallback communication layer. Same learning state, different interface, depending on what connectivity is available.",
    tags: [
      "Offline-First",
      "SMS / SIM Toolkit",
      "Idempotency",
      "Message Queues",
      "Multi-Tenancy",
      "EdTech",
      "TypeScript",
    ],
    summary:
      "A systems experiment in treating SMS and SIM Toolkit as transport mechanisms rather than the application itself \u2014 course progress, assessment state and submissions live centrally, and the learner reaches that state through web, mobile, SMS or STK without the learning engine ever knowing which interface was used.",
    problem: [
      "A conventional online learning platform assumes connectivity: when the internet disappears, the learning experience stops entirely.",
      "Text-message learning survives disconnection, but a purely conversational interface is cumbersome for richer course structures, progress tracking, assessments and larger amounts of content.",
      "SMS is asynchronous and unreliable as a delivery channel \u2014 duplicate, out-of-order, delayed and failed messages are the norm rather than the exception.",
      "The same learner action arriving over two very different interfaces makes the application a synchronization problem as much as an education problem.",
    ],
    approach: [
      {
        heading: "Transport abstraction",
        body:
          "SMS and SIM Toolkit are treated as transports, not as the application. Course progress, assessment state, submissions and account information live centrally in the platform; the learner reaches that state through different interfaces \u2014 a rich web or mobile experience when connected, SMS lessons and multiple-choice assessments when not, and STK interactions where supported. Both operate against the same learner and course state.",
        visual: "neo-transport-abstraction",
      },
      {
        heading: "Transport pipeline",
        body:
          "A learning event enters a message queue, then a transport router selects the delivery channel. Adding a channel means adding a transport, not rewriting the learning engine \u2014 candidate transports include web, Android, SMS, SIM Toolkit, WhatsApp, email and push. The engine only ever needs to process the learner's action.",
        visual: "neo-transport-pipeline",
      },
      {
        heading: "Unified learning state",
        body:
          "Consistency across interfaces is the central engineering problem. Lesson 4, question 1, answer B, correct, 42% progress is the same record whether it came from a React interface or an SMS reply. A learner can start a lesson in the app, lose connectivity, receive the next question by SMS, reply, then reconnect and see updated progress.",
        visual: "neo-state-unification",
      },
      {
        heading: "Offline-first sync",
        body:
          "The client caches course metadata, downloaded lessons, assessments, profile information and progress state. Actions taken offline enter a local store and sync queue; once connectivity returns they flow through the backend and conflict resolution into synced state. SMS provides a second path for actions that cannot wait for a connection.",
        visual: "neo-offline-sync",
      },
      {
        heading: "Idempotent message processing",
        body:
          "Because SMS is asynchronous, the messaging layer is treated as a distributed system and must account for delivery delays, duplicate and out-of-order messages, failed delivery, retries and expiry. Each response is reduced to a message ID and checked against processed events: a learner who sends the same answer twice because no acknowledgement arrived is never scored twice.",
        visual: "neo-idempotency",
      },
      {
        heading: "Multi-tenant teacher & admin platform",
        body:
          "A dedicated educator interface covers course and lesson creation, assignment, class management, progress monitoring, result review and identifying learners falling behind \u2014 without caring which interface a student completed a lesson through. An administrative layer adds institution-level controls: accounts, permissions, messaging statistics, delivery status, usage analytics and system health.",
        visual: "neo-multitenancy",
      },
    ],
    outcomes: [
      "Demonstrates that SMS can function as a transport layer for a modern learning platform rather than as the platform itself.",
      "Separates learning state from communication transport \u2014 the interface changes with connectivity, the underlying record does not.",
      "Treats an unreliable asynchronous channel as a distributed system: idempotency, retries, deduplication and expiry are designed in rather than bolted on.",
      "Offline actions queue locally and resolve conflicts on reconnect, with SMS as the fallback when an action genuinely cannot wait.",
    ],
    metrics: [
      {
        label: "Interfaces, one record",
        value: "Same",
        detail: "Web, mobile, SMS and STK all resolve to the same learner action.",
      },
      {
        label: "Transport layers",
        value: "7+",
        detail: "Web, Android, SMS, STK, WhatsApp, email and push as candidate transports.",
      },
      {
        label: "Double-scoring",
        value: "Prevented",
        detail: "Message IDs checked against processed events before any answer is applied.",
      },
      {
        label: "Status",
        value: "Design",
        detail: "Under active design, experimental side project \u2014 no working implementation yet.",
      },
    ],
    stack: [
      "TypeScript",
      "React / Next.js",
      "PWA / IndexedDB",
      "Go or Python",
      "REST API",
      "PostgreSQL",
      "Redis (queues)",
      "SMS Gateway",
      "SIM Toolkit (STK)",
      "Docker",
      "CI/CD",
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}