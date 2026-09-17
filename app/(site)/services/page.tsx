import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { pillars, pricing } from "@/lib/services";
import { whatsappCtaMessage } from "@/lib/cta-messages";
import { PageHero } from "@/app/Components/site/page-hero";
import { SectionHeading } from "@/app/Components/site/section-heading";
import { CtaBand } from "@/app/Components/site/cta-band";
import { PillarCard } from "@/app/Components/site/cards";
import { StackDiagram } from "@/app/Components/site/stack-diagram";

export const metadata: Metadata = pageMeta({
  title: "Services — Software, IT, Cloud, AI & PC Building in Nairobi",
  description:
    "Five commercial pillars: software engineering, IT & infrastructure, AI & automation, custom PC building and technical leadership for Nairobi businesses. Clear scope, clear starting prices.",
  path: "/services",
  keywords: ["IT services Nairobi", "software services Kenya", "technology services Nairobi"],
});

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPageJsonLd("/services", "Technology Services in Nairobi", metadata.description ?? ""),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
            ]),
          ]),
        }}
      />
      <PageHero
        eyebrow="Services"
        title={<>Five ways to hand a <span style={{ color: "var(--flag)" }}>technical problem</span> to one person.</>}
        lead="Software, IT & infrastructure, cloud & DevOps, AI & automation, technical leadership and custom PCs — each priced transparently where the scope allows it."
        crumbs={[{ name: "Home", path: "/" }, { name: "Services" }]}
        meta={["From KSh 15,000", "Nairobi, Kenya", "Free first conversation"]}
        whatsappMessage={whatsappCtaMessage("general")}
      />

      <section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <SectionHeading eyebrow="The pillars" title={<>Everything below one <span style={{ color: "var(--flag)" }}>whole-stack</span> owner.</>} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-10">
            {pillars.map((p) => (
              <PillarCard key={p.id} pillar={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--sheet-2)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <SectionHeading eyebrow="Starting prices" title={<>No mystery where <span style={{ color: "var(--flag)" }}>pricing exists.</span></>} lead="Where scope can be bounded, the starting price is public. PC builds are quoted per build — every workload is different." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
            {pricing.map((p) => (
              <Link key={p.name} href={p.href} className="group block h-full">
                <div className="apple-card-flat p-6 h-full flex flex-col transition-transform duration-300 group-hover:-translate-y-1">
                  <span className="apple-eyebrow-accent">{p.name}</span>
                  <div className="font-display text-2xl font-bold mt-3" style={{ color: "var(--flag)" }}>
                    {p.from}
                  </div>
                  <p className="text-xs leading-relaxed mt-3 flex-1" style={{ color: "var(--gravel)" }}>
                    {p.detail}
                  </p>
                  <span className="mt-4 font-mono text-[10px] font-bold tracking-[0.14em] uppercase" style={{ color: "var(--flag)" }}>
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <SectionHeading eyebrow="Why this matters" title={<>The stack isn&apos;t separate — <span style={{ color: "var(--flag)" }}>it&apos;s one system.</span></>} lead="Software runs on infrastructure. Infrastructure runs on hardware. Both are lost without automation and leadership. When one person owns the full stack, the decisions stop being someone else&apos;s problem." />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/case-studies" className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] inline-flex items-center gap-2" style={{ color: "var(--flag)" }}>
                See the evidence →
              </Link>
            </div>
          </div>
          <StackDiagram />
        </div>
      </section>

      <CtaBand
        title="Not sure which pillar your problem belongs to?"
        text="That's normal — most problems span two or three. A free conversation sorts out what's actually going on before anything is scoped or priced."
        cta={{ label: "Start a Conversation", href: "/contact" }}
        waMessage={whatsappCtaMessage("general")}
      />
    </>
  );
}