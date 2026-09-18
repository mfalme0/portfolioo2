import type { Metadata } from "next";
import Script from "next/script";
import { Outfit, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "./Context/theme";
import { PerformanceProvider } from "./Context/performance";
import { ErrorBoundary } from "./Components/error-boundary";
import CursorGlow from "./Components/cursor-glow";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const splineSansMono = Spline_Sans_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const baseUrl = "https://mfalme.runs-on.dev";

export const metadata: Metadata = {
  title: {
    default: "Joseph Gitau Chege — Technology Engineer & Technical Leader",
    template: "%s — Joseph Gitau Chege",
  },
  description:
    "Technology engineer and technical leader in Nairobi, Kenya — full-stack software engineering, cloud & infrastructure, Linux systems, networking, cybersecurity, AI & automation. Systems designed, deployed, operated and scaled end-to-end.",
  keywords: [
    "technology engineer", "technical leader", "software engineer",
    "systems architect", "full-stack developer", "backend systems",
    "cloud infrastructure", "Azure", "Docker", "Kubernetes",
    "Linux systems administration", "DevOps", "SRE", "networking",
    "cybersecurity", "distributed systems", "AI engineering", "automation",
    "Nairobi", "Kenya", "portfolio", "Joseph Gitau Chege", "mfalme0",
  ],
  authors: [{ name: "Joseph Gitau", url: "https://github.com/mfalme0" }],
  creator: "Joseph Gitau",
  publisher: "Joseph Gitau",
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Joseph Gitau Chege",
    title: "Joseph Gitau Chege — Technology Engineer & Technical Leader",
    description:
      "Technology engineer and technical leader in Nairobi, Kenya — full-stack software, cloud & infrastructure, Linux, networking, cybersecurity and AI. Systems designed, deployed, operated and scaled end-to-end.",
    url: baseUrl,
    images: [{ url: `${baseUrl}/opengraph-image.png`, width: 1200, height: 630, alt: "Joseph Gitau Chege — Technology Engineer & Technical Leader" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joseph Gitau Chege — Technology Engineer & Technical Leader",
    description:
      "Technology engineer and technical leader in Nairobi, Kenya — full-stack software, cloud & infrastructure, Linux, networking, cybersecurity and AI. Systems designed, deployed, operated and scaled end-to-end.",
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
          __html: `document.documentElement.dataset.theme='daylight'`
        }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Joseph Gitau Chege",
            url: "https://mfalme.runs-on.dev",
            jobTitle: "Technology Engineer & Technical Leader",
            knowsAbout: [
              "Software Engineering", "Full-Stack Development",
              "Backend Systems", "Systems Architecture", "Distributed Systems",
              "Cloud Infrastructure", "Azure", "Kubernetes", "Docker",
              "Linux Systems Administration", "Networking", "Cybersecurity",
              "CI/CD & Automation", "AI Engineering", "Technical Leadership",
            ],
            sameAs: [
              "https://github.com/mfalme0",
              "https://linkedin.com/in/joseph-g-471678208/",
              "https://x.com/joemfalme001",
            ],
          }),
        }}
        />
      <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-KC8Z48VS2N');`,
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KC8Z48VS2N"
          strategy="afterInteractive"
        />
      </head>
      <Analytics />
      <body
        className={`${outfit.variable} ${splineSansMono.variable} antialiased`}
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
              <CursorGlow size={350} />
              {children}
            </PerformanceProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
