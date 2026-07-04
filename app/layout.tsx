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
    default: "Joseph Gitau Chege — Software Engineer, Backend Systems & Cloud Reliability",
    template: "%s — Joseph Gitau Chege",
  },
  description:
    "Software engineer with 3+ years building production backend systems at scale in C#, Python, TypeScript, and C++. Specializing in identity & notification platforms, cloud reliability, and high-availability architectures. Nairobi, Kenya.",
  keywords: [
    "software engineer", "backend systems", "identity platform",
    "notification services", "C#", "Python", "TypeScript", "Azure",
    "Docker", "Kubernetes", "Nairobi", "Kenya", "portfolio",
    "cloud reliability", "DevOps", "incident response",
    "Joseph Gitau Chege", "mfalme0", "API development",
  ],
  authors: [{ name: "Joseph Gitau", url: "https://github.com/mfalme0" }],
  creator: "Joseph Gitau",
  publisher: "Joseph Gitau",
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Joseph Gitau Chege",
    title: "Joseph Gitau Chege — Software Engineer, Backend Systems & Cloud Reliability",
    description:
      "Software engineer with 3+ years building production backend systems at scale. Specializing in identity & notification platforms, cloud reliability, and high-availability architectures.",
    url: baseUrl,
    images: [{ url: `${baseUrl}/opengraph-image.png`, width: 1200, height: 630, alt: "Joseph Gitau Chege — Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joseph Gitau Chege — Software Engineer, Backend Systems & Cloud Reliability",
    description:
      "Software engineer with 3+ years building production backend systems at scale. Specializing in identity & notification platforms, cloud reliability, and high-availability architectures.",
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
            name: "Joseph Gitau Chege",
            url: "https://josephgitauc.vercel.app",
            jobTitle: "Software Engineer — Backend Systems",
            knowsAbout: [
              "C#", "Python", "TypeScript", "C++", "Azure",
              "Docker", "Kubernetes", "Identity Platforms",
              "Notification Services", "Cloud Reliability",
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
