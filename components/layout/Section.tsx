import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * A major band of a page, carrying the vertical rhythm between sections.
 *
 * `tight` and `band` are the only two variations the designs use, so they are
 * named props rather than each page choosing its own padding value.
 */
export default function Section({
  children,
  tight = false,
  band = false,
  className,
  id,
  'aria-labelledby': ariaLabelledBy,
}: {
  children: ReactNode;
  tight?: boolean;
  band?: boolean;
  className?: string;
  id?: string;
  'aria-labelledby'?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        tight ? 'py-section-tight' : 'py-section',
        band && 'bg-cream-deep',
        className,
      )}
    >
      {children}
    </section>
  );
}
