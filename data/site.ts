/**
 * VINT — site-wide content: navigation, contact details, footer.
 * Change it here once and every page picks it up.
 */

import type {
  ContactSubject,
  FeatureCard,
  NavLink,
  SiteConfig,
  SocialLink,
} from '@/types';


export const SITE: SiteConfig = {
  name: 'VINT',
  tagline: 'Crafted with passion. A taste worth sharing.',
  established: '2020',
  email: 'vintwine@gmail.com',
  /**
   * The estate address. `line1` and `line2` exist only so address blocks can
   * break across two lines; `full` is the single canonical string and is what
   * the map looks up, so the two can never drift apart. `locality` is for
   * running prose, where a full street address would read badly.
   */
  address: {
    line1: 'D/47, 500 Housing Scheme Road, Kiriwandala',
    line2: 'Puwakpitiya, Avissawella',
    full: 'D/47, 500 Housing Scheme Road, Kiriwandala, Puwakpitiya, Avissawella',
    locality: 'Puwakpitiya, Avissawella',
    country: 'Sri Lanka',
    /**
     * Exact position of the estate, as "latitude,longitude".
     *
     * Google cannot geocode a house number inside a housing scheme here, so
     * searching for the written address returns the general area with no
     * marker. Coordinates drop the pin on the spot.
     *
     * Supplied as 6°56'25.1"N 80°11'23.8"E and converted to decimal degrees.
     * To change it: open Google Maps, right-click the exact spot, and click
     * the latitude/longitude at the top of the menu to copy it.
     */
    coordinates: '6.940306,80.189944',
  },
};

/** Main navigation — used by both the desktop navbar and the mobile menu. */
export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Collection', href: '/collection' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Contact Us', href: '/contact' },
];

export const FOOTER_LINKS: NavLink[] = [
  { label: 'Collection', href: '/collection' },
  { label: 'Wine Glasses', href: '/wine-glasses' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Contact Us', href: '/contact' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'TikTok', href: 'https://tiktok.com', icon: 'tiktok' },
];

/** Subject options offered by the Contact form. */
export const CONTACT_SUBJECTS = [
  'General Inquiry',
  'Product Inquiry',
  'Order Inquiry',
] as const satisfies readonly ContactSubject[];

/** "Why Choose VINT" — Home page. */
export const VALUE_PROPS: FeatureCard[] = [
  {
    icon: 'award',
    title: 'Premium Quality',
    body: 'Sourced from the finest local produce, ensuring every pour is exceptional.',
  },
  {
    icon: 'heart',
    title: 'Crafted With Passion',
    body: 'Generations of expertise poured into every bottle we make by hand.',
  },
  {
    icon: 'glass',
    title: 'Elegant Experience',
    body: 'Designed to elevate your dining, your gatherings and your celebrations.',
  },
  {
    icon: 'truck',
    title: 'Trusted Service',
    body: 'Secure packaging and reliable delivery, confirmed personally by our team.',
  },
];

/** "Unrivaled Craftsmanship" — Our Story page. */
export const CRAFTSMANSHIP: FeatureCard[] = [
  {
    icon: 'droplet',
    title: 'The Harvest',
    body: 'Hand-picked at the precise moment of ripeness, ensuring the delicate balance of acidity and sugar that defines every VINT bottle.',
  },
  {
    icon: 'tractor',
    title: 'The Soil',
    body: 'Our island earth provides the perfect foundation, offering profound minerality and structure to every batch we press.',
  },
  {
    icon: 'glass',
    title: 'The Cellar',
    body: 'Crafted and carefully matured in Sri Lanka, our wines develop a pleasant aroma, smooth taste, and unique character in every bottle.',
  },
];
