import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

import HeroSection from '@/components/sections/HeroSection';
import FeatureCard from '@/components/sections/FeatureCard';
import SplitPanel from '@/components/sections/SplitPanel';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import WineCard from '@/components/wine/WineCard';
import { getFeaturedProducts } from '@/data/products';
import { VALUE_PROPS } from '@/data/site';
import { STRETCH_CARDS } from '@/lib/styles';

export const metadata: Metadata = {
  title: 'VINT — Handmade Wine, Crafted With Passion',
  description:
    'A small Sri Lankan estate making homemade wine by hand. Explore four handcrafted wines and our glassware collection.',
};

export default function HomePage() {
  const featured = getFeaturedProducts(3);

  return (
    <>
      <HeroSection
        variant="home"
        image="/images/heroes/home-hero.png"
        imageAlt="A glass of VINT red wine beside a bottle, lit warmly against dark grapes"
        flipImage
        photo
        eyebrow="Est. 2020 · Avissawella, Sri Lanka"
        title="Handmade. Crafted with passion."
        subtitle="VINT is a small family cellar making wine the slow way — pressed by hand, fermented in small batches, and bottled only when it is ready. Four wines, made properly, for the moments worth sharing."
        actions={
          <>
            <Button href="/collection" variant="light" size="lg" icon={<ArrowRight size={17} />}>
              Explore Wines
            </Button>
            <Button href="/wine-glasses" variant="ghost-light" size="lg">
              Explore Wine Glasses
            </Button>
          </>
        }
      />

      {/* ---------------------------------------------------------------- */}
      {/* Our Finest Selection                                             */}
      {/* ---------------------------------------------------------------- */}
      <Section id="finest-selection">
        <Container>
          <SectionHeading
            eyebrow="The Collection"
            title="Our Finest Selection"
            align="between"
            action={
              <Button href="/collection" variant="outline" size="sm" icon={<ArrowRight size={15} />}>
                View All Wines
              </Button>
            }
          />

          <div
            className={`grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6 ${STRETCH_CARDS}`}
          >
            {featured.map((product, index) => (
              <Reveal key={product.id} delay={index * 90}>
                <WineCard product={product} showDescription={false} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Why Choose VINT                                                  */}
      {/* ---------------------------------------------------------------- */}
      <Section band>
        <Container>
          <SectionHeading
            eyebrow="Why VINT"
            title="Why Choose VINT"
            subtitle="Small enough to know every bottle we send out, careful enough to make it worth opening."
            align="center"
          />

          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-8">
            {VALUE_PROPS.map((value, index) => (
              <FeatureCard key={value.title} feature={value} as="li" delay={index * 80} />
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* About preview                                                    */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SplitPanel
            copyBias
            image="/images/about/wine-and-grapes.jpg"
            imageAlt="A glass of red wine on a rustic wooden table beside a bunch of red grapes and a bottle"
            imageWidth={1000}
            imageHeight={1250}
          >
            <Eyebrow>About Us</Eyebrow>
            <h2 className="mb-6">A recipe worth keeping</h2>
            <div className="[&>p]:mb-4 [&>p]:text-lg [&>p]:text-muted">
              <p>
                We are passionate about creating homemade wines with care, love, and attention to
                every detail — each bottle crafted using quality ingredients and traditional
                methods.
              </p>
              <p>
                From preparation to bottling, we put our heart into every step, so what reaches you
                is rich, smooth and genuinely enjoyable.
              </p>
              <p>
                Our goal is simple: beautifully crafted homemade wine for celebrations, quiet
                evenings, and the people you love.
              </p>
            </div>
            <Button href="/our-story" variant="outline" icon={<ArrowRight size={15} />}>
              Discover Our Story
            </Button>
          </SplitPanel>
        </Container>
      </Section>
    </>
  );
}
