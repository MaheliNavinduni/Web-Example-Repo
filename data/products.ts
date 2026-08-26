/**
 * VINT — central product data source.
 *
 * Every page (Home, Collection, Product Details, Order, Admin) reads from this
 * file. Nothing about a wine should ever be typed into a component directly.
 *
 * NOTE ON CATEGORIES
 * The Figma screens disagreed with each other about which wine belonged to which
 * category. The mapping below follows the *ingredients* text on each detail
 * screen, which lines the four wines up exactly with the four category pills:
 *   - Heritage Red  -> made with fresh strawberries -> Strawberry Wine
 *   - Classic Blanc -> made from white grapes       -> White Wine
 *   - Estate Grape  -> made from red grapes         -> Red Wine
 *   - Island King   -> made from king coconut water -> King Coconut Wine
 * If the business disagrees, change `type`/`typeSlug` here and the whole site
 * (filters, badges, admin tables) follows automatically.
 */

import type {
  FlavourKey,
  Pairing,
  Product,
  WineCategory,
  WineCategorySlug,
  WineTypeSlug,
} from '@/types';


export const CURRENCY = 'Rs.';

/** Category pills used by the Collection page filter bar. */
/**
 * The four real categories, as a tuple. The Collection filter adds "All" on
 * top of these; the admin product form and its schema use them as-is, so a new
 * category only has to be added in one place.
 */
export const WINE_TYPE_SLUGS = [
  'red-wine',
  'white-wine',
  'strawberry-wine',
  'king-coconut-wine',
] as const satisfies readonly WineTypeSlug[];

export const WINE_CATEGORIES: WineCategory[] = [
  { label: 'All', slug: 'all' },
  { label: 'Red Wine', slug: 'red-wine' },
  { label: 'White Wine', slug: 'white-wine' },
  { label: 'Strawberry Wine', slug: 'strawberry-wine' },
  { label: 'King Coconut Wine', slug: 'king-coconut-wine' },
];

/**
 * The four pairings shown on every wine page. The estate serves the same
 * accompaniments across the range, so this is one shared list rather than a
 * per-wine selection.
 */
const PAIRINGS: Pairing[] = [
  { name: 'Perfectly Cooked Steak', image: '/images/pairings/steak.jpg' },
  { name: 'Roast Chicken', image: '/images/pairings/roast-chicken.jpg' },
  { name: 'Dark Chocolate', image: '/images/pairings/dark-chocolate.jpg' },
  { name: 'Aged Gouda', image: '/images/pairings/aged-gouda.jpg' },
];

