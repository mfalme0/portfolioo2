import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta, webPageJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { siteConfig, whatsappLink, mailtoLink } from "@/lib/site-config";
import { pillars, pcServices, areasServed } from "@/lib/services";
import { caseStudies } from "@/lib/case-studies";
import { guides } from "@/lib/guides";
import { whatsappCtaMessage } from "@/lib/cta-messages";
import { SectionHeading } from "@/app/Components/site/section-heading";
import { CtaLink, CtaAnchor } from "@/app/Components/site/buttons";
import { StackDiagram } from "@/app/Components/site/stack-diagram";
import { PillarCard, PcServiceCard, CaseStudyCard, GuideCard, MetricCard } from "@/app/Components/site/cards";
import { CtaBand } from "@/app/Components/site/cta-band";
import { Faq } from "@/app/Components/site/faq";
import { FiArrowUpRight, FiCpu, FiServer, FiLayers, FiTerminal, FiWatch } from "react-icons/fi";

export const metadata: Metadata = {
  ...pageMeta({
    title: "PC Building in Nairobi, Kenya | Custom PCs & Software Services — Joseph Gitau Chege",
    description:
      "Custom PC building, gaming & developer workstations in Nairobi, plus custom software, IT consulting, cloud & DevOps, AI automation and technical leadership for Kenyan businesses. Quality guaranteed.",
    path: "/",
    keywords: [
      "software engineer Nairobi",
      "IT consulting Kenya",
      "custom PC builder Nairobi",
      "gaming PC Kenya",
      "developers workstation Kenya",
      "AI automation Kenya",
      "fractional CTO",
      "infrastructure audit Kenya",
      "Joseph Gitau Chege",
    ],
  }),
  title: { absolute: "PC Building in Nairobi, Kenya | Custom PCs & Software Services — Joseph Gitau Chege" },
};

const stackSkills = [
  { group: "Languages", items: ["C#", "Python", "TypeScript", "C++", "Bash", "Kotlin"] },
  { group: "Backend & Data", items: ["PostgreSQL", "MySQL", "MongoDB", "API development", "Schema design"] },
  { group: "Cloud & DevOps", items: ["Azure", "Docker", "Kubernetes", "CI/CD", "Proxmox"] },
  { group: "Reliability", items: ["Linux", "Monitoring", "Incident response", "High availability"] },
  { group: "Networking & Hardware", items: ["LAN/WAN", "VLAN", "Firewalls", "Server hardware"] },
];

const abilityRows = [
  {
    icon: <FiTerminal />,
    label: "Software",
    title: "Business systems, not demos.",
    text: "ERPs, portals, dashboards, APIs and integrations built around how your organisation actually works.",
    href: "/software-engineering",
    cta: "Software Engineering",
  },
  {
    icon: <FiServer />,
    label: "IT & Infrastructure",
    title: "Assessments, planning and ops.",
    text: "Infrastructure audits, Linux servers, networking, backups, monitoring, cloud cost control and cybersecurity planning.",
    href: "/it-consulting",
    cta: "IT Consulting & Audits",
  },
  {
    icon: <FiCpu />,
    label: "AI & Automation",
    title: "Automation that removes work.",
    text: "Workflow automation, document processing, internal assistants and AI-enabled applications tied to a business result.",
    href: "/ai-automation",
    cta: "AI & Automation",
  },
  {
    icon: <FiLayers />,
    label: "Hardware",
    title: "PCs designed around your work.",
    text: "Gaming PCs, developer and AI workstations, upgrades and troubleshooting — specced for the workload, built and tested in Nairobi.",
    href: "/pc-building",
    cta: "Custom PC Building",
  },
  {
    icon: <FiWatch />,
    label: "Technical Leadership",
    title: "Architecture and oversight.",
    text: "Fractional CTO, technology strategy, architecture reviews and technical project oversight without a full-time hire.",
    href: "/technical-leadership",
    cta: "Technical Leadership",
  },
];

