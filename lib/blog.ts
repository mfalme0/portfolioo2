import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Blog content layer.
 *
 * Posts are MDX files in `content/blog/`. This module reads their frontmatter
 * at build time and derives everything the pages need — reading time, table of
 * contents, tag counts, related posts. There is no runtime I/O, no database and
 * no API: `next build` scans the directory and prerenders every post.
 *
 * Add a post by dropping `<slug>.mdx` into `content/blog/`. No registration
 * step, no page to create.
 */

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

/** Words per minute used for the reading-time estimate. */
const WORDS_PER_MINUTE = 200;

export interface TocEntry {
  id: string;
  text: string;
  depth: 2 | 3;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  tags: string[];
  cover?: string;
  readingTime: string;
  wordCount: number;
  toc: TocEntry[];
  draft: boolean;
}

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Reproduces the slug algorithm used by the `rehype-slug` plugin, so the
 * table-of-contents anchors match the ids rendered into the post body.
 * Kept dependency-free to match how `lib/` reads elsewhere in this project.
 */
function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function isDate(value: unknown): value is string {
  return typeof value === "string" && DATE_PATTERN.test(value);
}

function requireString(
  data: Record<string, unknown>,
  key: string,
  slug: string
): string {
  const value = data[key];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(
      `content/blog/${slug}.mdx — frontmatter field "${key}" is required and must be a non-empty string.`
    );
  }
  return value.trim();
}

/** Strips frontmatter, fenced code, and MDX import/export lines before counting. */
function countWords(body: string): number {
  const text = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/^import\s.+?from\s+["'].+?["'];?\s*$/gm, " ")
    .replace(/^export\s+const\s+.+?=\s*\{[\s\S]*?\};?\s*$/gm, " ")
    .replace(/[`*_>#\[\]()]/g, " ")
    .trim();

  if (text === "") return 0;
  return text.split(/\s+/).length;
}

function readingTime(words: number): string {
  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min read`;
}

/** Extracts `##` and `###` headings, skipping anything inside fenced code. */
function extractToc(body: string): TocEntry[] {
  const withoutCode = body.replace(/```[\s\S]*?```/g, "");
  const entries: TocEntry[] = [];
  const seen = new Set<string>();

  for (const line of withoutCode.split("\n")) {
    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const depth = match[1].length as 2 | 3;
    const text = match[2].replace(/`/g, "").trim();
    if (!text) continue;

    const base = slugify(text);
    let id = base;
    let counter = 1;
    while (seen.has(id)) {
      counter += 1;
      id = `${base}-${counter}`;
    }
    seen.add(id);
    entries.push({ id, text, depth });
  }

  return entries;
}

function parsePost(filename: string): PostMeta | null {
  if (!filename.endsWith(".mdx")) return null;

  const slug = filename.replace(/\.mdx$/, "");
  const fullPath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const fields = data as Record<string, unknown>;

  const datePublished = requireString(fields, "datePublished", slug);
  if (!isDate(datePublished)) {
    throw new Error(
      `content/blog/${slug}.mdx — "datePublished" must be YYYY-MM-DD, received "${datePublished}".`
    );
  }

  const rawTags = fields.tags;
  if (rawTags !== undefined && !Array.isArray(rawTags)) {
    throw new Error(
      `content/blog/${slug}.mdx — "tags" must be a YAML list, received ${typeof rawTags}.`
    );
  }
  const tags = (rawTags ?? [])
    .filter((t): t is string => typeof t === "string")
    .map((t) => t.trim())
    .filter(Boolean);

  const cover = fields.cover;
  if (cover !== undefined && typeof cover !== "string") {
    throw new Error(
      `content/blog/${slug}.mdx — "cover" must be a string path when present.`
    );
  }

  const dateModified = isDate(fields.dateModified)
    ? fields.dateModified
    : datePublished;

  if (dateModified < datePublished) {
    throw new Error(
      `content/blog/${slug}.mdx — "dateModified" (${dateModified}) is earlier than "datePublished" (${datePublished}).`
    );
  }

  const wordCount = countWords(content);

  return {
    slug,
    title: requireString(fields, "title", slug),
    description: requireString(fields, "description", slug),
    datePublished,
    dateModified,
    tags,
    cover: typeof cover === "string" && cover.trim() ? cover.trim() : undefined,
    readingTime: readingTime(wordCount),
    wordCount,
    toc: extractToc(content),
    draft: fields.draft === true,
  };
}

function readAll(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const posts = fs
    .readdirSync(POSTS_DIR)
    .map(parsePost)
    .filter((p): p is PostMeta => p !== null);

  return posts.sort(
    (a, b) =>
      new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
  );
}

let cache: PostMeta[] | null = null;

function all(): PostMeta[] {
  if (cache === null) cache = readAll();
  return cache;
}

/**
 * Drafts are excluded from the index, the feed, the sitemap and
 * `generateStaticParams`, so they are neither listed nor routable — but the
 * file still has to exist on disk for the bundler to resolve the dynamic MDX
 * import in `app/(site)/blog/[slug]/page.tsx`.
 */
function published(): PostMeta[] {
  return all().filter((p) => !p.draft);
}

/** All published posts, newest first. */
export function getAllPosts(): PostMeta[] {
  return published();
}

export function getPost(slug: string): PostMeta | undefined {
  return published().find((p) => p.slug === slug);
}

/** Slugs that get prerendered. Drafts are intentionally excluded. */
export function getPostSlugs(): string[] {
  return published().map((p) => p.slug);
}

/** Every tag in use, with counts, ordered by count then alphabetically. */
export function allTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();

  for (const post of published()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function postsByTag(tag: string): PostMeta[] {
  const normalized = tag.toLowerCase();
  return published().filter((p) =>
    p.tags.some((t) => t.toLowerCase() === normalized)
  );
}

/**
 * Posts sharing tags with the given one, most-overlapping first. Falls back to
 * the most recent posts so the section is never empty.
 */
export function relatedPosts(slug: string, limit = 3): PostMeta[] {
  const current = getPost(slug);
  if (!current) return [];

  const others = published().filter((p) => p.slug !== slug);
  const scored = others
    .map((post) => ({
      post,
      score: post.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.post.datePublished).getTime() -
          new Date(a.post.datePublished).getTime()
    );

  if (scored.length >= limit) return scored.slice(0, limit).map((s) => s.post);
  return [...scored.map((s) => s.post), ...others].slice(0, limit);
}

/** Chronological neighbours, for the previous/next footer. */
export function adjacentPosts(slug: string): {
  newer?: PostMeta;
  older?: PostMeta;
} {
  const posts = published();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return {};

  return {
    newer: index > 0 ? posts[index - 1] : undefined,
    older: index < posts.length - 1 ? posts[index + 1] : undefined,
  };
}

/** Most recent posts, used by the guides and resources cross-link bands. */
export function latestPosts(limit = 2): PostMeta[] {
  return published().slice(0, limit);
}

/** Display-formatted date, e.g. "28 September 2026". */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
