import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { whatsappCtaMessage } from "@/lib/cta-messages";
import { PageHero } from "@/app/Components/site/page-hero";
import { SectionHeading } from "@/app/Components/site/section-heading";
import { CtaBand } from "@/app/Components/site/cta-band";
import { Faq } from "@/app/Components/site/faq";
import PcBuildTool from "@/app/Components/site/pc-build-tool";

export const metadata: Metadata = pageMeta({
  title: "Custom PC Build Tool — Quote Request for Nairobi Builds",
  description:
    "A quick questionnaire that turns into a custom PC build request: use, resolution, budget and timeline — then a direct path to a real quote. Built in Nairobi.",
  path: "/tools/pc-build",
  keywords: ["custom PC builder Nairobi", "PC build quote Kenya", "gaming PC quote"],
});

const faqs = [
  { q: "Is this a binding quote?", a: "No — the tool produces a summary you send to Joseph, and the conversation establishes the scope. Nothing gets built or charged until you approve a written plan." },
  { q: "Do I need to know parts?", a: "No — describe the use case, resolution and budget. The value of the service is turning that into the correct parts and compatibility plan." },
  { q: "Does this apply only to gaming PCs?", a: "No — it covers developer workstations, AI rigs, content creation and business desktops. Every workload maps to different parts." },
];

export default function PcBuildToolPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPageJsonLd("/tools/pc-build", "Custom PC Build Tool", metadata.description ?? ""),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Resources", path: "/resources" },
              { name: "PC Build Tool", path: "/tools/pc-build" },
            ]),
          ]),
        }}
      />
      <PageHero
        eyebrow="PC Build Tool"
        title={<>Your build starts <span style={{ color: "var(--flag)" }}>here.</span></>}
        lead="Answer the questions in your own words. The summary goes straight to Joseph — no generic parts guess, no stock-parts shopping list."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          { name: "PC Build Tool" },
        ]}
        whatsappMessage={whatsappCtaMessage("hardware")}
      />

      <section className="relative w-full py-12 md:py-16" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-3xl mx-auto px-6 md:px-8 space-y-10">
          <PcBuildTool />

          <div className="space-y-8">
            <SectionHeading
              eyebrow="What happens next"
              title="From summary to a real build plan."
              lead="The questionnaire is the fastest way to start — the conversation turns the answers into a compatible, budget-aware plan you can act on."
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { step: "Send the summary", detail: "Through WhatsApp, the contact form, or email — your choice." },
                { step: "Get a parts plan", detail: "Compatibility-checked components, upgrade path and performance guidance." },
                { step: "Build or advise", detail: "Full assembly and stress-testing, or a plan you execute yourself." },
              ].map((s, i) => (
                <div key={s.step} className="apple-card-flat p-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] font-bold w-8 h-8 flex items-center justify-center border rounded-[2px]" style={{ borderColor: "var(--rule-strong)", color: "var(--flag)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                      {s.step}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--gravel)" }}>
                    {s.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-2">
              <Link href="/pc-building" className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] block" style={{ color: "var(--flag)" }}>
                Full custom PC building service →
              </Link>
              <Link href="/guides?cluster=pc-building" className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] block" style={{ color: "var(--flag)" }}>
                Read the PC building guides first →
              </Link>
            </div>
          </div>

          <SectionHeading eyebrow="Common questions" title="" />
          <Faq items={faqs} title="" />
        </div>
      </section>

      <CtaBand
        title="Ready to build the right machine?"
        text="Send the summary and get the plan. It's the fastest path from 'what should I buy' to 'I'm confident in the list.'"
        cta={{ label: "Request a Build", href: "/contact?service=Custom PC Build" }}
        waMessage={whatsappCtaMessage("hardware")}
      />
    </>
  );
}