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
}

export function pageMeta(input: PageMetaInput): Metadata {
  const url = `${baseUrl}${input.path}`;
  const image = input.image ?? `${baseUrl}/opengraph-image.png`;
  const isArticle = Boolean(input.publishedTime);

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
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
    image: `${baseUrl}/opengraph-image.png`,
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
      siteConfig.socials.x,
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
      "Custom PC Building",
      "Software Engineering",
      "IT Infrastructure",
      "Cloud & DevOps",
      "AI & Automation",
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
    image: input.image ?? `${baseUrl}/opengraph-image.png`,
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

export function personJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: baseUrl,
    image: `${baseUrl}/opengraph-image.png`,
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
      "Cybersecurity",
      "AI & Automation",
      "Custom PC Building",
      "Networking",
      "Backup & Disaster Recovery",
    ],
    sameAs: [
      siteConfig.socials.github,
      siteConfig.socials.linkedin,
      siteConfig.socials.x,
      siteConfig.socials.instagram,
    ],
  };
}