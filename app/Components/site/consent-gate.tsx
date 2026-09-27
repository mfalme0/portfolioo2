"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "@/lib/site-config";
import {
  CONSENT_CHANGE_EVENT,
  readConsent,
  writeConsent,
  type ConsentCategories,
  type ConsentPreferences,
} from "@/lib/consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface ConsentContextValue {
  /** False until localStorage has been read, so nothing loads during SSR. */
  ready: boolean;
  /** null means the visitor has not decided yet. */
  consent: ConsentPreferences | null;
  save: (next: ConsentCategories) => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error("useConsent must be used within <ConsentProvider>");
  }
  return context;
}

function readPreferences(detail: ConsentPreferences): ConsentPreferences {
  return {
    necessary: true,
    analytics: detail.analytics === true,
    marketing: detail.marketing === true,
  };
}

/**
 * Single source of truth for cookie consent.
 *
 * Google Analytics 4 and Vercel Analytics are not rendered at all until a visitor
 * actively opts in — the scripts are never fetched, so no non-essential cookie is
 * ever set and nothing is sent to Google before consent. Revoking consent
 * unmounts them again.
 */
export function ConsentProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<ConsentPreferences | null>(null);

  useEffect(() => {
    setConsent(readConsent());
    setReady(true);

    const onChange = (event: Event) => {
      setConsent(readPreferences((event as CustomEvent<ConsentPreferences>).detail));
    };
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, []);

  const save = useCallback((next: ConsentCategories) => {
    writeConsent({ necessary: true, ...next });
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({ ready, consent, save }),
    [ready, consent, save]
  );

  const analyticsEnabled = ready && consent?.analytics === true;

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {analyticsEnabled && (
        <>
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: [
                "window.dataLayer = window.dataLayer || [];",
                "function gtag(){dataLayer.push(arguments);}",
                "gtag('js', new Date());",
                `gtag('config', '${siteConfig.gaMeasurementId}', {`,
                "anonymize_ip: true,",
                "allow_google_signals: false,",
                "allow_ad_personalization_signals: false",
                "});",
              ].join(" "),
            }}
          />
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Analytics />
        </>
      )}
    </ConsentContext.Provider>
  );
}
