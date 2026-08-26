import type { MessageStatus, OrderStatus } from '@/types';

import { cn } from '@/lib/cn';

export type BadgeStatus = OrderStatus | MessageStatus;

/** One colour pair per status the admin screens can show. */
const STATUS_STYLES: Record<BadgeStatus, string> = {
  Pending: 'bg-warning-soft text-warning',
  Confirmed: 'bg-info-soft text-info',
  Preparing: 'bg-[#efe6f2] text-[#5c3a6e]',
  Completed: 'bg-success-soft text-success',
  Cancelled: 'bg-danger-soft text-danger',
  New: 'bg-danger-soft text-danger',
  Read: 'bg-warm-gray text-muted',
};

/** Coloured pill for order and message statuses. */
export default function StatusBadge({ status }: { status: BadgeStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-3 py-[0.3rem]',
        'text-xs font-bold tracking-[0.04em] whitespace-nowrap',
        STATUS_STYLES[status],
      )}
    >
      {status}
    </span>
  );
}
