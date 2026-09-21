import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Figure } from '@/components/Figure';
import { DrawRule, Eyebrow, Lines, Reveal } from '@/components/Reveal';
import { STATS } from '@/lib/content';
import { useReducedMotionPref } from '@/lib/hooks';

/**
 * The manifesto beat. Deliberately quiet after the hero: one statement, one
 * wide still, one row of figures. Nothing competes for the same attention.
 */
export function Intro() {
  const figRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionPref();
  const { scrollYProgress } = useScroll({
    target: figRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', reduced ? '-8%' : '8%']);

  return (
    <section className="relative py-[var(--section-y)]">
      <div className="u-shell">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4 lg:col-span-3">
            <Eyebrow>The Vessel</Eyebrow>
            <Reveal delay={1} className="mt-8 max-w-[34ch] md:mt-12">
              <p className="text-ivory/55">
                Ninety-four metres. Fourteen suites. A guest-to-crew ratio that
                has not changed since our first season.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-8 lg:col-span-9">
            <Lines
              text={'A ship small enough\nto remember you,\nbuilt for water that\nasks to be watched.'}
              className="u-display text-[length:var(--step-h2)] text-ivory"
            />
            <Reveal delay={2} className="mt-10 max-w-[58ch] md:mt-14">
              <p className="u-lead">
                Most ships sell the distance covered. We prefer the hours in
                between — the morning the coast appears, the table held until
                you want it, the evening nobody suggests a schedule. Everything
                aboard exists to keep those hours uninterrupted.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <div ref={figRef} className="relative mt-[clamp(4rem,9vw,9rem)] overflow-hidden">
        <motion.div style={{ y }} className="will-change-transform">
          <Figure
            name="featured-suite"
            alt="A panorama suite at dawn, glass open to a flat sea"
            sizes="100vw"
            className="h-[52vh] min-h-[20rem] w-full md:h-[78vh]"
          />
        </motion.div>
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              'linear-gradient(to top, rgba(4,16,22,0.8) 0%, rgba(4,16,22,0) 45%)',
          }}
        />
        <div className="u-shell absolute inset-x-0 bottom-0 pb-8 md:pb-12">
          <Reveal>
            <p className="u-label text-ivory/70">
              Panorama Suite — Deck 6, starboard
            </p>
          </Reveal>
        </div>
      </div>

      <div className="u-shell mt-[clamp(4rem,8vw,7rem)]">
        <DrawRule />
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-8 md:py-12 lg:border-l lg:border-ivory/10 lg:px-8 lg:first:border-l-0 lg:first:pl-0 ${
                i < 2 ? 'border-b border-ivory/10 lg:border-b-0' : ''
              } ${
                i % 2 === 0
                  ? 'border-r border-ivory/10 pr-6 lg:border-r-0 lg:pr-8'
                  : 'pl-6 lg:pl-8'
              }`}
            >
              <Reveal delay={i}>
                <dt className="u-label text-ivory/45">{stat.label}</dt>
                <dd className="u-display mt-4 text-[length:var(--step-h3)] text-champagne">
                  {stat.value}
                </dd>
              </Reveal>
            </div>
          ))}
        </dl>
        <DrawRule delay={0.2} />
      </div>
    </section>
  );
}
