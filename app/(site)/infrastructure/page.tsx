import React from "react";
import type { Metadata } from "next";
import { pageMeta, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { ServicePage } from "@/app/Components/site/service-page";
import { servicePages } from "@/lib/service-pages";

export const metadata: Metadata = pageMeta({
  title: "IT & Network Infrastructure — Linux, Storage, Backups in Nairobi",
  description:
    "Servers, storage, networking, backups and monitoring — infrastructure designed, built and operated from the ground up for Nairobi businesses.",
  path: "/infrastructure",
  keywords: ["IT infrastructure Kenya", "Linux server administrator Nairobi", "network engineer Kenya", "backup solutions Nairobi"],
});

export default function InfrastructurePage() {
  const config = servicePages["/infrastructure"];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd("/infrastructure", "IT & Infrastructure", config.lead),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "Infrastructure", path: "/infrastructure" },
            ]),
          ]),
        }}
      />
      <ServicePage config={config} />
    </>
  );
}