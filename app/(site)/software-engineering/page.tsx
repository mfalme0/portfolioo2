import React from "react";
import type { Metadata } from "next";
import { pageMeta, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { ServicePage } from "@/app/Components/site/service-page";
import { servicePages } from "@/lib/service-pages";

export const metadata: Metadata = pageMeta({
  title: "Custom Software Engineering in Nairobi — ERP, Portals, APIs",
  description:
    "Custom ERP and business systems, portals, dashboards, APIs and integrations — designed around how your organisation works. From KSh 100,000.",
  path: "/software-engineering",
  keywords: ["software engineer Nairobi", "custom ERP Kenya", "business systems", "API development Kenya"],
});

export default function SoftwareEngineeringPage() {
  const config = servicePages["/software-engineering"];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd("/software-engineering", "Software Engineering", config.lead),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "Software Engineering", path: "/software-engineering" },
            ]),
          ]),
        }}
      />
      <ServicePage config={config} />
    </>
  );
}