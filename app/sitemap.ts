import type { MetadataRoute } from 'next';

import { profile } from '@/constants/profile';

/**
 * Single-page site, so the sitemap lists the root plus the section anchors that
 * matter for deep links from search results.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: profile.siteUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...['about', 'experience', 'projects', 'skills', 'resume', 'contact'].map((section) => ({
      url: `${profile.siteUrl}/#${section}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
