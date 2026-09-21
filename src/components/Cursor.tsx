import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

/**
 * Desktop-only cursor. Elements opt in by declaring `data-cursor="EXPLORE"`;
 * there is no context or prop drilling, just one delegated listener.
 *
 * Deliberately restrained: a hairline ring that grows into a labelled disc.
 * It never replaces the system cursor's affordance — it accompanies it.
 */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Light spring: the ring trails the pointer just enough to feel weighted.
  const sx = useSpring(x, { stiffness: 900, damping: 60, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 900, damping: 60, mass: 0.35 });

  const [label, setLabel] = useState<string | null>(null);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.('[data-cursor]');
      setLabel(el ? ((el as HTMLElement).dataset.cursor ?? null) : null);
    };
    const leave = () => setVisible(false);

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    document.addEventListener('pointerleave', leave);
    window.addEventListener('pointerdown', () => setDown(true), { passive: true });
    window.addEventListener('pointerup', () => setDown(false), { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      document.removeEventListener('pointerleave', leave);
    };
  }, [x, y, visible]);

  const active = Boolean(label);
  const size = active ? 84 : 14;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[400] mix-blend-difference"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full border border-ivory/70"
        style={{ backgroundColor: active ? 'rgba(244,240,232,0.92)' : 'transparent' }}
        animate={{
          width: size,
          height: size,
          x: -size / 2,
          y: -size / 2,
          opacity: visible ? 1 : 0,
          scale: down ? 0.88 : 1,
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.span
          className="u-label text-ink"
          style={{ fontSize: 9, letterSpacing: '0.24em' }}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        >
          {label}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
