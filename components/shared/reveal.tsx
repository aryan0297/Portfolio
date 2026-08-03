'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

import { fadeUp, viewportOnce } from '@/animations/variants';
import { cn } from '@/lib/utils';

/**
 * Only these tags are supported on purpose. `motion(tag)` creates a new
 * component identity on every render, which would remount children — indexing
 * the memoised `motion.*` proxy avoids that entirely.
 */
const MOTION_TAGS = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
  span: motion.span,
  p: motion.p,
} as const;

type RevealTag = keyof typeof MOTION_TAGS;

interface RevealProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  as?: RevealTag;
}

/**
 * Scroll-triggered reveal wrapper.
 *
 * Every section uses this instead of hand-rolling `whileInView`, so the trigger
 * point and easing stay identical site-wide.
 */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  as = 'div',
}: RevealProps) {
  const Comp = MOTION_TAGS[as];

  return (
    <Comp
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </Comp>
  );
}
