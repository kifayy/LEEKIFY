import Link from "next/link";
import Image from "next/image";
import { PhoneCtaSection } from "@/components/phone-cta";

const SECTION_BG = "#E3F8F8";
const TEXT_DARK = "#2E2F35";   // 208:54, 208:59, 208:65, 208:68
const TEXT_MUTED = "#58595D";  // 208:56, 208:60, 208:66
const HERO_IMAGE_RIGHT =
  "https://storage.googleapis.com/images_592/fasdf22.png";

const GREEKER_URL = "https://storage.googleapis.com/images_592/Greeker%20(3).png";
const HERO_LOGOS = [
  "https://storage.googleapis.com/images_592/P1laceholder%20Logo%404x.png",
  "https://storage.googleapis.com/images_592/Placeholder%20Log7o%404x.png",
  "https://storage.googleapis.com/images_592/Placeholder%20Logo%404x.png",
  GREEKER_URL,
];

function HeroLogoSlot({ src }: { src: string }) {
  const isGreeker = src === GREEKER_URL;
  return (
    <div
      className={`flex shrink-0 items-center justify-center px-3 md:px-4 ${isGreeker ? "pt-[0.4rem]" : ""}`}
    >
      <Image
        src={src}
        alt=""
        width={isGreeker ? 180 : 160}
        height={isGreeker ? 108 : 96}
        className={
          isGreeker
            ? "h-[4.5rem] w-auto object-contain md:h-[5.25rem]"
            : "h-16 w-auto object-contain md:h-[5rem]"
        }
        unoptimized
      />
    </div>
  );
}

const ARCHETYPE_FEATURES = [
  {
    emoji: "🎯",
    title: "Know Your Type",
    description:
      "Get matched to 1 of 16 unique Student Archetypes that reveals your strengths, study style, and what makes you different from the rest.",
  },
  {
    emoji: "⚡",
    title: "Instant Results",
    description:
      "Tap through quick questions and get your archetype in seconds, not hours. No overthinking required.",
  },
  {
    emoji: "📊",
    title: "Compare Your Rank",
    description:
      "See exactly where you stand compared to thousands of other students. Are you rare? Common? A partier? Find out.",
  },
  {
    emoji: "🔔",
    title: "Track Your Growth",
    description:
      "Retake the quiz anytime to see how you evolve. Get notified when new insights or archetype updates drop.",
  },
];

export const metadata = {
  title: "Archetype Quiz | Pathpicker",
  description:
    "Discover your archetype. Quick, fun quiz. Join thousands of students.",
};

