import { Info } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

/** Informational note, used above the order form's submit button. */
export default function Note({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn('flex items-start gap-2 rounded-sm bg-cream-deep p-4 text-sm text-muted', className)}>
      <Info className="mt-0.5 shrink-0 text-gold" size={18} aria-hidden="true" />
      {children}
    </p>
  );
}
