import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/blog";
import { FiArrowUpRight } from "react-icons/fi";

/**
 * Deterministic Bauhaus placeholder for posts without a cover image.
 *
 * The composition is seeded from the post slug so a given post always draws the
 * same shapes — stable across builds, identical on every device, and free of
 * hydration mismatches. Purely decorative: the surrounding <Link> carries the
 * accessible title via aria-label.
 */
function seedFrom(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) % 100000;
  }
  return hash;
}

export function BauhausPlaceholder({ slug, className = "" }: { slug: string; className?: string }) {
  const seed = seedFrom(slug);
  const circle = seed % 3;
  const accent = ["var(--flag)", "var(--water)", "var(--bush)"][seed % 3];

  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden section-grid ${className}`}
      style={{ backgroundColor: "var(--sheet-2)" }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: "42%",
          height: "160%",
          backgroundColor: accent,
          opacity: 0.9,
          right: `${8 + (seed % 20)}%`,
          top: "-30%",
        }}
      />
      <div
        className="absolute"
        style={{
          width: "34%",
          height: "34%",
          left: "10%",
          bottom: "12%",
          backgroundColor: circle === 0 ? "var(--ink)" : "transparent",
          clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
          opacity: circle === 0 ? 0.85 : 0,
        }}
      />
      <div
        className="absolute"
        style={{
          width: "18%",
          height: "70%",
          left: `${34 + (seed % 12)}%`,
          top: "8%",
          border: "3px solid var(--ink)",
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
}

/** Cover image, or the deterministic placeholder when a post has none. */
export function PostCover({
  post,
  sizes,
  priority = false,
  className = "",
}: {
  post: PostMeta;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  if (post.cover) {
    return (
      <div className={`relative w-full overflow-hidden ${className}`}>
        <Image
          src={post.cover}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return <BauhausPlaceholder slug={post.slug} className={className} />;
}

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full" aria-label={post.title}>
      <article className="apple-card-flat h-full flex flex-col transition-transform duration-300 group-hover:-translate-y-1">
        <div className="border-b-[3px] border-black" style={{ borderColor: "var(--ink)" }}>
          <PostCover
            post={post}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="aspect-[16/9]"
          />
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="apple-tag">{tag}</span>
            ))}
            <span
              className="text-[9px] font-mono tracking-[0.1em] uppercase"
              style={{ color: "var(--gravel)" }}
            >
              {formatDate(post.datePublished)}
            </span>
          </div>

          <h3 className="text-base font-semibold tracking-tight mt-3" style={{ color: "var(--fg)" }}>
            {post.title}
          </h3>
          <p className="text-xs leading-relaxed mt-2 flex-1" style={{ color: "var(--gravel)" }}>
            {post.description}
          </p>

          <div className="mt-4 flex items-center justify-between gap-3">
            <span
              className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase inline-flex items-center gap-1.5"
              style={{ color: "var(--flag)" }}
            >
              Read post
              <FiArrowUpRight className="text-xs" />
            </span>
            <span
              className="text-[9px] font-mono tracking-[0.1em] uppercase"
              style={{ color: "var(--gravel)" }}
            >
              {post.readingTime}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
