export interface CaseStudySection {
  heading: string;
  body: string;
  bullets?: string[];
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
      },
      {
        heading: "Notifications & messaging",
        body:
          "Real-time push, in-app alerts and multi-channel messaging across mobile and web, with event triggers, delivery confirmation and channel fallback logic. A real-time chat subsystem handled presence and read receipts at institutional scale.",
      },
      {
        heading: "Authentication",
        body:
          "Password-based login and on-device biometric verification secured access to sensitive institutional data, with session and account-lifecycle management.",
      },
      {
        heading: "Infrastructure & delivery",
        body:
          "Azure cloud managed end-to-end. Containerised services on Docker and Kubernetes. Bash automation and CI/CD pipelines replaced manual releases. TrueNAS storage architecture held 10TB+ of institutional data with redundancy.",
      },
      {
        heading: "Operations",
        body:
          "Proactive monitoring, scheduled maintenance and disciplined incident response with root-cause analysis kept the system at 99.9% uptime through a school year.",
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
      },
      {
        heading: "Data structures & algorithms",
        body:
          "A from-scratch library covering dynamic arrays, singly and doubly linked lists, stacks, queues, circular queues, binary min-heaps, priority queues, chaining hash maps, BST and AVL trees, tries and an LRU cache \u2014 with an in-process benchmark harness timing all 16 workloads and recording runtime, memory and throughput.",
      },
      {
        heading: "Scheduler & job queue",
        body:
          "Resource-aware scheduling with a transparent score breakdown (CPU, memory, GPU, network, health and affinity, plus a utilisation penalty and priority bonus), and a priority-based job queue with retries.",
      },
      {
        heading: "Raft consensus & replicated KV",
        body:
          "Leader election, log replication, heartbeats, term management and snapshots implemented directly. A replicated key\u2013value store commits writes through the Raft log and serves reads from a consistent view.",
      },
      {
        heading: "Consistent hashing",
        body:
          "A hash ring with virtual nodes places shards and keeps re-balancing minimal when the node set changes.",
      },
      {
        heading: "Chaos engineering",
        body:
          "kill_node, network_partition, latency, cpu_stress and memory_pressure experiments with automatic revert and blast-radius impact analysis \u2014 wired into the event bus so failures flow naturally into anomaly and incident systems.",
      },
      {
        heading: "Anomaly detection & incident correlation",
        body:
          "Rolling-window z-score detection plus absolute threshold rules (defaults: CPU > 90, memory usage > 85) feed an incident manager that coalesces related events, correlates across the cluster and drives a lifecycle from open to investigating to resolved.",
      },
      {
        heading: "Advisory AI, read-only",
        body:
          "Rule-based archetype analysis \u2014 deliberate failure injection, dependency cascade, single-component failure, cluster-wide pressure, capacity bottleneck, latency degradation. Advisory output is read-only and every recommendation requires explicit approval before anything is acted on.",
      },
      {
        heading: "Observability & tooling",
        body:
          "Prometheus text and JSON metrics endpoints, event counters, structured logging, an operational CLI (atlas-cli) and a Next.js dark-theme dashboard showing topology, services, open incidents, anomalies and active chaos.",
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
      },
      {
        heading: "Allowlist, not denylist",
        body:
          "No arbitrary shell. Every capability is a typed tool with a permission class (READ_ONLY, LOW_RISK, REQUIRES_APPROVAL, FORBIDDEN). The model cannot bypass the permission layer because authorization is enforced outside the LLM.",
      },
      {
        heading: "Approval before risk",
        body:
          "REQUIRES_APPROVAL actions cannot run until a human says yes. Default mode is READ_ONLY \u2014 no destructive operations until the permission system is explicitly enabled.",
      },
      {
        heading: "Explainable reasoning",
        body:
          "The console shows reasoning summaries and the evidence collected at every step \u2014 never hidden chain-of-thought.",
      },
      {
        heading: "Investigation lifecycle",
        body:
          "classify \u2192 context \u2192 evidence \u2192 hypothesis \u2192 test \u2192 root cause \u2192 remediation \u2192 approval \u2192 execute \u2192 verify \u2192 close. When evidence is insufficient the reasoning loop iterates instead of inventing a root cause just to finish.",
      },
      {
        heading: "Phase 1 \u2014 verified foundation",
        body:
          "FastAPI application factory with a live /api/v1/health database check, PostgreSQL 16 persistence (SQLAlchemy 2.0 async, Alembic migrations), Redis, structured logging with structlog, a sandbox Docker Compose stack, and CI running ruff, strict mypy and pytest against real PostgreSQL and Redis \u2014 with graceful degradation when a dependency is down.",
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
      },
      {
        heading: "Storage & backups",
        body:
          "A high-availability TrueNAS storage architecture supported 10TB+ of institutional data with redundancy and failover patterns.",
      },
      {
        heading: "Monitoring & operations",
        body:
          "Proactive monitoring and scheduled maintenance replaced firefighting. Incident response with root-cause analysis stopped recurring problems at the source.",
      },
      {
        heading: "Device operations",
        body:
          "Printers and endpoint issues traced to their causes and fixed structurally, cutting recurring support tickets.",
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
      },
      {
        heading: "Administrative automation",
        body:
          "Automation scripts handled repetitive administrative work \u2014 at one institution reclaiming 4 hours per week of manual work, at the other 15+ hours weekly across the operations team.",
      },
      {
        heading: "Operational automation",
        body:
          "Monitoring, health checks and preventive fixes automated so recurring problems stopped generating tickets.",
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
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}