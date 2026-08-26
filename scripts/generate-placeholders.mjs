/**
 * Generates the placeholder artwork VINT uses wherever real photography has
 * not been supplied yet: the remaining hero backgrounds.
 *
 * They are SVGs drawn in the brand palette, so the site never shows a broken
 * image and nothing depends on an external CDN. Replace any of them with a real
 * photo at the same path (a .jpg works too — just update the path in the page).
 *
 * Run with:  node scripts/generate-placeholders.mjs
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const PALETTE = {
  cream: '#f6f5d8',
  creamDeep: '#ededcf',
  ivory: '#f7f1e3',
  tan: '#ded2b8',
  burgundy: '#430005',
  burgundyMid: '#5b0b10',
  burgundyBright: '#7a1520',
  black: '#0d0d0d',
  gold: '#b08d34',
};

function write(relativePath, contents) {
  const target = resolve(ROOT, relativePath);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, contents.trim(), 'utf8');
  console.log('  ✓', relativePath);
}

/* ------------------------------------------------------------------ */
/* Hero backgrounds — atmospheric burgundy light studies                */
/* ------------------------------------------------------------------ */

/**
 * Layered radial "light blooms" over a dark gradient. Sitting behind the hero's
 * burgundy overlay these read as depth and glow rather than as flat colour.
 */
function heroSvg({ id, blooms, silhouette }) {
  const bloomDefs = blooms
    .map(
      (bloom, index) => `
    <radialGradient id="${id}-bloom-${index}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${bloom.color}" stop-opacity="${bloom.opacity}" />
      <stop offset="100%" stop-color="${bloom.color}" stop-opacity="0" />
    </radialGradient>`,
    )
    .join('');

  const bloomShapes = blooms
    .map(
      (bloom, index) =>
        `<ellipse cx="${bloom.x}" cy="${bloom.y}" rx="${bloom.rx}" ry="${bloom.ry}" fill="url(#${id}-bloom-${index})" />`,
    )
    .join('\n    ');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900" role="img">
  <defs>
    <linearGradient id="${id}-base" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${PALETTE.burgundy}" />
      <stop offset="55%" stop-color="${PALETTE.burgundyMid}" />
      <stop offset="100%" stop-color="${PALETTE.black}" />
    </linearGradient>${bloomDefs}
    <filter id="${id}-soft" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="42" />
    </filter>
    <filter id="${id}-grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="7" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
  </defs>

  <rect width="1600" height="900" fill="url(#${id}-base)" />

  <g filter="url(#${id}-soft)">
    ${bloomShapes}
  </g>

  <g opacity="0.16" fill="none" stroke="${PALETTE.gold}" stroke-width="2">
    ${silhouette}
  </g>

  <rect width="1600" height="900" filter="url(#${id}-grain)" opacity="0.05" />
</svg>`;
}

/** Simple bottle-and-glass outlines used as background silhouettes. */
const BOTTLE = (x, y, scale = 1) => `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <path d="M-26 0h52v190a26 26 0 0 1-26 26 26 26 0 0 1-26-26Z" />
      <path d="M-9 0v-58a9 9 0 0 1 4-8h10a9 9 0 0 1 4 8V0Z" />
      <path d="M-26 96h52" />
    </g>`;

const GLASS = (x, y, scale = 1) => `
    <g transform="translate(${x} ${y}) scale(${scale})">
      <path d="M-34 0h68l-8 62a26 26 0 0 1-52 0Z" />
      <path d="M0 88v70" />
      <path d="M-26 158h52" />
    </g>`;

const HEROES = {
  'confirmation-hero': {
    blooms: [
      { x: 800, y: 380, rx: 620, ry: 440, color: PALETTE.burgundyBright, opacity: 0.68 },
      { x: 400, y: 720, rx: 400, ry: 300, color: PALETTE.gold, opacity: 0.34 },
      { x: 1220, y: 200, rx: 340, ry: 300, color: '#c0392b', opacity: 0.26 },
    ],
    silhouette: [GLASS(700, 340, 1.35), GLASS(900, 340, 1.35)].join(''),
  },
  'glasses-cta': {
    blooms: [
      { x: 500, y: 400, rx: 520, ry: 420, color: PALETTE.burgundyBright, opacity: 0.8 },
      { x: 1200, y: 520, rx: 480, ry: 380, color: '#7d1d2a', opacity: 0.6 },
      { x: 900, y: 160, rx: 320, ry: 240, color: PALETTE.gold, opacity: 0.24 },
    ],
    silhouette: [GLASS(1180, 330, 1.4), GLASS(1380, 380, 1.1), BOTTLE(1000, 300, 1)].join(''),
  },
};

/* ------------------------------------------------------------------ */

console.log('Generating VINT placeholder artwork…');

Object.entries(HEROES).forEach(([name, config]) => {
  write(`public/images/heroes/${name}.svg`, heroSvg({ id: name, ...config }));
});

console.log('Done. Replace any of these with real photography at the same path.');
