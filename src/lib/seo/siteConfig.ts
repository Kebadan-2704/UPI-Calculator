/**
 * Centralized site configuration.
 * Single source of truth for domain, site name, author, and branding.
 * Used by metadata, structured data, sitemap, robots, OG tags, and share URLs.
 *
 * When migrating to a custom domain, only this file needs to change.
 */

export const siteConfig = {
  /** Canonical site name */
  name: "UPI Cost Calculator",

  /** Short name for PWA and compact displays */
  shortName: "UPI Cost",

  /** Production URL — no trailing slash */
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://upi-calculator-pink.vercel.app",

  /** Site description for default metadata */
  description:
    "Free UPI MDR calculator and rules reference. Calculate merchant discount rates, thresholds, caps, and payment costs for Indian UPI transactions. Updated for October 2026 rules.",

  /** Author information */
  author: {
    name: "Keba Daniel J.",
    url: "https://upicost.in/about",
  },

  /** Locale */
  locale: "en_IN" as const,
  language: "en" as const,

  /** Theme colors matching design system */
  themeColor: {
    light: "#F8F6F1",
    dark: "#000000",
  },

  /** Social / OG defaults */
  og: {
    image: "/og-image.png",
    imageWidth: 1200,
    imageHeight: 630,
    type: "website" as const,
  },

  /** Twitter card defaults */
  twitter: {
    card: "summary_large_image" as const,
  },

  /** Ruleset info for display */
  ruleset: {
    version: "1.0.0",
    effectiveFrom: "2026-10-15",
    lastReviewed: "September 2026",
  },
} as const;

/**
 * Build an absolute URL from a relative path.
 */
export function absoluteUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
