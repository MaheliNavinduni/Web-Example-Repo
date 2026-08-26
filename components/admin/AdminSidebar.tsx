'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  MessageSquare,
  Package,
  ClipboardList,
  ExternalLink,
  type LucideIcon,
} from 'lucide-react';

import { SITE } from '@/data/site';
import VintMark from '@/components/layout/VintMark';
import { cn } from '@/lib/cn';

const LINKS: { label: string; href: string; icon: LucideIcon }[] = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ClipboardList },
  { label: 'Customer Messages', href: '/admin/messages', icon: MessageSquare },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    // Below 900px the sidebar stops being a column and becomes a horizontal
    // scrolling strip above the content, so the admin screens stay usable on a
    // phone without a second navigation pattern.
    <aside
      className={cn(
        'flex gap-4 overflow-x-auto bg-ink px-6 py-4 text-on-dark',
        'min-[900px]:sticky min-[900px]:top-0 min-[900px]:h-dvh min-[900px]:flex-col',
        'min-[900px]:gap-8 min-[900px]:px-6 min-[900px]:py-8',
      )}
    >
      <div className="flex shrink-0 items-center gap-2 min-[900px]:border-b min-[900px]:border-on-dark/14 min-[900px]:pb-6">
        <span
          className="grid size-9.5 shrink-0 place-items-center overflow-hidden rounded-full"
          aria-hidden="true"
        >
          <VintMark size={38} />
        </span>
        <div>
          <span className="font-serif text-2xl leading-none font-bold tracking-[0.06em]">
            {SITE.name}
          </span>
          <span className="block text-xs tracking-wider uppercase text-on-dark/50">
            Estate Admin
          </span>
        </div>
      </div>

      <nav
        className="flex flex-1 flex-row gap-1 min-[900px]:flex-col"
        aria-label="Admin navigation"
      >
        {LINKS.map(({ label, href, icon: LinkIcon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2 rounded-sm px-3 py-2 text-base font-semibold whitespace-nowrap',
                'border-b-2 transition-[background-color,color,border-color] ease-out',
                'min-[900px]:border-b-0 min-[900px]:border-l-2',
                // Same specificity note as the collection filter pills: hover
                // must not wash out the active link's burgundy highlight, so
                // the two states are mutually exclusive rather than layered.
                active
                  ? 'border-b-gold bg-burgundy text-on-dark min-[900px]:border-l-gold'
                  : 'border-b-transparent text-on-dark/68 hover:bg-on-dark/7 hover:text-on-dark min-[900px]:border-l-transparent',
              )}
              aria-current={active ? 'page' : undefined}
            >
              <LinkIcon size={18} strokeWidth={1.6} aria-hidden="true" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="hidden border-t border-on-dark/14 pt-6 text-xs text-on-dark/45 min-[900px]:block">
        <Link href="/" className="inline-flex items-center gap-1.5 hover:text-on-dark hover:underline">
          <ExternalLink size={14} aria-hidden="true" />
          View public site
        </Link>
      </div>
    </aside>
  );
}
