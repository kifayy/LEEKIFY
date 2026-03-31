"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { WhatsPathPickerWidget } from "@/components/home/whats-pathpicker-widget";

// Tools cards inspired by external "Tools for every step of your journey" section
const TOOLS = [
  {
    href: "/colleges",
    title: "What's your student archetype?",
    description:
      "Uncover your strengths, style, and where you stand among other students.",
    image:
      "https://storage.googleapis.com/images_592/Untitled%20design%20(46).png",
    accentColor: "#FACC15", // yellow
  },
  {
    href: "/scholarships",
    title: "What colleges do you match with?",
    description:
      "Get matched with schools where you belong socially and academically.",
    image:
      "https://storage.googleapis.com/images_592/Untitled%20design%20(47).png",
    accentColor: "#FB923C", // orange
  },
  {
    href: "/virtual-college-tours",
    title: "Can you win scholarships?",
    description:
      "Use our iOS app to find scholarships you actually qualify for.",
    image:
      "https://storage.googleapis.com/images_592/Untitled%20design%20(44).png",
    accentColor: "#A855F7", // purple
  },
  {
    href: "/guidance/majors-degrees",
    title: "Where Should You Study Abroad?",
    description:
      "See what countries, cities, and programs you would thrive in studying abroad.",
    image:
      "https://storage.googleapis.com/images_592/Untitled%20design%20(45).png?v=20260318",
    accentColor: "#14B8A6", // teal
  },
];

export function FeaturesSection() {
  const [comingSoonOpen, setComingSoonOpen] = useState(false);

  // External destinations for the four home "Tools" cards.
  const ARCHETYPE_URL = "https://my.pathpicker.com/archetype";
  const APP_STORE_AWARDED_URL =
    "https://apps.apple.com/us/app/awarded-win-scholarships/id6749553938";

  // Basic escape-key handling for the "Coming soon" popup.
  useEffect(() => {
    if (!comingSoonOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setComingSoonOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [comingSoonOpen]);

  const SHOW_WHATS_PATHPICKER_WIDGET = false;

  return (
    <section className="w-full min-w-0 overflow-x-hidden bg-white pt-4 pb-10 md:pt-8 md:pb-16">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 min-w-0">
        {/* Saved for later: "What's PathPicker?" widget (disabled for now) */}
        {SHOW_WHATS_PATHPICKER_WIDGET ? <WhatsPathPickerWidget /> : null}

        {/* Tools section from external site, styled to match PathPicker */}
        <div className="border-t border-slate-200 pt-10">
          <span className="mb-1 block w-full text-center text-base font-semibold leading-snug text-[#956EFE] sm:text-lg lg:text-left">
            Student Discovery Engine
          </span>
          <h2 className="text-center text-xl font-bold leading-tight text-[#181A1D] md:text-3xl">
            What{" "}
            <span className="relative inline-block">
              <span className="relative z-10">path</span>
              <span className="absolute inset-x-0 bottom-0 h-1 rounded-full bg-[#956EFE]/40" />
            </span>{" "}
            do you want to explore?
          </h2>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {TOOLS.map((tool) => {
              const isStudyAbroadComingSoon = tool.href === "/guidance/majors-degrees";

              const resolvedHref =
                tool.href === "/colleges" || tool.href === "/scholarships"
                  ? ARCHETYPE_URL
                  : tool.href === "/virtual-college-tours"
                    ? APP_STORE_AWARDED_URL
                    : tool.href;

              const resolvedTarget = resolvedHref.startsWith("http") ? "_blank" : undefined;
              const resolvedRel = resolvedHref.startsWith("http") ? "noopener noreferrer" : undefined;

              return (
                <div key={tool.title} className="relative">
                {/* Colored offset card behind */}
                <div
                  className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 rounded-3xl"
                  style={{ backgroundColor: tool.accentColor }}
                  aria-hidden="true"
                />

                {/* Foreground white fun-card */}
                {isStudyAbroadComingSoon ? (
                  <button
                    type="button"
                    className="relative z-10 flex h-full flex-col justify-between rounded-3xl bg-white p-6 text-left shadow-[0_18px_40px_rgba(35,57,91,0.12)] transition-transform transition-shadow hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(35,57,91,0.18)]"
                    onClick={() => setComingSoonOpen(true)}
                  >
                    <div className="flex flex-col gap-3">
                      <h3 className="text-base font-bold leading-tight text-[#181A1D] md:text-lg">
                        {tool.title}
                      </h3>
                      <p
                        className="text-sm font-normal leading-relaxed"
                        style={{ color: "rgba(25, 24, 37, 0.75)" }}
                      >
                        {tool.description}
                      </p>
                    </div>

                    {/* Media image */}
                    {tool.image && (
                      <div className="mt-4 overflow-hidden rounded-2xl">
                        <Image
                          src={tool.image}
                          alt=""
                          width={481}
                          height={270}
                          className="h-full w-full object-cover"
                          unoptimized
                        />
                      </div>
                    )}

                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#181A1D]">
                      Explore
                      <span className="ml-1 text-lg leading-none">→</span>
                    </span>
                  </button>
                ) : (
                  <Link
                    href={resolvedHref}
                    target={resolvedTarget}
                    rel={resolvedRel}
                    className="relative z-10 flex h-full flex-col justify-between rounded-3xl bg-white p-6 text-left shadow-[0_18px_40px_rgba(35,57,91,0.12)] transition-transform transition-shadow hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(35,57,91,0.18)]"
                  >
                    <div className="flex flex-col gap-3">
                      <h3 className="text-base font-bold leading-tight text-[#181A1D] md:text-lg">
                        {tool.title}
                      </h3>
                      <p
                        className="text-sm font-normal leading-relaxed"
                        style={{ color: "rgba(25, 24, 37, 0.75)" }}
                      >
                        {tool.description}
                      </p>
                    </div>

                    {/* Media image */}
                    {tool.image && (
                      <div className="mt-4 overflow-hidden rounded-2xl">
                        <Image
                          src={tool.image}
                          alt=""
                          width={481}
                          height={270}
                          className="h-full w-full object-cover"
                          unoptimized
                        />
                      </div>
                    )}

                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#181A1D]">
                      Explore
                      <span className="ml-1 text-lg leading-none">→</span>
                    </span>
                  </Link>
                )}
              </div>
              );
            })}
          </div>
        </div>

        {/* Coming soon popup for "Study Abroad" */}
        {comingSoonOpen && (
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Coming soon"
            onClick={() => setComingSoonOpen(false)}
          >
            <div
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.25)]"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-[#181A1D]">Coming soon!</h3>
              <p className="mt-2 text-sm text-[#525252]">
                We&apos;re working on this feature. Check back soon.
              </p>
              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-[#956EFE] px-5 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(149,110,254,0.25)] transition hover:opacity-95 active:scale-[0.98]"
                  onClick={() => setComingSoonOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
