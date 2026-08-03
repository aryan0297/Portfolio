'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCallback, useRef, type ReactNode } from 'react';

import { useHasFinePointer } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How far the element chases the cursor, as a fraction of the offset. */
  strength?: number;
}

/**
 * Magnetic hover. The wrapped element drifts toward the pointer and springs
 * back on leave.
 *
 * Disabled on touch/coarse pointers, where there is no hover state to react to.
 */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasFinePointer = useHasFinePointer();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 250, damping: 18, mass: 0.5 });

  const handleMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!hasFinePointer || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
      y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
    },
    [hasFinePointer, strength, x, y],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY }}
      className={cn('inline-flex', className)}
    >
      {children}
    </motion.div>
  );
}
