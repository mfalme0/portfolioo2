import React from "react";
import type { PcPageConfig } from "@/app/Components/site/pc-page";

export const pcPages: Record<string, PcPageConfig> = {
  "/pc-building": {
    eyebrow: "Custom PC Building",
    title: (
      <>
        PCs designed around <span style={{ color: "var(--flag)" }}>what you actually do.</span>
      </>
    ),
    lead: "Gaming rigs, developer and AI workstations, content creation machines and business desktops — specced for the workload, built and stress-tested in Nairobi. Not whatever parts happen to be in stock.",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Custom PC Building" },
    ],
    problem: {
      title: "Off-the-shelf builds pair the wrong parts.",
      text: "A prebuilt advertises the GPU and hides everything else: a barely-adequate PSU, slow storage, a motherboard with no upgrade path, cooling that can't handle the load. Every build deserves to be designed backwards from the workload — not forwards from the sticker.",
    },
    customHeading: (
      <>
        Workload first, <span style={{ color: "var(--flag)" }}>then parts.</span>
      </>
    ),
    specs: [
      { label: "Gaming PCs", detail: "1080p, 1440p, high-refresh and 4K — plus esports and streaming rigs, tuned to the resolution you play." },
      { label: "Developer & AI workstations", detail: "Docker, Kubernetes, VMs and local LLMs with the RAM, cores and GPU memory those workloads actually consume." },
      { label: "Content creation", detail: "Video editing, 3D, rendering and design machines where cores and memory matter more than max FPS." },
      { label: "Business workstations", detail: "Reliable, quiet, supportable desktops for CAD, data analysis and heavy productivity — with backup plans." },
      { label: "Upgrades & troubleshooting", detail: "SSDs, RAM, GPU and CPU upgrades planned around measured bottlenecks, plus diagnosis of what's actually wrong." },
      { label: "Component selection only", detail: "Don't need a build service? Get a compatible parts list, an upgrade path and peace of mind for a set fee." },
    ],
    useProcess: true,
    faqs: [
      { q: "How much does a custom build cost in Kenya?", a: "Every build is quoted after the use case and budget are known — there's no honest generic price list. The PC build tool walks through use, resolution and budget, and a custom build request returns a compatible parts plan." },
      { q: "Do I buy the parts, or do you?", a: "Either. You can purchase parts yourself from a list I provide, or arrange procurement through local suppliers. The component pricing guide covers how to read Kenyan prices." },
      { q: "Do you test the build before delivery?", a: "Yes — CPU, GPU, memory and storage are stress-tested under load, thermals are verified, and the OS, drivers and firmware are configured before handover, with documentation." },
      { q: "Can you build for a specific budget?", a: "That's the normal starting point. Budgets get split honestly across components — the GPU isn't always the right place to spend, and I'll say so." },
      { q: "Which areas do you cover?", a: "Builds are delivered around Nairobi and surrounding areas — Kiambu, Kikuyu, Limuru, Ruaka, Westlands, Karen, Kilimani, Ruiru, Thika." },
    ],
    ctaTitle: "Your next PC should be specced for your work — not for the shop.",
    ctaText: "Tell me what you run, play or produce, and your budget. You get a compatible parts plan or a built-and-tested machine.",
    ctaLabel: "Request a custom build",
    ctaHref: "/contact?service=Custom PC Build",
    waKey: "hardware",
  },

  "/gaming-pcs": {
    eyebrow: "Gaming PCs",
    title: (
      <>
        Gaming rigs built to hit the <span style={{ color: "var(--flag)" }}>frame-rate you paid for.</span>
      </>
    ),
    lead: "1080p, 1440p, high-refresh, 4K, esports and streaming — builds tuned to a resolution and target, with a PSU and cooling that survive the load.",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "PC Building", path: "/pc-building" },
      { name: "Gaming PCs" },
    ],
    problem: {
      title: "Most gaming builds get two things wrong.",
      text: "The first is resolution neglect — a GPU that sits half-idle because the CPU became the wall at 1080p, or a 4K GPU inside a system that can't feed it. The second is the invisible parts: a PSU with no headroom and cooling that throttles the exact moments the game demands performance.",
    },
    customHeading: (
      <>
        Tuned to a resolution <span style={{ color: "var(--flag)" }}>and refresh target.</span>
      </>
    ),
    specs: [
      { label: "1080p competitive", detail: "High-refresh esports builds where a fast CPU and tight latency beat raw GPU size." },
      { label: "1440p sweet spot", detail: "The value band — a mid-tier GPU-strong system where the biggest visible gains live." },
      { label: "4K and high-refresh", detail: "High-end GPU builds with the PSU, cooling and case airflow that flagship parts need." },
      { label: "Streaming rigs", detail: "Nvidia NVENC or a CPU with the cores to game and stream without dropped frames." },
      { label: "Silence-oriented", detail: "Quiet builds for living rooms and shared spaces — cooling, not just fans." },
      { label: "Upgrade paths", detail: "A motherboard, PSU and case chosen so the next GPU upgrade doesn't mean a rebuild." },
    ],
    faqs: [
      { q: "How many FPS will I get?", a: "Honest expectations come before the build: based on the games, resolution and settings you name, I'll state the realistic frame range and where it varies — not a screenshot-perfect number." },
      { q: "AMD or NVIDIA?", a: "Whichever fits the games and features you use — and the local price. The choice is workload-driven, and different cards lead at different resolutions." },
      { q: "Can it double as a workstation?", a: "Yes — many retail rigs are built for gaming plus streaming or editing from day one, which only changes the CPU and RAM choices." },
      { q: "Is a gaming PC worth it over a console in Kenya?", a: "Different value: a PC adds productivity, streaming and an upgrade path a console lacks, at a higher entry price. The honest trade-off is part of the consultation." },
    ],
    ctaTitle: "A gaming PC is a few key decisions, made once.",
    ctaText: "Games, resolution and budget in — a compatible, tested build out. It's the difference between a build and a build done right.",
    ctaLabel: "Build a gaming PC",
    ctaHref: "/contact?service=Custom PC Build",
    waKey: "gaming",
  },

  "/workstations": {
    eyebrow: "Developer & AI Workstations",
    title: (
      <>
        Workstations that don&apos;t <span style={{ color: "var(--flag)" }}>become the bottleneck.</span>
      </>
    ),
    lead: "Rigged for software development, Docker and Kubernetes, virtual machines, local LLMs and GPU compute — where RAM, cores and storage throughput decide whether work waits on the machine.",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "PC Building", path: "/pc-building" },
      { name: "Developer & AI Workstations" },
    ],
    problem: {
      title: "The machine is the cheapest colleague you can upgrade.",
      text: "A developer waiting on builds, containers and VMs is paid to think, and the machine eats that time. Compilation minutes, container churn, model loading — every wait is measurable money. Workstations are an investment decision, not a purchase.",
    },
    customHeading: (
      <>
        Where the time actually <span style={{ color: "var(--flag)" }}>goes missing.</span>
      </>
    ),
    specs: [
      { label: "Software development", detail: "32GB+ RAM, fast NVMe and a CPU that makes long builds short — editors and IDE background work included." },
      { label: "Docker / Kubernetes", detail: "Enough RAM and storage headroom that containers stop being the reason things feel slow." },
      { label: "Virtual machines", detail: "64GB+ platforms where guests get their own headroom without starving the host." },
      { label: "Local AI / LLMs", detail: "GPU VRAM that fits the models you run, with the system RAM to feed them — spec decided by model size." },
      { label: "Multi-monitor", detail: "GPU and port planning for the actual display setup you work across." },
      { label: "Production environment", detail: "OS, tools, virtualization and monitoring tuned as a working system — not a bare parts box." },
    ],
    faqs: [
      { q: "I already have a laptop. Is a workstation worth it?", a: "If builds, containers or models regularly stall the laptop, the workstation pays for itself in recovered time — and the laptop keeps its role for anywhere-work." },
      { q: "How much RAM do I really need?", a: "The RAM guide has the exact breakdown: 32GB for development with Docker, 64GB+ for VMs, and VRAM-first for local AI. In practice the machine decides its own requirement." },
      { q: "Linux or Windows?", a: "Either, and the environment is set up as part of the build when wanted. Development, containers and monitoring behave differently on each — the setup follows your stack." },
      { q: "Can a workstation double as a gaming PC?", a: "Usually yes with the right GPU choice, but a true workstation optimization (ECC, big RAM, workstation GPU) has different priorities. The trade-offs get laid out before spending." },
    ],
    ctaTitle: "Time waiting on a machine is time nobody invoices.",
    ctaText: "A workstation is specced from your stack and your workload — builds, containers, VMs, models — not from a price list.",
    ctaLabel: "Build a workstation",
    ctaHref: "/contact?service=Custom PC Build",
    waKey: "workstation",
  },

  "/pc-upgrades": {
    eyebrow: "PC Upgrades",
    title: (
      <>
        Upgrades that fix the <span style={{ color: "var(--flag)" }}>measured bottleneck.</span>
      </>
    ),
    lead: "SSD, RAM, GPU and CPU upgrades planned around what's actually slow — diagnosed first, so you never buy the wrong part. Builds and upgrades across Nairobi.",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "PC Building", path: "/pc-building" },
      { name: "PC Upgrades" },
    ],
    problem: {
      title: "Most upgrade budgets go to the newest part, not the wrong part.",
      text: "The CPU isn't slow, the disk is. The GPU isn't capped, the RAM is. Without measuring, 'upgrading' the headline component leaves the machine exactly as slow as before — just with a newer sticker inside.",
    },
    customHeading: (
      <>
        Symptom in, <span style={{ color: "var(--flag)" }}>right part out.</span>
      </>
    ),
    specs: [
      { label: "Storage", detail: "OS to NVMe — the single biggest perceived-speed upgrade on an aging machine." },
      { label: "RAM", detail: "Dual-channel capacity matched to the workload, with the memory profile enabled properly." },
      { label: "GPU", detail: "Upgraded at your resolution target, with PSU headroom and case clearance verified first." },
      { label: "CPU & platform", detail: "The expensive step — confirmed only when the CPU is the measured blocker, never guessed." },
      { label: "Cooling & PSU", detail: "Thermal and power checked before new performance parts get installed." },
      { label: "Diagnosis first", detail: "Task Manager, top, stress and thermal tests — the bottleneck is named before anything is ordered." },
    ],
    faqs: [
      { q: "How do I know what to upgrade?", a: "Start from the symptom, not the part: slow boot and loading means storage; tab reloading means RAM; low FPS means GPU. The upgrade guide has the full symptom table." },
      { q: "Can you install the upgrade for me?", a: "Yes — in-person installation around Nairobi, including BIOS and driver configuration and a stress test afterward." },
      { q: "Will an upgrade void my warranty?", a: "For prebuilds, some upgrades do. That's part of the consultation — we check the warranty position before touching anything." },
      { q: "Is upgrading worth it versus buying new?", a: "For storage and RAM, almost always. For a CPU platform change, sometimes not. The honest comparison is priced before you commit." },
    ],
    ctaTitle: "Your PC is telling you what's wrong.",
    ctaText: "Describe the symptom and the machine — you'll get the bottleneck and the right upgrade, before spending anything.",
    ctaLabel: "Plan my upgrade",
    ctaHref: "/contact?service=PC Upgrade",
    waKey: "upgrade",
  },

  "/pc-troubleshooting": {
    eyebrow: "PC Troubleshooting",
    title: (
      <>
        Crashes, noise, heat — <span style={{ color: "var(--flag)" }}>diagnosed, not guessed.</span>
      </>
    ),
    lead: "Diagnosis and repair for crashes, overheating, boot failures, strange noise, slow performance and hardware faults — in Nairobi and surrounding areas.",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "PC Building", path: "/pc-building" },
      { name: "PC Troubleshooting" },
    ],
    problem: {
      title: "Random problems have systematic causes — but only if you look.",
      text: "A crash 'out of nowhere', a fan that screams, a PC that boots only on the third attempt — six months of symptoms, one root cause underneath. Without a diagnosis, fixes treat the symptom and the machine keeps failing in new places.",
    },
    customHeading: (
      <>
        A method, <span style={{ color: "var(--flag)" }}>not a shotgun.</span>
      </>
    ),
    specs: [
      { label: "Crash & reboot loops", detail: "Event logs, memory tests and power checks — random resets traced to their source." },
      { label: "Overheating & noise", detail: "Thermal readings, dust, fan curves and paste — heat found and removed at the source." },
      { label: "Boot failures", detail: "POST behavior, drives, EFI and recovery paths — diagnosed from the exact failure stage." },
      { label: "Slow performance", detail: "Measured bottlenecks named with data, not felt out — the same method as upgrades." },
      { label: "Hardware faults", detail: "RAM, GPU, storage and PSU faults isolated with tests, not swapped one-by-one." },
      { label: "Post-fix verification", detail: "Stress tests and monitoring after every fix, so the problem is proven gone." },
    ],
    faqs: [
      { q: "Do I need to bring the PC in?", a: "For most issues a remote diagnosis comes first — logs, measurements and guided checks over a call. Physical work happens in person around Nairobi, or at your location for covered areas." },
      { q: "What if you can't fix it?", a: "You get a written diagnosis of what's wrong and the cost to fix it. If it's not worth fixing, that's the honest recommendation — no parts swapped on hope." },
      { q: "How much does troubleshooting cost?", a: "Scoped per diagnosis — the free conversation settles the flow, and the diagnosis fee is confirmed before work starts. It's credited if you proceed to the repair." },
      { q: "Can you recover data from a failing machine?", a: "Data recovery depends on the failure. If the drive is still readable, recovery is part of the diagnosis — before any repair that could put data at risk." },
    ],
    ctaTitle: "Six months of symptoms is one root cause.",
    ctaText: "Describe what the machine does and when — a diagnosis finds the source before anything expensive gets swapped.",
    ctaLabel: "Diagnose a problem",
    ctaHref: "/contact?service=PC Troubleshooting",
    waKey: "fix",
  },

  "/pc-consulting": {
    eyebrow: "PC Consulting",
    title: (
      <>
        Component advice you can <span style={{ color: "var(--flag)" }}>buy on.</span>
      </>
    ),
    lead: "Buying a prebuilt? Building it yourself? Not sure between two GPUs, a CPU platform or a RAM kit? Get a compatibility check and a straight recommendation before the money moves.",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "PC Building", path: "/pc-building" },
      { name: "PC Consulting" },
    ],
    problem: {
      title: "The internet is full of confident, conflicting advice.",
      text: "A compatible-sounding list that isn't compatible. A 'great deal' that quietly pairs a weak CPU with a strong GPU. A PSU that technically fits and doesn't have the connectors. The research is free and endless — the mistakes are paid for in the shop.",
    },
    customHeading: (
      <>
        A second pair of eyes <span style={{ color: "var(--flag)" }}>before you commit.</span>
      </>
    ),
    specs: [
      { label: "Build list review", detail: "Compatibility, PSU headroom, memory generation, case clearance — verified for the list you're about to buy." },
      { label: "Prebuilt evaluation", detail: "Is the prebuilt actually worth it? The GPU headline checked against the PSU, storage, board and RAM behind it." },
      { label: "Direct comparison", detail: "Two GPUs, two platforms, two RAM kits — a straight recommendation with the reasoning." },
      { label: "Budget allocation", detail: "Where the shillings actually land gains: the honest split for your games and workload." },
      { label: "Upgrade-path planning", detail: "A build chosen today that keeps the next two upgrades cheap and painless." },
      { label: "Kenyan pricing sanity", detail: "Guidance shaped around local availability and prices, not US retail assumptions." },
    ],
    faqs: [
      { q: "How is this different from the build service?", a: "Advice only — no assembly. You keep the buying, building or fitting entirely to yourself, with the confidence that the plan is sound." },
      { q: "Can you review a parts list I already have?", a: "Yes — that's the most common request. Send the list and the use case, and get a compatibility and value verdict back." },
      { q: "Do you recommend specific shops?", a: "I recommend what to buy, not where — but guidance on reading Kenyan prices and dodging the classic traps is part of the consult." },
      { q: "What does it cost?", a: "Scoped by the size of the review. A single parts-list check is fixed-fee and confirmed before you pay." },
    ],
    ctaTitle: "The research is free. The mistakes aren't.",
    ctaText: "Send the list or the prebuilt link and the use case — the verdict comes back before your money does.",
    ctaLabel: "Get advice",
    ctaHref: "/contact?service=PC Upgrade",
    waKey: "hardware",
  },
};