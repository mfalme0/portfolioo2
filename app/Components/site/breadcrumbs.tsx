import React from "react";

export interface Crumb {
  name: string;
  path?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] tracking-[0.1em] uppercase"
      style={{ color: "var(--gravel)" }}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <React.Fragment key={`${item.name}-${i}`}>
            {i > 0 && <span aria-hidden="true" style={{ color: "var(--gravel)", opacity: 0.5 }}>/</span>}
            {isLast ? (
              <span aria-current="page" style={{ color: "var(--flag)" }}>
                {item.name}
              </span>
            ) : item.path ? (
              <a
                href={item.path}
                className="transition-colors hover:opacity-60"
                style={{ color: "var(--gravel)" }}
              >
                {item.name}
              </a>
            ) : (
              <span>{item.name}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}