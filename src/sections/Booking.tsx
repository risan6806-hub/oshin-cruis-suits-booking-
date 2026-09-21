import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Figure } from '@/components/Figure';
import { Button } from '@/components/Button';
import { Eyebrow, Lines, Reveal } from '@/components/Reveal';
import { BOOKING_FIELDS } from '@/lib/content';
import { EASE } from '@/lib/motion';

type Status = 'idle' | 'sent';

/**
 * The enquiry form. Fields are hairline-underlined rather than boxed so the
 * form reads as part of the editorial grid; native `select`, `input` and
 * `textarea` are kept rather than rebuilt out of divs, so keyboard, autofill
 * and mobile pickers all behave the way the platform intends.
 *
 * There is no backend here — submitting swaps the panel for a confirmation.
 */
export function Booking() {
  const [status, setStatus] = useState<Status>('idle');

  return (
    <section
      id="book"
      className="u-grain relative isolate overflow-hidden bg-midnight py-[var(--section-y)]"
    >
      <Figure
        name="ocean-texture"
        alt=""
        decorative
        sizes="100vw"
        className="absolute inset-0 -z-20 h-full w-full"
        imgClassName="opacity-20"
      />
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            'linear-gradient(to bottom, var(--color-ink) 0%, rgba(8,19,29,0.86) 30%, rgba(8,19,29,0.92) 70%, var(--color-ink) 100%)',
        }}
      />

      <div className="u-shell grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <Eyebrow>Reservations</Eyebrow>
          <Lines
            text={'Tell us when,\nand where.'}
            className="u-display mt-8 text-[length:var(--step-h2)] text-ivory"
          />
          <Reveal delay={2} className="mt-8 max-w-[38ch]">
            <p className="u-lead">
              Send an enquiry and a reservations director replies within one
              working day — with availability, not a brochure.
            </p>
          </Reveal>
          <Reveal delay={3} className="mt-10 flex flex-col gap-3">
            <a
              href="tel:+35621000000"
              className="u-label text-ivory/70 transition-colors duration-500 hover:text-champagne"
            >
              +356 2100 0000
            </a>
            <a
              href="mailto:reservations@oshin.example"
              className="u-label text-ivory/70 transition-colors duration-500 hover:text-champagne"
            >
              reservations@oshin.example
            </a>
          </Reveal>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <AnimatePresence mode="wait">
            {status === 'idle' ? (
              <motion.form
                key="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setStatus('sent');
                }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: EASE.out }}
                className="border border-ivory/10 bg-abyss/40 p-6 backdrop-blur-sm sm:p-10"
              >
                <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
                  <Field label="Destination">
                    <Select name="destination" options={BOOKING_FIELDS.destination} />
                  </Field>
                  <Field label="Departure">
                    <Select name="departure" options={BOOKING_FIELDS.departure} />
                  </Field>
                  <Field label="Guests">
                    <Select name="guests" options={BOOKING_FIELDS.guests} />
                  </Field>
                  <Field label="Suite">
                    <Select name="suite" options={BOOKING_FIELDS.suite} />
                  </Field>
                  <Field label="Full name">
                    <input
                      required
                      name="name"
                      autoComplete="name"
                      placeholder="Your name"
                      className="w-full border-b border-ivory/20 bg-transparent pb-3 text-ivory placeholder:text-ivory/25 focus:border-champagne focus:outline-none"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="w-full border-b border-ivory/20 bg-transparent pb-3 text-ivory placeholder:text-ivory/25 focus:border-champagne focus:outline-none"
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Anything we should know">
                      <textarea
                        name="notes"
                        rows={2}
                        placeholder="Anniversary, dietary requirements, arrival by helicopter"
                        className="w-full resize-none border-b border-ivory/20 bg-transparent pb-3 text-ivory placeholder:text-ivory/25 focus:border-champagne focus:outline-none"
                      />
                    </Field>
                  </div>
                </div>

                <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-[30ch] u-label text-ivory/35">
                    An enquiry, not a booking. Nothing is charged.
                  </p>
                  <Button type="submit" variant="solid">
                    Send Enquiry
                  </Button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE.out }}
                className="flex min-h-[22rem] flex-col justify-center border border-champagne/30 bg-abyss/40 p-8 text-center backdrop-blur-sm sm:p-12"
                role="status"
              >
                <p className="u-label text-champagne">Enquiry received</p>
                <h3 className="u-display mt-6 text-[length:var(--step-h3)] text-ivory">
                  Thank you. We will write within one working day.
                </h3>
                <p className="mx-auto mt-6 max-w-[38ch] text-ivory/55">
                  A reservations director has your request and will come back
                  with live availability for the dates you chose.
                </p>
                <div className="mt-10 flex justify-center">
                  <Button variant="bare" onClick={() => setStatus('idle')}>
                    Send another
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-3 block u-label text-ivory/40">{label}</span>
      {children}
    </label>
  );
}

function Select({ name, options }: { name: string; options: readonly string[] }) {
  return (
    <div className="relative">
      <select
        name={name}
        defaultValue=""
        required
        className="w-full appearance-none border-b border-ivory/20 bg-transparent pb-3 pr-8 text-ivory focus:border-champagne focus:outline-none"
      >
        <option value="" disabled className="bg-ink">
          Select
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-ink text-ivory">
            {opt}
          </option>
        ))}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 12 7"
        width="12"
        height="7"
        className="pointer-events-none absolute bottom-4 right-0 text-champagne"
      >
        <path d="M1 1 L6 6 L11 1" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
}
