'use client';

import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Github,
  Layers,
  Lightbulb,
  Target,
  TrendingUp,
} from 'lucide-react';
import type { ReactNode } from 'react';

import { ProjectVisual } from '@/components/sections/projects/project-visual';
import { TechChip } from '@/components/shared/tech-chip';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import type { Project } from '@/types';

interface ProjectModalProps {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Consistent block for each case-study heading. */
function Block({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Target;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-hairline bg-white/[0.02] p-5">
      <h4 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
        <Icon className="h-3.5 w-3.5" aria-hidden />
        {title}
      </h4>
      <div className="mt-3 text-sm text-muted">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" />
          <span className="text-pretty">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Full case study in a dialog.
 *
 * Kept out of the card so the grid renders three lightweight summaries and the
 * long-form content only mounts when a project is actually opened.
 */
export function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
  const hasLinks = Boolean(project.githubUrl || project.liveUrl);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <ProjectVisual project={project} className="h-44 w-full rounded-none rounded-t-card border-0 border-b" />

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary">{project.category}</Badge>
            <Badge>{project.year}</Badge>
          </div>

          <DialogTitle className="mt-4">{project.title}</DialogTitle>
          <DialogDescription className="mt-2 text-pretty text-[15px]">
            {project.tagline}
          </DialogDescription>

          <p className="mt-5 text-pretty text-sm text-muted">{project.overview}</p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <Block icon={Target} title="Problem">
              <p className="text-pretty">{project.problem}</p>
            </Block>
            <Block icon={Lightbulb} title="Solution">
              <p className="text-pretty">{project.solution}</p>
            </Block>
          </div>

          <div className="mt-4 grid gap-4">
            <Block icon={Layers} title="Architecture">
              <BulletList items={project.architecture} />
            </Block>

            <div className="grid gap-4 sm:grid-cols-2">
              <Block icon={AlertTriangle} title="Challenges">
                <BulletList items={project.challenges} />
              </Block>
              <Block icon={CheckCircle2} title="Features">
                <BulletList items={project.features} />
              </Block>
            </div>

            <Block icon={TrendingUp} title="Business impact">
              <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {project.impact.map((metric) => (
                  <div key={metric.label} className="rounded-xl border border-hairline p-3">
                    <dt className="text-[11px] uppercase tracking-wider text-muted">{metric.label}</dt>
                    <dd className="mt-1 text-sm font-semibold text-white">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            </Block>
          </div>

          <div className="mt-6">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              Tech stack
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <TechChip key={tech} label={tech} />
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-hairline pt-6">
            {project.githubUrl && (
              <Button asChild variant="secondary" size="sm">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" aria-hidden />
                  Source
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button asChild size="sm">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  Live demo
                </a>
              </Button>
            )}
            {/* Honest empty state rather than dead "#" links. */}
            {!hasLinks && (
              <p className="text-xs text-muted">
                Built in a private production codebase — source and demo are not publicly
                available. Happy to walk through the architecture on a call.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
