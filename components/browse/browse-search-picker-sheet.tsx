"use client";

import { ArrowLeft, Building2, MapPin, Search, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { useBrowsePopularColleges } from "@/hooks/use-browse-popular-colleges";
import { useBrowseSearchSuggestions, type BrowseSuggestion } from "@/hooks/use-browse-search-suggestions";
import {
  matchPopularCelebrities,
  POPULAR_BROWSE_CELEBRITIES,
  POPULAR_BROWSE_LOCATIONS,
  POPULAR_BROWSE_TAB_PLACEHOLDER,
  POPULAR_BROWSE_TABS,
  POPULAR_SCHOOLS_TAB_PLACEHOLDER,
  POPULAR_SCHOOLS_TABS,
  type PopularBrowseTab,
  type PopularSchoolsTab,
} from "@/lib/browse-picker-popular";
import { getCollegeHeroUrl } from "@/lib/college-hero-url";
import { VIBE_OPTIONS } from "@/lib/directory/vibe-options";
import type { BrowseSearchPick } from "@/lib/browse-recent-searches";
import { shouldServeImageDirectFromCdn, shouldUseNextImageOptimizer } from "@/lib/remote-image-patterns";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  title: string;
  query: string;
  onQueryChange: (value: string) => void;
  onClose: () => void;
  onSelect: (pick: BrowseSearchPick) => void;
  mode?: "all" | "states" | "schools";
  disabledVibeValues?: Set<string>;
};

const CAROUSEL_CLASS =
  "-mx-4 flex items-center gap-2.5 overflow-x-auto px-4 scrollbar-hide snap-x snap-mandatory touch-pan-x";

const PILL_BTN_CLASS =
  "snap-start shrink-0 min-h-[44px] rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium leading-none text-gray-800 active:bg-gray-50";

function suggestionToPick(item: BrowseSuggestion): BrowseSearchPick {
  switch (item.kind) {
    case "vibe":
      return { kind: "vibe", label: item.label.replace(/^[^\s]+\s/, ""), vibeValue: item.value };
    case "college":
      return { kind: "college", label: item.label, collegeSlug: item.slug };
    case "state":
      return { kind: "state", label: item.label, stateName: item.label };
  }
}

function customTextPick(query: string): BrowseSearchPick {
  return { kind: "text", label: query, query };
}

function customStatePick(query: string): BrowseSearchPick {
  return { kind: "state", label: query, stateName: query };
}

function CollegePickerAvatar({ name, src, size = "md" }: { name: string; src: string | null; size?: "sm" | "md" }) {
  const [failed, setFailed] = useState(false);
  const dim = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const iconClass = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  const imageSize = size === "sm" ? "28px" : "36px";

  if (!src || failed) {
    return (
      <span className={cn("flex shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500", dim)}>
        <Building2 className={iconClass} />
      </span>
    );
  }

  const unoptimized = shouldServeImageDirectFromCdn(src) || !shouldUseNextImageOptimizer(src);

  return (
    <span className={cn("relative shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-100", dim)}>
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        sizes={imageSize}
        unoptimized={unoptimized}
        onError={() => setFailed(true)}
      />
    </span>
  );
}

function ResultRow({
  icon,
  title,
  subtitle,
  onClick,
  disabled,
}: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 border-b border-gray-100 px-1 py-3 text-left last:border-b-0",
        disabled ? "cursor-not-allowed opacity-40" : "active:bg-gray-50",
      )}
    >
      {icon}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] text-gray-900">{title}</span>
        {subtitle ? <span className="block truncate text-sm text-gray-500">{subtitle}</span> : null}
      </span>
    </button>
  );
}

