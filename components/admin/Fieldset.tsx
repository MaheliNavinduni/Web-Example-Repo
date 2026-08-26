import type { ReactNode } from 'react';

/** One titled group of fields on an admin form. */
export default function Fieldset({
  legend,
  hint,
  children,
}: {
  legend: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="rounded-md border border-line-soft bg-ivory-soft p-6">
      <legend className="px-2 font-serif text-lg font-bold text-burgundy">{legend}</legend>
      {hint && <p className="mb-6 text-sm text-muted">{hint}</p>}
      {children}
    </fieldset>
  );
}
