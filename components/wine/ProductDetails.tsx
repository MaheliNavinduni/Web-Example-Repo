'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ShoppingBag, Thermometer, UtensilsCrossed, Wine } from 'lucide-react';

import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import Accordion from '@/components/ui/Accordion';
import QuantitySelector from '@/components/ui/QuantitySelector';
import SectionHeading from '@/components/ui/SectionHeading';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import FlavourProfile from '@/components/wine/FlavourProfile';
import PairingCard from '@/components/wine/PairingCard';
import { formatPrice } from '@/data/products';
import type { Product } from '@/types';

/**
 * The bottle's well.
 *
 * Sticky from 900px up, so the bottle stays in view while the long right-hand
 * column scrolls; below that it goes back to static and simply sits above the
 * details. Being positioned also gives the warm ::before halo something to
 * anchor to.
 */
const BOTTLE_WELL = [
  'relative grid place-items-center overflow-hidden rounded-lg bg-cream-deep px-8 py-12',
  'min-[900px]:sticky min-[900px]:top-24',
  'before:absolute before:aspect-square before:w-[78%] before:rounded-full',
  'before:bg-[radial-gradient(circle,rgb(176_141_52/0.26),transparent_68%)] before:content-[""]',
].join(' ');

/** Small uppercase caption above a block of detail copy. */
const DETAIL_LABEL =
  'mb-2 flex items-center gap-1 text-xs font-bold tracking-wide uppercase text-burgundy';

/**
 * One component renders all four wine pages — the route at
 * app/(public)/wines/[slug] looks the product up and hands it over.
 */
export default function ProductDetails({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const inStock = product.stock > 0;

  return (
    <>
      {/* Slim atmospheric band in the hero's palette: keeps the hero styling
          family without pushing the product itself below the fold. */}
      <div className="bg-[linear-gradient(110deg,var(--color-burgundy),var(--color-ink))] py-4 text-on-dark">
        <Container>
          <nav
            className="flex flex-wrap items-center gap-1 text-xs tracking-wide uppercase text-on-dark-muted [&_a]:transition-colors [&_a]:ease-out [&_a:hover]:text-on-dark [&_a:hover]:underline [&_[aria-current=page]]:font-bold [&_[aria-current=page]]:text-on-dark"
            aria-label="Breadcrumb"
          >
            <Link href="/">Home</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <Link href="/collection">Collection</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">{product.name}</span>
          </nav>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="grid grid-cols-1 items-start gap-[clamp(2rem,5vw,4.5rem)] min-[900px]:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            {/* ---------- Bottle ---------- */}
            <div className={BOTTLE_WELL}>
              <Image
                src={product.image}
                alt={product.imageAlt}
                width={420}
                height={980}
                priority
                className="relative h-[clamp(320px,42vw,520px)] w-auto animate-float object-contain drop-shadow-[0_26px_48px_rgb(52_33_28/0.3)]"
                sizes="(max-width: 900px) 70vw, 460px"
              />
            </div>

            {/* ---------- Details ---------- */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-2">
                <Badge>{product.type}</Badge>
                <Badge>{product.volume}</Badge>
              </div>

              <h1 className="text-3xl">{product.name}</h1>

              <div className="flex flex-wrap items-center gap-4">
                <span className="font-serif text-2xl font-bold text-burgundy">
                  {formatPrice(product.price)}
                </span>
              </div>

              <p className="text-lg text-muted">{product.description}</p>

              <div className="flex flex-wrap items-center gap-4 border-y border-line-soft py-6">
                <QuantitySelector
                  value={quantity}
                  onChange={setQuantity}
                  max={Math.max(1, product.stock)}
                />

                <Button
                  href={`/order?product=${product.slug}&qty=${quantity}`}
                  variant="primary"
                  square
                  icon={<ShoppingBag size={16} />}
                  aria-disabled={!inStock}
                >
                  Place Order
                </Button>

                <p className="w-full text-xs text-muted">
                  {inStock
                    ? `${product.stock} bottles currently available · ${product.availability}`
                    : 'Currently sold out — contact us to be notified.'}
                </p>
              </div>

              <FlavourProfile flavour={product.flavour} />

              <div className="flex flex-col items-center gap-1 p-6 text-center">
                <span className="flex items-center gap-1 text-xs font-bold tracking-wide uppercase text-burgundy">
                  <Thermometer size={14} aria-hidden="true" />
                  Serving
                </span>
                <span className="text-xs text-muted">{product.serving.label}</span>
                <span className="font-serif text-2xl leading-[1.1] font-bold text-body">
                  {product.serving.tempF}
                </span>
                <span className="text-sm text-muted">({product.serving.tempC})</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Accordions                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section tight>
        <Container width="narrow">
          <Accordion title="Ingredients and Origin" defaultOpen>
            <p className={DETAIL_LABEL}>
              <UtensilsCrossed size={14} aria-hidden="true" />
              Ingredients
            </p>
            <p>{product.ingredients}</p>
          </Accordion>

          <Accordion title="Serving Suggestions" defaultOpen>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <p className={DETAIL_LABEL}>
                  <UtensilsCrossed size={14} aria-hidden="true" />
                  Food Pairings
                </p>
                <p>{product.servingSuggestions.foodPairings}</p>
              </div>
              <div>
                <p className={DETAIL_LABEL}>
                  <Thermometer size={14} aria-hidden="true" />
                  Temperature
                </p>
                <p>{product.servingSuggestions.temperature}</p>
              </div>
            </div>
          </Accordion>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Curated pairings                                                 */}
      {/* ---------------------------------------------------------------- */}
      <Section band>
        <Container>
          <SectionHeading
            eyebrow="At the Table"
            title="Curated Pairings"
            subtitle={`What we like to serve alongside ${product.name}.`}
            align="center"
          />

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-6">
            {product.pairings.map((pairing, index) => (
              <Reveal key={pairing.name} delay={index * 80}>
                <PairingCard pairing={pairing} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Back to collection                                               */}
      {/* ---------------------------------------------------------------- */}
      <Section tight>
        <Container className="text-center">
          <Button href="/collection" variant="outline" icon={<Wine size={15} />}>
            Back to the Collection
          </Button>
        </Container>
      </Section>
    </>
  );
}
