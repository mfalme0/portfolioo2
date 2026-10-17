import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import {
  getSetupCategory,
  getSetupDevice,
  setupDevices,
} from "@/lib/setup-data";
import { SetupDevicePage } from "@/app/Components/site/setup-pages";

export function generateStaticParams() {
  return setupDevices.map(({ category, slug }) => ({ category, device: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; device: string }>;
}): Promise<Metadata> {
  const { category: categorySlug, device: deviceSlug } = await params;
  const device = getSetupDevice(categorySlug, deviceSlug);
  if (!device) return { title: "Not Found" };

  return pageMeta({
    title: `${device.name} — My Setup`,
    description: device.summary,
    path: `/setup/${categorySlug}/${deviceSlug}`,
    keywords: [device.brand, device.model, "peripheral", "my setup"].filter(Boolean),
  });
}

export default async function SetupDeviceRoute({
  params,
}: {
  params: Promise<{ category: string; device: string }>;
}) {
  const { category: categorySlug, device: deviceSlug } = await params;
  const category = getSetupCategory(categorySlug);
  const device = getSetupDevice(categorySlug, deviceSlug);
  if (!category || !device) notFound();

  return <SetupDevicePage category={category} device={device} />;
}
