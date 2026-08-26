import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import VintMark from '@/components/layout/VintMark';

export const metadata: Metadata = {
  title: 'Page not found',
};

/**
 * Root 404. It lives outside the (public) group, so it renders its own minimal
 * chrome rather than the full navbar and footer.
 */
export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center p-8 text-center">
      <div className="grid justify-items-center gap-4">
        <Link
          href="/"
          aria-label="VINT — home"
          className="mb-2 size-14 overflow-hidden rounded-full"
        >
          <VintMark size={56} />
        </Link>

        <Eyebrow>Error 404</Eyebrow>
        <h1 className="text-3xl">This bottle is not in our cellar</h1>
        <p className="max-w-[46ch] text-lg text-muted">
          The page you were looking for does not exist. It may have moved, or the link may have been
          mistyped.
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="primary" icon={<ArrowRight size={16} />}>
            Back to Home
          </Button>
          <Button href="/collection" variant="outline">
            View the Collection
          </Button>
        </div>
      </div>
    </main>
  );
}
