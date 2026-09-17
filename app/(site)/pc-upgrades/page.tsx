import React from "react";
import type { Metadata } from "next";
import { pageMeta, serviceJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { PcPage } from "@/app/Components/site/pc-page";
import { pcPages } from "@/lib/pc-pages";

export const metadata: Metadata = pageMeta({
  title: "PC Upgrades in Nairobi — SSD, RAM, GPU & CPU, Diagnosed First",
  description:
    "PC upgrades planned around the measured bottleneck, not the newest part: SSD, RAM, GPU and CPU upgrades in Nairobi with diagnosis first.",
  path: "/pc-upgrades",
  keywords: ["PC upgrade Nairobi", "SSD upgrade Kenya", "RAM upgrade Kenya", "GPU upgrade Nairobi"],
});

export default function PcUpgradesPage() {
  const config = pcPages["/pc-upgrades"];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd("/pc-upgrades", "PC Upgrades", config.lead),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Custom PC Building", path: "/pc-building" },
              { name: "PC Upgrades", path: "/pc-upgrades" },
            ]),
            faqJsonLd(config.faqs),
          ]),
        }}
      />
      <PcPage config={config} />
    </>
  );
}