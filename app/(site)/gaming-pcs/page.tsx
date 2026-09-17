import React from "react";
import type { Metadata } from "next";
import { pageMeta, serviceJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { PcPage } from "@/app/Components/site/pc-page";
import { pcPages } from "@/lib/pc-pages";

export const metadata: Metadata = pageMeta({
  title: "Custom Gaming PCs in Nairobi — 1080p, 1440p, 4K & Esports Builds",
  description:
    "Gaming PCs built around your games, resolution and budget — 1080p, 1440p high-refresh, 4K, esports and streaming rigs, stress-tested before delivery in Nairobi.",
  path: "/gaming-pcs",
  keywords: ["gaming PC Nairobi", "gaming computer Kenya", "esports PC Kenya", "4K gaming PC build"],
});

export default function GamingPcsPage() {
  const config = pcPages["/gaming-pcs"];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd("/gaming-pcs", "Gaming PCs", config.lead),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Custom PC Building", path: "/pc-building" },
              { name: "Gaming PCs", path: "/gaming-pcs" },
            ]),
            faqJsonLd(config.faqs),
          ]),
        }}
      />
      <PcPage config={config} />
    </>
  );
}