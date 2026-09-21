import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Figure } from '@/components/Figure';
import { Button } from '@/components/Button';
import { Lines } from '@/components/Reveal';
import { EASE, DUR } from '@/lib/motion';
import { useReducedMotionPref } from '@/lib/hooks';
import { scrollToId } from '@/lib/useLenis';

/**
 * Full-bleed opening. The still drifts (ken burns) while the page scroll pushes
 * it down at half speed and fades the copy out — so the type leaves before the
 * image does and the next section arrives against a settled frame.
 */
export function Hero({ onBook }: { onBook: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotionPref();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '18%']);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '-14%']);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="u-grain relative isolate flex h-[100svh] min-h-[38rem] flex-col justify-end overflow-hidden"
    >
      <motion.div className="absolute inset-0 -z-20" style={{ y: imgY }}>
        <Figure
          name="hero-ocean"
          alt=""
          decorative
          priority
          sizes="100vw"
          className="h-[118%] w-full"
          imgClassName={reduced ? '' : 'u-kenburns'}
        />
      </motion.div>

      {/* Two stacked scrims: a vertical one for type legibility, a wide one to
          keep the corners from going flat. */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            'linear-gradient(to bottom, rgba(4,16,22,0.62) 0%, rgba(4,16,22,0.12) 32%, rgba(4,16,22,0.5) 72%, var(--color-ink) 100%)',
        }}
      />

      <div className="u-shell relative pb-[clamp(2.5rem,6vh,5rem)] pt-[var(--nav-h)]">
        <motion.div style={{ y: copyY, opacity: copyOpacity }}>
          <motion.div
            className="mb-8 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DUR.slow, delay: 0.9 }}
          >
            <span className="h-px w-10 bg-champagne sm:w-16" aria-hidden />
            <span className="u-label text-champagne">Private Luxury at Sea</span>
          </motion.div>

          <Lines
            as="h1"
            text={'Where the\nhorizon is\nthe only address.'}
            className="u-display max-w-[16ch] text-[length:var(--step-h1)] text-ivory"
            delay={0.45}
          />

          <div className="mt-10 flex flex-col gap-10 border-t border-ivory/15 pt-8 md:flex-row md:items-end md:justify-between md:gap-16">
            <motion.p
              className="u-lead max-w-[46ch]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.base, delay: 1.15, ease: EASE.out }}
            >
              Four suites to a deck, twelve destinations a year, and a crew who
              learned your name before you boarded. OSHIN is a small ship built
              for people who travel quietly.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-5 sm:gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DUR.base, delay: 1.3, ease: EASE.out }}
            >
              <Button variant="solid" onClick={onBook}>
                Reserve a Suite
              </Button>
              <Button variant="bare" onClick={() => scrollToId('suites')}>
                View Suites
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue: a hairline that falls, clears, and falls again. */}
      <motion.div
        className="pointer-events-none absolute bottom-0 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        style={{ opacity: copyOpacity }}
        aria-hidden
      >
        <span className="u-label text-[0.6rem] text-ivory/50">Scroll</span>
        <span className="relative block h-16 w-px overflow-hidden bg-ivory/15">
          <motion.span
            className="absolute inset-x-0 top-0 block h-1/2 bg-champagne"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: EASE.inOut }}
          />
        </span>
      </motion.div>
    </section>
  );
}
