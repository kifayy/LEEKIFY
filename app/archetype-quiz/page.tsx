import Link from "next/link";
import Image from "next/image";

const TEXT_DARK = "#2E2F35";   // 208:54, 208:59, 208:65, 208:68
const TEXT_MUTED = "#58595D";  // 208:56, 208:60, 208:66
const CARD_BORDER = "rgba(25, 24, 37, 0.1)";
const ACCENT_PURPLE = "#956efe";
const CARD_DARK = "#191825";
const HERO_BG_IMAGE =
  "https://storage.googleapis.com/images_592/13.%20Online%20Fof2rum.png";
/** Mobile-only image under Take quiz */
const HERO_MOBILE_IMAGE =
  "https://storage.googleapis.com/images_592/13.%20Online%20Fosrum.png";

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
        loading="lazy"
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
        className="relative w-full min-w-0 overflow-hidden bg-white min-h-0 md:min-h-[720px] lg:min-h-[860px]"
        aria-label="Archetype Quiz"
      >
        {/* Hero image – desktop only; hidden on mobile so layout stays clean */}
        <div className="pointer-events-none absolute inset-0 z-0 hidden md:block" aria-hidden>
          <Image
            src={HERO_BG_IMAGE}
            alt=""
            fill
            className="object-contain object-[78%_50%] scale-90"
            sizes="100vw"
            priority
          />
        </div>
        {/* div#w-node-... 208:41 – container 1290px, padding from frame */}
        <div
          className="relative z-10 mx-auto flex min-w-0 max-w-[1290px] flex-col px-4 pt-12 pb-0 sm:px-10 md:px-[75px] md:pt-16 md:pb-8 lg:flex-row lg:items-start lg:gap-8 lg:pb-12"
          style={{ maxWidth: 1290 }}
        >
          {/* Logo carousel – at top, left side */}
          <div className="order-1 lg:order-1 lg:flex lg:flex-col lg:gap-10 lg:min-w-0 lg:flex-1">
            <div className="marquee-fade-edges mx-auto max-w-[min(100%,520px)] overflow-hidden py-1 md:mx-0 md:mr-auto md:py-2 lg:mx-0 md:hidden">
              <div className="flex w-max items-center animate-archetype-hero-marquee">
                {[...HERO_LOGOS, ...HERO_LOGOS].map((src, i) => (
                  <HeroLogoSlot key={i} src={src} />
                ))}
              </div>
            </div>

            {/* Content column – heading, subtext, button (button directly under subtext) */}
            <div className="order-2 mt-6 flex min-w-0 flex-1 flex-col gap-6 lg:mt-0 lg:max-w-[620px]">
              <h2
                className="max-w-[620px] text-[1.85rem] font-bold leading-tight tracking-tight md:text-[3.25rem] lg:text-[3.75rem] lg:max-w-[680px]"
                style={{ color: TEXT_DARK }}
              >
                Find your
                <br />
                <span className="whitespace-nowrap" style={{ color: ACCENT_PURPLE }}>student archetype.</span>
              </h2>
              <p
                className="max-w-[556px] text-base leading-relaxed md:text-lg"
                style={{ color: TEXT_MUTED }}
              >
                Take our archetype quiz to reveal your student persona, social habits, and other personality traits that fit one of our 16 archetypes.
              </p>
              <Link
                href="https://my.pathpicker.com/archetype"
                target="_blank"
                rel="noopener noreferrer"
                className="self-start inline-flex h-[5.6rem] w-fit min-w-[240px] max-w-full items-center justify-center rounded-[15px] border-2 bg-white px-6 text-2xl font-medium shadow-[3px_3px_0_0_#2E2F35] transition hover:opacity-95 md:h-[5.6rem] md:min-w-[280px]"
                style={{ borderColor: TEXT_DARK, color: TEXT_DARK }}
              >
                🎭 Take quiz
              </Link>
              {/* Mobile only: image under Take quiz – 20% bigger, extra space from button */}
              <div className="relative mt-8 w-[120%] max-w-none md:hidden mx-auto aspect-[16/10] overflow-visible" style={{ marginLeft: '-10%' }}>
                <Image
                  src={HERO_MOBILE_IMAGE}
                  alt=""
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 120vw, 0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Your Student Archetype – white card */}
      <section className="px-4 pt-0 pb-10 md:pt-0 md:pb-14" aria-label="Discover your student archetype">
        <div className="mx-auto max-w-[1160px] rounded-[30px] bg-white px-4 py-12 md:px-10 md:py-14">
          {/* Desktop: two-column — text left, cards right. Mobile: stacked, centered */}
          <div className="md:flex md:items-start md:gap-12 lg:gap-16">
            <div className="md:flex-shrink-0 md:max-w-[380px] lg:max-w-[420px]">
              <h2 className="text-center text-xl font-bold text-black md:text-left md:text-2xl lg:text-3xl">
                Discover Your <span style={{ color: ACCENT_PURPLE }}>Student Archetype</span> & See How You Stack Up
              </h2>
              <p className="mx-auto mt-6 max-w-[675px] text-center text-sm leading-relaxed text-[#090808] md:mx-0 md:text-left md:text-base">
                Ever wonder what type of student you really are? Take our 2-minute quiz to unlock your unique Student Archetype based on your personality, habits, and goals—then see how you rank against thousands of other students just like you.
              </p>
            </div>
            <div className="mt-10 flex flex-1 flex-col gap-10 md:mt-0 md:flex-row md:flex-wrap md:justify-end md:gap-8 lg:gap-12">
              {ARCHETYPE_FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="flex w-full flex-1 flex-col gap-[15.5px] rounded-[31px] border bg-white px-7 py-8 md:min-w-[260px] md:max-w-[320px]"
                  style={{
                    borderColor: CARD_BORDER,
                    borderWidth: 1,
                  }}
                >
                  <span
                    className="text-3xl md:text-4xl"
                    style={{ color: ACCENT_PURPLE }}
                    aria-hidden
                  >
                    {feature.emoji}
                  </span>
                  <h3
                    className="text-base font-bold md:text-lg"
                    style={{ color: CARD_DARK }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: CARD_DARK }}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Desktop only: logo marquee above bottom Take quiz CTA */}
      <div className="hidden md:flex md:justify-center mx-auto max-w-[1160px] mb-8 px-4">
        <div className="marquee-fade-edges overflow-hidden py-2 w-full max-w-[520px]">
          <div className="flex w-max items-center animate-archetype-hero-marquee">
            {[...HERO_LOGOS, ...HERO_LOGOS].map((src, i) => (
              <HeroLogoSlot key={`cta-${i}`} src={src} />
            ))}
          </div>
        </div>
      </div>

      {/* Take quiz CTA – duplicate of hero button, centered */}
      <div className="flex justify-center px-4 py-10 md:py-14">
        <Link
          href="https://my.pathpicker.com/archetype"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-[4.5rem] min-w-[280px] max-w-full items-center justify-center rounded-[18px] border-[3px] bg-white px-8 text-2xl font-semibold shadow-[4px_4px_0_0_#2E2F35] transition hover:opacity-95 md:h-[5.5rem] md:min-w-[320px] md:px-10 md:text-3xl"
          style={{ borderColor: TEXT_DARK, color: TEXT_DARK }}
        >
          🎭 Take quiz
        </Link>
      </div>
    </div>
  );
}
