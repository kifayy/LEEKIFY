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

          {/* Right: Feature cards - rows for icons, titles, descriptions so they line up in columns */}
          <div className="grid min-w-0 grid-cols-1 items-start gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-[86px_auto_auto] lg:gap-x-6 lg:gap-y-4">
            {/* Row 1: icons - fixed height so title row starts at same place */}
            {FEATURES.map((feature) => (
              <div
                key={`${feature.title}-icon`}
                className="flex min-h-[86px] min-w-0 items-center justify-center md:justify-start"
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
              </div>
            ))}
            {/* Row 2: titles - aligned to top of row */}
            {FEATURES.map((feature) => (
              <h3
                key={`${feature.title}-title`}
                className="min-w-0 break-words pt-0 text-center text-lg font-bold leading-tight text-[#181A1D] md:text-left md:text-xl"
              >
                {feature.title}
              </h3>
            ))}
            {/* Row 3: descriptions - aligned to top of row */}
            {FEATURES.map((feature) => (
              <p
                key={`${feature.title}-desc`}
                className="min-w-0 text-center text-sm font-normal leading-relaxed md:text-left"
                style={{ color: "rgba(25, 24, 37, 0.75)" }}
              >
                {feature.description}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
