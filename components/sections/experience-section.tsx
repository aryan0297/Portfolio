import { Briefcase, CalendarDays, MapPin } from 'lucide-react';

import { fadeUp, scaleIn } from '@/animations/variants';
import { Reveal } from '@/components/shared/reveal';
import { Section, SectionHeading } from '@/components/shared/section';
import { TechChip } from '@/components/shared/tech-chip';
import { Badge } from '@/components/ui/badge';
import { GlassCard } from '@/components/ui/glass-card';
import { experiences } from '@/constants/experience';

/**
 * Experience.
 *
 * Design decision: responsibilities are grouped by domain (backend, data, AI,
 * production, tooling) instead of listed as one flat bullet list. A hiring
 * manager scanning for "does he own the database?" finds the answer without
 * reading eighteen lines.
 */
export function ExperienceSection() {
  return (
    <Section id="experience">
      <SectionHeading
        id="experience"
        eyebrow="Experience"
        title="Where I do this work"
        description="Backend services and AI integrations running in production, not in a sandbox."
      />

      <div className="mt-16 flex flex-col gap-8">
        {experiences.map((item) => (
          <Reveal key={item.id} variants={scaleIn}>
            <GlassCard className="p-7 md:p-10">
              {/* Header */}
              <div className="flex flex-col gap-5 border-b border-hairline pb-7 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary-soft"
                  >
                    <Briefcase className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-title text-white">{item.role}</h3>
                    <p className="mt-1 text-sm font-medium text-primary-soft">{item.company}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 md:justify-end">
                  <Badge variant="primary" className="gap-1.5">
                    <CalendarDays className="h-3 w-3" aria-hidden />
                    {item.period}
                  </Badge>
                  <Badge className="gap-1.5">
                    <MapPin className="h-3 w-3" aria-hidden />
                    {item.location}
                  </Badge>
                </div>
              </div>

              <p className="mt-6 max-w-3xl text-pretty text-[15px]">{item.summary}</p>

              {/* Grouped responsibilities */}
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {item.responsibilities.map((group, index) => (
                  <Reveal key={group.label} variants={fadeUp} delay={index * 0.05}>
                    <div className="h-full rounded-2xl border border-hairline bg-white/[0.02] p-5 transition-colors duration-300 hover:border-primary/30">
                      <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                        {group.label}
                      </h4>
                      <ul className="mt-3 flex flex-col gap-2.5">
                        {group.points.map((point) => (
                          <li key={point} className="flex gap-2.5 text-sm text-muted">
                            <span
                              aria-hidden
                              className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary"
                            />
                            <span className="text-pretty">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-2 border-t border-hairline pt-6">
                {item.stack.map((tech) => (
                  <TechChip key={tech} label={tech} />
                ))}
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
