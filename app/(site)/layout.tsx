import React from "react";
import SiteHeader from "../Components/site/site-header";
import SiteFooter from "../Components/site/site-footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="relative min-h-dvh" style={{ backgroundColor: "var(--paper)" }}>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}