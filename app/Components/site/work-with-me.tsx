import React from "react";
import { mailtoLink, whatsappLink } from "@/lib/site-config";
import { CtaAnchor, CtaLink } from "./buttons";
import { MetricCard } from "./cards";

/**
 * Editable stats for the Work With Me section. Swap the placeholder values for
 * live analytics figures whenever they change — nothing else needs to move.
 */
export const workWithMeStats = {
  monthlyVisitors: {
    value: "340",
    label: "Monthly visitors",
    detail: "Readers landing on guides, posts and case studies.",
  },
  inDepthPosts: {
    value: "8",
    label: "In-depth posts",
    detail: "Build logs, post-mortems and architecture notes.",
  },
  kenyaReaders: {
    value: "80%",
    label: "Readers from Kenya",
    detail: "Local infrastructure and buying guides do the heavy lifting.",
  },
  instagramFollowers: {
    value: "100",
    label: "Instagram followers",
    detail: "Short posts from the lab between the long write-ups.",
  },
} as const;

interface WorkWithMeAction {
  label: string;
  href: string;
  external?: boolean;
}

interface WorkWithMeOption {
  id: string;
  heading: string;
  blurb: string;
  bullets: readonly string[];
  actions: readonly WorkWithMeAction[];
}

const workWithMeOptions: readonly WorkWithMeOption[] = [
  {
    id: "hire",
    heading: "Hire me for a project",
    blurb: "Systems, automation and hardware for businesses, schools and offices.",
    bullets: [
      "ERPs, portals and API integrations",
      "Servers, networking and backups",
      "Custom PC builds and upgrades",
      "AI and workflow automation",
    ],
    actions: [
      { label: "Start a project", href: "/contact" },
      {
        label: "Message on WhatsApp",
        href: whatsappLink("Hi Joseph, I'd like to talk about a project."),
        external: true,
      },
    ],
  },
  {
    id: "partner",
    heading: "Partner with the blog",
    blurb: "Honest hands-on reviews and benchmarks for tech brands and retailers.",
    bullets: [
      "Written review or benchmark post",
      "Homelab, local AI, PC and audio coverage",
      "Short social posts on Instagram and X",
      "Disclosure on every sponsored post, and my own verdict",
    ],
    actions: [{ label: "Email me", href: mailtoLink("Blog partnership") }],
  },
];

const stats = Object.values(workWithMeStats);

export function WorkWithMe() {
  return (
    <section
      id="work-with-me"
      aria-labelledby="work-with-me-heading"
      className="relative w-full py-16 md:py-20 scroll-mt-28"
      style={{ backgroundColor: "var(--paper)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-14">
        <span className="apple-eyebrow">Collaboration</span>
        <h2 id="work-with-me-heading" className="apple-heading-compact mt-4">
          Work with me
        </h2>
        <p className="apple-subtitle text-sm leading-relaxed mt-4" style={{ maxWidth: "46rem" }}>
          I build and run software, servers and PCs from Nairobi, and I write about what actually
          works. Pick the option that fits.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-y-10 md:gap-y-0">
          <div className="flex md:pr-10">
            <Option option={workWithMeOptions[0]} />
          </div>

          <div
            aria-hidden="true"
            className="h-px w-full md:h-auto md:w-px"
            style={{ backgroundColor: "var(--rule)" }}
          />

          <div className="flex md:pl-10">
            <Option option={workWithMeOptions[1]} />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <MetricCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              detail={stat.detail}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Option({ option }: { option: WorkWithMeOption }) {
  return (
    <div className="apple-card-flat p-7 w-full flex flex-col">
      <h3 className="text-lg font-semibold tracking-tight" style={{ color: "var(--fg)" }}>
        {option.heading}
      </h3>
      <p className="text-sm leading-relaxed mt-2" style={{ color: "var(--gravel)" }}>
        {option.blurb}
      </p>
      <ul className="mt-5 space-y-2 flex-1">
        {option.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2 text-xs" style={{ color: "var(--gravel)" }}>
            <span
              className="mt-[5px] w-1 h-1 rounded-full shrink-0"
              style={{ backgroundColor: "var(--flag)" }}
            />
            {bullet}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-3">
        {option.actions.map((action) =>
          action.external ? (
            <CtaAnchor
              key={action.label}
              href={action.href}
              label={action.label}
              variant="ghost"
              external
            />
          ) : action.href.startsWith("/") ? (
            <CtaLink key={action.label} href={action.href} label={action.label} />
          ) : (
            <CtaAnchor key={action.label} href={action.href} label={action.label} variant="ghost" />
          )
        )}
      </div>
    </div>
  );
}
