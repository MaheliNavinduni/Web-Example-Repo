'use client';

import type { CSSProperties } from 'react';
import { FlaskConical } from 'lucide-react';

import { flavourLabel } from '@/data/products';
import Reveal from '@/components/ui/Reveal';
import type { FlavourKey, FlavourProfile as FlavourValues } from '@/types';

const ROWS: { key: FlavourKey; label: string }[] = [
  { key: 'sweetness', label: 'Sweetness' },
  { key: 'acidity', label: 'Acidity' },
  { key: 'body', label: 'Body' },
  { key: 'fruitiness', label: 'Fruitiness' },
];

/**
 * Animated flavour bars.
 *
 * Each bar's width comes straight from the product data as a percentage and is
 * passed down as the `--fill` custom property. The bars sit at 0 until Reveal
 * marks the block visible, then grow to their stored value — which is why the
 * fill's width is driven by the wrapper's `data-reveal` state rather than being
 * set directly.
 */
export default function FlavourProfile({ flavour }: { flavour: FlavourValues }) {
  return (
    <Reveal
      className="rounded-sm border border-line-soft bg-ivory p-6 [&[data-reveal=in]_[data-fill]]:w-(--fill)"
      threshold={0.3}
    >
      <p className="mb-4 flex items-center gap-1 text-xs font-bold tracking-wide uppercase text-burgundy">
        <FlaskConical size={14} aria-hidden="true" />
        Flavour Profile
      </p>

      {ROWS.map(({ key, label }) => {
        const value = flavour[key] ?? 0;
        return (
          <div
            className="grid grid-cols-[78px_minmax(0,1fr)_auto] items-center gap-2 py-1 not-first-of-type:border-t not-first-of-type:border-line-soft sm:grid-cols-[90px_minmax(0,1fr)_auto]"
            key={key}
          >
            <span className="text-xs text-muted">{label}</span>

            <div
              className="relative h-[3px] overflow-hidden rounded-full bg-warm-gray"
              role="meter"
              aria-valuenow={value}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${label}: ${flavourLabel(key, value)}`}
            >
              <span
                data-fill
                className="absolute inset-y-0 left-0 w-0 rounded-full bg-[linear-gradient(90deg,var(--color-burgundy),var(--color-burgundy-bright))] transition-[width] duration-[900ms] ease-out"
                style={{ '--fill': `${value}%` } as CSSProperties}
              />
            </div>

            <span className="min-w-[62px] text-right text-xs font-semibold text-muted sm:min-w-20">
              {flavourLabel(key, value)}
            </span>
          </div>
        );
      })}
    </Reveal>
  );
}
