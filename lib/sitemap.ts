import { guides } from "./guides";
import { caseStudies } from "./case-studies";
import { homelabItems } from "./homelab-data";
import { getAllPosts } from "./blog";

/**
 * Single source of truth for every indexable route on the site.
 *
 * Consumed by `app/sitemap.ts` (XML), the human-readable `/sitemap` page, and
 * anything else that needs to know what exists. Adding a page means adding it
 * here once rather than hand-editing two lists that will drift.
 *
 * `lastModified` is deliberate per entry:
 *   - content with a real date (guides, blog posts) uses that date
 *   - everything else uses BUILD_DATE, a single timestamp captured when this
 *     module is first evaluated, so every URL in a given build reports the
 *     same value instead of `new Date()` per row
 */

export const BASE_URL = "https://mfalme.runs-on.dev";

/** Stable within a single build. */
export const BUILD_DATE = new Date();

export type ChangeFrequency = "daily" | "weekly" | "monthly" | "yearly";

export interface SitemapEntry {
  path: string;
  lastModified: Date;
  changeFrequency: ChangeFrequency;
  priority: number;
}

export interface SitemapGroup {
  title: string;
  description: string;
  entries: { path: string; lastModified: Date; note?: string }[];
}

function staticRoute(
  path: string,
  changeFrequency: ChangeFrequency,
  priority: number
): SitemapEntry {
  return { path, lastModified: BUILD_DATE, changeFrequency, priority };
}

export function getSitemapEntries(): SitemapEntry[] {
  const staticRoutes: SitemapEntry[] = [
    staticRoute("/", "weekly", 1),
    staticRoute("/services", "weekly", 0.9),
    staticRoute("/pc-building", "weekly", 0.9),
    staticRoute("/software-engineering", "monthly", 0.8),
    staticRoute("/it-consulting", "monthly", 0.8),
    staticRoute("/infrastructure", "monthly", 0.8),
    staticRoute("/cloud", "monthly", 0.8),
    staticRoute("/devops", "monthly", 0.8),
    staticRoute("/ai-automation", "monthly", 0.8),
    staticRoute("/technical-leadership", "monthly", 0.8),
    staticRoute("/gaming-pcs", "monthly", 0.8),
    staticRoute("/workstations", "monthly", 0.8),
    staticRoute("/pc-upgrades", "monthly", 0.7),
    staticRoute("/pc-troubleshooting", "monthly", 0.7),
    staticRoute("/pc-consulting", "monthly", 0.7),
    staticRoute("/case-studies", "monthly", 0.7),
    staticRoute("/guides", "weekly", 0.7),
    staticRoute("/blog", "daily", 0.8),
    staticRoute("/resources", "monthly", 0.6),
    staticRoute("/tools/pc-build", "monthly", 0.6),
    staticRoute("/tools/infrastructure-check", "monthly", 0.6),
    staticRoute("/about", "monthly", 0.6),
    staticRoute("/work", "monthly", 0.6),
    staticRoute("/contact", "monthly", 0.8),
    staticRoute("/sitemap", "weekly", 0.3),
    staticRoute("/homelab", "weekly", 0.7),
    staticRoute("/LAN", "weekly", 0.6),
    staticRoute("/privacy", "yearly", 0.3),
    staticRoute("/terms", "yearly", 0.3),
    staticRoute("/cookies", "yearly", 0.3),
  ];

  const guideRoutes: SitemapEntry[] = guides.map((g) => ({
    path: `/guides/${g.slug}`,
    lastModified: new Date(g.dateModified),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Drafts are already excluded by getAllPosts().
  const blogRoutes: SitemapEntry[] = getAllPosts().map((p) => ({
    path: `/blog/${p.slug}`,
    lastModified: new Date(p.dateModified),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const caseStudyRoutes: SitemapEntry[] = caseStudies.map((c) => ({
    path: `/case-studies/${c.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const homelabRoutes: SitemapEntry[] = homelabItems.map((item) => ({
    path: `/homelab/${item.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...guideRoutes,
    ...caseStudyRoutes,
    ...homelabRoutes,
  ];
}

/** Human-readable grouping for the HTML sitemap page. */
export function getSitemapGroups(): SitemapGroup[] {
  const posts = getAllPosts();
  const postPath = (slug: string) => `/blog/${slug}`;

  return [
    {
      title: "Core",
      description: "The main entry points and commercial pages.",
      entries: [
        { path: "/", lastModified: BUILD_DATE },
        { path: "/services", lastModified: BUILD_DATE },
        { path: "/contact", lastModified: BUILD_DATE },
        { path: "/about", lastModified: BUILD_DATE },
        { path: "/work", lastModified: BUILD_DATE },
        { path: "/resources", lastModified: BUILD_DATE },
        { path: "/sitemap", lastModified: BUILD_DATE },
      ],
    },
    {
      title: "Services",
      description: "Engineering, infrastructure and consulting engagements.",
      entries: [
        "/software-engineering",
        "/it-consulting",
        "/infrastructure",
        "/cloud",
        "/devops",
        "/ai-automation",
        "/technical-leadership",
      ].map((path) => ({ path, lastModified: BUILD_DATE })),
    },
    {
      title: "PC Building",
      description: "Custom builds, gaming systems, workstations and upgrades.",
      entries: [
        "/pc-building",
        "/gaming-pcs",
        "/workstations",
        "/pc-upgrades",
        "/pc-troubleshooting",
        "/pc-consulting",
      ].map((path) => ({ path, lastModified: BUILD_DATE })),
    },
    {
      title: "Blog",
      description: "Longer write-ups: build logs, post-mortems and architecture notes.",
      entries: posts.map((p) => ({
        path: postPath(p.slug),
        lastModified: new Date(p.dateModified),
        note: p.readingTime,
      })),
    },
    {
      title: "Guides",
      description: "Task-focused how-tos answering specific questions.",
      entries: guides.map((g) => ({
        path: `/guides/${g.slug}`,
        lastModified: new Date(g.dateModified),
        note: g.cluster,
      })),
    },
    {
      title: "Case Studies",
      description: "Evidence of method, drawn from delivered work.",
      entries: caseStudies.map((c) => ({
        path: `/case-studies/${c.slug}`,
        lastModified: BUILD_DATE,
        note: c.kind,
      })),
    },
    {
      title: "Lab & Archive",
      description: "Personal infrastructure I run, and the local network archive.",
      entries: [
        { path: "/homelab", lastModified: BUILD_DATE, note: "Home lab" },
        ...homelabItems.map((item) => ({
          path: `/homelab/${item.slug}`,
          lastModified: BUILD_DATE,
          note: item.name,
        })),
        { path: "/LAN", lastModified: BUILD_DATE, note: "LAN archive" },
      ],
    },
    {
      title: "Tools",
      description: "Free self-assessment and configuration questionnaires.",
      entries: [
        { path: "/tools/pc-build", lastModified: BUILD_DATE },
        { path: "/tools/infrastructure-check", lastModified: BUILD_DATE },
      ],
    },
    {
      title: "Legal",
      description: "Privacy, terms and cookie policy.",
      entries: [
        { path: "/privacy", lastModified: BUILD_DATE },
        { path: "/terms", lastModified: BUILD_DATE },
        { path: "/cookies", lastModified: BUILD_DATE },
      ],
    },
  ];
}
