import React from "react";
import type { Metadata } from "next";
import { pageMeta, serviceJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { PcPage } from "@/app/Components/site/pc-page";
import { pcPages } from "@/lib/pc-pages";

export const metadata: Metadata = pageMeta({
  title: "PC Consulting & Component Advice in Nairobi — Build List Reviews",
  description:
    "Compatibility checks, prebuilt evaluation and direct component advice before you buy — a second pair of eyes on every shilling you're about to spend on PC parts.",
  path: "/pc-consulting",
  keywords: ["PC consultant Kenya", "component compatibility check", "prebuilt PC review", "custom PC advice Nairobi"],
});

export default function PcConsultingPage() {
  const config = pcPages["/pc-consulting"];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd("/pc-consulting", "PC Consulting", config.lead),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Custom PC Building", path: "/pc-building" },
              { name: "PC Consulting", path: "/pc-consulting" },
            ]),
            faqJsonLd(config.faqs),
          ]),
        }}
      />
      <PcPage config={config} />
    </>
  );
}