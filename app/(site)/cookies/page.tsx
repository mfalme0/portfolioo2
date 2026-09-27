import React from "react";
import type { Metadata } from "next";
import { pageMeta, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { legalController } from "@/lib/legal";
import { CONSENT_STORAGE_KEY } from "@/lib/consent";
import { siteConfig } from "@/lib/site-config";
import CookieSettingsButton from "@/app/Components/site/cookie-settings-button";
import { buttonBase } from "@/app/Components/site/buttons";
import {
  LegalPage,
  LegalP,
  LegalList,
  LegalItem,
  LegalNote,
  LegalTable,
  type LegalSection,
} from "@/app/Components/site/legal-page";

export const metadata: Metadata = pageMeta({
  title: "Cookie Policy",
  description:
    "Every cookie and browser storage item used on mfalme.runs-on.dev, listed by name, provider, purpose, duration and category — with controls to change your choice at any time.",
  path: "/cookies",
  keywords: ["cookie policy", "cookies", "consent", "GDPR cookies", "ePrivacy"],
});

const sections: LegalSection[] = [
  {
    id: "what-they-are",
    heading: "What cookies and similar storage are",
    body: (
      <>
        <LegalP>
          A cookie is a small text file a website asks your browser to store, then hand back on
          later requests. Browsers also expose equivalents that are not strictly cookies &mdash;
          <code> localStorage</code>, <code>sessionStorage</code> and IndexedDB &mdash; which this
          policy covers alongside cookies because they work the same way for privacy purposes.
        </LegalP>
        <LegalP>
          They exist for legitimate reasons. Without them, staying signed in, keeping a shopping
          basket or remembering that you dismissed a cookie banner simply would not work. The
          disagreement is never whether cookies are used &mdash; they are &mdash; but whether a
          visitor has actually agreed to the ones that are not required for the site to function.
        </LegalP>
      </>
    ),
  },
  {
    id: "how-used",
    heading: "How this site uses them",
    body: (
      <>
        <LegalP>
          The default position here is that nothing non-essential runs until you say so. The
          analytics scripts are not present in the page at all until you accept analytics cookies,
          which means they are never downloaded, no analytics cookie is ever set, and no request
          reaches Google or Vercel before consent. There is no tag manager that fires early and no
          pre-consent pixel.
        </LegalP>
        <LegalList>
          <LegalItem>
            <strong>Rejecting is as easy as accepting.</strong> One click each, same button weight,
            same position. The site is fully usable with everything non-essential refused.
          </LegalItem>
          <LegalItem>
            <strong>Granular control.</strong> Categories can be switched individually rather than
            only all-or-nothing.
          </LegalItem>
          <LegalItem>
            <strong>No dark patterns.</strong> The reject option is not made harder to find, the
            dialog is not pre-ticked, and there is no countdown or repeated nagging.
          </LegalItem>
          <LegalItem>
            <strong>Reversible.</strong> Your choice can be changed at any time, in one click, from
            the banner, this page, or the footer link.
          </LegalItem>
        </LegalList>
      </>
    ),
  },
  {
    id: "cookies-used",
    heading: "Every cookie used on this site",
    body: (
      <>
        <LegalP>
          This is the complete list. It is short because the site is small, and it has been kept
          short on purpose.
        </LegalP>
        <LegalTable
          head={["Name", "Provider", "Purpose", "Type", "Duration", "Category"]}
          rows={[
            [
              `_ga`,
              "Google LLC",
              "Distinguishes visitors from one another so reports do not merge separate visits into a single person.",
              "HTTP cookie",
              "2 years",
              "Analytics",
            ],
            [
              `_ga_${siteConfig.gaMeasurementId}`,
              "Google LLC",
              "Persists the analytics session state for this specific property.",
              "HTTP cookie",
              "2 years",
              "Analytics",
            ],
            [
              "_gid",
              "Google LLC",
              "Distinguishes visitors within a rolling 24-hour window.",
              "HTTP cookie",
              "24 hours",
              "Analytics",
            ],
            [
              "__vercel_lb",
              "Vercel Inc.",
              "Routes your request to the nearest data centre. Set by the hosting platform, not by me.",
              "HTTP cookie",
              "Session",
              "Strictly necessary",
            ],
            [
              CONSENT_STORAGE_KEY,
              "This site",
              "Remembers which cookie categories you chose, so you are not asked again on every page.",
              "localStorage (not a cookie)",
              "Until you clear site data",
              "Strictly necessary",
            ],
          ]}
        />
        <LegalNote title="Not in use">
          No advertising cookies. No social media pixels &mdash; there is no Facebook, Instagram or
          LinkedIn tracking embedded anywhere on this site. No third-party content embeds, so there
          are no YouTube or similar cookies. No cross-site advertising identifiers, and no
          fingerprinting. If that changes, this table and the consent banner change first.
        </LegalNote>
      </>
    ),
  },
  {
    id: "analytics-detail",
    heading: "What analytics is used, and with what settings",
    body: (
      <>
        <LegalTable
          head={["Service", "Cookies?", "IP addresses", "Notes"]}
          rows={[
            [
              "Google Analytics 4",
              "Yes &mdash; only with consent",
              "Not stored. GA4 truncates and discards rather than recording them.",
              "IP anonymisation on, Google Signals off, personalised advertising features disabled.",
            ],
            [
              "Vercel Web Analytics",
              "No &mdash; cookieless by design",
              "Not collected. A rotating daily salt is used instead, so the identifier cannot be linked across days.",
              "Aggregate page views only. It never leaves the site to build a profile about you.",
            ],
            [
              "Formspree",
              "None set on this site",
              "Handled under Formspree's own policy",
              "Delivers form submissions only. Their infrastructure is outside Kenya.",
            ],
          ]}
        />
        <LegalP>
          Because analytics is loaded only after consent, the practical effect of declining is that
          no analytics record of your visit exists at all &mdash; not a shorter one, and not an
          anonymous one. Nothing about the visit is measured.
        </LegalP>
      </>
    ),
  },
  {
    id: "managing",
    heading: "How to manage and withdraw consent",
    body: (
      <>
        <LegalP>
          You can change your mind whenever you like, and the change takes effect immediately:
        </LegalP>
        <LegalList>
          <LegalItem>
            Use the <strong>Cookie settings</strong> link in the footer of every page, or the
            button below.
          </LegalItem>
          <LegalItem>
            Clear your browser&rsquo;s site data for this domain, which discards the stored choice
            and makes the banner appear again on your next visit.
          </LegalItem>
          <LegalItem>
            Block third-party and cookies entirely in your browser settings. The site still works;
            you will simply be asked again each visit.
          </LegalItem>
        </LegalList>
        <LegalP>
          Withdrawing consent is as easy as giving it, and refusing retrospectively has the same
          effect as having refused at the outset. Where a personalisation setting exists in your
          browser, clearing it also clears the choice recorded here.
        </LegalP>
        <LegalNote title="I cannot do this part for you">
          Browser-level controls belong to your browser. Blocking cookies, clearing site data and
          private-browsing modes are all legitimate, and using them alongside a consent choice here
          is entirely reasonable.
        </LegalNote>
      </>
    ),
  },
  {
    id: "signal",
    heading: "Global Privacy Control and Do Not Track",
    body: (
      <>
        <LegalP>
          If your browser sends a Global Privacy Control or Do Not Track signal, this site treats
          it as an instruction: non-essential cookies start switched off, and the banner explains
          that this is why. It is treated as a default rather than a lock, so you can still turn
          analytics on deliberately if that is what you want.
        </LegalP>
        <LegalP>
          Global Privacy Control is a legally recognised opt-out signal in several US states
          including California. Honouring it is treated as a minimum obligation, not as consent to
          anything &mdash; signalling it never switches non-essential cookies on.
        </LegalP>
      </>
    ),
  },
  {
    id: "retention",
    heading: "How long a choice lasts",
    body: (
      <>
        <LegalP>
          Your stored preference is kept in your browser&rsquo;s localStorage until you clear it.
          It never expires on its own and is not transferred between browsers or devices, so a new
          device or a private window is treated as a new visitor and will ask again.
        </LegalP>
        <LegalP>
          Where analytics is allowed, the underlying Google data is retained by Google for up to 14
          months at user level and 25 months at event level before aggregation. The consent record
          itself contains only your choices, a version number and the date you saved them.
        </LegalP>
      </>
    ),
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: (
      <>
        <LegalP>
          If a new cookie, provider or purpose is introduced, the table in section 3 is updated and
          new categories are added to the banner as &ldquo;off&rdquo; requiring fresh consent. Adding
          a non-essential cookie is never bundled into an existing consent you already gave.
        </LegalP>
        <LegalTable
          head={["Date", "Change"]}
          rows={[["27 September 2026", "First published version."]]}
        />
      </>
    ),
  },
  {
    id: "contact",
    heading: "Questions",
    body: (
      <>
        <LegalP>
          If anything here is unclear, email{" "}
          <a href={`mailto:${legalController.email}`} style={{ color: "var(--flag)" }}>
            {legalController.email}
          </a>{" "}
          or call {legalController.phone}. If you want to know exactly which cookies a given page
          sets, that can be checked and reported on request &mdash; a site this size has a short
          enough list to answer precisely.
        </LegalP>
      </>
    ),
  },
];

export default function CookiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPageJsonLd("/cookies", "Cookie Policy", metadata.description ?? ""),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Cookie Policy", path: "/cookies" },
            ]),
          ]),
        }}
      />
      <LegalPage
        eyebrow="Cookie Policy"
        path="/cookies"
        title={
          <>
            Every cookie, <span style={{ color: "var(--flag)" }}>by name.</span>
          </>
        }
        lead="The full inventory of what this site stores on your device, what each item does and how long it lasts — plus the switch that turns non-essential cookies off."
        summary={[
          { label: "Non-essential by default", value: "Off. Not downloaded, not set, not sent." },
          { label: "Total cookies set", value: "Five items, only three of which are optional analytics cookies." },
          { label: "Change your mind", value: "Any time, one click, from the footer on every page." },
        ]}
        sections={sections}
      >
        <div className="p-7" style={{ background: "var(--sheet)", border: "3px solid var(--ink)", boxShadow: "6px 6px 0 var(--ink)" }}>
          <span className="apple-eyebrow-accent">Your settings</span>
          <h3 className="text-xl font-semibold tracking-tight mt-3" style={{ color: "var(--ink)" }}>
            Change your cookie choices.
          </h3>
          <p className="text-sm leading-relaxed mt-2" style={{ color: "var(--gravel)" }}>
            Opens the same panel as the original banner. Analytics loads or unloads immediately,
            without losing your place on the page.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <CookieSettingsButton className={`${buttonBase} rog-btn-primary`}>
              <span className="relative">Manage preferences</span>
            </CookieSettingsButton>
            <a
              href="/privacy"
              className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] self-center"
              style={{ color: "var(--flag)" }}
            >
              Read the privacy policy →
            </a>
          </div>
        </div>
      </LegalPage>
    </>
  );
}
