import { trademarkNotice } from "@/lib/legal";
import { setupImageCredits } from "@/lib/setup-credits";

/**
 * Small-print block shown at the foot of the /setup pages.
 *
 * Deliberately not a footer-wide element: the claim it makes is specific to
 * pages that name third-party hardware, so it lives where the naming happens.
 */
export function TrademarkNotice() {
  return (
    <p
      className="max-w-3xl text-xs leading-relaxed"
      style={{ color: "var(--gravel)" }}
    >
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--fg)" }}>
        Note on trademarks{" "}
      </span>
      {trademarkNotice}
    </p>
  );
}

/**
 * Per-image attribution. Share-alike licences require the author be credited,
 * so this is a licence obligation rather than a courtesy.
 */
export function ImageCredit({ category, slug }: { category: string; slug: string }) {
  const credit = setupImageCredits[`${category}/${slug}`];
  if (!credit) return null;

  return (
    <p className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: "var(--gravel)" }}>
      Image: {credit.author} · {credit.source} · {credit.licence}
    </p>
  );
}