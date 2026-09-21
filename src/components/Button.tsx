import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type Variant = 'solid' | 'ghost' | 'bare';

/**
 * The house button. On hover an ivory panel wipes up from the base, the label
 * inverts and the arrow's shaft extends. Three coordinated moves on one
 * easing curve — no scale, no shadow, no bounce.
 */
export function Button({
  children,
  variant = 'ghost',
  className = '',
  arrow = true,
  ...rest
}: {
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
} & ComponentPropsWithoutRef<'button'>) {
  if (variant === 'bare') {
    return (
      <button
        {...rest}
        className={`group relative inline-flex items-center gap-3 pb-2 u-label text-ivory/85 transition-colors duration-500 hover:text-ivory ${className}`}
      >
        <span>{children}</span>
        {arrow && <Arrow />}
        <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-100 bg-ivory/25 transition-transform duration-[650ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:origin-left group-hover:bg-champagne" />
      </button>
    );
  }

  const solid = variant === 'solid';

  return (
    <button
      {...rest}
      className={`group relative isolate inline-flex items-center justify-center overflow-hidden border px-7 py-4 sm:px-9 sm:py-[1.15rem] ${
        solid ? 'border-ivory bg-ivory' : 'border-ivory/30 bg-transparent'
      } transition-colors duration-500 ${!solid ? 'hover:border-ivory/60' : ''} ${className}`}
    >
      {/* Fill wipes from the bottom edge. */}
      <span
        aria-hidden
        className={`absolute inset-0 -z-10 origin-bottom scale-y-0 transition-transform duration-[750ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100 ${
          solid ? 'bg-ink' : 'bg-ivory'
        }`}
      />
      <span
        className={`flex items-center gap-3 u-label transition-colors duration-[450ms] ${
          solid ? 'text-ink group-hover:text-ivory' : 'text-ivory group-hover:text-ink'
        }`}
      >
        <span>{children}</span>
        {arrow && <Arrow />}
      </span>
    </button>
  );
}

/** Arrow whose shaft grows on hover — the extension is the feedback. */
function Arrow() {
  return (
    <svg
      width="26"
      height="8"
      viewBox="0 0 26 8"
      fill="none"
      aria-hidden
      className="overflow-visible"
    >
      <line
        x1="0"
        y1="4"
        x2="18"
        y2="4"
        stroke="currentColor"
        strokeWidth="1"
        className="origin-left transition-transform duration-[650ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-[1.35]"
      />
      <path
        d="M14.5 0.5 L18.5 4 L14.5 7.5"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        className="transition-transform duration-[650ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-[6px]"
      />
    </svg>
  );
}
