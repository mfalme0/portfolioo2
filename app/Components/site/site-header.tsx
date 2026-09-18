"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedLogo from "../animated-logo";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { whatsappCtaMessage } from "@/lib/cta-messages";
import { FiChevronDown } from "react-icons/fi";

interface NavLinkItem {
  label: string;
  href: string;
  description?: string;
}

interface NavGroup {
  label: string;
  links: NavLinkItem[];
}

const siteNavGroups: NavGroup[] = [
  {
    label: "Services",
    links: [
      { label: "All Services", href: "/services", description: "Overview of everything offered" },
      { label: "Software Engineering", href: "/software-engineering", description: "ERPs, portals, APIs" },
      { label: "IT Consulting", href: "/it-consulting", description: "Assessments, planning, audits" },
      { label: "Infrastructure", href: "/infrastructure", description: "Linux, servers, networking, backups" },
      { label: "Cloud & DevOps", href: "/cloud", description: "Azure, Docker, Kubernetes, CI/CD" },
      { label: "AI & Automation", href: "/ai-automation", description: "Workflows, documents, assistants" },
      { label: "Technical Leadership", href: "/technical-leadership", description: "Fractional CTO, architecture" },
    ],
  },
  {
    label: "PC Building",
    links: [
      { label: "Custom PC Building", href: "/pc-building", description: "PCs designed around your work" },
      { label: "Gaming PCs", href: "/gaming-pcs", description: "1080p to 4K, esports, streaming" },
      { label: "Developer & AI Workstations", href: "/workstations", description: "Dev, VMs, local AI" },
      { label: "PC Upgrades", href: "/pc-upgrades", description: "SSD, RAM, GPU, CPU" },
      { label: "PC Troubleshooting", href: "/pc-troubleshooting", description: "Diagnose and fix" },
      { label: "PC Consulting", href: "/pc-consulting", description: "Component selection & advice" },
      { label: "PC Build Tool", href: "/tools/pc-build", description: "Quick questionnaire" },
    ],
  },
  {
    label: "Case Studies",
    links: [
      { label: "All Case Studies", href: "/case-studies", description: "Evidence, not claims" },
      { label: "School ERP", href: "/case-studies/school-erp", description: "Full-stack ERP + operations" },
      { label: "Atlas: Distributed Systems", href: "/case-studies/atlas", description: "Raft, replicated KV, queues" },
      { label: "Infrastructure Build", href: "/case-studies/infrastructure", description: "Networks, storage, failover" },
      { label: "Automation & Operations", href: "/case-studies/automation", description: "Scripts, pipelines, hours saved" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Resources Home", href: "/resources", description: "Guides, tools and the lab" },
      { label: "Guides", href: "/guides", description: "PC, IT, software and AI guides" },
      { label: "Infrastructure Check", href: "/tools/infrastructure-check", description: "Free self-assessment" },
      { label: "Homelab", href: "/homelab", description: "Personal infrastructure lab" },
      { label: "LAN Party", href: "/LAN", description: "Local network gaming" },
    ],
  },
];

const plainLinks = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href;

  const activeGroup = useMemo(() => {
    for (const group of siteNavGroups) {
      if (group.links.some((l) => l.href === pathname)) return group.label;
    }
    if (plainLinks.some((l) => l.href === pathname)) return undefined;
    if (pathname === "/case-studies" || pathname.startsWith("/case-studies/")) return "Case Studies";
    if (pathname.startsWith("/guides")) return "Resources";
    return undefined;
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60] transition-all duration-500">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div
            className={`flex items-center justify-between px-4 md:px-5 py-2.5 mt-3 rounded-[3px] transition-all duration-500 ${
              scrolled || mobileOpen
                ? "bg-(--color-card-bg) backdrop-blur-2xl shadow-[0_2px_24px_rgba(0,0,0,0.06)] border border-(--color-border)"
                : "bg-transparent border border-transparent"
            }`}
          >
            <Link href="/" className="flex items-center gap-2.5" aria-label={siteConfig.name}>
              <AnimatedLogo size={22} />
              <span className="hidden sm:block text-[10px] font-semibold tracking-[0.3em] uppercase" style={{ color: "var(--color-foreground)" }}>
                Mfalme&middot;0
              </span>
            </Link>

            <nav className="hidden xl:flex items-center gap-0.5" aria-label="Main navigation">
              {plainLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative px-3 py-2 text-[11px] font-medium tracking-[0.08em] uppercase transition-colors ${
                    isActive(l.href) ? "text-(--color-foreground)" : "text-(--color-muted) hover:text-(--color-foreground)"
                  }`}
                >
                  {l.label}
                  {isActive(l.href) && <ActiveMarker />}
                </Link>
              ))}
              {siteNavGroups.map((group) => (
                <Dropdown key={group.label} group={group} active={activeGroup === group.label} pathname={pathname} />
              ))}
              <div className="mx-2 h-4 w-px" style={{ backgroundColor: "var(--color-border)" }} />
              <Link
                href="/contact"
                className="rog-btn-primary relative overflow-hidden rounded-[2px] px-4 py-2 text-[10px] font-bold uppercase font-mono tracking-[0.12em]"
              >
                <span className="relative flex items-center gap-1.5">Start a Project</span>
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                className="xl:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              >
                <div
                  className={`h-[1.5px] transition-all duration-300 ${mobileOpen ? "w-6 rotate-45 translate-y-[3.5px]" : "w-5"}`}
                  style={{ backgroundColor: "var(--color-foreground)" }}
                />
                <div
                  className={`h-[1.5px] transition-all duration-300 ${mobileOpen ? "w-6 -rotate-45 -translate-y-[3.5px]" : "w-3"}`}
                  style={{ backgroundColor: "var(--color-foreground)" }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[59] bg-(--color-background) xl:hidden overflow-y-auto pt-28 pb-16"
          >
            <div className="px-6 space-y-8">
              <nav className="flex flex-wrap gap-3" aria-label="Mobile primary">
                {plainLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="apple-card-flat px-4 py-3 text-sm font-semibold"
                    style={{ color: "var(--color-foreground)" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>

              {siteNavGroups.map((group) => (
                <div key={group.label}>
                  <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase" style={{ color: "var(--flag)" }}>
                    {group.label}
                  </span>
                  <ul className="mt-3 space-y-1">
                    {group.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-base font-medium"
                          style={{ color: isActive(l.href) ? "var(--flag)" : "var(--color-foreground)" }}
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="flex flex-col gap-3 pt-4" style={{ borderTop: "1px solid var(--color-border)" }}>
                <a
                  href={whatsappLink(whatsappCtaMessage("general"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rog-btn-primary relative overflow-hidden rounded-[2px] px-5 py-3 text-[11px] font-bold uppercase font-mono"
                >
                  <span className="relative">Start a Project</span>
                </a>
                <a href={`mailto:${siteConfig.email}`} className="text-center text-xs font-mono" style={{ color: "var(--color-muted)" }}>
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ActiveMarker() {
  return (
    <motion.span
      layoutId="site-nav-active"
      className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
      style={{ backgroundColor: "var(--flag)" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
  );
}

function Dropdown({ group, active, pathname }: { group: NavGroup; active: boolean; pathname: string }) {
  return (
    <div className="relative group/drop">
      <button
        type="button"
        className={`relative flex items-center gap-1 px-3 py-2 text-[11px] font-medium tracking-[0.08em] uppercase transition-colors ${
          active ? "text-(--color-foreground)" : "text-(--color-muted) hover:text-(--color-foreground)"
        }`}
        aria-haspopup="true"
      >
        {group.label}
        <FiChevronDown className="text-[10px] transition-transform duration-300 group-hover/drop:rotate-180" style={{ color: "var(--color-muted)" }} />
        {active && <ActiveMarker />}
      </button>
      <div className="invisible opacity-0 translate-y-2 group-hover/drop:visible group-hover/drop:opacity-100 group-hover/drop:translate-y-0 focus-within:visible focus-within:opacity-100 focus-within:translate-y-0 transition-all duration-200 absolute left-1/2 -translate-x-1/2 pt-3 w-[340px]">
        <div className="rounded-[3px] border bg-(--color-card-bg) backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-2" style={{ borderColor: "var(--color-border)" }}>
          {group.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`block rounded-[2px] px-3 py-2 transition-colors ${pathname === l.href ? "bg-(--color-card-bg)" : ""}`}
            >
              <span className="block text-[12px] font-semibold" style={{ color: "var(--color-foreground)" }}>
                {l.label}
              </span>
              {l.description && (
                <span className="block text-[10px] mt-0.5" style={{ color: "var(--color-muted)" }}>
                  {l.description}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
