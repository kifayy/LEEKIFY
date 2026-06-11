"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { BrowseSearchPickerSheet } from "@/components/browse/browse-search-picker-sheet";
import { BrowseHatchOverlay } from "@/components/browse/browse-hatch-overlay";
import { VIBE_OPTIONS, type VibeOption } from "@/lib/directory/vibe-options";
import {
  pickToSearchTerm,
  pickToVibes,
  type BrowseSearchPick,
} from "@/lib/browse-recent-searches";
import { pickDistinctVibeMixEggs } from "@/lib/vibe-mix-egg-images";
import { cn } from "@/lib/utils";

type Tab = "baby" | "search";

type ActiveField = "babyA" | "babyB";

const BROWSE_HERO_IMAGE = "/images/Gsasdasdroup 2.png";

type Props = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onVibesChange: (vibes: string[]) => void;
  vibeOptions: readonly VibeOption[];
  isVibeDisabled: (vibe: VibeOption) => boolean;
  onSearchComplete?: () => void;
};

function displayValue(pick: BrowseSearchPick | null, placeholder: string) {
  if (!pick) return placeholder;
  if (pick.kind === "vibe" && pick.vibeValue) {
    const vibe = VIBE_OPTIONS.find((v) => v.value === pick.vibeValue);
    if (vibe) return vibe.label;
  }
  return pick.label;
}

export function BrowseMobileSearchCard({
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

  useEffect(() => {
    const [first, second] = pickDistinctVibeMixEggs(2);
    setEggs([first, second]);
  }, []);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeField, setActiveField] = useState<ActiveField>("babyA");
  const [sheetQuery, setSheetQuery] = useState("");
  const [hatching, setHatching] = useState(false);
  const [searchDraft, setSearchDraft] = useState(searchTerm);

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

  const openSheet = (field: ActiveField) => {
    setActiveField(field);
    setSheetQuery("");
    setSheetOpen(true);
  };

  const sheetTitle = useMemo(() => {
    return activeField === "babyA" ? "Imagine if…" : "Had a baby with…";
  }, [activeField]);

  const handlePick = useCallback(
    (pick: BrowseSearchPick) => {
      if (activeField === "babyA") {
        setBabyA(pick);
        setEggABump((n) => n + 1);
        return;
      }
      setBabyB(pick);
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

  const canSubmit =
    tab === "baby" ? Boolean(babyA && babyB) : Boolean(searchDraft.trim());

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

  const tabs: { id: Tab; label: string }[] = [
    { id: "baby", label: "Baby Maker" },
    { id: "search", label: "Search" },
  ];

  return (
    <div className="lg:hidden">
      <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
        <div className="relative h-52 w-full overflow-hidden bg-[#FAF8FF] sm:h-56">
          <Image
            src={BROWSE_HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_55%]"
          />
        </div>
      </div>

      <div className="relative z-10 -mt-8 px-4">
        <div className="rounded-[1.75rem] border border-white/70 bg-white p-4 shadow-[0_20px_50px_rgba(12,17,32,0.12)]">
          <h2 className="mb-3 text-center font-hero text-xl font-semibold tracking-tight text-[#0C1120]">
            Find Your Dream School
          </h2>
          <div className="grid grid-cols-2 gap-1 rounded-2xl bg-gray-100 p-1">
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={cn(
                  "rounded-xl py-2.5 text-sm font-semibold transition",
                  tab === item.id
                    ? "bg-[#956EFE] text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {tab === "baby" ? (
            <div className="mt-4 space-y-3">
              <FieldRow
                label="Imagine if…"
                value={displayValue(babyA, "🎨 Artsy")}
                filled={Boolean(babyA)}
                onClick={() => openSheet("babyA")}
                showEgg
                eggSrc={eggs?.[0]}
                eggBumpKey={eggABump}
              />
              <FieldRow
                label="Had a baby with…"
                value={displayValue(babyB, "💋 Flirty")}
                filled={Boolean(babyB)}
                onClick={() => openSheet("babyB")}
                showEgg
                eggSrc={eggs?.[1]}
                eggBumpKey={eggBBump}
              />
            </div>
          ) : null}

          {tab === "search" ? (
            <form
              className="mt-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-gray-400">State, city, or school</span>
                <input
                  type="text"
                  value={searchDraft}
                  onChange={(e) => setSearchDraft(e.target.value)}
                  placeholder="California, Boston, Harvard…"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3.5 text-base text-[#0C1120] placeholder:text-gray-400 focus:border-[#956EFE]/40 focus:outline-none focus:ring-2 focus:ring-[#956EFE]/20"
                />
              </label>
            </form>
          ) : null}

          <button
            type="button"
            disabled={!canSubmit || hatching}
            onClick={handleSubmit}
            className="mt-5 w-full rounded-2xl bg-[#956EFE] py-4 text-base font-semibold text-white shadow-lg transition hover:bg-[#8560ef] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Search Universities
          </button>
        </div>
      </div>

      <BrowseHatchOverlay active={hatching} onFinished={handleHatchFinished} />

      <BrowseSearchPickerSheet
        open={sheetOpen}
        title={sheetTitle}
        query={sheetQuery}
        onQueryChange={setSheetQuery}
        onClose={() => setSheetOpen(false)}
        onSelect={handlePick}
        disabledVibeValues={disabledVibeValues}
      />
    </div>
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
        filled ? "h-10 w-10" : "h-8 w-8 scale-90 opacity-80",
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
          <img src={src} alt="" className="h-full w-full object-contain drop-shadow-sm" />
        </span>
      ) : (
        <span className="block h-full w-full rounded-full bg-gray-100" aria-hidden />
      )}
    </span>
  );
}

function FieldRow({
  label,
  value,
  filled,
  onClick,
  showEgg = false,
  eggSrc,
  eggBumpKey = 0,
}: {
  label: string;
  value: string;
  filled: boolean;
  onClick: () => void;
  showEgg?: boolean;
  eggSrc?: string;
  eggBumpKey?: number;
}) {
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
      className="flex w-full items-center gap-3 rounded-2xl border border-gray-200 px-4 py-3.5 text-left transition hover:border-[#956EFE]/40 hover:bg-[#faf8ff]"
    >
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-medium text-gray-400">{label}</span>
        <span className={cn("mt-0.5 block truncate text-base", filled ? "font-medium text-[#0C1120]" : "text-gray-400")}>
          {value}
        </span>
      </span>
      {showEgg ? (
        <EggSlot
          src={eggSrc}
          filled={filled}
          playingPop={playingPop}
          playingHop={playingHop}
          onPopEnd={() => setPlayingPop(false)}
          onHopEnd={() => setPlayingHop(false)}
        />
      ) : (
        <ChevronRight className="h-4 w-4 shrink-0 text-gray-300" />
      )}
    </button>
  );
}
