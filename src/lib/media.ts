import manifest from '@/content/media-manifest.json';

/**
 * Resolves ids from the media manifest into everything a <picture> needs.
 *
 * The harvester (`scripts/harvest-media.mjs`) emits AVIF and WebP at three widths plus a
 * 16px blurred data URI. Nothing here reaches the network at runtime — every byte is
 * local under /public/media.
 */

export interface MediaVariant {
  width: number;
  format: 'avif' | 'webp';
  src: string;
}

export interface MediaCredit {
  source: string;
  file: string;
  pageUrl: string;
  author: string;
  license: string;
  licenseUrl: string;
}

export interface MediaAsset {
  id: string;
  kind: string;
  variants: MediaVariant[];
  blurDataURL: string;
  aspectRatio: number;
  /** Null once the client's own photograph has replaced the placeholder. */
  credit: MediaCredit | null;
  ownPhotography?: boolean;
}

const assets = manifest.assets as unknown as Record<string, MediaAsset>;

export function getMedia(id: string | null | undefined): MediaAsset | null {
  if (!id) return null;
  return assets[id] ?? null;
}

/** Builds a srcSet string for one format, widest last. */
export function srcSetFor(asset: MediaAsset, format: 'avif' | 'webp'): string {
  return asset.variants
    .filter((v) => v.format === format)
    .sort((a, b) => a.width - b.width)
    .map((v) => `${v.src} ${v.width}w`)
    .join(', ');
}

/** The fallback <img src> — the middle width, so it is never the heaviest file. */
export function fallbackSrc(asset: MediaAsset): string {
  const webp = asset.variants.filter((v) => v.format === 'webp').sort((a, b) => a.width - b.width);
  return (webp[1] ?? webp[0]).src;
}

/**
 * Every distinct source photo with its licence, for the credits page.
 * Deduped: several dishes legitimately resolve to the same Commons file.
 */
export function allCredits(): MediaCredit[] {
  const seen = new Map<string, MediaCredit>();
  for (const asset of Object.values(assets)) {
    if (asset.credit && !seen.has(asset.credit.file)) seen.set(asset.credit.file, asset.credit);
  }
  return [...seen.values()].sort((a, b) => a.file.localeCompare(b.file));
}

export const mediaNote = manifest.note;
