import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata: Metadata = {
  title: {
    default: 'Admin',
    template: '%s | VINT Admin',
  },
  robots: { index: false, follow: false },
};

/**
 * Admin shell — dark sidebar, cream content area.
 *
 * There is no authentication in this project by design, so these screens are
 * the management frontend only. Access control belongs to the backend when it
 * is added.
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-dvh grid-cols-1 bg-cream min-[900px]:grid-cols-[260px_minmax(0,1fr)]">
      <AdminSidebar />
      <main className="min-w-0 p-[clamp(1.5rem,3vw,2.5rem)]">{children}</main>
    </div>
  );
}
