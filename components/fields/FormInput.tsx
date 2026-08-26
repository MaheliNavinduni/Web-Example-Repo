'use client';

import { useId, type ComponentPropsWithRef } from 'react';

import { cn } from '@/lib/cn';
import { fieldControlClasses } from './fieldStyles';

export interface FormInputProps extends Omit<ComponentPropsWithRef<'input'>, 'id' | 'className'> {
  label: string;
  /** Adds a quiet "(optional)" beside the label. */
  optional?: boolean;
  /** Message from React Hook Form; presence also drives the invalid styling. */
  error?: string;
  className?: string;
}

/**
 * Labelled text input. Every single-line field on the site goes through this,
 * so labels, required markers, error text and aria wiring stay consistent.
 *
 * `ref` is passed straight through to the <input>, which is what lets a caller
 * spread React Hook Form's `register('email')` onto this component.
 */
export default function FormInput({
  label,
  optional = false,
  error,
  type = 'text',
  className,
  ref,
  ...rest
}: FormInputProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label className="text-xs font-bold tracking-wide uppercase text-muted" htmlFor={id}>
        {label}
        {optional && (
          <span className="font-medium normal-case tracking-normal text-faint"> (optional)</span>
        )}
      </label>

      <input
        id={id}
        ref={ref}
        type={type}
        className={fieldControlClasses(Boolean(error))}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      />

      {error && (
        <span className="text-xs text-danger" id={errorId}>
          {error}
        </span>
      )}
    </div>
  );
}
