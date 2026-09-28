import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMeta, blogPostingJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { getPost, getPostSlugs } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";
import { BlogPost } from "@/app/Components/site/blog-post";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

/**
 * A post's own `cover` wins; otherwise use the generated Bauhaus card served
 * by `app/(site)/blog/[slug]/og/route.tsx` at the stable `/blog/<slug>/og`
 * path. Shared so the metadata block and the JSON-LD cannot drift apart.
 */
function ogImageFor(post: NonNullable<ReturnType<typeof getPost>>): string {
  return post.cover
    ? `${siteConfig.url}${post.cover}`
    : `${siteConfig.url}/blog/${post.slug}/og`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return pageMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: ogImageFor(post),
    publishedTime: post.datePublished,
    modifiedTime: post.dateModified,
    keywords: post.tags,
    rss: "/blog/feed.xml",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // Turbopack resolves the template-literal specifier against the concrete
  // values returned by generateStaticParams, so each post is bundled at build
  // time with no manual registration. `dynamicParams = false` means an unknown
  // slug never reaches this branch.
  const { default: Content } = await import(`@/content/blog/${slug}.mdx`);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            blogPostingJsonLd({
              path: `/blog/${post.slug}`,
              headline: post.title,
              description: post.description,
              datePublished: post.datePublished,
              dateModified: post.dateModified,
              tags: post.tags,
              wordCount: post.wordCount,
              image: ogImageFor(post),
            }),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ]),
          ]),
        }}
      />
      <BlogPost post={post}>
        <Content />
      </BlogPost>
    </>
  );
}
