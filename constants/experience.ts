import { Bot, Code2, Database, Server, Workflow } from 'lucide-react';
import type { EducationItem, ExperienceItem, TimelineEntry } from '@/types';

export const aboutParagraphs: readonly string[] = [
  'I am a backend software engineer. I build the parts of a product that users never see but always feel — the APIs that respond in time, the authentication that holds, the database queries that stay fast as the table grows, and the integrations that keep working after the demo is over.',
  'My day-to-day is Node.js and Express.js on top of PostgreSQL, exposed through REST APIs and secured with JWT-based authentication. I care about clear contracts, predictable error handling, and schemas that make the right thing easy and the wrong thing hard.',
  'Alongside that, I build AI automation: OpenAI API integrations, conversational AI flows, and voice AI systems wired into real backend services through webhooks. AI is only useful in production when it sits behind solid engineering — retries, validation, logging, and a data model that can explain what happened.',
] as const;

export const aboutTimeline: readonly TimelineEntry[] = [
  {
    id: 'why-backend',
    year: 'Why backend',
    title: 'Systems over surfaces',
    description:
      'I like problems where correctness is measurable. Backend work is exactly that: a request either returns the right data in the right shape at the right time, or it does not. That feedback loop is what pulled me in.',
    icon: Server,
  },
  {
    id: 'what-i-build',
    year: 'What I build',
    title: 'REST APIs, auth, and data models',
    description:
      'Node.js and Express.js services backed by PostgreSQL. JWT authentication, role-aware endpoints, validated request/response contracts, and queries tuned with indexes instead of hope.',
    icon: Database,
  },
  {
    id: 'why-ai',
    year: 'Why AI',
    title: 'Automation that survives production',
    description:
      'OpenAI API integrations, conversational AI, and voice AI connected to backend workflows through webhooks. The model is one component; the engineering around it is what makes it dependable.',
    icon: Bot,
  },
  {
    id: 'how-i-work',
    year: 'How I work',
    title: 'Debugging as a first-class skill',
    description:
      'Reproduce, isolate, instrument, fix, then make the failure impossible to repeat. Most of the value I add in production is in narrowing a vague bug report down to one line.',
    icon: Code2,
  },
  {
    id: 'tooling',
    year: 'Tooling',
    title: 'An AI-assisted workflow',
    description:
      'Claude Code, Cursor, GitHub Copilot, ChatGPT, and Windsurf are part of how I ship — used for scaffolding, review, and exploration, with every change read and understood before it lands.',
    icon: Workflow,
  },
] as const;

export const experiences: readonly ExperienceItem[] = [
  {
    id: 'mbg-card',
    role: 'Backend Software Engineer',
    company: 'MBG Card',
    period: 'April 2026 — Present',
    location: 'Full-time',
    summary:
      'Building and maintaining backend services and AI integrations in production: REST APIs, authentication, PostgreSQL data access, and AI/voice automation wired in through webhooks.',
    responsibilities: [
      {
        label: 'Backend & APIs',
        points: [
          'Design and build backend services and REST API endpoints for product features.',
          'Implement authentication and authorization flows using JWT.',
          'Define request/response contracts and consistent error handling across services.',
        ],
      },
      {
        label: 'Data & performance',
        points: [
          'Model and maintain PostgreSQL schemas for application data.',
          'Optimize database queries and indexes to keep endpoints responsive.',
        ],
      },
      {
        label: 'AI automation',
        points: [
          'Integrate OpenAI APIs and third-party telephony services into production workflows.',
          'Design webhook-based communication systems for AI voice agents.',
          'Build backend services supporting AI-powered voice automation end to end.',
        ],
      },
      {
        label: 'Production support',
        points: [
          'Support deployment, debugging, and maintenance of production backend systems.',
          'Resolve issues across the API, database, and integration layers.',
        ],
      },
      {
        label: 'AI-assisted development',
        points: [
          'Use Claude Code, Cursor, GitHub Copilot, ChatGPT, and Windsurf as part of a daily development workflow.',
        ],
      },
    ],
    stack: [
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'REST APIs',
      'JWT',
      'Webhooks',
      'OpenAI API',
      'Voice AI',
      'Git',
    ],
  },
] as const;

export const education: readonly EducationItem[] = [
  {
    id: 'bcom',
    degree: 'Bachelor of Commerce (B.Com.)',
    field: 'Accounting & Finance',
    institution: 'Kesarwani Arts, Commerce & Education College',
    period: '2022 — 2025',
  },
] as const;

/**
 * Working strengths from the resume. Deliberately rendered as plain chips
 * rather than rated bars — these are qualities, and a percentage against
 * "Ownership" would be meaningless.
 */
export const strengths: readonly string[] = [
  'Problem Solving',
  'Backend Architecture',
  'Debugging',
  'AI-assisted Development',
  'Scalable Systems',
  'API Design',
  'Database Optimization',
  'Ownership',
  'Rapid Learning',
  'Agile Development',
] as const;
