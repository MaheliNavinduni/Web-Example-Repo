/**
 * Everything a customer can order, wines and glassware together, in one shape.
 * The order form and order summary both read from here so they can never
 * disagree about a price or a name.
 */

import type { OrderableGroup, OrderableGrouping, OrderableItem } from '@/types';
import { products } from '@/data/products';
import { glassware } from '@/data/glassware';

export const orderableItems: OrderableItem[] = [
  ...products.map((product): OrderableItem => ({
    slug: product.slug,
    name: product.name,
    category: product.type,
    price: product.price,
    image: product.image,
    imageAlt: product.imageAlt,
    group: 'Wines',
    maxQuantity: Math.max(1, product.stock),
  })),
  ...glassware.map((item): OrderableItem => ({
    slug: item.slug,
    name: item.name,
    category: item.category,
    price: item.price,
    image: item.image,
    imageAlt: item.imageAlt,
    group: 'Glassware',
    maxQuantity: 20,
  })),
];

export function getOrderableItem(slug: string | null): OrderableItem | null {
  return orderableItems.find((item) => item.slug === slug) ?? null;
}

/** Groups items for an <optgroup>-style select. */
export function getOrderableGroups(): OrderableGrouping[] {
  return (['Wines', 'Glassware'] as const).map<OrderableGrouping>((group: OrderableGroup) => ({
    group,
    items: orderableItems.filter((item) => item.group === group),
  }));
}
