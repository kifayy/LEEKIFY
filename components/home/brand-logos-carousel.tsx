"use client";

import Image from "next/image";

const BRAND_LOGOS = [
  "https://storage.googleapis.com/images_592/72.png",
  "https://storage.googleapis.com/images_592/721.png",
  "https://storage.googleapis.com/images_592/22.png",
];

function LogoSlot({ src }: { src: string }) {
  return (
    <div className="flex shrink-0 items-center justify-center px-4 md:px-6 h-16 md:h-20">
      <Image
        src={src}
        alt=""
        width={120}
        height={80}
        className="max-h-14 w-auto rounded-lg object-contain md:max-h-16"
        unoptimized
      />
    </div>
  );
}

export function BrandLogosCarousel() {
  return (
    <div className="marquee-fade-edges mx-auto mt-4 max-w-sm overflow-hidden px-4 py-3 md:max-w-md">
      <div className="flex w-max animate-marquee-x-fast">
        {[...BRAND_LOGOS, ...BRAND_LOGOS].map((src, i) => (
          <LogoSlot key={i} src={src} />
        ))}
      </div>
    </div>
  );
}
