import type { Transition, Variants } from 'motion/react';

/**
 * One motion vocabulary for the whole site.
 *
 * Everything decelerates (expo-out) rather than overshooting — luxury motion
 * arrives and settles. Nothing in here bounces or springs back.
 */
export const EASE = {
  /** Entrances: fast departure, long settle. */
  out: [0.16, 1, 0.3, 1],
  /** State changes that travel both ways. */
  inOut: [0.76, 0, 0.24, 1],
  /** Very long cinematic moves (masks, curtains). */
  cine: [0.65, 0, 0.35, 1],
} as const;

export const DUR = {
  fast: 0.45,
  base: 0.9,
  slow: 1.4,
  cine: 2.1,
} as const;

export const tr = (d: number = DUR.base, delay = 0): Transition => ({
  duration: d,
  delay,
  ease: EASE.out,
});

/** Viewport trigger used by every scroll reveal, so cadence is consistent. */
export const VIEW = { once: true, amount: 0.3, margin: '0px 0px -12% 0px' } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: tr(DUR.base, i * 0.08) }),
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: (i: number = 0) => ({ opacity: 1, transition: tr(DUR.slow, i * 0.08) }),
};

/**
 * Line reveal: the line rides up from behind an overflow-hidden mask.
 * Used for every display headline — it is the signature text move.
 */
export const maskLine: Variants = {
  hidden: { y: '115%' },
  show: (i: number = 0) => ({
    y: '0%',
    transition: { duration: 1.15, delay: i * 0.1, ease: EASE.out },
  }),
};

export const stagger = (each = 0.09, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren: delay } },
});

/** Reduced-motion fallback: same choreography, no spatial travel. */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  show: (i: number = 0) => ({ opacity: 1, transition: { duration: 0.4, delay: i * 0.04 } }),
};
