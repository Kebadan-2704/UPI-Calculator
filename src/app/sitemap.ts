import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://upicostcalculator.com';

  const routes = [
    '',
    '/calculator',
    '/payment-breakdown',
    '/threshold',
    '/cap',
    '/rules',
    '/faq',
    '/sources',
    '/learn/what-is-upi-mdr',
    '/learn/does-upi-cost-money',
    '/learn/upi-2000-threshold',
    '/learn/upi-300-cap',
    '/learn/p2p-vs-p2m',
    '/about',
    '/privacy',
    '/terms',
    '/disclaimer',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' || route === '/calculator' ? 1 : 0.8,
  }));
}
