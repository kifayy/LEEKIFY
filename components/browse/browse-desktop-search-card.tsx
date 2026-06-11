"use client";

import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { BrowseSearchPickerDialog } from "@/components/browse/browse-search-picker-dialog";
import { BrowseHatchOverlay } from "@/components/browse/browse-hatch-overlay";
import { BrowseVibePreviewText } from "@/components/browse/browse-vibe-preview-text";
import { VIBE_OPTIONS, type VibeOption } from "@/lib/directory/vibe-options";
import {
  pickToSearchTerm,
  pickToVibes,
  type BrowseSearchPick,
} from "@/lib/browse-recent-searches";
import { BABY_MAKER_PREVIEW_A, BABY_MAKER_PREVIEW_B } from "@/lib/browse-baby-maker-previews";
import { pickDistinctVibeMixEggs, rotateVibeMixEgg, getVibeMixEggAccent } from "@/lib/vibe-mix-egg-images";
import { BABY_MAKER_BROWSE_TABS } from "@/lib/browse-picker-popular";
import { useRotatingPreview } from "@/hooks/use-rotating-preview";
import { cn } from "@/lib/utils";

type Tab = "baby" | "search";
type ActiveField = "babyA" | "babyB";

const CARD_BACKGROUND = "/images/bcg.png";

type Props = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onVibesChange: (vibes: string[]) => void;
  vibeOptions: readonly VibeOption[];
  isVibeDisabled: (vibe: VibeOption) => boolean;
  onSearchComplete?: () => void;
};

function stripLeadingEmoji(text: string) {
  return text.replace(/^(\p{Extended_Pictographic}+\s?)+/u, "").trim() || text;
}

function pickDisplay(pick: BrowseSearchPick | null) {
  if (!pick) return null;
  if (pick.kind === "vibe" && pick.vibeValue) {
    const vibe = VIBE_OPTIONS.find((v) => v.value === pick.vibeValue);
    if (vibe) return { emoji: vibe.emoji, text: stripLeadingEmoji(vibe.label) };
  }
  return { emoji: "✨", text: stripLeadingEmoji(pick.label) };
}

