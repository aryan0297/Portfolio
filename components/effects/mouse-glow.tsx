'use client';

import { motion, useMotionTemplate } from 'framer-motion';

import { useMousePosition } from '@/hooks/use-mouse-position';
import { useHasFinePointer } from '@/hooks/use-media-query';

/**
 * Ambient light that follows the cursor across the whole page.
 * Fixed-position and behind all content, so it reads as page lighting rather
 * than as a UI element.
 */
export function MouseGlow() {
  const hasFinePointer = useHasFinePointer();
  const { smoothX, smoothY } = useMousePosition(hasFinePointer);

  const background = useMotionTemplate`radial-gradient(560px circle at ${smoothX}px ${smoothY}px, rgba(59,130,246,0.10), transparent 70%)`;

  if (!hasFinePointer) return null;

  return (
    <motion.div
      aria-hidden
      style={{ background }}
      className="pointer-events-none fixed inset-0 z-0 hidden lg:block"
    />
  );
}
