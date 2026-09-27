import React from "react";
import Link from "next/link";
import { PageHero } from "./page-hero";
import { CtaAnchor } from "./buttons";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { whatsappCtaMessage } from "@/lib/cta-messages";
import { legalController, legalDocs, legalUpdatedLabel } from "@/lib/legal";

export interface LegalSection {
  id: string;
  heading: string;
  body: React.ReactNode;
}

export interface LegalPageProps {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  path: string;
  summary: { label: string; value: string }[];
  sections: LegalSection[];
  children?: React.ReactNode;
}

export function LegalP({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] leading-[1.8]" style={{ color: "var(--fg)" }}>
      {children}
    </p>
  );
}

export function LegalList({ children }: { children: React.ReactNode }) {
  return <ul className="space-y-2.5">{children}</ul>;
}

export function LegalItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="text-[15px] leading-[1.75] flex gap-3" style={{ color: "var(--fg)" }}>
      <span
        className="mt-[9px] w-1.5 h-1.5 rounded-full shrink-0"
        style={{ backgroundColor: "var(--flag)" }}
        aria-hidden="true"
      />
      <span>{children}</span>
    </li>
  );
}

export function LegalLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  const className = "underline underline-offset-2 transition-opacity hover:opacity-60";
  const style = { color: "var(--flag)" };
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  );
}

export function LegalNote({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <aside
      className="p-5"
      style={{
        border: "1px solid var(--rule)",
        borderLeftWidth: 3,
        borderLeftColor: "var(--flag)",
        background: "color-mix(in srgb, var(--flag) 4%, var(--sheet))",
      }}
    >
      <span className="apple-eyebrow-accent mb-2">{title}</span>
      <p className="text-sm leading-relaxed" style={{ color: "var(--fg)" }}>
        {children}
      </p>
    </aside>
  );
}