export const products: Product[] = [
  {
    id: 'w-001',
    slug: 'heritage-red',
    name: 'Heritage Red',
    type: 'Strawberry Wine',
    typeSlug: 'strawberry-wine',
    price: 3500,
    volume: '750ml',
    alcohol: '12.5%',
    vintage: '2023',
    origin: 'Avissawella, Sri Lanka',
    stock: 24,
    availability: 'In Stock',
    featured: true,
    image: '/images/wines/heritage-red.png',
    imageAlt: 'VINT Heritage Red bottle with a black and gold label',
    tagline: 'Rich strawberry notes with a smooth, refreshing finish.',
    description:
      'Rich strawberry notes with a smooth and refreshing finish. An elegant expression of our finest fruit, pressed at the peak of the season.',
    flavour: { sweetness: 55, acidity: 40, body: 90, fruitiness: 88 },
    serving: { label: 'Slightly Chilled', tempF: '60-65°F', tempC: '15-18°C' },
    ingredients:
      'Made with fresh strawberries, sugar, water, and yeast. Strawberry wine is a fruit-based wine enjoyed around the world, inspired by traditional fruit-winemaking practices carried through generations of home cellars.',
    servingSuggestions: {
      foodPairings:
        'Beautiful alongside desserts and soft cheeses. Ideal with berry tarts, dark chocolate, or a simple plate of fresh fruit after dinner.',
      temperature:
        'Serve at 60-65°F (15-18°C). Give it a short rest after opening to let the fruit come forward.',
    },
    pairings: PAIRINGS,
  },
  {
    id: 'w-002',
    slug: 'classic-blanc',
    name: 'Classic Blanc',
    type: 'White Wine',
    typeSlug: 'white-wine',
    price: 3000,
    volume: '750ml',
    alcohol: '11.5%',
    vintage: '2023',
    origin: 'Avissawella, Sri Lanka',
    stock: 18,
    availability: 'In Stock',
    featured: true,
    image: '/images/wines/classic-blanc.png',
    imageAlt: 'VINT Classic Blanc white wine bottle with a cream label',
    tagline: 'Bright and aromatic, with zesty citrus and white floral notes.',
    description:
      'Bright and aromatic with zesty citrus and delicate white floral aromas. A crisp, mineral-driven palate that refreshes the soul.',
    flavour: { sweetness: 55, acidity: 40, body: 90, fruitiness: 88 },
    serving: { label: 'Slightly Chilled', tempF: '60-65°F', tempC: '15-18°C' },
    ingredients:
      'Made from white grapes, sugar, water, and yeast. White wine has a long history in European winemaking regions, especially France, Italy, and Germany, and remains the most food-friendly style in any cellar.',
    servingSuggestions: {
      foodPairings:
        'A natural match for lighter dishes. Excellent with grilled seafood, roast chicken, fresh salads, or young, creamy cheeses.',
      temperature:
        'Serve at 60-65°F (15-18°C). No decanting needed — this wine is at its best shortly after it is poured.',
    },
    pairings: PAIRINGS,
  },
  {
    id: 'w-003',
    slug: 'estate-grape',
    name: 'Estate Grape',
    type: 'Red Wine',
    typeSlug: 'red-wine',
    price: 3500,
    volume: '750ml',
    alcohol: '13.0%',
    vintage: '2022',
    origin: 'Avissawella, Sri Lanka',
    stock: 31,
    availability: 'In Stock',
    featured: true,
    image: '/images/wines/estate-grape.png',
    imageAlt: 'VINT Estate Grape wine bottle with a deep plum label',
    tagline: 'Deep crimson, with dark cherry, cedar and a velvety finish.',
    description:
      'Deep crimson with profound layers of dark cherry, cedar, and subtle spice. A robust and velvety finish that rewards a slow evening.',
    flavour: { sweetness: 55, acidity: 40, body: 90, fruitiness: 88 },
    serving: { label: 'Slightly Chilled', tempF: '60-65°F', tempC: '15-18°C' },
    ingredients:
      'Made from red grapes, sugar, water, and yeast. Red wine has its origins in ancient winemaking traditions, particularly in European regions such as France, Italy, and Spain, where skin contact gives the wine its colour and structure.',
    servingSuggestions: {
      foodPairings:
        'Perfectly complements rich, savoury dishes. Ideal with roasted lamb, aged gouda, grilled steak, or dark chocolate desserts.',
      temperature:
        'Serve at 60-65°F (15-18°C). Decant for at least 30 minutes before serving to allow the complex aromas to open fully.',
    },
    pairings: PAIRINGS,
  },
  {
    id: 'w-004',
    slug: 'island-king',
    name: 'Island King',
    type: 'King Coconut Wine',
    typeSlug: 'king-coconut-wine',
    price: 2500,
    volume: '750ml',
    alcohol: '10.5%',
    vintage: '2023',
    origin: 'Avissawella, Sri Lanka',
    stock: 12,
    availability: 'In Stock',
    featured: true,
    image: '/images/wines/island-king.png',
    imageAlt: 'VINT Island King coconut wine bottle with a golden hue',
    tagline: 'A tropical expression — crisp, lightly sweet, unmistakably Sri Lankan.',
    description:
      'A unique tropical expression. Crisp and lightly sweet with vibrant notes of fresh king coconut and a clean, cooling finish.',
    flavour: { sweetness: 55, acidity: 40, body: 90, fruitiness: 88 },
    serving: { label: 'Slightly Chilled', tempF: '60-65°F', tempC: '15-18°C' },
    ingredients:
      'Made from Sri Lankan king coconut water, sugar, and yeast. King coconut wine is inspired by the tropical heritage of Sri Lanka and offers a naturally refreshing and fruity character unique to the island.',
    servingSuggestions: {
      foodPairings:
        'Made for island food. Try it with spiced curries, grilled seafood, tropical fruit, or simply on its own over ice on a warm evening.',
      temperature:
        'Serve at 60-65°F (15-18°C). Best enjoyed within a day of opening while the aromatics are at their brightest.',
    },
    pairings: PAIRINGS,
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function getProductBySlug(slug: string): Product | null {
  return products.find((product) => product.slug === slug) ?? null;
}

export function getFeaturedProducts(limit = 3): Product[] {
  return products.filter((product) => product.featured).slice(0, limit);
}

export function getProductsByCategory(categorySlug: WineCategorySlug): Product[] {
  if (!categorySlug || categorySlug === 'all') return products;
  return products.filter((product) => product.typeSlug === categorySlug);
}

/** Formats 2800 as "Rs. 2,800". */
export function formatPrice(value: number): string {
  return `${CURRENCY} ${Number(value).toLocaleString('en-LK')}`;
}

/**
 * Turns a 0-100 flavour value into the word shown beside the bar.
 *
 * Body uses the proper wine vocabulary (Light through Full) rather than the
 * Low/High scale the other three attributes use — "Full body" is the term the
 * designs use and the one a wine drinker expects.
 */
const INTENSITY_SCALE: string[] = ['Low', 'Medium-Low', 'Medium', 'Medium-High', 'High'];
const BODY_SCALE: string[] = ['Light', 'Medium-Light', 'Medium', 'Medium-Full', 'Full'];

function band(value: number): number {
  if (value >= 80) return 4;
  if (value >= 62) return 3;
  if (value >= 45) return 2;
  if (value >= 28) return 1;
  return 0;
}

export function flavourLabel(key: FlavourKey, value: number): string {
  const scale = key === 'body' ? BODY_SCALE : INTENSITY_SCALE;
  return scale[band(value)];
}
