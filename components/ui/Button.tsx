import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'outline' | 'light' | 'ghost-light';
export type ButtonSize = 'sm' | 'md' | 'lg';

/** One entry per variant, so a caller picks a named style, never raw colours. */
const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-burgundy text-on-dark border-burgundy hover:not-disabled:bg-burgundy-mid hover:not-disabled:border-burgundy-mid',
  outline:
    'bg-transparent text-burgundy border-burgundy hover:not-disabled:bg-burgundy hover:not-disabled:text-on-dark',
  light:
    'bg-ivory text-burgundy border-ivory hover:not-disabled:bg-white hover:not-disabled:border-white',
  'ghost-light':
    'bg-ivory/8 text-on-dark border-ivory/50 hover:not-disabled:bg-ivory/18 hover:not-disabled:border-on-dark',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'px-[1.15rem] py-[0.6rem] text-xs',
  md: 'px-7 py-[0.85rem] text-sm',
  lg: 'px-9 py-[1.05rem] text-base',
};

interface BaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Rendered after the label; slides forward on hover. */
  icon?: ReactNode;
  /** Square corners instead of the default pill. */
  square?: boolean;
  block?: boolean;
  className?: string;
}

type AnchorProps = BaseProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    'href' | 'className' | 'children'
  >;

type NativeProps = BaseProps & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<'button'>,
    'className' | 'children'
  >;

export type ButtonProps = AnchorProps | NativeProps;

/**
 * The single button used everywhere on the site.
 *
 * Renders a <Link> when given `href`, otherwise a real <button>. That keeps
 * navigation keyboard- and screen-reader-correct without callers thinking
 * about it, and the union type above means TypeScript only offers anchor props
 * once an `href` is present.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  square = false,
  block = false,
  className,
  ...rest
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap border-[1.5px]',
    'font-sans font-bold tracking-wide uppercase',
    'transition-[background-color,color,border-color,transform,box-shadow] ease-out',
    'hover:not-disabled:-translate-y-0.5 hover:not-disabled:shadow-md active:not-disabled:translate-y-0',
    'disabled:cursor-not-allowed disabled:opacity-55',
    square ? 'rounded-sm' : 'rounded-full',
    block && 'w-full',
    VARIANTS[variant],
    SIZES[size],
    className,
  );

  const content = (
    <>
      {children}
      {icon && (
        <span
          className="inline-flex transition-transform ease-out group-hover/btn:translate-x-1"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...linkProps } = rest as AnchorProps;
    return (
      <Link href={href} className={cn('group/btn', classes)} {...linkProps}>
        {content}
      </Link>
    );
  }

  const { type = 'button', ...buttonProps } = rest as NativeProps;
  return (
    <button type={type} className={cn('group/btn', classes)} {...buttonProps}>
      {content}
    </button>
  );
}
