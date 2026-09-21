import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Figure } from '@/components/Figure';
import { Button } from '@/components/Button';
import { DrawRule, Eyebrow, Lines, Reveal } from '@/components/Reveal';
import { SUITES, type Suite } from '@/lib/content';
import { EASE } from '@/lib/motion';

/**
 * Two presentations of one list.
 *
 * Desktop is an index: a sticky plate on the left that crossfades as the
 * pointer (or keyboard focus) moves down the rows on the right. Below `lg` the
 * same data stacks into cards, because a hover-driven preview has nothing to
 * respond to on touch. Both trees render — CSS picks one — so there is no
 * layout flash while a media query resolves.
 */
export function Suites({ onBook }: { onBook: () => void }) {
  const [active, setActive] = useState(0);
  const suite = SUITES[active];

  return (
    <section id="suites" className="relative py-[var(--section-y)]">
      <div className="u-shell">
        <header className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>The Suites</Eyebrow>
            <Lines
              text={'Four rooms.\nNo two alike.'}
              className="u-display mt-8 text-[length:var(--step-h2)] text-ivory"
            />
          </div>
          <Reveal delay={2} className="max-w-[40ch] md:pb-3">
            <p className="text-ivory/55">
              Every suite faces the water and none of them share a plan. Choose
              by how you want to wake up, not by a deck number.
            </p>
          </Reveal>
        </header>

        <DrawRule className="mt-12 md:mt-20" />

        {/* ------------------------------ desktop ------------------------------ */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="sticky top-[calc(var(--nav-h)+2rem)] pt-12">
              <div className="relative aspect-4/5 w-full overflow-hidden bg-abyss">
                <AnimatePresence mode="sync">
                  <motion.div
                    key={suite.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: EASE.out }}
                  >
                    <Figure
                      name={suite.image}
                      alt={`${suite.name} interior`}
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="h-full w-full"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={suite.id}
                    className="u-label text-champagne"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45, ease: EASE.out }}
                  >
                    {suite.from}
                  </motion.p>
                </AnimatePresence>
                <p className="u-label text-ivory/35">
                  {suite.index} / {String(SUITES.length).padStart(2, '0')}
                </p>
              </div>
            </div>
          </div>

          <ul className="lg:col-span-7">
            {SUITES.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={onBook}
                  data-cursor="RESERVE"
                  aria-label={`${s.name} — reserve`}
                  className="group block w-full border-b border-ivory/10 py-10 text-left"
                >
                  <div className="flex items-baseline gap-6">
                    <span
                      className={`u-label transition-colors duration-500 ${
                        active === i ? 'text-champagne' : 'text-ivory/30'
                      }`}
                    >
                      {s.index}
                    </span>
                    <h3
                      className={`u-display text-[length:var(--step-h3)] transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${
                        active === i
                          ? 'translate-x-2 text-ivory'
                          : 'text-ivory/45 group-hover:text-ivory'
                      }`}
                    >
                      {s.name}
                    </h3>
                  </div>

                  <motion.div
                    className="overflow-hidden"
                    initial={false}
                    animate={{ height: active === i ? 'auto' : 0, opacity: active === i ? 1 : 0 }}
                    transition={{ duration: 0.7, ease: EASE.out }}
                  >
                    <p className="max-w-[52ch] pt-5 text-ivory/60">{s.blurb}</p>
                    <Specs suite={s} className="pt-6" />
                  </motion.div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ------------------------------- stacked ------------------------------ */}
        <div className="grid gap-16 pt-12 sm:grid-cols-2 sm:gap-10 lg:hidden">
          {SUITES.map((s, i) => (
            <article key={s.id}>
              <Reveal delay={i % 2}>
                <Figure
                  name={s.image}
                  alt={`${s.name} interior`}
                  sizes="(min-width: 640px) 46vw, 88vw"
                  className="aspect-4/5 w-full"
                />
                <div className="mt-6 flex items-baseline gap-4">
                  <span className="u-label text-champagne">{s.index}</span>
                  <h3 className="u-display text-[length:var(--step-h3)] text-ivory">
                    {s.name}
                  </h3>
                </div>
                <p className="mt-4 text-ivory/60">{s.blurb}</p>
                <Specs suite={s} className="mt-6" />
                <p className="mt-6 u-label text-champagne">{s.from}</p>
              </Reveal>
            </article>
          ))}
        </div>

        <Reveal className="mt-16 flex justify-center md:mt-24">
          <Button onClick={onBook}>Check Availability</Button>
        </Reveal>
      </div>
    </section>
  );
}

function Specs({ suite, className = '' }: { suite: Suite; className?: string }) {
  const rows = [
    ['Guests', suite.guests],
    ['Interior', suite.size],
    ['Outdoor', suite.terrace],
  ] as const;

  return (
    <dl className={`flex flex-wrap gap-x-10 gap-y-4 ${className}`}>
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt className="u-label text-[0.58rem] text-ivory/35">{label}</dt>
          <dd className="mt-2 text-ivory/80">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
