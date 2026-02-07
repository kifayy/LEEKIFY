import Image from "next/image";

const FEATURES = [
  {
    image: "https://storage.googleapis.com/images_592/woman_2154545.png",
    title: "Student Archetype",
    description:
      "Find your archetype type with our 16‑archetype system. See how you study, rank against others, and what your answers say about you.",
  },
  {
    image: "https://storage.googleapis.com/images_592/flying-money_3141991%20(2).png",
    title: "Scholarship Matches",
    description:
      "See scholarships that fit your archetype, goals, and background. We pull options from 1,000+ partners so you're not stuck scrolling random lists.",
  },
  {
    image: "https://storage.googleapis.com/images_592/laptop_10733804.png",
    title: "Student Tips",
    description:
      "There's a million paths that you can take as a high school and college student. We help you find the ones that save you the most money, while fulfilling your goals.",
  },
];

export function FeaturesSection() {
  return (
    <section className="w-full overflow-x-hidden bg-white py-10 md:py-16">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid min-w-0 grid-cols-1 gap-8 md:gap-10 lg:grid-cols-[244px_1fr] lg:gap-16">
          {/* Left: Header - Frame 48095467 */}
          <div className="flex flex-col items-center gap-4 text-center md:items-start md:gap-6 md:text-left">
            <p
              className="text-sm font-bold uppercase tracking-wider"
              style={{ color: "#956EFE" }}
            >
              What's PathPicker?
            </p>
            <h2 className="text-xl font-bold leading-tight text-[#181A1D] md:text-3xl">
              It's simple
            </h2>
            <p
              className="max-w-full text-sm font-normal leading-relaxed md:max-w-[244px]"
              style={{ color: "rgba(25, 24, 37, 0.75)" }}
            >
              PathPicker helps you uncover who you are as a student, match to the right scholarships, and keeps you on the right path as a student.
            </p>
          </div>

          {/* Right: Feature cards - top-aligned so shorter copy doesn't leave empty space */}
          <div className="grid min-w-0 grid-cols-1 items-start gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
            {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="flex min-w-0 flex-col items-center gap-6 rounded-[9px] p-0 text-center md:items-start md:text-left"
                >
                  <div className="relative flex h-[86px] w-[112px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
                    <Image
                      src={feature.image}
                      alt=""
                      width={112}
                      height={86}
                      className="h-full w-full object-contain"
                      unoptimized
                    />
                  </div>
                  <h3 className="min-w-0 break-words text-lg font-bold text-[#181A1D] md:text-xl">
                    {feature.title}
                  </h3>
                  <p
                    className="min-w-0 text-sm font-normal leading-relaxed"
                    style={{ color: "rgba(25, 24, 37, 0.75)" }}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
