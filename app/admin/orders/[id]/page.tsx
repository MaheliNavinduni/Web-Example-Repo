import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import AdminHeader from '@/components/admin/AdminHeader';
import AdminThumb from '@/components/admin/AdminThumb';
import DescriptionList from '@/components/admin/DescriptionList';
import OrderStatusControl from '@/components/admin/OrderStatusControl';
import Panel from '@/components/admin/Panel';
import { getOrderById, orders } from '@/data/orders';
import { formatPrice, getProductBySlug } from '@/data/products';

type RouteProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return orders.map((order) => ({ id: order.id }));
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { id } = await params;
  return { title: `Order ${id}` };
}

const LINK = 'text-burgundy hover:underline';

export default async function AdminOrderDetailPage({ params }: RouteProps) {
  const { id } = await params;
  const order = getOrderById(id);

  if (!order) notFound();

  const product = getProductBySlug(order.productSlug);

  return (
    <>
      <AdminHeader
        title={`Order ${order.id}`}
        subtitle={`Placed on ${order.date}`}
        backHref="/admin/orders"
        backLabel="Back to orders"
      />

      <div className="grid grid-cols-1 items-start gap-8 min-[1000px]:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
        <div>
          {/* ---------- Customer ---------- */}
          <Panel title="Customer" padded>
            <DescriptionList
              rows={[
                { term: 'Name', value: order.customer },
                {
                  term: 'Email',
                  value: (
                    <a href={`mailto:${order.email}`} className={LINK}>
                      {order.email}
                    </a>
                  ),
                },
                {
                  term: 'Phone',
                  value: (
                    <a href={`tel:${order.phone.replace(/\s/g, '')}`} className={LINK}>
                      {order.phone}
                    </a>
                  ),
                },
                { term: 'Delivery Address', value: order.address },
              ]}
            />
          </Panel>

          {/* ---------- Items ---------- */}
          <Panel title="Order" padded>
            <div className="mb-6 flex items-center gap-6 border-b border-line-soft pb-6">
              {product && <AdminThumb src={product.image} size="lg" />}
              <div>
                <p className="font-serif text-lg leading-snug font-bold text-burgundy">
                  {order.productName}
                </p>
                <span className="text-sm text-muted">{order.productType}</span>
              </div>
            </div>

            <DescriptionList
              rows={[
                { term: 'Unit Price', value: formatPrice(order.unitPrice) },
                { term: 'Quantity', value: order.quantity },
                {
                  term: 'Total',
                  value: <span className="font-bold text-burgundy">{formatPrice(order.total)}</span>,
                },
                {
                  term: 'Order Notes',
                  value: order.notes || <span className="text-sm text-muted">No notes</span>,
                },
              ]}
            />
          </Panel>
        </div>

        <OrderStatusControl orderId={order.id} initialStatus={order.status} />
      </div>
    </>
  );
}
