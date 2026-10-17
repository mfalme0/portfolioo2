import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { SetupIndexPage } from "@/app/Components/site/setup-pages";

export const metadata: Metadata = pageMeta({
  title: "My Setup — Peripherals I Use and Why",
  description:
    "A guide to the audio gear, keyboards, mice, monitors, mousepads, controllers and UPS in my setup, with notes on why I use each device.",
  path: "/setup",
  keywords: ["desk setup", "peripherals", "computer setup", "gear I use"],
});

export default function SetupPage() {
  return <SetupIndexPage />;
}
