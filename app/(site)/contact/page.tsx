import React from "react";
import type { Metadata } from "next";
import { pageMeta, webPageJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig, whatsappLink, mailtoLink } from "@/lib/site-config";
import { whatsappCtaMessage } from "@/lib/cta-messages";
import { PageHero } from "@/app/Components/site/page-hero";
import { CtaBand } from "@/app/Components/site/cta-band";
import { Faq } from "@/app/Components/site/faq";
import ContactForm from "@/app/Components/site/contact-form";

export const metadata: Metadata = pageMeta({
  title: "Contact — Software, IT, AI & PC Building Projects in Nairobi",
  description:
    "Get in touch for a free first conversation about software, IT infrastructure, AI automation, custom PC builds or technical leadership in Nairobi, Kenya.",
  path: "/contact",
  keywords: ["contact software engineer Nairobi", "IT consulting contact Kenya", "custom PC quote Nairobi"],
});

const contactFaqs = [
  { q: "What does the first conversation involve?", a: "A free, no-obligation chat about your problem or project. I'll tell you honestly whether I can help, what the scope would look like, and whether anything needs to happen before a build or engagement begins." },
  { q: "How quickly will I hear back?", a: "Within one working day. If the matter is urgent, WhatsApp is the fastest route and gets a response during business hours." },
  { q: "Is the consultation free?", a: "The first conversation is free. If the problem requires a deeper assessment — audit, architecture review, scoping — that phase is priced before work begins." },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPageJsonLd("/contact", "Contact Joseph Gitau Chege", metadata.description ?? ""),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ]),
          ]),
        }}
      />
      <PageHero
        eyebrow="Contact"
        title={<>A free first conversation, <span style={{ color: "var(--flag)" }}>no obligation.</span></>}
        lead="Tell me what's slow, what's broken, or what you're trying to build. The first conversation is free, the answer is honest, and nothing gets sold."
        crumbs={[{ name: "Home", path: "/" }, { name: "Contact" }]}
        meta={[siteConfig.email, siteConfig.phone, "Nairobi, Kenya"]}
        whatsappMessage={whatsappCtaMessage("general")}
      />

      <section className="relative w-full py-12 md:py-16" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <span className="apple-eyebrow-accent">Send a project request</span>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <div className="apple-card-flat p-6">
              <span className="apple-eyebrow-accent">Direct channels</span>
              <div className="mt-4 space-y-3">
                <a
                  href={whatsappLink(whatsappCtaMessage("general"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rog-btn-primary block text-center relative overflow-hidden rounded-[2px] px-5 py-3 text-[11px] font-bold uppercase font-mono"
                >
                  <span className="relative">Chat on WhatsApp</span>
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="rog-btn-secondary block text-center relative overflow-hidden rounded-[2px] px-5 py-3 text-[11px] font-bold uppercase font-mono"
                >
                  <span className="relative">Email directly</span>
                </a>
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="rog-btn-secondary block text-center relative overflow-hidden rounded-[2px] px-5 py-3 text-[11px] font-bold uppercase font-mono"
                >
                  <span className="relative">Call {siteConfig.phone}</span>
                </a>
              </div>
            </div>

            <div className="apple-card-flat p-6" style={{ background: "var(--sheet-2)" }}>
              <span className="apple-eyebrow-accent">Areas covered</span>
              <p className="text-sm leading-relaxed mt-2" style={{ color: "var(--gravel)" }}>
                Nairobi and surrounding areas: Kiambu, Kikuyu, Limuru, Ruaka, Westlands, Karen, Kilimani, Ruiru, Thika.
                Software and infrastructure work is delivered remotely or on-site depending on the project.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["Nairobi", "Kiambu", "Kikuyu", "Limuru", "Ruaka", "Westlands", "Karen", "Ruiru", "Thika"].map((a) => (
                  <span key={a} className="apple-tag">{a}</span>
                ))}
              </div>
            </div>

            <div className="apple-card-flat p-6">
              <span className="apple-eyebrow-accent">Response time</span>
              <p className="text-sm leading-relaxed mt-2" style={{ color: "var(--gravel)" }}>
                Within one working day for email and form submissions. WhatsApp gets a response during business hours.
                Urgent infrastructure issues — call or message directly.
              </p>
            </div>

            <div className="apple-card-flat p-6">
              <span className="apple-eyebrow-accent">What to include</span>
              <ul className="mt-2 space-y-2">
                {[
                  "What's slow, broken or not working",
                  "Who it affects and how often",
                  "Any budget or timeline in mind",
                  "Links, screenshots or docs if available",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: "var(--gravel)" }}>
                    <span className="mt-[5px] w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: "var(--flag)" }} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative w-full py-12 md:py-16" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          <Faq items={contactFaqs} title="Common questions" />
        </div>
      </section>

      <CtaBand
        title="Not ready to write? Start with WhatsApp."
        text="A short message describing the problem is enough to start. No commitment, no forms — just a conversation."
        cta={{ label: "Chat on WhatsApp", href: whatsappLink(whatsappCtaMessage("general")) }}
        waMessage={whatsappCtaMessage("general")}
        secondary={{ label: "Email instead", href: mailtoLink("Project inquiry") }}
      />
    </>
  );
}