"use client";

import { DiscoveryCardLottie } from "@/components/home/discovery-card-lottie";
import { WhatsPathPickerWidget } from "@/components/home/whats-pathpicker-widget";

const DISCOVERY_CARDS = [
  {
    title: "Commit With Zero Regrets",
    description:
      "Most students feel doubt after choosing a school. We eliminate that. When you commit, you'll know, not hope if it's the right fit.",
    lottieSrc: "/animations/meditating-brain.lottie",
    accentColor: "#FACC15",
  },
  {
    title: "Clarity in Minutes, Not Months",
    description:
      "No endless campus visits or stressful nights researching. Answer a few questions and get your personalized college fit scores instantly.",
    lottieSrc: "/animations/time.lottie",
    accentColor: "#FB923C",
  },
  {
    title: "40,000 Students Can't Be Wrong",
    description:
      "98% of our students committed to one of their top matches after seeing their results.",
    lottieSrc: "/animations/champion.lottie",
    accentColor: "#A855F7",
  },
] as const;

export function FeaturesSection() {
  const SHOW_WHATS_PATHPICKER_WIDGET = false;

  return (
    <section
      id="student-discovery-tools"
      className="w-full min-w-0 scroll-mt-28 overflow-x-hidden bg-white pt-4 pb-10 md:pt-8 md:pb-16"
      aria-label="How PathPicker helps you choose"
    >
      <div className="container mx-auto max-w-6xl min-w-0 px-4 md:px-6">
        {SHOW_WHATS_PATHPICKER_WIDGET ? <WhatsPathPickerWidget /> : null}

        <div className="border-t border-slate-200 pt-10">
          <div className="grid gap-8 md:grid-cols-3">
            {DISCOVERY_CARDS.map((card, index) => (
              <div
                key={card.title}
                className={`relative ${index === 0 ? "scroll-mt-28" : ""}`}
                id={index === 0 ? "commit-with-zero-regrets" : undefined}
              >
                <div
                  className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 rounded-3xl"
                  style={{ backgroundColor: card.accentColor }}
                  aria-hidden
                />
                <div className="relative z-10 flex h-full flex-col justify-between rounded-3xl bg-white p-6 text-left shadow-[0_18px_40px_rgba(35,57,91,0.12)]">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-base font-bold leading-tight text-[#181A1D] md:text-lg">
                      {card.title}
                    </h3>
                    <p className="text-sm font-normal leading-relaxed text-[rgba(25,24,37,0.75)]">
                      {card.description}
                    </p>
                  </div>
                  <div className="mt-4">
                    <DiscoveryCardLottie src={card.lottieSrc} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
