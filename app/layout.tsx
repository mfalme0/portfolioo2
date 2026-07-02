import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "./Context/theme";
import { PerformanceProvider } from "./Context/performance";
import { ErrorBoundary } from "./Components/error-boundary";
import { SketchProvider } from "./Components/sketch-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Joseph Gitau — Full-Stack Engineer",
    template: "%s — Joseph Gitau",
  },
  description:
    "Full-stack engineer building production-grade software across React, Next.js, Node.js, C#, and cloud infrastructure. Based in Nairobi.",
  keywords: [
    "full-stack engineer", "software developer", "React", "Next.js",
    "Node.js", "TypeScript", "Nairobi", "portfolio", "web developer",
    "systems architect", "DevOps",
  ],
  authors: [{ name: "Joseph Gitau" }],
  creator: "Joseph Gitau",
  metadataBase: new URL("https://josephgitauc.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Joseph Gitau",
    title: "Joseph Gitau — Full-Stack Engineer",
    description:
      "Full-stack engineer building production-grade software across React, Next.js, Node.js, C#, and cloud infrastructure.",
    url: "https://josephgitauc.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joseph Gitau — Full-Stack Engineer",
    description:
      "Full-stack engineer building production-grade software across React, Next.js, Node.js, C#, and cloud infrastructure.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='loki'||t==='dark')document.documentElement.dataset.theme=t==='loki'?'dark':'dark';else if(t==='light')document.documentElement.dataset.theme='light';else document.documentElement.dataset.theme='dark'}catch(e){document.documentElement.dataset.theme='dark'}})()`
        }} />
      </head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Joseph Gitau",
            url: "https://josephgitauc.vercel.app",
            jobTitle: "Full-Stack Engineer",
            knowsAbout: [
              "React", "Next.js", "TypeScript", "Node.js",
              "C#", ".NET", "Docker", "Cloud Infrastructure",
            ],
            sameAs: [
              "https://github.com/mfalme0",
              "https://linkedin.com/in/joseph-g-471678208/",
              "https://x.com/joemfalme001",
            ],
          }),
        }}
      />
      <Analytics />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="grain-overlay" aria-hidden="true" />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-semibold focus:bg-(--color-background) focus:text-(--color-foreground) focus:border focus:border-(--color-border)"
        >
          Skip to main content
        </a>
        <ErrorBoundary>
          <ThemeProvider>
            <PerformanceProvider>
              <SketchProvider />
              {children}
            </PerformanceProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
