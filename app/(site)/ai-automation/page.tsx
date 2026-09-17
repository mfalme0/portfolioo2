import React from "react";
import type { Metadata } from "next";
import { pageMeta, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { ServicePage } from "@/app/Components/site/service-page";
import { servicePages } from "@/lib/service-pages";

export const metadata: Metadata = pageMeta({
  title: "AI & Business Automation in Nairobi — Workflows, Documents, Assistants",
  description:
    "Workflow automation, document processing and internal AI assistants built around a specific business result. Automation from KSh 40,000.",
  path: "/ai-automation",
  keywords: ["business automation Kenya", "AI automation Nairobi", "workflow automation", "AI for business Kenya"],
});

export default function AiAutomationPage() {
  const config = servicePages["/ai-automation"];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd("/ai-automation", "AI & Automation", config.lead),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "AI & Automation", path: "/ai-automation" },
            ]),
          ]),
        }}
      />
      <ServicePage config={config} />
    </>
  );
}