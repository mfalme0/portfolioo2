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
    title: "Atlas \u2014 Distributed Systems Engine",
    category: "Distributed Systems",
    kind: "Engineering Project",
    timeframe: "Ongoing engineering project",
    context:
      "A deep engineering exercise in distributed systems: building replicated, fault-tolerant infrastructure from first principles rather than reaching for managed services.",
    tags: [
      "Raft",
      "Consensus",
      "Replicated KV",
      "Distributed Queues",
      "Consistent Hashing",
      "Chaos Testing",
    ],
    summary:
      "A distributed systems engine exploring consensus, replication and failure recovery \u2014 a replicated key-value store and distributed queue built on Raft, with consistent hashing, retries, dead-letter queues and chaos-tested failure handling.",
    problem: [
      "Most engineers consume distributed systems as a managed black box. This project builds the core mechanics \u2014 and the failure modes \u2014 from the ground up.",
      "Single-node queues and key-value stores lose data and availability on failure; replication and ordered recovery are hard to get right.",
    ],
    approach: [
      {
        heading: "Raft consensus",
        body:
          "Leader election, terms, heartbeats and log replication implemented directly \u2014 covering the full lifecycle from election to committed entries, with the failure recovery paths that follow when a leader loses contact.",
      },
      {
        heading: "Replicated key-value store",
        body:
          "A replicated KV store where writes are committed through the Raft log and reads are served consistently, so data survives node failure without manual recovery.",
      },
      {
        heading: "Distributed queue with DLQ",
        body:
          "A distributed queue with retries, a dead-letter queue for poisoned messages, and worker heartbeats so stalled consumers are detected and work can be re-queued rather than lost.",
      },
      {
        heading: "Consistent hashing",
        body:
          "Consistent hashing places keys across nodes and minimises re-balancing when the node set changes \u2014 keeping partitions stable during scale-out and replacement.",
      },
      {
        heading: "Chaos testing",
        body:
          "Deliberately killing leaders, partitions, pauses and message failures to verify elections, log replay and DLQ paths under realistic fault conditions.",
      },
    ],
    outcomes: [
      "A working replicated KV store and queue that continue to serve reads and writes through leader failure.",
      "Verified recovery paths \u2014 new leaders elected, logs replayed, undelivered messages dead-lettered or retried.",
      "A reusable demonstration of why consensus, ordering and failure handling matter in production systems.",
    ],
    metrics: [
      {
        label: "Replicated data",
        value: "KV + queue",
        detail: "Both stores replicate writes through the Raft log.",
      },
      {
        label: "Failure modes tested",
        value: "Chaos suite",
        detail: "Leader kills, partitions, pauses and poisoned messages.",
      },
      {
        label: "Message durability",
        value: "Retries + DLQ",
        detail: "Poisoned messages land in a dead-letter queue, not lost.",
      },
    ],
    stack: [
      "Distributed Systems Theory",
      "Raft",
      "Consistent Hashing",
      "Replicated KV",
      "Message Queues",
      "DLQ",
      "Chaos Testing",
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