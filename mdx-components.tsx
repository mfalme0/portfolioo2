import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

/**
 * Global MDX component map.
 *
 * `@next/mdx` requires this file at the project root for the App Router. Every
 * element produced from markdown is styled here against the Bauhaus tokens so
 * that posts read identically to the block-rendered guides in
 * `app/Components/site/guide-article.tsx`.
 *
 * Heading ids come from the `rehype-slug` plugin configured in
 * `next.config.ts`; `lib/blog.ts` reproduces the same slug algorithm to build
 * the table of contents.
 */
const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="apple-heading mt-8 mb-4">{children}</h1>
  ),

  h2: ({ children, id }) => (
    <h2
      id={id}
      className="text-2xl font-semibold tracking-tight mt-10 mb-3 scroll-mt-28"
      style={{ color: "var(--fg)" }}
    >
      {children}
    </h2>
  ),

  h3: ({ children, id }) => (
    <h3
      id={id}
      className="text-lg font-semibold tracking-tight mt-7 mb-2 scroll-mt-28"
      style={{ color: "var(--fg)" }}
    >
      {children}
    </h3>
  ),

  h4: ({ children, id }) => (
    <h4
      id={id}
      className="text-base font-bold tracking-tight mt-6 mb-2 scroll-mt-28"
      style={{ color: "var(--fg)" }}
    >
      {children}
    </h4>
  ),

  p: ({ children }) => (
    <p className="text-[15px] leading-[1.8]" style={{ color: "var(--fg)" }}>
      {children}
    </p>
  ),

  a: ({ children, href, ...props }) => {
    const target = typeof href === "string" ? href : "";
    const isInternal = target.startsWith("/") && !target.startsWith("//");

    if (isInternal) {
      return (
        <Link
          href={target}
          className="font-semibold underline"
          style={{ color: "var(--flag)", textUnderlineOffset: "3px" }}
        >
          {children}
        </Link>
      );
    }

    return (
      <a
        href={target}
        {...props}
        className="font-semibold underline"
        style={{ color: "var(--flag)", textUnderlineOffset: "3px" }}
      >
        {children}
      </a>
    );
  },

  // Native list markers rather than injected pseudo-elements: MDX does not put
  // a `value` prop on <li>, so ordered and unordered items cannot be told apart
  // inside a shared `li` override. The marker colour is applied via ::marker.
  ul: ({ children }) => (
    <ul
      className="space-y-2.5 list-disc pl-5 marker:text-(--flag)"
      style={{ color: "var(--fg)" }}
    >
      {children}
    </ul>
  ),

  ol: ({ children }) => (
    <ol
      className="space-y-2.5 list-decimal pl-5 marker:text-(--flag) marker:font-mono marker:text-xs"
      style={{ color: "var(--fg)" }}
    >
      {children}
    </ol>
  ),

  li: ({ children }) => (
    <li className="text-[15px] leading-[1.75] pl-1" style={{ color: "var(--fg)" }}>
      {children}
    </li>
  ),

  blockquote: ({ children }) => (
    <aside
      className="border-l-[3px] p-5"
      style={{
        borderLeftColor: "var(--flag)",
        border: "1px solid var(--rule)",
        borderLeftWidth: 3,
        background: "color-mix(in srgb, var(--flag) 4%, var(--sheet))",
      }}
    >
      {children}
    </aside>
  ),

  hr: () => <hr style={{ borderColor: "var(--rule)" }} />,

  table: ({ children }) => (
    <div
      className="overflow-x-auto border"
      style={{ borderColor: "var(--rule)", borderWidth: 2, borderStyle: "solid" }}
    >
      <table className="w-full text-sm">{children}</table>
    </div>
  ),

  thead: ({ children }) => (
    <thead style={{ backgroundColor: "var(--sheet-2)" }}>{children}</thead>
  ),

  th: ({ children }) => (
    <th
      className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.12em]"
      style={{ color: "var(--ink)" }}
    >
      {children}
    </th>
  ),

  td: ({ children }) => (
    <td
      className="px-4 py-3 text-[13px] leading-relaxed"
      style={{ color: "var(--gravel)", borderTop: "1px solid var(--rule)" }}
    >
      {children}
    </td>
  ),

  pre: ({ children }) => (
    <pre
      className="overflow-x-auto p-4 text-[13px] leading-relaxed"
      style={{
        background: "var(--ink)",
        color: "var(--paper)",
        border: "3px solid var(--ink)",
        fontFamily: "var(--font-mono, 'Courier New', monospace)",
      }}
    >
      {children}
    </pre>
  ),

  code: ({ children, className }) => {
    // Fenced code blocks are wrapped by `pre`; only style inline code here.
    if (className?.includes("language-")) {
      return <code className={className}>{children}</code>;
    }
    return (
      <code
        className="px-1.5 py-0.5 text-[0.9em]"
        style={{
          background: "var(--sheet-2)",
          color: "var(--flag)",
          fontFamily: "var(--font-mono, 'Courier New', monospace)",
        }}
      >
        {children}
      </code>
    );
  },

  strong: ({ children }) => (
    <strong className="font-bold" style={{ color: "var(--fg)" }}>
      {children}
    </strong>
  ),

  img: ({ src, alt }) => {
    const source = typeof src === "string" ? src : (src?.src ?? "");
    if (!source) return null;
    return (
      <Image
        src={source}
        alt={alt ?? ""}
        width={1200}
        height={675}
        sizes="(min-width: 1024px) 720px, 100vw"
        className="w-full h-auto"
      />
    );
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
