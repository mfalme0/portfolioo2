import React from "react";
import Link from "next/link";
import { CtaLink, CtaAnchor } from "./buttons";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { whatsappCtaMessage } from "@/lib/cta-messages";

/**
 * Rendered by /blog when no posts exist yet. Keeps the section navigable and
 * honest rather than showing a bare grid with nothing in it.
 */
export function BlogEmptyState() {
  return (
    <section className="relative w-full py-16 md:py-24" style={{ backgroundColor: "var(--paper)" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <div className="apple-card-flat p-8 md:p-14 text-center">
          <div
            className="mx-auto h-16 w-16 rotate-45 border-4 border-black"
            style={{ borderColor: "var(--ink)", backgroundColor: "var(--water)" }}
            aria-hidden="true"
          />

          <span className="apple-eyebrow-accent mt-8 justify-center">Nothing published yet</span>
          <h2 className="apple-heading-compact mt-4">The blog is being written.</h2>
          <p
            className="text-sm leading-relaxed mt-4 mx-auto"
            style={{ maxWidth: "44rem", color: "var(--gravel)" }}
          >
            Longer write-ups land here &mdash; build logs, post-mortems and the reasoning behind
            decisions that are too detailed for a guide. In the meantime, the{" "}
            <Link href="/guides" className="font-semibold" style={{ color: "var(--flag)" }}>
              guides
            </Link>{" "}
            cover the practical questions, and the{" "}
            <Link href="/case-studies" className="font-semibold" style={{ color: "var(--flag)" }}>
              case studies
            </Link>{" "}
            show the work behind them.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <CtaLink href="/guides" label="Browse the guides" />
            <CtaAnchor
              href={whatsappLink(whatsappCtaMessage("general"))}
              label="WhatsApp"
              variant="ghost"
              external
            />
          </div>

          <p
            className="mt-6 text-[10px] font-mono"
            style={{ color: "var(--gravel)" }}
          >
            Or email {siteConfig.email} directly
          </p>
        </div>
      </div>
    </section>
  );
}
