import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * Neutral pill for a product attribute — type, volume, category.
 *
 * Distinct from StatusBadge, which colours itself from an order or message
 * status. This one never carries meaning through colour.
 */
export default function Badge({
  children,
  solid = false,
  className,
}: {
  children: ReactNode;
  solid?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-[0.85rem] py-[0.35rem]',
        'text-xs font-semibold tracking-wide uppercase',
        solid ? 'border-burgundy bg-burgundy text-on-dark' : 'border-line text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}
