'use client';

import { useId, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/cn';

export interface AccordionProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

/**
 * Expand/collapse panel used on the product detail page.
 *
 * The open/close animation transitions `grid-rows-[0fr]` to `grid-rows-[1fr]`,
 * which animates smoothly without needing to measure the content height.
 */
export default function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const triggerId = useId();

  return (
    <div className="border-t border-line-soft last-of-type:border-b">
      <h3>
        <button
          type="button"
          id={triggerId}
          className={cn(
            'flex w-full items-center justify-between gap-4 py-6 text-left',
            'font-serif text-xl font-bold text-burgundy transition-opacity ease-out hover:opacity-70',
          )}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((prev) => !prev)}
        >
          {title}
          <ChevronDown
            className={cn('shrink-0 text-muted transition-transform ease-out', open && 'rotate-180')}
            size={22}
            aria-hidden="true"
          />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={cn(
          'grid transition-[grid-template-rows] ease-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pb-8 text-muted">{children}</div>
        </div>
      </div>
    </div>
  );
}
