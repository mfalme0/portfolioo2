import React from "react";
import type { Metadata } from "next";
import { pageMeta, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { caseStudies } from "@/lib/case-studies";
import { whatsappCtaMessage } from "@/lib/cta-messages";
import { PageHero } from "@/app/Components/site/page-hero";
import { SectionHeading } from "@/app/Components/site/section-heading";
import { CtaBand } from "@/app/Components/site/cta-band";
import { CaseStudyCard } from "@/app/Components/site/cards";

export const metadata: Metadata = pageMeta({
  title: "Case Studies — Software, Infrastructure, Automation & Systems",
  description:
    "Selected delivered work with real metrics: a full-stack school ERP, an on-premises infrastructure build, business automation and a distributed systems engine. Evidence, not claims.",
  path: "/case-studies",
  keywords: ["software case study Kenya", "infrastructure project Kenya", "IT portfolio Nairobi"],
});

export default function CaseStudiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPageJsonLd("/case-studies", "Case Studies", metadata.description ?? ""),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Case Studies", path: "/case-studies" },
            ]),
          ]),
        }}
      />
      <PageHero
        eyebrow="Case Studies"
        title={<>Evidence, <span style={{ color: "var(--flag)" }}>not claims.</span></>}
        lead="Selected delivered work — engineering, infrastructure, automation and systems — with the context, the method and the measured results."
        crumbs={[{ name: "Home", path: "/" }, { name: "Case Studies" }]}
        meta={["Professional work", "Engineering projects", "Measured results"]}
        whatsappMessage={whatsappCtaMessage("general")}
      />

      <section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <SectionHeading eyebrow="Selected work" title="Four studies that show the range." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-10">
            {caseStudies.map((c) => (
              <CaseStudyCard key={c.slug} study={c} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Your project won't fit a template — and it shouldn't."
        text="The method is consistent: understand the work, scope honestly, deliver and measure. The free first conversation establishes where your project would land."
        cta={{ label: "Talk About a Project", href: "/contact" }}
        waMessage={whatsappCtaMessage("general")}
      />
    </>
  );
}