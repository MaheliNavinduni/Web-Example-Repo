import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import HeroSection from '@/components/sections/HeroSection';
import FeatureCard from '@/components/sections/FeatureCard';
import SplitPanel from '@/components/sections/SplitPanel';
import SectionHeading from '@/components/ui/SectionHeading';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal from '@/components/ui/Reveal';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import { CRAFTSMANSHIP, SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'From a treasured homemade recipe passed down through generations to every bottle we share — the story of VINT, established 2020 in Avissawella, Sri Lanka.',
};

const GALLERY = [
  {
    src: '/images/story/shared-1.jpg',
    alt: 'Two glasses of red wine beside a bowl of redcurrants and a bottle',
  },
  {
    src: '/images/story/shared-2.jpg',
    alt: 'Red wine being poured into a glass',
  },
  {
    src: '/images/story/shared-3.jpg',
    alt: 'Wine poured into a glass under warm string lights in the evening',
  },
];

export default function OurStoryPage() {
  return (
    <>
      <HeroSection
        variant="page"
        image="/images/heroes/story-hero.jpg"
        imageAlt="Red wine being poured into a glass against a dark background"
        photo
        eyebrow={`Established ${SITE.established}`}
        title="Our Story"
        subtitle="From a treasured homemade recipe to every bottle we share."
        actions={
          <Button href="/collection" variant="light" icon={<ArrowRight size={16} />}>
            See What We Make
          </Button>
        }
      />

      {/* ---------------------------------------------------------------- */}
      {/* The VINT Legacy                                                  */}
      {/* ---------------------------------------------------------------- */}
      <Section id="legacy">
        <Container>
          <SplitPanel
            image="/images/story/legacy.jpg"
            imageAlt="Red wine being poured into a glass beside a dark bottle"
            imageWidth={1000}
            imageHeight={1242}
          >
            <Eyebrow>The Beginning</Eyebrow>
            <h2 className="mb-6">The VINT Legacy</h2>

            <div className="[&>p]:mb-6 [&>p]:text-lg [&>p]:text-muted">
              <p>
                Our wine story began in {SITE.established}, inspired by a treasured homemade wine
                recipe passed down through generations. The recipe carries the warmth of family
                tradition, carefully preserved over the years and enjoyed for its pleasant taste
                and unique character. What began as a simple homemade habit soon became a passion
                for making wine that brings people together.
              </p>

              <p>
                Every bottle is made with care, inspired by that original family recipe while
                keeping the spirit of its tradition alive. From the first homemade batch to today,
                our journey has always been about preserving our heritage, sharing our passion, and
                creating a wine experience that feels special with every sip.
              </p>
            </div>

            <Badge>Est. {SITE.established}</Badge>
          </SplitPanel>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Unrivaled Craftsmanship                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section band>
        <Container>
          <SectionHeading
            eyebrow="How It Is Made"
            title="Unrivaled Craftsmanship"
            subtitle="From the careful picking of ripe fruit to the quiet months of maturing, our process is a small, patient, entirely hands-on one."
            align="center"
          />

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-6">
            {CRAFTSMANSHIP.map((step, index) => (
              <FeatureCard key={step.title} feature={step} variant="boxed" delay={index * 90} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Gallery                                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Moments"
            title="Made to Be Shared"
            subtitle="The reason we do this: the evenings our wine ends up in the middle of."
            align="center"
          />

          {/* Three equal portrait tiles. All three photographs are 2:3, so an
              asymmetric editorial grid would crop two of them into letterbox
              strips. Equal tiles keep each shot whole and the same size. */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {GALLERY.map((item, index) => (
              <Reveal
                key={item.src}
                delay={index * 100}
                className="group relative aspect-[2/3] overflow-hidden rounded-md bg-cream-deep"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={1200}
                  className="size-full object-cover transition-[transform,filter] duration-[900ms] ease-out group-hover:scale-105 group-hover:saturate-110"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Closing CTA                                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section tight>
        <Container className="text-center">
          <Reveal>
            <h2 className="mb-4">Taste the tradition</h2>
            <p className="mx-auto mb-8 max-w-[50ch] text-lg text-muted">
              Four wines, made in small batches at our estate in {SITE.address.locality}.
            </p>
            <Button href="/collection" variant="primary" size="lg" icon={<ArrowRight size={17} />}>
              Explore the Collection
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
