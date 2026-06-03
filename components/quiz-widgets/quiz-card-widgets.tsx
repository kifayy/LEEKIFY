"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useCollegeMatchQuizUrl } from "@/hooks/useCollegeMatchQuizUrl";
import { PATH_COLLEGE_MATCH_QUIZ_LABEL } from "@/components/home/path-quiz-cta";

const GREEKER_URL = "https://storage.googleapis.com/images_592/Greeker%20(3).png";
const PLACEHOLDER_LOGOS = [
  "https://storage.googleapis.com/images_592/P1laceholder%20Logo%404x.png",
  "https://storage.googleapis.com/images_592/Placeholder%20Log7o%404x.png",
  "https://storage.googleapis.com/images_592/Placeholder%20Logo%404x.png",
  GREEKER_URL,
];

function LogoSlot({ src }: { src: string }) {
  const isGreeker = src === GREEKER_URL;
  return (
    <div
      className={`flex shrink-0 items-center justify-center px-4 md:px-6 ${isGreeker ? "pt-[0.6rem]" : ""}`}
    >
      <Image
        src={src}
        alt=""
        width={isGreeker ? 230 : 200}
        height={isGreeker ? 138 : 120}
        className={
          isGreeker
            ? "h-[5.75rem] w-auto object-contain md:h-[6.9rem]"
            : "h-20 w-auto object-contain md:h-24"
        }
        unoptimized
      />
    </div>
  );
}

const CARD_CLASS =
  "group relative flex h-full w-full max-w-[389px] flex-col overflow-hidden rounded-[29px] transition-shadow hover:shadow-[0_9px_59px_rgba(174,165,114,0.12)] sm:w-[389px] sm:max-w-[480px] md:max-w-[480px] md:w-[480px] lg:max-w-[520px] lg:w-[520px]";

/** Reusable College Match Quiz card widget (same destination as archetype flow). */
export function ArchetypeQuizWidget() {
  const collegeMatchQuizUrl = useCollegeMatchQuizUrl();

  return (
    <Link
      href={collegeMatchQuizUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={CARD_CLASS}
      style={{ backgroundColor: "#F0EEFF" }}
    >
      <div className="relative flex min-h-0 flex-1 flex-col rounded-t-[29px] rounded-b-[29px]">
        <div className="min-h-0 flex-1 px-5 pt-4 font-sans text-center md:text-left">
          <div className="mb-3 flex h-[11rem] min-h-[11rem] items-center md:h-[13rem] md:min-h-[13rem]">
            <div className="marquee-fade-edges -mx-2 max-w-full overflow-hidden px-0 py-2">
              <div className="flex w-max animate-marquee-x">
                {[...PLACEHOLDER_LOGOS, ...PLACEHOLDER_LOGOS].map((src, i) => (
                  <LogoSlot key={i} src={src} />
                ))}
              </div>
            </div>
          </div>
          <h2 className="text-xl font-bold text-[#0C1120]">{PATH_COLLEGE_MATCH_QUIZ_LABEL}</h2>
          <p
            className="mt-2 line-clamp-2 text-sm font-sans leading-relaxed"
            style={{ color: "rgba(12, 17, 32, 0.6)" }}
          >
            Find your archetype. Join 40k+ peers and see what type of student you are. Discover your profile.
          </p>
        </div>
        <div className="mt-auto shrink-0 px-4 pb-5 pt-4">
          <span
            className="flex w-full items-center justify-center gap-2 rounded-full py-4 text-base font-normal text-white transition-opacity group-hover:opacity-95"
            style={{ background: "#956EFE" }}
          >
            Take Quiz
            <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
          </span>
        </div>
        <div
          className="pointer-events-none absolute -bottom-4 right-0 h-10 w-28 rounded-full opacity-50 blur-[33px]"
          style={{ backgroundColor: "#7723FF" }}
          aria-hidden
        />
      </div>
    </Link>
  );
}
