"use client";

import React, { useState } from "react";

export interface FaqItem {
  q: string;
  a: string;
}

export function Faq({ items, title = "Frequently Asked Questions" }: { items: FaqItem[]; title?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      <h2 className="apple-heading-compact mb-6">{title}</h2>
      <div className="space-y-2">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="apple-card-flat overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                  {item.q}
                </span>
                <span
                  className="text-lg font-light leading-none transition-transform duration-300 shrink-0"
                  style={{ color: "var(--flag)", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                  aria-hidden
                >
                  +
                </span>
              </button>
              <div
                id={`faq-panel-${i}`}
                className="overflow-hidden transition-[max-height,opacity] duration-300 ease-out"
                style={{ maxHeight: isOpen ? 400 : 0, opacity: isOpen ? 1 : 0 }}
              >
                <p className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "var(--gravel)" }}>
                  {item.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}