import type { ReactNode } from 'react';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SkipLink from '@/components/layout/SkipLink';

/**
 * Chrome shared by every public page.
 *
 * This is a Next.js route group — the "(public)" folder name is not part of any
 * URL, it just lets the public pages share a navbar and footer while /admin
 * uses a completely different shell.
 */
export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
