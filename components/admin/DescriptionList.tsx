import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

export interface DescriptionRow {
  term: string;
  value: ReactNode;
}

/**
 * Label/value list used on the order detail screen and in the message dialog.
 *
 * Two columns on anything wider than a phone, stacked below that — a 150px
 * label column beside a long delivery address is unreadable on a small screen.
 */
export default function DescriptionList({
  rows,
  className,
}: {
  rows: DescriptionRow[];
  className?: string;
}) {
  return (
    <dl className={cn('grid gap-2', className)}>
      {rows.map(({ term, value }) => (
        <div
          key={term}
          className="grid grid-cols-1 gap-1 border-b border-line-soft py-2 last:border-b-0 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-4"
        >
          <dt className="text-xs font-bold tracking-wide uppercase text-faint">{term}</dt>
          <dd className="text-body">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
