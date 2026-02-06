import { GraduationCap, Gem, Send } from "lucide-react";

const FEATURES = [
  {
    icon: GraduationCap,
    title: "Student Archetype",
    description:
      "Discover your unique student profile with our 16-type archetype system. Understand how you learn, lead, and succeed.",
    hasShadow: false,
  },
  {
    icon: Gem,
    title: "Scholarship Matches",
    description:
      "Get matched to scholarships that fit your profile. We surface opportunities from 1000+ brands tailored to you.",
    hasShadow: true,
  },
  {
    icon: Send,
    title: "Quick Apply",
    description:
      "Apply to scholarships faster with streamlined forms. Many no-essay options available for quick wins.",
    hasShadow: false,
  },
];

export function FeaturesSection() {
  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[244px_1fr] lg:gap-16">
          {/* Left: Header - Frame 48095467 */}
          <div className="flex flex-col gap-6">
            <p
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "#F85E9F" }}
            >
              What we serve
            </p>
            <h2 className="text-2xl font-bold leading-tight text-[#252B42] md:text-3xl">
              Top Values For You
            </h2>
            <p
              className="max-w-[244px] text-sm leading-relaxed"
              style={{ color: "rgba(25, 24, 37, 0.75)" }}
            >
              We help students find scholarships, unlock their archetype, and get on a financial roadmap that works.
            </p>
          </div>

          {/* Right: Feature cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`flex flex-col gap-6 rounded-[9px] p-0 ${
                    feature.hasShadow
                      ? "shadow-[0_14px_21px_rgba(0,0,0,0.07)]"
                      : ""
                  }`}
                >
                  <div className="flex h-[86px] w-[112px] items-center justify-center rounded-lg bg-[#F7F7F7]">
                    <Icon className="h-10 w-10 text-[#5D50C6]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-[#252B42] md:text-xl">
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(25, 24, 37, 0.75)" }}
                  >
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
