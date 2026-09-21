import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { Figure } from '@/components/Figure';
import { Eyebrow, Lines, Reveal } from '@/components/Reveal';
import { DETAIL_STAGES } from '@/lib/content';
import { EASE } from '@/lib/motion';
import { useReducedMotionPref } from '@/lib/hooks';

/**
 * Pinned sequence. The section is four viewports tall; the stage inside is
 * sticky, so scrolling advances the stage instead of moving the frame. Scroll
 * progress is the only state — there is no timer and no autoplay to fight.
 *
 * Reduced motion gets the same four beats stacked, with nothing pinned.
 */
export function Experience() {
  const reduced = useReducedMotionPref();
  return reduced ? <Stacked /> : <Pinned />;
}

function Pinned() {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = Math.min(DETAIL_STAGES.length - 1, Math.floor(p * DETAIL_STAGES.length));
    setIndex((prev) => (prev === next ? prev : next));
  });

  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const stage = DETAIL_STAGES[index];

  return (
    <section id="experience" ref={ref} className="relative" style={{ height: '400svh' }}>
      <div className="u-grain sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={stage.image}
            className="absolute inset-0 -z-20"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: EASE.out }}
          >
            <Figure
              name={stage.image}
              alt=""
              decorative
              sizes="100vw"
              className="h-full w-full"
            />
          </motion.div>
        </AnimatePresence>

        {/* Two scrims. The horizontal one carries the headline, the vertical
            one keeps the copy column legible over bright interiors. */}
        <div
          className="absolute inset-0 -z-10"
          aria-hidden
          style={{
            background:
              'linear-gradient(to right, rgba(4,16,22,0.95) 0%, rgba(4,16,22,0.78) 50%, rgba(4,16,22,0.55) 100%)',
          }}
        />
        <div
          className="absolute inset-0 -z-10"
          aria-hidden
          style={{
            background:
              'linear-gradient(to top, rgba(4,16,22,0.82) 0%, rgba(4,16,22,0.1) 55%, rgba(4,16,22,0.5) 100%)',
          }}
        />

        <div className="u-shell flex h-full flex-col justify-between pb-12 pt-[calc(var(--nav-h)+2.5rem)]">
          <div className="flex items-center justify-between">
            <Eyebrow>The Experience</Eyebrow>
            <p className="u-label text-ivory/40">
              {stage.index} / {String(DETAIL_STAGES.length).padStart(2, '0')}
            </p>
          </div>

          <div className="grid max-w-5xl gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={stage.title}
                  className="u-display text-[length:var(--step-h2)] text-ivory"
                  initial={{ opacity: 0, y: 34 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -22 }}
                  transition={{ duration: 0.8, ease: EASE.out }}
                >
                  {stage.title}
                </motion.h2>
              </AnimatePresence>
            </div>
            <div className="md:col-span-5 md:self-end">
              <AnimatePresence mode="wait">
                <motion.p
                  key={stage.copy}
                  className="u-lead"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.8, delay: 0.06, ease: EASE.out }}
                >
                  {stage.copy}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-10">
            <div className="relative h-px w-full bg-ivory/15">
              <motion.div
                className="absolute inset-y-0 left-0 w-full origin-left bg-champagne"
                style={{ scaleX: barScale }}
              />
            </div>
            <ul className="mt-5 flex justify-between">
              {DETAIL_STAGES.map((s, i) => (
                <li
                  key={s.index}
                  className={`u-label transition-colors duration-500 ${
                    i <= index ? 'text-ivory' : 'text-ivory/30'
                  }`}
                >
                  <span className="hidden sm:inline">{s.title}</span>
                  <span className="sm:hidden">{s.index}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stacked() {
  return (
    <section id="experience" className="u-shell py-[var(--section-y)]">
      <Eyebrow>The Experience</Eyebrow>
      <Lines
        text={'Four things we\nspent years on.'}
        className="u-display mt-8 text-[length:var(--step-h2)] text-ivory"
      />
      <div className="mt-16 grid gap-16 md:grid-cols-2">
        {DETAIL_STAGES.map((s, i) => (
          <Reveal key={s.index} delay={i % 2}>
            <Figure
              name={s.image}
              alt={s.title}
              sizes="(min-width: 768px) 46vw, 90vw"
              className="aspect-3/2 w-full"
            />
            <p className="mt-6 u-label text-champagne">{s.index}</p>
            <h3 className="u-display mt-3 text-[length:var(--step-h3)] text-ivory">{s.title}</h3>
            <p className="mt-4 max-w-[46ch] text-ivory/60">{s.copy}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
