import { Reveal } from '@/components/shared/reveal';
import { Section, SectionHeading } from '@/components/shared/section';
import { GlassCard } from '@/components/ui/glass-card';
import { TechChip } from '@/components/shared/tech-chip';
import { aboutParagraphs, aboutTimeline } from '@/constants/experience';
import { fadeRight, fadeUp } from '@/animations/variants';

const FOCUS_AREAS = [
  'Backend Engineering',
  'JavaScript',
  'Node.js',
  'Express.js',
  'PostgreSQL',
  'REST APIs',
  'AI Automation',
  'OpenAI API',
  'Conversational AI',
  'Voice AI',
  'Software Architecture',
  'Debugging',
  'Problem Solving',
] as const;

/**
 * About.
 *
 * Design decision: a vertical timeline rather than a paragraph block. The four
 * questions a reader actually has — who, what, why backend, why AI — become
 * four discrete stops, so the section is scannable in five seconds and readable
 * in sixty. Server component: no interactivity beyond the scroll reveals, which
 * are isolated in `Reveal`.
 */
export function AboutSection() {
  return (
    <Section id="about" ambient>
      <SectionHeading
        id="about"
        eyebrow="About"
        title="Backend engineer who ships AI into production"
        description="I build the systems behind the product — the APIs, the data model, and the automation that keeps working after launch day."
      />

      <div className="mt-16 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        {/* ---- Narrative ---- */}
        <div className="flex flex-col gap-6">
          {aboutParagraphs.map((paragraph, index) => (
            <Reveal key={index} variants={fadeUp} delay={index * 0.08}>
              <p className="text-pretty text-base leading-relaxed md:text-[17px]">{paragraph}</p>
            </Reveal>
          ))}

          <Reveal variants={fadeUp} delay={0.25}>
            <GlassCard className="mt-2 p-6">
              <h3 className="text-sm font-semibold text-white">Focus areas</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {FOCUS_AREAS.map((area) => (
                  <TechChip key={area} label={area} />
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>

        {/* ---- Timeline ---- */}
        <ol className="relative flex flex-col gap-8 pl-10">
          {/* Spine. Gradient fades out at the bottom so the list ends softly. */}
          <span
            aria-hidden
            className="absolute left-[15px] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary/60 via-accent/30 to-transparent"
          />

          {aboutTimeline.map(({ id, year, title, description, icon: Icon }, index) => (
            <Reveal as="li" key={id} variants={fadeRight} delay={index * 0.06} className="relative">
              <span
                aria-hidden
                className="absolute -left-10 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-background text-primary-soft"
              >
                <Icon className="h-3.5 w-3.5" />
              </span>

              <p className="eyebrow">{year}</p>
              <h3 className="mt-1.5 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-pretty">{description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
