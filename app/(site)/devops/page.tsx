import React from "react";
import type { Metadata } from "next";
import { pageMeta, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { ServicePage } from "@/app/Components/site/service-page";
import { servicePages } from "@/lib/service-pages";

export const metadata: Metadata = pageMeta({
  title: "DevOps & Deployment Automation in Nairobi — CI/CD Pipelines",
  description:
    "CI/CD pipelines, automation scripts and reproducible environments that replaced manual releases — and cut deployment errors by 45%.",
  path: "/devops",
  keywords: ["DevOps Nairobi", "CI/CD Kenya", "deployment automation", "pipeline engineer Kenya"],
});

export default function DevopsPage() {
  const config = servicePages["/devops"];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd("/devops", "DevOps", config.lead),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "DevOps", path: "/devops" },
            ]),
          ]),
        }}
      />
      <ServicePage config={config} />
    </>
  );
}