import Image from 'next/image';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

export type ThumbSize = 'sm' | 'lg';

/** sm (48x64) in tables, lg (72x96) on detail screens. */
const SIZES: Record<ThumbSize, string> = {
  sm: 'w-12 h-16',
  lg: 'w-18 h-24',
};

const FRAME = 'relative block shrink-0 overflow-hidden rounded-xs border bg-cream-deep';

/**
 * The single product thumbnail used everywhere in the admin area — inventory
 * and product tables, the order detail screen, and the image field on the
 * product form.
 *
 * Every thumbnail is a fixed 3:4 box with the picture contained inside it, so a
 * tall bottle and a tall glass both sit centred at the same size instead of
 * each screen picking its own dimensions. The image is absolutely positioned
 * inside a clipped box, so it cannot spill out while the page is loading.
 */
export default function AdminThumb({
  src,
  alt = '',
  size = 'sm',
}: {
  src: string;
  alt?: string;
  size?: ThumbSize;
}) {
  const dimensions = size === 'lg' ? { width: 72, height: 96 } : { width: 48, height: 64 };

  return (
    <span className={cn(FRAME, 'border-line-soft', SIZES[size])}>
      <Image
        src={src}
        alt={alt}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-1.5 size-[calc(100%-0.75rem)] object-contain"
      />
    </span>
  );
}

/** Placeholder in the same frame, shown before an image has been chosen. */
export function AdminThumbPlaceholder({
  children,
  size = 'lg',
}: {
  children: ReactNode;
  size?: ThumbSize;
}) {
  return (
    <span
      className={cn(FRAME, 'grid place-items-center border-dashed border-line text-faint', SIZES[size])}
    >
      {children}
    </span>
  );
}
