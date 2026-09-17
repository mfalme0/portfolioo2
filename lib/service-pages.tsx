import React from "react";
import type { ServicePageConfig } from "@/app/Components/site/service-page";

export const servicePages: Record<string, ServicePageConfig> = {
  "/software-engineering": {
    eyebrow: "Software Engineering",
    title: (
      <>
        Business systems built around <span style={{ color: "var(--flag)" }}>how you work.</span>
      </>
    ),
    lead: "ERPs, portals, dashboards, APIs and integrations for organisations that have outgrown spreadsheets and disconnected tools — scoped honestly, built properly, and shipped all the way to production.",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Software Engineering" },
    ],
    problem: {
      title: "Spreadsheets scale until they don't.",
      text: "Every growing organisation hits the same wall: the record that lives in three places, the monthly report assembled by hand, the process that only one person understands. The cost isn't the software — it's the manual integration work happening every day to keep the disconnected pieces moving.",
    },
    solutionHeadline: (
      <>
        What a custom build delivers: <span style={{ color: "var(--flag)" }}>a single source of truth.</span>
      </>
    ),
    services: [
      { label: "ERP & business systems", detail: "Student records, finance, inventory, operations — connected modules over one shared record." },
      { label: "CRM & portals", detail: "Customer, member and parent portals with role-based access." },
      { label: "Dashboards & reporting", detail: "Reports produced while the month is happening, not glued together after it ends." },
      { label: "APIs & integrations", detail: "Move data between the systems you already pay for — no more manual re-entry." },
      { label: "Realtime applications", detail: "Notifications, messaging and live updates that actually reach people." },
      { label: "Authentication & security", detail: "Password-based login, biometric verification, role-based access control." },
    ],
    approachTitle: "How a project runs",
    approach: [
      { step: "Understand the work", detail: "Interviews, shadowing and process mapping — the system is designed around how the work actually happens." },
      { step: "Scope honestly", detail: "What's in, what's out, what it costs, and where the value sits. A document you can hold us to." },
      { step: "Design", detail: "Data model and architecture agreed before code — the part that decides what the system can become." },
      { step: "Build iteratively", detail: "Working increments you can use and react to, not a surprise reveal after months." },
      { step: "Deploy & operate", detail: "CI/CD pipelines, monitoring, backups and documentation. Shipped to production and operated, not just delivered." },
      { step: "Hand over & support", detail: "Training, documentation, and a support path that includes an actual person." },
    ],
    relatedIds: ["infrastructure", "ai", "leadership"],
    faqs: [
      { q: "How is this different from buying off-the-shelf software?", a: "Off-the-shelf wins when your processes already match the vendor's defaults. A custom build wins when the way your organisation works is what creates the value — unusual workflows, existing practices, or integrations a shelf product can't reach. The guide on when to build an ERP covers the decision in detail." },
      { q: "I don't have a detailed spec yet. Is that a problem?", a: "That's normal — and honestly, a spec written before understanding the work is often wrong. The scoping phase maps how the work happens first, then turns that into a specification you approve before any build begins." },
      { q: "Do you build the whole system yourself?", a: "For the systems I take on, yes — architecture, backend, frontend, infrastructure and deployment are handled end to end. The case study on the school ERP shows a full build from requirements through operations." },
      { q: "What does it cost?", a: "Custom business systems start from KSh 100,000. A scoped project gets a fixed price and timeline after the discovery phase — no hourly surprises." },
    ],
    ctaTitle: "Your operations run on manual work every day.",
    ctaText: "If the record lives in three places, or the monthly report takes days, a conversation is worth having — even if the answer is 'not yet.'",
    ctaLabel: "Discuss a software project",
    ctaHref: "/contact?service=Custom Software",
    waKey: "software",
  },

  "/it-consulting": {
    eyebrow: "IT Consulting",
    title: (
      <>
        Assessments, planning and ops for <span style={{ color: "var(--flag)" }}>systems that stay up.</span>
      </>
    ),
    lead: "IT audits, infrastructure planning, Linux and server administration, cloud cost control, networking, backups and monitoring — delivered by someone who has run each of these in production, not just read about them.",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "IT Consulting" },
    ],
    problem: {
      title: "Most IT problems are discovered by staff, not by systems.",
      text: "The printer breaks again. The internet drops and the ISP says it's on your side. The backup job 'ran' but has never been restored. When nothing is monitored, documented or tested, every incident is a surprise — and every surprise costs hours, revenue and trust.",
    },
    solutionHeadline: (
      <>
        Consulting that starts where <span style={{ color: "var(--flag)" }}>you are.</span>
      </>
    ),
    services: [
      { label: "IT audits", detail: "Backups, networking, security, access, monitoring and downtime risk — with a prioritized remediation plan. From KSh 15,000." },
      { label: "Infrastructure planning", detail: "A deliberate map of what you have, what you need, and the order to buy and build it." },
      { label: "Linux & server administration", detail: "Hardening, patching, services, users — operated with the same discipline as a production app." },
      { label: "Cloud (Azure) & cost optimisation", detail: "Sizing, right-sizing and governance that cut bills without cutting capability." },
      { label: "Networking", detail: "Routing, switching, VLANs, Wi-Fi coverage and failover paths." },
      { label: "Backups & monitoring", detail: "Backups that get restore-tested and monitoring that finds problems before users do." },
    ],
    approachTitle: "How an engagement works",
    approach: [
      { step: "Free initial conversation", detail: "You describe what's slow, broken or risky. I tell you honestly whether I can help." },
      { step: "Audit or assessment", detail: "A working assessment of your actual environment — not a template scan." },
      { step: "Prioritized findings", detail: "A ranked list: what's urgent, what can wait, and the cost to close each gap." },
      { step: "Fixes & follow-through", detail: "Implement the fixes, run the operation, or hand you a plan — your choice." },
      { step: "Ongoing support", detail: "Monitoring, scheduled maintenance and a human to call during incidents." },
    ],
    relatedIds: ["infrastructure", "cloud", "leadership"],
    faqs: [
      { q: "What does an IT audit actually cover?", a: "Backups (and whether they've ever been restored), networking, security, access control, monitoring and downtime risk — ranked by how each would hit your business. The guide on what an IT audit covers goes through every area." },
      { q: "How much does an audit cost?", a: "IT audits start at KSh 15,000. The exact scope depends on the size of your environment, which is confirmed during the free first conversation." },
      { q: "Can you help if I have in-house IT staff?", a: "Yes — a common engagement is the audit plus a remediation plan the internal team executes, or a part-time set of hands for what the team doesn't cover." },
      { q: "My business is a school / clinic / office. Is this too small?", a: "Those are exactly the environments this stage is built for. Small and mid-size operation with real downtime cost — not enterprise-software-shaped recommendations." },
    ],
    ctaTitle: "What does one hour of downtime cost you?",
    ctaText: "If the answer is real money, the audit pays for itself. If you're not sure, that's the first thing we'll work out.",
    ctaLabel: "Request an IT consultation",
    ctaHref: "/contact?service=IT Consulting",
    waKey: "infra",
  },

  "/infrastructure": {
    eyebrow: "Infrastructure",
    title: (
      <>
        Infrastructure that gets built once and <span style={{ color: "var(--flag)" }}>stays up.</span>
      </>
    ),
    lead: "Linux servers, storage, networking, backups and monitoring — designed, built and operated from the ground up, the way the on-premises build reduced internet downtime by 50%.",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Infrastructure" },
    ],
    problem: {
      title: "Ad-hoc infrastructure fails quietly and expensively.",
      text: "A loose network, scattered storage, templates-forgotten passwords and no monitoring — nothing fails loudly, everything fails eventually, and it always happens at the worst moment. Rebuilding it properly after the fact costs more than building it deliberately in the first place.",
    },
    solutionHeadline: (
      <>
        A deliberate foundation: <span style={{ color: "var(--flag)" }}>measured, not improvised.</span>
      </>
    ),
    services: [
      { label: "Linux servers", detail: "Hardened Debian/Ubuntu servers, patched and operated with documented procedures." },
      { label: "Storage & backups", detail: "High-availability storage — TrueNAS architecture with redundancy and restore-tested backups." },
      { label: "Networking", detail: "Switching, structured cabling, routing, VLANs, Wi-Fi and failover links." },
      { label: "Monitoring & alerting", detail: "Failures detected by systems, with metrics, health checks and incident paths." },
      { label: "Virtualization", detail: "Proxmox and VM infrastructure that isolates services instead of stacking them on one box." },
      { label: "Disaster recovery", detail: "What happens when something breaks — documented, tested, and fast." },
    ],
    approachTitle: "How the build happens",
    approach: [
      { step: "Inventory and map", detail: "What exists, how it's connected, what it depends on — the real topology, not the diagram someone drew once." },
      { step: "Design around the failure", detail: "Single points of failure identified and designed out before a single cable is moved." },
      { step: "Build in layers", detail: "Networking, then storage, then servers, then monitoring — each layer validated before the next." },
      { step: "Document everything", detail: "Diagrams, runbooks, credentials in a vault, and a recovery plan that doesn't depend on memory." },
      { step: "Operate and tune", detail: "Monitoring, scheduled maintenance, and incident response with root-cause analysis." },
    ],
    relatedIds: ["software", "cloud", "ai"],
    faqs: [
      { q: "Do you build on-premises or in the cloud?", a: "Both, and the choice is driven by the work. The on-premises case study shows a ground-up build; the ops story shows a cloud environment run with the same discipline. Often the best answer is a deliberate mix." },
      { q: "What does a backup setup look like?", a: "Automated, versioned, off-site or on redundant storage, monitored, and — the part most setups skip — actually restore-tested on a schedule." },
      { q: "Can you take over infrastructure that already exists?", a: "Yes. The audit-first path maps what exists, finds the holes, and produces a prioritized plan to close them without a big-bang rebuild." },
      { q: "How do you handle ongoing maintenance?", a: "Monitoring, patching schedules, backup verification and incident response — either as a retainer or a scheduled-hours arrangement." },
    ],
    ctaTitle: "The infrastructure that runs your business can't be improvised.",
    ctaText: "A single weak point — power, link, storage, passwords — is all it takes. Let's find yours before it finds you.",
    ctaLabel: "Talk about infrastructure",
    ctaHref: "/contact?service=Infrastructure",
    waKey: "infra",
  },

  "/cloud": {
    eyebrow: "Cloud & DevOps",
    title: (
      <>
        Cloud you actually control — <span style={{ color: "var(--flag)" }}>and pay for once.</span>
      </>
    ),
    lead: "Azure infrastructure built and operated with discipline: containers, CI/CD, monitoring and cost control. The same practices that cut cloud spend by 20% and deployment errors by 45%.",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Cloud & DevOps" },
    ],
    problem: {
      title: "Cloud bills grow on autopilot, and nobody owns them.",
      text: "Resources get provisioned, never decommissioned. Releases are manual rituals that can't be reproduced. Costs are discovered at the end of the month instead of being designed. The cloud is fast — which is exactly why it drifts without a deliberate owner.",
    },
    solutionHeadline: (
      <>
        Cloud operated like <span style={{ color: "var(--flag)" }}>production, not a lab.</span>
      </>
    ),
    services: [
      { label: "Azure infrastructure", detail: "Landing zones, VMs, storage, networking — designed for what you actually run." },
      { label: "Containers & orchestration", detail: "Docker and Kubernetes with images, volumes and upgrades that don't scare anyone." },
      { label: "CI/CD pipelines", detail: "Releases that ship from a pipeline, not from memory. 45% fewer deployment errors, measured." },
      { label: "Monitoring & observability", detail: "Metrics, logs and alerts that find problems before users do." },
      { label: "Cost optimisation", detail: "Right-sizing, decommissioning orphans and reservation strategy — cut the bill without cutting capability." },
      { label: "Security & compliance basics", detail: "Access control, secrets management, patching and audit trails." },
    ],
    approachTitle: "How the cloud work runs",
    approach: [
      { step: "Map what's running", detail: "A real inventory of resources, cost and dependencies — including what nothing depends on and shouldn't exist." },
      { step: "Right-size and stabilise", detail: "Fix the expensive and unstable things first: images, storage tiers, orphaned resources." },
      { step: "Make deployment repeatable", detail: "Pipelines and infrastructure-as-anything-documented, so releases stop being rituals." },
      { step: "Instrument everything", detail: "Monitoring on services that have no monitoring, alerts to the right people." },
      { step: "Hand over operations", detail: "Documentation, runbooks, and an ongoing path — retainer or as-needed." },
    ],
    relatedIds: ["software", "infrastructure", "devops"],
    faqs: [
      { q: "Is this only for Azure, or do you handle AWS / Google Cloud?", a: "Primary experience is Azure, which is where the delivered results were measured. If you're elsewhere, I'll tell you honestly whether the engagement makes sense — and it often does for operations and cost work that's mostly platform-agnostic." },
      { q: "Can you fix a runaway cloud bill?", a: "That's a common starting point. The map-first approach finds the orphaned resources and over-provisioned services before anything is changed, so cuts are made deliberately — the cloud cost story cut spend 20%." },
      { q: "Do I need Kubernetes?", a: "Usually not, and I'll say so. Docker on a well-operated host covers most businesses. The guide on whether your business needs Docker is honest about where the complexity doesn't pay." },
      { q: "How are you paid?", a: "By scoped engagement — the audit/optimisation phase, the pipeline build, or a monthly retainer for ongoing operation. Transparent at the start, not discovered later." },
    ],
    ctaTitle: "Your cloud bill is a monthly signal.",
    ctaText: "Right-sized, instrumented and release-ready cloud is cheaper than the drifting version — and you'll be able to prove it.",
    ctaLabel: "Talk cloud & DevOps",
    ctaHref: "/contact?service=Cloud & DevOps",
    waKey: "cloud",
  },

  "/devops": {
    eyebrow: "DevOps",
    title: (
      <>
        Deployments that work the same <span style={{ color: "var(--flag)" }}>every single time.</span>
      </>
    ),
    lead: "Delivery automation — pipelines, scripts, monitoring and reproducible environments — that turned manual releases into a 45% reduction in deployment errors.",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "DevOps" },
    ],
    problem: {
      title: "The most expensive step in your pipeline is the person.",
      text: "When 'deploying' means following a script written in someone's memory, every release is a gamble: half-applied changes, live debugging, rollbacks that are more stressful than the release itself. The worst part is that it works — right up until the day it doesn't.",
    },
    solutionHeadline: (
      <>
        Automation that removes the <span style={{ color: "var(--flag)" }}>human-error path.</span>
      </>
    ),
    services: [
      { label: "CI/CD pipelines", detail: "Build, test, deploy from a pipeline. Releases become boring — the way they should be." },
      { label: "Automation scripts", detail: "Bash and Python automation for operations: checks, reports, maintenance, recovery." },
      { label: "Reproducible environments", detail: "Docker and configuration so a service can be recreated from a file, not from memory." },
      { label: "Deployment monitoring", detail: "Deploys tracked with health checks and rollback at the push of a button." },
      { label: "Incident automation", detail: "Health checks, restarts and response paths that handle routine failures without a person." },
    ],
    approachTitle: "How delivery gets fixed",
    approach: [
      { step: "Watch a real release", detail: "Not the diagram — an actual deploy, with everything that's improvised around it." },
      { step: "Identify the failure points", detail: "Where are errors human? Where is the script-by-memory? Where would a rollback be slow?" },
      { step: "Automate the risky parts first", detail: "The pipeline builds around the steps that break, not the steps that already work." },
      { step: "Measure before and after", detail: "Deployment error rates and release time recorded — improvements proven, not claimed." },
      { step: "Document and hand over", detail: "Runbooks, pipeline docs, and training so the team runs it without the vendor." },
    ],
    relatedIds: ["cloud", "infrastructure", "software"],
    faqs: [
      { q: "We're a small team without a DevOps person. Is this realistic?", a: "Yes — this level of automation is designed for small teams. The measured results — 45% fewer deployment errors — came from a small operations team, not an enterprise platform team." },
      { q: "GitHub Actions, GitLab CI, Jenkins — what do you use?", a: "Whatever fits your stack. The principle is the same: the pipeline owns the release, the person owns the decision. The tool is picked during scoping, not before it." },
      { q: "Can you automate things beyond deployments?", a: "Yes. Backup verification, monitoring checks, reporting and maintenance all fall under the automation practice shown in the automation case study — hours reclaimed every week." },
      { q: "What if our infrastructure can't support CI/CD yet?", a: "Then the first phase is the infrastructure, and I'll tell you so. Pipelines are the second improvement after a stable base — the scoping makes that order explicit." },
    ],
    ctaTitle: "Every manual release is a quiet gamble.",
    ctaText: "Pipelines turn releases from moments of stress into routine operations — the improvement is measurable in the first month.",
    ctaLabel: "Automate my deployments",
    ctaHref: "/contact?service=Cloud & DevOps",
    waKey: "devops",
  },

  "/ai-automation": {
    eyebrow: "AI & Automation",
    title: (
      <>
        Automation that removes work — <span style={{ color: "var(--flag)" }}>tasks, not videos.</span>
      </>
    ),
    lead: "Workflow automation, document processing, internal assistants and AI-enabled applications aimed at one thing: a specific business task that stops eating hours every week. From KSh 40,000.",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "AI & Automation" },
    ],
    problem: {
      title: "The automation that pays is the boring one.",
      text: "Not the futuristic demo — the daily report assembled by hand, the documents re-typed into a system, the weekly reconciliation. These tasks consume hours year-round, quietly, in every organisation. AI and automation only matter here if they actually remove those hours.",
    },
    solutionHeadline: (
      <>
        One bounded process, <span style={{ color: "var(--flag)" }}>automated end to end.</span>
      </>
    ),
    services: [
      { label: "Workflow automation", detail: "Daily reports, reconciliations, reminders, data moves between tools." },
      { label: "Document processing", detail: "Extracting fields from invoices, forms and certificates into your systems." },
      { label: "Internal AI assistants", detail: "Assistants over your own data and documents, with boundaries and correct answers." },
      { label: "Data & reporting automation", detail: "Dashboards and reports produced while the month is happening." },
      { label: "Bash / Python automation", detail: "System automation that carries the operations week: checks, backups, maintenance." },
      { label: "AI-enabled applications", detail: "Judgement-ish but boring parts of your software handled by models — clearly separated from the exact parts." },
    ],
    approachTitle: "How automation gets picked",
    approach: [
      { step: "Find the candidate", detail: "A task that's repetitive, rule-based and high-volume — not a department, not 'digitisation'." },
      { step: "Measure it for a week", detail: "Hours, steps, tools touched, error rate. The measurement decides the whole project shape." },
      { step: "Design for the exclusions", detail: "Deterministic parts scripted, judgements handled by AI, exact parts kept away from probabilistic ones." },
      { step: "Build the narrow version", detail: "The main path correct first, edge cases after — run alongside the human process until results match." },
      { step: "Hand over with documentation", detail: "What it does, how to check it, and who to call when it's wrong." },
    ],
    relatedIds: ["software", "infrastructure", "devops"],
    faqs: [
      { q: "Is this 'AI' or automation?", a: "Both, deliberately separated. Rule-based scripting handles the deterministic parts; AI handles the parts that need judgement — extracting fields, classifying, summarising. The design decides the split explicitly." },
      { q: "Will it replace jobs?", a: "No — it removes tasks. The automation case study shows 15+ hours per week handed back to the operations team, not headcount removed. That's the honest goal." },
      { q: "How much does a project cost?", a: "Business automation starts from KSh 40,000 for a bounded process. The measurement phase means you know what you're buying before you buy." },
      { q: "What if the automation isn't worth it?", a: "Then I'll tell you that in the scoping call. Automating a broken or one-off process is a bad buy, and the honest answer is part of the service." },
    ],
    ctaTitle: "A task eating 2 hours a week is 100 hours a year.",
    ctaText: "If you can point at the task, I can tell you — honestly — whether automation is worth it.",
    ctaLabel: "Scope an automation",
    ctaHref: "/contact?service=AI & Automation",
    waKey: "ai",
  },

  "/technical-leadership": {
    eyebrow: "Technical Leadership",
    title: (
      <>
        Engineering leadership without <span style={{ color: "var(--flag)" }}>the full-time hire.</span>
      </>
    ),
    lead: "Fractional CTO, technology strategy, architecture reviews and technical oversight — architecture and direction for teams and founders who need it more than they need another code commit.",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Technical Leadership" },
    ],
    problem: {
      title: "The hardest technical decisions are the ones nobody owns.",
      text: "The architecture nobody reviews, the scaling problem postponed 'for now', the stack decision made by whoever's loudest. Small teams live this constantly — they can afford a senior engineer, but a full-time CTO or architect is out of reach. So the decisions drift.",
    },
    solutionHeadline: (
      <>
        A technical leader on <span style={{ color: "var(--flag)" }}>your side of the table.</span>
      </>
    ),
    services: [
      { label: "Fractional CTO", detail: "A monthly relationship: architecture, prioritization, technical risk and hiring guidance. From KSh 50,000/month." },
      { label: "Technology strategy", detail: "What to build, what to buy, what to defer — a roadmap you can actually fund." },
      { label: "Architecture reviews", detail: "A senior pass over your codebase, infrastructure and delivery process with written findings." },
      { label: "Engineering leadership", detail: "Technical oversight, standards, and the senior point of view for founding teams." },
      { label: "Audit-ready decisions", detail: "Decisions taken with documented reasoning — so they survive new hires and audits." },
    ],
    approachTitle: "How the engagement works",
    approach: [
      { step: "Understand the business", detail: "The technical questions only make sense against the business ones: revenue, stage, risk, team." },
      { step: "Review what exists", detail: "Architecture, codebase, infrastructure, delivery process — a senior assessment, written down." },
      { step: "Produce a working plan", detail: "A prioritized technical agenda: what to fix, what to ship, what to stop." },
      { step: "Be present", detail: "Regular calls, reviews, and an escalation path for the decisions the team shouldn't make alone." },
      { step: "Measure the outcome", detail: "Technical metrics tied to business outcomes — stability, delivery speed, cost — reviewed each month." },
    ],
    relatedIds: ["software", "cloud", "ai"],
    faqs: [
      { q: "What is a fractional CTO, exactly?", a: "A senior technical leader engaged part-time — typically a monthly relationship for architecture, strategy, prioritization and oversight, instead of a full-time executive salary. From KSh 50,000/month." },
      { q: "We already have engineers. Do we need this?", a: "If the engineers are executing well but the direction, architecture and priorities are drifting, the gap is leadership, not hands. That's the engagement." },
      { q: "Do you only work with software companies?", a: "No — organisations building technology in any form benefit: a product team, a school or business building internal systems, a founder with a technical co-founder gap." },
      { q: "Can this start as a single architecture review?", a: "Yes. Most relationships start with a review — you get concrete written findings, and we decide together whether ongoing engagement is worth it." },
    ],
    ctaTitle: "The most expensive technical work is the work you build twice.",
    ctaText: "A senior review before the rewrite, the scale-up or the big feature is cheaper than the wrong version of all three.",
    ctaLabel: "Book a tech leadership call",
    ctaHref: "/contact?service=Technical Leadership",
    waKey: "leadership",
  },
};