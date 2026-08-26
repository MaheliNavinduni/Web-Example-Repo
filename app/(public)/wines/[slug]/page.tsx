import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProductDetails from '@/components/wine/ProductDetails';
import { getProductBySlug, products } from '@/data/products';

/** The shape Next.js hands a dynamic route in the App Router. */
type RouteProps = { params: Promise<{ slug: string }> };

/** Pre-renders /wines/heritage-red, /wines/classic-blanc, and so on at build time. */
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: 'Wine not found' };
  }

  return {
    title: `${product.name} — ${product.type}`,
    description: product.description,
    openGraph: {
      title: `${product.name} | VINT`,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function WineDetailPage({ params }: RouteProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return <ProductDetails product={product} />;
}
