import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo/siteConfig';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // ─── Core Pages (highest priority) ───────────────────────────────
  const coreRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/calculator', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/upi-mdr-calculator', priority: 1.0, changeFrequency: 'weekly' as const },
  ];

  // ─── Calculator Tools (high priority) ────────────────────────────
  const toolRoutes = [
    { path: '/payment-breakdown', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/threshold', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/cap', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/merchant', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/monthly', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/bulk', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/upi-settlement-calculator', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/gst-on-mdr', priority: 0.9, changeFrequency: 'weekly' as const },
  ];

  // ─── Educational Content (medium-high priority) ──────────────────
  const learnRoutes = [
    { path: '/learn/what-is-upi-mdr', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/learn/does-upi-cost-money', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/learn/upi-2000-threshold', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/learn/upi-300-cap', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/learn/p2p-vs-p2m', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/upi-merchant-charges', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/merchant-discount-rate-guide', priority: 0.8, changeFrequency: 'monthly' as const },
  ];

  // ─── Reference & Trust Pages (medium priority) ───────────────────
  const referenceRoutes = [
    { path: '/faq', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/rules', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/sources', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/methodology', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/checker', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/developers', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/changelog', priority: 0.5, changeFrequency: 'monthly' as const },
  ];

  // ─── Legal & Trust Pages (lower priority) ────────────────────────
  const legalRoutes = [
    { path: '/about', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/disclaimer', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/contact', priority: 0.4, changeFrequency: 'yearly' as const },
  ];

  const allRoutes = [
    ...coreRoutes,
    ...toolRoutes,
    ...learnRoutes,
    ...referenceRoutes,
    ...legalRoutes,
  ];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
