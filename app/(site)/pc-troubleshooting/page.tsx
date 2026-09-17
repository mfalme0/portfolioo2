import React from "react";
import type { Metadata } from "next";
import { pageMeta, serviceJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { PcPage } from "@/app/Components/site/pc-page";
import { pcPages } from "@/lib/pc-pages";

export const metadata: Metadata = pageMeta({
  title: "PC Troubleshooting & Repair in Nairobi — Crashes, Heat, Boot Failures",
  description:
    "Diagnosis and repair for PC crashes, overheating, boot failures, strange noise and slow performance in Nairobi and surrounding areas — diagnosed, not guessed.",
  path: "/pc-troubleshooting",
  keywords: ["PC repair Nairobi", "computer troubleshooting Kenya", "PC crash fix", "overheating PC Nairobi"],
});

export default function PcTroubleshootingPage() {
  const config = pcPages["/pc-troubleshooting"];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd("/pc-troubleshooting", "PC Troubleshooting", config.lead),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Custom PC Building", path: "/pc-building" },
              { name: "PC Troubleshooting", path: "/pc-troubleshooting" },
            ]),
            faqJsonLd(config.faqs),
          ]),
        }}
      />
      <PcPage config={config} />
    </>
  );
}