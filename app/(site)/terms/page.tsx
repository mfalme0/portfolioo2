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
  title: "Terms of Use",
  description:
    "The terms governing use of mfalme.runs-on.dev, including acceptable use, intellectual property, commercial engagement terms and liability limits under the law of Kenya.",
  path: "/terms",
  keywords: ["terms of use", "terms and conditions", "site terms", "Kenya"],
});

const sections: LegalSection[] = [
  {
    id: "agreement",
    heading: "Agreement to these terms",
    body: (
      <>
        <LegalP>
          By using this website you accept these terms. If you do not accept them, please close the
          browser &mdash; that is a complete and free way to decline.
        </LegalP>
        <LegalP>
          These terms apply to every visitor. They say nothing about the separate agreements that
          govern paid work: those are set out in a written statement of work, quote or contract
          which prevails over anything written here if the two ever conflict.
        </LegalP>
        <LegalP>
          These terms are governed by the law of the {legalController.jurisdiction}, and I operate
          the site from {legalController.location}.
        </LegalP>
      </>
    ),
  },
  {
    id: "who-i-am",
    heading: "Who runs this site",
    body: (
      <>
        <LegalP>
          This site is run by {legalController.name}, trading as {legalController.tradingAs}, an
          independent technology engineer and consultant. It is a personal and professional portfolio,
          not a registered company, and nothing on it creates a company, agency, partnership or joint
          venture.
        </LegalP>
        <LegalP>
          I am not acting as an agency, representative or employer for anyone named on this site. If
          a client, employer or platform is mentioned, that mention is descriptive and creates no
          authority on either side.
        </LegalP>
      </>
    ),
  },
  {
    id: "acceptable-use",
    heading: "Acceptable use",
    body: (
      <>
        <LegalP>You agree not to:</LegalP>
        <LegalList>
          <LegalItem>
            use the site unlawfully, or in a way that infringes anyone else&rsquo;s rights;
          </LegalItem>
          <LegalItem>
            attempt to gain unauthorised access to the site, its hosting, or any connected system;
          </LegalItem>
          <LegalItem>
            introduce malware, scrape the site at a rate that degrades it, or interfere with its
            operation;
          </LegalItem>
          <LegalItem>
            submit content through the forms that is unlawful, defamatory, or infringes another
            person&rsquo;s intellectual property;
          </LegalItem>
          <LegalItem>
            impersonate anyone, or misrepresent your affiliation with me;
          </LegalItem>
          <LegalItem>
            use automated tools to send unsolicited bulk messages through the contact facilities.
          </LegalItem>
        </LegalList>
        <LegalP>
          You may browse, read, print and share this site for personal and internal business use.
          Automated bulk extraction and republication are not permitted without written permission.
        </LegalP>
      </>
    ),
  },
  {
    id: "ip",
    heading: "Intellectual property",
    body: (
      <>
        <LegalTable
          head={["The site and its contents", "Status"]}
          rows={[
            ["The design, code, text, diagrams, layout and visual system of this website", "© " + legalController.name + ". All rights reserved."],
            ["The résumé, guides, case studies, and written commentary", "© " + legalController.name + ". All rights reserved."],
            ["Product names, logos and trade marks of third parties", "Property of their respective owners, used descriptively only."],
            ["Photographs and images", "Owned or properly licensed. Where a third party's work is shown, it is credited."],
            ["Client names, marks and screenshots", "Used with the client's permission, or anonymised where permission is absent."],
          ]}
        />
        <LegalP>
          Quoting a short extract for the purpose of review, comment or reporting, with a link back
          and attribution, is fine. Republishing an entire guide, guide set or the site design is
          not, without written permission.
        </LegalP>
        <LegalNote title="Client work">
          Intellectual property in deliverables produced for you is addressed in the applicable
          statement of work, not here. The default position, unless that document says otherwise, is
          that on full payment you own the bespoke deliverables produced specifically for you, while
          I retain the right to reuse general techniques, patterns and non-confidential know-how
          developed in the process.
        </LegalNote>
      </>
    ),
  },
  {
    id: "content-accuracy",
    heading: "Portfolio content and accuracy",
    body: (
      <>
        <LegalP>
          The case studies, metrics and results published here describe work I have done. Figures
          such as uptime percentages, cost reductions and time saved are drawn from the environments
          concerned and are provided to show the method rather than as a guarantee. They are not a
          promise that the same outcome will occur for you: your infrastructure, budget, team and
          constraints will differ, and saying otherwise would be dishonest.
        </LegalP>
        <LegalP>
          Some projects are described with clients, systems or identifying details generalised or
          anonymised. Where specific figures appear, they are accurate as at the date of
          publication and may no longer reflect the current state of the system. Historic information
          is not a warranty of present performance.
        </LegalP>
      </>
    ),
  },
  {
    id: "tools",
    heading: "The free tools",
    body: (
      <>
        <LegalP>
          The PC Build Tool and the Infrastructure Health Check are free self-assessments. They run
          entirely in your browser and apply a fixed scoring formula. Their output is:
        </LegalP>
        <LegalList>
          <LegalItem>
            <strong>Informational only.</strong> It is not an audit, a diagnosis, a quotation, or
            professional advice.
          </LegalItem>
          <LegalItem>
            <strong>Not a warranty.</strong> A part list, score or recommendation is a starting
            point. It can be wrong, and it does not account for what I have not been told.
          </LegalItem>
          <LegalItem>
            <strong>No obligation.</strong> Submitting a tool summary creates no client relationship
            and commits me to nothing.
          </LegalItem>
        </LegalList>
        <LegalP>
          If you rely on a tool result to order hardware or change infrastructure, the cost of being
          wrong sits with you. That is precisely why the tools exist to screen and guide, and why the
          real answers come from looking at the actual environment.
        </LegalP>
      </>
    ),
  },
  {
    id: "no-advice",
    heading: "No advice, and no client relationship",
    body: (
      <>
        <LegalP>
          Nothing on this site is legal, financial, tax, medical or regulated professional advice.
          Guides are written from practical experience and may be incomplete or out of date; check
          anything that matters against current authoritative documentation before acting on it.
        </LegalP>
        <LegalP>
          Using this site, reading the guides, downloading the résumé, running a tool, or contacting
          me does not create a professional, contractual or fiduciary relationship. That relationship
          begins only when both parties sign a written agreement, and it is governed by that
          agreement and not by these terms.
        </LegalP>
      </>
    ),
  },
  {
    id: "engagements",
    heading: "Quotes, pricing and engagements",
    body: (
      <>
        <LegalP>
          Prices and ranges shown on this site are indicative and quoted in Kenyan shillings. They
          are not offers. A binding price exists only once a written quote or statement of work has
          been issued and accepted.
        </LegalP>
        <LegalList>
          <LegalItem>
            <strong>Estimates are estimates.</strong> A fixed price assumes a defined scope. Work
            outside that scope is quoted separately before it is started, never invoiced as a
            surprise.
          </LegalItem>
          <LegalItem>
            <strong>Timelines depend on your input.</strong> Delays in access, decisions, content
            or third-party accounts move the schedule accordingly.
          </LegalItem>
          <LegalItem>
            <strong>Third-party costs are yours.</strong> Hardware, licences, cloud consumption,
            domains and third-party subscriptions are billed by the vendor to you unless a quote
            explicitly says otherwise.
          </LegalItem>
          <LegalItem>
            <strong>Deposit and cancellation.</strong> Where a deposit is required it is stated in
            the quote. Cancellation fees for work already commenced follow the quote.
          </LegalItem>
        </LegalList>
        <LegalP>
          Payment terms, late-payment interest, and the process for changing scope are all set out in
          the individual quote or contract.
        </LegalP>
      </>
    ),
  },
  {
    id: "confidentiality",
    heading: "Confidentiality and publicity",
    body: (
      <>
        <LegalP>
          Client information is treated as confidential. Access is limited to what is needed to do
          the work, and credentials are not reused across engagements.
        </LegalP>
        <LegalP>
          In return, I ask that commercial details stay confidential between us. Case studies are
          published only with permission, and otherwise anonymised to the point where you cannot be
          identified. You can ask at any time for a listing to be removed.
        </LegalP>
      </>
    ),
  },
  {
    id: "third-parties",
    heading: "Third-party links and content",
    body: (
      <>
        <LegalP>
          This site links to external sites &mdash; documentation, repositories, product pages and
          messaging services. I do not control them and am not responsible for their content,
          accuracy, availability, security or privacy practices.
        </LegalP>
        <LegalP>
          Following an external link is at your own risk. If a link is wrong or points somewhere
              unsafe, tell me and I will correct or remove it.
        </LegalP>
      </>
    ),
  },
  {
    id: "availability",
    heading: "Availability and changes",
    body: (
      <>
        <LegalP>
          The site is provided on an &ldquo;as available&rdquo; basis. I do not guarantee that it
          will be uninterrupted, error-free, or that any particular page will remain at its current
          address. Guides, tools and content may be corrected, updated or withdrawn at any time.
        </LegalP>
        <LegalP>
          Any uptime figures referenced on this site describe specific client environments under
          specific service arrangements. They are not a statement about this website, and they are
          not a service level commitment to you.
        </LegalP>
      </>
    ),
  },
  {
    id: "liability",
    heading: "Disclaimer and limitation of liability",
    body: (
      <>
        <LegalP>
          This site and its content are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;,
          without warranties of any kind, whether express or implied, including fitness for a
          particular purpose, accuracy, completeness and non-infringement.
        </LegalP>
        <LegalP>
          To the fullest extent permitted by law, {legalController.name} is not liable for any loss
          arising from your use of, or reliance on, this site or anything obtained from it &mdash;
          including lost profits, lost data, business interruption, or loss of goodwill &mdash;
          whether the claim is in contract, tort (including negligence), or otherwise, and even if
          advised that such loss was possible.
        </LegalP>
        <LegalP>
          Nothing in these terms excludes or limits liability for death or personal injury caused by
          negligence, for fraud or fraudulent misrepresentation, or for anything else that cannot
          lawfully be excluded. If a consumer protection statute in Kenya or the jurisdiction where
          you are located gives you rights that these terms would otherwise remove, those rights
          survive.
        </LegalP>
        <LegalNote title="Please read this before relying on anything here">
          I am one person. I would rather say plainly that nothing on a portfolio website is a
          guarantee than write protective wording and hope it holds. If something here matters for a
          real decision, verify it directly &mdash; that is what the free first conversation is for.
        </LegalNote>
      </>
    ),
  },
  {
    id: "indemnity",
    heading: "Indemnity",
    body: (
      <>
        <LegalP>
          You agree to indemnify {legalController.name} against claims, damages, losses and
          reasonable costs arising from your unlawful use of this site, your breach of these terms,
          or your infringement of anyone else&rsquo;s rights.
        </LegalP>
      </>
    ),
  },
  {
    id: "disputes",
    heading: "Governing law and disputes",
    body: (
      <>
        <LegalP>
          These terms are governed by the laws of the {legalController.jurisdiction}, and the courts
          of {legalController.location} have exclusive jurisdiction, without affecting any mandatory
          consumer protections available where you live.
        </LegalP>
        <LegalP>
          Before anything formal, raise it directly. Most disagreements are a misunderstanding about
          scope and resolve in a message. If a dispute survives that, the Kenyan courts are the
          forum, and a claim brought unreasonably or in bad faith may have its costs awarded against
          it.
        </LegalP>
      </>
    ),
  },
  {
    id: "general",
    heading: "General provisions",
    body: (
      <>
        <LegalList>
          <LegalItem>
            <strong>Changes.</strong> These terms may be revised. The date at the top shows the
            current version, and continued use after a revision means you accept it.
          </LegalItem>
          <LegalItem>
            <strong>Severability.</strong> If a provision is found unenforceable, the rest stands.
          </LegalItem>
          <LegalItem>
            <strong>No waiver.</strong> Failing to enforce a provision once does not waive it later.
          </LegalItem>
          <LegalItem>
            <strong>Entire agreement.</strong> These terms are the whole agreement about your use of
            this site, and they do not affect any separate agreement for paid work.
          </LegalItem>
        </LegalList>
      </>
    ),
  },
  {
    id: "contact",
    heading: "Contact",
    body: (
      <>
        <LegalP>
          Questions about these terms go to{" "}
          <a href={`mailto:${legalController.email}`} style={{ color: "var(--flag)" }}>
            {legalController.email}
          </a>{" "}
          or by post to {legalController.location}, {legalController.jurisdiction}. If you want to
          dispute something, say so in the subject line and it will be escalated rather than
          redirected.
        </LegalP>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPageJsonLd("/terms", "Terms of Use", metadata.description ?? ""),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Terms of Use", path: "/terms" },
            ]),
          ]),
        }}
      />
      <LegalPage
        eyebrow="Terms of Use"
        path="/terms"
        title={
          <>
            The <span style={{ color: "var(--flag)" }}>small print,</span> readable.
          </>
        }
        lead="The rules for using this site, written in plain language and kept honest. Nothing hidden in a wall of caps-lock — and nothing here overrides the contract we sign for actual work."
        summary={[
          {
            label: "Governing law",
            value: `Laws of the ${legalController.jurisdiction}, courts of ${legalController.location}.`,
          },
          {
            label: "Paid work",
            value: "Governed by a separate written quote or statement of work, not by these terms.",
          },
          {
            label: "Advice given here",
            value: "None. Guides and tools are informational and carry no guarantee.",
          },
        ]}
        sections={sections}
      />
    </>
  );
}
