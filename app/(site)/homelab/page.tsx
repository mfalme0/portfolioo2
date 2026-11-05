import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { homelabItems } from "@/lib/homelab-data";
import { HomelabIndexPage } from "@/app/Components/site/homelab-pages";

export const metadata: Metadata = pageMeta({
  title: "Homelab — Self-Hosted Infrastructure",
  description:
    "The self-hosted infrastructure behind this site: two low-power nodes running Docker, media automation, home automation, backups and monitoring around the clock.",
  path: "/homelab",
  keywords: [
    "homelab",
    "self-hosted",
    "home server",
    "Docker",
    "CasaOS",
    "Debian",
    "media server",
    "home automation",
    "Nairobi",
  ],
});

export default function HomelabPage() {
  return <HomelabIndexPage items={homelabItems} />;
}
