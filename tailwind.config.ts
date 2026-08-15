import type { Config } from 'tailwindcss';

/** Reads an RGB-triplet CSS variable, so utilities keep Tailwind's opacity modifiers. */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic. Prefer these everywhere — they follow the section's tier, so a
        // component dropped inside .on-raised adapts without knowing where it sits.
        bg: token('bg'),
        'bg-raised': token('bg-raised'),
        'bg-elevated': token('bg-elevated'),
        edge: token('edge'),
        fg: token('fg'),
        'fg-muted': token('fg-muted'),
        'fg-faint': token('fg-faint'),
        accent: token('accent'),

        // Literal values, for the few places that must not follow the tier.
        obsidian: {
          DEFAULT: token('obsidian'),
          deep: token('obsidian-deep'),
          raised: token('obsidian-raised'),
          elevated: token('obsidian-elevated'),
          edge: token('obsidian-edge'),
        },
        ivory: token('ivory'),
        gold: {
          DEFAULT: token('gold'),
          bright: token('gold-bright'),
          deep: token('gold-deep'),
        },
        celadon: token('celadon'),
        jujube: token('jujube'),
      },

      fontFamily: {
        // Gowun Batang sets Hangul and Latin in one voice — the point of the brand.
        display: ['var(--font-display)', 'ui-serif', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },

      fontSize: {
        // Fluid scale. Display sizes are set tight; the Myeongjo has enough colour that
        // loose leading makes it fall apart.
        micro: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.16em' }],
        label: ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.12em' }],
        'display-sm': ['clamp(1.75rem, 1.2rem + 2.2vw, 2.75rem)', { lineHeight: '1.14', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(2.25rem, 1.4rem + 3.6vw, 4.25rem)', { lineHeight: '1.06', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.75rem, 1.6rem + 5vw, 5.5rem)', { lineHeight: '1.0', letterSpacing: '-0.028em' }],
      },

      spacing: {
        gutter: 'var(--gutter)',
        section: 'var(--section-y)',
      },

      maxWidth: {
        shell: '86rem',
        measure: 'var(--measure)',
      },

      transitionTimingFunction: {
        out: 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)',
      },

      keyframes: {
        // The page-load sequence: dishes settling onto the table.
        settle: {
          '0%': { opacity: '0', transform: 'translateY(22px) scale(0.92)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Steam off a hot bowl — used once, on the hero.
        steam: {
          '0%': { opacity: '0', transform: 'translateY(0) scaleX(1)' },
          '35%': { opacity: '0.42' },
          '100%': { opacity: '0', transform: 'translateY(-80px) scaleX(1.8)' },
        },
        // The light over the table, breathing. Barely perceptible by design.
        glow: {
          '0%, 100%': { opacity: '0.16' },
          '50%': { opacity: '0.24' },
        },
      },
      animation: {
        // Slow. Nothing that reads as expensive moves quickly.
        settle: 'settle 1400ms var(--ease-out) both',
        rise: 'rise 1100ms var(--ease-out) both',
        steam: 'steam 6s ease-out infinite',
        glow: 'glow 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
