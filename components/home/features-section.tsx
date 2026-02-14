import Image from "next/image";

// Feature cards for "What's PathPicker?" section
const FEATURES = [
  {
    image: "https://storage.googleapis.com/images_592/woman_2154545.png",
    title: "Student Archetype",
    description:
      "Discover your type with our 16‑archetype system. See how you study and rank.",
  },
  {
    image: "https://storage.googleapis.com/images_592/flying-money_3141991%20(2).png",
    title: "Scholarship Matches",
    description:
      "Get scholarships that match your profile and goals. We pull from 1,000+ partners.",
  },
  {
    image: "https://storage.googleapis.com/images_592/laptop_10733804.png",
    title: "Student Tips",
    description:
      "Many paths exist for high school and college. We help you find ones that save money.",
  },
];

export function FeaturesSection() {
  return (
    <section className="w-full min-w-0 overflow-x-hidden bg-white pt-4 pb-10 md:pt-8 md:pb-16">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 min-w-0">
        <div className="grid min-w-0 grid-cols-1 gap-8 md:gap-10 lg:grid-cols-[244px_1fr_1fr_1fr] lg:gap-16">
          {/* Left: Header - Frame 48095467 */}
          <div className="flex flex-col items-center gap-4 text-center md:items-start md:gap-6 md:text-left lg:col-span-1">
            <p
              className="text-sm font-bold uppercase tracking-wider"
              style={{ color: "#956EFE" }}
            >
              What's PathPicker?
            </p>
            <h2 className="hidden text-xl font-bold leading-tight text-[#181A1D] md:block md:text-3xl">
              It's simple
            </h2>
            <p
              className="max-w-full text-sm font-normal leading-relaxed md:max-w-[244px]"
              style={{ color: "rgba(25, 24, 37, 0.75)" }}
            >
              Our algorithm scans your answers across various quizzes to help you learn more about yourself as a student... guiding you toward the path your future self will thank you for. Oh ya, we match you with scholarships along the way.
            </p>
          </div>

          {/* Right: Feature cards - vertical stack on mobile/sm; on lg all three in one row */}
          <div className="grid min-w-0 grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:col-span-3 lg:grid-cols-3 lg:gap-8">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center gap-3 text-center"
              >
                <div className="flex min-h-[86px] min-w-0 items-center justify-center">
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
                </div>
                <h3 className="min-w-0 break-words text-lg font-bold leading-tight text-[#181A1D] lg:text-xl">
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
