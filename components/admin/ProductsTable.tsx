'use client';

import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

import StatusBadge from '@/components/ui/StatusBadge';
import AdminThumb from '@/components/admin/AdminThumb';
import IconButton from '@/components/admin/IconButton';
import Panel from '@/components/admin/Panel';
import Modal from '@/components/ui/Modal';
import Toast from '@/components/ui/Toast';
import Button from '@/components/ui/Button';
import { formatPrice, products as seedProducts } from '@/data/products';
import type { Product } from '@/types';
import {
  ADMIN_ACTIONS,
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

/**
 * Product management table.
 *
 * Deleting removes the row from local state only — there is no backend yet, so
 * a refresh restores the seed data. Swap `rows` for server data when the API
 * lands.
 */
export default function ProductsTable() {
  const [rows, setRows] = useState<Product[]>(seedProducts);
  const [pendingDelete, setPendingDelete] = useState<Product | null>(null);
  const [toast, setToast] = useState('');

  function confirmDelete() {
    if (!pendingDelete) return;
    setRows((prev) => prev.filter((product) => product.id !== pendingDelete.id));
    setToast(`${pendingDelete.name} removed from the list.`);
    setPendingDelete(null);
  }

  return (
    <>
      <Panel>
        <div className={TABLE_WRAP}>
          <table className={TABLE}>
            <caption className="sr-only">
              All VINT wines with price, stock and availability
            </caption>
            <thead>
              <tr>
                <th scope="col" className={TH}>Product</th>
                <th scope="col" className={TH}>Type</th>
                <th scope="col" className={TH}>Price</th>
                <th scope="col" className={TH}>Stock</th>
                <th scope="col" className={TH}>Availability</th>
                <th scope="col" className={TH}>
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className={TBODY}>
              {rows.map((product) => (
                <tr key={product.id}>
                  <td className={TD}>
                    <div className="flex min-w-0 items-center gap-3">
                      <AdminThumb src={product.image} />
                      <div>
                        <span className={CELL_STRONG}>{product.name}</span>
                        <span className={CELL_MUTED}>
                          {product.volume} · {product.alcohol}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className={`${TD} text-muted`}>{product.type}</td>
                  <td className={`${TD} ${CELL_NUM}`}>{formatPrice(product.price)}</td>
                  <td className={`${TD} ${CELL_NUM}`}>{product.stock}</td>
                  <td className={TD}>
                    <StatusBadge status={product.stock > 0 ? 'Confirmed' : 'Cancelled'} />
                  </td>
                  <td className={TD}>
                    <div className={CELL_ACTIONS}>
                      <IconButton
                        href={`/admin/products/${product.id}/edit`}
                        aria-label={`Edit ${product.name}`}
                      >
                        <Pencil size={16} aria-hidden="true" />
                      </IconButton>
                      <IconButton
                        danger
                        aria-label={`Delete ${product.name}`}
                        onClick={() => setPendingDelete(product)}
                      >
                        <Trash2 size={16} aria-hidden="true" />
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
            <p>No products left in the list. Refresh to restore the sample data.</p>
          </div>
        )}
      </Panel>

      <Modal
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        title="Delete product"
      >
        <p className="text-muted">
          Remove <strong>{pendingDelete?.name}</strong> from the collection? Customers will no
          longer see it on the website.
        </p>
        <div className={`${ADMIN_ACTIONS} mt-8`}>
          <Button variant="outline" square size="sm" onClick={() => setPendingDelete(null)}>
            Cancel
          </Button>
          <Button variant="primary" square size="sm" onClick={confirmDelete}>
            Delete Product
          </Button>
        </div>
      </Modal>

      <Toast message={toast} onDismiss={() => setToast('')} />
    </>
  );
}
