'use client';

import { useMemo, useState } from 'react';
import { Eye } from 'lucide-react';

import StatusBadge from '@/components/ui/StatusBadge';
import FilterPills from '@/components/ui/FilterPills';
import IconButton from '@/components/admin/IconButton';
import Panel from '@/components/admin/Panel';
import { formatPrice } from '@/data/products';
import { ORDER_STATUSES, orders } from '@/data/orders';
import type { OrderStatus } from '@/types';
import {
  CELL_ACTIONS,
  CELL_MUTED,
  CELL_NUM,
  CELL_STRONG,
  TABLE,
  TABLE_WRAP,
  TBODY,
  TD,
  TH,
} from '@/components/admin/adminStyles';

type OrderFilter = 'All' | OrderStatus;

const FILTERS = (['All', ...ORDER_STATUSES] as OrderFilter[]).map((value) => ({
  value,
  label: value,
}));

export default function OrdersTable() {
  const [filter, setFilter] = useState<OrderFilter>('All');

  const rows = useMemo(
    () => (filter === 'All' ? orders : orders.filter((order) => order.status === filter)),
    [filter],
  );

  return (
    <>
      <FilterPills
        label="Filter orders by status"
        options={FILTERS}
        active={filter}
        onChange={setFilter}
      />

      <Panel>
        <div className={TABLE_WRAP}>
          <table className={TABLE}>
            <caption className="sr-only">Customer orders</caption>
            <thead>
              <tr>
                <th scope="col" className={TH}>Order ID</th>
                <th scope="col" className={TH}>Customer</th>
                <th scope="col" className={TH}>Product</th>
                <th scope="col" className={TH}>Qty</th>
                <th scope="col" className={TH}>Date</th>
                <th scope="col" className={TH}>Total</th>
                <th scope="col" className={TH}>Status</th>
                <th scope="col" className={TH}>
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className={TBODY}>
              {rows.map((order) => (
                <tr key={order.id}>
                  <td className={`${TD} ${CELL_STRONG}`}>{order.id}</td>
                  <td className={TD}>
                    {order.customer}
                    <span className={CELL_MUTED}>{order.phone}</span>
                  </td>
                  <td className={TD}>
                    {order.productName}
                    <span className={CELL_MUTED}>{order.productType}</span>
                  </td>
                  <td className={`${TD} ${CELL_NUM}`}>{order.quantity}</td>
                  <td className={`${TD} ${CELL_NUM} text-muted`}>{order.date}</td>
                  <td className={`${TD} ${CELL_NUM}`}>{formatPrice(order.total)}</td>
                  <td className={TD}>
                    <StatusBadge status={order.status} />
                  </td>
                  <td className={TD}>
                    <div className={CELL_ACTIONS}>
                      <IconButton
                        href={`/admin/orders/${order.id}`}
                        aria-label={`View order ${order.id}`}
                      >
                        <Eye size={16} aria-hidden="true" />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {rows.length === 0 && (
          <div className="px-6 py-24 text-center text-muted">
            <p>No {filter.toLowerCase()} orders right now.</p>
          </div>
        )}
      </Panel>
    </>
  );
}
