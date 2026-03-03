/**
 * "See in Action" section for Scholarship Scanner — two images side-by-side on desktop, stacked on mobile.
 */

import Image from "next/image";

const SECTION_BG = "#ffffff";
const TITLE_COLOR = "#2E2F35";
const DESC_COLOR = "#58595D";

const IMAGES = [
  {
    src: "https://storage.googleapis.com/images_592/Figma%20design%20-%20New-Parent_1.png.png",
    alt: "Scholarship Scanner in action",
  },
  {
    src: "https://storage.googleapis.com/images_592/Figma%20design%20-%20New-Parent_1.spng.png",
    alt: "Scholarship Scanner example",
  },
];

export function ScholarshipScannerSeeInAction() {
  return (
    <section
      className="w-full min-w-0 overflow-x-hidden py-12 md:py-16"
      style={{ backgroundColor: SECTION_BG }}
      aria-label="See Awarded in action"
    >
      <div className="container mx-auto max-w-[1100px] px-4 md:px-6">
        <h2
          className="text-center text-[1.95rem] font-bold leading-tight tracking-tight md:text-[2.44rem]"
          style={{ color: TITLE_COLOR }}
        >
          See Awarded in Action
        </h2>
        <p
          className="mx-auto mt-2 max-w-[480px] text-center text-base md:text-lg"
          style={{ color: DESC_COLOR }}
        >
          Student money delivered right where you live; your texts.
        </p>

        <div className="mt-10 grid min-w-0 grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 md:gap-8">
          {IMAGES.map((img, i) => (
            <div key={i} className="relative min-h-[200px] w-full overflow-hidden rounded-2xl bg-white/50">
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={400}
                className="h-auto w-full object-contain"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
