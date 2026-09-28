import type { Metadata } from "next";
import { siteConfig } from "./site-config";

const baseUrl = siteConfig.url;

export interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
  noIndex?: boolean;
  /** Absolute path to an RSS feed, advertised via <link rel="alternate">. */
  rss?: string;
}

export function pageMeta(input: PageMetaInput): Metadata {
  const url = `${baseUrl}${input.path}`;
  const isArticle = Boolean(input.publishedTime);

  // Next 16 serves `app/opengraph-image.tsx` from `/opengraph-image`
  // (extensionless, no content hash). The previously hardcoded
  // `/opengraph-image.png` returned 404, so every link preview on the site
  // rendered without an image. Blog posts override this with their own
  // generated card, or with a `cover` image when one is set.
  const image = input.image ?? `${baseUrl}/opengraph-image`;

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: url,
      // Lets feed readers and aggregators discover the blog without hitting
      // /blog to look for a link.
      types: input.rss ? { "application/rss+xml": `${baseUrl}${input.rss}` } : undefined,
    },
    keywords: input.keywords,
    openGraph: {
      type: isArticle ? "article" : "website",
      url,
      title: input.title,
      description: input.description,
      siteName: siteConfig.name,
      locale: "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: input.title }],
      authors: isArticle ? [siteConfig.name] : undefined,
      publishedTime: input.publishedTime,
      modifiedTime: input.modifiedTime,
      // Maps to article:tag, which aggregators use to route posts by topic.
      tags: isArticle ? input.keywords : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [image],
    },
    robots: input.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

type JsonLd = Record<string, unknown>;

export function webPageJsonLd(
  path: string,
  title: string,
  description: string
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${baseUrl}${path}`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: baseUrl,
    },
    about: {
      "@type": "Person",
      name: siteConfig.name,
      jobTitle: siteConfig.role,
    },
    inLanguage: "en",
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.path}`,
    })),
  };
}

export function serviceJsonLd(
  path: string,
  name: string,
  description: string,
  areaServed = "Nairobi"
): JsonLd {
  const url = `${baseUrl}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": url,
    name: `${siteConfig.name} \u2014 ${name}`,
    description,
    url,
    image: `${baseUrl}/opengraph-image`,
    telephone: siteConfig.phoneRaw,
    email: siteConfig.email,
    priceRange: "KSh 15,000 - KSh 100,000",
    currenciesAccepted: "KES",
    paymentAccepted: "Cash, M-Pesa, Bank Transfer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi County",
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -1.2921,
      longitude: 36.8219,
    },
    areaServed: areaServed === "Kenya" ? ["Kenya", ...siteConfig.areas] : [areaServed, ...siteConfig.areas],
    openingHours: "Mo-Sa 09:00-18:00",
    founder: {
      "@type": "Person",
      name: siteConfig.name,
      url: `${baseUrl}/about`,
    },
    sameAs: [
      siteConfig.socials.github,
      siteConfig.socials.linkedin,
      siteConfig.socials.instagram,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phoneRaw,
      contactType: "sales",
      areaServed: "KE",
      availableLanguage: ["en", "sw"],
    },
    knowsAbout: [
      name,
      "Software Engineering",
      "Systems Architecture",
      "Full-Stack Development",
      "Cloud & DevOps",
      "Azure",
      "Kubernetes",
      "Docker",
      "Linux",
      "IT Infrastructure",
      "Networking",
      "Cybersecurity",
      "Automation",
      "AI & Automation",
      "Technical Leadership",
      "Custom PC Building",
    ],
  };
}

export function faqJsonLd(
  questions: { q: string; a: string }[]
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function articleJsonLd(input: {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author?: string;
  keywords?: string[];
  image?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url: `${baseUrl}${input.path}`,
    image: input.image ?? `${baseUrl}/opengraph-image`,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: input.author ?? siteConfig.name,
      url: `${baseUrl}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: baseUrl,
    },
    mainEntityOfPage: `${baseUrl}${input.path}`,
    keywords: input.keywords?.join(", "),
  };
}

/**
 * Blog index markup. Emits a `Blog` node carrying the post list in publish
 * order, so crawlers can enumerate posts and their dates without following
 * every link on the page.
 */
export function blogJsonLd(input: {
  path: string;
  title: string;
  description: string;
  posts: { slug: string; title: string; datePublished: string; dateModified: string }[];
}): JsonLd {
  const url = `${baseUrl}${input.path}`;

  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${url}#blog`,
    name: input.title,
    description: input.description,
    url,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: baseUrl,
    },
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: `${baseUrl}/about`,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: baseUrl,
    },
    blogPost: input.posts.map((post, index) => ({
      "@type": "BlogPosting",
      "@id": `${baseUrl}/blog/${post.slug}#posting`,
      position: index + 1,
      url: `${baseUrl}/blog/${post.slug}`,
      mainEntityOfPage: `${baseUrl}/blog/${post.slug}`,
      headline: post.title,
      datePublished: post.datePublished,
      dateModified: post.dateModified,
    })),
  };
}

export function blogPostingJsonLd(input: {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  tags?: string[];
  wordCount?: number;
  image?: string;
}): JsonLd {
  return {
    ...articleJsonLd({
      path: input.path,
      headline: input.headline,
      description: input.description,
      datePublished: input.datePublished,
      dateModified: input.dateModified,
      keywords: input.tags,
      image: input.image,
    }),
    "@type": "BlogPosting",
    "@id": `${baseUrl}${input.path}#posting`,
    wordCount: input.wordCount,
    articleSection: input.tags?.[0],
    isAccessibleForFree: true,
    // Keep the article:published_time / article:tag OG pairs consistent with
    // the metadata block emitted by pageMeta().
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}${input.path}`,
    },
  };
}

export function personJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: baseUrl,
    image: `${baseUrl}/opengraph-image`,
    jobTitle: siteConfig.role,
    email: `mailto:${siteConfig.email}`,
    telephone: siteConfig.phoneRaw,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi County",
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -1.2921,
      longitude: 36.8219,
    },
    knowsAbout: [
      "Software Engineering",
      "Systems Architecture",
      "Cloud Infrastructure",
      "Azure",
      "DevOps",
      "Linux",
      "Docker",
      "Kubernetes",
      "Distributed Systems",
      "Networking",
      "Cybersecurity",
      "Reliability Engineering",
      "Automation",
      "AI & Automation",
      "Technical Leadership",
      "Custom PC Building",
    ],
    sameAs: [
      siteConfig.socials.github,
      siteConfig.socials.linkedin,
      siteConfig.socials.instagram,
    ],
  };
}