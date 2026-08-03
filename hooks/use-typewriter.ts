'use client';

import { useEffect, useState } from 'react';

interface TypewriterOptions {
  typeSpeed?: number;
  deleteSpeed?: number;
  /** Pause once a word is fully typed, before deleting. */
  holdDelay?: number;
}

/**
 * Rotating type-and-delete effect.
 *
 * Deliberately a single `setTimeout` per frame rather than an interval, so the
 * typing rhythm can differ from the deletion rhythm without extra state.
 */
export function useTypewriter(
  words: readonly string[],
  { typeSpeed = 70, deleteSpeed = 35, holdDelay = 1800 }: TypewriterOptions = {},
) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    const current = words[index % words.length];
    const isComplete = !isDeleting && text === current;
    const isCleared = isDeleting && text === '';

    let delay = isDeleting ? deleteSpeed : typeSpeed;
    if (isComplete) delay = holdDelay;

    const timer = setTimeout(() => {
      if (isComplete) {
        setIsDeleting(true);
        return;
      }
      if (isCleared) {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
        return;
      }
      setText(
        isDeleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1),
      );
    }, delay);

    return () => clearTimeout(timer);
  }, [text, isDeleting, index, words, typeSpeed, deleteSpeed, holdDelay]);

  return text;
}
