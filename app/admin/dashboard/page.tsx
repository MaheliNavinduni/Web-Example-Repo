import type { Metadata } from 'next';
import Link from 'next/link';
import { Boxes, ClipboardList, Clock, Package } from 'lucide-react';

import AdminHeader from '@/components/admin/AdminHeader';
import AdminThumb from '@/components/admin/AdminThumb';
import Panel from '@/components/admin/Panel';
import StatCard from '@/components/admin/StatCard';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/Button';
import { formatPrice, products } from '@/data/products';
import { getOrderStats, orders } from '@/data/orders';
import { messages } from '@/data/messages';
import {
  CELL_MUTED,
  CELL_NUM,
  CELL_STRONG,
  TABLE,
  TABLE_WRAP,
  TBODY,
  TD,
  TH,
} from '@/components/admin/adminStyles';

export const metadata: Metadata = { title: 'Dashboard' };

const PANEL_LINK = 'text-sm font-semibold text-burgundy hover:underline';

export default function AdminDashboardPage() {
  const stats = getOrderStats();
  const bottlesInStock = products.reduce((sum, product) => sum + product.stock, 0);
  const recentOrders = orders.slice(0, 4);
  const unreadMessages = messages.filter((message) => message.status === 'New').length;

  return (
    <>
      <AdminHeader
        title="Dashboard"
        subtitle="A snapshot of the estate — orders, stock and customer messages."
        action={
          <Button href="/admin/products/new" variant="primary" size="sm" square>
            Add Product
          </Button>
        }
      />

      <div className="mb-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-6">
        <StatCard
          icon={<Package size={22} strokeWidth={1.6} />}
          label="Total Products"
          value={products.length}
          hint="Four wines in the collection"
        />
        <StatCard
          icon={<Clock size={22} strokeWidth={1.6} />}
          label="Pending Orders"
          value={stats.pending}
          hint="Awaiting confirmation"
        />
        <StatCard
          icon={<ClipboardList size={22} strokeWidth={1.6} />}
          label="Total Orders"
          value={stats.total}
          hint={`${stats.completed} completed`}
        />
        <StatCard
          icon={<Boxes size={22} strokeWidth={1.6} />}
          label="Bottles In Stock"
          value={bottlesInStock}
          hint="Across all four wines"
        />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Recent orders                                                    */}
      {/* ---------------------------------------------------------------- */}
      <Panel
        title="Recent Orders"
        action={
          <Link href="/admin/orders" className={PANEL_LINK}>
            View all orders
          </Link>
        }
      >
        <div className={TABLE_WRAP}>
          <table className={TABLE}>
            <thead>
              <tr>
                <th scope="col" className={TH}>Order ID</th>
                <th scope="col" className={TH}>Customer</th>
                <th scope="col" className={TH}>Product</th>
                <th scope="col" className={TH}>Qty</th>
                <th scope="col" className={TH}>Total</th>
                <th scope="col" className={TH}>Status</th>
              </tr>
            </thead>
            <tbody className={TBODY}>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className={TD}>
                    <Link href={`/admin/orders/${order.id}`} className={CELL_STRONG}>
                      {order.id}
                    </Link>
                  </td>
                  <td className={TD}>
                    {order.customer}
                    <span className={CELL_MUTED}>{order.date}</span>
                  </td>
                  <td className={TD}>{order.productName}</td>
                  <td className={`${TD} ${CELL_NUM}`}>{order.quantity}</td>
                  <td className={`${TD} ${CELL_NUM}`}>{formatPrice(order.total)}</td>
                  <td className={TD}>
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* ---------------------------------------------------------------- */}
      {/* Inventory overview                                               */}
      {/* ---------------------------------------------------------------- */}
      <Panel
        title="Inventory Overview"
        action={
          <Link href="/admin/products" className={PANEL_LINK}>
            Manage products
          </Link>
        }
      >
        <div className={TABLE_WRAP}>
          <table className={TABLE}>
            <thead>
              <tr>
                <th scope="col" className={TH}>Wine</th>
                <th scope="col" className={TH}>Type</th>
                <th scope="col" className={TH}>Price</th>
                <th scope="col" className={TH}>Stock</th>
                <th scope="col" className={TH}>Availability</th>
              </tr>
            </thead>
            <tbody className={TBODY}>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className={TD}>
                    <div className="flex min-w-0 items-center gap-3">
                      <AdminThumb src={product.image} />
                      <span className={CELL_STRONG}>{product.name}</span>
                    </div>
                  </td>
                  <td className={`${TD} text-muted`}>{product.type}</td>
                  <td className={`${TD} ${CELL_NUM}`}>{formatPrice(product.price)}</td>
                  <td className={`${TD} ${CELL_NUM}`}>{product.stock}</td>
                  <td className={TD}>
                    <StatusBadge status={product.stock > 0 ? 'Confirmed' : 'Cancelled'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {unreadMessages > 0 && (
        <Panel padded>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p>
              <strong>
                {unreadMessages} new customer {unreadMessages === 1 ? 'message' : 'messages'}
              </strong>{' '}
              waiting for a reply.
            </p>
            <Button href="/admin/messages" variant="outline" size="sm" square>
              Read Messages
            </Button>
          </div>
        </Panel>
      )}
    </>
  );
}
