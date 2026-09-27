import React from "react";
import type { Metadata } from "next";
import { pageMeta, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { legalController } from "@/lib/legal";
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
  title: "Privacy Policy",
  description:
    "How Joseph Gitau Chege collects, uses, shares and protects personal data on mfalme.runs-on.dev — written for the Kenya Data Protection Act 2019 and the EU/UK GDPR.",
  path: "/privacy",
  keywords: ["privacy policy", "data protection", "GDPR", "Kenya Data Protection Act"],
});

const sections: LegalSection[] = [
  {
    id: "who-i-am",
    heading: "Who is responsible for your data",
    body: (
      <>
        <LegalP>
          This website is operated by an individual, not a company. Under data protection law the
          person deciding why and how personal data is processed is the &ldquo;data
          controller&rdquo;, and on this site that person is {legalController.name}, trading as{" "}
          {legalController.tradingAs}.
        </LegalP>
        <LegalP>
          Because there is a single decision-maker and no outsourced support team, the practical
          difference is that your data goes to me and to the specific processors named in section
          5, and to nobody else. There is no advertising network, no data broker, and no third
          party that buys, rents or appends records about you.
        </LegalP>
        <LegalTable
          head={["Detail", "Value"]}
          rows={[
            ["Controller", legalController.name],
            ["Trading as", legalController.tradingAs],
            ["Email", legalController.email],
            ["Telephone", legalController.phone],
            ["Location of processing", `${legalController.location}, ${legalController.jurisdiction}`],
            ["Regulator", legalController.regulator],
          ]}
        />
      </>
    ),
  },
  {
    id: "scope",
    heading: "What this policy covers",
    body: (
      <>
        <LegalP>
          This policy covers the website at mfalme.runs-on.dev, including the guides, the two
          interactive tools, the case studies and the home lab pages. It does not cover external
          websites you arrive at from a link here &mdash; WhatsApp, LinkedIn, GitHub and similar
          services run under their own policies, and clicking a link transfers you out of my
          control entirely.
        </LegalP>
        <LegalP>
          It is written to satisfy two overlapping regimes at once: the Data Protection Act, 2019 of
          Kenya, which applies to me as a controller operating from Nairobi, and the EU General Data
          Protection Regulation and UK GDPR, which apply where a visitor lives in the EEA, the UK or
          Switzerland. Where the two are stricter, the stricter one is followed.
        </LegalP>
      </>
    ),
  },
  {
    id: "what-is-collected",
    heading: "What is actually collected",
    body: (
      <>
        <LegalP>
          There are only three real sources of personal data here. Nothing is collected in the
          background beyond a page view, and nothing is collected at all if you never fill in a
          form.
        </LegalP>
        <LegalTable
          head={["Data", "Where it comes from", "When"]}
          rows={[
            [
              "Name, email address, phone or WhatsApp number, company, budget and project details",
              "The contact form on /contact and the two interactive tools",
              "Only when you submit a form yourself",
            ],
            [
              "Rough device, browser, language, approximate region and referring page",
              "Google Analytics 4 and Vercel Analytics",
              "Only after you accept analytics cookies",
            ],
            [
              "Your cookie choices",
              "This site's own preference storage",
              "When you accept, reject or change the banner",
            ],
          ]}
        />
        <LegalNote title="What is deliberately not collected">
          No payment card or bank details are ever processed here, no government or national
          identification numbers are requested, and no precise location data is collected. The free
          tools run entirely in your browser: the questions you answer to the PC Build Tool and the
          Infrastructure Check are scored on your own device and are only transmitted if you choose
          to send the resulting summary as an enquiry.
        </LegalNote>
      </>
    ),
  },
  {
    id: "why-and-basis",
    heading: "Why it is collected, and on what legal basis",
    body: (
      <>
        <LegalP>
          Each processing activity has a stated purpose and a lawful basis. The purposes are specific
          rather than open-ended, which is the whole point of having to declare them.
        </LegalP>
        <LegalTable
          head={["Purpose", "Data", "Legal basis"]}
          rows={[
            [
              "Answering your enquiry, quoting for work, and delivering services you have asked for",
              "Contact details and project details",
              "Performance of a contract or steps taken at your request prior to one (GDPR Art. 6(1)(b); Kenya DPA 2019 s.34 consent)",
            ],
            [
              "Keeping a record of conversations and work performed, and meeting accounting and legal obligations",
              "Contact details, engagement history, invoices",
              "Compliance with a legal obligation (GDPR Art. 6(1)(c))",
            ],
            [
              "Measuring which pages are useful so the site and the work can be improved",
              "Device, browser, language, approximate region, page path",
              "Consent, withdrawn at any time (GDPR Art. 6(1)(a))",
            ],
            [
              "Replying to you and defending legal claims",
              "Correspondence",
              "Legitimate interests in operating and defending the business (GDPR Art. 6(1)(f))",
            ],
            [
              "Detecting and preventing abuse of the forms and site",
              "Technical request data",
              "Legitimate interests in keeping the service available (GDPR Art. 6(1)(f))",
            ],
          ]}
        />
        <LegalP>
          Where consent is the basis, it is specific, informed, freely given and as easy to
          withdraw as to give. Refusing non-essential cookies is a single click and leaves the rest
          of the site fully usable.
        </LegalP>
      </>
    ),
  },
  {
    id: "cookies",
    heading: "Cookies and analytics",
    body: (
      <>
        <LegalP>
          Analytics code is not downloaded until you consent to it. If you decline, the Google
          Analytics and Vercel Analytics scripts are never fetched, so no analytics cookie is set
          and no request reaches either provider. There is no default-on tracking and no bundled
          tag manager that fires before consent.
        </LegalP>
        <LegalP>
          Where analytics is allowed, IP anonymisation is on, Google Signals are disabled, and
          personalised advertising features are explicitly switched off, so no advertising profile
          is built from your visit. Full technical detail sits in the cookie policy, which lists
          every cookie by name, provider, purpose and duration.
        </LegalP>
        <LegalList>
          <LegalItem>
            Your browser may also send a Global Privacy Control or Do Not Track signal. Where that
            signal is present, non-essential cookies start switched off.
          </LegalItem>
          <LegalItem>
            If your browser blocks cookies or JavaScript entirely, the site still renders, but your
            choice cannot be remembered between visits and the banner reappears.
          </LegalItem>
        </LegalList>
      </>
    ),
  },
  {
    id: "processors",
    heading: "Who else receives your data",
    body: (
      <>
        <LegalP>
          The following organisations process data on my behalf, strictly for the purpose listed.
          Each is an independent controller for its own service and is subject to its own privacy
          commitments.
        </LegalP>
        <LegalTable
          head={["Recipient", "Data", "Why"]}
          rows={[
            [
              "Formspree",
              "Everything you type into a contact form or tool summary",
              "Delivers the enquiry to my inbox. Submissions are handled on infrastructure located in the United States.",
            ],
            [
              "Google LLC (Analytics 4)",
              "Device, browser, language, approximate region, page path, events",
              "Aggregate page performance. Only if you consent. Google acts as an independent controller for this processing.",
            ],
            [
              "Vercel Inc.",
              "Request metadata for hosting, plus page views if consented",
              "Hosting the site and, if you consent, cookieless page analytics.",
            ],
            [
              "WhatsApp (Meta Platforms)",
              "Your phone number and any message you send",
              "Opens in WhatsApp when you choose to contact me that way. Governed by WhatsApp's own policy once you leave this site.",
            ],
            [
              "Email provider",
              "Your email address and correspondence",
              "Delivering replies. Addresses are consumer webmail accounts, not a marketing list.",
            ],
            [
              "Payment providers",
              "Payment references and amounts",
              "Only if we do business together, at which point your details go to the provider named on the invoice &mdash; not through this site.",
            ],
          ]}
        />
        <LegalP>
          I do not sell personal data, rent mailing lists, or share it for anyone else&rsquo;s
          independent purposes. I will not add a new recipient without updating this policy first.
        </LegalP>
      </>
    ),
  },
  {
    id: "retention",
    heading: "How long your data is kept",
    body: (
      <>
        <LegalP>
          Data is kept only for as long as the stated purpose requires, then deleted or anonymised.
        </LegalP>
        <LegalList>
          <LegalItem>
            <strong>Enquiries that do not become projects:</strong> deleted within 12 months of
            last contact.
          </LegalItem>
          <LegalItem>
            <strong>Client records and correspondence:</strong> kept for the duration of the
            engagement plus 6 years, which is the period Kenyan tax and company record-keeping
            expectations assume.
          </LegalItem>
          <LegalItem>
            <strong>Analytics data:</strong> held by Google for up to 14 months at user level and 25
            months at event level, then aggregated. Deleting cookies shortens this to whatever the
            provider retains for an anonymous identifier, which is typically a few months.
          </LegalItem>
          <LegalItem>
            <strong>Abuse and security logs:</strong> retained 6 months, then deleted.
          </LegalItem>
        </LegalList>
      </>
    ),
  },
  {
    id: "transfers",
    heading: "International transfers",
    body: (
      <>
        <LegalP>
          This site is hosted on infrastructure outside Kenya, and two of the processors named above
          operate outside Kenya. Where personal data leaves Kenya or the EEA, it is done on the
          lawful basis described in section 4, with the standard contractual protections that apply:
          processor agreements where the recipient is acting for me, and an adequacy decision or
          equivalent safeguards where the recipient is an independent controller.
        </LegalP>
        <LegalP>
          Transfers to the United States rely on the mechanisms available under the applicable
          regime, including the EU-US Data Privacy Framework where a recipient is certified. If you
          want to know the current certification status of a specific recipient, ask and I will
          confirm it rather than guess.
        </LegalP>
      </>
    ),
  },
  {
    id: "security",
    heading: "How your data is protected",
    body: (
      <>
        <LegalP>
          Reasonable technical and organisational measures, no more than a solo practice can honestly
          deploy:
        </LegalP>
        <LegalList>
          <LegalItem>
            Traffic served over HTTPS only, with HSTS enabled.
          </LegalItem>
          <LegalItem>
            Modern password hashing, MFA on the hosting account and the email account, and a
            hardware-backed key where the service supports it.
          </LegalItem>
          <LegalItem>
            No production database on this site at all. Form submissions pass through Formspree and
            land in email, which keeps the store of personal data small and easy to audit.
          </LegalItem>
          <LegalItem>
            Analytics disabled at the source until consent, so an unauthorised tag cannot quietly
            accumulate a profile of visitors.
          </LegalItem>
          <LegalItem>
            Access limited to one person. There is no team, so there is no insider risk beyond the
            obvious.
          </LegalItem>
        </LegalList>
        <LegalP>
          No system is perfectly secure. If a breach affects your data and is likely to cause you
          harm, the law requires me to notify you without undue delay and to notify the relevant
          supervisory authority where the threshold is met.
        </LegalP>
      </>
    ),
  },
  {
    id: "your-rights",
    heading: "Your rights",
    body: (
      <>
        <LegalP>
          You keep control of your data. These rights apply whether you are in Kenya, the EEA or
          anywhere else, and there is no charge for making any of them.
        </LegalP>
        <LegalTable
          head={["Right", "What it means in practice"]}
          rows={[
            ["Access", "I confirm what personal data I hold about you, where it came from, why it is held, who it is shared with, and how long it is kept."],
            ["Rectification", "I correct anything inaccurate, incomplete or out of date."],
            ["Erasure", "I delete your data where there is no overriding legal reason to keep it."],
            ["Restriction", "I stop processing while a dispute about accuracy or legitimate interests is resolved."],
            ["Objection", "I stop legitimate-interest processing, such as defensive retention of correspondence, on request."],
            ["Portability", "I provide your data in a structured, machine-readable format."],
            ["Withdraw consent", "I remove analytics and any other optional processing immediately, via the cookie settings."],
            ["Complain", "You can complain to a supervisory authority without going to me first."],
          ]}
        />
        <LegalP>
          To exercise any of these, email {legalController.email} with the subject line
          &ldquo;Data request&rdquo;. I respond within seven days. I may ask for enough information
          to confirm the request is genuinely from you; I will not ask for ID unless there is a
          concrete reason, and I will say why.
        </LegalP>
        <LegalP>
          Kenya: complaints may be lodged with the {legalController.regulator}. If you are in the
          EU or UK, you may also complain to {legalController.euSupervisoryAuthority} or the{" "}
          {legalController.ukSupervisoryAuthority}. The UK position is set out in the Information
          Commissioner&rsquo;s register of international transfers.
        </LegalP>
      </>
    ),
  },
  {
    id: "children",
    heading: "Children",
    body: (
      <>
        <LegalP>
          This site is a professional portfolio and is not directed at anyone under 16. I do not
          knowingly collect personal data from children. If you believe a child has submitted
          information through a form on this site, email {legalController.email} and it will be
          deleted immediately and without question.
        </LegalP>
      </>
    ),
  },
  {
    id: "automated",
    heading: "Automated decisions and profiling",
    body: (
      <>
        <LegalP>
          No decision with legal or similarly significant effect about you is made by automated
          means. The free tools apply a fixed scoring formula to the answers you give so they can
          produce a summary for you &mdash; they do not build a profile, and they do not know who
          you are. The output is informational and is not professional advice.
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
          If this policy changes materially &mdash; a new processor, a new category of data, or a
          change to the lawful basis &mdash; the &ldquo;last updated&rdquo; date at the top changes
          and the revision is noted below. Minor wording and formatting corrections do not trigger
          a new date.
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
    heading: "Contact and complaint",
    body: (
      <>
        <LegalP>
          Questions, requests and complaints all go to the same person, which is the point. Write to{" "}
          <a href={`mailto:${legalController.email}`} style={{ color: "var(--flag)" }}>
            {legalController.email}
          </a>{" "}
          or call {legalController.phone} between 09:00 and 18:00 EAT, Monday to Saturday. Postal
          correspondence is accepted at {legalController.location}, {legalController.jurisdiction}.
        </LegalP>
        <LegalP>
          If you are not satisfied with how I have handled a request, you have every right to
          escalate to a regulator. That is a legitimate step, not a betrayal.
        </LegalP>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPageJsonLd("/privacy", "Privacy Policy", metadata.description ?? ""),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Privacy Policy", path: "/privacy" },
            ]),
          ]),
        }}
      />
      <LegalPage
        eyebrow="Privacy Policy"
        path="/privacy"
        title={
          <>
            What happens to your <span style={{ color: "var(--flag)" }}>data.</span>
          </>
        }
        lead="Plainly written, specific about what is actually collected, and short enough to read. The site collects as little as it can get away with, and this page says exactly what that is."
        summary={[
          {
            label: "Who is the controller",
            value: `${legalController.name}, operating from ${legalController.location}. One person, no outsourced team.`,
          },
          {
            label: "Analytics by default",
            value: "Off. Scripts are not downloaded at all until you accept them.",
          },
          {
            label: "Your data, sold",
            value: "Never. No advertising networks, no data brokers, no purchased lists.",
          },
        ]}
        sections={sections}
      />
    </>
  );
}
