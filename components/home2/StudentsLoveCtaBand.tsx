"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { AWARDED_APP_NEW_TAB } from "@/components/landing/constants";
import { COLLEGE_MATCH_QUIZ_URL } from "@/lib/constants";
import {
  HOME2_PURPLE,
  HOME2_PURPLE_DEEP,
  HOME2_SECTION_HEADLINE_CLASS,
  HOME2_SECTION_SUBTEXT_CLASS,
} from "@/components/home2/constants";
import {
  HOME2_TESTIMONIALS,
  type Home2Testimonial,
} from "@/components/home2/testimonials";
import { HERO_COLLEGE_LOGO_ENTRIES } from "@/lib/hero-college-logos";

type MatchBadge = { src: string; tileBgClass: string };

const RILEY_CHEN_MATCH_BADGE: MatchBadge = {
  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Michigan_Wolverines_logo.svg/250px-Michigan_Wolverines_logo.svg.png",
  tileBgClass: "bg-[#00274C]",
};

/** One distinct college mark per testimonial (repeated marquee tiles reuse `t.id`). */
const TESTIMONIAL_ID_TO_MATCH_BADGE: Record<string, MatchBadge> = {
  ...Object.fromEntries(
    HOME2_TESTIMONIALS.map((t, i) => {
      const e = HERO_COLLEGE_LOGO_ENTRIES[i % HERO_COLLEGE_LOGO_ENTRIES.length];
      return [t.id, { src: e.src, tileBgClass: e.tileBgClass }];
    }),
  ),
  "h2-5": RILEY_CHEN_MATCH_BADGE,
};

function matchBadgeForTestimonialId(id: string): MatchBadge {
  return (
    TESTIMONIAL_ID_TO_MATCH_BADGE[id] ?? {
      src: HERO_COLLEGE_LOGO_ENTRIES[0].src,
      tileBgClass: HERO_COLLEGE_LOGO_ENTRIES[0].tileBgClass,
    }
  );
}

function triplicateRotated(items: Home2Testimonial[], rotateBy: number): Home2Testimonial[] {
  if (items.length === 0) return [];
  const k = ((rotateBy % items.length) + items.length) % items.length;
  const r = [...items.slice(k), ...items.slice(0, k)];
  return [...r, ...r, ...r];
}

function splitTestimonialsForMarqueeRows(all: Home2Testimonial[]): {
  row1: Home2Testimonial[];
  row2: Home2Testimonial[];
} {
  const row1 = all.filter((_, i) => i % 2 === 0);
  const row2 = all.filter((_, i) => i % 2 === 1);
  return { row1, row2 };
}

/** Serve tiles from CDN (no `/_next/image` fan-out)—marquee repeats many refs to the same PNGs; optimization queue was the bottleneck. */
function PhotoQuoteTile({
  quote,
  name,
  imageSrc,
  matchBadge,
  eager,
  eagerHighFetch,
}: {
  quote: string;
  name: string;
  imageSrc?: string;
  matchBadge: MatchBadge;
  /** Leading strip: eager so visible tiles aren’t deferred on load */
  eager?: boolean;
  /** Only use on the band’s first tile so we don’t starve hero LCP */
  eagerHighFetch?: boolean;
}) {
  return (
    <div className="relative m-2 h-[220px] w-[220px] shrink-0 overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5 md:h-[250px] md:w-[250px] lg:h-[275px] lg:w-[275px]">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          fill
          unoptimized
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? (eagerHighFetch ? "high" : "auto") : "low"}
          className="object-cover"
          sizes="(max-width: 768px) 228px, (max-width: 1024px) 258px, 284px"
        />
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-300"
          aria-hidden
        />
      )}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/80 via-black/45 to-transparent"
        aria-hidden
      />
      <div className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-full bg-white/95 py-0.5 pl-0.5 pr-2 shadow-md ring-1 ring-black/10 backdrop-blur-[2px]">
        <span
          className={`relative h-6 w-6 shrink-0 overflow-hidden rounded-full ring-1 ring-black/10 ${matchBadge.tileBgClass}`}
        >
          <Image
            src={matchBadge.src}
            alt=""
            fill
            unoptimized
            sizes="24px"
            className="rounded-full object-cover"
          />
        </span>
        <span className="pr-0.5 text-[10px] font-bold leading-none tracking-tight text-neutral-900 md:text-[11px]">
          #1 Match
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
        <p className="text-sm font-bold italic leading-snug">&ldquo;{quote}&rdquo;</p>
        <p className="mt-2 text-xs text-white/90">{name}</p>
      </div>
    </div>
  );
}

export function StudentsLoveCtaBand() {
  const { row1, row2 } = splitTestimonialsForMarqueeRows(HOME2_TESTIMONIALS);
  const row1Strip = triplicateRotated(row1, 0);
  const row2Strip = triplicateRotated(row2, 0);
  const loopRow1 = [...row1Strip, ...row1Strip];
  const loopRow2 = [...row2Strip, ...row2Strip];
  return (
    <div className="flex w-full flex-col items-center px-4 pb-8 pt-2 md:pb-12 md:pt-4 lg:pb-14">
      <div className="w-full max-w-4xl md:mr-0 md:w-full">
        <div className="mb-3 flex justify-center md:mb-4">
          <div
            className="flex items-center gap-0.5"
            role="img"
            aria-label="Rated 5 out of 5 stars"
          >
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-amber-400 text-amber-400 md:h-[1.125rem] md:w-[1.125rem]"
                strokeWidth={0}
              />
            ))}
          </div>
        </div>
        <h3 className={`text-center ${HOME2_SECTION_HEADLINE_CLASS}`}>
          <span className="md:block">50,000+ Students Found Their</span>{" "}
          <span className="md:mt-1 md:block" style={{ color: HOME2_PURPLE }}>
            Dream School
          </span>
        </h3>
        <p className={`mx-auto mt-4 max-w-2xl text-center ${HOME2_SECTION_SUBTEXT_CLASS}`}>
          We match your goals, values, and strengths against thousands of schools to find your best
          matches.
        </p>
        <div className="mt-6 flex justify-center md:mt-8">
          <Link
            href={COLLEGE_MATCH_QUIZ_URL}
            {...AWARDED_APP_NEW_TAB}
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-center text-lg font-bold text-white shadow-md transition hover:opacity-95 hover:shadow-lg md:px-8 md:py-3.5 md:text-xl"
            style={{
              background: `linear-gradient(180deg, ${HOME2_PURPLE} 0%, ${HOME2_PURPLE_DEEP} 100%)`,
            }}
          >
            College Match Quiz
          </Link>
        </div>
        <div className="relative mt-10 flex w-screen shrink-0 flex-col gap-3 overflow-hidden ml-[calc(50%-50vw)] md:mt-12 md:gap-4">
          <div className="home2-marquee-track flex w-max gap-0 pr-4">
            {loopRow1.map((t, i) => (
              <PhotoQuoteTile
                key={`${t.id}-r1-${i}`}
                quote={t.quote}
                name={t.name}
                imageSrc={t.photoUrl}
                matchBadge={matchBadgeForTestimonialId(t.id)}
                eager={i < 5}
                eagerHighFetch={i === 0}
              />
            ))}
          </div>
          <div className="home2-marquee-track-reverse flex w-max gap-0 pr-4">
            {loopRow2.map((t, i) => (
              <PhotoQuoteTile
                key={`${t.id}-r2-${i}`}
                quote={t.quote}
                name={t.name}
                imageSrc={t.photoUrl}
                matchBadge={matchBadgeForTestimonialId(t.id)}
                eager={i < 5}
                eagerHighFetch={i === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
