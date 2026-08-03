'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';

import { EASE_PREMIUM, fadeUp } from '@/animations/variants';
import { Reveal } from '@/components/shared/reveal';
import { Section, SectionHeading } from '@/components/shared/section';
import { GlassCard } from '@/components/ui/glass-card';
import { skillCategories, skills } from '@/constants/skills';
import { cn } from '@/lib/utils';
import type { Skill, SkillCategory } from '@/types';

type Filter = SkillCategory | 'All';

const FILTERS: readonly Filter[] = ['All', ...skillCategories] as const;

/**
 * Progress bar animates from 0 only once it scrolls into view — animating on
 * mount would mean the bars are already full by the time the user arrives.
 */
function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: EASE_PREMIUM, delay: (index % 8) * 0.04 }}
      className="rounded-2xl border border-hairline bg-white/[0.02] p-4 transition-colors duration-300 hover:border-primary/30"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-medium text-white">{skill.name}</h3>
        <span className="font-mono text-[11px] text-muted">{skill.level}%</span>
      </div>

      <div
        role="progressbar"
        aria-label={`${skill.name} proficiency`}
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]"
      >
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${skill.level}%` : 0 }}
          transition={{ duration: 1.1, ease: EASE_PREMIUM, delay: 0.1 }}
          className="block h-full rounded-full bg-gradient-brand"
        />
      </div>

      <p className="mt-2.5 text-xs text-muted">{skill.note}</p>
    </motion.div>
  );
}

/**
 * Skills.
 *
 * Design decision: percentages are labelled as self-assessed working
 * proficiency, not a certification claim, and each bar carries a one-line note
 * about what the number actually covers. Filtering uses Framer's `layout` so
 * cards physically reflow instead of popping.
 */
export function SkillsSection() {
  const [filter, setFilter] = useState<Filter>('All');

  const visible = useMemo(
    () => (filter === 'All' ? skills : skills.filter((skill) => skill.category === filter)),
    [filter],
  );

  return (
    <Section id="skills">
      <SectionHeading
        id="skills"
        eyebrow="Skills"
        title="What I actually work with"
        description="Levels are a self-assessed working proficiency — a weighting, not a certification. Filter by area to see the detail."
      />

      <Reveal variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-2">
        {FILTERS.map((option) => {
          const isActive = filter === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              aria-pressed={isActive}
              className={cn(
                'relative rounded-pill px-4 py-2 text-sm transition-colors duration-300',
                isActive ? 'text-white' : 'text-muted hover:text-white',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="skill-filter"
                  aria-hidden
                  className="absolute inset-0 rounded-pill border border-primary/30 bg-primary/12"
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                />
              )}
              <span className="relative z-10">{option}</span>
            </button>
          );
        })}
      </Reveal>

      <GlassCard spotlight={false} className="mt-8 p-5 md:p-7">
        <motion.div layout className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </GlassCard>
    </Section>
  );
}
