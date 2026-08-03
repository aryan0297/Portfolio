'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

import { Section, SectionHeading } from '@/components/shared/section';
import { GlassCard } from '@/components/ui/glass-card';
import { techGroups } from '@/constants/skills';
import { cn } from '@/lib/utils';

const MARQUEE_ITEMS = techGroups.flatMap((group) => group.items);

/**
 * Tech stack.
 *
 * GSAP earns its place here specifically: ScrollTrigger drives a per-card
 * parallax where each column moves at a different rate, and a seamless
 * infinite marquee. Both are scroll-position-driven and continuous, which is
 * awkward with Framer's declarative model but native to a GSAP timeline.
 * Everything is scoped to `gsap.context` so it tears down cleanly on unmount.
 */
export function TechStackSection() {
  const scopeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      // Staggered parallax: alternating columns drift at different depths.
      gsap.utils.toArray<HTMLElement>('[data-parallax-card]').forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: index % 2 === 0 ? 40 : 70 },
          {
            y: index % 2 === 0 ? -30 : -55,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          },
        );
      });

      // Seamless marquee: the track holds two copies, so -50% loops invisibly.
      const track = scopeRef.current?.querySelector<HTMLElement>('[data-marquee-track]');
      if (track) {
        gsap.to(track, {
          xPercent: -50,
          ease: 'none',
          duration: 32,
          repeat: -1,
        });
      }
    }, scopeRef);

    return () => context.revert();
  }, []);

  return (
    <Section id="tech-stack" ambient>
      <SectionHeading
        id="tech-stack"
        eyebrow="Tech stack"
        title="The toolkit behind the work"
        description="Grouped by where it sits in the system — from the request handler down to the database, plus the AI layer on top."
      />

      <div ref={scopeRef} className="mt-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {techGroups.map(({ category, icon: Icon, description, items }) => (
            <div key={category} data-parallax-card className="will-change-transform">
              <GlassCard className="h-full p-6">
                <span
                  aria-hidden
                  className={cn(
                    'flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary-soft',
                    'transition-colors duration-500 group-hover:border-accent/40 group-hover:text-accent',
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>

                <h3 className="mt-5 text-base font-semibold text-white">{category}</h3>
                <p className="mt-2 text-xs text-pretty">{description}</p>

                <ul className="mt-5 flex flex-col gap-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted">
                      <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>
          ))}
        </div>

        {/* Infinite marquee — duplicated list is aria-hidden to avoid double reads. */}
        <div className="mask-fade-x relative mt-14 overflow-hidden py-2">
          <div data-marquee-track className="flex w-max gap-3">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex gap-3" aria-hidden={copy === 1}>
                {MARQUEE_ITEMS.map((item) => (
                  <span
                    key={`${copy}-${item}`}
                    className="whitespace-nowrap rounded-pill border border-hairline bg-white/[0.02] px-4 py-2 font-mono text-xs text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
