'use client';

import { useState } from 'react';
import { Eye } from 'lucide-react';

import StatusBadge from '@/components/ui/StatusBadge';
import DescriptionList from '@/components/admin/DescriptionList';
import IconButton from '@/components/admin/IconButton';
import Panel from '@/components/admin/Panel';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { messages as seedMessages } from '@/data/messages';
import type { ContactMessage } from '@/types';
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
 * Contact Us submissions.
 * Opening a message marks it Read in local state — wire this to the backend
 * when one exists.
 */
export default function MessagesTable() {
  const [rows, setRows] = useState<ContactMessage[]>(seedMessages);
  const [selected, setSelected] = useState<ContactMessage | null>(null);

  function open(message: ContactMessage) {
    setSelected(message);
    setRows((prev) =>
      prev.map((entry) => (entry.id === message.id ? { ...entry, status: 'Read' } : entry)),
    );
  }

  return (
    <>
      <Panel>
        <div className={TABLE_WRAP}>
          <table className={TABLE}>
            <caption className="sr-only">Messages submitted through Contact Us</caption>
            <thead>
              <tr>
                <th scope="col" className={TH}>Customer</th>
                <th scope="col" className={TH}>Subject</th>
                <th scope="col" className={TH}>Date</th>
                <th scope="col" className={TH}>Status</th>
                <th scope="col" className={TH}>
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className={TBODY}>
              {rows.map((message) => (
                <tr key={message.id}>
                  <td className={TD}>
                    <span className={CELL_STRONG}>{message.name}</span>
                    <span className={CELL_MUTED}>{message.email}</span>
                  </td>
                  <td className={TD}>{message.subject}</td>
                  <td className={`${TD} ${CELL_NUM} text-muted`}>{message.date}</td>
                  <td className={TD}>
                    <StatusBadge status={message.status} />
                  </td>
                  <td className={TD}>
                    <div className={CELL_ACTIONS}>
                      <IconButton
                        onClick={() => open(message)}
                        aria-label={`Read message from ${message.name}`}
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
      </Panel>

      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected ? `${selected.subject} — ${selected.name}` : ''}
      >
        {selected && (
          <>
            <DescriptionList
              className="mb-6"
              rows={[
                { term: 'From', value: selected.name },
                {
                  term: 'Email',
                  value: (
                    <a href={`mailto:${selected.email}`} className="text-burgundy underline">
                      {selected.email}
                    </a>
                  ),
                },
                { term: 'Phone', value: selected.phone },
                { term: 'Received', value: selected.date },
              ]}
            />

            <p className="rounded-sm bg-cream-deep p-6 text-body">{selected.body}</p>

            <div className={`${ADMIN_ACTIONS} mt-8`}>
              <Button variant="outline" square size="sm" onClick={() => setSelected(null)}>
                Close
              </Button>
              <Button
                href={`mailto:${selected.email}?subject=${encodeURIComponent(`Re: ${selected.subject}`)}`}
                variant="primary"
                square
                size="sm"
              >
                Reply by Email
              </Button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
