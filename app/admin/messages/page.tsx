import type { Metadata } from 'next';

import AdminHeader from '@/components/admin/AdminHeader';
import MessagesTable from '@/components/admin/MessagesTable';
import { messages } from '@/data/messages';

export const metadata: Metadata = { title: 'Customer Messages' };

export default function AdminMessagesPage() {
  const unread = messages.filter((message) => message.status === 'New').length;

  return (
    <>
      <AdminHeader
        title="Customer Messages"
        subtitle={`${messages.length} messages received · ${unread} unread.`}
      />

      <MessagesTable />
    </>
  );
}
