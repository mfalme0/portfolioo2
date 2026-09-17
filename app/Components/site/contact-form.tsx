"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { track } from "@/lib/analytics";

const services = [
  "Custom Software",
  "IT Consulting",
  "IT Audit",
  "Infrastructure",
  "Cloud & DevOps",
  "AI & Automation",
  "Custom PC Build",
  "PC Upgrade",
  "PC Troubleshooting",
  "Technical Leadership",
  "Other",
];

const budgets = [
  "Under KSh 50,000",
  "KSh 50,000 - 100,000",
  "KSh 100,000 - 250,000",
  "KSh 250,000 - 500,000",
  "KSh 500,000+",
  "Undecided",
];

const timelines = ["ASAP", "This month", "1-3 months", "Just exploring"];

function ContactFormInner() {
  const searchParams = useSearchParams();
  const preset = searchParams.get("service");
  const [service, setService] = useState<string>(
    preset && services.includes(preset) ? preset : ""
  );
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload: Record<string, string> = {};
    data.forEach((value, key) => {
      if (typeof value === "string") payload[key] = value;
    });

    setStatus("sending");
    track("quote_request", { service: payload.service ?? "general" });

    try {
      const res = await fetch(siteConfig.formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (res.ok) {
        setStatus("sent");
        track("contact_submit", { ok: true, service: payload.service ?? "general" });
        form.reset();
        setService("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    backgroundColor: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    color: "var(--color-foreground)",
  };

  if (status === "sent") {
    return (
      <div className="apple-card-flat p-8 text-center">
        <span className="apple-eyebrow-accent justify-center">Transmission received</span>
        <h3 className="apple-heading-compact mt-4">Message sent.</h3>
        <p className="text-sm leading-relaxed mt-3 max-w-md mx-auto" style={{ color: "var(--color-muted)" }}>
          Thanks &mdash; I&apos;ll get back to you within one working day. Need an immediate answer?
          Message me on WhatsApp instead.
        </p>
        <a
          href={whatsappLink("Hi Joseph, I just sent a project request through the site.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 rog-btn-secondary relative overflow-hidden rounded-[2px] px-5 py-2.5 text-[11px] font-bold uppercase font-mono"
        >
          <span className="relative">WhatsApp instead</span>
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="_subject" value={`New project request — ${service || "General"}`} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Name *">
          <input type="text" name="name" required placeholder="Your name" className="w-full rounded-[3px] px-4 py-3 text-xs font-mono outline-none transition-colors" style={inputStyle} />
        </Field>
        <Field label="Organization">
          <input type="text" name="organization" placeholder="Company / school / personal" className="w-full rounded-[3px] px-4 py-3 text-xs font-mono outline-none transition-colors" style={inputStyle} />
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Email *">
          <input type="email" name="email" required placeholder="you@example.com" className="w-full rounded-[3px] px-4 py-3 text-xs font-mono outline-none transition-colors" style={inputStyle} />
        </Field>
        <Field label="Phone / WhatsApp">
          <input type="tel" name="phone" placeholder="+254 7XX XXX XXX" className="w-full rounded-[3px] px-4 py-3 text-xs font-mono outline-none transition-colors" style={inputStyle} />
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field label="Service *">
          <select name="service" required value={service} onChange={(e) => setService(e.target.value)} className="w-full rounded-[3px] px-4 py-3 text-xs font-mono outline-none transition-colors" style={inputStyle}>
            <option value="" disabled>Select service</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>
        <Field label="Budget">
          <select name="budget" className="w-full rounded-[3px] px-4 py-3 text-xs font-mono outline-none transition-colors" style={inputStyle}>
            <option value="">Not sure yet</option>
            {budgets.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </Field>
        <Field label="Timeline">
          <select name="timeline" className="w-full rounded-[3px] px-4 py-3 text-xs font-mono outline-none transition-colors" style={inputStyle}>
            <option value="">No rush</option>
            {timelines.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Project description *">
        <textarea name="message" required rows={5} placeholder="What are you trying to build, fix or improve?" className="w-full rounded-[3px] px-4 py-3 text-xs font-mono outline-none transition-colors resize-none" style={inputStyle} />
      </Field>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rog-btn-primary relative overflow-hidden rounded-[2px] px-6 py-3.5 text-[11px] font-mono font-bold uppercase tracking-[0.14em] disabled:opacity-60"
      >
        <span className="relative">{status === "sending" ? "Sending\u2026" : "Send Request"}</span>
      </button>
      {status === "error" && (
        <p className="text-xs font-mono" style={{ color: "var(--flag)" }}>
          Something went wrong. Email me directly instead:{" "}
          <a href={`mailto:${siteConfig.email}`} className="underline">{siteConfig.email}</a>
        </p>
      )}
      <p className="text-[10px] font-mono text-center" style={{ color: "var(--color-muted)" }}>
        No obligation &middot; I&apos;ll reply within one working day &middot; Free initial conversation
      </p>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block mb-1.5 text-[10px] font-mono font-bold tracking-[0.12em] uppercase" style={{ color: "var(--color-muted)" }}>
        {label}
      </span>
      {children}
    </label>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={<div className="apple-card-flat p-8 text-sm" style={{ color: "var(--color-muted)" }}>Loading form&hellip;</div>}>
      <ContactFormInner />
    </Suspense>
  );
}