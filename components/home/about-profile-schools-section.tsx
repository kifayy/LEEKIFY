import Image from "next/image";

const PUBLISHED_ON_BANNER_URL =
  "https://storage.googleapis.com/images_592/chicago%20(1).png";

export function AboutProfileSchoolsSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full scroll-mt-8 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-10 md:pt-10 md:pb-14 lg:pt-12 lg:pb-16">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 w-full md:mb-8" role="group" aria-label="Published on">
            <Image
              src={PUBLISHED_ON_BANNER_URL}
              alt="Published on The Reportly, NY Zeal, and WhoChicago"
              width={1000}
              height={500}
              className="mx-auto block h-auto w-[52%] md:w-[40%]"
              sizes="(max-width: 767px) 52vw, (max-width: 1600px) 40vw, 640px"
            />
          </div>
          <h2
            id="about-heading"
            className="max-w-[min(100%,20ch)] font-[family-name:var(--font-poppins)] text-3xl font-bold leading-[1.1] tracking-tight text-[#181A1D] sm:max-w-none sm:text-4xl md:max-w-5xl md:text-5xl lg:text-[3.5rem]"
          >
            Never Wonder If You Picked The{" "}
            <span className="text-[#956EFE]">Wrong School</span>
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600 md:mt-4 md:max-w-2xl md:text-lg">
            Make one of the biggest decisions of your life with more confidence and less doubt.
          </p>
        </div>
      </div>
    </section>
  );
}