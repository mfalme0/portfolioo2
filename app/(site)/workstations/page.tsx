import React from "react";
import type { Metadata } from "next";
import { pageMeta, serviceJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { PcPage } from "@/app/Components/site/pc-page";
import { pcPages } from "@/lib/pc-pages";

export const metadata: Metadata = pageMeta({
  title: "Developer & AI Workstations in Nairobi — Dev, Docker, VMs, Local LLMs",
  description:
    "Workstations for software development, Docker and Kubernetes, virtual machines and local AI — where RAM, cores and storage decide whether work waits on the machine.",
  path: "/workstations",
  keywords: ["developer workstation Kenya", "AI workstation Nairobi", "Docker workstation build", "best PC for programming Kenya"],
});

export default function WorkstationsPage() {
  const config = pcPages["/workstations"];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd("/workstations", "Developer & AI Workstations", config.lead),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Custom PC Building", path: "/pc-building" },
              { name: "Developer & AI Workstations", path: "/workstations" },
            ]),
            faqJsonLd(config.faqs),
          ]),
        }}
      />
      <PcPage config={config} />
    </>
  );
}