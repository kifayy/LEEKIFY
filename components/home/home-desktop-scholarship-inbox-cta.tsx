"use client";

import Image from "next/image";

import { BeehiivEmbedIframe } from "@/components/beehiiv-embed-iframe";
import { BRAND_MEDIA } from "@/components/landing/constants";
import { BEEHIIV_SCHOLARSHIP_INBOX_EMBED_URL } from "@/lib/constants";

const NEWSLETTER_AVATAR_ALT = "PathPicker newsletter subscriber";

const AVATARS = BRAND_MEDIA.testimonialAvatars.slice(0, 4);

export function HomeDesktopScholarshipInboxCta() {
  return (
    <div className="flex min-w-0 flex-col items-stretch justify-center gap-4 px-4 pb-1 pt-4 sm:gap-5 sm:p-6 md:p-8 lg:flex-row lg:items-start lg:gap-6 lg:p-8 xl:gap-8 xl:p-10 2xl:p-12">
      <div className="min-w-0 text-center lg:mb-0 lg:max-w-sm lg:shrink-0 lg:pt-0.5 lg:text-left xl:max-w-md">
        <h3 className="font-[family-name:var(--font-poppins)] text-lg font-bold leading-snug tracking-tight text-[#181A1D] sm:text-xl lg:text-2xl">
          The student world has changed forever.
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base lg:mx-0 lg:mt-2 lg:text-lg">
          Get advice from top industry leaders, student news updates, and career insights in a world
          changed by AI.
        </p>
      </div>

      <div className="flex min-w-0 w-full max-w-xl shrink-0 justify-center lg:max-w-none lg:flex-1 lg:justify-start">
        <div className="flex w-full min-w-0 max-w-[20.5rem] flex-col items-center gap-3 sm:max-w-[24rem] sm:gap-3.5 md:max-w-[560px] lg:mx-0 lg:max-w-[560px] lg:items-stretch lg:gap-2">
          <div className="flex w-full flex-col items-center gap-2 sm:gap-2.5 lg:items-start lg:gap-1">
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 lg:justify-start">
              <div className="flex items-center pl-1 sm:pl-1.5 lg:pl-0">
                {AVATARS.map((src, index) => (
                  <Image
                    key={src}
                    src={src}
                    alt={NEWSLETTER_AVATAR_ALT}
                    width={28}
                    height={28}
                    className={`h-6 w-6 rounded-full border-2 border-[#EDE9FE] object-cover sm:h-7 sm:w-7 ${
                      index > 0 ? "-ml-1 sm:-ml-1.5" : ""
                    }`}
                    sizes="28px"
                  />
                ))}
              </div>
              <span className="inline-block bg-amber-300 px-1.5 py-0.5 font-mono text-xs font-bold tabular-nums text-neutral-900 sm:text-sm">
                100% free
              </span>
            </div>
            <p className="text-center text-sm font-bold text-[#181A1D] sm:text-base lg:text-left">
              20k+ Readers
            </p>
          </div>

          <div className="w-full shrink-0 lg:mt-0">
            <BeehiivEmbedIframe
              title="Subscribe to the Awarded newsletter"
              src={BEEHIIV_SCHOLARSHIP_INBOX_EMBED_URL}
              className="beehiiv-embed mx-auto block !h-[74px] !w-full max-w-full rounded-lg border-0 bg-transparent shadow-none sm:!h-[78px] md:!h-[82px] lg:mx-0"
              scrolling="no"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
