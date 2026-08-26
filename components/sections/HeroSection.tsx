import Image from 'next/image';
import type { ReactNode } from 'react';

import Container from '@/components/layout/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { cn } from '@/lib/cn';

export type HeroVariant = 'home' | 'page' | 'compact';

export interface HeroChip {
  label: string;
  value: string;
}

export interface HeroBottle {
  src: string;
  alt: string;
}

export interface HeroSectionProps {
  /** Controls how tall the hero stands. */
  variant?: HeroVariant;
  /** Background photograph. */
  image?: string;
  imageAlt?: string;
  /**
   * Mirrors the background. The supplied home photograph is reversed, which
   * renders the VINT label backwards; flipping the layer corrects it.
   */
  flipImage?: boolean;
  /**
   * Set when `image` is a real photograph rather than generated artwork.
   * Lightens the wash so the picture reads through, and tints the panel to
   * keep the copy legible against it.
   */
  photo?: boolean;
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  chips?: HeroChip[];
  /** Floating product image, home page only. */
  bottle?: HeroBottle;
  centered?: boolean;
}

const MIN_HEIGHTS: Record<HeroVariant, string> = {
  home: 'min-h-[min(88vh,780px)] max-[560px]:min-h-auto',
  page: 'min-h-[clamp(380px,56vh,560px)]',
  compact: 'min-h-[clamp(280px,42vh,420px)]',
};

/** The wash over the photograph. Lighter when there is a real photo behind it. */
const OVERLAY_ARTWORK =
  'bg-[linear-gradient(118deg,rgb(67_0_5/0.94)_0%,rgb(67_0_5/0.78)_38%,rgb(13_13_13/0.62)_72%,rgb(13_13_13/0.5)_100%)]';
const OVERLAY_PHOTO =
  'bg-[linear-gradient(118deg,rgb(67_0_5/0.58)_0%,rgb(67_0_5/0.42)_40%,rgb(13_13_13/0.28)_74%,rgb(13_13_13/0.22)_100%)]';

/**
 * The premium hero used at the top of every public page.
 *
 * Structure follows the HomeHero reference: a full-bleed photograph, a dark
 * brand-coloured gradient over it, and a frosted translucent panel holding the
 * copy — restyled in VINT's burgundy/cream palette.
 */
export default function HeroSection({
  variant = 'page',
  image,
  imageAlt = '',
  flipImage = false,
  photo = false,
  eyebrow,
  title,
  subtitle,
  actions,
  chips,
  bottle,
  centered = false,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        'relative isolate flex items-center overflow-hidden text-on-dark',
        // The gradient base shows through if a hero photo has not been supplied
        // yet, so the section never renders as an empty black box.
        'bg-[radial-gradient(120%_90%_at_15%_10%,var(--color-burgundy-mid),transparent_60%),linear-gradient(140deg,var(--color-burgundy)_0%,var(--color-ink)_100%)]',
        MIN_HEIGHTS[variant],
      )}
    >
      {image && (
        <div
          className={cn(
            'absolute inset-0 bg-cover bg-center will-change-transform',
            flipImage ? '-scale-x-100' : 'animate-hero-zoom',
          )}
          style={{ backgroundImage: `url(${image})` }}
          role={imageAlt ? 'img' : 'presentation'}
          aria-label={imageAlt || undefined}
        />
      )}

      {/* The ::after adds a soft vignette at the bottom, so the page below
          melts into the hero rather than meeting it on a hard edge. */}
      <div
        className={cn(
          'absolute inset-0',
          'after:absolute after:inset-x-0 after:bottom-0 after:h-2/5 after:content-[""]',
          'after:bg-[linear-gradient(to_top,rgb(13_13_13/0.55),transparent)]',
          photo ? OVERLAY_PHOTO : OVERLAY_ARTWORK,
        )}
        aria-hidden="true"
      />

      <Container className="relative z-1 py-[clamp(3.5rem,8vw,6rem)]">
        <div
          className={cn(
            'grid items-center gap-[clamp(2rem,5vw,4rem)]',
            bottle
              ? 'grid-cols-1 min-[900px]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]'
              : 'grid-cols-1',
          )}
        >
          <div
            className={cn(
              'flex flex-col gap-6 rounded-lg border p-[clamp(1.75rem,3.5vw,3rem)] shadow-hero',
              'border-ivory/20 backdrop-blur-[18px] backdrop-saturate-120',
              // backdrop-filter is well supported, but if it is missing the
              // panel still needs to be readable — fall back to a solid wash.
              'supports-[not(backdrop-filter:blur(4px))]:bg-[rgb(43_2_8/0.82)]',
              // Each child fades up slightly after the one above it.
              '[&>*]:animate-fade-up',
              '[&>*:nth-child(1)]:[animation-delay:120ms] [&>*:nth-child(2)]:[animation-delay:220ms]',
              '[&>*:nth-child(3)]:[animation-delay:320ms] [&>*:nth-child(4)]:[animation-delay:420ms]',
              '[&>*:nth-child(5)]:[animation-delay:520ms]',
              // A photo needs a stronger tint behind the copy than flat artwork.
              photo ? 'bg-[rgb(43_2_8/0.52)]' : 'bg-[rgb(43_2_8/0.34)]',
              centered
                ? 'mx-auto items-center text-center max-[900px]:max-w-none'
                : 'items-start max-w-160 max-[900px]:max-w-none',
            )}
          >
            {eyebrow && <Eyebrow onDark>{eyebrow}</Eyebrow>}

            <h1 className={cn('text-on-dark', variant === 'home' ? 'text-4xl' : 'text-3xl')}>
              {title}
            </h1>

            {subtitle && (
              <p className="max-w-[56ch] text-lg leading-normal text-on-dark-muted">{subtitle}</p>
            )}

            {actions && (
              <div
                className={cn(
                  'flex flex-wrap gap-3 max-[560px]:w-full max-[560px]:flex-col max-[560px]:items-stretch',
                  centered && 'justify-center',
                )}
              >
                {actions}
              </div>
            )}

            {chips && chips.length > 0 && (
              <ul className="mt-2 flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <li
                    key={chip.label}
                    className="inline-flex items-center gap-1 rounded-full border border-ivory/18 bg-ivory/8 px-[0.85rem] py-[0.4rem] text-xs tracking-[0.04em] text-on-dark-muted"
                  >
                    <strong className="font-bold text-on-dark">{chip.value}</strong> {chip.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {bottle && (
            // On a phone the bottle sits above the copy and shrinks rather than
            // being squeezed into a column beside it. Capping the height (not
            // the width) stops a tall bottle photo from pushing the headline
            // off the first screen.
            <div
              className={cn(
                'relative grid place-items-center max-[900px]:order-first max-[900px]:min-h-0',
                'min-[900px]:min-h-105',
                // Warm halo so the bottle separates from the photograph.
                'before:absolute before:aspect-square before:w-[min(90%,380px)] before:rounded-full',
                'before:bg-[radial-gradient(circle,rgb(176_141_52/0.3),transparent_68%)]',
                'before:blur-[8px] before:content-[""]',
              )}
            >
              <Image
                src={bottle.src}
                alt={bottle.alt}
                width={340}
                height={800}
                priority
                className="h-auto w-[min(100%,340px)] animate-float drop-shadow-[0_30px_60px_rgb(0_0_0/0.6)] max-[900px]:max-h-[42vh] max-[900px]:w-auto"
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
