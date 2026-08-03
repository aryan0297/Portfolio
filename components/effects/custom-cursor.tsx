'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useMousePosition } from '@/hooks/use-mouse-position';
import { useHasFinePointer } from '@/hooks/use-media-query';

/**
 * Two-layer cursor: a hard dot that tracks the pointer exactly, and a lagging
 * ring on a spring. The lag is what makes it read as deliberate rather than
 * as a broken cursor.
 *
 * Never replaces the system cursor on touch devices, and hides itself entirely
 * when the pointer leaves the window.
 */
export function CustomCursor() {
  const hasFinePointer = useHasFinePointer();
  const { x, y, smoothX, smoothY } = useMousePosition(hasFinePointer);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!hasFinePointer) return;

    // A single delegated listener beats attaching handlers to every link.
    const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]';

    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      setIsInteractive(Boolean(target?.closest(INTERACTIVE)));
      setIsVisible(true);
    };
    const onLeave = () => setIsVisible(false);

    window.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [hasFinePointer]);

  if (!hasFinePointer) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120] hidden lg:block">
      <motion.div
        style={{ x, y }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isInteractive ? 0.4 : 1 }}
        transition={{ duration: 0.2 }}
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent"
      />
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isInteractive ? 1.8 : 1,
          borderColor: isInteractive ? 'rgba(34,211,238,0.9)' : 'rgba(96,165,250,0.45)',
        }}
        transition={{ duration: 0.25 }}
        className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border"
      />
    </div>
  );
}
