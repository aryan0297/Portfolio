'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Reading-progress bar pinned to the top of the viewport.
 * `scaleX` on a spring keeps it smooth without listening to scroll in React.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-gradient-brand shadow-glow"
    />
  );
}
