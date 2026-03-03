/**
 * "How it works" section for Scholarship Scanner page — 3-step cards (Ollie-style).
 * Renders below the "Our algorithm scans 1,000+" text.
 */

const SECTION_BG = "#d8d8ff";
const TITLE_COLOR = "#2E2F35";
const DESC_COLOR = "#58595D";
const STEP_CIRCLE_BG = "#fff";
const STEP_CIRCLE_BORDER = "#E6E6E7";

const STEPS = [
  {
    step: 1,
    emoji: "🎯",
    title: "Student money that matches you",
    description:
      "We scan thousands of scholarships, brand giveaways, and exclusive student deals every week, then check them against your profile so you only see offers you actually qualify for.",
    cardBg: "#FEF08A", // yellow
  },
  {
    step: 2,
    emoji: "🎓",
    title: "Built for high school and college students",
    description:
      "Whether you're in high school or college, we tailor matches based on your interests, goals, and student status.",
    cardBg: "#FBCFE8", // pink
  },
  {
    step: 3,
    emoji: "✏️",
    title: "Update your matches anytime",
    description:
      "Want different types of opportunities? Just reply EDIT and adjust how we scan for scholarships, brand perks, and student deals for you.",
    cardBg: "#BFDBFE", // light blue
  },
];

export function ScholarshipScannerHowItWorks() {
  return (
    <section
      className="w-full min-w-0 overflow-x-hidden py-12 md:py-16"
      style={{ backgroundColor: SECTION_BG }}
      aria-label="How the scanner works"
    >
      <div className="container mx-auto max-w-[1100px] px-4 md:px-6">
        <h2
          className="text-center text-[1.95rem] font-bold leading-tight tracking-tight md:text-[2.44rem]"
          style={{ color: TITLE_COLOR }}
        >
          How the scanner works
        </h2>
        <p
          className="mx-auto mt-2 max-w-[480px] text-center text-base md:text-lg"
          style={{ color: DESC_COLOR }}
        >
          Our AI algorithm searches thousands of websites to find scholarships, and free stuff your student profile matches with.
        </p>

        <div className="mt-10 grid min-w-0 grid-cols-1 gap-6 md:mt-12 md:grid-cols-3 md:gap-8">
          {STEPS.map((item) => (
            <div
              key={item.step}
              className="flex flex-col rounded-2xl p-6 text-left transition-transform duration-200 ease-out hover:scale-105 md:p-8"
              style={{ backgroundColor: item.cardBg }}
            >
              <div
                className="mb-4 flex justify-start md:justify-center md:mb-5"
                aria-hidden
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 text-2xl md:h-14 md:w-14 md:text-3xl"
                  style={{
                    backgroundColor: STEP_CIRCLE_BG,
                    borderColor: STEP_CIRCLE_BORDER,
                    color: TITLE_COLOR,
                  }}
                >
                  {item.emoji}
                </span>
              </div>
              <h3
                className="text-[1.46rem] font-bold leading-tight md:text-[1.625rem]"
                style={{ color: TITLE_COLOR }}
              >
                {item.title}
              </h3>
              <p
                className="mt-3 text-sm leading-relaxed md:text-base"
                style={{ color: DESC_COLOR }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
