import type { ReactNode } from 'react';

import Reveal from '@/components/ui/Reveal';

/**
 * Full-bleed closing call to action over a background image.
 *
 * The image and the burgundy wash are both negative z-index layers behind the
 * copy; `isolate` keeps that stacking inside this section instead of letting it
 * fall behind the page.
 */
export default function CtaBand({
  image,
  title,
  body,
  actions,
}: {
  image: string;
  title: string;
  body: string;
  actions: ReactNode;
}) {
  return (
    <section className="relative isolate grid min-h-[clamp(320px,45vh,460px)] place-items-center overflow-hidden px-gutter py-section text-center text-on-dark before:absolute before:inset-0 before:-z-1 before:bg-[linear-gradient(120deg,rgb(67_0_5/0.9),rgb(13_13_13/0.72))] before:content-['']">
      <div
        className="absolute inset-0 -z-2 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      />
      <Reveal>
        <h2 className="mx-auto max-w-[16ch] text-on-dark">{title}</h2>
        <p className="mx-auto mt-4 mb-8 max-w-[52ch] text-lg text-on-dark-muted">{body}</p>
        <div className="flex flex-wrap justify-center gap-3">{actions}</div>
      </Reveal>
    </section>
  );
}
