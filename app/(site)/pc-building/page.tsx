import React from "react";
import type { Metadata } from "next";
import { pageMeta, serviceJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { PcPage } from "@/app/Components/site/pc-page";
import { pcPages } from "@/lib/pc-pages";

export const metadata: Metadata = pageMeta({
  title: "Custom PC Building in Nairobi — Gaming, Developer & AI Workstations",
  description:
    "Custom PCs designed around what you actually do: gaming rigs, developer and AI workstations, content creation machines and business desktops, built and stress-tested in Nairobi.",
  path: "/pc-building",
  keywords: ["custom PC builder Nairobi", "build a PC Kenya", "gaming PC builder Kenya", "PC builders Nairobi"],
});

export default function PcBuildingPage() {
  const config = pcPages["/pc-building"];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd("/pc-building", "Custom PC Building", config.lead),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Custom PC Building", path: "/pc-building" },
            ]),
            faqJsonLd(config.faqs),
          ]),
        }}
      />
      <PcPage config={config} />
    </>
  );
}