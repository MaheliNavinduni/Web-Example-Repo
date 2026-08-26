import type { ReactNode } from 'react';

/** Metric tile on the admin dashboard. */
export default function StatCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-md border border-line-soft bg-ivory-soft p-6 transition-[transform,box-shadow] ease-out hover:-translate-y-[3px] hover:shadow-md">
      <span className="grid size-11 shrink-0 place-items-center rounded-sm bg-cream-deep text-burgundy">
        {icon}
      </span>
      <div>
        <span className="block text-xs font-bold tracking-wide uppercase text-faint">{label}</span>
        <p className="font-serif text-2xl leading-[1.15] font-bold text-burgundy">{value}</p>
        {hint && <span className="text-xs text-muted">{hint}</span>}
      </div>
    </div>
  );
}
