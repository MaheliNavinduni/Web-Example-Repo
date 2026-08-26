import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * Square icon-only control in a table's actions column.
 *
 * Always needs an `aria-label` — there is no visible text to name it, so the
 * prop is required rather than optional.
 */
interface BaseProps {
  children: ReactNode;
  'aria-label': string;
  danger?: boolean;
  className?: string;
}

type IconButtonProps =
  | (BaseProps & { href: string; onClick?: never })
  | (BaseProps & { href?: undefined; onClick: () => void });

export default function IconButton({
  children,
  danger = false,
  className,
  ...rest
}: IconButtonProps) {
  const classes = cn(
    'grid size-8.5 place-items-center rounded-sm border border-line-soft text-muted',
    'transition-[background-color,color,border-color] ease-out hover:text-on-dark',
    danger ? 'hover:border-danger hover:bg-danger' : 'hover:border-burgundy hover:bg-burgundy',
    className,
  );

  if (rest.href !== undefined) {
    const { href, ...linkProps } = rest;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { onClick, ...buttonProps } = rest;
  return (
    <button type="button" className={classes} onClick={onClick} {...buttonProps}>
      {children}
    </button>
  );
}