export function LegalTable({
  head,
  rows,
}: {
  head: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-[3px] border" style={{ borderColor: "var(--rule)" }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ backgroundColor: "var(--sheet-2)" }}>
            {head.map((cell) => (
              <th
                key={cell}
                scope="col"
                className="px-4 py-3 text-left text-[10px] font-mono font-bold uppercase tracking-[0.12em]"
                style={{ color: "var(--gravel)" }}
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} style={{ borderTop: "1px solid var(--rule)" }}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 text-[13px] leading-relaxed align-top"
                  style={{ color: cellIndex === 0 ? "var(--fg)" : "var(--gravel)" }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LegalContactCard() {
  return (
    <div className="apple-card-flat p-7">
      <span className="apple-eyebrow-accent">Data protection enquiries</span>
      <h3 className="text-xl font-semibold tracking-tight mt-3" style={{ color: "var(--fg)" }}>
        Talk to a human, not a form.
      </h3>
      <p className="text-sm leading-relaxed mt-2" style={{ color: "var(--gravel)" }}>
        Access requests, corrections and erasure requests are handled directly by me, usually within
        seven days. There is no outsourced call centre and no data broker in the middle.
      </p>
      <div className="mt-5 space-y-2">
        <a
          href={`mailto:${legalController.email}`}
          className="block font-mono text-[11px] font-bold uppercase tracking-[0.1em]"
          style={{ color: "var(--flag)" }}
        >
          {legalController.email}
        </a>
        <a
          href={whatsappLink(whatsappCtaMessage("general"))}
          target="_blank"
          rel="noopener noreferrer"
          className="block font-mono text-[11px] font-medium"
          style={{ color: "var(--fg)" }}
        >
          {legalController.phone} &middot; WhatsApp
        </a>
      </div>
    </div>
  );
}

function DocSwitcher({ currentPath }: { currentPath: string }) {
  return (
    <nav aria-label="Legal documents" className="flex flex-wrap gap-3">
      {legalDocs.map((doc) => {
        const current = doc.href === currentPath;
        return (
          <Link
            key={doc.href}
            href={doc.href}
            aria-current={current ? "page" : undefined}
            className="px-4 py-2.5 text-[10px] font-bold uppercase font-mono tracking-[0.12em] transition-transform duration-300"
            style={{
              background: current ? "var(--ink)" : "var(--sheet)",
              color: current ? "#fff" : "var(--ink)",
              border: "3px solid var(--ink)",
              boxShadow: current ? undefined : "4px 4px 0 var(--ink)",
            }}
          >
            {doc.short}
          </Link>
        );
      })}
    </nav>
  );
}

export function LegalPage({
  eyebrow,
  title,
  lead,
  path,
  summary,
  sections,
  children,
}: LegalPageProps) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        crumbs={[{ name: "Home", path: "/" }, { name: eyebrow }]}
        meta={[`Last updated ${legalUpdatedLabel}`, legalController.location, legalController.jurisdiction]}
        cta={{ label: "Ask a Question", href: "/contact" }}
        whatsappMessage={whatsappCtaMessage("general")}
      />

      <section className="relative w-full py-14 md:py-16" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <DocSwitcher currentPath={path} />

          <dl className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-8">
            {summary.map((item) => (
              <div key={item.label} className="apple-card-flat p-5">
                <dt className="text-[9px] font-mono font-bold tracking-[0.16em] uppercase" style={{ color: "var(--flag)" }}>
                  {item.label}
                </dt>
                <dd className="text-[13px] leading-relaxed mt-2" style={{ color: "var(--fg)" }}>
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="relative w-full py-14 md:py-16" style={{ backgroundColor: "var(--sheet-2)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-3 hidden lg:block">
              <div className="sticky top-28 space-y-4">
                <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: "var(--gravel)" }}>
                  On this page
                </span>
                <nav aria-label="Table of contents" className="space-y-2">
                  {sections.map((section, index) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="flex gap-2.5 text-xs leading-snug transition-opacity hover:opacity-60"
                      style={{ color: "var(--gravel)" }}
                    >
                      <span className="font-mono text-[10px] shrink-0" style={{ color: "var(--flag)" }}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{section.heading}</span>
                    </a>
                  ))}
                </nav>
                <div className="pt-3" style={{ borderTop: "1px solid var(--rule)" }}>
                  <a
                    href={`mailto:${legalController.email}`}
                    className="text-xs font-mono font-bold uppercase tracking-[0.1em]"
                    style={{ color: "var(--flag)" }}
                  >
                    Contact the controller
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-9 min-w-0">
              <article className="space-y-12">
                {sections.map((section, index) => (
                  <section key={section.id} aria-labelledby={section.id}>
                    <h2
                      id={section.id}
                      className="text-2xl font-semibold tracking-tight scroll-mt-28 flex items-baseline gap-3"
                      style={{ color: "var(--fg)" }}
                    >
                      <span className="font-mono text-xs shrink-0" style={{ color: "var(--flag)" }} aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section.heading}
                    </h2>
                    <div className="space-y-4 mt-4">{section.body}</div>
                  </section>
                ))}
              </article>

              {children && <div className="mt-12">{children}</div>}
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full py-16 md:py-20" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <LegalContactCard />
          <div className="apple-card-flat p-7" style={{ background: "var(--sheet-2)" }}>
            <span className="apple-eyebrow-accent">Other documents</span>
            <h3 className="text-xl font-semibold tracking-tight mt-3" style={{ color: "var(--fg)" }}>
              Read the rest.
            </h3>
            <ul className="mt-5 space-y-3">
              {legalDocs
                .filter((doc) => doc.href !== path)
                .map((doc) => (
                  <li key={doc.href}>
                    <Link
                      href={doc.href}
                      className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] transition-opacity hover:opacity-60"
                      style={{ color: "var(--flag)" }}
                    >
                      {doc.label} &rarr;
                    </Link>
                  </li>
                ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <CtaAnchor
                href={`mailto:${siteConfig.email}`}
                label="Email"
                variant="ghost"
                className="px-4 py-2 text-[10px]"
              />
              <CtaAnchor
                href={whatsappLink(whatsappCtaMessage("general"))}
                label="WhatsApp"
                variant="ghost"
                external
                className="px-4 py-2 text-[10px]"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
