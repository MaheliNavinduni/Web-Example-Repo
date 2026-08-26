import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import HeroSection from '@/components/sections/HeroSection';
import CollectionGrid from '@/components/wine/CollectionGrid';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';

export const metadata: Metadata = {
  title: 'The Wine Collection',
  description:
    "Explore VINT's small collection of carefully handcrafted homemade wines — red, white, strawberry and king coconut.",
};

export default function CollectionPage() {
  return (
    <>
      <HeroSection
        variant="page"
        image="/images/heroes/collection-hero.jpg"
        imageAlt="Wine glasses hanging above racked bottles in a dimly lit cellar"
        photo
        title="The Wine Collection"
        subtitle="Explore our small collection of carefully handcrafted homemade wines. Four bottles, each made in limited quantity and pressed by hand at the estate."
      />

      <Section id="wine-grid">
        <Container>
          <CollectionGrid />
        </Container>
      </Section>

      {/* Cross-link: the other half of the collection. */}
      <Section tight>
        <Container>
          <Reveal className="group grid grid-cols-1 items-center gap-[clamp(1.5rem,4vw,3.5rem)] rounded-lg border border-line-soft bg-ivory-soft p-[clamp(1.25rem,3vw,2rem)] shadow-sm transition-shadow ease-out hover:shadow-md min-[780px]:grid-cols-2">
            {/* Picture first when stacked — it is what makes the case for clicking. */}
            <div className="order-first aspect-[16/11] overflow-hidden rounded-md bg-cream-deep min-[780px]:order-last">
              <Image
                src="/images/glasses/glassware-banner.png"
                alt="The VINT glassware collection arranged on a linen table"
                width={638}
                height={639}
                className="size-full object-cover transition-transform duration-[520ms] ease-out group-hover:scale-104"
                sizes="(max-width: 780px) 100vw, 520px"
              />
            </div>

            <div className="min-[780px]:order-first">
              <Eyebrow>Glassware</Eyebrow>
              <h2>Every glass, a different experience</h2>
              <p className="mt-2 mb-8 max-w-[46ch] text-lg text-muted">
                The right glass changes the wine in it. Our hand-blown glassware is shaped around
                the wine it is meant to hold — from generous bowls for the reds to slender
                silhouettes that keep the whites crisp.
              </p>
              <Button href="/wine-glasses" variant="primary" icon={<ArrowRight size={16} />}>
                Explore Wine Glasses
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
