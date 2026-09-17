import React from "react";
import { PageHero } from "./page-hero";
import { CtaBand } from "./cta-band";
import { SectionHeading } from "./section-heading";
import { Faq, type FaqItem } from "./faq";
import { PillarCard } from "./cards";
import { whatsappCtaMessage } from "@/lib/cta-messages";
import { pillars } from "@/lib/services";

export interface ServicePageConfig {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  crumbs: { name: string; path?: string }[];
  problem: { title: string; text: string };
  solutionHeadline: React.ReactNode;
  services: { label: string; detail: string }[];
  approachTitle: string;
  approach: { step: string; detail: string }[];
  relatedIds: string[];
  faqs: FaqItem[];
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
  ctaHref: string;
  waKey: string;
}

export function ServicePage({ config }: { config: ServicePageConfig }) {
  return (
    <>
      <PageHero
        eyebrow={config.eyebrow}
        title={config.title}
        lead={config.lead}
        crumbs={config.crumbs}
        cta={{ label: config.ctaLabel, href: config.ctaHref }}
        whatsappMessage={whatsappCtaMessage(config.waKey)}
      />

      {/* Problem → solution */}
      <section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="The problem" title={config.problem.title} />
          </div>
          <div className="lg:col-span-7 flex items-center">
            <p className="text-[15px] leading-[1.8]" style={{ color: "var(--gravel)" }}>
              {config.problem.text}
            </p>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--sheet-2)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <SectionHeading eyebrow="What you get" title={config.solutionHeadline} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
            {config.services.map((s) => (
              <div key={s.label} className="apple-card-flat p-5">
                <span className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                  {s.label}
                </span>
                <p className="text-xs leading-relaxed mt-2" style={{ color: "var(--gravel)" }}>
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <SectionHeading eyebrow="Approach" title={config.approachTitle} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
            {config.approach.map((a, i) => (
              <div key={a.step} className="apple-card-flat p-5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] font-bold w-8 h-8 flex items-center justify-center border rounded-[2px]" style={{ borderColor: "var(--rule-strong)", color: "var(--flag)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                    {a.step}
                  </span>
                </div>
                <p className="text-xs leading-relaxed mt-3" style={{ color: "var(--gravel)" }}>
                  {a.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--sheet-2)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <SectionHeading eyebrow="Related" title={<>Explore the full <span style={{ color: "var(--flag)" }}>stack of services.</span></>} />
          <RelatedPillars ids={config.relatedIds} />
        </div>
      </section>

      {/* FAQ */}
      <section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <SectionHeading eyebrow="FAQ" title="Questions people ask." />
          <div className="mt-8">
            <Faq items={config.faqs} title="" />
          </div>
        </div>
      </section>

      <CtaBand
        title={config.ctaTitle}
        text={config.ctaText}
        cta={{ label: config.ctaLabel, href: config.ctaHref }}
        waMessage={whatsappCtaMessage(config.waKey)}
      />
    </>
  );
}

function RelatedPillars({ ids }: { ids: string[] }) {
  const related = pillars.filter((p) => ids.includes(p.id));
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
      {related.map((p) => (
        <PillarCard key={p.id} pillar={p} />
      ))}
    </div>
  );
}