import { Figure } from '@/components/Figure';
import { Eyebrow, Lines, Reveal } from '@/components/Reveal';
import { SERVICE_POINTS } from '@/lib/content';

/**
 * Service, stated plainly. The plate is sticky so it holds the reader's place
 * while the four points pass it — the only section on the page where an image
 * stays still and the words move.
 */
export function About() {
  return (
    <section id="about" className="py-[var(--section-y)]">
      <div className="u-shell grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-[calc(var(--nav-h)+2.5rem)]">
            <Figure
              name="service-detail"
              alt="A cocktail served on a weathered wooden table"
              sizes="(min-width: 768px) 40vw, 90vw"
              className="aspect-4/5 w-full"
            />
            <Reveal delay={1} className="mt-6">
              <p className="u-label text-ivory/35">Est. 2014 — Valletta, Malta</p>
            </Reveal>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <Eyebrow>The Service</Eyebrow>
          <Lines
            text={'Attention, without\nbeing attended to.'}
            className="u-display mt-8 text-[length:var(--step-h2)] text-ivory"
          />
          <Reveal delay={2} className="mt-8 max-w-[48ch]">
            <p className="u-lead">
              One crew member for every guest aboard. Most of what they do, you
              will never see happen — which is the point.
            </p>
          </Reveal>

          <ol className="mt-12 md:mt-16">
            {SERVICE_POINTS.map((point, i) => (
              <li key={point.name} className="border-t border-ivory/10 last:border-b">
                <Reveal delay={i}>
                  <div className="flex gap-6 py-7 md:gap-10 md:py-9">
                    <span className="u-label pt-1 text-champagne">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="u-display text-[clamp(1.4rem,2.2vw,1.9rem)] text-ivory">
                        {point.name}
                      </h3>
                      <p className="mt-3 max-w-[44ch] text-ivory/55">{point.copy}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
