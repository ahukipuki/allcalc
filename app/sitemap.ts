import type { MetadataRoute } from 'next';
import { calculators, categories, SITE } from '@/lib/calculators';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...categories.map((c) => ({
      url: `${SITE.url}/${c.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...calculators.map((c) => ({
      url: `${SITE.url}/${c.category}/${c.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: c.popular ? 0.9 : 0.7,
    })),
    { url: `${SITE.url}/about`, lastModified: now, priority: 0.3 },
    { url: `${SITE.url}/privacy`, lastModified: now, priority: 0.3 },
    { url: `${SITE.url}/contact`, lastModified: now, priority: 0.3 },
  ];
}
