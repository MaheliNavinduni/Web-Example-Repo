import type { Metadata } from 'next';
import { Suspense } from 'react';

import HeroSection from '@/components/sections/HeroSection';
import OrderForm from '@/components/forms/OrderForm';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';

export const metadata: Metadata = {
  title: 'Place Your Order',
  description:
    'Request a purchase from VINT. Our team confirms availability, delivery and payment arrangements directly with you — no online payment required.',
};

export default function OrderPage() {
  return (
    <>
      <HeroSection
        variant="compact"
        image="/images/heroes/order-hero.jpg"
        imageAlt="A row of wine glasses on a bar with wine being poured beside a lit candle"
        photo
        eyebrow="Guest Checkout"
        title="Place Your Order"
        subtitle="Enter your details below to request a purchase. Our team will confirm availability, delivery and payment arrangements."
      />

      <Section>
        <Container>
          {/* useSearchParams needs a Suspense boundary so the rest of the page
              can still be pre-rendered statically. */}
          <Suspense fallback={<p>Loading your order form…</p>}>
            <OrderForm />
          </Suspense>
        </Container>
      </Section>
    </>
  );
}
