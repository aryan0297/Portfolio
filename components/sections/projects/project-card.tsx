'use client';

import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

import { fadeUp } from '@/animations/variants';
import { ProjectModal } from '@/components/sections/projects/project-modal';
import { ProjectVisual } from '@/components/sections/projects/project-visual';
import { Reveal } from '@/components/shared/reveal';
import { TechChip } from '@/components/shared/tech-chip';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/ui/glass-card';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

/**
 * Card is a real `<button>` wrapping the summary, not a div with an onClick —
 * that gives keyboard focus, Enter/Space activation, and the right role for
 * free. Only the first four tech chips show; the modal carries the full list.
 */
export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Reveal variants={fadeUp} delay={index * 0.08} className="h-full">
        <GlassCard className="h-full">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-haspopup="dialog"
            className="flex h-full w-full flex-col p-5 text-left transition-transform duration-500 ease-premium hover:-translate-y-1"
          >
            <ProjectVisual project={project} className="h-40 w-full" />

            <div className="mt-5 flex items-start justify-between gap-3">
              <Badge variant="primary">{project.category}</Badge>
              <span
                aria-hidden
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hairline text-muted transition-all duration-300 group-hover:border-primary/50 group-hover:text-primary-soft"
              >
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>

            <h3 className="mt-3 text-lg font-semibold text-white">{project.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-pretty">{project.tagline}</p>

            <div className="mt-auto pt-5">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 4).map((tech) => (
                  <TechChip key={tech} label={tech} />
                ))}
                {project.tech.length > 4 && (
                  <span className="inline-flex items-center rounded-pill border border-hairline px-2.5 py-1 font-mono text-[11px] text-muted">
                    +{project.tech.length - 4}
                  </span>
                )}
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-primary-soft">
                Read case study
              </span>
            </div>
          </button>
        </GlassCard>
      </Reveal>

      <ProjectModal project={project} open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
