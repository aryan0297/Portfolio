import type { Transition, Variants } from 'framer-motion';

/**
 * Shared motion language.
 *
 * One easing curve and one duration band across the whole site — that
 * consistency is most of what separates "designed" from "animated".
 */
export const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;

export const transition: Transition = {
  duration: 0.7,
  ease: EASE_PREMIUM,
};

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 160,
  damping: 22,
  mass: 0.7,
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0, transition },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0, transition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition },
};

/** Parent wrapper that cascades children. Pair with any variant above. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Per-character reveal used by the animated headline. */
export const charReveal: Variants = {
  hidden: { opacity: 0, y: '0.6em', rotateX: -45 },
  visible: {
    opacity: 1,
    y: '0em',
    rotateX: 0,
    transition: { duration: 0.8, ease: EASE_PREMIUM },
  },
};

/** Shared viewport config so every scroll reveal triggers at the same point. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
