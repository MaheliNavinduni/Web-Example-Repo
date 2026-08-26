'use client';

import { Minus, Plus } from 'lucide-react';

export interface QuantitySelectorProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  label?: string;
}

const STEP_BUTTON =
  'grid h-11 w-10 place-items-center text-burgundy transition-colors ease-out ' +
  'hover:not-disabled:bg-burgundy hover:not-disabled:text-on-dark ' +
  'disabled:cursor-not-allowed disabled:opacity-35';

/**
 * Controlled minus / value / plus stepper.
 * The live region means screen readers announce the new quantity on change.
 */
export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  label = 'Quantity',
}: QuantitySelectorProps) {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  return (
    <div
      className="inline-flex items-center overflow-hidden rounded-sm border border-line bg-ivory-soft"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        className={STEP_BUTTON}
        onClick={decrease}
        disabled={value <= min}
        aria-label={`Decrease ${label.toLowerCase()}`}
      >
        <Minus size={16} aria-hidden="true" />
      </button>

      <span
        className="min-w-12 border-x border-line-soft text-center text-md font-bold leading-11 tabular-nums"
        aria-live="polite"
      >
        {value}
      </span>

      <button
        type="button"
        className={STEP_BUTTON}
        onClick={increase}
        disabled={value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
      >
        <Plus size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
