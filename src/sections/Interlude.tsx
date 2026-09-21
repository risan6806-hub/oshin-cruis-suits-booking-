import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Figure } from '@/components/Figure';
import { Lines } from '@/components/Reveal';
import { useReducedMotionPref } from '@/lib/hooks';

/**
 * A breath between sections: one wide plate, one line of type. The still
 * travels slower than the page, so the band reads as depth rather than as
 * another card sliding past.
 */
export function Interlude() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotionPref();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', reduced ? '-12%' : '12%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['18%', reduced ? '18%' : '-18%']);

  return (
    <section
      ref={ref}
      className="u-grain relative isolate flex h-[70svh] min-h-[22rem] items-center overflow-hidden md:h-[88svh]"
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-20 h-[124%] will-change-transform">
        <Figure
          name="interlude-vessel"
          alt=""
          decorative
          sizes="100vw"
          className="h-full w-full"
        />
      </motion.div>
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            'radial-gradient(120% 90% at 50% 50%, rgba(4,16,22,0.18) 0%, rgba(4,16,22,0.78) 100%)',
        }}
      />

      <motion.div style={{ y: textY }} className="u-shell text-center">
        <Lines
          text={'Ninety-four metres\nof quiet.'}
          className="u-display mx-auto text-[length:var(--step-h1)] italic text-ivory"
        />
        <Lines
          as="p"
          text={'Photographed off Amalfi, 5.40am'}
          className="mt-8 u-label text-ivory/50"
          delay={0.4}
        />
      </motion.div>
    </section>
  );
}
