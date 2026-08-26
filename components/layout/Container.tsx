import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/cn';

export type ContainerWidth = 'narrow' | 'default' | 'wide';

/** The three content widths the designs use — no page invents its own. */
const WIDTHS: Record<ContainerWidth, string> = {
  narrow: 'max-w-vint-narrow',
  default: 'max-w-vint',
  wide: 'max-w-vint-wide',
};

/**
 * Centres content and applies the page gutter.
 *
 * Every screen sits inside one of these, so the gutter is defined once (as the
 * `gutter` spacing step) rather than re-derived per page.
 */
export default function Container({
  children,
  width = 'default',
  as: Tag = 'div',
  className,
}: {
  children: ReactNode;
  width?: ContainerWidth;
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag className={cn('mx-auto w-full px-gutter', WIDTHS[width], className)}>{children}</Tag>
  );
}
