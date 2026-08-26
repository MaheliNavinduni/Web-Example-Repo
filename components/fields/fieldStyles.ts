import { cn } from '@/lib/cn';

/**
 * The shared look of every form control — the underline-style input the Figma
 * order and contact screens use.
 *
 * It lives in one function rather than being repeated in each field component
 * so an input, a textarea and a select can never fall out of step with each
 * other, and there is a single place to change the treatment.
 */
export function fieldControlClasses(invalid: boolean, extra?: string): string {
  return cn(
    'w-full rounded-none border-0 border-b bg-transparent px-1 py-[0.65rem]',
    'text-md text-body transition-[border-color,box-shadow] ease-out',
    'placeholder:text-faint',
    'hover:border-b-line-strong',
    'focus:border-b-burgundy focus:shadow-[0_1px_0_0_var(--color-burgundy)] focus:outline-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy-bright',
    invalid ? 'border-b-danger' : 'border-b-line',
    extra,
  );
}
