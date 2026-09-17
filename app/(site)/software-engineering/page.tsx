import React from "react";
import type { Metadata } from "next";
import { pageMeta, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { ServicePage } from "@/app/Components/site/service-page";
import { servicePages } from "@/lib/service-pages";

export const metadata: Metadata = pageMeta({
  title: "Software Developer in Nairobi, Kenya | Backend Systems, APIs & Cloud Platforms",
  description:
    "Software developer in Nairobi building backend systems, business applications, APIs, cloud platforms, and production-ready software for organisations in Kenya.",
  path: "/software-engineering",
  keywords: [
    "software developer Nairobi",
    "software developer Kenya",
    "software engineer Nairobi",
    "backend developer Nairobi",
    "API developer Kenya",
    "custom software developer Kenya",
    "business software developer",
    "cloud software developer",
  ],
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