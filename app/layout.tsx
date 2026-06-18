import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "./Context/theme";
import { PerformanceProvider } from "./Context/performance";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joseph Gitau",
  description: "i was bored so i made this portfolio",
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
      <Analytics />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <PerformanceProvider>
            {children}
          </PerformanceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
