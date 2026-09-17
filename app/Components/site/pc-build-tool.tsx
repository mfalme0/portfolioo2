"use client";

import React, { useMemo, useState } from "react";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { track } from "@/lib/analytics";

const primaryUses = [
  "Gaming",
  "Software Development",
  "AI / Machine Learning",
  "Video Editing",
  "3D / Rendering",
  "Office / Business",
  "Mixed Workload",
];

const resolutions = ["1080p", "1440p", "4K", "Not sure / monitor is next"];

const budgetRanges = [
  "Under KSh 80,000",
  "KSh 80,000 - 140,000",
  "KSh 140,000 - 220,000",
  "KSh 220,000 - 320,000",
  "KSh 320,000+",
  "No fixed budget",
];

const existingComponents = [
  "GPU",
  "CPU",
  "RAM",
  "SSD / storage",
  "Power supply",
  "Case",
  "Monitor",
  "None — starting from zero",
];

const priorities = [
  "AMD platform",
  "Intel platform",
  "NVIDIA GPU",
  "AMD (Radeon) GPU",
  "Quiet system",
  "Maximum performance",
  "Upgradeability",
  "Small form factor",
];

const timelineOptions = ["ASAP", "This month", "1-3 months", "Just exploring"];

export default function PcBuildTool() {
  const [use, setUse] = useState("");
  const [resolution, setResolution] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [existing, setExisting] = useState<string[]>([]);
  const [priority, setPriority] = useState<string[]>([]);
  const [extra, setExtra] = useState("");
  const [completed, setCompleted] = useState(false);

  const ready = Boolean(use && budget);

  const toggle = (list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setter(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const summary = useMemo(() => {
    const lines = [
      `Use case: ${use || "—"}`,
      `Resolution: ${resolution || "—"}`,
      `Budget: ${budget || "—"}`,
      `Timeline: ${timeline || "—"}`,
      `Existing parts: ${existing.join(", ") || "—"}`,
      `Preferences: ${priority.join(", ") || "—"}`,
      `Extra: ${extra || "—"}`,
    ];
    return lines.join("\n");
  }, [use, resolution, budget, timeline, existing, priority, extra]);

  function complete() {
    setCompleted(true);
    track("pc_build_tool_complete", { use, budget });
  }

  const waMessage = `Hi Joseph, I'd like a custom PC build.\n\n${summary}\n\nCan you recommend a compatible build?`;

  const inputStyle: React.CSSProperties = {
    backgroundColor: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    color: "var(--color-foreground)",
  };

  return (
    <div className="rounded-[3px] border overflow-hidden" style={{ borderColor: "var(--rule)", background: "var(--sheet)" }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: "var(--rule)", background: "var(--sheet-2)" }}>
        <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: "var(--flag)" }}>
          Build Questionnaire
        </span>
        <p className="text-xs mt-1" style={{ color: "var(--gravel)" }}>
          This captures the essentials for a custom build. Component recommendations are validated for
          compatibility before anything is committed.
        </p>
      </div>

      <div className="p-5 space-y-5">
        <SelectField label="Primary use *" value={use} onChange={setUse} options={primaryUses} placeholder="What will you mainly do?" inputStyle={inputStyle} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <SelectField label="Resolution" value={resolution} onChange={setResolution} options={resolutions} placeholder="Select" inputStyle={inputStyle} />
          <SelectField label="Budget (KSh) *" value={budget} onChange={setBudget} options={budgetRanges} placeholder="Select" inputStyle={inputStyle} />
          <SelectField label="Timeline" value={timeline} onChange={setTimeline} options={timelineOptions} placeholder="Select" inputStyle={inputStyle} />
        </div>

        <CheckboxGroup
          label="Existing components"
          options={existingComponents}
          selected={existing}
          onToggle={(item) => toggle(existing, setExisting, item)}
        />
        <CheckboxGroup
          label="Preferences"
          options={priorities}
          selected={priority}
          onToggle={(item) => toggle(priority, setPriority, item)}
        />

        <label className="block">
          <span className="block mb-1.5 text-[10px] font-mono font-bold tracking-[0.12em] uppercase" style={{ color: "var(--color-muted)" }}>
            Games / software / anything else
          </span>
          <textarea
            value={extra}
            onChange={(e) => setExtra(e.target.value)}
            rows={3}
            placeholder="The games you play, the software you run, the resolution of your monitor&hellip;"
            className="w-full rounded-[3px] px-4 py-3 text-xs font-mono outline-none transition-colors resize-none"
            style={inputStyle}
          />
        </label>

        {completed ? (
          <div className="rounded-[3px] border p-5 space-y-4" style={{ borderColor: "var(--flag)", background: "color-mix(in srgb, var(--flag) 5%, var(--sheet))" }}>
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: "var(--flag)" }}>
              Request a custom build
            </span>
            <pre className="text-[11px] font-mono leading-relaxed whitespace-pre-wrap" style={{ color: "var(--color-foreground)" }}>
              {summary}
            </pre>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="rog-btn-primary relative overflow-hidden rounded-[2px] px-5 py-3 text-[11px] font-bold uppercase font-mono"
              >
                <span className="relative">Send via WhatsApp</span>
              </a>
              <a
                href="/contact?service=Custom PC Build"
                className="rog-btn-secondary relative overflow-hidden rounded-[2px] px-5 py-3 text-[11px] font-bold uppercase font-mono"
              >
                <span className="relative">Or use the contact form</span>
              </a>
            </div>
            <p className="text-[10px] font-mono" style={{ color: "var(--color-muted)" }}>
              You&apos;ll receive recommended components, a compatibility review and an upgrade path.
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={complete}
            disabled={!ready}
            className="w-full rog-btn-primary relative overflow-hidden rounded-[2px] px-6 py-3.5 text-[11px] font-mono font-bold uppercase tracking-[0.14em] disabled:opacity-40"
          >
            <span className="relative">{ready ? "Build My PC" : "Fill use case + budget to continue"}</span>
          </button>
        )}
        <p className="text-[10px] font-mono text-center" style={{ color: "var(--color-muted)" }}>
          No real component recommendations are implied by this tool without validation. Based in {siteConfig.location}.
        </p>
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  inputStyle,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  inputStyle: React.CSSProperties;
}) {
  return (
    <label className="block">
      <span className="block mb-1.5 text-[10px] font-mono font-bold tracking-[0.12em] uppercase" style={{ color: "var(--color-muted)" }}>
        {label}
      </span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-[3px] px-4 py-3 text-xs font-mono outline-none transition-colors" style={inputStyle}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function CheckboxGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (item: string) => void;
}) {
  return (
    <div>
      <span className="block mb-2 text-[10px] font-mono font-bold tracking-[0.12em] uppercase" style={{ color: "var(--color-muted)" }}>
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const checked = selected.includes(o);
          return (
            <button
              key={o}
              type="button"
              aria-pressed={checked}
              onClick={() => onToggle(o)}
              className="rounded-full px-3.5 py-1.5 text-[11px] font-medium transition-all duration-200"
              style={{
                backgroundColor: checked ? "color-mix(in srgb, var(--flag) 14%, var(--sheet))" : "var(--sheet-2)",
                border: `1px solid ${checked ? "var(--flag)" : "var(--rule)"}`,
                color: checked ? "var(--flag)" : "var(--fg)",
              }}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}