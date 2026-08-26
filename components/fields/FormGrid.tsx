import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * Two-column field layout that collapses to one column on small screens.
 * A child spans both columns by adding `col-span-full`.
 */
export default function FormGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2', className)}>
      {children}
    </div>
  );
}
