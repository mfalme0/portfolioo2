export const CONSENT_STORAGE_KEY = "mfalme.consent.v1";
export const CONSENT_VERSION = 1;
export const CONSENT_CHANGE_EVENT = "mfalme:consent-change";
export const CONSENT_OPEN_EVENT = "mfalme:consent-open";

export type ConsentCategories = {
  analytics: boolean;
  marketing: boolean;
};

export type ConsentPreferences = ConsentCategories & {
  necessary: true;
};

export type ConsentRecord = ConsentPreferences & {
  version: number;
  savedAt: string;
};

interface TrackingOptOutNavigator extends Navigator {
  globalPrivacyControl?: boolean;
  msDoNotTrack?: string | null;
}

/**
 * Global Privacy Control (enforceable in several US states) and Do Not Track are
 * treated as an opt-out signal: when either is on, non-essential categories start
 * switched off. It is a default, not a lock — the banner still lets a visitor
 * turn analytics back on.
 */
export function hasTrackingOptOut(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as TrackingOptOutNavigator;
  return (
    nav.globalPrivacyControl === true ||
    nav.doNotTrack === "1" ||
    nav.msDoNotTrack === "1"
  );
}

export function defaultPreferences(): ConsentPreferences {
  return {
    necessary: true,
    analytics: !hasTrackingOptOut(),
    marketing: false,
  };
}

export function readConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    const record = parsed as Partial<ConsentRecord>;
    if (record.version !== CONSENT_VERSION) return null;
    return {
      necessary: true,
      analytics: record.analytics === true,
      marketing: record.marketing === true,
    };
  } catch {
    return null;
  }
}

export function writeConsent(preferences: ConsentPreferences): ConsentRecord {
  const record: ConsentRecord = {
    necessary: true,
    analytics: preferences.analytics,
    marketing: preferences.marketing,
    version: CONSENT_VERSION,
    savedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* storage blocked (private browsing) — the choice still applies to this page view */
  }
  window.dispatchEvent(
    new CustomEvent<ConsentRecord>(CONSENT_CHANGE_EVENT, { detail: record })
  );
  return record;
}

export function openConsentSettings(): void {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
