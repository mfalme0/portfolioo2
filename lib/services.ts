export interface Deliverable {
  label: string;
  detail?: string;
}

export interface ServicePillar {
  id: string;
  name: string;
  short: string;
  href: string;
  blurb: string;
  services: Deliverable[];
  cta: string;
  ctaHref: string;
  anchor: string;
  pricing?: string;
}

export const pillars: ServicePillar[] = [
  {
    id: "software",
    name: "Software Engineering",
    short: "Custom software for businesses that have outgrown spreadsheets.",
    href: "/software-engineering",
    blurb:
      "ERP systems, business portals, dashboards, APIs and integrations \u2014 designed around how your organization actually works.",
    services: [
      { label: "ERP & business systems" },
      { label: "CRM & portals" },
      { label: "Dashboards & reporting" },
      { label: "APIs & integrations" },
      { label: "Realtime applications" },
    ],
    cta: "Discuss a software project",
    ctaHref: "/contact?service=Custom Software",
    anchor: "software",
    pricing: "From KSh 100,000",
  },
  {
    id: "infrastructure",
    name: "IT & Infrastructure",
    short: "Assessments, planning and operations for systems that stay up.",
    href: "/it-consulting",
    blurb:
      "Infrastructure audits, Linux and cloud operations, networking, backups, monitoring and security planning.",
    services: [
      { label: "IT assessments & audits" },
      { label: "Infrastructure planning" },
      { label: "Linux & server administration" },
      { label: "Cloud (Azure) & cost optimisation" },
      { label: "Networking, backups & monitoring" },
    ],
    cta: "Request an IT consultation",
    ctaHref: "/contact?service=IT Consulting",
    anchor: "infrastructure",
    pricing: "Audits from KSh 15,000",
  },
  {
    id: "ai",
    name: "AI & Automation",
    short: "Practical automation for repetitive processes and documents.",
    href: "/ai-automation",
    blurb:
      "Workflow automation, document processing, internal assistants and AI-enabled applications built around a specific business problem.",
    services: [
      { label: "Workflow automation" },
      { label: "Document processing" },
      { label: "Internal AI assistants" },
      { label: "Business intelligence" },
      { label: "Repetitive task automation" },
    ],
    cta: "Automate a process",
    ctaHref: "/contact?service=AI & Automation",
    anchor: "ai",
    pricing: "From KSh 40,000",
  },
  {
    id: "hardware",
    name: "Custom PC Building",
    short: "PCs designed around what you actually do \u2014 not stock parts.",
    href: "/pc-building",
    blurb:
      "Gaming PCs, developer and AI workstations, content creation rigs and business desktops \u2014 specced, built and tested in Nairobi.",
    services: [
      { label: "Gaming PCs" },
      { label: "Developer workstations" },
      { label: "AI workstations" },
      { label: "Content creation rigs" },
      { label: "Upgrades & troubleshooting" },
    ],
    cta: "Request a build",
    ctaHref: "/contact?service=Custom PC Build",
    anchor: "pc-building",
    pricing: "Request a quote",
  },
  {
    id: "leadership",
    name: "Technical Leadership",
    short: "Architecture, strategy and engineering leadership for growing teams.",
    href: "/technical-leadership",
    blurb:
      "Fractional CTO, technology strategy, architecture reviews and technical oversight without the cost of a full-time hire.",
    services: [
      { label: "Fractional CTO" },
      { label: "Technology strategy" },
      { label: "Architecture reviews" },
      { label: "Engineering leadership" },
      { label: "Technical project oversight" },
    ],
    cta: "Book a tech leadership call",
    ctaHref: "/contact?service=Technical Leadership",
    anchor: "leadership",
    pricing: "From KSh 50,000/month",
  },
];

export const pricing = [
  {
    name: "IT Audit",
    from: "KSh 15,000",
    detail:
      "Backups, networking, security, access control, monitoring and downtime risk \u2014 with a prioritized remediation plan.",
    href: "/it-consulting",
  },
  {
    name: "Business Automation",
    from: "KSh 40,000",
    detail:
      "A specific repetitive process analyzed, automated and handed over with documentation.",
    href: "/ai-automation",
  },
  {
    name: "Custom Business Systems",
    from: "KSh 100,000",
    detail:
      "ERPs, portals and internal systems scoped, designed, built and deployed.",
    href: "/software-engineering",
  },
  {
    name: "Fractional CTO",
    from: "KSh 50,000/month",
    detail:
      "Ongoing architecture, strategy and engineering leadership on a retainer.",
    href: "/technical-leadership",
  },
];

export interface PcService {
  id: string;
  name: string;
  href: string;
  blurb: string;
  audience: string[];
  cta: string;
}

