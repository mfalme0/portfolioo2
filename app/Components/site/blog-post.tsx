import React from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/blog";
import { formatDate, relatedPosts, adjacentPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "./breadcrumbs";
import { CtaBand } from "./cta-band";
import { PostCard, PostCover } from "./blog-card";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export function BlogPost({
  post,
  children,
}: {
  post: PostMeta;
  children: React.ReactNode;
}) {
  const related = relatedPosts(post.slug, 3);
  const { newer, older } = adjacentPosts(post.slug);
  const showTags = post.tags.length > 0;

  return (
    <>
      <section
        className="relative w-full overflow-hidden section-grid pt-32 pb-12 md:pt-40"
        style={{ backgroundColor: "var(--paper)" }}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: post.title },
            ]}
          />

          {showTags && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className="apple-tag">
                  {tag}
                </Link>
              ))}
            </div>
          )}

          <h1 className="apple-heading mt-4">{post.title}</h1>
          <p className="apple-subtitle text-base mt-5 leading-relaxed">{post.description}</p>

          <div
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.1em]"
            style={{ color: "var(--gravel)" }}
          >
            <span className="font-bold" style={{ color: "var(--flag)" }}>
              By {siteConfig.name}
            </span>
            <span aria-hidden="true">&middot;</span>
            <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
            <span aria-hidden="true">&middot;</span>
            <span>{post.readingTime}</span>
            {post.dateModified !== post.datePublished && (
              <>
                <span aria-hidden="true">&middot;</span>
                <span>Updated {formatDate(post.dateModified)}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {post.cover && (
        <section className="relative w-full" style={{ backgroundColor: "var(--paper)" }}>
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <div className="border-[3px] border-black" style={{ borderColor: "var(--ink)" }}>
              <PostCover
                post={post}
                sizes="(min-width: 1024px) 720px, 100vw"
                priority
                className="aspect-[16/9]"
              />
            </div>
          </div>
        </section>
      )}

      <section className="relative w-full py-12 md:py-16" style={{ backgroundColor: "var(--paper)" }}>
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {post.toc.length > 0 && (
              <div className="lg:col-span-3 hidden lg:block">
                <div className="sticky top-28 space-y-4">
                  <span
                    className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase"
                    style={{ color: "var(--gravel)" }}
                  >
                    On this page
                  </span>
                  <nav aria-label="Table of contents" className="space-y-2">
                    {post.toc.map((entry) => (
                      <a
                        key={entry.id}
                        href={`#${entry.id}`}
                        className={`block leading-snug transition-opacity hover:opacity-60 ${
                          entry.depth === 3 ? "pl-3 text-[11px]" : "text-xs"
                        }`}
                        style={{ color: "var(--gravel)" }}
                      >
                        {entry.text}
                      </a>
                    ))}
                  </nav>
                  <div className="pt-3" style={{ borderTop: "1px solid var(--rule)" }}>
                    <Link
                      href="/blog"
                      className="text-xs font-mono font-bold uppercase tracking-[0.1em]"
                      style={{ color: "var(--flag)" }}
                    >
                      &larr; All posts
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className={post.toc.length > 0 ? "lg:col-span-9" : "lg:col-span-12"}>
              <article className="space-y-6 min-w-0">{children}</article>

              <div
                className="mt-10 pt-6 lg:hidden"
                style={{ borderTop: "2px solid var(--rule)" }}
              >
                <Link
                  href="/blog"
                  className="text-xs font-mono font-bold uppercase tracking-[0.1em]"
                  style={{ color: "var(--flag)" }}
                >
                  &larr; All posts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {(newer || older) && (
        <section className="relative w-full pb-12 md:pb-16" style={{ backgroundColor: "var(--paper)" }}>
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <nav
              aria-label="More posts"
              className="grid grid-cols-1 md:grid-cols-2 gap-3"
            >
              {older && (
                <Link href={`/blog/${older.slug}`} className="group apple-card-flat p-5">
                  <span
                    className="text-[9px] font-mono font-bold tracking-[0.18em] uppercase inline-flex items-center gap-1.5"
                    style={{ color: "var(--gravel)" }}
                  >
                    <FiArrowLeft className="text-[10px]" />
                    Older
                  </span>
                  <span
                    className="block mt-2 text-sm font-semibold leading-snug"
                    style={{ color: "var(--fg)" }}
                  >
                    {older.title}
                  </span>
                </Link>
              )}
              {newer && (
                <Link href={`/blog/${newer.slug}`} className="group apple-card-flat p-5 text-right">
                  <span
                    className="text-[9px] font-mono font-bold tracking-[0.18em] uppercase inline-flex items-center gap-1.5"
                    style={{ color: "var(--gravel)" }}
                  >
                    Newer
                    <FiArrowRight className="text-[10px]" />
                  </span>
                  <span
                    className="block mt-2 text-sm font-semibold leading-snug"
                    style={{ color: "var(--fg)" }}
                  >
                    {newer.title}
                  </span>
                </Link>
              )}
            </nav>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="relative w-full py-12 md:py-16" style={{ backgroundColor: "var(--paper)" }}>
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <span className="apple-eyebrow">Keep reading</span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title="Reading beats doing — but only up to a point."
        text="Where a post ends is where the real environment begins. If any of this sounds like your situation, the first conversation is free."
        cta={{ label: "Ask a Question", href: "/contact" }}
        waMessage={`Hi Joseph, I read your post "${post.title}" on the blog and I'd like to talk about it.`}
      />
    </>
  );
}
