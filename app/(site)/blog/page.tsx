import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta, blogJsonLd, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { getAllPosts, postsByTag, allTags } from "@/lib/blog";
import { guides } from "@/lib/guides";
import { whatsappCtaMessage } from "@/lib/cta-messages";
import { PageHero } from "@/app/Components/site/page-hero";
import { CtaBand } from "@/app/Components/site/cta-band";
import { MetricCard } from "@/app/Components/site/cards";
import { PostCard } from "@/app/Components/site/blog-card";
import { BlogEmptyState } from "@/app/Components/site/blog-empty-state";
import { FiArrowUpRight } from "react-icons/fi";

export const metadata: Metadata = pageMeta({
  title: "Blog — Notes From the Work",
  description:
    "Longer write-ups from Joseph Gitau Chege: build logs, post-mortems, architecture decisions and the reasoning behind systems that actually run.",
  path: "/blog",
  image: "https://mfalme.runs-on.dev/blog/og",
  keywords: ["tech blog", "engineering notes", "build log", "post-mortem", "Nairobi engineer"],
  rss: "/blog/feed.xml",
});

interface Props {
  searchParams: Promise<{ tag?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { tag } = await searchParams;
  const posts = getAllPosts();
  const tags = allTags();

  const requested = tag?.trim();
  const activeTag = requested
    ? tags.find((t) => t.tag.toLowerCase() === requested.toLowerCase())?.tag
    : undefined;

  const filtered = activeTag ? postsByTag(activeTag) : posts;
  const hasPosts = posts.length > 0;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPageJsonLd("/blog", "Blog", metadata.description ?? ""),
            blogJsonLd({
              path: "/blog",
              title: "Blog",
              description: metadata.description ?? "",
              posts: posts.map((p) => ({
                slug: p.slug,
                title: p.title,
                datePublished: p.datePublished,
                dateModified: p.dateModified,
              })),
            }),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
            ]),
          ]),
        }}
      />

      <PageHero
        eyebrow="Blog"
        title={<>Notes from <span style={{ color: "var(--flag)" }}>the work.</span></>}
        lead="The longer version: build logs, post-mortems, and the reasoning behind decisions that are too detailed for a guide. Written by someone who operates these systems daily."
        crumbs={[{ name: "Home", path: "/" }, { name: "Blog" }]}
        whatsappMessage={whatsappCtaMessage("general")}
        meta={["Nairobi, Kenya", "Written by Joseph Gitau Chege"]}
      />

      {hasPosts ? (
        <section className="relative w-full py-12 md:py-16" style={{ backgroundColor: "var(--paper)" }}>
          <div className="max-w-7xl mx-auto px-6 md:px-14">
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter posts by tag">
                <Link
                  href="/blog"
                  role="tab"
                  aria-selected={!activeTag}
                  className="rounded-full px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.1em] transition-all duration-200"
                  style={{
                    backgroundColor: activeTag ? "var(--sheet-2)" : "var(--flag)",
                    color: activeTag ? "var(--fg)" : "var(--paper)",
                    border: `1px solid ${activeTag ? "var(--rule)" : "var(--flag)"}`,
                  }}
                >
                  All Posts
                </Link>
                {tags.map(({ tag: t, count }) => {
                  const isActive = t === activeTag;
                  return (
                    <Link
                      key={t}
                      href={`/blog?tag=${encodeURIComponent(t)}`}
                      role="tab"
                      aria-selected={isActive}
                      className="rounded-full px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.1em] transition-all duration-200"
                      style={{
                        backgroundColor: isActive ? "var(--flag)" : "var(--sheet-2)",
                        color: isActive ? "var(--paper)" : "var(--fg)",
                        border: `1px solid ${isActive ? "var(--flag)" : "var(--rule)"}`,
                      }}
                    >
                      {t} ({count})
                    </Link>
                  );
                })}
              </div>
            )}

            <p className="mt-6 text-[10px] font-mono uppercase tracking-[0.1em]" style={{ color: "var(--gravel)" }}>
              {filtered.length} {filtered.length === 1 ? "post" : "posts"}
              {activeTag && ` tagged “${activeTag}”`}
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filtered.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-3">
              <MetricCard
                value={String(posts.length)}
                label="Posts published"
                detail="Build logs, post-mortems and architecture notes."
              />
              <MetricCard
                value={String(tags.length)}
                label="Topics covered"
                detail="From PC hardware to distributed systems."
              />
              <MetricCard
                value="RSS"
                label="Feed available"
                detail="Subscribe at /blog/feed.xml and never miss one."
              />
            </div>
          </div>
        </section>
      ) : (
        <BlogEmptyState />
      )}

      <section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--sheet-2)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <span className="apple-eyebrow">Prefer the practical version?</span>
          <h2 className="apple-heading-compact mt-4">Start with a guide.</h2>
          <p className="apple-subtitle text-sm leading-relaxed mt-4" style={{ maxWidth: "44rem" }}>
            The blog is the long version. The {guides.length} guides answer specific questions
            directly &mdash; what to buy, what to upgrade, whether a tool is worth it.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {(["PC Building", "IT Infrastructure", "Software Engineering", "AI & Automation"] as const).map(
              (cluster) => {
                const slug = cluster === "PC Building" ? "pc-building"
                  : cluster === "IT Infrastructure" ? "it-infrastructure"
                  : cluster === "Software Engineering" ? "software-engineering"
                  : "ai-automation";
                const count = guides.filter((g) => g.cluster === cluster).length;
                return (
                  <Link key={cluster} href={`/guides?cluster=${slug}`} className="group block h-full">
                    <div className="apple-card-flat p-6 h-full flex flex-col transition-transform duration-300 group-hover:-translate-y-1">
                      <span
                        className="text-[9px] font-mono font-bold tracking-[0.18em] uppercase"
                        style={{ color: "var(--flag)" }}
                      >
                        {count} {count === 1 ? "guide" : "guides"}
                      </span>
                      <h3 className="text-base font-semibold tracking-tight mt-2" style={{ color: "var(--fg)" }}>
                        {cluster}
                      </h3>
                      <span
                        className="mt-4 font-mono text-[10px] font-bold tracking-[0.14em] uppercase inline-flex items-center gap-1.5"
                        style={{ color: "var(--flag)" }}
                      >
                        Browse
                        <FiArrowUpRight className="text-xs" />
                      </span>
                    </div>
                  </Link>
                );
              }
            )}
          </div>
        </div>
      </section>

      <CtaBand
        title="Reading beats doing — but only up to a point."
        text="Where a post ends is where the real environment begins. A free conversation figures out which of it actually applies to your machine or business."
        cta={{ label: "Ask a Question", href: "/contact" }}
        waMessage={whatsappCtaMessage("general")}
      />
    </>
  );
}
