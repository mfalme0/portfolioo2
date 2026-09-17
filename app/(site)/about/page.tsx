import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { whatsappCtaMessage } from "@/lib/cta-messages";
import { PageHero } from "@/app/Components/site/page-hero";
import { CtaBand } from "@/app/Components/site/cta-band";
import AboutMe from "@/app/Components/main/about";
import Competencies from "@/app/Components/main/competencies";
import Education from "@/app/Components/main/education";
import Skills from "@/app/Components/main/skills";
import ProgrammingLanguages from "@/app/Components/main/languages";
import TechStack from "@/app/Components/main/techstack";

export const metadata: Metadata = pageMeta({
  title: "About Joseph Gitau Chege — Software Engineer & Systems Architect",
  description:
    "Joseph Gitau Chege is a software engineer, systems architect and IT professional from Nairobi — C#, Python, TypeScript, Azure, Docker, infrastructure and AI, holding 99.9% uptime in production.",
  path: "/about",
  keywords: ["Joseph Gitau Chege", "software engineer Nairobi", "systems architect Kenya"],
});

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPageJsonLd("/about", "About Joseph Gitau Chege", metadata.description ?? ""),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ]),
          ]),
        }}
      />
      <PageHero
        eyebrow="About Joseph"
        title={<>Field engineer for systems that <span style={{ color: "var(--flag)" }}>stay up.</span></>}
        lead="Software engineering, systems architecture, IT and cloud from Nairobi — with the evidence trail to back every claim. Here's the background, the competencies and the working method."
        crumbs={[{ name: "Home", path: "/" }, { name: "About" }]}
        meta={["B.Sc. Computer Science", "Nairobi, Kenya", "99.9% uptime delivered"]}
        whatsappMessage={whatsappCtaMessage("general")}
      />

      <AboutMe />
      <Competencies />
      <Education />
      <Skills />
      <ProgrammingLanguages />
      <TechStack />

      <section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="apple-card-flat p-7">
            <span className="apple-eyebrow-accent">Two ways to work together</span>
            <h3 className="text-xl font-semibold tracking-tight mt-3" style={{ color: "var(--fg)" }}>
              Hire Joseph as an engineer.
            </h3>
            <p className="text-sm leading-relaxed mt-2" style={{ color: "var(--gravel)" }}>
              Full-time or contract engineering depth in backend systems, cloud and reliability. Start with the
              résumé and the work ledger.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="/Joseph_Chege.pdf" target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--flag)" }}>
                Download Résumé →
              </a>
              <Link href="/work" className="font-mono text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--flag)" }}>
                See the Work Ledger →
              </Link>
            </div>
          </div>
          <div className="apple-card-flat p-7" style={{ background: "var(--sheet-2)" }}>
            <span className="apple-eyebrow-accent">Or hire Joseph&apos;s services.</span>
            <h3 className="text-xl font-semibold tracking-tight mt-3" style={{ color: "var(--fg)" }}>
              Bring a technical problem.
            </h3>
            <p className="text-sm leading-relaxed mt-2" style={{ color: "var(--gravel)" }}>
              Software, IT & infrastructure, AI & automation, custom PCs and technical leadership are the
              commercial side of the same skill set.
            </p>
            <div className="mt-5">
              <Link href="/services" className="font-mono text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--flag)" }}>
                Explore Services →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Curious whether your problem fits?"
        text="The free first conversation settles it — about the work, the evidence, and what's realistic for your situation."
        cta={{ label: "Start a Conversation", href: "/contact" }}
        waMessage={whatsappCtaMessage("general")}
      />
    </>
  );
}