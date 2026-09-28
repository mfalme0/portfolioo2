import type { MetadataRoute } from "next";
import { BASE_URL, getSitemapEntries } from "@/lib/sitemap";

/**
 * XML sitemap for all indexable routes.
 *
 * The route list lives in `lib/sitemap.ts` so this file and the human-readable
 * `/sitemap` page can never disagree.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapEntries().map((entry) => ({
    url: `${BASE_URL}${entry.path}`,
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
