import React from "react";
import Link from "next/link";
import { BsGithub, BsLinkedin, BsTwitterX, BsInstagram } from "react-icons/bs";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { whatsappCtaMessage } from "@/lib/cta-messages";

const socials = [
  { icon: <BsGithub />, url: siteConfig.socials.github, label: "GitHub" },
  { icon: <BsLinkedin />, url: siteConfig.socials.linkedin, label: "LinkedIn" },
  { icon: <BsTwitterX />, url: siteConfig.socials.x, label: "X" },
  { icon: <BsInstagram />, url: siteConfig.socials.instagram, label: "Instagram" },
];

const columns: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Services",
    links: [
      { label: "All Services", href: "/services" },
      { label: "Software Engineering", href: "/software-engineering" },
      { label: "IT Consulting", href: "/it-consulting" },
      { label: "Infrastructure", href: "/infrastructure" },
      { label: "Cloud & DevOps", href: "/cloud" },
      { label: "AI & Automation", href: "/ai-automation" },
      { label: "Technical Leadership", href: "/technical-leadership" },
    ],
  },
  {
    heading: "PC Building",
    links: [
      { label: "Custom PC Building", href: "/pc-building" },
      { label: "Gaming PCs", href: "/gaming-pcs" },
      { label: "Developer Workstations", href: "/workstations" },
      { label: "PC Upgrades", href: "/pc-upgrades" },
      { label: "PC Troubleshooting", href: "/pc-troubleshooting" },
      { label: "PC Build Tool", href: "/tools/pc-build" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Guides", href: "/guides" },
      { label: "Infrastructure Check", href: "/tools/infrastructure-check" },
      { label: "Homelab", href: "/homelab" },
      { label: "About Joseph", href: "/about" },
      { label: "Work", href: "/work" },
    ],
  },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative w-full" style={{ backgroundColor: "var(--ink)", color: "#fff", borderTop: "4px solid var(--ink)" }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-14 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          <div className="lg:col-span-2">
            <span className="text-[11px] font-mono font-bold tracking-[0.24em] uppercase" style={{ color: "#fff" }}>
              Mfalme&middot;0
            </span>
            <p className="text-xs font-mono leading-relaxed mt-3 max-w-xs" style={{ color: "#E0E0E0" }}>
              Software, infrastructure, AI, hardware and technical systems &mdash; designed, built and operated
              from Nairobi.
            </p>
            <div className="flex items-center gap-4 mt-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-sm transition-all duration-300 hover:-translate-y-0.5 hover:opacity-60"
                  style={{ color: "#fff" }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <div className="mt-6 space-y-2">
              <a
                href={whatsappLink(whatsappCtaMessage("general"))}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs font-mono font-bold tracking-[0.08em] uppercase"
                style={{ color: "var(--water)" }}
              >
                WhatsApp: {siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="block text-xs font-mono font-medium" style={{ color: "#E0E0E0" }}>
                {siteConfig.email}
              </a>
              <span className="block text-xs font-mono font-medium"               style={{ color: "#E0E0E0" }}>
                {siteConfig.location} &middot; {siteConfig.timezone}
              </span>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <span className="text-[9px] font-semibold tracking-[0.14em] uppercase" style={{ color: "var(--water)" }}>
                {col.heading}
              </span>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-xs font-medium transition-colors hover:text-(--color-accent)" style={{ color: "#fff" }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid var(--rule)" }}>
          <p className="text-[10px] font-medium" style={{ color: "#E0E0E0" }}>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="badge-est">Ref Mfalme&middot;0-2026</span>
            <span className="text-[10px] font-medium"             style={{ color: "#E0E0E0" }}>
              Designed &amp; Built in Nairobi
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}