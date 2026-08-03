import { cn } from '@/lib/utils';
import type { Project } from '@/types';

const ACCENTS: Record<Project['accent'], { from: string; to: string; ring: string }> = {
  blue: { from: '#3B82F6', to: '#1D4ED8', ring: 'rgba(59,130,246,0.35)' },
  cyan: { from: '#22D3EE', to: '#0891B2', ring: 'rgba(34,211,238,0.35)' },
  indigo: { from: '#818CF8', to: '#4F46E5', ring: 'rgba(129,140,248,0.35)' },
};

interface ProjectVisualProps {
  project: Project;
  className?: string;
}

/**
 * Generated cover art.
 *
 * TODO(aryan): swap this for a real screenshot at
 * `public/projects/<project-id>.webp` once the products can be shown publicly,
 * and render it with `next/image` for automatic optimisation.
 *
 * Until then this is a deliberate choice over stock photography: an abstract
 * request-flow diagram tinted per project reads as "backend system" and stays
 * on-brand, at a few hundred bytes of inline SVG with zero network cost.
 */
export function ProjectVisual({ project, className }: ProjectVisualProps) {
  const accent = ACCENTS[project.accent];
  const gradientId = `grad-${project.id}`;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-hairline bg-[#070C1C]',
        className,
      )}
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div
        className="absolute -left-10 -top-10 h-40 w-40 rounded-full blur-3xl"
        style={{ background: accent.ring }}
      />

      <svg
        viewBox="0 0 320 180"
        className="relative h-full w-full"
        role="img"
        aria-label={`Abstract system diagram representing ${project.title}`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={accent.from} />
            <stop offset="100%" stopColor={accent.to} />
          </linearGradient>
        </defs>

        {/* Request path: client → API → service → database */}
        <path
          d="M40 90 H110 M150 90 H200 M240 74 V60 H280 M240 106 V120 H280"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.25"
          fill="none"
          opacity="0.75"
          strokeDasharray="4 4"
        />

        <circle cx="40" cy="90" r="9" fill="none" stroke={accent.from} strokeWidth="1.25" opacity="0.9" />
        <rect
          x="110"
          y="74"
          width="40"
          height="32"
          rx="7"
          fill={`url(#${gradientId})`}
          opacity="0.22"
          stroke={accent.from}
          strokeWidth="1.1"
        />
        <rect
          x="200"
          y="70"
          width="40"
          height="40"
          rx="9"
          fill={`url(#${gradientId})`}
          opacity="0.32"
          stroke={accent.from}
          strokeWidth="1.1"
        />
        <rect x="280" y="50" width="26" height="20" rx="5" fill={accent.to} opacity="0.5" />
        <rect x="280" y="110" width="26" height="20" rx="5" fill={accent.to} opacity="0.5" />

        {/* Node labels kept as marks, not text — no locale or truncation issues. */}
        <circle cx="130" cy="90" r="2.2" fill="#fff" opacity="0.8" />
        <circle cx="220" cy="90" r="2.2" fill="#fff" opacity="0.8" />
      </svg>

      {/* Sweep highlight on card hover. */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent transition-transform duration-1000 ease-premium group-hover:translate-x-full" />
    </div>
  );
}
