'use client';

import { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

import { cn } from '@/lib/cn';

export type ToastVariant = 'success' | 'brand';

const VARIANTS: Record<ToastVariant, string> = {
  success: 'bg-success',
  brand: 'bg-burgundy',
};

export interface ToastProps {
  /** Empty string renders nothing — the caller clears it to dismiss. */
  message: string;
  variant?: ToastVariant;
  duration?: number;
  onDismiss?: () => void;
}

/** Brief confirmation message; disappears on its own after `duration`. */
export default function Toast({
  message,
  variant = 'success',
  duration = 3200,
  onDismiss,
}: ToastProps) {
  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(() => onDismiss?.(), duration);
    return () => clearTimeout(timer);
  }, [message, duration, onDismiss]);

  if (!message) return null;

  return (
    <div
      className={cn(
        'fixed bottom-6 left-1/2 z-400 flex -translate-x-1/2 items-center gap-2',
        'max-w-[calc(100vw-2rem)] rounded-full px-6 py-3 shadow-lg',
        'text-sm font-semibold text-on-dark animate-fade-up',
        VARIANTS[variant],
      )}
      role="status"
      aria-live="polite"
    >
      <CheckCircle2 size={18} aria-hidden="true" />
      {message}
    </div>
  );
}
