'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { EASE_PREMIUM } from '@/animations/variants';
import { useLockBodyScroll } from '@/hooks/use-lock-body-scroll';

const HOLD_MS = 900;

/**
 * First-paint curtain.
 *
 * Deliberately short and time-boxed rather than tied to `window.load`: a
 * loader that outlives the content is worse than no loader. It also
 * self-dismisses on `sessionStorage`, so internal navigation never replays it.
 */
export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  useLockBodyScroll(isLoading);

  useEffect(() => {
    if (sessionStorage.getItem('portfolio:intro-played') === '1') {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      sessionStorage.setItem('portfolio:intro-played', '1');
      setIsLoading(false);
    }, HOLD_MS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Loading portfolio"
          exit={{ opacity: 0, filter: 'blur(12px)' }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 bg-background"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE_PREMIUM }}
            className="relative flex h-20 w-20 items-center justify-center"
          >
            <span className="absolute inset-0 rounded-2xl border border-primary/40 animate-pulse-ring" />
            <span className="absolute inset-0 rounded-2xl border border-hairline" />
            <span className="font-mono text-xl font-semibold text-gradient">AT</span>
          </motion.div>

          <div className="h-px w-40 overflow-hidden bg-white/10">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: HOLD_MS / 1000, ease: 'easeInOut' }}
              className="h-full w-full bg-gradient-brand"
            />
          </div>

          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
            Initialising
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
