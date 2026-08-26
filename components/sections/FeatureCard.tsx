import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';
import type { FeatureCard as FeatureCardData } from '@/types';

export type FeatureCardVariant = 'centered' | 'boxed';

/**
 * An icon, a title and a paragraph.
 *
 * Home's "Why Choose VINT" and Our Story's "Unrivaled Craftsmanship" were two
 * near-identical blocks of markup over the same {@link FeatureCardData} shape,
 * so they are one component with two treatments: `centered` for the borderless
 * row on Home, `boxed` for the bordered cards on Our Story.
 */
export default function FeatureCard({
  feature,
  variant = 'centered',
  delay = 0,
  as = 'div',
}: {
  feature: FeatureCardData;
  variant?: FeatureCardVariant;
  delay?: number;
  as?: 'div' | 'li';
}) {
  const centered = variant === 'centered';

  return (
    <Reveal
      as={as}
      delay={delay}
      className={cn(
        'group flex flex-col gap-2 rounded-md transition-[transform,background-color,border-color,box-shadow] ease-out',
        centered
          ? 'items-center px-4 py-6 text-center hover:-translate-y-1 hover:bg-ivory-soft'
          : 'border border-line-soft bg-ivory-soft p-8 hover:-translate-y-1.5 hover:border-burgundy hover:shadow-md',
      )}
    >
      {centered ? (
        <span className="grid size-14 place-items-center rounded-full border border-line-soft bg-cream-deep text-burgundy transition-[background-color,color,transform] ease-out group-hover:scale-108 group-hover:bg-burgundy group-hover:text-on-dark">
          <Icon name={feature.icon} size={24} />
        </span>
      ) : (
        <span className="text-burgundy transition-transform ease-out group-hover:-translate-y-[3px] group-hover:scale-110">
          <Icon name={feature.icon} size={26} />
        </span>
      )}

      <h3 className={cn('text-lg', !centered && 'mt-2')}>{feature.title}</h3>
      <p className="text-base text-muted">{feature.body}</p>
    </Reveal>
  );
}
