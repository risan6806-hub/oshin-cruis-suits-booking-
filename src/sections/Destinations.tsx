import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Figure } from '@/components/Figure';
import { DrawRule, Eyebrow, Lines, Reveal } from '@/components/Reveal';
import { DESTINATIONS } from '@/lib/content';
import { useIsMobile, useReducedMotionPref } from '@/lib/hooks';

/**
 * Horizontal rail. On desktop the track is dragged sideways by vertical scroll
 * — the page keeps its single axis of input while the content moves on the
 * other. On touch it becomes an ordinary snap-scrolling rail, which is what a
 * thumb already knows how to do.
 */
export function Destinations() {
  const reduced = useReducedMotionPref();
  const mobile = useIsMobile();
  const railed = !reduced && !mobile;

  return railed ? <Rail /> : <Row />;
}

function Rail() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // Travel is measured, not guessed: the track's overflow past the right
  // gutter. A hardcoded percentage over-scrolls on wide screens and leaves the
  // last card stranded on narrow ones.
  const [travel, setTravel] = useState(0);
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const gutter = track.getBoundingClientRect().left;
      setTravel(Math.max(0, track.scrollWidth - window.innerWidth + gutter * 2));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  return (
    <section id="destinations" ref={ref} className="relative" style={{ height: '300svh' }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="u-shell">
          <div className="flex items-end justify-between">
            <div>
              <Eyebrow>Destinations</Eyebrow>
              <Lines
                text={'Twelve routes a year.'}
                className="u-display mt-6 text-[length:var(--step-h3)] text-ivory"
              />
            </div>
            <p className="hidden u-label text-ivory/35 md:block">Scroll to travel →</p>
          </div>
          <DrawRule className="mt-8" />
        </div>

        <motion.ul
          ref={trackRef}
          style={{ x }}
          className="mt-12 flex w-max gap-8 pl-[var(--gut)] will-change-transform"
        >
          {DESTINATIONS.map((d, i) => (
            <li key={d.name} className="w-[clamp(18rem,26vw,26rem)] shrink-0">
              <Card {...d} n={i} />
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function Row() {
  return (
    <section id="destinations" className="py-[var(--section-y)]">
      <div className="u-shell">
        <Eyebrow>Destinations</Eyebrow>
        <Lines
          text={'Twelve routes\na year.'}
          className="u-display mt-8 text-[length:var(--step-h2)] text-ivory"
        />
        <DrawRule className="mt-10" />
      </div>
      <ul className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[var(--gut)] pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {DESTINATIONS.map((d, i) => (
          <li key={d.name} className="w-[76vw] max-w-sm shrink-0 snap-start sm:w-[46vw]">
            <Card {...d} n={i} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function Card({
  name,
  region,
  image,
  nights,
  season,
  n,
}: (typeof DESTINATIONS)[number] & { n: number }) {
  return (
    <Reveal delay={n % 3} className="group">
      <div className="relative overflow-hidden" data-cursor="VIEW">
        <Figure
          name={image}
          alt={`${name}, ${region}`}
          sizes="(min-width: 768px) 26vw, 76vw"
          className="aspect-3/4 w-full"
          imgClassName="transition-transform duration-[1.6s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.07]"
        />
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background: 'linear-gradient(to top, rgba(4,16,22,0.72) 0%, rgba(4,16,22,0) 52%)',
          }}
        />
        <p className="absolute bottom-5 left-5 u-label text-ivory/75">{season}</p>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-ivory/10 pt-4">
        {/* u-display runs at 0.92 line-height; leading-[1.1] stops descenders
            from landing on the region line underneath. */}
        <h3 className="u-display text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.1] text-ivory">
          {name}
        </h3>
        <span className="u-label whitespace-nowrap text-champagne">{nights}</span>
      </div>
      <p className="mt-3 u-label text-ivory/35">{region}</p>
    </Reveal>
  );
}
