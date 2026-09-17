import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatbotWidget } from "@/components/chat/ChatbotWidget";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

export const metadata: Metadata = {
  title: {
    default: "UPI Cost Calculator — Understand UPI Payment Costs & Rules",
    template: "%s | UPI Cost Calculator",
  },
  description:
    "Free UPI MDR calculator and rules reference. Understand merchant discount rates, thresholds, caps, and payment costs for Indian UPI transactions. Updated for October 2026 rules.",
  keywords: [
    "UPI calculator",
    "UPI MDR",
    "UPI cost",
    "merchant discount rate",
    "UPI charges",
    "UPI fees",
    "UPI rules 2026",
    "P2M charges",
    "UPI payment cost",
    "NPCI",
  ],
  authors: [{ name: "UPI Cost Calculator" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "UPI Cost Calculator — Understand UPI Payment Costs & Rules",
    description:
      "Free UPI MDR calculator and rules reference for Indian UPI transactions.",
    siteName: "UPI Cost Calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "UPI Cost Calculator",
    description:
      "Understand UPI merchant discount rates, thresholds, and caps.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "UPI Cost Calculator",
              "url": "https://upicost.in",
              "description": "Free UPI MDR calculator and rules reference.",
              "publisher": {
                "@type": "Organization",
                "name": "UPI Cost Calculator"
              }
            }),
          }}
        />
      </head>
      <body>
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
              <main style={{ flex: 1 }}>{children}</main>
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
