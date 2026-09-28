import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";

/**
 * RSS 2.0 feed for the blog. Hand-rolled to avoid adding a dependency.
 * Prerendered at build time by the App Router.
 */

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function cdata(value: string): string {
  // Split any literal CDATA terminator so post text cannot break the section.
  return `<![CDATA[${value.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

export function GET() {
  const posts = getAllPosts();
  const lastBuildDate = (posts[0]?.dateModified ?? new Date().toISOString().slice(0, 10));

  const items = posts
    .map((post) => {
      const url = `${siteConfig.url}/blog/${post.slug}`;
      const categories = post.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join("\n");

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${post.datePublished}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${cdata(post.description)}</description>
${categories}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)} — Blog</title>
    <link>${siteConfig.url}/blog</link>
    <description>${escapeXml("Build logs, post-mortems and architecture notes from real systems work in Nairobi, Kenya.")}</description>
    <language>en</language>
    <lastBuildDate>${new Date(`${lastBuildDate}T00:00:00Z`).toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/blog/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
