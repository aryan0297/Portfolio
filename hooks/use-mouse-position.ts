'use client';

import { useEffect } from 'react';
import { useMotionValue, useSpring, type MotionValue } from 'framer-motion';

interface MousePosition {
  x: MotionValue<number>;
  y: MotionValue<number>;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
}

/**
 * Global pointer position as motion values.
 *
 * Returning MotionValues (not React state) keeps pointer tracking off the
 * render path entirely — nothing re-renders as the mouse moves.
 */
export function useMousePosition(enabled = true): MousePosition {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 380, damping: 34, mass: 0.4 });
  const smoothY = useSpring(y, { stiffness: 380, damping: 34, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [enabled, x, y]);

  return { x, y, smoothX, smoothY };
}
