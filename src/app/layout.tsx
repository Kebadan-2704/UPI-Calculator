import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatbotWidget } from "@/components/chat/ChatbotWidget";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { siteConfig } from "@/lib/seo/siteConfig";
import { generateWebSiteSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Free UPI MDR Calculator India (2026) — Calculate Merchant Charges Instantly",
    template: "%s | UPI Cost Calculator",
  },
  description: siteConfig.description,
  keywords: [
    "UPI MDR calculator",
    "UPI MDR calculator India",
    "merchant discount rate calculator",
    "UPI charges calculator",
    "QR MDR calculator",
    "UPI merchant charges calculator",
    "GST on MDR calculator",
    "payment gateway charges calculator",
    "UPI cost calculator",
    "UPI fees 2026",
    "P2M charges calculator",
    "UPI settlement calculator",
    "NPCI MDR",
  ],
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    title: "Free UPI MDR Calculator India — Calculate Merchant Charges",
    description:
      "Calculate UPI MDR, payment gateway fees, GST, net settlement amount and merchant charges instantly. Updated for October 2026 rules.",
    siteName: siteConfig.name,
    url: siteConfig.url,
    images: [
      {
        url: siteConfig.og.image,
        width: siteConfig.og.imageWidth,
        height: siteConfig.og.imageHeight,
        alt: "UPI MDR Calculator — Calculate Merchant Charges Instantly",
      },
    ],
  },
  twitter: {
    card: siteConfig.twitter.card,
    title: "UPI MDR Calculator India — Merchant Charges Calculator",
    description:
      "Free calculator for UPI merchant discount rates, thresholds, caps, and net settlement. Updated for 2026.",
    images: [siteConfig.og.image],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={siteConfig.themeColor.light} media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content={siteConfig.themeColor.dark} media="(prefers-color-scheme: dark)" />

        {/* Preload critical fonts — eliminates render-blocking @import */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        />

        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />

        {/* WebSite structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body>
        {/* Skip link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to calculator
        </a>
        <LanguageProvider>
          <ThemeProvider>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <Header />
              <main id="main-content" style={{ flex: 1 }}>{children}</main>
              <Footer />
              <ChatbotWidget />
              <ServiceWorkerRegister />
            </div>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
