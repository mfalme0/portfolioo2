import type { Metadata } from "next";
import { pageMeta, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { PageHero } from "@/app/Components/site/page-hero";
import { SectionHeading } from "@/app/Components/site/section-heading";
import { MetricCard } from "@/app/Components/site/cards";
import { CtaBand } from "@/app/Components/site/cta-band";
import { whatsappCtaMessage } from "@/lib/cta-messages";

export const metadata: Metadata = pageMeta({
  title: "Hire Me — Joseph Gitau Chege",
  description:
    "Senior software engineer, systems architect and technical leader in Nairobi available for engineering leadership, systems delivery and platform work.",
  path: "/hire",
});

const highlights = [
  "Led four engineering teams across software, AI, robotics and ed-tech delivery.",
  "Shipped a full-stack school ERP, staff tools and mobile-to-ERP integrations.",
  "Built production systems across backend architecture, cloud operations and reliability.",
];

export default function HirePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPageJsonLd("/hire", "Hire Me — Joseph Gitau Chege", metadata.description ?? ""),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Hire Me", path: "/hire" },
            ]),
          ]),
        }}
      />

      <PageHero
        eyebrow="Hire me"
        title={<>I lead the build of software <span style={{ color: "var(--flag)" }}>people can trust.</span></>}
        lead="I help teams scope the right solution, own the technical delivery and keep the system stable after launch."
        crumbs={[{ name: "Home", path: "/" }, { name: "Hire Me" }]}
        cta={{ label: "Download résumé", href: siteConfig.resume }}
        ctaLabel="Download résumé"
        meta={["Senior engineer", "Technical leader", "Nairobi, Kenya"]}
      />

      <section className="relative w-full py-20 md:py-28" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <SectionHeading
            eyebrow="What I bring"
            title={<>Leadership with hands-on delivery.</>}
            lead="I work comfortably across architecture, team leadership, implementation and the operational reality that comes after launch."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            <MetricCard value="4" label="Teams led" detail="Across engineering, AI, robotics and ed-tech delivery." />
            <MetricCard value="99.9%" label="Uptime" detail="Delivered across operational systems and infrastructure." />
            <MetricCard value="8+" label="Years" detail="Building production systems, platforms and internal tooling." />
            <MetricCard value="ERP" label="Core strength" detail="Operations systems built to fit real world process and scale." />
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="apple-card-flat p-6 md:p-7">
              <span className="apple-eyebrow-accent">Experience snapshot</span>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed" style={{ color: "var(--gravel)" }}>
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--flag)" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="apple-card-flat p-6 md:p-7">
              <span className="apple-eyebrow-accent">Career timeline</span>
              <div className="mt-4 space-y-4 text-sm" style={{ color: "var(--gravel)" }}>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--flag)" }}>Apr 2025 — Sep 2026</div>
                  <div className="mt-1 font-semibold" style={{ color: "var(--fg)" }}>Engineering Team Lead &amp; Head of IT</div>
                  <div>Steadfast Academy</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--flag)" }}>Jan 2024 — Mar 2025</div>
                  <div className="mt-1 font-semibold" style={{ color: "var(--fg)" }}>Software Consultant</div>
                  <div>Gituamba Girls School</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--flag)" }}>Oct 2023 — Dec 2023</div>
                  <div className="mt-1 font-semibold" style={{ color: "var(--fg)" }}>Software Engineering Intern</div>
                  <div>VisionFund Kenya</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full py-20 md:py-28" style={{ backgroundColor: "var(--sheet-2)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <SectionHeading
            eyebrow="How I work"
            title={<>Clear ownership, practical delivery.</>}
            lead="I align the architecture, delivery flow and operational support around the actual business problem rather than a generic stack."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="apple-card-flat p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--flag)" }}>01 — Understand</div>
              <h3 className="mt-3 text-lg font-semibold" style={{ color: "var(--fg)" }}>Scope the problem and the real workflow.</h3>
            </div>
            <div className="apple-card-flat p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--flag)" }}>02 — Build</div>
              <h3 className="mt-3 text-lg font-semibold" style={{ color: "var(--fg)" }}>Design the system and deliver against milestones.</h3>
            </div>
            <div className="apple-card-flat p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--flag)" }}>03 — Operate</div>
              <h3 className="mt-3 text-lg font-semibold" style={{ color: "var(--fg)" }}>Keep it stable, measurable and easy to support.</h3>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to talk about the role or the problem?"
        text="Share the role brief, the team, or the system you need built and I’ll respond with the next steps."
        cta={{ label: "Contact Joseph", href: "/contact" }}
        waMessage={whatsappCtaMessage("general")}
      />
    </>
  );
}
