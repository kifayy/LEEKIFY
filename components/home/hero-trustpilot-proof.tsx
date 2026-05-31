import Link from "next/link";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

const TRUSTPILOT_URL = "https://www.trustpilot.com/";
const HERO_TRUSTPILOT_RATING = 4.8;

function trustpilotStarCells(score: number): ("full" | "half" | "empty")[] {
  const full = Math.floor(score);
  const remainder = score - full;
  const half = remainder >= 0.25 && remainder < 0.95;
  const cells: ("full" | "half" | "empty")[] = [];

  for (let i = 0; i < 5; i++) {
    if (i < full) cells.push("full");
    else if (i === full && half) cells.push("half");
    else cells.push("empty");
  }

  return cells;
}

function TrustpilotStarTile({ fill }: { fill: "full" | "half" | "empty" }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center overflow-hidden rounded-[3px] sm:h-6 sm:w-6",
        fill === "full" && "bg-[#00b67a]",
        fill === "empty" && "bg-white/25",
      )}
      aria-hidden
    >
      {fill === "half" ? (
        <span className="absolute inset-y-0 left-0 w-1/2 bg-[#00b67a]" aria-hidden />
      ) : null}
      <Star
        className="relative z-[1] h-3 w-3 fill-white text-white sm:h-3.5 sm:w-3.5"
        strokeWidth={0}
      />
    </span>
  );
}

type HeroTrustpilotProofProps = {
  className?: string;
  align?: "center" | "left";
};

/** Trustpilot-style social proof for purple hero — sits under the primary CTA. */
export function HeroTrustpilotProof({
  className,
  align = "center",
}: HeroTrustpilotProofProps) {
  const cells = trustpilotStarCells(HERO_TRUSTPILOT_RATING);
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-2.5",
        centered ? "items-center" : "items-start",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-wrap items-center gap-2 sm:gap-2.5",
          centered ? "justify-center" : "justify-start",
        )}
      >
        <span className="font-[family-name:var(--font-poppins)] text-lg font-semibold leading-none text-white sm:text-xl">
          Excellent
        </span>
        <div
          className="flex items-center gap-0.5 sm:gap-1"
          role="img"
          aria-label={`Rated ${HERO_TRUSTPILOT_RATING} out of 5 on Trustpilot`}
        >
          {cells.map((cell, index) => (
            <TrustpilotStarTile key={`${cell}-${index}`} fill={cell} />
          ))}
        </div>
      </div>

      <Link
        href={TRUSTPILOT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group inline-flex flex-wrap items-center gap-1.5 font-[family-name:var(--font-poppins)] text-sm leading-snug text-white/90 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-[0.9375rem]",
          centered ? "justify-center" : "justify-start",
        )}
      >
        <span className="underline decoration-white/45 underline-offset-[3px] group-hover:decoration-white">
          4.8 rating on
        </span>
        <Star className="h-4 w-4 fill-[#00b67a] text-[#00b67a]" strokeWidth={0} aria-hidden />
        <span className="font-bold text-white">Trustpilot</span>
      </Link>
    </div>
  );
}
