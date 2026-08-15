'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger index — each step delays the reveal by 70ms. */
  index?: number;
  as?: 'div' | 'li' | 'section' | 'article';
}

/**
 * Scroll-triggered reveal.
 *
 * One IntersectionObserver per element, disconnected on first intersection — cheaper
 * than a scroll listener and it never fights the browser's own scheduling.
 *
 * Reduced-motion users get the content immediately with no transform. This is checked
 * before the observer is created rather than only in CSS, so no animation is scheduled
 * at all.
 */
export function Reveal({ children, className, index = 0, as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      // Paired with the <noscript> rule in the root layout: without JS these never
      // intersect, so the attribute is the hook that forces them visible.
      data-reveal=""
      className={cn(
        'transition-[opacity,transform] duration-[900ms] ease-out motion-reduce:transition-none',
        shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
        className,
      )}
      style={{ transitionDelay: shown ? `${index * 70}ms` : '0ms' }}
    >
      {children}
    </Tag>
  );
}
