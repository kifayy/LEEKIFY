"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { X } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { useCareerPersonalityStatus } from "@/hooks/useCareerPersonalityStatus";
import { VIBE_OPTIONS } from "@/lib/directory/vibe-options";
import { pickRandomVibeMixEgg } from "@/lib/vibe-mix-egg-images";
import { cn } from "@/lib/utils";

const HATCH_LOTTIE_SRC = "/animations/hatch.lottie";
const BASKET_SRC = "/images/basket.png";
const ARCH_MS = 1000;
const HATCH_MS = 2800;

type EggSlot = {
  vibe: string | null;
  image: string | null;
  status: "empty" | "flying" | "landed";
};

const EMPTY_SLOT: EggSlot = { vibe: null, image: null, status: "empty" };

type ArchPath = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  apexX: number;
  apexY: number;
};

type Props = {
  onComplete: (vibes: [string, string]) => void;
};

function vibeLabel(value: string) {
  const option = VIBE_OPTIONS.find((v) => v.value === value);
  if (!option) return value;
  return option.label.replace(/^[^\s]+\s/, "");
}

function nextOpenSlot(slots: [EggSlot, EggSlot]): 0 | 1 | null {
  if (!slots[0].vibe) return 0;
  if (!slots[1].vibe) return 1;
  return null;
}

function measureArchPath(
  section: HTMLElement,
  blank: HTMLElement,
  target: HTMLElement,
  slotIndex: 0 | 1,
): ArchPath {
  const s = section.getBoundingClientRect();
  const b = blank.getBoundingClientRect();
  const t = target.getBoundingClientRect();

  const startX = b.left + b.width / 2 - s.left;
  const startY = b.top + b.height / 2 - s.top;
  const endX = t.left + t.width / 2 - s.left + (slotIndex === 0 ? -7 : 7);
  const endY = t.top + t.height / 2 - s.top;
  const dx = endX - startX;
  const apexX = startX + dx * 0.5;
  const apexY = Math.min(startY, endY) - Math.max(64, Math.abs(dx) * 0.28);

  return { startX, startY, endX, endY, apexX, apexY };
}

function FlyingEggArch({
  image,
  path,
  slotIndex,
  onLand,
}: {
  image: string;
  path: ArchPath;
  slotIndex: 0 | 1;
  onLand: (slotIndex: 0 | 1) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onLandRef = useRef(onLand);
  onLandRef.current = onLand;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { startX, startY, endX, endY, apexX, apexY } = path;
    el.style.left = `${startX}px`;
    el.style.top = `${startY}px`;

    const anim = el.animate(
      [
        {
          left: `${startX}px`,
          top: `${startY}px`,
          transform: "translate(-50%, -50%) rotate(-14deg) scale(0.9)",
          opacity: 0,
        },
        {
          opacity: 1,
          offset: 0.08,
        },
        {
          left: `${apexX}px`,
          top: `${apexY}px`,
          transform: "translate(-50%, -50%) rotate(8deg) scale(1)",
          offset: 0.55,
        },
        {
          left: `${endX}px`,
          top: `${endY}px`,
          transform: "translate(-50%, -50%) rotate(0deg) scale(1)",
          opacity: 1,
        },
      ],
      {
        duration: ARCH_MS,
        easing: "cubic-bezier(0.33, 0, 0.15, 1)",
        fill: "forwards",
      },
    );

    anim.onfinish = () => onLandRef.current(slotIndex);
    return () => anim.cancel();
  }, [path, slotIndex]);

  return (
    <div ref={ref} className="pointer-events-none absolute z-[15] w-8 sm:w-9" style={{ transform: "translate(-50%, -50%)" }}>
      <Image src={image} alt="" width={36} height={36} className="h-auto w-full drop-shadow-md" priority />
    </div>
  );
}

