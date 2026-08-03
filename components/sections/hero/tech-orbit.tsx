'use client';

import { motion } from 'framer-motion';

import { EASE_PREMIUM } from '@/animations/variants';
import { heroBadges } from '@/constants/skills';

/**
 * Fixed polar positions, not random — random placement collides with the 3D
 * laptop at some viewport widths. Percentages keep it responsive.
 */
const POSITIONS = [
  { top: '4%', left: '2%' },
  { top: '14%', right: '0%' },
  { top: '40%', left: '-4%' },
  { top: '52%', right: '-2%' },
  { bottom: '20%', left: '4%' },
  { bottom: '6%', right: '8%' },
  { top: '-2%', left: '46%' },
] as const;

/** Floating backend-technology badges orbiting the hero visual. */
export function TechOrbit() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
      {heroBadges.map((badge, index) => {
        const position = POSITIONS[index % POSITIONS.length];
        return (
          <motion.span
            key={badge}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE_PREMIUM, delay: 0.9 + index * 0.09 }}
            style={{
              ...position,
              animationDelay: `${index * -1.1}s`,
              animationDuration: `${6 + (index % 3)}s`,
            }}
            className="absolute animate-float whitespace-nowrap rounded-pill border border-hairline bg-background/70 px-3 py-1.5 font-mono text-[11px] text-primary-soft shadow-glow backdrop-blur-md"
          >
            {badge}
          </motion.span>
        );
      })}
    </div>
  );
}
