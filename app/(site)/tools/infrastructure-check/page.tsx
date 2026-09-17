import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { whatsappCtaMessage } from "@/lib/cta-messages";
import { PageHero } from "@/app/Components/site/page-hero";
import { SectionHeading } from "@/app/Components/site/section-heading";
import { CtaBand } from "@/app/Components/site/cta-band";
import { Faq } from "@/app/Components/site/faq";
import InfraCheckTool from "@/app/Components/site/infra-check-tool";

export const metadata: Metadata = pageMeta({
  title: "Free Infrastructure Health Check — Backups, Networking, Security",
  description:
    "Eight honest questions about your backups, networking, security, monitoring and downtime risk — scored into a Preliminary IT Health Snapshot, backed by a real audit offer.",
  path: "/tools/infrastructure-check",
  keywords: ["IT audit tool", "infrastructure self-assessment", "backup health check", "IT health snapshot"],
});

const faqs = [
  { q: "How accurate is this compared to a real audit?", a: "This is a screening tool, not an audit. It gives you a fast signal and ranks the most common risk areas — but a real audit verifies backups, restores, networking, access control and monitoring in the actual environment." },
  { q: "What do I get out of it?", a: "A health score, a band rating, and a clear next-step recommendation. If the health is exposed, that's the strongest signal a full audit will find urgent fixes." },
  { q: "Is the data stored anywhere?", a: "No — answers are processed in your browser and only leave your device if you send the summary via WhatsApp or the contact form." },
];

export default function InfraCheckPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPageJsonLd("/tools/infrastructure-check", "Infrastructure Health Check", metadata.description ?? ""),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Resources", path: "/resources" },
              { name: "Infrastructure Check", path: "/tools/infrastructure-check" },
            ]),
          ]),
        }}
      />
      <PageHero
        eyebrow="Infrastructure Health Check"
        title={<>A fast check of your <span style={{ color: "var(--flag)" }}>real infrastructure risk.</span></>}
        lead="Eight questions. No logins, no scans, no data collected — a screening tool to establish whether a full IT audit is worth doing."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          { name: "Infrastructure Check" },
        ]}
        whatsappMessage={whatsappCtaMessage("audit")}
      />

      <section className="relative w-full py-12 md:py-16" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-3xl mx-auto px-6 md:px-8 space-y-12">
          <InfraCheckTool />

          <div className="space-y-8">
            <SectionHeading
              eyebrow="If the health is low"
              title="What the full audit covers."
              lead="This tool screens the common areas. The full audit verifies them in your environment and returns a prioritized remediation plan."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "Backups and restore testing",
                "Networking, routing and failover",
                "Security and access control",
                "Monitoring and alerting",
                "Cloud cost and governance",
                "Downtime risk ranking",
              ].map((item) => (
                <div key={item} className="apple-card-flat p-4 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "var(--flag)" }} />
                  <span className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-2">
              <Link href="/it-consulting" className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] block" style={{ color: "var(--flag)" }}>
                Full IT consulting & audit service →
              </Link>
              <Link href="/guides/it-audit-guide" className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] block" style={{ color: "var(--flag)" }}>
                Read the IT audit guide →
              </Link>
            </div>
          </div>

          <SectionHeading eyebrow="Common questions" title="" />
          <Faq items={faqs} title="" />
        </div>
      </section>

      <CtaBand
        title="The health check is a starting point, not a finish."
        text="The full audit finds what this tool can only suggest — and produces a prioritized remediation plan you can act on."
        cta={{ label: "Request an IT Audit", href: "/contact?service=IT Audit" }}
        waMessage={whatsappCtaMessage("audit")}
      />
    </>
  );
}