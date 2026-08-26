import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import AdminHeader from '@/components/admin/AdminHeader';
import ProductForm from '@/components/admin/ProductForm';
import { products } from '@/data/products';

type RouteProps = { params: Promise<{ id: string }> };

export const metadata: Metadata = { title: 'Edit Product' };

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default async function AdminEditProductPage({ params }: RouteProps) {
  const { id } = await params;
  const product = products.find((entry) => entry.id === id);

  if (!product) notFound();

  return (
    <>
      <AdminHeader
        title={`Edit ${product.name}`}
        subtitle={`${product.type} · ${product.volume}`}
        backHref="/admin/products"
        backLabel="Back to products"
      />

      <ProductForm product={product} />
    </>
  );
}
