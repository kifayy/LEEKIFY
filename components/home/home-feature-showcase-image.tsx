import { HomeOptimizedImage } from "@/components/home/home-optimized-image";
import { cn } from "@/lib/utils";

type HomeFeatureShowcaseImageProps = {
  src: string;
  alt: string;
  className?: string;
  /** First visible feature row on mobile — LCP candidate */
  priority?: boolean;
};

export function HomeFeatureShowcaseImage({
  src,
  alt,
  className,
  priority = false,
}: HomeFeatureShowcaseImageProps) {
  return (
    <HomeOptimizedImage
      src={src}
      alt={alt}
      width={800}
      height={600}
      sizes="(max-width: 768px) 100vw, 430px"
      priority={priority}
      fetchPriority={priority ? "high" : undefined}
      loading={priority ? undefined : "lazy"}
      className={cn("h-auto w-full object-contain", className)}
    />
  );
}
