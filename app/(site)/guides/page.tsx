import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { guides, guidesByCluster, guideClusters, type Guide } from "@/lib/guides";
import { whatsappCtaMessage } from "@/lib/cta-messages";
import { PageHero } from "@/app/Components/site/page-hero";
import { CtaBand } from "@/app/Components/site/cta-band";
import { GuideCard, MetricCard } from "@/app/Components/site/cards";

export const metadata: Metadata = pageMeta({
  title: "Guides — PC Building, IT, Software & AI from Experience",
  description:
    "Practical guides from someone who operates these systems daily: gaming PC buying in Kenya, RAM and PSU selection, upgrades, IT audits, ERPs, automation and Docker.",
  path: "/guides",
  keywords: ["gaming PC guide Kenya", "IT audit guide", "PC building guide", "Docker for business"],
});

interface Props {
  searchParams: Promise<{ cluster?: string }>;
}

const clusterSlugToName: Record<string, string> = {
  "pc-building": "PC Building",
  "it-infrastructure": "IT Infrastructure",
  "software-engineering": "Software Engineering",
  "ai-automation": "AI & Automation",
};

const clusterFilters = [
  { id: "All", label: "All Guides", href: "/guides" },
  ...guideClusters.map((c) => ({ id: c.name, label: c.name, href: `/guides?cluster=${c.id}` })),
];

export default async function GuidesPage({ searchParams }: Props) {
  const { cluster } = await searchParams;
  const raw = (cluster ?? "All").toLowerCase();
  const slugMatch = clusterSlugToName[raw];
  const nameMatch = guideClusters.find((c) => c.name.toLowerCase() === raw);
  const active = slugMatch ?? nameMatch?.name ?? "All";
  const filtered = guidesByCluster(active as Guide["cluster"] | "All");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPageJsonLd("/guides", "Guides & Resources", metadata.description ?? ""),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides" },
            ]),
          ]),
        }}
      />
      <PageHero
        eyebrow="Guides"
        title={<>Practical answers, <span style={{ color: "var(--flag)" }}>from experience.</span></>}
        lead="Written by someone who operates these systems every day — PCs, infrastructure, software and automation. No fluff, no sponsored recommendations."
        crumbs={[{ name: "Home", path: "/" }, { name: "Guides" }]}
        whatsappMessage={whatsappCtaMessage("general")}
      />

      <section className="relative w-full py-12 md:py-16" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter guides by topic">
            {clusterFilters.map((c) => {
              const isActive = c.id === active;
              return (
                <Link
                  key={c.id}
                  href={c.href}
                  role="tab"
                  aria-selected={isActive}
                  className="rounded-full px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.1em] transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? "var(--flag)" : "var(--sheet-2)",
                    color: isActive ? "var(--paper)" : "var(--fg)",
                    border: `1px solid ${isActive ? "var(--flag)" : "var(--rule)"}`,
                  }}
                >
                  {c.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-3">
            <MetricCard value={String(guides.length)} label="Guides live" detail="Growing each week from delivered work." />
            <MetricCard value="4" label="Topic clusters" detail="PC building, infrastructure, software and AI." />
            <MetricCard value="8-10 min" label="Average read" detail="Written to be read, not skimmed past." />
          </div>
        </div>
      </section>

      <CtaBand
        title="Reading beats doing — but only up to a point."
        text="Where the guide ends is where the real environment begins. A free conversation figures out which advice actually applies to your machine or business."
        cta={{ label: "Ask a Question", href: "/contact" }}
        waMessage={whatsappCtaMessage("general")}
      />
    </>
  );
}