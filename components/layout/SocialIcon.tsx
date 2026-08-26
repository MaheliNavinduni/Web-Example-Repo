import type { ReactNode } from 'react';

import type { SocialIconName } from '@/types';

/**
 * Social marks drawn inline.
 *
 * lucide-react removed its brand icons in v1, so Facebook, Instagram and TikTok
 * are all defined here as filled glyphs. Keeping them in one file means the
 * footer just asks for a name and gets a consistent 18px mark back.
 */

/* The mark is decorative — the surrounding link already carries the label. */
function Glyph({ size, children }: { size: number; children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

const PATHS: Record<SocialIconName, string> = {
  facebook:
    'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.5-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z',
  instagram:
    'M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 3.18a6.62 6.62 0 1 0 0 13.24 6.62 6.62 0 0 0 0-13.24Zm0 10.92a4.3 4.3 0 1 1 0-8.6 4.3 4.3 0 0 1 0 8.6Zm6.88-11.18a1.55 1.55 0 1 1-3.1 0 1.55 1.55 0 0 1 3.1 0Z',
  tiktok:
    'M16.5 2h-3v13.2a2.7 2.7 0 1 1-2.2-2.65V9.5a5.7 5.7 0 1 0 5.2 5.68V9.06A6.6 6.6 0 0 0 20.5 10.4V7.35A3.9 3.9 0 0 1 16.5 3.6Z',
};

export default function SocialIcon({ name, size = 18 }: { name: SocialIconName; size?: number }) {
  const path = PATHS[name];
  if (!path) return null;

  return (
    <Glyph size={size}>
      <path d={path} />
    </Glyph>
  );
}
