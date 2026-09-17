import React from "react";
import { PageHero } from "./page-hero";
import { CtaBand } from "./cta-band";
import { SectionHeading } from "./section-heading";
import { ProcessSteps, type Step } from "./process-steps";
import { Faq, type FaqItem } from "./faq";
import { PcServiceCard } from "./cards";
import { pcServices, pcPackages, pcBuildProcess } from "@/lib/services";
import { whatsappCtaMessage } from "@/lib/cta-messages";

export interface PcPageConfig {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  crumbs: { name: string; path?: string }[];
  problem: { title: string; text: string };
  specs: { label: string; detail: string }[];
  customHeading: React.ReactNode;
  useProcess?: boolean;
  faqs: FaqItem[];
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
  ctaHref: string;
  waKey: string;
}

export function PcPage({ config }: { config: PcPageConfig }) {
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

      <section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--sheet-2)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <SectionHeading eyebrow="Spec & build" title={config.customHeading} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
            {config.specs.map((s) => (
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

      <section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <SectionHeading
            eyebrow="Process"
            title={config.useProcess ? "How every build goes." : "How it gets done."}
          />
          <div className="mt-10">
            <ProcessSteps steps={config.useProcess ? (pcBuildProcess as Step[]) : pcSteps} columns={3} />
          </div>
        </div>
      </section>

      <section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--sheet-2)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <SectionHeading eyebrow="Engagement" title={<>Three ways to <span style={{ color: "var(--flag)" }}>work together.</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-10">
            {pcPackages.map((p) => (
              <div key={p.name} className="apple-card-flat p-6 flex flex-col">
                <span className="font-mono text-[9px] font-bold tracking-[0.18em] uppercase" style={{ color: "var(--flag)" }}>
                  {p.price}
                </span>
                <h3 className="text-base font-semibold tracking-tight mt-2" style={{ color: "var(--fg)" }}>
                  {p.name}
                </h3>
                <p className="text-xs leading-relaxed mt-2 flex-1" style={{ color: "var(--gravel)" }}>
                  {p.detail}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {p.includes.map((inc) => (
                    <li key={inc} className="flex items-center gap-2 text-[11px]" style={{ color: "var(--gravel)" }}>
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: "var(--flag)" }} />
                      {inc}
                    </li>
                  ))}
                </ul>
                <a href={config.ctaHref} className="mt-5 font-mono text-[10px] font-bold tracking-[0.14em] uppercase" style={{ color: "var(--flag)" }}>
                  Request a quote →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <SectionHeading eyebrow="More PC services" title={<>Keep exploring the <span style={{ color: "var(--flag)" }}>PC section.</span></>} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
            {pcServices
              .filter((s) => !s.href.includes("pc-building") && s.id !== configEyebrowToId(config.eyebrow))
              .slice(0, 6)
              .map((s) => (
                <PcServiceCard key={s.id} service={s} />
              ))}
          </div>
        </div>
      </section>

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

const pcSteps: Step[] = [
  { step: "Describe the use", detail: "What you'll run, play or produce — the workload decides everything." },
  { step: "Budget and timing", detail: "A realistic range and whether this is a new build, upgrade or fix." },
  { step: "Component plan", detail: "Parts chosen for the workload with a compatibility check." },
  { step: "Build or advise", detail: "Full assembly with stress testing, or a plan you execute yourself." },
  { step: "Handover", detail: "Documentation, tuning notes and support after delivery." },
];

function configEyebrowToId(eyebrow: string): string | undefined {
  const match = eyebrow.toLowerCase().match(/(gaming|workstation|upgrade|troubleshoot|consult)/);
  return match ? match[1] : undefined;
}