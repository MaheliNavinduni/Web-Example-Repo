import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Playfair_Display, Manrope } from 'next/font/google';

// The Tailwind theme and the base layer. Next.js only allows global CSS at the
// top of the tree, so this is the one place it can be imported.
import '@/app/globals.css';

/** Luxury editorial serif — hero headings, page titles, product names. */
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800'],
});

/** Clean sans — navigation, forms, buttons, labels, body copy. */
const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vint-wine.example'),
  title: {
    default: 'VINT — Handmade Wine, Crafted With Passion',
    template: '%s | VINT',
  },
  description:
    'VINT is a small Sri Lankan estate making homemade wine by hand. Explore our collection of four handcrafted wines and our glassware, and place an order directly with our team.',
  keywords: ['homemade wine', 'Sri Lanka wine', 'king coconut wine', 'VINT', 'Avissawella'],
  openGraph: {
    title: 'VINT — Handmade Wine, Crafted With Passion',
    description:
      'A small curated collection of homemade wines, made by hand in Avissawella, Sri Lanka.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#430005',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
