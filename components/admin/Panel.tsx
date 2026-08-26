import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * The bordered card every admin screen is built from.
 *
 * `title` renders a header strip; without it the panel is just the frame, which
 * is what the tables want since they bring their own <thead>.
 */
export default function Panel({
  children,
  title,
  action,
  /** Tables sit flush to the frame; anything else wants padding. */
  padded = false,
  className,
}: {
  children: ReactNode;
  title?: string;
  action?: ReactNode;
  padded?: boolean;
  className?: string;
}) {
  return (
    <section
      className={cn(
        'mb-8 overflow-hidden rounded-md border border-line-soft bg-ivory-soft',
        className,
      )}
    >
      {title && (
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line-soft p-6">
          <h2 className="text-lg">{title}</h2>
          {action}
        </div>
      )}
      <div className={cn(padded && 'p-6')}>{children}</div>
    </section>
  );
}
