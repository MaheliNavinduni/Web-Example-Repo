import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Joins Tailwind class names, dropping falsy values and letting a later class
 * win over an earlier one in the same group.
 *
 * Without the merge, a caller passing `className="p-8"` to a component that
 * already sets `p-4` would end up with both in the class attribute and the
 * result would depend on stylesheet order rather than on the caller.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
