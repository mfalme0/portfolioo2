export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "callout"; title?: string; text: string };

export interface Guide {
  slug: string;
  title: string;
  description: string;
  cluster: "PC Building" | "IT Infrastructure" | "Software Engineering" | "AI & Automation";
  readingTime: string;
  datePublished: string;
  dateModified: string;
  tags: string[];
  related: string[];
  cta: { title: string; text: string; href: string; label: string };
  blocks: Block[];
}

export const guideClusters = [
  {
    id: "pc-building",
    name: "PC Building",
    blurb:
      "How to choose parts, budget and build or upgrade a PC that matches real workloads.",
    href: "/guides?cluster=pc-building",
  },
  {
    id: "it-infrastructure",
    name: "IT Infrastructure",
    blurb:
      "Practical infrastructure decisions for businesses \u2014 audits, backups, Docker and monitoring.",
    href: "/guides?cluster=it-infrastructure",
  },
  {
    id: "software-engineering",
    name: "Software Engineering",
    blurb:
      "When custom software makes sense, and how business systems actually get built.",
    href: "/guides?cluster=software-engineering",
  },
  {
    id: "ai-automation",
    name: "AI & Automation",
    blurb:
      "Where automation and AI deliver in a business, and how to start without hype.",
    href: "/guides?cluster=ai-automation",
  },
];

