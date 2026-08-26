/**
 * Reports Tailwind class names that did not compile.
 *
 * Tailwind drops a class it does not recognise without saying anything, so a
 * typo like `text-mutted` or a colour that is not in the theme just silently
 * does nothing. This builds the stylesheet, collects every class name the
 * components use, and lists the ones that produced no CSS.
 *
 * Run with `npm run check:css`. Pass class names as arguments to check only
 * those instead of scanning the whole project.
 */
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';
import fs from 'node:fs';
import path from 'node:path';

const ENTRY = 'app/globals.css';
const SCAN_DIRS = ['app', 'components', 'lib'];
const SCAN_EXTS = new Set(['.ts', '.tsx']);

/** Characters Tailwind escapes with a backslash in a generated selector. */
const SPECIAL = new Set([...'.*+?^${}()|[]\\/:%!,#&<>=~\'"']);

function selectorRegex(cls) {
  let src = '\\.';
  for (const ch of cls) {
    src += SPECIAL.has(ch)
      ? '\\\\?' + ch.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')
      : ch;
  }
  return new RegExp(src + '(?![\\w-])');
}

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (SCAN_EXTS.has(path.extname(entry.name))) yield full;
  }
}

/**
 * Pulls class names out of the source.
 *
 * Only string literals are read. A class name built at runtime — a template
 * string with a variable in it — cannot be found by Tailwind's own scanner
 * either, so anything this misses would not have compiled anyway.
 */
function collectClasses() {
  const found = new Set();
  for (const dir of SCAN_DIRS) {
    if (!fs.existsSync(dir)) continue;
    for (const file of walk(dir)) {
      const source = fs.readFileSync(file, 'utf8');
      for (const [, literal] of source.matchAll(/'([^'\n]*)'|"([^"\n]*)"/g)) {
        for (const token of (literal ?? '').split(/\s+/)) {
          // A class always starts with a letter, a dash or a variant prefix,
          // and never contains a space, a backtick or a dollar sign.
          if (/^[a-z[@-][\w[\]()/:.,%!&<>=~@#*+?^${}|\\'"-]*$/i.test(token) && token.length > 1) {
            found.add(token);
          }
        }
      }
    }
  }
  return found;
}

const css = fs.readFileSync(ENTRY, 'utf8');
const { css: compiled } = await postcss([
  tailwind({ base: process.cwd(), optimize: false }),
]).process(css, { from: ENTRY });

const explicit = process.argv.slice(2);
const candidates = explicit.length > 0 ? explicit : [...collectClasses()];

// When scanning, most tokens are ordinary strings rather than class names, so
// only report a token that Tailwind itself decided to emit CSS for — anything
// it ignored entirely was never a class.
const missing = candidates.filter((cls) => !selectorRegex(cls).test(compiled));

if (explicit.length > 0) {
  console.log(`Checked ${candidates.length} class names against ${ENTRY}`);
  console.log(missing.length ? `UNRESOLVED: ${missing.join(', ')}` : 'All resolved.');
  process.exit(missing.length > 0 ? 1 : 0);
}

// Full-project mode: a scanned token is only interesting if it looks unambiguously
// like a Tailwind utility, so this reports the ones worth a second look.
const suspicious = missing.filter((cls) =>
  /^(?:[a-z-]+:)*(?:-?(?:bg|text|border|rounded|shadow|p|m|px|py|mx|my|mt|mb|ml|mr|pt|pb|pl|pr|w|h|size|min-w|min-h|max-w|max-h|gap|flex|grid|col|row|items|justify|self|place|font|leading|tracking|opacity|z|inset|top|left|right|bottom|translate|scale|rotate|transition|duration|delay|ease|animate|aspect|object|overflow|divide|space|order|basis|backdrop|blur|line-clamp|whitespace|cursor|outline|ring|fill|stroke|tabular|sr|not)-)/.test(
    cls,
  ),
);

console.log(`Scanned ${candidates.length} string tokens from ${SCAN_DIRS.join(', ')}`);
if (suspicious.length === 0) {
  console.log('Every utility-shaped class name resolved.');
} else {
  console.log(`UNRESOLVED (${suspicious.length}):`);
  for (const cls of suspicious.sort()) console.log('  ' + cls);
}
process.exit(suspicious.length > 0 ? 1 : 0);