export function BrowseDesktopSearchCard({
  searchTerm,
  onSearchChange,
  onVibesChange,
  vibeOptions,
  isVibeDisabled,
  onSearchComplete,
}: Props) {
  const [tab, setTab] = useState<Tab>("baby");
  const [babyA, setBabyA] = useState<BrowseSearchPick | null>(null);
  const [babyB, setBabyB] = useState<BrowseSearchPick | null>(null);
  const [eggs, setEggs] = useState<[string, string] | null>(null);
  const [eggABump, setEggABump] = useState(0);
  const [eggBBump, setEggBBump] = useState(0);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [activeField, setActiveField] = useState<ActiveField>("babyA");
  const [pickerQuery, setPickerQuery] = useState("");
  const [hatching, setHatching] = useState(false);
  const [searchDraft, setSearchDraft] = useState(searchTerm);

  useEffect(() => {
    const [first, second] = pickDistinctVibeMixEggs(2);
    setEggs([first, second]);
  }, []);

  useEffect(() => {
    setSearchDraft(searchTerm);
  }, [searchTerm]);

  const disabledVibeValues = useMemo(() => {
    const set = new Set<string>();
    for (const vibe of vibeOptions) {
      if (isVibeDisabled(vibe)) set.add(vibe.value);
    }
    return set;
  }, [isVibeDisabled, vibeOptions]);

  const openPicker = (field: ActiveField) => {
    setActiveField(field);
    setPickerQuery("");
    setPickerOpen(true);
  };

  const pickerTitle = useMemo(() => {
    return activeField === "babyA" ? "Imagine if…" : "Had a baby with…";
  }, [activeField]);

  const handlePick = useCallback(
    (pick: BrowseSearchPick) => {
      if (activeField === "babyA") {
        setBabyA(pick);
        setEggs((prev) => {
          const [eggA, eggB] = prev ?? pickDistinctVibeMixEggs(2);
          return [rotateVibeMixEgg(eggA, eggB), eggB];
        });
        setEggABump((n) => n + 1);
        return;
      }
      setBabyB(pick);
      setEggs((prev) => {
        const [eggA, eggB] = prev ?? pickDistinctVibeMixEggs(2);
        return [eggA, rotateVibeMixEgg(eggB, eggA)];
      });
      setEggBBump((n) => n + 1);
    },
    [activeField],
  );

  const applyFilters = useCallback(
    (picks: BrowseSearchPick[]) => {
      const vibes = picks.flatMap((pick) => pickToVibes(pick));
      const uniqueVibes = [...new Set(vibes)].slice(0, 2);
      const textParts = picks.map(pickToSearchTerm).filter(Boolean);

      if (uniqueVibes.length === 2 && textParts.length === 0) {
        onVibesChange(uniqueVibes);
        onSearchChange("");
        return;
      }

      if (uniqueVibes.length > 0) {
        onVibesChange(uniqueVibes);
      } else {
        onVibesChange([]);
      }

      onSearchChange(textParts.join(" ").trim());
    },
    [onSearchChange, onVibesChange],
  );

  const commitSearch = useCallback(() => {
    if (tab === "baby") {
      const picks = [babyA, babyB].filter(Boolean) as BrowseSearchPick[];
      applyFilters(picks);
      return;
    }

    const query = searchDraft.trim();
    if (!query) return;
    onVibesChange([]);
    onSearchChange(query);
  }, [applyFilters, babyA, babyB, onSearchChange, onVibesChange, searchDraft, tab]);

  const canSubmit = tab === "baby" ? Boolean(babyA && babyB) : Boolean(searchDraft.trim());

  const handleSubmit = () => {
    if (!canSubmit || hatching) return;
    commitSearch();
    if (tab === "baby") {
      setHatching(true);
      return;
    }
    onSearchComplete?.();
  };

  const handleHatchFinished = useCallback(() => {
    setHatching(false);
    onSearchComplete?.();
  }, [onSearchComplete]);

  const previewA = useRotatingPreview(BABY_MAKER_PREVIEW_A);
  const previewB = useRotatingPreview(BABY_MAKER_PREVIEW_B);

  const babyADisplay = pickDisplay(babyA) ?? previewA;
  const babyBDisplay = pickDisplay(babyB) ?? previewB;

  return (
    <div className="relative hidden overflow-hidden pb-10 pt-12 lg:-mx-4 lg:block xl:-mx-8">
      <div className="relative mx-auto min-h-[34rem] w-full overflow-hidden rounded-[2rem] xl:min-h-[40rem]">
        <div className="absolute inset-0 scale-[1.18]">
          <Image
            src={CARD_BACKGROUND}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-56 bg-gradient-to-b from-white from-55% to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-56 bg-gradient-to-t from-white via-white/85 to-transparent"
        />

        <div className="relative z-10 px-8 py-12 xl:px-14 xl:py-14">
          <div className="mb-8 text-center">
            <h2 className="font-hero text-5xl font-bold leading-[1.05] tracking-tight text-[#0C1120] xl:text-6xl">
              Find Your
              <br />
              Dream School
            </h2>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="relative mb-6 flex rounded-full border border-gray-100 bg-white p-1.5 shadow-sm">
              <button
                type="button"
                onClick={() => setTab("baby")}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-full py-4 text-base font-semibold transition xl:text-lg",
                  tab === "baby" ? "bg-[#956EFE] text-white shadow-sm" : "text-gray-500",
                )}
              >
                <Image
                  src="/images/incubator.png"
                  alt=""
                  width={22}
                  height={22}
                  className="shrink-0 object-contain"
                />
                Baby Maker
              </button>
              <button
                type="button"
                onClick={() => setTab("search")}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-full py-4 text-base font-semibold transition xl:text-lg",
                  tab === "search" ? "bg-[#956EFE] text-white shadow-sm" : "text-gray-500",
                )}
              >
                <Search className="h-5 w-5" strokeWidth={2.5} />
                Search
              </button>
            </div>

            {tab === "baby" ? (
              <div className="grid gap-4 md:grid-cols-2">
                <VibeFieldCard
                  label="Imagine if…"
                  emoji={babyADisplay.emoji}
                  value={babyADisplay.text}
                  filled={Boolean(babyA)}
                  onClick={() => openPicker("babyA")}
                  eggSrc={eggs?.[0]}
                  eggBumpKey={eggABump}
                />
                <VibeFieldCard
                  label="Had a baby with…"
                  emoji={babyBDisplay.emoji}
                  value={babyBDisplay.text}
                  filled={Boolean(babyB)}
                  onClick={() => openPicker("babyB")}
                  eggSrc={eggs?.[1]}
                  eggBumpKey={eggBBump}
                />
              </div>
            ) : null}

            {tab === "search" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold uppercase tracking-wide text-gray-400">
                    State, city, or school
                  </span>
                  <input
                    type="text"
                    value={searchDraft}
                    onChange={(e) => setSearchDraft(e.target.value)}
                    placeholder="California, Boston, Harvard…"
                    className="w-full rounded-2xl border border-gray-100 bg-white px-5 py-4 text-lg text-[#0C1120] shadow-sm placeholder:text-gray-400 focus:border-[#956EFE]/40 focus:outline-none focus:ring-2 focus:ring-[#956EFE]/20"
                  />
                </label>
              </form>
            ) : null}

            <button
              type="button"
              disabled={!canSubmit || hatching}
              onClick={handleSubmit}
              className="relative mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-[#956EFE] py-5 text-lg font-semibold text-white shadow-[0_12px_28px_rgba(149,110,254,0.35)] transition hover:bg-[#8B5CF6] disabled:cursor-not-allowed disabled:opacity-40 xl:text-xl"
            >
              Search Universities
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20">
                <ArrowRight className="h-5 w-5" />
              </span>
            </button>

            <p className="relative mt-4 text-center text-sm text-gray-400">
              Discover schools that match your future 💜
            </p>
          </div>
        </div>
      </div>

      <BrowseHatchOverlay active={hatching} onFinished={handleHatchFinished} mobileOnly={false} />

      <BrowseSearchPickerDialog
        open={pickerOpen}
        title={pickerTitle}
        query={pickerQuery}
        onQueryChange={setPickerQuery}
        onClose={() => setPickerOpen(false)}
        onSelect={handlePick}
        browseTabs={BABY_MAKER_BROWSE_TABS}
        disabledVibeValues={disabledVibeValues}
      />
    </div>
  );
}

