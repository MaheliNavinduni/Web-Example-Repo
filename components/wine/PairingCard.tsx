import Image from 'next/image';

import type { Pairing } from '@/types';

/** One tile in the "Curated Pairings" row. Not a product — no link, no price. */
export default function PairingCard({ pairing }: { pairing: Pairing }) {
  return (
    <figure className="group flex flex-col gap-2 text-center">
      {/* Portrait to match the supplied photographs, which are all roughly 3:4 —
          a landscape slot would crop the top and bottom off each dish. */}
      <div className="aspect-[3/4] overflow-hidden rounded-sm bg-cream-deep">
        <Image
          src={pairing.image}
          alt=""
          width={265}
          height={342}
          className="size-full object-cover transition-transform duration-[520ms] ease-out group-hover:scale-106"
          sizes="(max-width: 640px) 45vw, 265px"
        />
      </div>
      <figcaption className="font-serif text-md font-semibold text-body">{pairing.name}</figcaption>
    </figure>
  );
}
