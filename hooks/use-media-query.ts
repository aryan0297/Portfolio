'use client';

import { useEffect, useState } from 'react';

/** SSR-safe media query subscription. Returns `false` until hydrated. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    setMatches(list.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** True on pointer-capable devices — gates the custom cursor and magnetic hover. */
export function useHasFinePointer(): boolean {
  return useMediaQuery('(pointer: fine)');
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}
