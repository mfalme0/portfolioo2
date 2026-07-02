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

const baseUrl = "https://josephgitauc.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Joseph Gitau — Full-Stack Engineer & Systems Architect",
    template: "%s — Joseph Gitau",
  },
  description:
    "Full-stack engineer and systems architect in Nairobi, Kenya. Building production-grade software across React, Next.js, Node.js, C#, .NET, and cloud infrastructure. 3+ years of end-to-end delivery.",
  keywords: [
    "full-stack engineer", "software developer", "React developer",
    "Next.js", "Node.js", "TypeScript", "C#", ".NET", "Docker",
    "Nairobi", "Kenya", "portfolio", "web developer",
    "systems architect", "DevOps", "cloud infrastructure",
    "Joseph Gitau", "mfalme0", "React Native",
  ],
  authors: [{ name: "Joseph Gitau", url: "https://github.com/mfalme0" }],
  creator: "Joseph Gitau",
  publisher: "Joseph Gitau",
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Joseph Gitau",
    title: "Joseph Gitau — Full-Stack Engineer & Systems Architect",
    description:
      "Full-stack engineer and systems architect in Nairobi. Building production-grade software across React, Next.js, Node.js, C#, and cloud infrastructure.",
    url: baseUrl,
    images: [{ url: `${baseUrl}/opengraph-image.png`, width: 1200, height: 630, alt: "Joseph Gitau — Full-Stack Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joseph Gitau — Full-Stack Engineer & Systems Architect",
    description:
      "Full-stack engineer and systems architect in Nairobi. Building production-grade software across React, Next.js, Node.js, C#, and cloud infrastructure.",
    images: [`${baseUrl}/opengraph-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  alternates: {
    canonical: baseUrl,
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
