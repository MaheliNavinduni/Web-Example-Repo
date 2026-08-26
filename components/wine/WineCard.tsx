import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { formatPrice } from '@/data/products';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import type { Product } from '@/types';

export type WineCardLayout = 'compact' | 'wide';

export interface WineCardProps {
  product: Product;
  /** 'compact' stacks the card (Home); 'wide' runs it horizontally (Collection). */
  layout?: WineCardLayout;
  /** Hidden on Home to keep the row tidy. */
  showDescription?: boolean;
}

export default function WineCard({
  product,
  layout = 'compact',
  showDescription = true,
}: WineCardProps) {
  const inStock = product.stock > 0;
  const wide = layout === 'wide';

  return (
    <article
      className={cn(
        'group relative flex overflow-hidden rounded-md border border-line-soft bg-ivory-soft',
        'transition-[transform,box-shadow,border-color] ease-out',
        'hover:-translate-y-1.5 hover:border-line hover:shadow-lg',
        // The wide card only runs horizontally once there is room for the name
        // and price to share a line with the bottle.
        wide ? 'flex-col sm:flex-row' : 'flex-col',
      )}
    >
      <div
        className={cn(
          'relative grid min-h-65 place-items-center overflow-hidden bg-cream-deep px-6 py-8',
          // Narrower than half, so the name and price still fit beside it.
          wide && 'sm:min-h-80 sm:shrink-0 sm:basis-[34%] sm:px-4',
        )}
      >
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full border border-line-soft bg-ivory-soft/92 px-[0.7rem] py-[0.35rem] text-xs font-semibold tracking-[0.04em] text-body">
          <span
            className={cn('size-1.5 rounded-full', inStock ? 'bg-success' : 'bg-danger')}
            aria-hidden="true"
          />
          {inStock ? 'In Stock' : 'Sold Out'}
        </span>

        <Image
          src={product.image}
          alt={product.imageAlt}
          width={220}
          height={520}
          className={cn(
            'w-auto object-contain drop-shadow-[0_14px_24px_rgb(52_33_28/0.22)]',
            'transition-transform duration-[520ms] ease-out group-hover:-translate-y-1 group-hover:scale-106',
            wide ? 'h-50 sm:h-60' : 'h-50',
          )}
          sizes="(max-width: 640px) 60vw, 220px"
        />
      </div>

      <div
        className={cn(
          'flex flex-1 flex-col gap-2 p-6',
          wide && 'sm:min-w-0 sm:justify-center',
        )}
      >
        <div className="flex items-baseline justify-between gap-4">
          <h3 className={cn(wide ? 'text-[clamp(1.3rem,1.4vw,1.55rem)]' : 'text-xl')}>
            {product.name}
          </h3>
          <span className="font-serif text-lg font-bold whitespace-nowrap text-burgundy">
            {formatPrice(product.price)}
          </span>
        </div>

        <p className="text-xs font-semibold tracking-wide uppercase text-faint">
          {product.type} • {product.volume}
        </p>

        {showDescription && (
          /* line-clamp keeps every card the same height regardless of copy. */
          <p className="line-clamp-3 text-base text-muted">{product.description}</p>
        )}

        <div className="mt-auto pt-4">
          <Button
            href={`/wines/${product.slug}`}
            variant={wide ? 'primary' : 'outline'}
            size="sm"
            square={wide}
            block={!wide}
            icon={<ArrowRight size={15} />}
            aria-label={`View details for ${product.name}`}
          >
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}
