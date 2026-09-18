/**
 * Reusable JSON-LD structured data generators.
 * All schemas follow https://schema.org specifications.
 * Only generates schemas for content that actually exists on the page.
 */

import { siteConfig, absoluteUrl } from "./siteConfig";

// ─── WebSite Schema ────────────────────────────────────────────────

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: generateOrganizationSchema(),
  };
}

// ─── Organization Schema ───────────────────────────────────────────

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/icon-512.png"),
  };
}

// ─── WebApplication Schema ─────────────────────────────────────────

export function generateWebApplicationSchema(overrides?: {
  name?: string;
  description?: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: overrides?.name || "UPI MDR Calculator",
    description:
      overrides?.description ||
      "Calculate UPI Merchant Discount Rate (MDR) for any transaction amount. Supports P2P and P2M classification, threshold, and cap calculations.",
    url: overrides?.url || absoluteUrl("/calculator"),
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    creator: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
  };
}

// ─── FAQPage Schema ────────────────────────────────────────────────

export function generateFAQSchema(
  faqs: { q: string; a: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

// ─── BreadcrumbList Schema ─────────────────────────────────────────

export function generateBreadcrumbSchema(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

// ─── Article Schema ────────────────────────────────────────────────

export type ArticleMeta = {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  image?: string;
};

export function generateArticleSchema(article: ArticleMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: absoluteUrl(article.path),
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
    publisher: generateOrganizationSchema(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(article.path),
    },
    ...(article.image && {
      image: absoluteUrl(article.image),
    }),
  };
}

// ─── Helper: Render schema as script tag props ─────────────────────

export function schemaToScriptProps(schema: Record<string, unknown>) {
  return {
    type: "application/ld+json" as const,
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(schema),
    },
  };
}
