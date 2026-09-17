import React from "react";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { CtaAnchor, CtaLink } from "./buttons";

interface CtaBandProps {
  eyebrow?: string;
  title: string;
  text: string;
  cta?: { label: string; href: string };
  waMessage: string;
  secondary?: { label: string; href: string };
}

export function CtaBand({
  eyebrow = "Start a conversation",
  title,
  text,
  cta,
  waMessage,
  secondary,
}: CtaBandProps) {
  return (
    <section className="relative w-full overflow-hidden py-20 md:py-28 section-grid" style={{ backgroundColor: "var(--paper)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 100%, color-mix(in srgb, var(--flag) 7%, transparent) 0%, transparent 65%)",
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-14 text-center">
        <span className="apple-eyebrow-accent" style={{ justifyContent: "center" }}>
          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--flag)" }} />
          {eyebrow}
          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--flag)" }} />
        </span>
        <h2 className="apple-heading-compact mt-5" style={{ maxWidth: "22ch", marginInline: "auto" }}>
          {title}
        </h2>
        <p className="apple-subtitle text-sm leading-relaxed mt-5 mx-auto" style={{ maxWidth: "40rem" }}>
          {text}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          {cta ? <CtaLink href={cta.href} label={cta.label} /> : <CtaLink href="/contact" label="Start a Project" />}
          <CtaAnchor href={whatsappLink(waMessage)} label="WhatsApp" variant="ghost" external />
          {secondary && <CtaAnchor href={secondary.href} label={secondary.label} variant="ghost" external={false} />}
        </div>
        <p className="mt-6 font-mono text-[10px] tracking-[0.12em] uppercase" style={{ color: "var(--gravel)" }}>
          or email{" "}
          <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-2 hover:opacity-60" style={{ color: "var(--flag)" }}>
            {siteConfig.email}
          </a>
        </p>
      </div>
    </section>
  );
}