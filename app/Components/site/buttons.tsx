import Link from "next/link";
import React from "react";

/**
 * Shared CTA layout. Exported so that <button> elements (cookie consent, cookie
 * settings) render identically to anchors — `appearance-none` is required because
 * the .rog-btn-* classes assume an anchor and leave the button's UA styling intact.
 */
export const buttonBase =
  "relative inline-flex items-center justify-center gap-2 appearance-none cursor-pointer px-5 py-2.5 text-[11px] font-bold uppercase font-mono tracking-[0.12em] transition-all duration-300 rounded-[2px] overflow-hidden";

export interface CtaProps {
  href: string;
  label: string;
  variant?: "primary" | "ghost";
  className?: string;
}

export function CtaLink({ href, label, variant = "primary", className = "" }: CtaProps) {
  const cls = variant === "primary" ? "rog-btn-primary" : "rog-btn-secondary";
  return (
    <Link href={href} className={`${buttonBase} ${cls} ${className}`}>
      <span className="relative flex items-center gap-2">{label}</span>
    </Link>
  );
}

export function CtaAnchor({
  href,
  label,
  variant = "ghost",
  className = "",
  external,
  onClick,
}: CtaProps & { external?: boolean; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
  const cls = variant === "primary" ? "rog-btn-primary" : "rog-btn-secondary";
  return (
    <a
      href={href}
      onClick={onClick}
      className={`${buttonBase} ${cls} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="relative flex items-center gap-2">{label}</span>
    </a>
  );
}