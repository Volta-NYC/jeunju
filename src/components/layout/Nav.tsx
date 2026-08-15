'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { business } from '@/content/business';
import { cn } from '@/lib/cn';

/**
 * Spare top navigation — four destinations, following the restraint of the reference
 * direction in §8. Transparent over the home hero, and it takes an obsidian ground once
 * you scroll past it so the hero composition is never boxed in.
 */

const LINKS = [
  { href: '/menu', label: 'Menu', labelKo: '메뉴' },
  { href: '/story', label: 'Story', labelKo: '이야기' },
  { href: '/press', label: 'Press', labelKo: '기사' },
  { href: '/visit', label: 'Visit', labelKo: '오시는 길' },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile sheet on navigation, and lock the page behind it while open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Only the home hero sits behind a transparent bar; every other page has content
  // running under it from the first pixel.
  const transparent = pathname === '/' && !scrolled && !open;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-700 ease-out',
        transparent
          ? 'border-b border-transparent'
          : 'border-b border-white/[0.07] bg-obsidian/80 backdrop-blur-xl',
      )}
    >
      <div className="mx-auto flex max-w-shell items-center justify-between gutter py-5">
        <Link
          href="/"
          className="group flex items-baseline gap-3"
          aria-label={`${business.fullName} — home`}
        >
          <span className="font-display text-2xl leading-none tracking-tight text-fg transition-colors duration-500 group-hover:text-accent">
            JeunJu
          </span>
          <span lang="ko" className="font-display text-sm leading-none text-fg/25">
            전주식당
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Main">
          {LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative font-mono text-label uppercase transition-colors duration-500',
                  active ? 'text-accent' : 'text-fg/55 hover:text-fg',
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute -bottom-2 left-0 h-px bg-accent transition-all duration-500 ease-out',
                    active ? 'w-full' : 'w-0',
                  )}
                />
              </Link>
            );
          })}
          <a
            href={business.phone.href}
            className="rounded-full border border-white/15 px-6 py-2.5 font-mono text-label uppercase text-fg transition-colors duration-500 hover:border-accent hover:text-accent"
          >
            Call
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[6px] md:hidden"
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span
            aria-hidden
            className={cn(
              'block h-px w-6 bg-fg transition-transform duration-500 ease-out',
              open && 'translate-y-[3.5px] rotate-45',
            )}
          />
          <span
            aria-hidden
            className={cn(
              'block h-px w-6 bg-fg transition-transform duration-500 ease-out',
              open && '-translate-y-[3.5px] -rotate-45',
            )}
          />
        </button>
      </div>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        className={cn(
          'grid overflow-hidden transition-[grid-template-rows] duration-700 ease-out md:hidden',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <nav className="min-h-0 overflow-hidden" aria-label="Main, mobile">
          <ul className="gutter pb-10 pt-2">
            {LINKS.map((link) => (
              <li key={link.href} className="border-b border-white/[0.07]">
                <Link
                  href={link.href}
                  className="flex items-baseline justify-between py-5 font-display text-3xl text-fg"
                >
                  {link.label}
                  <span lang="ko" className="font-mono text-label text-fg/30">
                    {link.labelKo}
                  </span>
                </Link>
              </li>
            ))}
            <li className="pt-7">
              <a
                href={business.phone.href}
                className="block rounded-full bg-accent py-4 text-center font-mono text-label uppercase text-obsidian"
              >
                Call {business.phone.display}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
