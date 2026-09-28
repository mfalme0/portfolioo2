import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/sitemap";

/**
 * robots.txt
 *
 * Every page on this site is public and intended to be indexed, so nothing is
 * disallowed. Non-HTML routes (`/blog/feed.xml`, `/blog/og`, `/blog/<slug>/og`,
 * `/opengraph-image`) are simply absent from the XML sitemap rather than being
 * blocked — `og:image` URLs must stay fetchable, and blocking them would break
 * link previews in Slack, WhatsApp and iMessage.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
