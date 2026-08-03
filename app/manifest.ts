import type { MetadataRoute } from 'next';

import { profile } from '@/constants/profile';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — Backend Software Engineer`,
    short_name: profile.name,
    description:
      'Portfolio of Aryan Tiwari — backend systems, REST APIs, and production AI automation.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#050816',
    theme_color: '#050816',
    categories: ['portfolio', 'technology', 'productivity'],
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
    ],
  };
}
