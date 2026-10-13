"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedLogo from "../animated-logo";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { whatsappCtaMessage } from "@/lib/cta-messages";
import { FiDownload } from "react-icons/fi";

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "Hire Me", href: "/hire" },
  { label: "Work With Me", href: "/work-with-me" },
  { label: "Projects", href: "/work" },
  { label: "Writing", href: "/blog" },
  { label: "Contact", href: "/contact" },
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
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-[11px] font-medium tracking-[0.08em] uppercase transition-colors ${
                    isActive(link.href) ? "text-(--color-foreground)" : "text-(--color-muted) hover:text-(--color-foreground)"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && <ActiveMarker />}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={siteConfig.resume}
                className="hidden md:inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] font-mono px-3 py-2 rounded-[2px] border border-(--color-border) hover:border-(--color-foreground) transition-colors"
                style={{ color: "var(--color-foreground)" }}
              >
                <FiDownload className="text-[12px]" />
                Résumé
              </a>
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
            <div className="px-6 space-y-6">
              <nav className="flex flex-col gap-2" aria-label="Mobile primary">
                {primaryLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="apple-card-flat px-4 py-3 text-sm font-semibold"
                    style={{ color: isActive(link.href) ? "var(--flag)" : "var(--color-foreground)" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="flex flex-col gap-3 pt-4" style={{ borderTop: "1px solid var(--color-border)" }}>
                <a
                  href={siteConfig.resume}
                  className="text-center text-xs font-mono font-bold tracking-[0.12em] uppercase"
                  style={{ color: "var(--color-foreground)" }}
                >
                  Download résumé
                </a>
                <a
                  href={whatsappLink(whatsappCtaMessage("general"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rog-btn-primary relative overflow-hidden rounded-[2px] px-5 py-3 text-[11px] font-bold uppercase font-mono"
                >
                  <span className="relative">Start a Project</span>
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