export function BrowseSearchPickerSheet({
  open,
  title,
  query,
  onQueryChange,
  onClose,
  onSelect,
  mode = "all",
  disabledVibeValues,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [popularTab, setPopularTab] = useState<PopularBrowseTab | PopularSchoolsTab>("vibes");
  const { vibes, universitySuggestions, locationSuggestions, customQuery, loading } =
    useBrowseSearchSuggestions(query, mode);
  const { colleges: popularColleges, loading: popularLoading } = useBrowsePopularColleges(
    open && (mode === "all" || mode === "schools"),
  );

  useEffect(() => {
    if (open) {
      setPopularTab(mode === "schools" ? "universities" : "vibes");
      const t = window.setTimeout(() => inputRef.current?.focus(), 120);
      return () => window.clearTimeout(t);
    }
  }, [open, mode]);

  if (!open) return null;

  const trimmed = query.trim();
  const isSearching = trimmed.length > 0;

  const handleSelect = (pick: BrowseSearchPick) => {
    onSelect(pick);
    onClose();
  };

  const submitCustom = () => {
    if (!customQuery) return;
    handleSelect(mode === "states" ? customStatePick(customQuery) : customTextPick(customQuery));
  };

  const searchPlaceholder =
    mode === "states"
      ? "Search states"
      : mode === "schools"
        ? POPULAR_SCHOOLS_TAB_PLACEHOLDER[popularTab as PopularSchoolsTab]
        : POPULAR_BROWSE_TAB_PLACEHOLDER[popularTab as PopularBrowseTab];

  const celebrityMatches = mode === "all" && isSearching ? matchPopularCelebrities(query) : [];

  const showVibeResults = mode === "all" && popularTab === "vibes";
  const showUniversityResults =
    mode === "schools" ? isSearching : mode === "all" ? popularTab === "universities" : false;
  const showCelebrityResults = mode === "all" && popularTab === "celebrities";
  const showStateResults = mode === "states" || (mode === "schools" && isSearching);

  const customResultSubtitle =
    mode === "states"
      ? "Use this state"
      : mode === "schools"
        ? "Use this search"
        : popularTab === "vibes"
          ? "Use this vibe"
          : popularTab === "universities"
            ? "Use this university"
            : "Use this celebrity";

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      <button
        type="button"
        aria-label="Close search"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex flex-col rounded-t-2xl bg-white animate-in slide-in-from-bottom-4 duration-200",
          isSearching ? "h-[76vh] max-h-[92vh]" : "h-auto max-h-[min(72vh,520px)]",
        )}
      >
        <div className="shrink-0 border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-600 active:bg-gray-100"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="text-[17px] font-semibold text-gray-900">{title}</h2>
          </div>

          <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              submitCustom();
            }}
          >
            <div className="flex min-w-0 flex-1 items-center rounded-xl border border-gray-300 bg-white px-3">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="min-w-0 flex-1 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
              {trimmed ? (
                <button
                  type="button"
                  onClick={() => onQueryChange("")}
                  className="ml-1 text-gray-400 active:text-gray-600"
                  aria-label="Clear"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>
            <button
              type="submit"
              disabled={!customQuery}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#3DBFBF] text-white disabled:opacity-35"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>
        </div>

        <div
          className={cn(
            "px-4 pb-4",
            isSearching ? "min-h-0 flex-1 overflow-y-auto pt-2" : "shrink-0 pt-1",
          )}
        >
          {mode === "all" ? (
            <div className="mb-2 flex gap-1 border-b border-gray-200">
              {POPULAR_BROWSE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setPopularTab(tab.id)}
                  className={cn(
                    "border-b-2 px-3 pb-1.5 pt-0.5 text-sm transition",
                    popularTab === tab.id
                      ? "border-gray-900 font-medium text-gray-900"
                      : "border-transparent text-gray-500",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          ) : mode === "schools" ? (
            <div className="mb-2 flex gap-1 border-b border-gray-200">
              {POPULAR_SCHOOLS_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setPopularTab(tab.id)}
                  className={cn(
                    "border-b-2 px-3 pb-1.5 pt-0.5 text-sm transition",
                    popularTab === tab.id
                      ? "border-gray-900 font-medium text-gray-900"
                      : "border-transparent text-gray-500",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          ) : null}

          {isSearching ? (
            <div>
              {loading ? <p className="py-3 text-sm text-gray-500">Searching…</p> : null}

              <ul>
                {customQuery ? (
                  <li>
                    <ResultRow
                      title={customQuery}
                      subtitle={customResultSubtitle}
                      onClick={submitCustom}
                      icon={
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                          <Search className="h-4 w-4" />
                        </span>
                      }
                    />
                  </li>
                ) : null}

                {showVibeResults
                  ? vibes.map((item) => {
                      const disabled = disabledVibeValues?.has(item.value);
                      return (
                        <li key={item.value}>
                          <ResultRow
                            disabled={disabled}
                            title={item.label}
                            subtitle="Vibe"
                            onClick={() => handleSelect(suggestionToPick(item))}
                            icon={
                              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-lg">
                                {item.emoji}
                              </span>
                            }
                          />
                        </li>
                      );
                    })
                  : null}

                {showUniversityResults
                  ? universitySuggestions.map((item) => (
                      <li key={item.slug}>
                        <ResultRow
                          title={item.label}
                          subtitle={item.location ?? undefined}
                          onClick={() => handleSelect(suggestionToPick(item))}
                          icon={<CollegePickerAvatar name={item.label} src={item.heroUrl ?? null} />}
                        />
                      </li>
                    ))
                  : null}

                {showCelebrityResults
                  ? celebrityMatches.map((celebrity) => (
                      <li key={celebrity.name}>
                        <ResultRow
                          title={celebrity.name}
                          subtitle="Celebrity"
                          onClick={() => handleSelect(customTextPick(celebrity.name))}
                          icon={
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-lg">
                              {celebrity.emoji}
                            </span>
                          }
                        />
                      </li>
                    ))
                  : null}

                {showStateResults
                  ? locationSuggestions.map((item) => (
                      <li key={item.abbr}>
                        <ResultRow
                          title={item.label}
                          subtitle={item.abbr}
                          onClick={() => handleSelect(suggestionToPick(item))}
                          icon={
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                              <MapPin className="h-4 w-4" />
                            </span>
                          }
                        />
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          ) : mode === "states" || (mode === "schools" && popularTab === "states") ? (
            <div className={CAROUSEL_CLASS}>
              {POPULAR_BROWSE_LOCATIONS.map((location) => (
                <button
                  key={location}
                  type="button"
                  onClick={() =>
                    handleSelect({
                      kind: "state",
                      label: location,
                      stateName: location,
                    })
                  }
                  className={PILL_BTN_CLASS}
                >
                  {location}
                </button>
              ))}
            </div>
          ) : (
            <>
              {mode === "all" && popularTab === "vibes" ? (
                <div className={CAROUSEL_CLASS}>
                  {VIBE_OPTIONS.map((tag) => {
                    const disabled = disabledVibeValues?.has(tag.value);
                    return (
                      <button
                        key={tag.value}
                        type="button"
                        disabled={disabled}
                        onClick={() =>
                          handleSelect({
                            kind: "vibe",
                            label: tag.label.replace(/^[^\s]+\s/, ""),
                            vibeValue: tag.value,
                          })
                        }
                        className={cn(PILL_BTN_CLASS, disabled && "cursor-not-allowed opacity-40")}
                      >
                        {tag.label}
                      </button>
                    );
                  })}
                </div>
              ) : null}

              {(mode === "all" && popularTab === "universities") ||
              (mode === "schools" && popularTab === "universities") ? (
                <div className={CAROUSEL_CLASS}>
                  {popularLoading ? (
                    <p className="text-sm text-gray-500">Loading…</p>
                  ) : (
                    popularColleges.map((college) => (
                      <button
                        key={college.id}
                        type="button"
                        onClick={() =>
                          handleSelect({
                            kind: "college",
                            label: college.name,
                            collegeSlug: college.slug ?? college.id,
                          })
                        }
                        className="snap-start flex max-w-[12rem] shrink-0 items-center gap-2.5 rounded-full border border-gray-200 bg-white min-h-[44px] py-1.5 pl-1.5 pr-3.5 text-left active:bg-gray-50"
                      >
                        <CollegePickerAvatar size="sm" name={college.name} src={getCollegeHeroUrl(college)} />
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium leading-tight text-gray-900">
                            {college.name}
                          </span>
                          {college.location ? (
                            <span className="block truncate text-[10px] leading-tight text-gray-500">
                              {college.location}
                            </span>
                          ) : null}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              ) : null}

              {mode === "all" && popularTab === "celebrities" ? (
                <div className={CAROUSEL_CLASS}>
                  {POPULAR_BROWSE_CELEBRITIES.map((celebrity) => (
                    <button
                      key={celebrity.name}
                      type="button"
                      onClick={() => handleSelect(customTextPick(celebrity.name))}
                      className={PILL_BTN_CLASS}
                    >
                      {celebrity.emoji} {celebrity.name}
                    </button>
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
