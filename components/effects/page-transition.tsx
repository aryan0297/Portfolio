'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { EASE_PREMIUM } from '@/animations/variants';

/**
 * Route-level enter transition. Keyed on pathname so each App Router
 * navigation replays the fade instead of snapping between pages.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_PREMIUM }}
    >
      {children}
    </motion.div>
  );
}
