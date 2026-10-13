import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta, webPageJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { caseStudies } from "@/lib/case-studies";
import { guides } from "@/lib/guides";
import { whatsappCtaMessage } from "@/lib/cta-messages";
import { SectionHeading } from "@/app/Components/site/section-heading";
import { CtaLink, CtaAnchor } from "@/app/Components/site/buttons";
import { CaseStudyCard, GuideCard, MetricCard } from "@/app/Components/site/cards";
import { CtaBand } from "@/app/Components/site/cta-band";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Joseph Gitau Chege — Software Engineer & Technical Leader",
    description:
      "Software engineer and technical leader in Nairobi building reliable systems, ERP platforms, cloud infrastructure and automation for growing teams.",
    path: "/",
  }),
  title: { absolute: "Joseph Gitau Chege — Software Engineer & Technical Leader" },
};

const quickStats = [
  { value: "4", label: "Teams led" },
  { value: "99.9%", label: "Uptime" },
  { value: "15+ hrs", label: "Saved / week" },
  { value: "2021", label: "Career start" },
];

const homeFaqs = [
  {
    q: "What kind of work do you do?",
    a: "I design and deliver software, cloud and infrastructure systems for schools, businesses and growing teams — from ERP and operations tooling to automation and technical leadership.",
  },
  {
    q: "Are you available for full-time or contract roles?",
    a: "Both. I’m open to senior engineering, platform and technical leadership roles, as well as project-based delivery for teams that need an experienced technologist.",
  },
  {
    q: "Can you help beyond the software layer?",
    a: "Yes. My work spans application architecture, DevOps, cloud operations, monitoring, network planning and the operational systems behind business delivery.",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPageJsonLd("/", "Joseph Gitau Chege — Software Engineer & Technical Leader", metadata.description ?? ""),
            breadcrumbJsonLd([{ name: "Home", path: "/" }]),
            faqJsonLd(homeFaqs),
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "@id": siteConfig.url,
              name: siteConfig.name,
              description: siteConfig.positioning,
              url: siteConfig.url,
              image: `${siteConfig.url}/opengraph-image`,
              telephone: siteConfig.phoneRaw,
              email: siteConfig.email,
              priceRange: "KSh 15,000 - KSh 100,000",
              currenciesAccepted: "KES",
              paymentAccepted: "Cash, M-Pesa, Bank Transfer",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Nairobi",
                addressRegion: "Nairobi County",
                addressCountry: "KE",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -1.2921,
                longitude: 36.8219,
              },
              areaServed: siteConfig.areas,
              founder: {
                "@type": "Person",
                name: siteConfig.name,
                url: `${siteConfig.url}/hire`,
              },
              sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin, siteConfig.socials.instagram],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: siteConfig.phoneRaw,
                contactType: "sales",
                areaServed: "KE",
                availableLanguage: ["en", "sw"],
              },
            },
          ]),
        }}
      />

      <section className="relative w-full overflow-hidden section-grid" style={{ backgroundColor: "var(--paper)" }}>
        <div className="absolute top-20 right-[-8%] h-[60vh] w-[45vw] rounded-full blur-3xl opacity-20" style={{ background: "var(--flag)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 py-28 md:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.18em]" style={{ borderColor: "var(--color-border)", color: "var(--flag)" }}>
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: "var(--flag)" }} />
                Nairobi • Available for senior delivery and consulting work
              </div>

              <h1 className="mt-6 text-[clamp(2.8rem,7vw,6rem)] leading-[0.94] tracking-[-0.04em] font-display" style={{ color: "var(--fg)" }}>
                I design and ship software, systems, and infrastructure that teams can trust.
              </h1>

              <p className="mt-6 max-w-xl text-[15px] md:text-base leading-relaxed" style={{ color: "var(--gravel)" }}>
                I build ERP platforms, internal operations systems, cloud infrastructure and automation for schools, businesses and growing teams.
                My work sits at the intersection of product, engineering and operations.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <CtaLink href="/hire" label="Hire me" />
                <CtaLink href="/work-with-me" label="Work with me" variant="ghost" />
                <CtaAnchor href={whatsappLink(whatsappCtaMessage("general"))} label="WhatsApp" variant="ghost" external />
              </div>

              <p className="mt-6 text-[10px] font-mono uppercase tracking-[0.18em]" style={{ color: "var(--gravel)" }}>
                Led four engineering teams • Shipped a school ERP • Built mobile-to-ERP integrations
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="apple-card-flat p-5 md:p-6">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-[0.18em]" style={{ color: "var(--flag)" }}>
                    Delivery snapshot
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.18em]" style={{ color: "var(--gravel)" }}>
                    2026
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {quickStats.map((stat) => (
                    <div key={stat.label} className="rounded-[2px] border p-4" style={{ borderColor: "var(--color-border)" }}>
                      <div className="font-display text-3xl font-bold" style={{ color: "var(--fg)" }}>{stat.value}</div>
                      <div className="mt-2 text-[9px] font-mono uppercase tracking-[0.14em]" style={{ color: "var(--gravel)" }}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[2px] border p-4" style={{ borderColor: "var(--color-border)", background: "var(--sheet-2)" }}>
                  <div className="text-[9px] font-mono uppercase tracking-[0.18em]" style={{ color: "var(--flag)" }}>
                    Core strengths
                  </div>
                  <ul className="mt-3 space-y-2 text-xs leading-relaxed" style={{ color: "var(--gravel)" }}>
                    <li>• ERP, workflow automation and internal business systems</li>
                    <li>• Cloud infrastructure, observability and incident response</li>
                    <li>• System architecture and technical leadership</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full py-18 md:py-24" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <SectionHeading
            eyebrow="Choose your path"
            title={<>Two ways to work with me.</>}
            lead="Whether you need a leader for your team or a builder for your business, the process is clear and the responsibility stays tight."
          />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Link href="/hire" className="group block h-full">
              <div className="apple-card-flat p-7 h-full transition-transform duration-300 group-hover:-translate-y-1">
                <span className="apple-eyebrow-accent">Hire me</span>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight" style={{ color: "var(--fg)" }}>
                  Senior software engineering &amp; leadership.
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--gravel)" }}>
                  Full-time, senior and lead roles for teams that need someone to own architecture, delivery and technical direction.
                </p>
                <div className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--flag)" }}>
                  View hire page →
                </div>
              </div>
            </Link>

            <Link href="/work-with-me" className="group block h-full">
              <div className="apple-card-flat p-7 h-full transition-transform duration-300 group-hover:-translate-y-1">
                <span className="apple-eyebrow-accent">Work with me</span>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight" style={{ color: "var(--fg)" }}>
                  Fractional delivery, consulting &amp; systems work.
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--gravel)" }}>
                  Product-minded delivery for custom software, internal systems, AI workflows, audits and infrastructure improvements.
                </p>
                <div className="mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--flag)" }}>
                  View services →
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative w-full py-20 md:py-28" style={{ backgroundColor: "var(--sheet-2)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <SectionHeading
            eyebrow="Selected work"
            title={<>A track record in real operations.</>}
            lead="ERP delivery, integrations, automation and infrastructure work where the outcome mattered more than the demo."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {caseStudies.slice(0, 3).map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full py-20 md:py-28" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <SectionHeading
            eyebrow="Leadership & results"
            title={<>Technical direction that holds under pressure.</>}
            lead="I’ve led cross-functional engineering teams, owned production operations, and turned messy operational work into reliable digital systems."
          />

          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3">
            <MetricCard value="99.9%" label="Uptime" detail="Delivered across live production systems and services." />
            <MetricCard value="20%" label="Cloud savings" detail="Optimised Azure cost and operational overhead." />
            <MetricCard value="45%" label="Fewer deploy errors" detail="Replaced fragile manual steps with CI/CD and automation." />
            <MetricCard value="15+hrs" label="Saved weekly" detail="Manual admin and ops tasks removed through automation." />
          </div>
        </div>
      </section>

      <section className="relative w-full py-20 md:py-28" style={{ backgroundColor: "var(--sheet-2)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <div className="flex items-center justify-between gap-4 mb-10">
            <SectionHeading
              eyebrow="Writing"
              title={<>Notes from the work.</>}
            />
            <Link href="/blog" className="hidden md:inline-flex font-mono text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--flag)" }}>
              All writing →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {guides.slice(0, 3).map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Need someone who can own the technical side end-to-end?"
        text="I help teams scope the problem, design the system, ship the build and keep it stable after launch."
        cta={{ label: "Start a conversation", href: "/contact" }}
        waMessage={whatsappCtaMessage("general")}
      />
    </>
  );
}
