import React from "react";
import type { Metadata } from "next";
import { pageMeta, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { ServicePage } from "@/app/Components/site/service-page";
import { servicePages } from "@/lib/service-pages";

export const metadata: Metadata = pageMeta({
  title: "IT Consulting & Audits in Nairobi — Assessments, Planning, Ops",
  description:
    "IT audits, infrastructure planning, Linux administration, cloud cost control, networking, backups and monitoring — from KSh 15,000.",
  path: "/it-consulting",
  keywords: ["IT consulting Nairobi", "IT audit Kenya", "infrastructure assessment Kenya"],
});

export default function ItConsultingPage() {
  const config = servicePages["/it-consulting"];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd("/it-consulting", "IT Consulting", config.lead),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "IT Consulting", path: "/it-consulting" },
            ]),
          ]),
        }}
      />
      <ServicePage config={config} />
    </>
  );
}