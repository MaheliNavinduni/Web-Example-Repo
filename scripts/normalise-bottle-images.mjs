/**
 * Crops the transparent padding off the bottle PNGs.
 *
 * The supplied images each had a different amount of empty space around the
 * bottle — Classic Blanc's bottle filled only 58% of its canvas while the
 * others filled ~95%. Rendered at a fixed CSS height that made Classic Blanc
 * look noticeably smaller than its neighbours on the Collection page.
 *
 * Trimming each image to the bottle itself means a single CSS height renders
 * every bottle at the same visual size, on every page, with no per-product
 * adjustment. It also drops the file sizes considerably.
 *
 * Safe to re-run: already-trimmed images have no padding left to remove.
 * Run with:  node scripts/normalise-bottle-images.mjs
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { deflateSync, inflateSync } from 'node:zlib';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const WINE_DIR = join(ROOT, 'public/images/wines');

/** Keep a thin transparent margin so drop-shadows are not clipped. */
const MARGIN_RATIO = 0.015;
const ALPHA_THRESHOLD = 12;

/* ------------------------------------------------------------------ */
/* PNG decode                                                          */
/* ------------------------------------------------------------------ */

function decode(buffer) {
  let pos = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  const idat = [];

  while (pos < buffer.length) {
    const length = buffer.readUInt32BE(pos);
    const type = buffer.toString('ascii', pos + 4, pos + 8);
    const data = buffer.subarray(pos + 8, pos + 8 + length);

    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === 'IDAT') {
      idat.push(data);
    } else if (type === 'IEND') {
      break;
    }
    pos += 12 + length;
  }

  if (bitDepth !== 8 || colorType !== 6) {
    throw new Error(`only 8-bit RGBA is handled (got depth ${bitDepth}, type ${colorType})`);
  }

  const stride = width * 4;
  const raw = inflateSync(Buffer.concat(idat));
  const pixels = Buffer.alloc(height * stride);

  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, y * (stride + 1) + 1 + stride);
    const cur = pixels.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? pixels.subarray((y - 1) * stride, y * stride) : Buffer.alloc(stride);

    for (let x = 0; x < stride; x++) {
      const a = x >= 4 ? cur[x - 4] : 0;
      const b = prev[x];
      const c = x >= 4 ? prev[x - 4] : 0;
      let value = line[x];

      if (filter === 1) value += a;
      else if (filter === 2) value += b;
      else if (filter === 3) value += (a + b) >> 1;
      else if (filter === 4) value += paeth(a, b, c);

      cur[x] = value & 0xff;
    }
  }

  return { width, height, pixels };
}

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  return pb <= pc ? b : c;
}

/* ------------------------------------------------------------------ */
/* PNG encode                                                          */
/* ------------------------------------------------------------------ */

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buffer) {
  let c = 0xffffffff;
  for (let i = 0; i < buffer.length; i++) c = CRC_TABLE[(c ^ buffer[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

function encode({ width, height, pixels }) {
  const stride = width * 4;
  // Paeth on every scanline: cheap to apply and compresses bottle photography
  // far better than storing the rows unfiltered.
  const filtered = Buffer.alloc(height * (stride + 1));

  for (let y = 0; y < height; y++) {
    filtered[y * (stride + 1)] = 4;
    const cur = pixels.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? pixels.subarray((y - 1) * stride, y * stride) : Buffer.alloc(stride);
    const out = filtered.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));

    for (let x = 0; x < stride; x++) {
      const a = x >= 4 ? cur[x - 4] : 0;
      const b = prev[x];
      const c = x >= 4 ? prev[x - 4] : 0;
      out[x] = (cur[x] - paeth(a, b, c)) & 0xff;
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(filtered, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/* ------------------------------------------------------------------ */
/* Trim                                                                */
/* ------------------------------------------------------------------ */

function alphaBounds({ width, height, pixels }) {
  const stride = width * 4;
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (pixels[y * stride + x * 4 + 3] > ALPHA_THRESHOLD) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < 0) return null;
  return { x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

function crop(image, box) {
  const out = Buffer.alloc(box.height * box.width * 4);
  for (let y = 0; y < box.height; y++) {
    const from = (box.y + y) * image.width * 4 + box.x * 4;
    image.pixels.copy(out, y * box.width * 4, from, from + box.width * 4);
  }
  return { width: box.width, height: box.height, pixels: out };
}

/* ------------------------------------------------------------------ */

console.log('Trimming transparent padding from bottle images…\n');

for (const file of readdirSync(WINE_DIR).filter((name) => name.endsWith('.png'))) {
  const path = join(WINE_DIR, file);
  const before = statSync(path).size;
  const image = decode(readFileSync(path));
  const bounds = alphaBounds(image);

  if (!bounds) {
    console.log(`  – ${file}: fully transparent, skipped`);
    continue;
  }

  const margin = Math.round(bounds.height * MARGIN_RATIO);
  const box = {
    x: Math.max(0, bounds.x - margin),
    y: Math.max(0, bounds.y - margin),
    width: Math.min(image.width, bounds.width + margin * 2),
    height: Math.min(image.height, bounds.height + margin * 2),
  };
  box.width = Math.min(box.width, image.width - box.x);
  box.height = Math.min(box.height, image.height - box.y);

  if (box.width === image.width && box.height === image.height) {
    console.log(`  – ${file}: already trimmed`);
    continue;
  }

  writeFileSync(path, encode(crop(image, box)));
  const after = statSync(path).size;
  const fill = ((bounds.height / image.height) * 100).toFixed(1);

  console.log(
    `  ✓ ${file.padEnd(20)} ${image.width}x${image.height} → ${box.width}x${box.height}` +
      `   (bottle filled ${fill}% of height)` +
      `   ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`,
  );
}

console.log('\nDone. Every bottle now fills its frame, so one CSS height sizes them all equally.');
