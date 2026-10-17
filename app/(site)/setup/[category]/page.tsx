import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { getSetupCategory, setupCategories } from "@/lib/setup-data";
import { SetupCategoryPage } from "@/app/Components/site/setup-pages";

export function generateStaticParams() {
  return setupCategories.map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getSetupCategory(slug);
  if (!category) return { title: "Not Found" };

  return pageMeta({
    title: `${category.name} I Use — My Setup`,
    description: category.detail,
    path: `/setup/${category.slug}`,
    keywords: [category.name.toLowerCase(), "my setup", "peripherals"],
  });
}

export default async function SetupCategoryRoute({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getSetupCategory(slug);
  if (!category) notFound();

  return <SetupCategoryPage category={category} />;
}