function BrushUnderline({ color }: { color: string }) {
  return (
    <svg
      className="pointer-events-none absolute -bottom-1 left-0 h-[0.65rem] w-[108%] max-w-none -translate-x-[3%]"
      viewBox="0 0 120 8"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M1 5.4 C18 2.8, 34 6.2, 52 4.1 C70 2.5, 88 6.0, 119 3.8 L118.5 7.2 C92 7.8, 68 7.4, 44 7.6 C26 7.8, 10 7.1, 1 6.4 Z"
        fill={color}
        opacity="0.92"
      />
    </svg>
  );
}

function EggSlot({
  src,
  filled,
  playingPop,
  playingHop,
  onPopEnd,
  onHopEnd,
}: {
  src?: string;
  filled: boolean;
  playingPop: boolean;
  playingHop: boolean;
  onPopEnd: () => void;
  onHopEnd: () => void;
}) {
  const animClass = playingHop
    ? "animate-vibe-egg-hop"
    : playingPop
      ? "animate-vibe-egg-pop"
      : filled
        ? "animate-vibe-egg-idle"
        : "";

  return (
    <span
      className={cn(
        "relative shrink-0 overflow-visible pointer-events-none",
        filled ? "h-16 w-16 xl:h-[4.5rem] xl:w-[4.5rem]" : "h-12 w-12 opacity-85",
      )}
    >
      {src ? (
        <span
          className={cn("block h-full w-full origin-center will-change-transform", animClass)}
          onAnimationEnd={() => {
            if (playingHop) onHopEnd();
            else if (playingPop) onPopEnd();
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={src} src={src} alt="" className="h-full w-full object-contain drop-shadow-md" />
        </span>
      ) : (
        <span className="block h-full w-full rounded-full bg-gray-100" aria-hidden />
      )}
    </span>
  );
}

function VibeFieldCard({
  label,
  emoji,
  value,
  filled,
  onClick,
  eggSrc,
  eggBumpKey = 0,
}: {
  label: string;
  emoji: string;
  value: string;
  filled: boolean;
  onClick: () => void;
  eggSrc?: string;
  eggBumpKey?: number;
}) {
  const styles = getVibeMixEggAccent(eggSrc);
  const [playingPop, setPlayingPop] = useState(false);
  const [playingHop, setPlayingHop] = useState(false);
  const lastBump = useRef(0);

  useEffect(() => {
    setPlayingHop(false);
  }, [eggBumpKey]);

  useEffect(() => {
    if (!eggSrc || !filled || eggBumpKey <= 0 || eggBumpKey === lastBump.current) return;
    lastBump.current = eggBumpKey;
    setPlayingPop(true);
  }, [eggSrc, filled, eggBumpKey]);

  const handleClick = () => {
    if (filled && eggSrc) setPlayingHop(true);
    onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex w-full items-center gap-4 rounded-[1.25rem] border border-gray-100 bg-white px-5 py-5 text-left shadow-[0_8px_24px_rgba(12,17,32,0.06)] transition hover:scale-[1.01] active:scale-[0.99]"
    >
      <span
        className={cn(
          "flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-[1.75rem] xl:h-16 xl:w-16 xl:text-[2rem]",
          styles.iconBg,
        )}
      >
        {emoji}
      </span>
      <span className="min-w-0 flex-1">
        <span className={cn("block text-xs font-bold uppercase tracking-[0.14em] xl:text-sm", styles.label)}>
          {label.replace(/…$/, "").replace(/\.$/, "")}
        </span>
        <span className="relative mt-1.5 inline-block max-w-full">
          <span
            className={cn(
              "block truncate font-hero text-[1.85rem] font-black leading-none tracking-[-0.02em] xl:text-[2.15rem]",
              filled ? "text-[#0C1120]" : "text-gray-400",
            )}
          >
            {filled ? (
              value
            ) : (
              <BrowseVibePreviewText text={value} className="inline-block truncate" />
            )}
          </span>
          <BrushUnderline color={styles.brush} />
        </span>
      </span>
      <EggSlot
        src={eggSrc}
        filled={filled}
        playingPop={playingPop}
        playingHop={playingHop}
        onPopEnd={() => setPlayingPop(false)}
        onHopEnd={() => setPlayingHop(false)}
      />
    </button>
  );
}
