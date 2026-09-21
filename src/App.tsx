import { Nav } from '@/components/Nav';
import { Cursor } from '@/components/Cursor';
import { Hero } from '@/sections/Hero';
import { Intro } from '@/sections/Intro';
import { Suites } from '@/sections/Suites';
import { Experience } from '@/sections/Experience';
import { Interlude } from '@/sections/Interlude';
import { Destinations } from '@/sections/Destinations';
import { Story } from '@/sections/Story';
import { Life } from '@/sections/Life';
import { About } from '@/sections/About';
import { Booking } from '@/sections/Booking';
import { Footer } from '@/sections/Footer';
import { useHasPointer, useReducedMotionPref } from '@/lib/hooks';
import { scrollToId, useLenis } from '@/lib/useLenis';

/**
 * Page order is the argument: the ship, the rooms, the four things we spent
 * years on, where it goes, what a day looks like, who looks after you — and
 * only then the form.
 */
export default function App() {
  const hasPointer = useHasPointer();
  const reduced = useReducedMotionPref();

  // Smoothing is for mice. Touch and reduced-motion keep native scrolling.
  useLenis(hasPointer && !reduced);

  const book = () => scrollToId('book');

  return (
    <>
      <a href="#main" className="u-skip">
        Skip to content
      </a>

      <Nav onBook={book} />
      {hasPointer && !reduced && <Cursor />}

      <main id="main">
        <Hero onBook={book} />
        <Intro />
        <Suites onBook={book} />
        <Experience />
        <Interlude />
        <Destinations />
        <Story />
        <Life />
        <About />
        <Booking />
      </main>

      <Footer onBook={book} />
    </>
  );
}
