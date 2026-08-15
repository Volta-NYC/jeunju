import { getMedia, srcSetFor, fallbackSrc } from '@/lib/media';
import { cn } from '@/lib/cn';

interface PhotoProps {
  /** Media manifest id. Unknown or null ids render the fallback panel, never a broken image. */
  id: string | null | undefined;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Rendered inside the frame when there is no photograph for this id. */
  fallbackLabel?: string;
}

/**
 * A plain <picture> rather than next/image.
 *
 * The harvester has already produced exactly the widths and formats we ship, so runtime
 * optimisation would only re-do settled work. This also keeps every asset a static file
 * that any host can serve straight from cache.
 *
 * The blurred data URI sits behind the image as a background, so there is no layout
 * shift and no flash of empty frame on slow connections.
 */
export function Photo({
  id,
  alt,
  className,
  imgClassName,
  sizes = '100vw',
  priority = false,
  fallbackLabel,
}: PhotoProps) {
  const asset = getMedia(id);

  if (!asset) {
    return (
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden bg-bg-raised',
          className,
        )}
        aria-hidden={!fallbackLabel}
      >
        <span className="px-4 text-center font-display text-fg-faint/70 text-sm">
          {fallbackLabel ?? ''}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn('relative overflow-hidden bg-bg-raised', className)}
      style={{
        backgroundImage: `url(${asset.blurDataURL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <picture>
        <source type="image/avif" srcSet={srcSetFor(asset, 'avif')} sizes={sizes} />
        <source type="image/webp" srcSet={srcSetFor(asset, 'webp')} sizes={sizes} />
        <img
          src={fallbackSrc(asset)}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          className={cn('h-full w-full object-cover', imgClassName)}
        />
      </picture>
    </div>
  );
}