const homeFaqs = [
  {
    q: "Where is Joseph based and where does he work?",
    a: "Based in Nairobi, Kenya, serving Nairobi and surrounding areas (Kiambu, Kikuyu, Limuru, Ruaka, Westlands, Karen, Kilimani, Ruiru, Thika). Software and infrastructure work is delivered remotely or on-site depending on the project.",
  },
  {
    q: "What does custom PC building cost in Kenya?",
    a: "Every build starts at a different place because every workload is different. Pricing is quoted per build after the use case and budget are known — no generic price list.",
  },
  {
    q: "Can Joseph help my business beyond software?",
    a: "Yes — the services span software, IT infrastructure, AI automation, hardware and technical leadership, so the same person can own a system from the physical network to the application layer.",
  },
  {
    q: "How quickly can we start?",
    a: "The first conversation is free. After that, small audit and automation work can start within a week; larger software and infrastructure projects get a scoped plan with clear timelines.",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPageJsonLd("/", "PC Building in Nairobi, Kenya | Custom PCs & Software Services — Joseph Gitau Chege", metadata.description ?? ""),
            breadcrumbJsonLd([{ name: "Home", path: "/" }]),
            faqJsonLd(homeFaqs),
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "@id": siteConfig.url,
              name: siteConfig.name,
              description: siteConfig.positioning,
              url: siteConfig.url,
              image: `${siteConfig.url}/opengraph-image.png`,
              telephone: siteConfig.phoneRaw,
              email: siteConfig.email,
              priceRange: "KSh 15,000 - KSh 100,000",
              currenciesAccepted: "KES",
              paymentAccepted: "Cash, M-Pesa, Bank Transfer",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Nairobi",
                addressRegion: "Nairobi County",
                addressCountry: "KE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -1.2921,
                longitude: 36.8219,
              },
              areaServed: siteConfig.areas,
              openingHours: "Mo-Sa 09:00-18:00",
              founder: {
                "@type": "Person",
                name: siteConfig.name,
                url: `${siteConfig.url}/about`,
              },
              sameAs: [
                siteConfig.socials.github,
                siteConfig.socials.linkedin,
                siteConfig.socials.x,
                siteConfig.socials.instagram,
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: siteConfig.phoneRaw,
                contactType: "sales",
                areaServed: "KE",
                availableLanguage: ["en", "sw"],
              },
            },
          ]),
        }}
      />

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative w-full min-h-[92vh] flex flex-col overflow-hidden section-grid" style={{ backgroundColor: "var(--paper)" }}>
        <div className="absolute inset-y-0 left-6 md:left-14 w-px pointer-events-none" style={{ background: "color-mix(in srgb, var(--ink) 8%, transparent)" }} />
        <div className="absolute inset-y-0 right-6 md:right-14 w-px pointer-events-none" style={{ background: "color-mix(in srgb, var(--ink) 8%, transparent)" }} />
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[52px] border-l-[52px] border-t-(--color-flag) border-l-transparent" style={{ borderTopWidth: 52, borderLeftWidth: 52 }} />
        <div className="absolute -top-1/3 right-[-8%] h-[80vh] w-[55vw] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, color-mix(in srgb, var(--flag) 9%, transparent) 0%, transparent 70%)" }} />

        <div className="relative z-10 flex-1 flex items-center mx-auto max-w-7xl w-full px-6 md:px-14 py-32 md:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--flag)" }} />
                <span className="text-[10px] font-semibold tracking-[0.22em] uppercase font-mono" style={{ color: "var(--gravel)" }}>
                  Field Report &middot; 2026 &middot; Nairobi, Kenya
                </span>
              </div>
              <h1 className="text-[clamp(2.6rem,7.5vw,5.6rem)] leading-[0.98] tracking-[-0.02em] font-display" style={{ color: "var(--fg)" }}>
                I build technology from the{" "}
                <span className="font-display-italic" style={{ color: "var(--flag)" }}>
                  hardware up.
                  <span className="block -mt-1 h-[4px] md:h-[5px]" style={{ background: "repeating-linear-gradient(90deg, var(--flag) 0 6px, transparent 6px 12px)" }} />
                </span>
              </h1>
              <p className="mt-6 text-[15px] md:text-base leading-relaxed max-w-xl" style={{ color: "var(--gravel)" }}>
                Software, infrastructure, AI, hardware and technical systems — designed around how people and
                businesses actually work, and operated from Nairobi.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CtaLink href="/contact" label="Work With Me" />
                <CtaAnchor href="/work" label="Explore My Work" variant="ghost" external={false} />
                <CtaAnchor
                  href={whatsappLink(whatsappCtaMessage("general"))}
                  label="WhatsApp"
                  variant="ghost"
                  external
                />
              </div>
              <div className="mt-10 grid grid-cols-3 gap-3 max-w-lg">
                <MiniStat value="99.9%" label="Uptime delivered" />
                <MiniStat value="20%" label="Cloud cost cut" />
                <MiniStat value="15h+" label="Automation / week" />
              </div>
            </div>
            <div className="lg:col-span-5">
              <StackDiagram />
            </div>
          </div>
        </div>

        <div className="relative z-10 border-t flex items-center justify-between py-3 mx-auto max-w-7xl w-full px-6 md:px-14" style={{ borderColor: "var(--rule)" }}>
          <span className="text-[9px] font-mono tracking-[0.16em] uppercase" style={{ color: "var(--gravel)" }}>
            Serving {areasServed.slice(0, 5).join(" · ")} + surrounding areas
          </span>
        </div>
      </section>

      {/* ── Capability overview ─────────────────────────────── */}
      <section className="relative w-full py-20 md:py-28" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <SectionHeading
            eyebrow="Capabilities"
            title={<>One person who understands the <span style={{ color: "var(--flag)" }}>whole stack.</span></>}
            lead="Five commercial pillars — software, IT & infrastructure, AI & automation, hardware, and technical leadership — delivered by someone who has run each layer in production."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {abilityRows.map((row) => (
              <Link key={row.label} href={row.href} className="group block h-full">
                <div className="apple-card-flat p-6 h-full flex flex-col transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-base" style={{ color: "var(--flag)" }}>{row.icon}</span>
                    <span className="apple-eyebrow-accent">{row.label}</span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight mt-4" style={{ color: "var(--fg)" }}>
                    {row.title}
                  </h3>
                  <p className="text-xs leading-relaxed mt-2 flex-1" style={{ color: "var(--gravel)" }}>
                    {row.text}
                  </p>
                  <span className="mt-4 font-mono text-[10px] font-bold tracking-[0.14em] uppercase inline-flex items-center gap-1.5" style={{ color: "var(--flag)" }}>
                    {row.cta}
                    <FiArrowUpRight className="text-xs" />
                  </span>
                </div>
              </Link>
            ))}
            <div className="apple-card-flat p-6 h-full flex flex-col justify-center" style={{ background: "var(--sheet-2)" }}>
              <span className="apple-eyebrow-accent">Guaranteed</span>
              <p className="text-sm leading-relaxed mt-3" style={{ color: "var(--fg)" }}>
                No fake testimonials. Evidence instead — case studies, real metrics and transparent processes.
              </p>
              <Link href="/case-studies" className="mt-4 font-mono text-[10px] font-bold tracking-[0.14em] uppercase" style={{ color: "var(--flag)" }}>
                See the evidence →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills snap ─────────────────────────────────────── */}
      <section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--sheet-2)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[2px] w-8 rounded-full" style={{ background: "var(--flag)" }} />
            <span className="apple-eyebrow">Engineering depth</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {stackSkills.map((group) => (
              <div key={group.group}>
                <span className="text-[9px] font-mono font-bold tracking-[0.16em] uppercase" style={{ color: "var(--flag)" }}>
                  {group.group}
                </span>
                <div className="mt-3 space-y-1.5">
                  {group.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs" style={{ color: "var(--fg)" }}>
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: "var(--water)" }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services / pricing ──────────────────────────────── */}
      <section className="relative w-full py-20 md:py-28" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <SectionHeading
            eyebrow="Commercial services"
            title={<>Clear scope, <span style={{ color: "var(--flag)" }}>clear starting prices.</span></>}
            lead="Where pricing is known it's shown up front. PC builds are quoted per build because every workload is different."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-12">
            {pillars.map((p) => (
              <PillarCard key={p.id} pillar={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PC building ─────────────────────────────────────── */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden" style={{ backgroundColor: "var(--paper)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] right-[-5%] h-[480px] w-[480px] rounded-full blur-[250px]" style={{ background: "var(--flag)", opacity: 0.04 }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Custom PC Building"
                title={<>Custom PCs designed around what you <span style={{ color: "var(--flag)" }}>actually do.</span></>}
                lead="Not whatever parts happen to be in stock. Gaming, development, AI, content creation and business machines — spec, build, test, deliver."
              />
            </div>
            <div className="lg:col-span-5 lg:flex lg:justify-end">
              <CtaLink href="/tools/pc-build" label="Try the PC Build Tool" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {pcServices.slice(0, 6).map((s) => (
              <PcServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ─────────────────────────────────────────── */}
      <section className="relative w-full py-20 md:py-28" style={{ backgroundColor: "var(--sheet-2)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[2px] w-8 rounded-full" style={{ background: "var(--flag)" }} />
            <span className="apple-eyebrow">Selected results</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <MetricCard value="99.9%" label="Uptime" detail="Delivered through monitoring and disciplined incident response." />
            <MetricCard value="20%" label="Cloud cost reduction" detail="Azure optimised end-to-end." />
            <MetricCard value="45%" label="Fewer deployment errors" detail="Bash + CI/CD replaced manual releases." />
            <MetricCard value="15+ hrs" label="Automation per week" detail="Reclaimed across operations." />
          </div>
          <p className="mt-6 text-[11px] font-mono" style={{ color: "var(--gravel)" }}>
            Figures from real delivered work — details and context in the case studies.
          </p>
        </div>
      </section>

      {/* ── Case studies ────────────────────────────────────── */}
      <section className="relative w-full py-20 md:py-28" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <div className="flex items-center justify-between gap-4 mb-10">
            <SectionHeading
              eyebrow="Case studies"
              title={<>Evidence, <span style={{ color: "var(--flag)" }}>not claims.</span></>}
            />
            <Link href="/case-studies" className="hidden md:inline-flex font-mono text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--flag)" }}>
              All case studies →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {caseStudies.slice(0, 3).map((c) => (
              <CaseStudyCard key={c.slug} study={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest guides ───────────────────────────────────── */}
      <section className="relative w-full py-20 md:py-28" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <div className="flex items-center justify-between gap-4 mb-10">
            <SectionHeading
              eyebrow="Latest guides"
              title={<>Practical answers, <span style={{ color: "var(--flag)" }}>from experience.</span></>}
              lead="PC building, infrastructure, software and AI — written by someone who operates these systems every day."
            />
            <Link href="/guides" className="hidden md:inline-flex font-mono text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--flag)" }}>
              All guides →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {guides.slice(0, 3).map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </div>
        </div>
      </section>

      {/* ── About Joseph / two paths ────────────────────────── */}
      <section className="relative w-full py-20 md:py-28 section-grid" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="apple-card-flat p-8">
              <span className="apple-eyebrow-accent">Looking to hire Joseph?</span>
              <h3 className="text-2xl font-semibold tracking-tight mt-4" style={{ color: "var(--fg)" }}>
                Engineering depth and leadership for a team.
              </h3>
              <p className="text-sm leading-relaxed mt-3" style={{ color: "var(--gravel)" }}>
                Three years building production backend systems, notification and identity platforms, cloud
                reliability and team leadership — C#, Python, TypeScript, Azure, Docker, Kubernetes.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <CtaAnchor href="/Joseph_Chege.pdf" label="Download Résumé" variant="ghost" />
                <CtaAnchor href={siteConfig.socials.github} label="GitHub" variant="ghost" external />
                <CtaAnchor href="/about" label="About Joseph" variant="ghost" external={false} />
              </div>
            </div>
            <div className="apple-card-flat p-8" style={{ background: "var(--sheet-2)" }}>
              <span className="apple-eyebrow-accent" style={{ color: "var(--flag)" }}>Looking to hire Joseph&apos;s services?</span>
              <h3 className="text-2xl font-semibold tracking-tight mt-4" style={{ color: "var(--fg)" }}>
                A problem your business needs solved.
              </h3>
              <p className="text-sm leading-relaxed mt-3" style={{ color: "var(--gravel)" }}>
                Software systems, IT audits, infrastructure, automation, PC builds or technical leadership —
                scoped, priced and delivered with evidence and documentation.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <CtaLink href="/contact" label="Start a Conversation" />
                <CtaAnchor
                  href={whatsappLink(whatsappCtaMessage("general"))}
                  label="WhatsApp"
                  variant="ghost"
                  external
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className="relative w-full py-20 md:py-24" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <SectionHeading eyebrow="Common questions" title="Answers, up front." />
          <div className="mt-10">
            <Faq items={homeFaqs} title="Questions people ask before starting" />
          </div>
        </div>
      </section>

      <CtaBand
        title="You have a technical problem. I may be able to solve it."
        text="A free first conversation — tell me what's not working, what's slow, or what you're trying to build, and I'll tell you honestly whether I can help."
        cta={{ label: "Start a Conversation", href: "/contact" }}
        waMessage={whatsappCtaMessage("general")}
        secondary={{ label: "Email Me", href: mailtoLink("Project inquiry") }}
      />
    </>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[3px] border p-3" style={{ borderColor: "var(--rule)", background: "var(--sheet)" }}>
      <div className="font-display text-2xl font-bold leading-none" style={{ color: "var(--flag)" }}>
        {value}
      </div>
      <div className="mt-1.5 text-[9px] font-mono font-semibold tracking-[0.14em] uppercase" style={{ color: "var(--gravel)" }}>
        {label}
      </div>
    </div>
  );
}