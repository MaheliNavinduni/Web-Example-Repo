/**
 * VINT — shared domain types.
 *
 * Every shape that crosses a module boundary is declared once here, so a
 * component and the data module it reads from can never drift apart. When the
 * backend arrives these become the contract the API is checked against.
 */

/* ------------------------------------------------------------------ */
/* Catalogue                                                           */
/* ------------------------------------------------------------------ */

/** The four category pills on the Collection page, plus "all". */
export type WineCategorySlug =
  | 'all'
  | 'red-wine'
  | 'white-wine'
  | 'strawberry-wine'
  | 'king-coconut-wine';

/** A real wine category — every value except the "all" pill. */
export type WineTypeSlug = Exclude<WineCategorySlug, 'all'>;

export interface WineCategory {
  label: string;
  slug: WineCategorySlug;
}

/** The stock states a product can advertise on the site and in the admin. */
export type Availability = 'In Stock' | 'Low Stock' | 'Sold Out';

/** A food match shown on a wine detail page. */
export interface Pairing {
  name: string;
  image: string;
}

/** The four 0-100 attributes drawn as bars by <FlavourProfile>. */
export interface FlavourProfile {
  sweetness: number;
  acidity: number;
  body: number;
  fruitiness: number;
}

export type FlavourKey = keyof FlavourProfile;

export interface ServingTemperature {
  label: string;
  tempF: string;
  tempC: string;
}

export interface ServingSuggestions {
  foodPairings: string;
  temperature: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  type: string;
  typeSlug: WineTypeSlug;
  price: number;
  volume: string;
  alcohol: string;
  vintage: string;
  origin: string;
  stock: number;
  availability: Availability;
  featured: boolean;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string;
  flavour: FlavourProfile;
  serving: ServingTemperature;
  ingredients: string;
  servingSuggestions: ServingSuggestions;
  pairings: Pairing[];
}

export interface GlasswareItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  imageAlt: string;
  description: string;
}

export interface GlasswareQuality {
  id: string;
  icon: IconName;
  title: string;
  body: string;
  featured?: boolean;
}

/* ------------------------------------------------------------------ */
/* Ordering                                                            */
/* ------------------------------------------------------------------ */

export type OrderableGroup = 'Wines' | 'Glassware';

/** Wines and glassware flattened into the one shape the order form needs. */
export interface OrderableItem {
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  imageAlt: string;
  group: OrderableGroup;
  maxQuantity: number;
}

export interface OrderableGrouping {
  group: OrderableGroup;
  items: OrderableItem[];
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Preparing' | 'Completed' | 'Cancelled';

export interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  productSlug: string;
  productName: string;
  productType: string;
  quantity: number;
  unitPrice: number;
  total: number;
  date: string;
  status: OrderStatus;
  notes: string;
}

export interface OrderStats {
  total: number;
  pending: number;
  completed: number;
  revenue: number;
}

/**
 * The order handed from the order form to the confirmation page through
 * sessionStorage. Narrower than {@link Order} — it is what the customer just
 * submitted, not a stored record.
 */
export interface PlacedOrder {
  reference: string;
  productName: string;
  productCategory: string;
  productImage: string;
  quantity: number;
  total: number;
  customer: string;
  phone: string;
  email: string;
  placedAt: string;
}

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export type MessageStatus = 'New' | 'Read';

export type ContactSubject = 'General Inquiry' | 'Product Inquiry' | 'Order Inquiry';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: ContactSubject;
  date: string;
  status: MessageStatus;
  body: string;
}

/* ------------------------------------------------------------------ */
/* Site content                                                        */
/* ------------------------------------------------------------------ */

/** Keys accepted by <Icon>. Keeps content data and the icon map in step. */
export type IconName =
  | 'award'
  | 'heart'
  | 'glass'
  | 'truck'
  | 'droplet'
  | 'tractor'
  | 'hand'
  | 'wind'
  | 'gem';

export type SocialIconName = 'facebook' | 'instagram' | 'tiktok';

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink extends NavLink {
  icon: SocialIconName;
}

/** A titled card with an icon — value props, craftsmanship steps. */
export interface FeatureCard {
  icon: IconName;
  title: string;
  body: string;
}

export interface SiteAddress {
  line1: string;
  line2: string;
  full: string;
  locality: string;
  country: string;
  coordinates: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  established: string;
  email: string;
  address: SiteAddress;
}
