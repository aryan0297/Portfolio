'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useCallback, useState } from 'react';

import { EASE_PREMIUM } from '@/animations/variants';
import { Button } from '@/components/ui/button';
import { navItems, sectionIds } from '@/constants/navigation';
import { profile } from '@/constants/profile';
import { useActiveSection } from '@/hooks/use-active-section';
import { useLockBodyScroll } from '@/hooks/use-lock-body-scroll';
import { cn } from '@/lib/utils';

/**
 * Sticky navigation.
 *
 * Transparent over the hero, then a glass bar once the user scrolls — the
 * chrome only appears when there is content behind it to separate from.
 * The active link indicator is a shared `layoutId`, so it physically slides
 * between items instead of cross-fading.
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);
  const { scrollY } = useScroll();

  useLockBodyScroll(isMenuOpen);
  useMotionValueEvent(scrollY, 'change', (latest) => setIsScrolled(latest > 24));

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-pill focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_PREMIUM, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-[70] px-4 pt-3 md:px-6 md:pt-4"
      >
        <nav
          aria-label="Primary"
          className={cn(
            'mx-auto flex h-16 max-w-6xl items-center justify-between rounded-pill px-4 transition-all duration-500 ease-premium md:px-6',
            isScrolled
              ? 'glass shadow-card backdrop-blur-xl'
              : 'border-transparent bg-transparent shadow-none',
          )}
        >
          <a
            href="#home"
            className="group flex items-center gap-2.5 rounded-pill"
            aria-label={`${profile.name} — back to top`}
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 font-mono text-xs font-bold text-primary-soft transition-colors duration-300 group-hover:border-accent/60 group-hover:text-accent">
              AT
            </span>
            <span className="hidden text-sm font-semibold tracking-tight text-white sm:block">
              {profile.name}
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'relative rounded-pill px-3.5 py-2 text-sm transition-colors duration-300',
                      isActive ? 'text-white' : 'text-muted hover:text-white',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden
                        className="absolute inset-0 rounded-pill border border-primary/25 bg-primary/10"
                        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                    <span
                      aria-hidden
                      className={cn(
                        'absolute inset-x-3.5 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-brand transition-transform duration-300 ease-premium',
                        !isActive && 'group-hover:scale-x-100',
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href="#contact">Get in touch</a>
            </Button>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-white transition-colors hover:border-primary/50 lg:hidden"
            >
              {isMenuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[65] bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
              className="flex h-full flex-col items-center justify-center gap-2 px-6"
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { ease: EASE_PREMIUM } },
                  }}
                  className="w-full max-w-xs"
                >
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className={cn(
                      'block rounded-2xl px-5 py-4 text-center text-lg transition-colors',
                      activeSection === item.id
                        ? 'bg-primary/10 text-white'
                        : 'text-muted hover:bg-white/5 hover:text-white',
                    )}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
