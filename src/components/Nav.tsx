import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { NAV_LINKS } from '@/lib/content';
import { useScrolledPast } from '@/lib/hooks';
import { lockScroll, scrollToId } from '@/lib/useLenis';
import { EASE } from '@/lib/motion';

/**
 * Fixed header. Over the hero it is pure overlay — no bar, no blur. Past the
 * fold it condenses: a hairline appears, the shell tints, and the row tightens.
 * The mobile panel is a full-bleed curtain rather than a dropdown.
 */
export function Nav({ onBook }: { onBook: () => void }) {
  const scrolled = useScrolledPast(80);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  // Escape closes the curtain wherever focus happens to be.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // Let the curtain start lifting before the scroll takes over.
    window.setTimeout(() => scrollToId(id), open ? 420 : 0);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[200] transition-colors duration-700 ${
          scrolled && !open
            ? 'border-b border-ivory/10 bg-ink/80 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <div
          className="u-shell flex items-center justify-between transition-[height] duration-700"
          style={{ height: scrolled ? 'calc(var(--nav-h) * 0.8)' : 'var(--nav-h)' }}
        >
          <button
            type="button"
            onClick={() => scrollToId('top')}
            className="u-label text-[0.8rem] tracking-[0.5em] text-ivory transition-colors duration-500 hover:text-champagne sm:text-[0.9rem]"
            aria-label="OSHIN — back to top"
          >
            OSHIN
          </button>

          <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => go(link.id)}
                className="group relative u-label text-ivory/70 transition-colors duration-500 hover:text-ivory"
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 h-px w-full origin-right scale-x-0 bg-champagne transition-transform duration-[650ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:origin-left group-hover:scale-x-100" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-5 sm:gap-8">
            <button
              type="button"
              onClick={onBook}
              className="group relative hidden overflow-hidden border border-ivory/30 px-6 py-3 u-label transition-colors duration-500 hover:border-ivory/60 sm:inline-flex"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-ivory transition-transform duration-[750ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100"
              />
              <span className="relative text-ivory transition-colors duration-[450ms] group-hover:text-ink">
                Book
              </span>
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative z-[210] flex h-8 w-8 flex-col items-end justify-center gap-[7px] lg:hidden"
            >
              <motion.span
                className="block h-px bg-ivory"
                animate={{ width: open ? 26 : 26, rotate: open ? 45 : 0, y: open ? 4 : 0 }}
                transition={{ duration: 0.5, ease: EASE.out }}
              />
              <motion.span
                className="block h-px bg-ivory"
                animate={{ width: open ? 26 : 16, rotate: open ? -45 : 0, y: open ? -4 : 0 }}
                transition={{ duration: 0.5, ease: EASE.out }}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[190] bg-abyss lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: EASE.cine }}
          >
            <div className="u-shell flex h-full flex-col justify-between pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[calc(var(--nav-h)+3rem)]">
              <nav aria-label="Mobile" className="flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <div key={link.id} className="overflow-hidden border-b border-ivory/10">
                    <motion.button
                      type="button"
                      onClick={() => go(link.id)}
                      className="u-display block w-full py-5 text-left text-[clamp(2rem,10vw,3.25rem)] text-ivory"
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      exit={{ y: '110%', transition: { duration: 0.35, ease: EASE.out } }}
                      transition={{ duration: 0.9, delay: 0.18 + i * 0.07, ease: EASE.out }}
                    >
                      <span className="mr-4 align-super u-label text-champagne">
                        0{i + 1}
                      </span>
                      {link.label}
                    </motion.button>
                  </div>
                ))}
              </nav>

              <motion.div
                className="flex flex-col gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    window.setTimeout(onBook, 420);
                  }}
                  className="border border-ivory bg-ivory px-8 py-4 u-label text-ink"
                >
                  Reserve a Suite
                </button>
                <p className="u-label text-ivory/40">Private Luxury at Sea — Est. 2014</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
