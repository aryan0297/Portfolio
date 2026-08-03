import type { Metadata } from 'next';

import { profile } from '@/constants/profile';
import { projects } from '@/constants/projects';
import { skills } from '@/constants/skills';

const TITLE = `${profile.name} — Backend Software Engineer & AI Automation Developer`;
const DESCRIPTION =
  'Backend Software Engineer building scalable Node.js and Express services, PostgreSQL data layers, secure REST APIs, and production AI automation with the OpenAI API, conversational AI, and voice AI.';

export const siteMetadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: TITLE,
    template: `%s — ${profile.name}`,
  },
  description: DESCRIPTION,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  keywords: [
    'Backend Software Engineer',
    'AI Automation Developer',
    'Node.js Developer',
    'Express.js',
    'PostgreSQL',
    'REST API Engineer',
    'OpenAI API',
    'Conversational AI',
    'Voice AI',
    'JWT Authentication',
    'Webhooks',
    profile.name,
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: profile.siteUrl,
    siteName: `${profile.name} — Portfolio`,
    title: TITLE,
    description: DESCRIPTION,
    // TODO(aryan): add a 1200x630 og-image.png in /public for richer link previews.
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${profile.name} — Backend Software Engineer`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
};

/**
 * JSON-LD `Person` graph.
 *
 * Structured data is what turns a search result into a knowledge panel entry —
 * it tells Google this is a named person with a job title, employer, and a
 * defined skill set, rather than an anonymous page of text.
 */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: 'Backend Software Engineer',
    description: DESCRIPTION,
    url: profile.siteUrl,
    email: `mailto:${profile.email}`,
    sameAs: [profile.githubUrl, profile.linkedinUrl],
    knowsAbout: skills.map((skill) => skill.name),
    // Locality matters for "backend engineer in <city>" style queries.
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jabalpur',
      addressRegion: 'Madhya Pradesh',
      addressCountry: 'IN',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'MBG Card',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Kesarwani Arts, Commerce & Education College',
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Backend Software Engineer',
      occupationalCategory: '15-1252.00',
      skills: 'Node.js, Express.js, PostgreSQL, REST APIs, JWT, Webhooks, OpenAI API, AI Automation',
    },
  };
}

/** Each case study exposed as a `CreativeWork` so projects can surface directly. */
export function projectsJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        description: project.overview,
        author: { '@type': 'Person', name: profile.name },
        keywords: project.tech.join(', '),
      },
    })),
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${profile.name} — Portfolio`,
    url: profile.siteUrl,
    inLanguage: 'en',
    author: { '@type': 'Person', name: profile.name },
  };
}
