"use client";

import { Star } from "lucide-react";

const BEEHIIV_EMBED_URL =
  "https://subscribe-forms.beehiiv.com/22508440-48d4-4c89-845f-6e9406a7b6d2";

export function NewsletterWidget() {
  return (
    <div
      className="relative flex min-w-0 flex-col gap-6 rounded-[24px] border-2 bg-white px-4 py-8 md:flex-row md:items-center md:justify-center md:gap-8 md:rounded-[30px] md:px-16 md:py-16"
      style={{ borderColor: "rgba(149, 110, 254, 0.4)" }}
    >
      <div className="order-1 flex min-w-0 flex-1 flex-col gap-4 md:max-w-[450px] md:flex-shrink-0 md:order-1">
        <div className="inline-flex w-fit items-center gap-2">
          <div className="flex gap-0.5 text-pathpicker-gold" aria-hidden>
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
            <Star className="h-4 w-4 fill-current" />
          </div>
          <span className="text-sm font-medium text-[#181A1D]">
            Join 20k+ Students
          </span>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-[#181A1D] md:text-3xl">
          Sign up to our newsletter
        </h2>
        <p
          className="text-sm font-normal leading-relaxed md:text-base"
          style={{ color: "rgba(25, 24, 37, 0.75)" }}
        >
          Get scholarship tips, new opportunities, and updates delivered to your
          inbox. Join thousands of students.
        </p>
        <div className="h-[80px] w-full max-w-full shrink-0 md:h-[80px] md:max-w-[450px]">
          <iframe
            src={BEEHIIV_EMBED_URL}
            className="beehiiv-embed h-full w-full"
            data-test-id="beehiiv-embed"
            frameBorder={0}
            scrolling="no"
            style={{
              width: "100%",
              minWidth: "0",
              maxWidth: "100%",
              height: "80px",
              margin: 0,
              borderRadius: 0,
              backgroundColor: "transparent",
              boxShadow: "0 0 #0000",
            }}
            title="Newsletter signup"
          />
        </div>
      </div>
    </div>
  );
}
