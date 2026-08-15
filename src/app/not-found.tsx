import Link from 'next/link';
import { business } from '@/content/business';

export default function NotFound() {
  return (
    <div className="grain relative flex min-h-screen flex-col items-center justify-center bg-obsidian px-gutter text-center">
      <p className="font-mono text-micro uppercase text-accent">Not on the menu</p>
      <h1 className="lit mt-6 font-display text-display-md text-fg">This page isn’t here.</h1>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-fg-muted">
        Try the menu, or call us — someone will pick up.
      </p>
      <div className="mt-11 flex flex-wrap justify-center gap-3">
        <Link
          href="/menu"
          className="rounded-full bg-accent px-8 py-4 font-mono text-label uppercase text-obsidian transition-colors duration-500 hover:bg-gold-bright"
        >
          See the menu
        </Link>
        <a
          href={business.phone.href}
          className="rounded-full border border-white/15 px-8 py-4 font-mono text-label uppercase text-fg transition-colors duration-500 hover:border-accent hover:text-accent"
        >
          {business.phone.display}
        </a>
      </div>
    </div>
  );
}
