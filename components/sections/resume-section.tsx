import { Download, ExternalLink, FileText, GraduationCap } from 'lucide-react';

import { fadeRight, fadeUp } from '@/animations/variants';
import { Reveal } from '@/components/shared/reveal';
import { Section, SectionHeading } from '@/components/shared/section';
import { TechChip } from '@/components/shared/tech-chip';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { education, experiences, strengths } from '@/constants/experience';
import { profile } from '@/constants/profile';

/** Mirrors the summary bullets in the PDF so the page and the download agree. */
const HIGHLIGHTS = [
  'Backend services and REST APIs supporting AI voice automation',
  'Scalable backend modules in Node.js, Express.js, and PostgreSQL',
  'OpenAI APIs and third-party telephony integrated into production workflows',
  'Webhook-based communication systems for AI voice agents',
  'Secure authentication and backend API architecture',
] as const;

/**
 * Resume.
 *
 * Design decision: a mock document preview instead of an embedded PDF viewer.
 * An `<iframe>` PDF is heavy, unreliable on mobile Safari, and terrible for
 * accessibility. A summary card plus explicit download and open-in-tab actions
 * gives the reader the same information faster.
 */
export function ResumeSection() {
  const current = experiences[0];

  return (
    <Section id="resume" ambient>
      <SectionHeading
        id="resume"
        eyebrow="Resume"
        title="The one-page version"
        description="Download the full PDF, or open it in a new tab."
      />

      <div className="mt-16 grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        {/* --- Document mock --- */}
        <Reveal variants={fadeUp}>
          <GlassCard className="mx-auto w-full max-w-sm p-5">
            <div className="rounded-2xl border border-hairline bg-white/[0.03] p-6">
              {/* Skeleton lines standing in for the page layout. */}
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-[#040914]"
                >
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{profile.name}</p>
                  <p className="text-[11px] text-muted">{current.role}</p>
                </div>
              </div>

              <div aria-hidden className="mt-6 flex flex-col gap-2.5">
                {[100, 82, 92, 64, 88, 74, 96, 58].map((width, index) => (
                  <span
                    key={index}
                    style={{ width: `${width}%` }}
                    className="block h-1.5 rounded-full bg-white/[0.07]"
                  />
                ))}
              </div>

              <div aria-hidden className="mt-6 flex gap-2">
                <span className="h-1.5 w-10 rounded-full bg-primary/60" />
                <span className="h-1.5 w-14 rounded-full bg-accent/50" />
                <span className="h-1.5 w-8 rounded-full bg-white/10" />
              </div>
            </div>

            <p className="mt-4 text-center font-mono text-[11px] text-muted">PDF · A4 · 1 page</p>
          </GlassCard>
        </Reveal>

        {/* --- Summary + actions --- */}
        <Reveal variants={fadeRight}>
          <GlassCard className="p-7 md:p-9">
            <h3 className="text-title text-white">{current.role}</h3>
            <p className="mt-1.5 text-sm text-primary-soft">
              {current.company} · {current.period}
            </p>

            <ul className="mt-6 flex flex-col gap-3">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-muted">
                  <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span className="text-pretty">{item}</span>
                </li>
              ))}
            </ul>

            {/* Education — short enough to sit inline rather than earn its own section. */}
            <div className="mt-8 border-t border-hairline pt-6">
              <h4 className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                <GraduationCap className="h-3.5 w-3.5" aria-hidden />
                Education
              </h4>
              {education.map((item) => (
                <div key={item.id} className="mt-3">
                  <p className="text-sm font-medium text-white">
                    {item.degree} · {item.field}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {item.institution} · {item.period}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <a href={profile.resumePath} download>
                  <Download className="h-4 w-4" aria-hidden />
                  Download Resume
                </a>
              </Button>
              <Button asChild variant="secondary">
                <a href={profile.resumePath} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  View online
                </a>
              </Button>
            </div>
          </GlassCard>
        </Reveal>
      </div>

      <Reveal variants={fadeUp} className="mt-6">
        <GlassCard className="p-6 md:p-7">
          <h3 className="text-sm font-semibold text-white">Strengths</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {strengths.map((strength) => (
              <TechChip key={strength} label={strength} />
            ))}
          </div>
        </GlassCard>
      </Reveal>
    </Section>
  );
}
