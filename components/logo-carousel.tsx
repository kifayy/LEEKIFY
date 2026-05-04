import Image from "next/image";

const LOGO_CAROUSEL_IMAGES = [
  "https://storage.googleapis.com/images_592/51.png",
  "https://storage.googleapis.com/images_592/72.png",
  "https://storage.googleapis.com/images_592/612.png",
  "https://storage.googleapis.com/images_592/721.png",
  "https://storage.googleapis.com/images_592/22.png",
];

/** Horizontal logo marquee carousel. Use on any page; pass className for wrapper (e.g. margin). */
export function LogoCarousel({ className = "" }: { className?: string }) {
  return (
    <div className={`marquee-fade-edges overflow-hidden ${className}`}>
      <div className="flex w-max gap-6 py-4 animate-logo-marquee-x">
        {[...LOGO_CAROUSEL_IMAGES, ...LOGO_CAROUSEL_IMAGES, ...LOGO_CAROUSEL_IMAGES, ...LOGO_CAROUSEL_IMAGES].map(
          (src, i) => (
            <div
              key={i}
              className="relative h-16 w-[120px] shrink-0 overflow-hidden rounded-3xl md:h-20 md:w-[140px] md:rounded-[2rem]"
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-contain rounded-9xl md:rounded-[5rem]"
                sizes="140px"
                unoptimized
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}
