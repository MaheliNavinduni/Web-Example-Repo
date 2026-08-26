/**
 * VINT — glassware collection.
 *
 * Five individual glasses, sold singly rather than as sets. Prices are per
 * glass, in Rupees, matching the wine pricing.
 */

import type { GlasswareItem, GlasswareQuality } from '@/types';


export const glassware: GlasswareItem[] = [
  {
    id: 'g-001',
    slug: 'ribbed-wine-glass',
    name: 'Ribbed Wine Glass',
    category: 'Wine Glass',
    price: 650,
    image: '/images/glasses/ribbed-wine-glass.jpg',
    imageAlt: 'A ribbed VINT wine glass with vertical fluting along the bowl',
    description:
      'Elegant glass with vertical ridges, designed to add a stylish and textured look.',
  },
  {
    id: 'g-002',
    slug: 'burgundy-wine-glass',
    name: 'Burgundy Wine Glass',
    category: 'Wine Glass',
    price: 600,
    image: '/images/glasses/burgundy-wine-glass.jpg',
    imageAlt: 'A VINT burgundy wine glass with a large rounded bowl',
    description:
      'Large, rounded bowl that gives red wine plenty of space to breathe and helps enhance its aroma.',
  },
  {
    id: 'g-003',
    slug: 'coupe-glass',
    name: 'Coupe Wine Glass',
    category: 'Wine Glass',
    price: 650,
    image: '/images/glasses/coupe-glass.jpg',
    imageAlt: 'A VINT coupe glass with a wide, shallow fluted bowl',
    description:
      'Wide, shallow bowl with a short profile, traditionally used for champagne and sparkling wines.',
  },
  {
    id: 'g-004',
    slug: 'white-wine-glass',
    name: 'White Wine Glass',
    category: 'Wine Glass',
    price: 600,
    image: '/images/glasses/white-wine-glass.jpg',
    imageAlt: 'A tall VINT white wine glass with a narrow bowl',
    description:
      "Tall, narrow bowl designed to preserve the wine's aroma and keep white wine cool.",
  },
  {
    id: 'g-005',
    slug: 'stemless-wine-glass',
    name: 'Stemless Wine Glass',
    category: 'Wine Glass',
    price: 500,
    image: '/images/glasses/stemless-wine-glass.jpg',
    imageAlt: 'A rounded stemless VINT wine glass',
    description:
      'Modern, rounded glass without a stem, offering a casual and comfortable way to enjoy wine.',
  },
];

/** The three "Uncompromising Quality" cards below the glassware grid. */
export const glasswareQualities: GlasswareQuality[] = [
  {
    id: 'q-001',
    icon: 'hand',
    title: 'Artisanal Craftsmanship',
    body: 'Each piece in the VINT collection is meticulously hand-blown by master glassmakers using traditional techniques passed down through generations. This ensures a seamless, ultra-thin rim that allows the wine to flow effortlessly across the palate, removing any barrier between you and the vintage.',
    featured: true,
  },
  {
    id: 'q-002',
    icon: 'wind',
    title: 'Engineered for Aroma',
    body: 'The precise geometry of each bowl is calibrated to capture and direct specific volatile compounds, amplifying the bouquet of fine wines.',
  },
  {
    id: 'q-003',
    icon: 'gem',
    title: 'Enduring Brilliance',
    body: 'Formulated with advanced lead-free crystal, offering extraordinary clarity while maintaining the durability required for dishwasher safety.',
  },
];

export function getGlasswareBySlug(slug: string): GlasswareItem | null {
  return glassware.find((item) => item.slug === slug) ?? null;
}
