import React from "react";
import { stackLayers } from "@/lib/services";

export function StackDiagram() {
  return (
    <div className="rounded-[3px] border overflow-hidden" style={{ borderColor: "var(--rule)", background: "var(--sheet)" }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: "var(--rule)", background: "var(--sheet-2)" }}>
        <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: "var(--fg)" }}>
          Technology Stack
        </span>
        <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: "var(--gravel)" }}>
          Hardware &rarr; AI
        </span>
      </div>
      <div className="p-4">
        {stackLayers.map((layer, i) => (
          <div key={layer.layer}>
            <div className="flex items-center gap-3">
              <span
                className="w-2 h-2 rounded-[2px] shrink-0"
                style={{ backgroundColor: i === 0 || i === stackLayers.length - 1 ? "var(--flag)" : "var(--water)" }}
              />
              <div className="flex items-baseline gap-3 min-w-0">
                <span className="text-sm font-semibold shrink-0" style={{ color: "var(--fg)" }}>
                  {layer.layer}
                </span>
                <span className="text-[11px] truncate" style={{ color: "var(--gravel)" }}>
                  {layer.detail}
                </span>
              </div>
            </div>
            {i < stackLayers.length - 1 && (
              <div
                className="my-1.5"
                style={{ borderLeft: "1px dashed var(--rule-strong)", height: 14, width: 1, marginLeft: 3 }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="px-4 py-3 border-t" style={{ borderColor: "var(--rule)", background: "var(--sheet-2)" }}>
        <p className="text-[11px] leading-relaxed" style={{ color: "var(--gravel)" }}>
          Technology doesn&apos;t exist in isolated layers. Joseph works across the stack &mdash; and fixes
          problems where they actually are.
        </p>
      </div>
    </div>
  );
}