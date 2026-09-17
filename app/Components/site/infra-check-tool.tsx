"use client";

import React, { useMemo, useState } from "react";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { track } from "@/lib/analytics";

interface CheckItem {
  id: string;
  question: string;
  why: string;
}

const checks: CheckItem[] = [
  {
    id: "backups",
    question: "Are your critical files and databases backed up automatically?",
    why: "A backup that isn't automatic is a backup that gets forgotten.",
  },
  {
    id: "restore",
    question: "Have you ever actually tested restoring from those backups?",
    why: "Untested backups are hope, not strategy.",
  },
  {
    id: "networking",
    question: "If the main internet link fails, does anything keep you online?",
    why: "Single uplink means downtime is one outage away.",
  },
  {
    id: "security",
    question: "Are admin and default credentials unique, and software kept patched?",
    why: "Default credentials and unpatched systems are how breaches start.",
  },
  {
    id: "access",
    question: "Can you list who has access to what — and is it re-checked?",
    why: "Access that isn't reviewed includes ex-staff and forgotten accounts.",
  },
  {
    id: "monitoring",
    question: "Are failures detected by monitoring systems, not by staff noticing?",
    why: "Monitoring is the difference between 5 minutes and 5 hours of downtime.",
  },
  {
    id: "cloud",
    question: "Are your hosting and cloud costs reviewed — and do you know what's running?",
    why: "Orphaned resources and over-provisioning silently raise bills.",
  },
  {
    id: "downtime",
    question: "Could you quantify what one hour of downtime costs your organisation?",
    why: "That number decides how seriously to take every other answer.",
  },
];

const answers = [
  { label: "Yes", score: 2 },
  { label: "Partially", score: 1 },
  { label: "No / unsure", score: 0 },
];

function ratingFor(score: number, max: number) {
  const pct = score / max;
  if (pct >= 0.75) return { band: "Healthy", note: "Solid foundations. The gaps worth closing are the ones with real blast radius." };
  if (pct >= 0.5) return { band: "At risk", note: "Workable, but single points of failure and untested recovery are likely. Prioritize backups and restore tests." };
  if (pct >= 0.25) return { band: "Fragile", note: "Recovery depends on memory and luck. A full audit would return a prioritized, costed fix list." };
  return { band: "Exposed", note: "A serious incident today would be expensive. This is exactly the environment an audit sorts out first." };
}

export default function InfraCheckTool() {
  const [answersState, setAnswersState] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [completed, setCompleted] = useState(false);

  const answered = Object.keys(answersState).length;
  const maxScore = checks.length * 2;

  const score = useMemo(
    () => checks.reduce((acc, c) => acc + (answersState[c.id] ?? 0), 0),
    [answersState]
  );

  const rating = ratingFor(score, maxScore);

  const ready = answered === checks.length;

  function complete() {
    setCompleted(true);
    track("infra_check_complete", { score });
  }

  const waMessage = `Hi Joseph, I completed the infrastructure self-check.\n\nScore: ${score}/${maxScore} (${rating.band})\nOrganisation: ${name || "—"}\n\nI'd like to request a full infrastructure audit.`;

  const inputStyle: React.CSSProperties = {
    backgroundColor: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    color: "var(--color-foreground)",
  };

  return (
    <div className="rounded-[3px] border overflow-hidden" style={{ borderColor: "var(--rule)", background: "var(--sheet)" }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: "var(--rule)", background: "var(--sheet-2)" }}>
        <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: "var(--flag)" }}>
          Preliminary IT Health Snapshot
        </span>
        <p className="text-xs mt-1" style={{ color: "var(--gravel)" }}>
          Eight honest questions. Unmarked answers score as &ldquo;No / unsure&rdquo;. This is a screening tool,
          not an audit &mdash; a full audit verifies each area in the real environment.
        </p>
      </div>

      <div className="p-5 space-y-5">
        {checks.map((c, i) => (
          <div key={c.id} className="rounded-[3px] border p-4" style={{ borderColor: "var(--rule)" }}>
            <div className="flex items-start justify-between gap-3">
              <span className="text-[9px] font-mono font-bold tracking-[0.18em] uppercase" style={{ color: "var(--gravel)" }}>
                Q{String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex gap-1.5">
                {answers.map((a) => {
                  const selected = answersState[c.id] === a.score;
                  return (
                    <button
                      key={a.label}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setAnswersState((prev) => ({ ...prev, [c.id]: a.score }))}
                      className="rounded-full px-3 py-1 text-[10px] font-semibold font-mono uppercase tracking-[0.08em] transition-all duration-200"
                      style={{
                        backgroundColor: selected ? "color-mix(in srgb, var(--flag) 14%, var(--sheet))" : "var(--sheet-2)",
                        border: `1px solid ${selected ? "var(--flag)" : "var(--rule)"}`,
                        color: selected ? "var(--flag)" : "var(--fg)",
                      }}
                    >
                      {a.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <p className="text-sm font-semibold mt-2" style={{ color: "var(--fg)" }}>
              {c.question}
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--gravel)" }}>
              {c.why}
            </p>
          </div>
        ))}

        {completed ? (
          <div className="rounded-[3px] border p-5 space-y-4" style={{ borderColor: "var(--flag)", background: "color-mix(in srgb, var(--flag) 5%, var(--sheet))" }}>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: "var(--flag)" }}>
                  Health Score
                </span>
                <div className="font-display text-4xl font-bold mt-1" style={{ color: "var(--fg)" }}>
                  {score}
                  <span className="text-lg" style={{ color: "var(--gravel)" }}>/{maxScore}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="apple-tag">{rating.band}</span>
                <p className="text-xs mt-2 max-w-xs" style={{ color: "var(--gravel)" }}>
                  {rating.note}
                </p>
              </div>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--rule)" }}>
              <div className="h-full rounded-full" style={{ width: `${(score / maxScore) * 100}%`, backgroundColor: "var(--flag)" }} />
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={whatsappLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="rog-btn-primary relative overflow-hidden rounded-[2px] px-5 py-3 text-[11px] font-bold uppercase font-mono"
              >
                <span className="relative">Request Full Audit on WhatsApp</span>
              </a>
              <a
                href="/contact?service=IT Audit"
                className="rog-btn-secondary relative overflow-hidden rounded-[2px] px-5 py-3 text-[11px] font-bold uppercase font-mono"
              >
                <span className="relative">Use the contact form</span>
              </a>
            </div>
            <p className="text-[10px] font-mono" style={{ color: "var(--color-muted)" }}>
              IT audits from KSh 15,000. A full audit verifies backups, networking, security, access,
              monitoring and cloud costs in your environment.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <label className="block">
              <span className="block mb-1.5 text-[10px] font-mono font-bold tracking-[0.12em] uppercase" style={{ color: "var(--color-muted)" }}>
                Organisation (optional)
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="So I can tailor the audit"
                className="w-full rounded-[3px] px-4 py-3 text-xs font-mono outline-none transition-colors"
                style={inputStyle}
              />
            </label>
            <button
              type="button"
              onClick={complete}
              disabled={!ready}
              className="w-full rog-btn-primary relative overflow-hidden rounded-[2px] px-6 py-3.5 text-[11px] font-mono font-bold uppercase tracking-[0.14em] disabled:opacity-40"
            >
              <span className="relative">
                {ready ? "Get My Health Snapshot" : `Answer ${checks.length - answered} more `}
              </span>
            </button>
            <p className="text-[10px] font-mono text-center" style={{ color: "var(--color-muted)" }}>
              Based in {siteConfig.location}. No data leaves your browser until you send it.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}