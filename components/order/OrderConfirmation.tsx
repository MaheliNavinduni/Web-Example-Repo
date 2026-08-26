'use client';

import { useEffect, useState } from 'react';
import { Check, ArrowRight, Mail } from 'lucide-react';

import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import { formatPrice } from '@/data/products';
import { SITE } from '@/data/site';
import type { PlacedOrder } from '@/types';

const CARD = 'mt-8 w-full max-w-[560px] rounded-md border border-line-soft bg-ivory-soft p-6 text-left';

/**
 * Reads the order the OrderForm stashed in sessionStorage. If someone lands
 * here directly (refresh, bookmark, private browsing) the page still renders
 * with a friendly generic message rather than blank fields.
 */
export default function OrderConfirmation() {
  const [order, setOrder] = useState<PlacedOrder | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('vint:last-order');
      if (stored) setOrder(JSON.parse(stored) as PlacedOrder);
    } catch {
      // Ignore — the fallback copy below covers it.
    }
    setReady(true);
  }, []);

  const rows: [string, string][] = order
    ? [
        ['Order Reference', order.reference],
        ['Wine', order.productName],
        ['Quantity', String(order.quantity)],
        ['Estimated Total', formatPrice(order.total)],
        ['Customer Name', order.customer],
        ['Phone', order.phone],
      ]
    : [];

  return (
    <div className="flex flex-col items-center text-center">
      <span
        className="mb-6 grid size-20 place-items-center rounded-full bg-success text-on-dark shadow-md"
        aria-hidden="true"
      >
        <Check size={44} strokeWidth={2.5} />
      </span>

      <Eyebrow>Order Received</Eyebrow>
      <h1>Thank You</h1>

      <p className="mt-2 text-lg text-muted">Your order request has been successfully submitted.</p>

      {ready && order && (
        <div className={CARD}>
          <dl className="divide-y divide-line-soft">
            {rows.map(([term, value]) => (
              <div key={term} className="flex flex-wrap items-baseline justify-between gap-4 py-3">
                <dt className="text-xs font-semibold tracking-wide uppercase text-muted">{term}</dt>
                <dd className="font-semibold text-body">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {ready && !order && (
        <div className={CARD}>
          <p className="text-muted">
            We could not display your order details on this device, but your request has been
            recorded. If you need a copy, email us at{' '}
            <a href={`mailto:${SITE.email}`} className="font-semibold text-burgundy underline">
              {SITE.email}
            </a>
            .
          </p>
        </div>
      )}

      <p className="mt-8 max-w-[54ch] text-muted">
        Our team will contact you to confirm availability, delivery details and payment
        arrangements. No payment has been taken on this website.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/collection" variant="primary" icon={<ArrowRight size={16} />}>
          Continue Shopping
        </Button>
        <Button href="/contact" variant="outline" icon={<Mail size={16} />}>
          Contact Us
        </Button>
      </div>
    </div>
  );
}
