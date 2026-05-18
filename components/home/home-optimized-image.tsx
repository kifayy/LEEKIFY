import Image, { type ImageProps } from "next/image";

import { shouldUseNextImageOptimizer } from "@/lib/remote-image-patterns";

function resolveUnoptimized(src: ImageProps["src"], explicit?: boolean): boolean {
  if (explicit !== undefined) return explicit;
  if (typeof src === "string") return !shouldUseNextImageOptimizer(src);
  return false;
}

/**
 * Home/marketing images: use Next optimizer (WebP/AVIF + sizing) when the host is allowed.
 * Pass `unoptimized` only when bypassing the optimizer is intentional (e.g. tiny marquee tiles).
 */
export function HomeOptimizedImage({ src, unoptimized, ...rest }: ImageProps) {
  return <Image src={src} unoptimized={resolveUnoptimized(src, unoptimized)} {...rest} />;
}