export const pcServices: PcService[] = [
  {
    id: "gaming",
    name: "Gaming PCs",
    href: "/gaming-pcs",
    blurb:
      "Builds tuned for 1080p, 1440p, high-refresh and 4K gaming \u2014 plus esports and streaming rigs.",
    audience: ["1080p", "1440p", "High-refresh", "4K", "Esports", "Streaming"],
    cta: "Build a gaming PC",
  },
  {
    id: "workstations",
    name: "Developer & AI Workstations",
    href: "/workstations",
    blurb:
      "Rigged for software development, Docker and Kubernetes, virtual machines, local LLMs and GPU compute.",
    audience: ["Software development", "AI workloads", "Local LLMs", "VMs", "Multi-monitor"],
    cta: "Build a workstation",
  },
  {
    id: "content",
    name: "Content Creation",
    href: "/pc-building",
    blurb:
      "Video editing, 3D, rendering, design and streaming machines with the cores and memory the software actually uses.",
    audience: ["Video editing", "3D & rendering", "Design", "Streaming"],
    cta: "Spec a creator PC",
  },
  {
    id: "business",
    name: "Business Workstations",
    href: "/pc-building",
    blurb:
      "Reliable office desktops and professional workstations for CAD, data analysis and heavy productivity.",
    audience: ["Office", "CAD", "Professional apps", "Data analysis", "Productivity"],
    cta: "Spec a business PC",
  },
  {
    id: "upgrades",
    name: "PC Upgrades",
    href: "/pc-upgrades",
    blurb:
      "SSDs, RAM, GPU and CPU upgrades that measurably change what your current machine can do.",
    audience: ["SSD", "RAM", "GPU", "CPU", "Cooling"],
    cta: "Plan an upgrade",
  },
  {
    id: "troubleshooting",
    name: "PC Troubleshooting",
    href: "/pc-troubleshooting",
    blurb:
      "Diagnosis and repair for crashes, overheating, boot failures, noise, slow performance and hardware faults.",
    audience: ["Crashes", "Overheating", "Boot failures", "Slow performance", "Faults"],
    cta: "Diagnose a problem",
  },
];

export const pcBuildProcess = [
  { step: "Requirements", detail: "What you\u2019ll actually run, play, or build." },
  { step: "Budget", detail: "A realistic range \u2014 and where value sits." },
  { step: "Workload analysis", detail: "Which components matter most for your work." },
  { step: "Component selection", detail: "Parts chosen around your workload, not stock." },
  { step: "Compatibility validation", detail: "Socket, board, RAM, clearance, PSU wattage." },
  { step: "Build", detail: "Assembly with careful cable management." },
  { step: "BIOS & firmware", detail: "Memory profiles, boot order, updates." },
  { step: "OS installation", detail: "Clean install, configured for your use." },
  { step: "Drivers", detail: "Correct, current and stable versions." },
  { step: "Stress testing", detail: "CPU, GPU, memory and storage under load." },
  { step: "Optimization", detail: "Power, thermals, boot time, background load." },
  { step: "Delivery", detail: "Handover with documentation and how-to-use notes." },
];

export const pcPackages = [
  {
    name: "Component Selection",
    detail:
      "Tell me your budget and workload. You receive recommended components, a compatibility review, an upgrade path and estimated performance \u2014 so you can buy with confidence.",
    includes: ["Recommended components", "Compatibility review", "Upgrade path", "Estimated performance"],
    price: "Quote",
  },
  {
    name: "Build & Assembly",
    detail:
      "The full build service: components installed, cables managed, BIOS configured, OS installed, drivers loaded and everything stress-tested before delivery.",
    includes: ["Component installation", "Cable management", "BIOS configuration", "OS + drivers", "Stress testing"],
    price: "Quote",
  },
  {
    name: "Full Workstation Deployment",
    detail:
      "Hardware plus a production-ready environment: operating system, development tools, virtualization, optimization and monitoring \u2014 delivered as a working machine.",
    includes: ["Hardware", "OS & software setup", "Development tools", "Virtualization", "Monitoring"],
    price: "Quote",
  },
];

export const stackLayers = [
  { layer: "PC", detail: "Hardware that matches the workload" },
  { layer: "Operating System", detail: "Linux, Windows \u2014 configured, patched, fast" },
  { layer: "Network", detail: "Routing, switching, VLANs, Wi-Fi" },
  { layer: "Infrastructure", detail: "Servers, storage, TrueNAS, Proxmox" },
  { layer: "Cloud", detail: "Azure, containers, cost control" },
  { layer: "Applications", detail: "Web apps, APIs, ERPs, portals" },
  { layer: "Automation", detail: "Scripts, pipelines, workflows" },
  { layer: "AI", detail: "Local models, assistants, processing" },
];

export const areasServed = [
  "Nairobi",
  "Kiambu",
  "Kikuyu",
  "Limuru",
  "Ruaka",
  "Westlands",
  "Karen",
  "Kilimani",
  "Ruiru",
  "Thika",
  "and surrounding Nairobi areas",
];