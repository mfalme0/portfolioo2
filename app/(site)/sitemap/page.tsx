import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { getSitemapGroups, BASE_URL } from "@/lib/sitemap";
import { siteConfig } from "@/lib/site-config";
import { whatsappCtaMessage } from "@/lib/cta-messages";
import { PageHero } from "@/app/Components/site/page-hero";
import { CtaBand } from "@/app/Components/site/cta-band";
import { FiArrowUpRight } from "react-icons/fi";

export const metadata: Metadata = pageMeta({
  title: "Sitemap — Every Page on This Site",
  description:
    "A complete, human-readable index of every page on the site: services, PC building, blog posts, guides, case studies, tools and the home lab.",
  path: "/sitemap",
  keywords: ["sitemap", "site index", "all pages"],
  noIndex: false,
});

const lastMod = (d: Date) =>
  d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

export default function SitemapPage() {
  const groups = getSitemapGroups();
  const total = groups.reduce((sum, g) => sum + g.entries.length, 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPageJsonLd("/sitemap", "Sitemap", metadata.description ?? ""),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Sitemap", path: "/sitemap" },
            ]),
          ]),
        }}
      />

      <PageHero
        eyebrow="Sitemap"
        title={<>Every page, <span style={{ color: "var(--flag)" }}>one list.</span></>}
        lead={`A complete index of the ${total} pages on this site, grouped by what they're for. The machine-readable version lives at ${BASE_URL}/sitemap.xml and updates on every deploy.`}
        crumbs={[{ name: "Home", path: "/" }, { name: "Sitemap" }]}
        whatsappMessage={whatsappCtaMessage("general")}
        meta={[`${total} pages`, "Updated on every deploy"]}
      />

      <section
        className="relative w-full py-12 md:py-16"
        style={{ backgroundColor: "var(--paper)" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10">
            {groups.map((group) => (
              <section key={group.title}>
                <h2
                  className="text-lg font-semibold tracking-tight"
                  style={{ color: "var(--fg)" }}
                >
                  {group.title}
                </h2>
                <p
                  className="text-xs leading-relaxed mt-1 mb-4"
                  style={{ color: "var(--gravel)", maxWidth: "44rem" }}
                >
                  {group.description}
                </p>
                <ul
                  className="divide-y"
                  style={{ borderColor: "var(--rule)" }}
                >
                  {group.entries.map((entry) => (
                    <li
                      key={entry.path}
                      style={{ borderTop: "1px solid var(--rule)" }}
                    >
                      <Link
                        href={entry.path}
                        className="group flex items-baseline justify-between gap-4 py-2.5 transition-colors hover:opacity-70"
                      >
                        <span
                          className="text-sm font-mono truncate"
                          style={{ color: "var(--fg)" }}
                        >
                          {entry.path === "/" ? "/" : entry.path}
                        </span>
                        <span
                          className="text-[10px] font-mono tracking-[0.1em] uppercase shrink-0 inline-flex items-center gap-2"
                          style={{ color: "var(--gravel)" }}
                        >
                          {entry.note && <span>{entry.note}</span>}
                          <span className="hidden sm:inline">{lastMod(entry.lastModified)}</span>
                          <FiArrowUpRight
                            className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ color: "var(--flag)" }}
                          />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-12 pt-8 text-center" style={{ borderTop: "2px solid var(--rule)" }}>
            <p className="text-[10px] font-mono tracking-[0.12em] uppercase" style={{ color: "var(--gravel)" }}>
              Looking for something specific?
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`${BASE_URL}/sitemap.xml`}
                className="text-xs font-mono font-bold uppercase tracking-[0.1em] underline"
                style={{ color: "var(--flag)" }}
              >
                sitemap.xml
              </a>
              <a
                href="/blog/feed.xml"
                className="text-xs font-mono font-bold uppercase tracking-[0.1em] underline"
                style={{ color: "var(--flag)" }}
              >
                blog RSS feed
              </a>
              <Link
                href="/resources"
                className="text-xs font-mono font-bold uppercase tracking-[0.1em] underline"
                style={{ color: "var(--flag)" }}
              >
                resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Found what you needed, or still looking?"
        text="Reading the index is the easy part. If any of this is close to a problem you actually have, the first conversation is free and usually settles things faster than another page of documentation."
        cta={{ label: "Start a Conversation", href: "/contact" }}
        waMessage={whatsappCtaMessage("general")}
        secondary={{ label: `Email ${siteConfig.email}`, href: `mailto:${siteConfig.email}` }}
      />
    </>
  );
}
