import { Figure } from '@/components/Figure';
import { DrawRule, Eyebrow, Lines, Reveal } from '@/components/Reveal';
import { LIFE_TILES } from '@/lib/content';

/**
 * The asymmetric grid. Spans come from the content module so the rhythm is
 * authored, not derived — no two rows repeat, and the tall tile anchors the
 * top left. Below `md` everything collapses to a single readable column.
 */
export function Life() {
  return (
    <section id="life" className="py-[var(--section-y)]">
      <div className="u-shell">
        <header className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Life at Sea</Eyebrow>
            <Lines
              text={'Eight reasons\nto stay aboard.'}
              className="u-display mt-8 text-[length:var(--step-h2)] text-ivory"
            />
          </div>
          <Reveal delay={2} className="max-w-[38ch] md:pb-3">
            <p className="text-ivory/55">
              No queues, no seatings, no sign-up sheets. Everything is open when
              you are.
            </p>
          </Reveal>
        </header>

        <DrawRule className="mt-12 md:mt-16" />

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 md:auto-rows-[minmax(0,13rem)] md:grid-cols-12 lg:auto-rows-[minmax(0,15rem)]">
          {LIFE_TILES.map((tile, i) => (
            <li key={tile.name} className={tile.span}>
              <Reveal delay={i % 3} className="h-full">
                <article
                  className="group relative h-full min-h-[14rem] overflow-hidden md:min-h-0"
                  data-cursor="LOOK"
                >
                  <Figure
                    name={tile.image}
                    alt={tile.name}
                    sizes="(min-width: 768px) 44vw, 90vw"
                    className="h-full w-full"
                    imgClassName="transition-transform duration-[1.8s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-700 group-hover:opacity-90"
                    aria-hidden
                    style={{
                      background:
                        'linear-gradient(to top, rgba(4,16,22,0.82) 0%, rgba(4,16,22,0.05) 58%)',
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <h3 className="u-display text-[clamp(1.35rem,2vw,1.9rem)] text-ivory">
                      {tile.name}
                    </h3>
                    {/* Visible by default on touch; on pointer devices it waits for hover. */}
                    <p className="mt-2 max-w-[28ch] u-label text-ivory/55 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] md:translate-y-1 md:text-transparent md:group-hover:translate-y-0 md:group-hover:text-ivory/60">
                      {tile.note}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
