'use client';

import { useId, type ComponentPropsWithRef } from 'react';

import { cn } from '@/lib/cn';
import { fieldControlClasses } from './fieldStyles';

export interface TextAreaProps
  extends Omit<ComponentPropsWithRef<'textarea'>, 'id' | 'className'> {
  label: string;
  optional?: boolean;
  error?: string;
  className?: string;
}

/** Labelled multi-line input, matching FormInput's API and ref behaviour. */
export default function TextArea({
  label,
  optional = false,
  error,
  rows = 4,
  className,
  ref,
  ...rest
}: TextAreaProps) {
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

      <textarea
        id={id}
        ref={ref}
        rows={rows}
        className={fieldControlClasses(Boolean(error), 'min-h-30 resize-y leading-snug')}
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
