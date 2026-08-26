import { redirect } from 'next/navigation';

/** /admin is just an entry point — send it straight to the dashboard. */
export default function AdminIndexPage() {
  redirect('/admin/dashboard');
}
