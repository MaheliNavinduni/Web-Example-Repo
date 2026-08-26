'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';

import FormInput from '@/components/fields/FormInput';
import SelectInput from '@/components/fields/SelectInput';
import TextArea from '@/components/fields/TextArea';
import FormGrid from '@/components/fields/FormGrid';
import Button from '@/components/ui/Button';
import Note from '@/components/ui/Note';
import QuantitySelector from '@/components/ui/QuantitySelector';
import OrderSummary from '@/components/order/OrderSummary';
import { getOrderableGroups, getOrderableItem, orderableItems } from '@/data/catalogue';
import { orderSchema, type OrderFormValues } from '@/lib/schemas';
import type { PlacedOrder } from '@/types';

const EMPTY: OrderFormValues = { name: '', email: '', phone: '', address: '', notes: '' };

/** Order reference shown on the confirmation page, e.g. VNT-4F92. */
function makeReference(): string {
  return `VNT-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export default function OrderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Product Details links here as /order?product=slug&qty=2, so the customer
  // never has to re-pick what they were already looking at.
  const requestedSlug = searchParams.get('product');
  const requestedQty = Number.parseInt(searchParams.get('qty') ?? '1', 10);

  // The product and quantity stay in component state rather than in the form.
  // They are not validated fields — the select always holds a real product and
  // the stepper is clamped — and the summary on the right re-renders from them.
  const [slug, setSlug] = useState<string>(
    getOrderableItem(requestedSlug) ? (requestedSlug as string) : orderableItems[0].slug,
  );
  const [quantity, setQuantity] = useState(
    Number.isFinite(requestedQty) && requestedQty > 0 ? Math.min(requestedQty, 99) : 1,
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: EMPTY,
    mode: 'onTouched',
  });

  const item = getOrderableItem(slug);
  const groups = getOrderableGroups();

  function onSubmit(values: OrderFormValues) {
    if (!item) return;

    // No backend and no payment gateway yet. The order is handed to the
    // confirmation page through sessionStorage rather than the URL, so the
    // customer's name, phone and address never end up in a shareable link.
    const order: PlacedOrder = {
      reference: makeReference(),
      productName: item.name,
      productCategory: item.category,
      productImage: item.image,
      quantity,
      total: item.price * quantity,
      customer: values.name,
      phone: values.phone,
      email: values.email,
      placedAt: new Date().toISOString(),
    };

    try {
      sessionStorage.setItem('vint:last-order', JSON.stringify(order));
    } catch {
      // Private browsing can block sessionStorage — the confirmation page
      // falls back to a generic message, so this is safe to ignore.
    }

    router.push('/order-confirmation');
  }

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <form
        className="rounded-md border border-line-soft bg-ivory p-6 sm:p-8"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h2 className="mb-8">Order Details</h2>

        <FormGrid>
          {/* Native optgroup support means this stays one accessible select. */}
          <SelectInput
            label="Select Product"
            name="product"
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
          >
            {groups.map(({ group, items }) => (
              <optgroup key={group} label={group}>
                {items.map((option) => (
                  <option key={option.slug} value={option.slug}>
                    {option.name} — {option.category}
                  </option>
                ))}
              </optgroup>
            ))}
          </SelectInput>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold tracking-wide uppercase text-muted">Quantity</span>
            <div className="pt-1.5">
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                max={item?.maxQuantity ?? 99}
              />
            </div>
          </div>

          <TextArea
            label="Special Notes"
            optional
            rows={3}
            className="col-span-full"
            placeholder="Gift wrapping, preferred delivery day, anything else we should know."
            {...register('notes')}
          />

          <FormInput
            label="Full Name"
            autoComplete="name"
            className="col-span-full"
            error={errors.name?.message}
            required
            {...register('name')}
          />

          <FormInput
            label="Email Address"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            required
            {...register('email')}
          />

          <FormInput
            label="Phone Number"
            type="tel"
            autoComplete="tel"
            error={errors.phone?.message}
            required
            {...register('phone')}
          />

          <TextArea
            label="Delivery Address"
            rows={3}
            autoComplete="street-address"
            className="col-span-full"
            error={errors.address?.message}
            required
            {...register('address')}
          />
        </FormGrid>

        <Note className="mt-8">
          After submitting your order, our team will contact you to confirm availability, delivery
          details and payment arrangements. No payment is taken on this website.
        </Note>

        <div className="mt-6">
          <Button
            type="submit"
            variant="primary"
            square
            block
            disabled={isSubmitting}
            icon={<ArrowRight size={16} />}
          >
            {isSubmitting ? 'Submitting…' : 'Submit Order'}
          </Button>
        </div>
      </form>

      <OrderSummary item={item} quantity={quantity} />
    </div>
  );
}
