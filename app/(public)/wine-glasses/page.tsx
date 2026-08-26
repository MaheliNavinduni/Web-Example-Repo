import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import HeroSection from '@/components/sections/HeroSection';
import CtaBand from '@/components/sections/CtaBand';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import Container from '@/components/layout/Container';
import Section from '@/components/layout/Section';
import { glassware, glasswareQualities } from '@/data/glassware';
import { formatPrice } from '@/data/products';
import { STRETCH_CARDS } from '@/lib/styles';

export const metadata: Metadata = {
  title: 'Wine Glass Collection',
  description:
    'Hand-blown glassware designed to elevate every pour — five individual glasses, each shaped around the wine it is meant to hold.',
};

/** Shared by the feature card and the two beside it. */
const QUALITY_CARD =
  'group flex flex-col gap-4 rounded-lg border border-ivory/12 bg-burgundy p-[clamp(1.5rem,3vw,2.25rem)] text-on-dark ' +
  'transition-[transform,border-color,box-shadow] ease-out hover:-translate-y-1 hover:border-ivory/34 hover:shadow-lg';

const QUALITY_ICON =
  'grid size-11 place-items-center rounded-full bg-gold text-burgundy transition-transform ease-out group-hover:-rotate-10 group-hover:scale-108';

export default function WineGlassesPage() {
  const [feature, ...rest] = glasswareQualities;

  return (
    <>
      <HeroSection
        variant="page"
        image="/images/heroes/glasses-hero.png"
        imageAlt="A row of VINT wine glasses arranged on a linen table"
        photo
        eyebrow="Glassware"
        title="Wine Glass Collection"
        subtitle="Designed to elevate every pour. Hand-blown, lead-free and shaped around the wine it is meant to hold."
      />

      {/* ---------------------------------------------------------------- */}
      {/* The collection                                                   */}
      {/* ---------------------------------------------------------------- */}
      <Section id="glass-grid">
        <Container>
          <SectionHeading
            eyebrow="Five Glasses"
            title="Sip in Style"
            subtitle="Every glass, a different experience. Each one is available to order directly through our team."
            align="center"
          />

          <div
            className={`grid grid-cols-[repeat(auto-fit,minmax(min(100%,190px),1fr))] gap-6 ${STRETCH_CARDS}`}
          >
            {glassware.map((item, index) => (
              <Reveal key={item.id} delay={index * 90}>
                <article className="group flex flex-col overflow-hidden rounded-md border border-line-soft bg-ivory-soft transition-[transform,box-shadow] ease-out hover:-translate-y-1.5 hover:shadow-lg">
                  {/* The product shots are very tall (roughly 0.38:1) on a
                      near-white ground, so the glass is contained rather than
                      cropped and the well is matched to the photographs' own
                      background so the two blend seamlessly. */}
                  <div className="grid min-h-70 place-items-center overflow-hidden bg-[#fefefe] px-4 py-6">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      width={300}
                      height={800}
                      className="h-60 w-auto object-contain transition-transform duration-[520ms] ease-out group-hover:scale-105"
                      sizes="(max-width: 900px) 45vw, 220px"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <h3 className="text-lg">{item.name}</h3>
                    <p className="flex-1 text-sm text-muted">{item.description}</p>

                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-line-soft pt-4">
                      <span className="font-serif text-lg font-bold text-burgundy">
                        {formatPrice(item.price)}
                      </span>
                      <Button
                        href={`/order?product=${item.slug}`}
                        variant="outline"
                        size="sm"
                        icon={<ArrowRight size={15} />}
                        aria-label={`Order the ${item.name}`}
                      >
                        Order
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Uncompromising Quality                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section band>
        <Container>
          <SectionHeading
            eyebrow="The Anatomy of Perfection"
            title="Uncompromising Quality"
            align="center"
          />

          <div className="grid grid-cols-1 gap-6 min-[860px]:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
            {/* Copy beside the photograph rather than above it. The
                craftsmanship shot is portrait and only 321px wide, so a
                full-width landscape slot would both crop it badly and upscale
                it into mush. In a ~280px column it renders close to native
                size and stays sharp. */}
            <Reveal
              className={`${QUALITY_CARD} min-[860px]:row-span-2 min-[1040px]:grid min-[1040px]:grid-cols-[minmax(0,1fr)_minmax(0,280px)] min-[1040px]:items-center min-[1040px]:gap-[clamp(1rem,2.5vw,2rem)]`}
            >
              <div>
                <span className={QUALITY_ICON}>
                  <Icon name={feature.icon} size={20} />
                </span>
                <h3 className="mt-4 text-xl text-on-dark">{feature.title}</h3>
                <p className="mt-2 text-base text-on-dark-muted">{feature.body}</p>
              </div>

              <div className="aspect-[16/10] overflow-hidden rounded-md min-[1040px]:aspect-[321/442]">
                <Image
                  src="/images/glasses/glassblowing.jpg"
                  alt="A glassmaker shaping a glowing wine glass by hand with tongs"
                  width={321}
                  height={442}
                  className="size-full object-cover opacity-90 transition-transform duration-[520ms] ease-out group-hover:scale-105"
                  sizes="(max-width: 1040px) 100vw, 280px"
                />
              </div>
            </Reveal>

            <div className="grid gap-6 min-[860px]:grid-rows-2">
              {rest.map((quality, index) => (
                <Reveal key={quality.id} className={QUALITY_CARD} delay={(index + 1) * 90}>
                  <span className={QUALITY_ICON}>
                    <Icon name={quality.icon} size={20} />
                  </span>
                  <h3 className="text-xl text-on-dark">{quality.title}</h3>
                  <p className="text-base text-on-dark-muted">{quality.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        image="/images/heroes/glasses-cta.svg"
        title="Complete the Experience"
        body="The right glass changes the wine in it. Pair a glass with one of our four handcrafted bottles and taste the difference for yourself."
        actions={
          <>
            <Button href="/collection" variant="light" size="lg" icon={<ArrowRight size={17} />}>
              Explore Wines
            </Button>
            <Button href="/order" variant="ghost-light" size="lg">
              Place an Order
            </Button>
          </>
        }
      />
    </>
  );
}
