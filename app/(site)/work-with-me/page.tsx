import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { pricing, pillars } from "@/lib/services";
import { PageHero } from "@/app/Components/site/page-hero";
import { SectionHeading } from "@/app/Components/site/section-heading";
import { CtaBand } from "@/app/Components/site/cta-band";
import { whatsappCtaMessage } from "@/lib/cta-messages";

export const metadata: Metadata = pageMeta({
  title: "Work With Me — Software, Infrastructure & Automation",
  description:
    "Custom software, IT audits, AI automation and technical leadership for growing teams in Nairobi and beyond.",
  path: "/work-with-me",
});

const process = [
  "Start with a short conversation about the business problem and constraints.",
  "I scope the work, clarify timelines and define what success looks like.",
  "We build in clear milestones with transparent communication and practical delivery.",
  "After delivery, I stay close enough to support the system as it matures.",
];

export default function WorkWithMePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPageJsonLd("/work-with-me", "Work With Me — Software, Infrastructure & Automation", metadata.description ?? ""),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Work With Me", path: "/work-with-me" },
            ]),
          ]),
        }}
      />

      <PageHero
        eyebrow="Work with me"
        title={<>I build the systems behind <span style={{ color: "var(--flag)" }}>the work.</span></>}
        lead="Custom software, infrastructure improvements, AI automation and technical leadership for teams that need a dependable builder with business context."
        crumbs={[{ name: "Home", path: "/" }, { name: "Work With Me" }]}
        cta={{ label: "Book a conversation", href: "/contact" }}
        meta={["Custom systems", "From KSh 15,000", "Nairobi, Kenya"]}
      />

      <section className="relative w-full py-20 md:py-28" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <SectionHeading
            eyebrow="Service lines"
            title={<>The work I do most often.</>}
            lead="I keep the list tight so the scope stays clear and the quality stays high."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3">
            {pillars.map((pillar) => (
              <Link key={pillar.id} href={pillar.href} className="group block h-full">
                <div className="apple-card-flat p-6 h-full transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="flex items-center justify-between gap-4">
                    <span className="apple-eyebrow-accent">{pillar.name}</span>
                    {pillar.pricing && (
                      <span className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: "var(--flag)" }}>
                        {pillar.pricing}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-sm font-semibold" style={{ color: "var(--fg)" }}>{pillar.short}</p>
                  <p className="mt-3 text-xs leading-relaxed" style={{ color: "var(--gravel)" }}>{pillar.blurb}</p>
                  <ul className="mt-4 space-y-2 text-xs" style={{ color: "var(--gravel)" }}>
                    {pillar.services.slice(0, 4).map((service) => (
                      <li key={service.label} className="flex items-start gap-2">
                        <span className="mt-[6px] w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: "var(--flag)" }} />
                        <span>{service.label}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--flag)" }}>
                    Learn more →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full py-20 md:py-28" style={{ backgroundColor: "var(--sheet-2)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <SectionHeading
            eyebrow="Starting prices"
            title={<>Practical pricing for practical work.</>}
            lead="These are starting points. Real scope, risk and delivery complexity still determine the final quote."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {pricing.map((item) => (
              <Link key={item.name} href={item.href} className="group block h-full">
                <div className="apple-card-flat p-6 h-full transition-transform duration-300 group-hover:-translate-y-1">
                  <span className="apple-eyebrow-accent">{item.name}</span>
                  <div className="mt-4 font-display text-3xl font-bold" style={{ color: "var(--flag)" }}>{item.from}</div>
                  <p className="mt-3 text-xs leading-relaxed" style={{ color: "var(--gravel)" }}>{item.detail}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full py-20 md:py-28" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <SectionHeading
            eyebrow="How it works"
            title={<>A short process with clear accountability.</>}
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {process.map((step, index) => (
              <div key={step} className="apple-card-flat p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--flag)" }}>0{index + 1}</div>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--gravel)" }}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Tell me what needs to work — and what needs to be built."
        text="Whether it’s a software problem, an infrastructure bottleneck or an AI workflow to automate, I can help scope it and move it forward."
        cta={{ label: "Start a conversation", href: "/contact" }}
        waMessage={whatsappCtaMessage("general")}
      />
    </>
  );
}
