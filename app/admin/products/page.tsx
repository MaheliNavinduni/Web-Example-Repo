import type { Metadata } from 'next';
import { Plus } from 'lucide-react';

import AdminHeader from '@/components/admin/AdminHeader';
import ProductsTable from '@/components/admin/ProductsTable';
import Button from '@/components/ui/Button';
import { products } from '@/data/products';

export const metadata: Metadata = { title: 'Products' };

export default function AdminProductsPage() {
  return (
    <>
      <AdminHeader
        title="Product Management"
        subtitle={`${products.length} wines currently in the collection.`}
        action={
          <Button
            href="/admin/products/new"
            variant="primary"
            size="sm"
            square
            icon={<Plus size={15} />}
          >
            Add Product
          </Button>
        }
      />

      <ProductsTable />
    </>
  );
}
