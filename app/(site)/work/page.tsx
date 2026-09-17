import React from "react";
import type { Metadata } from "next";
import { pageMeta, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { whatsappCtaMessage } from "@/lib/cta-messages";
import { CtaBand } from "@/app/Components/site/cta-band";
import { Hero } from "@/app/Components/main/hero";
import { WorkExperience } from "@/app/Components/main/mboka";
import { Projects } from "@/app/Components/main/projects";
import PersonalProjects from "@/app/Components/main/personal-projects";
import Github from "@/app/Components/main/github";

export const metadata: Metadata = pageMeta({
  title: "Work — Projects, Experience & Systems by Joseph Gitau Chege",
  description:
    "The work ledger: production backend systems, a full-stack school ERP, on-premises infrastructure, automation and personal engineering projects by Joseph Gitau Chege.",
  path: "/work",
  keywords: ["Joseph Gitau Chege portfolio", "software projects Kenya", "infrastructure engineer projects"],
});

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPageJsonLd("/work", "Work & Projects", metadata.description ?? ""),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Work", path: "/work" },
            ]),
          ]),
        }}
      />
      <Hero />
      <WorkExperience />
      <Projects />
      <PersonalProjects />
      <Github />

      <CtaBand
        title="The pattern behind the work: understand, build, measure."
        text="Whether it's your own product or a problem your business needs solved, the method is the same. The free first conversation establishes where it applies."
        cta={{ label: "Talk About a Project", href: "/contact" }}
        waMessage={whatsappCtaMessage("general")}
      />
    </>
  );
}