import React from "react";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";
import { CtaAnchor, CtaLink } from "./buttons";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { whatsappCtaMessage } from "@/lib/cta-messages";

export interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  crumbs: Crumb[];
  cta?: { label: string; href: string };
  ctaLabel?: string;
  meta?: string[];
  whatsappMessage?: string;
}

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  cta,
  ctaLabel = "Work With Me",
  meta = ["Nairobi, Kenya", siteConfig.timezone],
  whatsappMessage,
}: PageHeroProps) {
  return (
    <section
      className="relative w-full overflow-hidden section-grid pt-32 pb-16 md:pt-40 md:pb-20"
      style={{ backgroundColor: "var(--paper)" }}
    >
      <div
        className="absolute -top-1/4 right-[-8%] h-[60vh] w-[50vw] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in srgb, var(--flag) 9%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14">
        <Breadcrumbs items={crumbs} />
        <div className="mt-6 flex items-center gap-3">
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase" style={{ color: "var(--flag)" }}>
            {eyebrow}
          </span>
        </div>
        <h1
          className="apple-heading mt-5"
          style={{ maxWidth: "18ch" }}
        >
          {title}
        </h1>
        <p className="apple-subtitle mt-6 text-[15px] md:text-base" style={{ maxWidth: "46rem" }}>
          {lead}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {cta ? (
            <CtaLink href={cta.href} label={cta.label} />
          ) : (
            <CtaLink href="/contact" label={ctaLabel} />
          )}
          <CtaAnchor
            href={whatsappLink(whatsappMessage ?? whatsappCtaMessage(eyebrow))}
            label="WhatsApp"
            variant="ghost"
            external
          />
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] tracking-[0.12em] uppercase">
          {meta.map((m, i) => (
            <React.Fragment key={m}>
              {i > 0 && <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--rule-strong)" }} />}
              <span style={{ color: "var(--gravel)" }}>{m}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}