import { Bot, Layers, Server, Wrench } from 'lucide-react';
import type { Skill, SkillCategory, TechGroup } from '@/types';

export const skillCategories: readonly SkillCategory[] = ['Backend', 'AI', 'Frontend', 'Tools'] as const;

/**
 * `level` is a self-assessed working proficiency used only to size the progress
 * bars — it is a visual weighting, not a claim of certification.
 */
export const skills: readonly Skill[] = [
  { name: 'JavaScript', category: 'Backend', level: 92, note: 'Primary language, server-side first.' },
  { name: 'Node.js', category: 'Backend', level: 92, note: 'Service and API runtime, daily driver.' },
  { name: 'Express.js', category: 'Backend', level: 90, note: 'Routing, middleware, error handling.' },
  { name: 'REST API Design', category: 'Backend', level: 90, note: 'Resource modelling and clear contracts.' },
  { name: 'PostgreSQL', category: 'Backend', level: 86, note: 'Schema design, joins, indexing.' },
  { name: 'SQL', category: 'Backend', level: 85, note: 'Query writing and optimisation.' },
  { name: 'JWT Authentication', category: 'Backend', level: 88, note: 'Token issuance, verification, refresh.' },
  { name: 'Webhooks', category: 'Backend', level: 86, note: 'Verified, idempotent event intake.' },
  { name: 'Database Design', category: 'Backend', level: 84, note: 'Schema modelling and constraints.' },
  { name: 'Query Optimization', category: 'Backend', level: 80, note: 'Index and execution-plan tuning.' },
  { name: 'API Integration', category: 'Backend', level: 88, note: 'Third-party services into workflows.' },

  { name: 'OpenAI API', category: 'AI', level: 90, note: 'Server-side model integration.' },
  { name: 'Prompt Engineering', category: 'AI', level: 88, note: 'Scoped, deterministic model behaviour.' },
  { name: 'Conversational AI', category: 'AI', level: 86, note: 'Multi-turn context and state.' },
  { name: 'Voice AI', category: 'AI', level: 82, note: 'Telephony-driven voice agents.' },
  { name: 'AI Agents', category: 'AI', level: 80, note: 'Tool-using automation flows.' },
  { name: 'Generative AI', category: 'AI', level: 85, note: 'LLM-backed product features.' },
  { name: 'AI Automation', category: 'AI', level: 88, note: 'Model steps inside backend workflows.' },

  { name: 'Next.js', category: 'Frontend', level: 78, note: 'App Router, server components.' },
  { name: 'React', category: 'Frontend', level: 78, note: 'Component architecture and state.' },
  { name: 'Tailwind CSS', category: 'Frontend', level: 80, note: 'Utility-first design systems.' },
  { name: 'HTML', category: 'Frontend', level: 85, note: 'Semantic, accessible markup.' },
  { name: 'CSS', category: 'Frontend', level: 80, note: 'Layout, responsive design.' },

  { name: 'Git & GitHub', category: 'Tools', level: 88, note: 'Branching, review, history hygiene.' },
  { name: 'Postman', category: 'Tools', level: 88, note: 'API testing and collections.' },
  { name: 'VS Code', category: 'Tools', level: 90, note: 'Primary editor and debugger.' },
  { name: 'Claude Code', category: 'Tools', level: 88, note: 'Agentic development workflow.' },
  { name: 'Cursor', category: 'Tools', level: 85, note: 'AI-assisted editing.' },
  { name: 'GitHub Copilot', category: 'Tools', level: 82, note: 'Inline completion.' },
  { name: 'Windsurf', category: 'Tools', level: 80, note: 'Agentic editing workflow.' },
  { name: 'Debugging', category: 'Tools', level: 90, note: 'Reproduce, isolate, instrument, fix.' },
] as const;

export const techGroups: readonly TechGroup[] = [
  {
    category: 'Backend',
    icon: Server,
    description: 'Services, APIs, auth, and the data layer underneath them.',
    items: [
      'JavaScript',
      'Node.js',
      'Express.js',
      'REST APIs',
      'JWT',
      'Webhooks',
      'PostgreSQL',
      'SQL',
    ],
  },
  {
    category: 'AI',
    icon: Bot,
    description: 'Model integration that holds up under production traffic.',
    items: [
      'OpenAI API',
      'Prompt Engineering',
      'AI Agents',
      'Generative AI',
      'Voice AI',
      'Conversational AI',
    ],
  },
  {
    category: 'Frontend',
    icon: Layers,
    description: 'Enough front-end to ship a full feature, not just an endpoint.',
    items: ['Next.js', 'React', 'Tailwind CSS', 'HTML', 'CSS'],
  },
  {
    category: 'Tools',
    icon: Wrench,
    description: 'The daily workflow, including AI-assisted development.',
    items: [
      'Git',
      'GitHub',
      'Postman',
      'VS Code',
      'Claude Code',
      'Cursor',
      'GitHub Copilot',
      'ChatGPT',
      'Windsurf',
      'Blackbox AI',
    ],
  },
] as const;

/** Floating badges orbiting the hero visual. */
export const heroBadges: readonly string[] = [
  'Node.js',
  'PostgreSQL',
  'REST API',
  'OpenAI',
  'AI Agents',
  'JWT',
  'Webhooks',
] as const;
