'use client';

import { useId, type ComponentPropsWithRef, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/cn';
import { fieldControlClasses } from './fieldStyles';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectInputProps
  extends Omit<ComponentPropsWithRef<'select'>, 'id' | 'className' | 'children'> {
  label: string;
  /** Flat option list. Use `children` instead when you need <optgroup>. */
  options?: SelectOption[];
  /** Grouped options, for the order form's Wines / Glassware split. */
  children?: ReactNode;
  error?: string;
  placeholder?: string;
  className?: string;
}

/**
 * Labelled dropdown. The native chevron is hidden and redrawn so the control
 * matches the underline inputs; the icon is `pointer-events-none` so clicking
 * it still opens the select.
 */
export default function SelectInput({
  label,
  options,
  children,
  error,
  placeholder,
  className,
  ref,
  ...rest
}: SelectInputProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label className="text-xs font-bold tracking-wide uppercase text-muted" htmlFor={id}>
        {label}
      </label>

      <div className="relative">
        <select
          id={id}
          ref={ref}
          className={fieldControlClasses(Boolean(error), 'cursor-pointer appearance-none pr-8')}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children ??
            options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>

        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-muted"
          size={18}
          aria-hidden="true"
        />
      </div>

      {error && (
        <span className="text-xs text-danger" id={errorId}>
          {error}
        </span>
      )}
    </div>
  );
}