export function BrowseVibeMixGame({ onComplete }: Props) {
  const { user } = useAuth();
  const { hasCompletedCareerQuiz } = useCareerPersonalityStatus();
  const [slots, setSlots] = useState<[EggSlot, EggSlot]>([EMPTY_SLOT, EMPTY_SLOT]);
  const [phase, setPhase] = useState<"pick" | "hatching">("pick");
  const [flyingEgg, setFlyingEgg] = useState<{
    slotIndex: 0 | 1;
    image: string;
    path: ArchPath;
  } | null>(null);
  const hatchStartedRef = useRef(false);

  const sectionRef = useRef<HTMLElement>(null);
  const blankRef0 = useRef<HTMLSpanElement>(null);
  const blankRef1 = useRef<HTMLSpanElement>(null);
  const basketTargetRef = useRef<HTMLDivElement>(null);

  const isVibeDisabled = (vibe: { value: string; requiresQuiz?: boolean }) =>
    Boolean(vibe.requiresQuiz && (!user || !hasCompletedCareerQuiz));

  const landEgg = useCallback((slotIndex: 0 | 1) => {
    setFlyingEgg(null);
    setSlots((prev) => {
      const next: [EggSlot, EggSlot] = [...prev] as [EggSlot, EggSlot];
      if (next[slotIndex].status !== "flying") return prev;
      next[slotIndex] = { ...next[slotIndex], status: "landed" };
      return next;
    });
  }, []);

  const launchEggArch = useCallback(
    (slotIndex: 0 | 1, image: string) => {
      const section = sectionRef.current;
      const blank = slotIndex === 0 ? blankRef0.current : blankRef1.current;
      const target = basketTargetRef.current;

      if (!section || !blank || !target) {
        window.setTimeout(() => landEgg(slotIndex), ARCH_MS);
        return;
      }

      const path = measureArchPath(section, blank, target, slotIndex);
      setFlyingEgg({ slotIndex, image, path });
    },
    [landEgg],
  );

  const selectVibe = useCallback(
    (vibeValue: string) => {
      if (phase !== "pick" || flyingEgg) return;

      let slotIndex: 0 | 1 = 0;
      let image = "";
      let shouldLaunch = false;

      setSlots((prev) => {
        const open = nextOpenSlot(prev);
        slotIndex = open ?? (prev[0].vibe === vibeValue ? 0 : prev[1].vibe === vibeValue ? 1 : 1);

        if (prev[slotIndex].vibe === vibeValue && prev[slotIndex].status !== "empty") {
          return prev;
        }

        image = pickRandomVibeMixEgg();
        shouldLaunch = true;
        const next: [EggSlot, EggSlot] = [...prev] as [EggSlot, EggSlot];
        next[slotIndex] = {
          vibe: vibeValue,
          image,
          status: "flying",
        };
        return next;
      });

      if (shouldLaunch) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => launchEggArch(slotIndex, image));
        });
      }
    },
    [flyingEgg, launchEggArch, phase],
  );

  const clearSlot = useCallback(
    (slotIndex: 0 | 1) => {
      if (phase !== "pick" || flyingEgg) return;
      setSlots((prev) => {
        const next: [EggSlot, EggSlot] = [...prev] as [EggSlot, EggSlot];
        next[slotIndex] = EMPTY_SLOT;
        return next;
      });
      hatchStartedRef.current = false;
    },
    [flyingEgg, phase],
  );

  const bothLanded = slots[0].status === "landed" && slots[1].status === "landed";

  useEffect(() => {
    if (!bothLanded || phase !== "pick" || hatchStartedRef.current) return;
    hatchStartedRef.current = true;
    const t = window.setTimeout(() => setPhase("hatching"), 500);
    return () => window.clearTimeout(t);
  }, [bothLanded, phase]);

  useEffect(() => {
    if (phase !== "hatching") return;
    const v0 = slots[0].vibe;
    const v1 = slots[1].vibe;
    if (!v0 || !v1) return;

    const t = window.setTimeout(() => onComplete([v0, v1]), HATCH_MS);
    return () => window.clearTimeout(t);
  }, [phase, slots, onComplete]);

  const slotLabel = (slot: EggSlot) => (slot.vibe ? vibeLabel(slot.vibe) : null);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white pb-20 sm:pb-24">
      <div className="container relative mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#956EFE]">Vibe mix</p>
          <h1 className="mt-3 font-hero text-2xl font-semibold leading-snug text-[#0C1120] sm:text-3xl md:text-4xl">
            If{" "}
            <VibeBlank
              anchorRef={blankRef0}
              label={slotLabel(slots[0])}
              onClear={slots[0].vibe ? () => clearSlot(0) : undefined}
            />{" "}
            and{" "}
            <VibeBlank
              anchorRef={blankRef1}
              label={slotLabel(slots[1])}
              onClear={slots[1].vibe ? () => clearSlot(1) : undefined}
            />{" "}
            had a baby, what college would it be?
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-gray-500">
            Pick two vibes — each one launches an egg into the basket. Hatch them to see your matches.
          </p>
        </div>

        <div className="relative z-30 mt-6 flex flex-wrap justify-center gap-2 sm:mt-8">
          {VIBE_OPTIONS.map((vibe) => {
            const selected = slots.some((s) => s.vibe === vibe.value);
            const disabled = isVibeDisabled(vibe) || phase !== "pick" || Boolean(flyingEgg);
            return (
              <button
                key={vibe.value}
                type="button"
                disabled={disabled}
                onClick={() => selectVibe(vibe.value)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                  selected
                    ? "border-[#A084FF] bg-[#A084FF] text-white shadow-md"
                    : "border-gray-200 bg-white text-gray-700 shadow-sm hover:border-[#c9bdf5] hover:bg-[#faf8ff]",
                  disabled && !selected && "cursor-not-allowed opacity-40",
                )}
              >
                {vibe.label}
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs text-gray-400 sm:mt-8">
          {bothLanded ? "Both eggs secured — get ready to hatch" : `${slots.filter((s) => s.vibe).length}/2 eggs`}
        </p>
      </div>

      {flyingEgg ? (
        <FlyingEggArch
          image={flyingEgg.image}
          path={flyingEgg.path}
          slotIndex={flyingEgg.slotIndex}
          onLand={landEgg}
        />
      ) : null}

      <div className="pointer-events-none absolute bottom-3 right-3 z-10 sm:bottom-4 sm:right-4">
        <div className="relative h-14 w-[5.5rem] sm:h-16 sm:w-24">
          <div
            ref={basketTargetRef}
            className="absolute bottom-[14%] left-[13%] right-[13%] top-[28%] z-0 flex items-end justify-center gap-0.5 overflow-hidden pb-1.5 sm:gap-1 sm:pb-2"
          >
            {slots.map((slot, index) => {
              if (!slot.image || slot.status !== "landed") return null;
              return (
                <div
                  key={`egg-${index}-${slot.vibe}`}
                  className="w-[44%] max-w-[1.5rem] shrink-0 animate-vibe-egg-settle sm:max-w-[1.75rem]"
                >
                  <Image
                    src={slot.image}
                    alt=""
                    width={28}
                    height={28}
                    className="mx-auto h-auto w-full"
                    priority
                  />
                </div>
              );
            })}
          </div>

          <Image
            src={BASKET_SRC}
            alt=""
            width={96}
            height={80}
            className="relative z-10 h-full w-full object-contain object-bottom drop-shadow-sm"
            priority
          />
        </div>
      </div>

      {phase === "hatching" ? (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/80 backdrop-blur-[2px]">
          <div className="flex flex-col items-center gap-3">
            <div className="h-40 w-40 sm:h-48 sm:w-48">
              <DotLottieReact src={HATCH_LOTTIE_SRC} autoplay loop={false} className="h-full w-full" />
            </div>
            <p className="text-sm font-medium text-[#956EFE]">Hatching your college match…</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function VibeBlank({
  label,
  onClear,
  anchorRef,
}: {
  label: string | null;
  onClear?: () => void;
  anchorRef?: RefObject<HTMLSpanElement | null>;
}) {
  if (label) {
    return (
      <span
        ref={anchorRef}
        className="inline-flex items-center gap-1 rounded-full bg-[#A084FF] px-3 py-1 text-base font-medium text-white sm:px-4 sm:py-1.5 sm:text-lg"
      >
        {label}
        {onClear ? (
          <button
            type="button"
            onClick={onClear}
            className="rounded-full p-0.5 hover:bg-white/20"
            aria-label={`Remove ${label}`}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </span>
    );
  }

  return (
    <span
      ref={anchorRef}
      className="inline-block min-w-[4.5rem] rounded-full border-2 border-dashed border-[#c9bdf5] px-3 py-1 text-base text-[#956EFE]/60 sm:min-w-[5rem] sm:text-lg"
    >
      ___
    </span>
  );
}
