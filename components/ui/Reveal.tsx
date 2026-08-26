'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';

/**
 * Fades and lifts its children in the first time they scroll into view.
 *
 * Implemented with IntersectionObserver plus the two `[data-reveal]` rules in
 * app/globals.css rather than an animation library — it is a fraction of the
 * weight, and the prefers-reduced-motion block there disables it automatically.
 */
export interface RevealProps {
  children: ReactNode;
  /** Element to render (section, li, article…). */
  as?: ElementType;
  /** ms to stagger this element behind its siblings. */
  delay?: number;
  threshold?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  threshold = 0.15,
  className,
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // Server-rendered content should never stay hidden if the browser has no
    // IntersectionObserver — show it immediately instead.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -60px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      data-reveal={visible ? 'in' : 'out'}
      style={delay ? ({ ...style, '--reveal-delay': `${delay}ms` } as CSSProperties) : style}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
