import type { ReactNode } from 'react';

import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import { cn } from '@/lib/cn';

export type HeadingAlign = 'left' | 'center' | 'between';

export interface SectionHeadingProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** 'between' puts `action` on the right of the title instead of below it. */
  align?: HeadingAlign;
  /** e.g. a "View all wines" button. */
  action?: ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
}

/** Heading block used above every major section. */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  action,
  as: Tag = 'h2',
  id,
}: SectionHeadingProps) {
  const centered = align === 'center';

  const heading = (
    <>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag id={id}>{title}</Tag>
      {subtitle && (
        <p className={cn('max-w-[62ch] text-lg text-muted', centered && 'mx-auto')}>{subtitle}</p>
      )}
    </>
  );

  if (align === 'between') {
    return (
      <Reveal className="mb-12 flex flex-row flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">{heading}</div>
        {action}
      </Reveal>
    );
  }

  return (
    <Reveal className={cn('mb-12 flex flex-col gap-2', centered && 'items-center text-center')}>
      {heading}
      {action}
    </Reveal>
  );
}
