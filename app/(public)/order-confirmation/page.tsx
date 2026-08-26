import type { Metadata } from 'next';

import OrderConfirmation from '@/components/order/OrderConfirmation';
import Container from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'Order Received',
  description: 'Your VINT order request has been submitted. Our team will be in touch shortly.',
  robots: { index: false },
};

export default function OrderConfirmationPage() {
  return (
    // The artwork and the cream wash over it are both negative z-index layers;
    // `isolate` keeps that stacking inside this section.
    <section className="relative isolate grid min-h-[78vh] place-items-center overflow-hidden py-section before:absolute before:inset-0 before:-z-1 before:bg-[linear-gradient(to_bottom,var(--color-cream)_0%,rgb(246_245_216/0.72)_45%,var(--color-cream)_100%)] before:content-['']">
      <div
        className="absolute inset-0 -z-2 bg-cover bg-center opacity-14"
        style={{ backgroundImage: 'url(/images/heroes/confirmation-hero.svg)' }}
        aria-hidden="true"
      />
      <Container width="narrow" className="relative">
        <OrderConfirmation />
      </Container>
    </section>
  );
}
