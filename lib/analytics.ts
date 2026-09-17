"use client";

export type TrackEvent =
  | "whatsapp_click"
  | "email_click"
  | "call_click"
  | "contact_submit"
  | "quote_request"
  | "pc_quote_request"
  | "audit_request"
  | "pc_build_tool_complete"
  | "infra_check_complete"
  | "resume_download"
  | "outbound_click"
  | "guide_started"
  | "tool_started";

interface TrackData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

type AnalyticsWindow = Window & {
  dataLayer?: TrackData[];
};

declare global {
  interface Window {
    dataLayer?: TrackData[];
  }
}

/**
 * Lightweight analytics dispatcher.
 * Pushes into `window.dataLayer` (Google Tag Manager standard convention) so
 * it can be wired to GA4/GTM later without changing event call sites, and
 * logs to the console in development.
 */
export function track(event: TrackEvent, data: TrackData = {}): void {
  const payload = { event, ...data, ts: new Date().toISOString() };
  try {
    const w = window as AnalyticsWindow;
    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push(payload);
    }
    if (process.env.NODE_ENV !== "production") {
      console.info("[analytics]", payload);
    }
  } catch {
    /* never break the UI for analytics */
  }
}

export function trackWhatsapp(message: string): void {
  track("whatsapp_click", { channel: "whatsapp", preset: message.slice(0, 80) });
}

export function trackOutbound(label: string, url: string): void {
  track("outbound_click", { label, url });
}