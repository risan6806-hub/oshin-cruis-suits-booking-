import { useEffect, useState } from 'react';

export function useMediaQuery(query: string, initial = false) {
  const [matches, setMatches] = useState(initial);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return matches;
}

/** True on devices with a real pointer — gates the cursor and hover-only work. */
export const useHasPointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');

export const useReducedMotionPref = () => useMediaQuery('(prefers-reduced-motion: reduce)');

export const useIsMobile = () => useMediaQuery('(max-width: 767px)');

/** Scroll distance past a threshold — drives the nav's compact state. */
export function useScrolledPast(px: number) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const on = () => setPast(window.scrollY > px);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [px]);
  return past;
}
