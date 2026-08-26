import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import type { ReactNode } from 'react';

/** Page title bar shared by every admin screen. */
export default function AdminHeader({
  title,
  subtitle,
  action,
  backHref,
  backLabel,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line-soft pb-6">
      <div>
        {backHref && (
          <Link
            href={backHref}
            className="mb-2 inline-flex items-center gap-1 text-sm font-semibold text-muted transition-colors ease-out hover:text-burgundy"
          >
            <ChevronLeft size={16} aria-hidden="true" />
            {backLabel ?? 'Back'}
          </Link>
        )}
        <h1 className="text-2xl">{title}</h1>
        {subtitle && <p className="text-base text-muted">{subtitle}</p>}
      </div>
      {action}
    </header>
  );
}
