import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Figure } from '@/components/Figure';
import { Button } from '@/components/Button';
import { DrawRule, Lines, Reveal } from '@/components/Reveal';
import { NAV_LINKS } from '@/lib/content';
import { useReducedMotionPref } from '@/lib/hooks';
import { scrollToId } from '@/lib/useLenis';

const LEGAL = ['Privacy', 'Terms', 'Accessibility', 'Press'];

/** Closing plate plus the footer proper — one dark block, two jobs. */
export function Footer({ onBook }: { onBook: () => void }) {
  return (
    <>
      <Closing onBook={onBook} />
      <footer className="bg-abyss pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[clamp(3.5rem,7vw,6rem)]">
        <div className="u-shell">
          <div className="grid gap-12 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <p className="u-label text-[0.9rem] tracking-[0.5em] text-ivory">OSHIN</p>
              <p className="mt-7 max-w-[34ch] text-ivory/45">
                Private luxury at sea. Fourteen suites, twelve routes, one crew
                who have sailed together since 2014.
              </p>
            </div>

            <nav className="md:col-span-3 md:col-start-7" aria-label="Footer">
              <p className="u-label text-ivory/30">Explore</p>
              <ul className="mt-6 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => scrollToId(link.id)}
                      className="text-ivory/65 transition-colors duration-500 hover:text-champagne"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="md:col-span-3 md:col-start-10">
              <p className="u-label text-ivory/30">Reservations</p>
              <ul className="mt-6 flex flex-col gap-3">
                <li>
                  <a
                    href="tel:+35621000000"
                    className="text-ivory/65 transition-colors duration-500 hover:text-champagne"
                  >
                    +356 2100 0000
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:reservations@oshin.example"
                    className="break-all text-ivory/65 transition-colors duration-500 hover:text-champagne"
                  >
                    reservations@oshin.example
                  </a>
                </li>
                <li className="text-ivory/45">Quay 4, Valletta, Malta</li>
              </ul>
            </div>
          </div>

          <DrawRule className="mt-14" />

          <div className="flex flex-col gap-5 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="u-label text-ivory/30">
              © {new Date().getFullYear()} OSHIN Maritime Ltd.
            </p>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {LEGAL.map((item) => (
                <li key={item}>
                  <a
                    href="#top"
                    className="u-label text-ivory/30 transition-colors duration-500 hover:text-ivory/70"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

function Closing({ onBook }: { onBook: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotionPref();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', reduced ? '-10%' : '10%']);

  return (
    <section
      ref={ref}
      className="u-grain relative isolate flex min-h-[80svh] items-center overflow-hidden py-[clamp(5rem,12vw,10rem)]"
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-20 h-[122%] will-change-transform">
        <Figure name="cta-sunset" alt="" decorative sizes="100vw" className="h-full w-full" />
      </motion.div>
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            'linear-gradient(to bottom, var(--color-ink) 0%, rgba(4,16,22,0.42) 35%, rgba(4,16,22,0.72) 78%, var(--color-abyss) 100%)',
        }}
      />

      <div className="u-shell">
        <Lines
          text={'The season opens\nin March.'}
          className="u-display max-w-[14ch] text-[length:var(--step-h1)] text-ivory"
        />
        <Reveal delay={2} className="mt-10 max-w-[44ch]">
          <p className="u-lead">
            Suites for the 2027 season are released twelve months ahead and go
            to standing guests first. An enquiry now secures your place in that
            queue.
          </p>
        </Reveal>
        <Reveal delay={3} className="mt-12 flex flex-wrap items-center gap-6 sm:gap-10">
          <Button variant="solid" onClick={onBook}>
            Reserve a Suite
          </Button>
          <Button variant="bare" onClick={() => scrollToId('destinations')}>
            See the Routes
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
