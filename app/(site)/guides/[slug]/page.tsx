import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMeta, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { guides, getGuide } from "@/lib/guides";
import { GuideArticle } from "@/app/Components/site/guide-article";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return pageMeta({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    publishedTime: guide.datePublished,
    modifiedTime: guide.dateModified,
    keywords: guide.tags,
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            articleJsonLd({
              path: `/guides/${guide.slug}`,
              headline: guide.title,
              description: guide.description,
              datePublished: guide.datePublished,
              dateModified: guide.dateModified,
              keywords: guide.tags,
            }),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides" },
              { name: guide.title, path: `/guides/${guide.slug}` },
            ]),
          ]),
        }}
      />
      <GuideArticle guide={guide} />
    </>
  );
}