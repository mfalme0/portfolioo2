import React from "react";
import Link from "next/link";
import type { Guide } from "@/lib/guides";
import { relatedGuides } from "@/lib/guides";
import { Breadcrumbs } from "./breadcrumbs";
import { CtaBand } from "./cta-band";
import { GuideCard } from "./cards";

function renderBlock(block: Guide["blocks"][number], key: number) {
  switch (block.type) {
    case "p":
      return (
        <p key={key} className="text-[15px] leading-[1.8]" style={{ color: "var(--fg)" }}>
          {block.text}
        </p>
      );
    case "h2":
      return (
        <h2
          key={key}
          id={block.id}
          className="text-2xl font-semibold tracking-tight scroll-mt-28"
          style={{ color: "var(--fg)" }}
        >
          {block.text}
        </h2>
      );
    case "list":
      return block.ordered ? (
        <ol key={key} className="space-y-2.5 pl-1 list-inside" style={{ color: "var(--fg)" }}>
          {block.items.map((item, i) => (
            <li key={i} className="text-[15px] leading-[1.75] flex gap-3">
              <span className="font-mono text-xs mt-1 shrink-0" style={{ color: "var(--flag)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      ) : (
        <ul key={key} className="space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="text-[15px] leading-[1.75] flex gap-3" style={{ color: "var(--fg)" }}>
              <span className="mt-[9px] w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "var(--flag)" }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div key={key} className="overflow-x-auto rounded-[3px] border" style={{ borderColor: "var(--rule)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "var(--sheet-2)" }}>
                {block.head.map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-mono font-bold uppercase tracking-[0.12em]" style={{ color: "var(--gravel)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} style={{ borderTop: "1px solid var(--rule)" }}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-[13px] leading-relaxed" style={{ color: ci === 0 ? "var(--fg)" : "var(--gravel)" }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      return (
        <aside
          key={key}
          className="rounded-[3px] border-l-2 p-5"
          style={{ borderLeftColor: "var(--flag)", border: "1px solid var(--rule)", borderLeftWidth: 3, background: "color-mix(in srgb, var(--flag) 4%, var(--sheet))" }}
        >
          {block.title && (
            <span className="apple-eyebrow-accent mb-2">{block.title}</span>
          )}
          <p className="text-sm leading-relaxed" style={{ color: "var(--fg)" }}>
            {block.text}
          </p>
        </aside>
      );
  }
}

export function GuideArticle({ guide }: { guide: Guide }) {
  const toc = guide.blocks.filter((b) => b.type === "h2") as Extract<Guide["blocks"][number], { type: "h2" }>[];
  const related = relatedGuides(guide.related);

  return (
    <>
      <section className="relative w-full overflow-hidden section-grid pt-32 pb-12 md:pt-40" style={{ backgroundColor: "var(--paper)" }}>
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides" },
              { name: guide.title },
            ]}
          />
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="apple-tag">{guide.cluster}</span>
            <span className="text-[10px] font-mono tracking-[0.1em] uppercase" style={{ color: "var(--gravel)" }}>
              {guide.datePublished} &middot; {guide.readingTime}
            </span>
          </div>
          <h1 className="apple-heading mt-4">{guide.title}</h1>
          <p className="apple-subtitle text-base mt-5 leading-relaxed">{guide.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: "var(--gravel)" }}>
            <span className="font-bold" style={{ color: "var(--flag)" }}>By Joseph Gitau Chege</span>
            <span>Updated {guide.dateModified}</span>
          </div>
        </div>
      </section>

      <section className="relative w-full py-12 md:py-16" style={{ backgroundColor: "var(--paper)" }}>
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-3 hidden lg:block">
              <div className="sticky top-28 space-y-4">
                <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: "var(--gravel)" }}>
                  On this page
                </span>
                <nav aria-label="Table of contents" className="space-y-2">
                  {toc.map((h) => (
                    <a key={h.id} href={`#${h.id}`} className="block text-xs leading-snug transition-colors hover:opacity-60" style={{ color: "var(--gravel)" }}>
                      {h.text}
                    </a>
                  ))}
                </nav>
                <div className="pt-3" style={{ borderTop: "1px solid var(--rule)" }}>
                  <Link href="/guides" className="text-xs font-mono font-bold uppercase tracking-[0.1em]" style={{ color: "var(--flag)" }}>
                    &larr; All guides
                  </Link>
                </div>
              </div>
            </div>

            <article className="lg:col-span-9 space-y-6 min-w-0">
              {guide.blocks.map((block, i) => renderBlock(block, i))}
            </article>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="relative w-full py-12 md:py-16" style={{ backgroundColor: "var(--paper)" }}>
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <span className="apple-eyebrow">Keep reading</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              {related.map((g) => (
                <GuideCard key={g.slug} guide={g} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title={guide.cta.title}
        text={guide.cta.text}
        cta={{ label: guide.cta.label, href: guide.cta.href }}
        waMessage={`Hi Joseph, I read your guide "${guide.title}" and I'd like to talk about ${guide.cluster.toLowerCase()}.`}
      />
    </>
  );
}