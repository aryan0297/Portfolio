import type { LucideIcon } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export interface NavItem {
  /** DOM id of the target section, without the leading `#`. */
  id: string;
  label: string;
  href: `#${string}`;
}

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
  handle: string;
}

export interface Profile {
  name: string;
  roles: readonly string[];
  tagline: string;
  location: string;
  email: string;
  githubUrl: string;
  githubUsername: string;
  linkedinUrl: string;
  resumePath: string;
  siteUrl: string;
  availability: string;
}

/* ------------------------------------------------------------------ */
/* About / Experience                                                  */
/* ------------------------------------------------------------------ */

export interface TimelineEntry {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  period: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  /** Grouped responsibilities — keeps long lists scannable instead of a wall of bullets. */
  responsibilities: readonly {
    label: string;
    points: readonly string[];
  }[];
  stack: readonly string[];
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  /** Short label rendered on the card, e.g. "Voice AI · Telephony". */
  category: string;
  year: string;
  overview: string;
  problem: string;
  solution: string;
  architecture: readonly string[];
  challenges: readonly string[];
  features: readonly string[];
  tech: readonly string[];
  impact: readonly ProjectMetric[];
  /** `null` when no public repo / deployment exists yet. */
  githubUrl: string | null;
  liveUrl: string | null;
  accent: 'blue' | 'cyan' | 'indigo';
}

/* ------------------------------------------------------------------ */
/* Skills & stack                                                      */
/* ------------------------------------------------------------------ */

export type SkillCategory = 'Backend' | 'AI' | 'Frontend' | 'Tools';

export interface Skill {
  name: string;
  category: SkillCategory;
  /** Self-assessed working proficiency, 0-100. Drives the progress bar only. */
  level: number;
  note: string;
}

export interface TechGroup {
  category: SkillCategory;
  icon: LucideIcon;
  description: string;
  items: readonly string[];
}

/* ------------------------------------------------------------------ */
/* GitHub API                                                          */
/* ------------------------------------------------------------------ */

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  pushed_at: string;
  fork: boolean;
}

export interface GitHubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubData {
  profile: GitHubProfile | null;
  repos: GitHubRepo[];
  /**
   * Most recent push across every owned repo — including ones filtered out of
   * `repos` — so the activity stat stays truthful even when nothing is listed.
   */
  lastPushedAt: string | null;
  /** Populated when the API is unreachable, rate-limited, or unconfigured. */
  error: string | null;
}

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;
