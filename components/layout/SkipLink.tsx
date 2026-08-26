/**
 * Keyboard shortcut past the navigation, hidden until it is focused.
 *
 * It has to be the first focusable thing on the page, so it lives at the top of
 * the public layout rather than inside the navbar.
 */
export default function SkipLink({ href = '#main' }: { href?: string }) {
  return (
    <a
      href={href}
      className="absolute top-2 left-2 z-400 -translate-y-[200%] rounded-sm bg-burgundy px-4 py-2 text-sm font-semibold text-on-dark transition-transform ease-out focus-visible:translate-y-0"
    >
      Skip to content
    </a>
  );
}
