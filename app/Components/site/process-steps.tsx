import React from "react";

export interface Step {
  step: string;
  detail: string;
}

export function ProcessSteps({ steps, columns = 3 }: { steps: Step[]; columns?: 2 | 3 | 4 }) {
  const colClass =
    columns === 2 ? "md:grid-cols-2" : columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3";
  return (
    <ol className={`grid grid-cols-1 ${colClass} gap-3`}>
      {steps.map((s, i) => (
        <li key={s.step} className="apple-card-flat p-4">
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-[11px] font-bold w-8 h-8 flex items-center justify-center border rounded-[2px]"
              style={{ borderColor: "var(--rule-strong)", color: "var(--flag)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
              {s.step}
            </span>
          </div>
          {s.detail && (
            <p className="mt-3 text-xs leading-relaxed" style={{ color: "var(--gravel)" }}>
              {s.detail}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}