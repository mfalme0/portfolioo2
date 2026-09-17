import React from "react";
import type { Metadata } from "next";
import { pageMeta, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { ServicePage } from "@/app/Components/site/service-page";
import { servicePages } from "@/lib/service-pages";

export const metadata: Metadata = pageMeta({
  title: "Fractional CTO & Technical Leadership in Nairobi",
  description:
    "Fractional CTO, technology strategy, architecture reviews and engineering leadership — senior direction without the full-time hire. From KSh 50,000/month.",
  path: "/technical-leadership",
  keywords: ["fractional CTO Kenya", "technical leadership Nairobi", "architecture review Kenya", "CTO for startups"],
});

export default function TechnicalLeadershipPage() {
  const config = servicePages["/technical-leadership"];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd("/technical-leadership", "Technical Leadership", config.lead),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "Technical Leadership", path: "/technical-leadership" },
            ]),
          ]),
        }}
      />
      <ServicePage config={config} />
    </>
  );
}