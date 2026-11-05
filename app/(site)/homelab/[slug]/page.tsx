import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import {
  getHomelabItem,
  getRelatedHomelabItems,
  homelabItems,
} from "@/lib/homelab-data";
import { HomelabDetailPage } from "@/app/Components/site/homelab-detail";

export function generateStaticParams() {
  return homelabItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getHomelabItem(slug);
  if (!item) return { title: "Not Found" };

  return pageMeta({
    title: `${item.name} — Homelab`,
    description: item.description,
    path: `/homelab/${item.slug}`,
    keywords: [
      item.name,
      item.model,
      item.os,
      item.dockerWrapper,
      "homelab",
      "self-hosted",
    ],
  });
}

export default async function HomelabNodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getHomelabItem(slug);
  if (!item) notFound();

  const related = getRelatedHomelabItems(item);

  return <HomelabDetailPage item={item} related={related} />;
}
