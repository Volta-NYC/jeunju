import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  /** Short label above the heading. Names what the section is, never decorates. */
  eyebrow: string;
  heading: string;
  /** Korean rendering of the heading, set alongside rather than beneath. */
  headingKo?: string;
  intro?: string;
  className?: string;
  align?: 'start' | 'center';
}

export function SectionHeading({
  eyebrow,
  heading,
  headingKo,
  intro,
  className,
  align = 'start',
}: SectionHeadingProps) {
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', 'max-w-2xl', className)}>
      <p className="font-mono text-micro uppercase text-accent">{eyebrow}</p>
      <h2 className="mt-4 font-display text-display-md text-fg">
        {heading}
        {headingKo && (
          <span lang="ko" className="ml-3 align-middle font-display text-[0.42em] text-fg-faint">
            {headingKo}
          </span>
        )}
      </h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-fg-muted">{intro}</p>}
    </div>
  );
}
