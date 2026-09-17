import React from "react";
import { PageHero } from "./page-hero";
import { CtaBand } from "./cta-band";
import { SectionHeading } from "./section-heading";
import { MetricCard, CaseStudyCard } from "./cards";
import { caseStudies, type CaseStudy } from "@/lib/case-studies";
import { whatsappCtaMessage } from "@/lib/cta-messages";

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const related = caseStudies.filter((c) => c.slug !== study.slug);

  return (
    <>
      <PageHero
        eyebrow={study.category}
        title={study.title}
        lead={study.summary}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: study.title },
        ]}
        meta={[study.kind, study.timeframe, `Tags: ${study.tags.slice(0, 3).join(", ")}`]}
        whatsappMessage={whatsappCtaMessage("general")}
      />

      {/* Context */}
      <section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Context" title="What was happening." />
          </div>
          <div className="lg:col-span-7 flex items-center">
            <p className="text-[15px] leading-[1.8]" style={{ color: "var(--gravel)" }}>
              {study.context}
            </p>
          </div>
        </div>
      </section>

      {/* Problem + approach */}
      <section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--sheet-2)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="The problem" title="What needed to change." />
            <ul className="mt-8 space-y-3">
              {study.problem.map((p) => (
                <li key={p} className="flex gap-3 text-sm leading-relaxed" style={{ color: "var(--gravel)" }}>
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "var(--flag)" }} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-8 space-y-4">
            <SectionHeading eyebrow="The approach" title="How it was done." />
            {study.approach.map((s) => (
              <div key={s.heading} className="apple-card-flat p-5">
                <span className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                  {s.heading}
                </span>
                <p className="text-xs leading-relaxed mt-2" style={{ color: "var(--gravel)" }}>
                  {s.body}
                </p>
                {s.bullets && (
                  <ul className="mt-3 space-y-1.5">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-xs" style={{ color: "var(--gravel)" }}>
                        <span className="mt-[6px] w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: "var(--water)" }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      {study.metrics.length > 0 && (
        <section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--paper)" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-14">
            <SectionHeading eyebrow="Measured results" title={<>The numbers <span style={{ color: "var(--flag)" }}>that came out.</span></>} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
              {study.metrics.map((m) => (
                <MetricCard key={m.label} value={m.value} label={m.label} detail={m.detail} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Outcomes */}
      <section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--sheet-2)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Outcomes" title="Where it landed." />
          </div>
          <div className="lg:col-span-7">
            <ul className="space-y-3">
              {study.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-sm leading-relaxed" style={{ color: "var(--fg)" }}>
                  <span className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "var(--flag)" }} />
                  {o}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <span className="apple-eyebrow">Stack & tools</span>
              <div className="flex flex-wrap gap-2 mt-3">
                {study.stack.map((t) => (
                  <span key={t} className="apple-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <SectionHeading eyebrow="Related work" title="More case studies." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-10">
            {related.slice(0, 3).map((c) => (
              <CaseStudyCard key={c.slug} study={c} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Your situation probably looks different — but the method doesn't."
        text="Understand the work, decide the approach, deliver and measure. A free conversation establishes whether it applies to your problem."
        cta={{ label: "See if this fits", href: "/contact" }}
        waMessage={whatsappCtaMessage("general")}
      />
    </>
  );
}