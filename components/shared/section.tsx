import type { ReactNode } from 'react';

import { Reveal } from '@/components/shared/reveal';
import { fadeUp } from '@/animations/variants';
import { cn } from '@/lib/utils';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Renders the ambient grid + glow layer behind the section content. */
  ambient?: boolean;
}

/**
 * Section shell: consistent vertical rhythm, scroll anchor, and container width.
 * Server component — it holds no state, so it ships zero JS.
 */
export function Section({ id, children, className, ambient = false }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn('relative w-full scroll-mt-24 py-24 md:py-32', className)}
    >
      {ambient && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 grid-bg mask-fade-y opacity-40" />
          <div className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
        </div>
      )}
      <div className="container relative">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

/** Standard eyebrow → headline → description block used by every section. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      variants={fadeUp}
      className={cn(
        'flex max-w-3xl flex-col gap-4',
        align === 'center' && 'mx-auto text-center items-center',
        className,
      )}
    >
      <span className="eyebrow flex items-center gap-2">
        <span aria-hidden className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
        {eyebrow}
      </span>
      <h2 id={`${id}-heading`} className="text-headline text-balance text-white">
        {title}
      </h2>
      {description && <p className="text-pretty text-base md:text-lg">{description}</p>}
    </Reveal>
  );
}
