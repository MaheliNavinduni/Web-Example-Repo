import Image from 'next/image';

import Note from '@/components/ui/Note';
import { formatPrice } from '@/data/products';
import { cn } from '@/lib/cn';
import type { OrderableItem } from '@/types';

const ROW = 'flex items-baseline justify-between gap-4 py-3 text-sm';

/**
 * Right-hand summary on the order page.
 * There is no payment gateway — this shows an estimate only, and says so.
 */
export default function OrderSummary({
  item,
  quantity,
}: {
  item: OrderableItem | null;
  quantity: number;
}) {
  const subtotal = item ? item.price * quantity : 0;

  return (
    <aside
      className="h-fit rounded-md border border-line-soft bg-ivory p-6 lg:sticky lg:top-24"
      aria-label="Order summary"
    >
      <h2 className="mb-6 text-xl">Order Summary</h2>

      {item ? (
        <>
          <div className="flex gap-4 border-b border-line-soft pb-6">
            <div className="shrink-0 overflow-hidden rounded-sm bg-cream-deep p-2">
              <Image
                src={item.image}
                alt={item.imageAlt}
                width={96}
                height={120}
                className="h-30 w-24 object-contain"
              />
            </div>

            <div>
              <span className="text-xs font-semibold tracking-wide uppercase text-faint">
                {item.category}
              </span>
              <p className="font-serif text-lg font-bold text-burgundy">{item.name}</p>
              <span className="text-sm text-muted">
                {formatPrice(item.price)} × {quantity}
              </span>
            </div>
          </div>

          <dl className="divide-y divide-line-soft">
            <div className={ROW}>
              <dt className="text-muted">Subtotal</dt>
              <dd className="font-semibold">{formatPrice(subtotal)}</dd>
            </div>
            <div className={ROW}>
              <dt className="text-muted">Delivery</dt>
              <dd className="font-semibold">Confirmed by our team</dd>
            </div>
            <div className={cn(ROW, 'text-md')}>
              <dt className="font-bold text-burgundy">Estimated Total</dt>
              <dd className="font-serif text-xl font-bold text-burgundy">
                {formatPrice(subtotal)}
              </dd>
            </div>
          </dl>

          <Note className="mt-6">
            Payment arrangements will be confirmed by our team when they contact you.
          </Note>
        </>
      ) : (
        <p className="text-muted">
          Choose a product on the left and your summary will appear here.
        </p>
      )}
    </aside>
  );
}
