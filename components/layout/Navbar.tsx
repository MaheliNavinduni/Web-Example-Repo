'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

import { NAV_LINKS, SITE } from '@/data/site';
import Button from '@/components/ui/Button';
import Container from '@/components/layout/Container';
import VintMark from '@/components/layout/VintMark';
import { cn } from '@/lib/cn';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Tighten the bar once the hero starts scrolling past.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Never leave the mobile drawer hanging open after a navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string): boolean =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={cn(
        'sticky top-0 z-100 border-b backdrop-blur-[14px] backdrop-saturate-150',
        'transition-[background-color,border-color,box-shadow] ease-out',
        scrolled
          ? 'border-b-warm-gray-deep bg-warm-gray/96 shadow-sm'
          : 'border-b-transparent bg-warm-gray/86',
      )}
    >
      <Container as="nav" aria-label="Main navigation">
        <div className="flex min-h-18 items-center justify-between gap-6 py-2">
          <Link
            href="/"
            className="group inline-flex shrink-0 items-center gap-2"
            aria-label={`${SITE.name} — home`}
          >
            {/* The logo artwork already carries its own cream circle, so this
                is a round clipping frame rather than a badge drawn around it. */}
            <span
              className={cn(
                'grid size-[42px] place-items-center overflow-hidden rounded-full',
                'border border-warm-gray-deep transition-transform ease-out',
                'group-hover:-rotate-8 group-hover:scale-105',
              )}
              aria-hidden="true"
            >
              <VintMark size={42} />
            </span>
            <span className="font-serif text-[1.6rem] leading-none font-bold tracking-[0.06em] text-burgundy">
              {SITE.name}
            </span>
          </Link>

          <ul className="hidden items-center gap-[clamp(1rem,2.5vw,2.25rem)] nav:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    // The underline is a pseudo-element that wipes in from the
                    // left on hover and stays put on the current page.
                    'relative py-1 text-sm font-semibold tracking-wide uppercase transition-colors ease-out',
                    'after:absolute after:inset-x-0 after:bottom-0 after:h-[1.5px] after:origin-right',
                    'after:bg-burgundy after:transition-transform after:ease-out after:content-[""]',
                    'hover:text-burgundy hover:after:origin-left hover:after:scale-x-100',
                    'focus-visible:text-burgundy focus-visible:after:origin-left focus-visible:after:scale-x-100',
                    isActive(link.href)
                      ? 'font-bold text-burgundy after:scale-x-100'
                      : 'text-muted after:scale-x-0',
                  )}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <Button href="/order" variant="outline" size="sm" className="hidden nav:inline-flex">
              Order
            </Button>

            <button
              type="button"
              className="grid size-11 place-items-center rounded-sm text-burgundy transition-colors ease-out hover:bg-burgundy/8 nav:hidden"
              aria-expanded={open}
              aria-controls="vint-mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>

        <div
          id="vint-mobile-menu"
          className={cn(
            'grid overflow-hidden transition-[grid-template-rows] ease-out nav:hidden',
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          {/* Solid fill: the navbar itself is translucent, and menu links
              sitting over a hero photograph are hard to read. */}
          <div className="min-h-0 bg-warm-gray">
            <ul className="flex flex-col gap-1 border-t border-warm-gray-deep pt-4 pb-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'block rounded-sm border-l-2 px-2 py-3 text-md font-semibold tracking-wide uppercase',
                      'transition-[color,background-color,border-color,padding] ease-out',
                      'hover:bg-burgundy/5 hover:pl-4 hover:text-burgundy',
                      isActive(link.href)
                        ? 'border-l-burgundy bg-burgundy/6 text-burgundy'
                        : 'border-l-transparent text-muted',
                    )}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    tabIndex={open ? 0 : -1}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <Button href="/order" variant="primary" block tabIndex={open ? 0 : -1}>
                  Order
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </header>
  );
}
