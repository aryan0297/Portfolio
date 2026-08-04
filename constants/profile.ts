import { Github, Linkedin, Mail } from 'lucide-react';
import type { Profile, SocialLink } from '@/types';

/**
 * Single source of truth for identity + links.
 *
 * Env overrides let previews and production differ without a code change:
 *   NEXT_PUBLIC_GITHUB_USERNAME, NEXT_PUBLIC_LINKEDIN_URL,
 *   NEXT_PUBLIC_CONTACT_EMAIL, NEXT_PUBLIC_SITE_URL
 */
const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'aryan0297';

export const profile: Profile = {
  name: 'Aryan Tiwari',
  roles: [
    'Backend Software Engineer',
    'AI Automation Developer',
    'Backend API Engineer',
    'Problem Solver',
  ],
  tagline:
    'Building scalable backend systems, intelligent AI automation, and production-ready APIs that solve real-world business problems.',
  location: 'Jabalpur, Madhya Pradesh, India · Remote friendly',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'tiwariaryan668@gmail.com',
  githubUsername: aryan0297,
  githubUrl: `https://github.com/aryan0297`,
  // TODO(aryan): swap in the real LinkedIn URL.
  linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? 'https://www.linkedin.com/in/aryantiwari-dev',
  resumePath: '/resume/Aryan-Tiwari-Resume.pdf',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aryantiwari.dev',
  availability: 'Open to backend & AI engineering roles',
};

/**
 * The resume lists a phone number. It is deliberately not published here —
 * a number on a public page gets scraped for spam within days, and anyone
 * serious enough to call will have downloaded the PDF anyway. Add a
 * `{ label: 'Phone', href: 'tel:+917389297343', icon: Phone, handle: '…' }`
 * entry to `socialLinks` below if you decide otherwise.
 */

export const socialLinks: readonly SocialLink[] = [
  { label: 'GitHub', href: profile.githubUrl, icon: Github, handle: `@${profile.githubUsername}` },
  { label: 'LinkedIn', href: profile.linkedinUrl, icon: Linkedin, handle: 'Aryan Tiwari' },
  { label: 'Email', href: `mailto:${profile.email}`, icon: Mail, handle: profile.email },
] as const;
