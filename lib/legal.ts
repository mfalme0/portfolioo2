import { siteConfig } from "./site-config";

export const legalUpdated = "2026-09-27";
export const legalUpdatedLabel = "27 September 2026";

export const legalDocs = [
  { href: "/privacy", label: "Privacy Policy", short: "Privacy" },
  { href: "/terms", label: "Terms of Use", short: "Terms" },
  { href: "/cookies", label: "Cookie Policy", short: "Cookies" },
] as const;

/**
 * Shown on the /setup pages, which name a lot of third-party hardware.
 *
 * This covers brand *names* only. Product photography is a separate copyright
 * question handled per image — see `lib/setup-credits.ts` for the records that
 * drive the attribution lines on each device page.
 */
export const trademarkNotice =
  "Every product, brand and company named on this page is the trademark of its respective owner. " +
  "They are listed here purely to identify the hardware on one desk. " +
  "I am not affiliated with, sponsored by, endorsed by, or claiming ownership of any brand or product mentioned.";

export const legalController = {
  name: siteConfig.name,
  tradingAs: siteConfig.brand,
  email: siteConfig.email,
  phone: siteConfig.phone,
  location: siteConfig.location,
  jurisdiction: "Republic of Kenya",
  /**
   * Kenya's Data Protection Act, 2019 is administered by the Office of the
   * Data Protection Commissioner. Swap the contact block below for the
   * Commissioner's own details when registering as a data controller.
   */
  regulator: "Office of the Data Protection Commissioner (ODPC), Nairobi, Kenya",
  regulatorUrl: "https://www.odpc.go.ke",
  euSupervisoryAuthority:
    "Any supervisory authority in the visitor's country of residence, or the Irish Data Protection Commission as the lead authority where one-stop-shop applies",
  ukSupervisoryAuthority: "Information Commissioner's Office (ICO), Wilmslow, United Kingdom",
} as const;
