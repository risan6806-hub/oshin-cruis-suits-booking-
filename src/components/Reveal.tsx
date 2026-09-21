import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { EASE, VIEW, maskLine, fadeUp, fadeOnly, stagger } from '@/lib/motion';
import { useReducedMotionPref } from '@/lib/hooks';

/**
 * Masked line reveal — the signature headline move.
 *
 * Each line sits in its own overflow-hidden box and rides up from beneath it,
 * so type appears to be *uncovered* rather than to fade in. Lines are split on
 * explicit newlines: the art direction decides where a headline breaks, never
 * the viewport.
 */
export function Lines({
  text,
  className = '',
  lineClassName = '',
  delay = 0,
  as: Tag = 'h2',
}: {
  text: string;
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
}) {
  const reduced = useReducedMotionPref();
  const lines = text.split('\n');
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEW}
      variants={stagger(0.1, delay)}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClassName}`}
            variants={reduced ? fadeOnly : maskLine}
            custom={i}
          >
            {line || '\u00A0'}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/** Generic scroll-triggered entrance for non-headline content. */
export function Reveal({
  children,
  delay = 0,
  className = '',
  amount,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  amount?: number;
}) {
  const reduced = useReducedMotionPref();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={amount ? { ...VIEW, amount } : VIEW}
      variants={reduced ? fadeOnly : fadeUp}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

/** A hairline that draws itself across — used to open sections. */
export function DrawRule({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`h-px w-full origin-left bg-ivory/20 ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEW}
      transition={{ duration: 1.3, delay, ease: EASE.out }}
    />
  );
}

/** Small uppercase eyebrow with a leading tick. */
export function Eyebrow({
  children,
  className = '',
  tick = true,
}: {
  children: ReactNode;
  className?: string;
  tick?: boolean;
}) {
  return (
    <Reveal className={`flex items-center gap-4 ${className}`}>
      {tick && <span className="h-px w-8 bg-champagne sm:w-12" aria-hidden />}
      <span className="u-label text-champagne">{children}</span>
    </Reveal>
  );
}
