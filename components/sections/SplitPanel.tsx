import Image from 'next/image';
import type { ReactNode } from 'react';

import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

/**
 * Copy beside a full-bleed photographic panel.
 *
 * Home's "About Us" and Our Story's "The VINT Legacy" are the same block, so
 * they share this one.
 *
 * The two columns stretch rather than centre: the copy alone sets the row
 * height and the image is taken out of flow inside its panel, so the picture's
 * own ratio cannot push the row past the text and leave dead space under the
 * button. Stacked on a phone there is no copy column to match, so the panel
 * goes back to a portrait ratio instead of being cropped to a wide band.
 */
export default function SplitPanel({
  children,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  /** Widen the copy column — Home gives the text slightly more room. */
  copyBias = false,
  delay = 120,
}: {
  children: ReactNode;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  copyBias?: boolean;
  delay?: number;
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 items-stretch gap-[clamp(2rem,5vw,4.5rem)]',
        copyBias
          ? 'min-[820px]:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]'
          : 'min-[820px]:grid-cols-2',
      )}
    >
      <Reveal>{children}</Reveal>

      <Reveal
        delay={delay}
        className="group relative aspect-[4/5] overflow-hidden rounded-lg border border-line-soft bg-cream-deep shadow-sm min-[820px]:aspect-auto min-[820px]:min-h-95"
      >
        <Image
          src={image}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          className="absolute inset-0 size-full object-cover transition-transform duration-[520ms] ease-out group-hover:scale-103"
          sizes="(max-width: 820px) 100vw, 520px"
        />
      </Reveal>
    </div>
  );
}
