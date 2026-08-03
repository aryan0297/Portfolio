'use client';

import * as React from 'react';
import { motion, useMotionTemplate, useMotionValue, type HTMLMotionProps } from 'framer-motion';

import { cn } from '@/lib/utils';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /** Adds a cursor-following radial highlight inside the card. */
  spotlight?: boolean;
  children?: React.ReactNode;
}

/**
 * The site's primary surface: glass fill, hairline border, 24px radius.
 *
 * The optional spotlight is driven by MotionValues written directly from the
 * pointer handler — the highlight follows the cursor without a single React
 * re-render.
 */
export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, spotlight = true, onPointerMove, ...props }, ref) => {
    const mouseX = useMotionValue(-200);
    const mouseY = useMotionValue(-200);

    const background = useMotionTemplate`radial-gradient(340px circle at ${mouseX}px ${mouseY}px, rgba(59,130,246,0.14), transparent 78%)`;

    const handleMove = React.useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        onPointerMove?.(event);
        if (!spotlight) return;
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left);
        mouseY.set(event.clientY - rect.top);
      },
      [mouseX, mouseY, onPointerMove, spotlight],
    );

    return (
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        className={cn(
          'border-glow group relative overflow-hidden rounded-card glass shadow-card transition-shadow duration-500 ease-premium hover:shadow-card-hover',
          className,
        )}
        {...props}
      >
        {spotlight && (
          <motion.div
            aria-hidden
            style={{ background }}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        <div className="relative z-10 flex h-full flex-col">{children}</div>
      </motion.div>
    );
  },
);
GlassCard.displayName = 'GlassCard';
