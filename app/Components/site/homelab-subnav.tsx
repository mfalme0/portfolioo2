"use client";

import { useEffect, useState } from "react";

export interface SubnavItem {
  id: string;
  label: string;
}

export function NodeSubnav({ items }: { items: SubnavItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.2, 0.5] }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="On this page"
      className="sticky top-[60px] z-30 border-y-2"
      style={{ borderColor: "var(--ink)", backgroundColor: "var(--paper)" }}
    >
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 md:px-14">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? "location" : undefined}
              className="whitespace-nowrap border-b-4 px-3 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] transition-colors"
              style={{
                borderColor: isActive ? "var(--flag)" : "transparent",
                color: isActive ? "var(--flag)" : "var(--gravel)",
              }}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
