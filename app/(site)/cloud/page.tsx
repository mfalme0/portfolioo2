import React from "react";
import type { Metadata } from "next";
import { pageMeta, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { ServicePage } from "@/app/Components/site/service-page";
import { servicePages } from "@/lib/service-pages";

export const metadata: Metadata = pageMeta({
  title: "Cloud & DevOps — Azure, Docker, Kubernetes, CI/CD in Nairobi",
  description:
    "Azure cloud infrastructure, containers, CI/CD and cost optimisation — operated with discipline. Cloud costs cut by 20%, deployment errors down 45%.",
  path: "/cloud",
  keywords: ["Azure Kenya", "cloud cost optimisation Nairobi", "devops engineer Kenya", "Docker Kubernetes Nairobi"],
});

export default function CloudPage() {
  const config = servicePages["/cloud"];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd("/cloud", "Cloud & DevOps", config.lead),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "Cloud & DevOps", path: "/cloud" },
            ]),
          ]),
        }}
      />
      <ServicePage config={config} />
    </>
  );
}