import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { guides } from "@/lib/guides";
import { whatsappCtaMessage } from "@/lib/cta-messages";
import { PageHero } from "@/app/Components/site/page-hero";
import { SectionHeading } from "@/app/Components/site/section-heading";
import { CtaBand } from "@/app/Components/site/cta-band";
import { FiArrowUpRight } from "react-icons/fi";

export const metadata: Metadata = pageMeta({
  title: "Resources — Guides, Tools & the Home Lab",
  description:
    "Guides, free diagnostic tools, the home infrastructure lab, hardware gallery and LAN party archive from Joseph Gitau Chege.",
  path: "/resources",
  keywords: ["tech resources Kenya", "PC guides", "infrastructure tools", "homelab"],
});

const toolCards = [
  {
    title: "PC Build Tool",
    text: "A quick questionnaire — use, resolution, budget — that turns into a custom build request instead of a generic parts guess.",
    href: "/tools/pc-build",
    tag: "Interactive",
  },
  {
    title: "Infrastructure Health Check",
    text: "Eight honest questions about backups, networking, security and monitoring, scored into a Preliminary IT Health Snapshot.",
    href: "/tools/infrastructure-check",
    tag: "Interactive",
  },
];

const clusterHref: Record<string, string> = {
  "PC Building": "/guides?cluster=pc-building",
  "IT Infrastructure": "/guides?cluster=it-infrastructure",
  "Software Engineering": "/guides?cluster=software-engineering",
  "AI & Automation": "/guides?cluster=ai-automation",
};

export default function ResourcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPageJsonLd("/resources", "Resources & Tools", metadata.description ?? ""),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Resources", path: "/resources" },
            ]),
          ]),
        }}
      />
      <PageHero
        eyebrow="Resources"
        title={<>Guides, tools and the <span style={{ color: "var(--flag)" }}>living lab.</span></>}
        lead="Free diagnostic tools, practical guides, and a view into the infrastructure I run at home — all built from real work rather than marketing."
        crumbs={[{ name: "Home", path: "/" }, { name: "Resources" }]}
        whatsappMessage={whatsappCtaMessage("general")}
      />

      {/* Tools */}
      <section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <SectionHeading eyebrow="Free tools" title={<>Diagnose before you <span style={{ color: "var(--flag)" }}>spend.</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-10">
            {toolCards.map((t) => (
              <Link key={t.href} href={t.href} className="group block h-full">
                <div className="apple-card-flat p-6 h-full transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="apple-tag">{t.tag}</span>
                    <FiArrowUpRight className="text-lg" style={{ color: "var(--flag)" }} />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight mt-3" style={{ color: "var(--fg)" }}>
                    {t.title}
                  </h3>
                  <p className="text-xs leading-relaxed mt-2" style={{ color: "var(--gravel)" }}>
                    {t.text}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Guides by cluster */}
      <section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--sheet-2)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <SectionHeading eyebrow="Guides" title={<>By topic, <span style={{ color: "var(--flag)" }}>by need.</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
            {Object.entries(clusterHref).map(([cluster, href]) => {
              const count = guides.filter((g) => g.cluster === cluster).length;
              return (
                <Link key={cluster} href={href} className="group block h-full">
                  <div className="apple-card-flat p-6 h-full flex flex-col transition-transform duration-300 group-hover:-translate-y-1">
                    <span className="text-[9px] font-mono font-bold tracking-[0.18em] uppercase" style={{ color: "var(--flag)" }}>
                      {count} {count === 1 ? "guide" : "guides"}
                    </span>
                    <h3 className="text-base font-semibold tracking-tight mt-2" style={{ color: "var(--fg)" }}>
                      {cluster}
                    </h3>
                    <p className="text-xs leading-relaxed mt-2 flex-1" style={{ color: "var(--gravel)" }}>
                      {cluster === "PC Building" && "Buying, building and upgrading PCs in Kenya without overpaying."}
                      {cluster === "IT Infrastructure" && "Audits, backups, Docker and the infrastructure decisions that matter."}
                      {cluster === "Software Engineering" && "When custom software pays, and how business systems get built."}
                      {cluster === "AI & Automation" && "Where automation and AI deliver, and how to start without hype."}
                    </p>
                    <span className="mt-4 font-mono text-[10px] font-bold tracking-[0.14em] uppercase" style={{ color: "var(--flag)" }}>
                      Browse →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* The living lab */}
      <section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14 grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link href="/homelab" className="group block h-full">
            <div className="apple-card-flat p-6 h-full transition-transform duration-300 group-hover:-translate-y-1">
              <span className="apple-eyebrow-accent">Home Lab</span>
              <h3 className="text-lg font-semibold tracking-tight mt-3" style={{ color: "var(--fg)" }}>
                The living lab.
              </h3>
              <p className="text-xs leading-relaxed mt-2" style={{ color: "var(--gravel)" }}>
                The self-hosted infrastructure I run in practice — services, storage and networking with live status.
              </p>
              <span className="mt-4 inline-block font-mono text-[10px] font-bold tracking-[0.14em] uppercase" style={{ color: "var(--flag)" }}>
                Inspect the rack →
              </span>
            </div>
          </Link>
          <Link href="/LAN" className="group block h-full">
            <div className="apple-card-flat p-6 h-full transition-transform duration-300 group-hover:-translate-y-1">
              <span className="apple-eyebrow-accent">LAN Party</span>
              <h3 className="text-lg font-semibold tracking-tight mt-3" style={{ color: "var(--fg)" }}>
                Local network gaming.
              </h3>
              <p className="text-xs leading-relaxed mt-2" style={{ color: "var(--gravel)" }}>
                The LAN archive — low-latency multiplayer built on the same networking knowledge shipping to clients.
              </p>
              <span className="mt-4 inline-block font-mono text-[10px] font-bold tracking-[0.14em] uppercase" style={{ color: "var(--flag)" }}>
                Enter the LAN →
              </span>
            </div>
          </Link>
        </div>
      </section>

      <CtaBand
        title="A tool told you something. What's it worth?"
        text="The free tools exist to screen and guide — the real answers come from looking at the actual environment. That's what the first conversation is for."
        cta={{ label: "Ask a Question", href: "/contact" }}
        waMessage={whatsappCtaMessage("general")}
      />
    </>
  );
}