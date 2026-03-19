"use client";

import Image from "next/image";

const PATHPICKER_LOGO_URL = "https://storage.googleapis.com/images_592/s2as.png";
const ARCHETYPE_QUIZ_URL = "http://my.pathpicker.com/archetype";
const ARCHETYPE_IMAGE_URL =
  "https://storage.googleapis.com/images_592/Untitled%20design%20(46).png";
const MONEY_NEWSLETTER_SIDEBAR_IMAGE_URL =
  "https://storage.googleapis.com/images_592/NY%20zeal%20(2).png";

const BEEHIIIV_EMBED_SCRIPT_SRC =
  "https://subscribe-forms.beehiiv.com/embed.js";
const BEEHIIIV_IFRAME_SRC =
  "https://subscribe-forms.beehiiv.com/eb92f42e-9785-4e9f-a35e-52a6a72d1b05";

export function DesktopBottomCta() {
  return (
    <section className="hidden w-full pt-12 lg:block">
      <div className="mx-auto w-full max-w-[1600px] px-4">
        <div
          className="relative overflow-hidden rounded-[30px] border-2 border-[#A084FF] shadow-[0_2px_0_rgba(15,23,42,0.06)]"
          style={{ backgroundColor: "#956EFE" }}
        >
          {/* Center badge between purple(left) and white(right) */}
          <div
            className="pointer-events-none absolute left-[calc(100%-52%)] top-1/2 z-10 flex h-[92px] w-[92px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_4px_45px_rgba(0,0,0,0.12)]"
            aria-hidden
          >
            <Image
              src={PATHPICKER_LOGO_URL}
              alt=""
              width={48}
              height={48}
              className="h-[48px] w-[48px] object-contain"
              unoptimized
            />
          </div>

          {/* Left (purple) + right (white) */}
          <div className="flex min-h-[411px] flex-row">
            <div className="flex flex-1 flex-col gap-4 border-r-2 border-[#A084FF] px-24 py-16">
              <div className="flex flex-col gap-6">
                <h3 className="text-2xl font-bold leading-tight tracking-tight text-white md:text-4xl">
                  📧 Student Money Newsletter
                </h3>
                <p className="max-w-[520px] text-base leading-relaxed text-white">
                  Get student scholarships, freebies, and exclusives sent directly to your email
                </p>

                <div>
                  <script async src={BEEHIIIV_EMBED_SCRIPT_SRC} />
                  <iframe
                    src={BEEHIIIV_IFRAME_SRC}
                    className="beehiiv-embed"
                    data-test-id="beehiiv-embed"
                    frameBorder={0}
                    scrolling="no"
                    style={{
                      width: "900px",
                      height: "187px",
                      margin: "0",
                      borderRadius: "0px 0px 0px 0px !important",
                      backgroundColor: "transparent",
                      boxShadow: "0 0 #0000",
                      maxWidth: "100%",
                    }}
                  ></iframe>
                </div>

              <div className="relative mx-auto w-full max-w-[520px] aspect-[4/3] -mt-3">
                <Image
                  src={MONEY_NEWSLETTER_SIDEBAR_IMAGE_URL}
                  alt=""
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              </div>
            </div>

            <div className="flex w-[52%] flex-col bg-white px-24 py-16">
              <div className="flex flex-col gap-6">
                <h3 className="text-2xl font-bold leading-tight tracking-tight text-[#181A1D] md:text-4xl">
                  🎭 Take the Archetype Quiz
                </h3>
                <p className="max-w-[520px] text-base leading-relaxed text-[#181A1D]">
                  40k+ Have taken the quiz. Which one are you?
                </p>
              </div>

              <div className="mt-10 flex items-center justify-start">
                <a
                  href={ARCHETYPE_QUIZ_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-20 min-w-[240px] items-center justify-center gap-2 rounded-[18px] border-2 border-[#181A1D] bg-[#956EFE] px-10 text-lg font-medium text-white shadow-[3px_3px_0_0_#181A1D] transition hover:opacity-95"
                >
                  <span>🎭</span>
                  Archetype Quiz
                </a>
              </div>

              <div className="relative mt-10 aspect-[4/3] w-full max-w-[520px] self-center">
                <Image
                  src={ARCHETYPE_IMAGE_URL}
                  alt=""
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

