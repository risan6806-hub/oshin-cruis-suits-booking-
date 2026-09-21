import { Figure } from '@/components/Figure';
import { Eyebrow, Lines, Reveal } from '@/components/Reveal';
import { STORY_BEATS } from '@/lib/content';

/**
 * A day aboard, in four lines. The ladder alternates side to side and the type
 * overlaps the plate it belongs to, so the eye crosses the page rather than
 * running down one column.
 */
export function Story() {
  return (
    <section className="py-[var(--section-y)]">
      <div className="u-shell">
        <Eyebrow>A Day Aboard</Eyebrow>
        <Lines
          text={'From first light\nto the last drink.'}
          className="u-display mt-8 max-w-[18ch] text-[length:var(--step-h2)] text-ivory"
        />

        <ol className="mt-[clamp(3rem,7vw,7rem)] flex flex-col gap-[clamp(3.5rem,9vw,10rem)]">
          {STORY_BEATS.map((beat, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={beat.text} className="grid items-end gap-6 md:grid-cols-12 md:gap-0">
                <div
                  className={`md:col-span-7 ${flip ? 'md:col-start-6 md:row-start-1' : 'md:col-start-1'}`}
                >
                  <Reveal>
                    <Figure
                      name={beat.image}
                      alt={beat.text}
                      sizes="(min-width: 768px) 58vw, 90vw"
                      className="aspect-16/9 w-full"
                    />
                  </Reveal>
                </div>

                <div
                  className={`md:col-span-6 md:row-start-1 md:pb-[clamp(1rem,4vw,4rem)] ${
                    flip ? 'md:col-start-1 md:pr-10 md:text-left' : 'md:col-start-7 md:pl-10'
                  }`}
                >
                  <Reveal delay={1}>
                    <span className="u-label text-champagne">0{i + 1}</span>
                  </Reveal>
                  <Lines
                    as="h3"
                    text={beat.text}
                    className="u-display mt-4 text-[length:var(--step-h3)] italic text-ivory"
                    delay={0.1}
                  />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
