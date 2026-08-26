'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';

import SelectInput from '@/components/fields/SelectInput';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/Button';
import Toast from '@/components/ui/Toast';
import Panel from '@/components/admin/Panel';
import { ORDER_STATUSES } from '@/data/orders';
import type { OrderStatus } from '@/types';

/**
 * Lets an admin move an order through its lifecycle.
 *
 * `status` is what the order currently is and `draft` is what the select shows,
 * which is what lets Save stay disabled until something has actually changed.
 * Local state only until the backend exists.
 */
export default function OrderStatusControl({
  orderId,
  initialStatus,
}: {
  orderId: string;
  initialStatus: OrderStatus;
}) {
  const [status, setStatus] = useState<OrderStatus>(initialStatus);
  const [draft, setDraft] = useState<OrderStatus>(initialStatus);
  const [toast, setToast] = useState('');

  function save() {
    setStatus(draft);
    setToast(`${orderId} marked as ${draft}.`);
  }

  return (
    <>
      <Panel title="Order Status" action={<StatusBadge status={status} />} padded>
        <SelectInput
          label="Update Status"
          value={draft}
          onChange={(event) => setDraft(event.target.value as OrderStatus)}
          options={ORDER_STATUSES.map((option) => ({ value: option, label: option }))}
        />

        <div className="mt-6">
          <Button
            variant="primary"
            square
            block
            size="sm"
            onClick={save}
            disabled={draft === status}
            icon={<Save size={15} />}
          >
            Save Status
          </Button>
        </div>
      </Panel>

      <Toast message={toast} onDismiss={() => setToast('')} />
    </>
  );
}
