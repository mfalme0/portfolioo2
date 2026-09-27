"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useConsent } from "./consent-gate";
import { buttonBase } from "./buttons";
import {
  CONSENT_OPEN_EVENT,
  defaultPreferences,
  hasTrackingOptOut,
  readConsent,
  type ConsentCategories,
} from "@/lib/consent";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const textButtonBase =
  "appearance-none cursor-pointer px-2 py-2.5 text-left text-[11px] font-bold uppercase font-mono tracking-[0.12em] transition-opacity duration-200 hover:opacity-70";

function ConsentButton({
  variant = "primary",
  onClick,
  children,
}: {
  variant?: "primary" | "ghost";
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${buttonBase} ${variant === "primary" ? "rog-btn-primary" : "rog-btn-secondary"}`}
    >
      <span className="relative">{children}</span>
    </button>
  );
}

const sheetStyle: React.CSSProperties = {
  background: "var(--sheet)",
  border: "3px solid var(--ink)",
  boxShadow: "6px 6px 0 var(--ink)",
};

const CATEGORIES: {
  key: keyof ConsentCategories | "necessary";
  label: string;
  description: string;
  locked: boolean;
}[] = [
  {
    key: "necessary",
    label: "Strictly necessary",
    description:
      "Keeps the site working and remembers the choice you make here. These cannot be switched off.",
    locked: true,
  },
  {
    key: "analytics",
    label: "Analytics",
    description:
      "Google Analytics and Vercel Analytics show which pages are actually useful so the work can be improved. Advertising and personalised-search signals are disabled.",
    locked: false,
  },
  {
    key: "marketing",
    label: "Marketing & targeting",
    description:
      "Not in use at the moment — no advertising or social pixels run on this site. Switching this on only gives consent for anything added later.",
    locked: false,
  },
];

function ConsentSwitch({
  id,
  label,
  description,
  checked,
  locked,
  onChange,
}: {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  locked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <div
      className="flex items-start justify-between gap-5 py-4"
      style={{ borderTop: "1px solid var(--rule)" }}
    >
      <div className="min-w-0">
        <span id={`${id}-label`} className="block text-sm font-bold" style={{ color: "var(--ink)" }}>
          {label}
        </span>
        <span id={`${id}-description`} className="block text-xs leading-relaxed mt-1" style={{ color: "var(--gravel)" }}>
          {description}
        </span>
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        aria-describedby={`${id}-description`}
        aria-disabled={locked || undefined}
        onClick={() => {
          if (!locked) onChange(!checked);
        }}
        className={`relative shrink-0 mt-0.5 w-14 h-8 appearance-none transition-colors duration-200 ${
          locked ? "cursor-not-allowed" : "cursor-pointer hover:opacity-80"
        }`}
        style={{
          backgroundColor: checked ? "var(--flag)" : "var(--sheet-2)",
          border: "2px solid var(--ink)",
        }}
      >
        <span
          aria-hidden="true"
          className="absolute top-[2px] left-[2px] h-[22px] w-[22px] transition-transform duration-200"
          style={{
            backgroundColor: "var(--ink)",
            transform: checked ? "translateX(28px)" : "translateX(2px)",
          }}
        />
      </button>
    </div>
  );
}

export default function CookieConsent() {
  const { ready, consent, save } = useConsent();
  const [bannerOpen, setBannerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draft, setDraft] = useState<ConsentCategories>({ analytics: false, marketing: false });
  const [trackingOptOut, setTrackingOptOut] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ready) return;
    const base = consent ?? defaultPreferences();
    setDraft({ analytics: base.analytics, marketing: base.marketing });
    setBannerOpen(consent === null);
    setTrackingOptOut(hasTrackingOptOut());
  }, [ready, consent]);

  useEffect(() => {
    const onOpen = () => {
      const current = readConsent() ?? defaultPreferences();
      setDraft({ analytics: current.analytics, marketing: current.marketing });
      setDialogOpen(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!dialogOpen) return;

    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setDialogOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus();
    };
  }, [dialogOpen]);

  const commit = (next: ConsentCategories) => {
    save(next);
    setBannerOpen(false);
    setDialogOpen(false);
  };

  if (!ready) return null;

  return (
    <>
      {bannerOpen && (
        <div className="fixed inset-x-0 bottom-0 z-[80] p-4 md:p-6" role="region" aria-label="Cookie consent">
          <div className="max-w-4xl mx-auto p-6 md:p-7" style={sheetStyle}>
            <span className="apple-eyebrow-accent">Cookies</span>
            <h2 className="text-xl font-semibold tracking-tight mt-3" style={{ color: "var(--ink)" }}>
              Your call, kept brief.
            </h2>
            <p className="text-[13px] leading-relaxed mt-3" style={{ color: "var(--gravel)" }}>
              Analytics cookies are only set if you say yes. Everything else is either strictly
              necessary or not used at all. Change your mind whenever you like —{" "}
              <Link href="/cookies" className="underline underline-offset-2" style={{ color: "var(--flag)" }}>
                read the cookie policy
              </Link>{" "}
              or{" "}
              <Link href="/privacy" className="underline underline-offset-2" style={{ color: "var(--flag)" }}>
                the privacy policy
              </Link>
              .
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <ConsentButton onClick={() => commit({ analytics: true, marketing: true })}>
                Accept all
              </ConsentButton>
              <ConsentButton variant="ghost" onClick={() => commit({ analytics: false, marketing: false })}>
                Reject non-essential
              </ConsentButton>
              <button type="button" onClick={() => setDialogOpen(true)} className={textButtonBase} style={{ color: "var(--flag)" }}>
                Manage preferences<span className="sr-only"> for cookie categories</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {dialogOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-4 sm:p-6"
          style={{ backgroundColor: "rgba(18,18,18,0.66)" }}
          onClick={(event) => {
            if (event.target === event.currentTarget) setDialogOpen(false);
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="consent-dialog-title"
            aria-describedby="consent-dialog-description"
            className="w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 md:p-8"
            style={{ ...sheetStyle, boxShadow: "8px 8px 0 var(--ink)" }}
          >
            <span className="apple-eyebrow-accent">Cookie settings</span>
            <h2 id="consent-dialog-title" className="text-2xl font-semibold tracking-tight mt-3" style={{ color: "var(--ink)" }}>
              Choose what runs.
            </h2>
            <p id="consent-dialog-description" className="text-[13px] leading-relaxed mt-3" style={{ color: "var(--gravel)" }}>
              Analytics only loads once you allow it — if you decline, no analytics script is
              downloaded at all. Your choice is remembered on this device.
            </p>

            {trackingOptOut && (
              <p
                className="text-xs leading-relaxed mt-4 p-4"
                style={{
                  background: "color-mix(in srgb, var(--water) 18%, var(--sheet))",
                  border: "2px solid var(--ink)",
                }}
              >
                <strong>Global Privacy Control is on</strong> in your browser, so non-essential
                cookies are off by default. You can still allow them here if you want.
              </p>
            )}

            <div className="mt-6">
              {CATEGORIES.map((category) => (
                <ConsentSwitch
                  key={category.key}
                  id={`consent-${category.key}`}
                  label={category.label}
                  description={category.description}
                  locked={category.locked}
                  checked={
                    category.key === "necessary" ? true : draft[category.key]
                  }
                  onChange={(next) => {
                    if (category.key === "necessary") return;
                    setDraft((current) => ({ ...current, [category.key]: next }));
                  }}
                />
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <ConsentButton onClick={() => commit({ analytics: true, marketing: true })}>
                Accept all
              </ConsentButton>
              <ConsentButton variant="ghost" onClick={() => commit(draft)}>
                Save preferences
              </ConsentButton>
              <button type="button" onClick={() => commit({ analytics: false, marketing: false })} className={textButtonBase} style={{ color: "var(--flag)" }}>
                Reject non-essential
              </button>
            </div>

            <p className="text-xs leading-relaxed mt-6" style={{ color: "var(--gravel)" }}>
              Full detail, including every cookie by name and duration, is in the{" "}
              <Link href="/cookies" className="underline underline-offset-2" style={{ color: "var(--flag)" }}>
                cookie policy
              </Link>
              . You can also block or delete cookies in your browser settings — that part is out of my
              hands.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
