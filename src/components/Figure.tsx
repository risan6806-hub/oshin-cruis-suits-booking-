import { useState } from 'react';
import { IMAGES, type ImageName } from '@/lib/images.generated';

type Props = {
  name: ImageName;
  alt: string;
  /** Layout hint for the browser's image selection — keep it honest. */
  sizes?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Decorative images are hidden from assistive tech instead of given noise. */
  decorative?: boolean;
};

/**
 * Responsive image with a blurred low-quality placeholder baked into the
 * manifest at build time. The LQIP is a ~1KB data URI, so the frame is never
 * empty and nothing reflows once the real file lands.
 */
export function Figure({
  name,
  alt,
  sizes = '100vw',
  className = '',
  imgClassName = '',
  priority = false,
  decorative = false,
}: Props) {
  const asset = IMAGES[name];
  const [loaded, setLoaded] = useState(false);
  const widest = asset.widths[asset.widths.length - 1];

  return (
    <div
      className={`relative overflow-hidden bg-abyss ${className}`}
      style={{
        backgroundImage: `url(${asset.lqip})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <img
        src={`${import.meta.env.BASE_URL}img/${name}-${widest}.webp`}
        srcSet={asset.widths
          .map(
            (w) =>
              `${import.meta.env.BASE_URL}img/${name}-${w}.webp ${w}w`
          )
          .join(', ')}
        sizes={sizes}
        alt={decorative ? '' : alt}
        aria-hidden={decorative || undefined}
        width={widest}
        height={Math.round(widest / asset.ratio)}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ease-out ${loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
      />
    </div>
  );
}