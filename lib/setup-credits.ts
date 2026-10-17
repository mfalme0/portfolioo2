/**
 * Provenance for the product photographs used in the /setup catalogue.
 *
 * A trademark notice covers the brand *names* on this site. It does not cover
 * the *photographs*, which are a separate copyright question. These records are
 * what make the image licensing honest: anything under a share-alike licence is
 * attributed on the device page, which is what the licence actually requires.
 *
 * Where a record is absent, the image came from the original hardware set in
 * `app/Components/Images/` and is uncredited to a third party.
 */

export interface ImageCredit {
  /** Who made the photograph. */
  author: string;
  /** Where it came from. */
  source: string;
  /** Short licence name, shown on the page. */
  licence: string;
}

export const setupImageCredits: Record<string, ImageCredit> = {
  "controllers/xbox-one-tech-recon": {
    author: "Spritekollision",
    source: "Wikimedia Commons",
    licence: "CC BY-SA 4.0",
  },
  "monitors/zowie-xl2731": {
    author: "BenQ / ZOWIE",
    source: "BenQ product database",
    licence: "Manufacturer imagery",
  },
  "monitors/dell-p2014ht": {
    author: "Dell",
    source: "Dell product media",
    licence: "Manufacturer imagery",
  },
};