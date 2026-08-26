'use client';

import { cn } from '@/lib/cn';

export interface FilterOption<T extends string> {
  value: T;
  label: string;
}

/**
 * Row of filter pills.
 *
 * The collection grid and the orders table were drawing the same pills from the
 * same copied classes, so the treatment lives here once. Generic over the value
 * type, so `onChange` hands the caller back its own union — a category slug or
 * an order status — rather than a bare string.
 */
export default function FilterPills<T extends string>({
  label,
  options,
  active,
  onChange,
  className,
}: {
  /** Names the group for screen readers, e.g. "Filter wines by type". */
  label: string;
  options: readonly FilterOption<T>[];
  active: T;
  onChange: (next: T) => void;
  className?: string;
}) {
  return (
    <div
      className={cn('mb-8 flex flex-wrap gap-2 border-b border-line-soft pb-6', className)}
      role="group"
      aria-label={label}
    >
      {options.map((option) => {
        const isActive = option.value === active;
        return (
          <button
            key={option.value}
            type="button"
            className={cn(
              'rounded-full border px-[1.15rem] py-[0.55rem] text-xs font-semibold tracking-wide uppercase',
              'transition-[background-color,color,border-color,transform] ease-out',
              // `:hover` outranks a single class, so the active pill claims the
              // hover case too — otherwise the label turns burgundy-on-burgundy
              // and vanishes while the pointer is still on the pill just clicked.
              isActive
                ? 'border-burgundy bg-burgundy text-on-dark'
                : 'border-line bg-transparent text-muted hover:-translate-y-px hover:border-burgundy hover:text-burgundy',
            )}
            onClick={() => onChange(option.value)}
            aria-pressed={isActive}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
