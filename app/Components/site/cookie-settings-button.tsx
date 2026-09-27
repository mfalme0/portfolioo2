"use client";

import { openConsentSettings } from "@/lib/consent";

export default function CookieSettingsButton({
  label = "Cookie settings",
  className = "",
  style,
  children,
}: {
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  return (
    <button type="button" onClick={openConsentSettings} className={className} style={style}>
      {children ?? label}
    </button>
  );
}
