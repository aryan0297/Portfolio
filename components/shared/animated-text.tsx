'use client';

import { motion } from 'framer-motion';

import { charReveal, staggerContainer, viewportOnce } from '@/animations/variants';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  /** Per-character stagger, in seconds. */
  stagger?: number;
  delay?: number;
  once?: boolean;
}

/**
 * Per-character headline reveal.
 *
 * The full string is exposed to assistive tech via `aria-label` and the split
 * characters are hidden, so screen readers hear one word — not 13 letters.
 */
export function AnimatedText({
  text,
  className,
  stagger = 0.028,
  delay = 0,
  once = true,
}: AnimatedTextProps) {
  const words = text.split(' ');

  return (
    <motion.span
      aria-label={text}
      role="text"
      initial="hidden"
      whileInView="visible"
      viewport={once ? viewportOnce : { once: false, amount: 0.25 }}
      variants={staggerContainer(stagger, delay)}
      className={cn('inline-block [perspective:800px]', className)}
    >
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap">
          {Array.from(word).map((char, charIndex) => (
            <motion.span
              key={`${char}-${charIndex}`}
              aria-hidden
              variants={charReveal}
              className="inline-block will-change-transform"
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && <span aria-hidden>&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}
