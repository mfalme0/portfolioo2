import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMeta, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { CaseStudyPage } from "@/app/Components/site/case-study-page";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return pageMeta({
    title: `${study.title} — Case Study`,
    description: study.summary,
    path: `/case-studies/${study.slug}`,
    keywords: study.tags,
  });
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            articleJsonLd({
              path: `/case-studies/${study.slug}`,
              headline: study.title,
              description: study.summary,
              datePublished: "2026-01-01",
              dateModified: "2026-09-10",
              keywords: study.tags,
            }),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Case Studies", path: "/case-studies" },
              { name: study.title, path: `/case-studies/${study.slug}` },
            ]),
          ]),
        }}
      />
      <CaseStudyPage study={study} />
    </>
  );
}