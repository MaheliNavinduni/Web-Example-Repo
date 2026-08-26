'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Wine } from 'lucide-react';

import WineCard from '@/components/wine/WineCard';
import { WINE_CATEGORIES, products } from '@/data/products';
import FilterPills from '@/components/ui/FilterPills';
import type { WineCategorySlug } from '@/types';

/**
 * The filterable wine grid.
 *
 * Framer Motion is used here (and only here) because cards need to animate
 * *out* when a filter removes them — something CSS transitions cannot do once
 * the element has already left the DOM.
 */
export default function CollectionGrid() {
  const [active, setActive] = useState<WineCategorySlug>('all');
  const reduceMotion = useReducedMotion();

  const visible = useMemo(
    () => (active === 'all' ? products : products.filter((p) => p.typeSlug === active)),
    [active],
  );

  return (
    <>
      <FilterPills
        className="mb-12"
        label="Filter wines by type"
        options={WINE_CATEGORIES.map((category) => ({
          value: category.slug,
          label: category.label,
        }))}
        active={active}
        onChange={setActive}
      />

      <p className="mb-6 text-sm text-muted" aria-live="polite">
        Showing {visible.length} of {products.length} wines
      </p>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((product) => (
            <motion.div
              key={product.id}
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <WineCard product={product} layout="wide" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visible.length === 0 && (
        <div className="flex flex-col items-center gap-2 px-6 py-24 text-center text-muted">
          <Wine className="mb-2 text-faint" size={36} aria-hidden="true" />
          <p>No wines in this category yet — check back soon.</p>
        </div>
      )}
    </>
  );
}