export const guides: Guide[] = [
  {
    slug: "gaming-pc-buying-guide-kenya",
    title: "Gaming PC Buying Guide for Kenya \u2014 2026",
    description:
      "How to buy a gaming PC in Kenya without overpaying: where parts prices come from, which components actually matter at 1080p, 1440p and 4K, and how to budget in KSh.",
    cluster: "PC Building",
    readingTime: "8 min read",
    datePublished: "2026-01-15",
    dateModified: "2026-09-10",
    tags: ["Gaming PC", "Kenya", "Budget", "GPU", "CPU"],
    related: ["how-much-ram-do-you-need", "how-to-choose-a-psu", "pc-upgrade-guide"],
    cta: {
      title: "Want this specced for you?",
      text: "Tell me your games, resolution and budget, and I\u2019ll put together a compatible build around exactly what you play.",
      href: "/contact?service=Custom PC Build",
      label: "Request a custom build",
    },
    blocks: [
      {
        type: "p",
        text:
          "Buying a gaming PC in Kenya is different from buying one in the US or Europe. Parts ship through local distributors, prices track the US dollar plus import and margin, and \u201cready-built\u201d machines often pair a strong GPU with a weak CPU or a barely adequate power supply. The good news: a well-chosen build gives you the same frames per shilling as anywhere else \u2014 you just have to know what to prioritise.",
      },
      {
        type: "h2",
        id: "resolution-first",
        text: "Start with the resolution you actually play at",
      },
      {
        type: "p",
        text:
          "Every hardware decision below flows from one question: what resolution and refresh rate do you use? The GPU matters most at 4K, almost not at all as the bottleneck at 1080p with a fast CPU, and refresh rate determines how many frames your hardware needs to push.",
      },
      {
        type: "table",
        head: ["Resolution", "Primary bottleneck", "CPU class", "GPU class"],
        rows: [
          ["1080p", "CPU, then GPU", "Mid-tier", "Entry-mid GPU"],
          ["1440p", "Balanced CPU/GPU", "Mid-tier", "Mid GPU \u2014 where the sweet spot lives"],
          ["4K", "GPU", "Mid-tier (rarely the limit)", "High-end GPU"],
        ],
      },
      {
        type: "callout",
        title: "The 1440p sweet spot",
        text:
          "1440p is where a mid-tier system delivers large visible gains over budget hardware without 4K pricing. For most Kenyan gamers upgrading from 1080p, it is the best value jump.",
      },
      {
        type: "h2",
        id: "buying-in-kenya",
        text: "How to budget in Kenya",
      },
      {
        type: "p",
        text:
          "Local prices for new parts run roughly 20\u201335% above headline USD retail after shipping, import and shop margin, and GPU/CPU prices drop slowly. Rough 2026 guidance in KSh:",
      },
      {
        type: "table",
        head: ["Build tier", "Budget range (KSh)", "Capable of"],
        rows: [
          ["Entry / esports", "60,000 \u2013 90,000", "1080p competitive titles, older AAA at medium"],
          ["Mid / mainstream", "110,000 \u2013 180,000", "1080p high-refresh and strong 1440p"],
          ["Performance", "200,000 \u2013 320,000", "4K and max-settings 1440p"],
          ["High-end", "350,000+", "4K high-refresh, streaming, heavy creator work"],
        ],
      },
      {
        type: "p",
        text:
          "Two cheaper routes: buying used-but-tested GPUs and whole used systems (especially last-year CPU platforms), and buying a prebuilt only when its \u201cextra\u201d components \u2014 PSU, storage, RAM \u2014 are actually good. A custom selection usually beats an off-the-shelf build at the same total.",
      },
      {
        type: "h2",
        id: "what-to-buy",
        text: "Where to spend, and where to save",
      },
      {
        type: "list",
        items: [
          "GPU: the single largest line item at 1440p and 4K. Spend here first.",
          "CPU: mid-tier is enough for gaming; high cores only help if you also stream or edit.",
          "RAM: 16GB minimum, 32GB if you keep a browser, Discord and a game open together.",
          "SSD: always an NVMe SSD for the OS and games \u2014 never a bare HDD in 2026.",
          "PSU: keep 20\u201330% headroom above peak draw and buy a trusted brand; a cheap PSU can take the rest of the system with it.",
        ],
      },
      {
        type: "h2",
        id: "get-a-build",
        text: "Get an actual compatible build",
      },
      {
        type: "p",
        text:
          "Component selection is where most first-time builders go wrong \u2014 an incompatible socket, a board without the right RAM generation, a case too small for the cooler, a PSU that barely covers load. If you\u2019d rather skip the research, a custom build request covers workload, budget and resolution, and returns a compatible parts list with an upgrade path.",
      },
    ],
  },
  {
    slug: "how-much-ram-do-you-need",
    title: "How Much RAM Do You Need? (Gaming, Programming, Editing)",
    description:
      "A practical RAM buying guide: how much memory you actually need for modern gaming, software development, virtual machines and AI workloads \u2014 and when 32GB or 64GB is worth it.",
    cluster: "PC Building",
    readingTime: "6 min read",
    datePublished: "2026-02-02",
    dateModified: "2026-08-20",
    tags: ["RAM", "Memory", "Programming", "Gaming", "Workstations"],
    related: ["gaming-pc-buying-guide-kenya", "how-to-choose-a-psu", "pc-upgrade-guide"],
    cta: {
      title: "Not sure how much RAM your setup needs?",
      text: "Describe what you run and I\u2019ll recommend a capacity and speed that fits your workload and budget.",
      href: "/contact?service=Custom PC Build",
      label: "Get RAM advice",
    },
    blocks: [
      {
        type: "p",
        text:
          "RAM is the component people overpay for or under-purchase almost as often as the PSU. Too little, and the OS starts swapping \u2014 everything stutters even though the CPU and disk are fine. More than you need, and you\u2019ve spent money that would have bought a better GPU.",
      },
      {
        type: "h2",
        id: "baseline",
        text: "The baseline: 16GB in 2026",
      },
      {
        type: "p",
        text:
          "16GB is the sensible floor for a new machine. It runs Windows or Linux, a browser with tabs, office work and a modern game at once. It is also the point where a single memory stick is a mistake \u2014 two matched sticks run in dual-channel and measurably improve frame pacing and compile times.",
      },
      {
        type: "h2",
        id: "workloads",
        text: "What your workload really needs",
      },
      {
        type: "table",
        head: ["Workload", "Recommended", "Why"],
        rows: [
          ["Gaming + browser + Discord", "32GB", "Modern games with background apps exceed 16GB"],
          ["Software development (editor + build + containers)", "32GB", "Docker and dev servers eat RAM quickly"],
          ["Docker/Kubernetes + local databases", "32\u201364GB", "Each container and DB instance reserves memory"],
          ["Virtual machines", "64GB+", "Guests need their own headroom on top of the host"],
          ["Video editing / rendering / 3D", "64GB", "Timelines and previews scale without bound"],
          ["Local AI models / training", "64GB or GPU VRAM", "Models live in VRAM first; system RAM feeds it"],
        ],
      },
      {
        type: "callout",
        title: "Programming: 32GB is the new comfortable",
        text:
          "Editor, language server, bundler, hot-reload dev server, a container or two, and a browser for the app you\u2019re testing \u2014 that\u2019s easily 16\u201320GB on a busy day. Developers ramping up with Docker should go straight to 32GB.",
      },
      {
        type: "h2",
        id: "dont-overbuy",
        text: "Where extra RAM is wasted",
      },
      {
        type: "p",
        text:
          "For pure 1080p gaming with nothing else open, 32GB equals 16GB \u2014 games rarely want more. For most people the difference between 32GB and 64GB shows up only with VMs, local AI, or serious editing. When in doubt, buy the larger number of gigabytes you can afford IF the workload list above matches \u2014 otherwise put the money toward a better GPU.",
      },
      {
        type: "h2",
        id: "speed-and-matching",
        text: "Speed, DDR4 vs DDR5, and matching",
      },
      {
        type: "p",
        text:
          "RAM generation must match your motherboard \u2014 DDR4 and DDR5 are physically incompatible. Enable the memory profile (XMP/EXPO) in BIOS, and buy matched kits: two sticks of the same speed and capacity. Mixing RAM of different speeds makes the whole system run at the slowest stick.",
      },
    ],
  },
  {
    slug: "how-to-choose-a-psu",
    title: "How to Choose a Power Supply (PSU) for Your PC",
    description:
      "The PSU is the most ignored and most expensive-to-fail part of a PC. A practical guide to wattage, headroom, 80 PLUS ratings and brand trust when selecting a power supply.",
    cluster: "PC Building",
    readingTime: "6 min read",
    datePublished: "2026-03-05",
    dateModified: "2026-08-15",
    tags: ["PSU", "Power Supply", "Build Guide", "Components"],
    related: ["gaming-pc-buying-guide-kenya", "how-much-ram-do-you-need", "pc-upgrade-guide"],
    cta: {
      title: "Choosing a PSU is easy to get wrong.",
      text: "Send your build list and I\u2019ll check the power budget and recommend a safe, quality unit.",
      href: "/contact?service=Custom PC Build",
      label: "Check my PSU choice",
    },
    blocks: [
      {
        type: "p",
        text:
          "The power supply is the one component that can damage everything else. An under-sized or low-quality unit under load can cause random shutdowns, corruption, and in the worst cases take a GPU or motherboard with it. It is also the component people choose last and budget first \u2014 backwards.",
      },
      {
        type: "h2",
        id: "how-much-wattage",
        text: "How to estimate wattage",
      },
      {
        type: "p",
        text:
          "Add the CPU and GPU peak power draw, then add roughly 100W for the rest of the system (board, RAM, drives, fans). That\u2019s your load estimate. Add 20\u201330% headroom so the PSU runs at a comfortable efficiency and handles transient GPU spikes. Converters like PC Part Picker show estimated wattage for an entire list \u2014 a useful cross-check.",
      },
      {
        type: "table",
        head: ["Typical setup", "Estimated wattage", "Safe PSU choice"],
        rows: [
          ["1080p mid system (e.g. RTX 4060-class)", "300\u2013350W", "550\u2013650W"],
          ["1440p high-end (e.g. 4070-class)", "400\u2013450W", "650\u2013750W"],
          ["4K flagship GPU", "550W+", "850W"],
          ["Multi-GPU / heavy AI compute", "700W+", "1000W+"],
        ],
      },
      {
        type: "h2",
        id: "ratings",
        text: "What 80 PLUS ratings actually mean",
      },
      {
        type: "p",
        text:
          "80 PLUS \u2014 Bronze, Silver, Gold, Platinum, Titanium \u2014 describes efficiency at given loads, not quality. A good Bronze unit is safer than a cheap Gold unit from an unknown brand. Treat the rating as a guide, and treat brand reputation and model reviews as the real filter. A genuine rating corresponds to third-party verdicts; popular, well-reviewed models from established brands are the safest picks.",
      },
      {
        type: "callout",
        title: "Rule of thumb",
        text:
          "Buy a trusted brand with 20\u201330% headroom, from a model with real reviews. Never reuse an ancient PSU in a new build, and never power a high-end GPU from extra cables that don\u2019t belong to a single unit.",
      },
      {
        type: "h2",
        id: "modular-and-connectors",
        text: "Modular cables and connectors",
      },
      {
        type: "p",
        text:
          "Modular supplies let you attach only the cables you need \u2014 better airflow and much easier builds. Check connectors match your parts: modern GPUs use 12VHPWR/12V-2x6 or two 8-pin PCIe, and your PSU should ship the right ones. If a GPU needs 3 x 8-pin and your unit provides one, that\u2019s a mismatch.",
      },
      {
        type: "h2",
        id: "summary",
        text: "Bottom line",
      },
      {
        type: "list",
        items: [
          "Estimate load, add 20\u201330% headroom, then pick the PSU.",
          "Trust brand and model reviews over the sticker rating.",
          "Match connectors to your GPU and board (ATX 3.x for modern GPUs).",
          "Buy new for new builds \u2014 PSUs age and capacitors degrade.",
        ],
      },
    ],
  },
  {
    slug: "pc-upgrade-guide",
    title: "PC Upgrade Guide: What to Upgrade First",
    description:
      "The order that gives the biggest real-world gains: SSDs, RAM, GPUs and CPUs \u2014 with the diagnostic questions to ask before spending on the wrong part.",
    cluster: "PC Building",
    readingTime: "7 min read",
    datePublished: "2026-04-10",
    dateModified: "2026-09-01",
    tags: ["PC Upgrade", "SSD", "RAM", "GPU", "CPU"],
    related: ["gaming-pc-buying-guide-kenya", "how-much-ram-do-you-need", "how-to-choose-a-psu"],
    cta: {
      title: "Not sure what to upgrade?",
      text: "Describe what your PC does slowly and I\u2019ll tell you which part is the actual bottleneck \u2014 before you spend.",
      href: "/contact?service=PC Upgrade",
      label: "Plan my upgrade",
    },
    blocks: [
      {
        type: "p",
        text:
          "Most upgrade budgets are spent on the wrong part. A CPU purchase won\u2019t fix a system that\u2019s already maxing its RAM, and another 4K GPU won\u2019t help if the old HDD is still the thing loading the game. Upgrades should start from the symptom, not from the part that\u2019s newest.",
      },
      {
        type: "h2",
        id: "symptom-first",
        text: "Diagnose the symptom first",
      },
      {
        type: "table",
        head: ["Symptom", "Likely bottleneck", "Best upgrade"],
        rows: [
          ["Slow boot and app loading", "Storage (HDD or old SATA SSD)", "NVMe SSD"],
          ["Tabs and apps reload constantly", "Too little RAM", "More RAM (or a bigger page file as a stopgap)"],
          ["Low FPS at your resolution", "GPU", "GPU (verify CPU isn\u2019t the cap at 1080p)"],
          ["Stutters in CPU-heavy games / slow builds", "CPU or RAM", "CPU or 32GB RAM \u2014 check usage first"],
          ["Random shutdowns and reboots", "PSU or thermals", "Fix thermals, then check PSU headroom"],
        ],
      },
      {
        type: "callout",
        title: "Check usage before you buy",
        text:
          "Open Task Manager (Windows) or \u2018top\u2019 on Linux while the slow thing happens. If memory is pinned at 95%+, upgrades to anything else won\u2019t fix it. If the GPU sits under 90% while FPS is low and the CPU is maxed, the CPU is the limit.",
      },
      {
        type: "h2",
        id: "order",
        text: "The order that gives the most per shilling",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Move the OS to an NVMe SSD. The single biggest perceived-speed upgrade on an aging machine.",
          "Add RAM to 16GB/32GB depending on workload. Cheap, low-risk, very visible with many apps open.",
          "Upgrade the GPU at your resolution target \u2014 the biggest gaming frame-rate lever.",
          "CPU/motherboard/RAM platform change last \u2014 the most expensive, and only worth it when the CPU is the measured blocker.",
        ],
      },
      {
        type: "h2",
        id: "upgrade-limits",
        text: "Know your platform\u2019s limits",
      },
      {
        type: "p",
        text:
          "Every platform has headroom: how many RAM slots and the max rated speed, whether an older socket supports faster CPUs, and whether the PSU has wattage left for a bigger GPU. A CPU upgrade on an aged socket may not be possible without also changing the motherboard \u2014 budget accordingly before you commit.",
      },
      {
        type: "h2",
        id: "vetting",
        text: "Get the plan vetted",
      },
      {
        type: "p",
        text:
          "If you send your current parts list and the symptom, an upgrade plan can confirm compatibility \u2014 socket, RAM generation, PSU headroom, and case clearance for a new cooler or GPU \u2014 so the upgrade you pay for actually lands the gain you expect.",
      },
    ],
  },
  {
    slug: "it-audit-guide",
    title: "What an IT Infrastructure Audit Actually Covers",
    description:
      "What a serious IT audit checks \u2014 backups, networking, security, access control, monitoring and downtime risk \u2014 and what you should receive afterward.",
    cluster: "IT Infrastructure",
    readingTime: "6 min read",
    datePublished: "2026-05-01",
    dateModified: "2026-09-05",
    tags: ["IT Audit", "Backups", "Networking", "Security", "Business"],
    related: ["does-my-business-need-docker", "where-to-start-with-business-automation"],
    cta: {
      title: "Want a real assessment of your infrastructure?",
      text: "The audit looks at backups, networking, security, access control, monitoring and downtime risk \u2014 and returns a prioritized remediation plan.",
      href: "/contact?service=IT Audit",
      label: "Request an IT audit",
    },
    blocks: [
      {
        type: "p",
        text:
          "An IT audit is not a vendor demo and it\u2019s not a scan that prints ten pages of generic findings. It\u2019s a working assessment of the systems that keep your business running, written for the person who has to act on it. Most importantly, it answers one question first: what happens if something breaks today?",
      },
      {
        type: "h2",
        id: "what-is-checked",
        text: "The core areas a serious audit checks",
      },
      {
        type: "list",
        items: [
          "Backups: what actually backs up, how often, where, and \u2014 critically \u2014 how would you restore, and when was that last tested?",
          "Networking: routing, switching, Wi-Fi coverage, cabling, and what happens when the main internet link dies.",
          "Security: exposed services, default credentials, patching status, firewall rules and endpoint protection.",
          "Access control: who can reach what, whether offboarded people still have credentials, and how passwords are handled.",
          "Monitoring: whether failures are detected by systems or by staff reporting them.",
          "Downtime risk: single points of failure ranked by how each would hit the business.",
        ],
      },
      {
        type: "callout",
        title: "The backup test",
        text:
          "The most common audit finding isn\u2019t \u201cyou have no backups\u201d \u2014 it\u2019s \u201cyou have backups that have never been restored.\u201d An untested backup is a hope, not a strategy.",
      },
      {
        type: "h2",
        id: "walkthrough",
        text: "How the audit runs",
      },
      {
        type: "p",
        text:
          "The audit works through the environment: inventory of hardware and software, interviews with the people who operate it, live checks of backup jobs, network config, access lists and monitoring, and a walkthrough of what happens during an incident. Findings are ranked by risk and cost to fix \u2014 not by how scary they sound.",
      },
      {
        type: "h2",
        id: "deliverables",
        text: "What you receive",
      },
      {
        type: "list",
        items: [
          "A prioritized findings list \u2014 what\u2019s urgent, what can wait, what\u2019s worth doing now.",
          "A clear picture of your current runtime risk and the cost to close it.",
          "A practical remediation plan sized for a small or mid-size business \u2014 no enterprise-software-shaped recommendations.",
          "A follow-up path: fixes, ongoing support, or a re-audit.",
        ],
      },
      {
        type: "h2",
        id: "is-it-worth-it",
        text: "Who is this for",
      },
      {
        type: "p",
        text:
          "Schools, clinics, offices and growing companies whose operations stop when the internet drops or a server fails. If a day of downtime costs your organisation more than KSh 15,000, an audit \u2014 and the fixes it produces \u2014 pays for itself many times over.",
      },
    ],
  },
  {
    slug: "when-should-a-business-build-an-erp",
    title: "When Should Your Business Build an ERP?",
    description:
      "How to know your spreadsheets and disconnected tools have become the bottleneck \u2014 and when a custom business system starts paying for itself.",
    cluster: "Software Engineering",
    readingTime: "7 min read",
    datePublished: "2026-06-12",
    dateModified: "2026-09-08",
    tags: ["ERP", "Business Systems", "Software", "Process"],
    related: ["where-to-start-with-business-automation", "it-audit-guide"],
    cta: {
      title: "Need a system like this for your organisation?",
      text: "The school ERP case study shows a full build from requirements to deployment \u2014 records, attendance, finance and communication in one place.",
      href: "/case-studies/school-erp",
      label: "See the ERP case study",
    },
    blocks: [
      {
        type: "p",
        text:
          "\u201CERP\u201D sounds like enterprise software costing millions. For a school, clinic or growing business it usually starts smaller: you have operations that run on separate spreadsheets, group chats and paper, and someone \u2014 usually the operations lead \u2014 is doing the integration work by hand every day. That manual work is what you\u2019re already paying for; it just isn\u2019t on an invoice.",
      },
      {
        type: "h2",
        id: "signals",
        text: "Signals that you\u2019ve outgrown the tools",
      },
      {
        type: "list",
        items: [
          "The same record is typed into three different places, and the versions disagree.",
          "\u201CYou\u2019ll hear from the admin\u201D is a daily phrase \u2014 updates move by chasing people.",
          "Monthly reports take days to assemble from exports and emails.",
          "Finance is reconciled by hand from exports nobody fully trusts.",
          "New staff need weeks to learn where information actually lives.",
        ],
      },
      {
        type: "callout",
        title: "The real cost",
        text:
          "The business case for an ERP isn\u2019t buying software \u2014 it\u2019s stopping the manual integration work, the errors it causes, and the decisions made on stale data.",
      },
      {
        type: "h2",
        id: "when-not-yet",
        text: "When it\u2019s not yet time",
      },
      {
        type: "p",
        text:
          "If the whole operation fits in two spreadsheets and one person, an ERP is overhead \u2014 automation of a single task is cheaper. The line is crossed when multiple people must work the same records and the process of reconciling them is itself a job.",
      },
      {
        type: "h2",
        id: "what-good-looks-like",
        text: "What a good outcome looks like",
      },
      {
        type: "list",
        items: [
          "One record per entity \u2014 student, customer, item \u2014 used by every department.",
          "Modules that exist because the business uses them, not because a vendor sells them.",
          "Notifications that actually reach people \u2014 confirmed delivery, not a sent flag.",
          "Reporting you trust, produced while the month is happening, not after.",
          "A system the staff want to use because it removes work, not adds it.",
        ],
      },
      {
        type: "h2",
        id: "build-vs-buy",
        text: "Custom build vs buying off-the-shelf",
      },
      {
        type: "p",
        text:
          "Off-the-shelf ERP wins when your processes already match the vendor\u2019s defaults and the licence fits. A custom build wins when the org\u2019s differences are what generate value \u2014 unusual workflows, existing institutional practices, or integration needs the shelf product can\u2019t reach. The school ERP was custom because the workflows \u2014 attendance, billing, parent communication \u2014 were specific to how that institution runs.",
      },
    ],
  },
  {
    slug: "where-to-start-with-business-automation",
    title: "Where to Start With Business Automation",
    description:
      "A practical method for finding automation that pays: pick a bounded, repetitive process, measure the hours it eats, and automate it \u2014 not everything at once.",
    cluster: "AI & Automation",
    readingTime: "6 min read",
    datePublished: "2026-07-03",
    dateModified: "2026-09-02",
    tags: ["Automation", "AI", "Business Process", "ROI"],
    related: ["when-should-a-business-build-an-erp", "it-audit-guide"],
    cta: {
      title: "Have a repetitive process worth automating?",
      text: "Tell me the task, how often it runs, and who does it \u2014 I\u2019ll tell you honestly whether automation is worth it.",
      href: "/contact?service=AI & Automation",
      label: "Scope an automation",
    },
    blocks: [
      {
        type: "p",
        text:
          "The usual way business automation starts is backwards: buy a tool, then go looking for a problem. The useful way is to find a task that is (a) repetitive, (b) rule-based, (c) high-volume, and then automate exactly that \u2014 end to end, with documentation.",
      },
      {
        type: "h2",
        id: "what-to-automate",
        text: "Find the task that qualifies",
      },
      {
        type: "list",
        items: [
          "Runs on a fixed schedule (daily report, weekly reconciliation, monthly reminder).",
          "Has clear rules a checklist can describe \u2014 \u201Cif X, then Y\u201D.",
          "Involves moving data between tools \u2014 spreadsheet to system, email to record.",
          "Takes someone 30+ minutes a week, every week, year-round.",
          "Is painful enough that one person mentally owns it and nobody else can do it.",
        ],
      },
      {
        type: "callout",
        title: "Hours are the currency",
        text:
          "A task eating 2 hours a week is 100 hours a year. If you automate 80% of it, that is a full two-plus working weeks back \u2014 every year, from one bounded project.",
      },
      {
        type: "h2",
        id: "measure-first",
        text: "Measure before you build",
      },
      {
        type: "p",
        text:
          "Time the task for a week. Count the steps, the tools it touches, and the error rate when a human does it. The measurement decides the project\u2019s shape: a document-processing task and a spreadsheet-reconciliation task need completely different automation, and the measurement tells you which one you\u2019re on.",
      },
      {
        type: "h2",
        id: "start-bounded",
        text: "Start bounded, deliver working",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Pick one task \u2014 not a department, not \u201Cdigitisation\u201D.",
          "Define the input, the rules, and the output you can verify.",
          "Build the narrow version first \u2014 handle the main path correctly before the edge cases.",
          "Run it alongside the human process until results match.",
          "Hand it over with documentation: what it does, how to check it, who to call when it\u2019s wrong.",
        ],
      },
      {
        type: "h2",
        id: "ai-role",
        text: "Where AI actually fits",
      },
      {
        type: "p",
        text:
          "AI earns its place in the parts that are \u201Cjudgement-ish but boring\u201D: extracting fields from documents, summarising, classifying, drafting a consistent reply. Rule-based scripting should handle the parts that are deterministic. A good automation design decides that split explicitly \u2014 and keeps the parts that must be exact away from the parts that can be probabilistic.",
      },
      {
        type: "h2",
        id: "when-not-to",
        text: "When not to automate",
      },
      {
        type: "p",
        text:
          "If the task runs once a month, if the rules change every week, or if the output quality is unverifiable \u2014 fix the process first, automate later. Automation of a broken process just produces the broken result faster.",
      },
    ],
  },
  {
    slug: "does-my-business-need-docker",
    title: "Should My Business Use Docker? (A Practical Check)",
    description:
      "What containers actually solve for a small or mid-size business \u2014 repeatable deployments, clean environments, testable recovery \u2014 and when they\u2019re not worth the complexity.",
    cluster: "IT Infrastructure",
    readingTime: "6 min read",
    datePublished: "2026-08-01",
    dateModified: "2026-09-06",
    tags: ["Docker", "Containers", "DevOps", "Business IT"],
    related: ["it-audit-guide", "when-should-a-business-build-an-erp"],
    cta: {
      title: "Want a real answer for your environment?",
      text: "An infrastructure review looks at how your apps run today and whether containerising changes the risk, cost and reliability honestly.",
      href: "/contact?service=IT Consulting",
      label: "Review my infrastructure",
    },
    blocks: [
      {
        type: "p",
        text:
          "Docker is the tool people adopt because it\u2019s popular, then quietly regret because installing it was easier than operating it properly. For a small or mid-size business the honest question isn\u2019t \u201Cis Docker good?\u201D \u2014 it\u2019s \u201Cwhat problem are we trying to solve, and does containerisation solve it?\u201D",
      },
      {
        type: "h2",
        id: "what-containers-solve",
        text: "Containerisation genuinely solves",
      },
      {
        type: "list",
        items: [
          "Repeatable deployments \u2014 the same image runs identically on any host, ending \u201Cit works on my machine\u201D.",
          "Clean environments \u2014 dependencies live inside the image, not installed by memory on a server.",
          "Rollback \u2014 revert to a previous image instead of un-doing half-applied changes.",
          "Testable recovery \u2014 recreate a service from a file, not from tribal knowledge.",
          "Isolation \u2014 a badly-behaved service doesn\u2019t dirty the whole server.",
        ],
      },
      {
        type: "callout",
        title: "The real adoption driver",
        text:
          "If deploying a change is risky because nobody can reproduce the setup, containers buy back that safety. If deployments already work fine and nothing breaks, Docker is mostly added complexity.",
      },
      {
        type: "h2",
        id: "when-skip",
        text: "When it\u2019s not worth it",
      },
      {
        type: "list",
        items: [
          "One or two static apps that deploy without pain today.",
          "No one to operate the platform \u2014 containers still need patching, backups and monitoring.",
          "The bottleneck is business process, not software delivery.",
        ],
      },
      {
        type: "h2",
        id: "realistic-picture",
        text: "The honest operating cost",
      },
      {
        type: "p",
        text:
          "Docker removes server-manual-labour but creates its own duties: keeping images patched, managing volumes and backups of container data, and watching disk growth. In a business with in-house IT, the tool only pays if someone owns those duties. That\u2019s equally true of Docker, Kubernetes, and every thing in between \u2014 the discipline matters more than the logo.",
      },
      {
        type: "h2",
        id: "decision",
        text: "A quick decision check",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Do deployments feel risky or routine today?",
          "Can anyone with the docs recreate a service from scratch?",
          "Is there an owner for patching, backups and monitoring either way?",
          "Would a rollback be fast if a release went wrong?",
        ],
      },
      {
        type: "p",
        text:
          "Three \u201Cyes\u201D answers to the routine/recovery questions means containerising likely pays. If the honest answer is \u201Cwe\u2019re not sure how our systems are deployed at all,\u201D that\u2019s an audit question, not a Docker question.",
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function guidesByCluster(cluster: Guide["cluster"] | "All"): Guide[] {
  if (cluster === "All") return guides;
  return guides.filter((g) => g.cluster === cluster);
}

export function relatedGuides(slugs: string[]): Guide[] {
  return slugs
    .map((s) => getGuide(s))
    .filter((g): g is Guide => Boolean(g));
}