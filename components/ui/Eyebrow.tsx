import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * The small uppercase label that sits above a heading.
 *
 * It appears on nearly every section, so it is a component rather than a class
 * repeated by hand — one place to change the treatment, and callers only choose
 * between the light and dark surface.
 */
export default function Eyebrow({
  children,
  onDark = false,
  className,
}: {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase',
        onDark ? 'text-on-dark-muted' : 'text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}