export default function ArchetypeQuizPage() {
  return (
    <div className="min-w-0 overflow-x-hidden">
      {/* Section 208:40 – Figma section */}
      <section
        className="w-full min-w-0"
        style={{ backgroundColor: SECTION_BG }}
        aria-label="Archetype Quiz"
      >
        {/* div#w-node-... 208:41 – container 1290px, padding from frame */}
        <div
          className="mx-auto flex min-w-0 max-w-[1290px] flex-col px-4 pt-12 pb-0 sm:px-10 md:px-[75px] md:pt-16 md:pb-0"
          style={{ maxWidth: 1290 }}
        >
          {/* Main row – content left + image right (archetype layout); below logo carousel on desktop */}
          <div className="order-2 mt-6 flex min-w-0 flex-col gap-10 md:mt-0 lg:flex-row lg:items-start lg:gap-0">
            {/* Content column – left on desktop */}
            <div className="flex min-w-0 flex-1 flex-col gap-9 lg:pr-12 lg:order-1">
              {/* 208:54 – intro text (title-style like home hero, 20% larger) */}
              <h2
                className="max-w-[565px] text-[2.1rem] font-bold leading-tight tracking-tight md:text-[2.25rem] lg:text-[2.7rem]"
                style={{ color: TEXT_DARK }}
              >
                Find your student archetype.
              </h2>

              {/* Take quiz button – under title on mobile only */}
              <Link
                href="https://my.pathpicker.com/archetype"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[5.6rem] min-w-[263px] max-w-full items-center justify-center rounded-[15px] border-2 bg-white px-11 text-2xl font-medium shadow-[3px_3px_0_0_#2E2F35] transition hover:opacity-95 md:hidden"
                style={{ borderColor: TEXT_DARK, color: TEXT_DARK }}
              >
                💸 Take quiz
              </Link>

              {/* 208:55 – block: CTA copy + stats + button, itemSpacing 48 */}
              <div className="flex flex-col gap-12">
                {/* 208:56 */}
                <p
                  className="max-w-[556px] text-base leading-relaxed md:text-lg"
                  style={{ color: TEXT_MUTED }}
                >
                  Take our 16-question archetype quiz to reveal your student persona, social habits, and financial cheat codes built for your student profile.
                </p>

                {/* 208:67 – CTA link: 2x size, hidden on mobile (button under title there) */}
                <Link
                  href="https://my.pathpicker.com/archetype"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden min-w-fit items-center justify-center rounded-[15px] border-2 bg-white px-11 text-2xl font-medium shadow-[3px_3px_0_0_#2E2F35] transition hover:opacity-95 md:inline-flex md:h-[5.6rem] md:min-w-[263px]"
                  style={{ borderColor: TEXT_DARK, color: TEXT_DARK }}
                >
                  💸 Take quiz
                </Link>
              </div>
            </div>

            {/* Hero image – right on desktop */}
            <div className="relative order-2 flex min-h-[280px] w-full min-w-0 shrink-0 items-center sm:min-h-[340px] lg:order-2 lg:max-w-[613px] lg:min-h-[502px] lg:basis-[613px]">
              <div className="relative aspect-[613/601.5] w-full max-w-[613px]">
                <Image
                  src={HERO_IMAGE_RIGHT}
                  alt=""
                  fill
                  className="object-contain object-center"
                  sizes="(min-width: 1024px) 613px, 100vw"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Logo carousel – 3 visible at a time, at top on desktop */}
          <div className="order-1 md:mt-2">
            <div className="marquee-fade-edges mx-auto max-w-[min(100%,520px)] overflow-hidden py-1 md:py-2">
              <div className="flex w-max items-center animate-archetype-hero-marquee">
                {[...HERO_LOGOS, ...HERO_LOGOS].map((src, i) => (
                  <HeroLogoSlot key={i} src={src} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Your Student Archetype – white card */}
      <section className="px-4 pt-0 pb-10 md:pt-0 md:pb-14" aria-label="Discover your student archetype">
        <div className="mx-auto max-w-[1160px] rounded-[30px] bg-white px-4 py-12 md:px-10 md:py-14">
          <h2 className="text-center text-xl font-bold text-black md:text-2xl lg:text-3xl">
            Discover Your Student Archetype & See How You Stack Up
          </h2>
          <p className="mx-auto mt-6 max-w-[675px] text-center text-sm leading-relaxed text-[#090808] md:text-base">
            Ever wonder what type of student you really are? Take our 2-minute quiz to unlock your unique Student Archetype based on your personality, habits, and goals—then see how you rank against thousands of other students just like you.
          </p>
          <div className="mt-10 flex flex-col gap-10 md:mt-14 md:flex-row md:flex-wrap md:justify-center md:gap-8 lg:gap-12">
            {ARCHETYPE_FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-1 flex-col items-center text-center md:min-w-[260px] md:max-w-[310px]"
              >
                <span className="flex h-[53px] w-[52px] shrink-0 items-center justify-center text-3xl" aria-hidden>
                  {feature.emoji}
                </span>
                <h3 className="mt-4 text-base font-bold text-black md:text-lg">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-black md:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PhoneCtaSection />

      {/* Take quiz CTA – duplicate of hero button, centered, larger */}
      <div className="flex justify-center px-4 py-10 md:py-14">
        <Link
          href="https://my.pathpicker.com/archetype"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-[4.5rem] min-w-[320px] max-w-full items-center justify-center rounded-[18px] border-[3px] bg-white px-14 text-2xl font-semibold shadow-[4px_4px_0_0_#2E2F35] transition hover:opacity-95 md:h-[5.5rem] md:min-w-[380px] md:px-16 md:text-3xl"
          style={{ borderColor: TEXT_DARK, color: TEXT_DARK }}
        >
          💸 Take quiz
        </Link>
      </div>
    </div>
  );
}
