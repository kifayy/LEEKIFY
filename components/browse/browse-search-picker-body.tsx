"use client";

import { ArrowLeft, Building2, MapPin, Search, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

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
import type { College } from "@/types/college";

export type BrowseSearchPickerBodyProps = {
  open: boolean;
  title: string;
  query: string;
  onQueryChange: (value: string) => void;
  onClose: () => void;
  onSelect: (pick: BrowseSearchPick) => void;
  mode?: "all" | "states" | "schools";
  /** Subset of browse tabs to show in `all` mode. Defaults to all tabs. */
  browseTabs?: readonly PopularBrowseTab[];
  disabledVibeValues?: Set<string>;
  /** Sheet shows a back button; dialog relies on the dialog close control. */
  showBackButton?: boolean;
  /** Mobile browse sheet uses the purple hero styling. */
  variant?: "default" | "browse";
  /** Mobile uses horizontal carousels; desktop dialog uses a scrollable grid. */
  popularLayout?: "carousel" | "grid";
  className?: string;
  contentClassName?: string;
};

const CAROUSEL_CLASS =
  "-mx-4 flex items-center gap-2.5 overflow-x-auto px-4 scrollbar-hide snap-x snap-mandatory touch-pan-x";

const GRID_CLASS = "grid grid-cols-2 gap-2 sm:grid-cols-3";

const GRID_UNIVERSITY_CLASS = "grid grid-cols-1 gap-2 sm:grid-cols-2";

const PILL_BTN_CLASS =
  "snap-start shrink-0 min-h-[44px] rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium leading-none text-gray-800 hover:bg-gray-50 active:bg-gray-50";

const GRID_PILL_BTN_CLASS =
  "min-h-[44px] rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium leading-none text-gray-800 hover:bg-gray-50 active:bg-gray-50";

const GRID_UNIVERSITY_BTN_CLASS =
  "flex w-full items-center gap-2.5 rounded-2xl border border-gray-200 bg-white min-h-[44px] py-2 pl-2 pr-3 text-left hover:bg-gray-50 active:bg-gray-50";

const BROWSE_PILL_BTN_CLASS =
  "snap-start shrink-0 min-h-[44px] rounded-full border border-gray-100 bg-white px-4 py-2.5 text-sm font-semibold leading-none text-[#0C1120] shadow-[0_4px_14px_rgba(12,17,32,0.06)] hover:bg-gray-50 active:scale-[0.98]";

const BROWSE_GRID_PILL_BTN_CLASS =
  "min-h-[44px] rounded-full border border-gray-100 bg-white px-4 py-2.5 text-sm font-semibold leading-none text-[#0C1120] shadow-[0_4px_14px_rgba(12,17,32,0.06)] hover:bg-gray-50 active:scale-[0.98]";

const BROWSE_UNIVERSITY_BTN_CLASS =
  "snap-start flex max-w-[12rem] shrink-0 items-center gap-2.5 rounded-[1.25rem] border border-gray-100 bg-white min-h-[44px] py-2 pl-2 pr-3.5 text-left shadow-[0_4px_14px_rgba(12,17,32,0.06)] hover:bg-gray-50 active:scale-[0.98]";

const BROWSE_GRID_UNIVERSITY_BTN_CLASS =
  "flex w-full items-center gap-2.5 rounded-[1.25rem] border border-gray-100 bg-white min-h-[44px] py-2 pl-2 pr-3 text-left shadow-[0_4px_14px_rgba(12,17,32,0.06)] hover:bg-gray-50 active:scale-[0.98]";

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
  browse = false,
}: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  onClick: () => void;
  disabled?: boolean;
  browse?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        browse
          ? "mb-2 flex w-full items-center gap-3 rounded-[1.25rem] border border-gray-100 bg-white px-3 py-3 text-left shadow-[0_4px_14px_rgba(12,17,32,0.06)]"
          : "flex w-full items-center gap-3 border-b border-gray-100 px-1 py-3 text-left last:border-b-0",
        disabled ? "cursor-not-allowed opacity-40" : browse ? "active:scale-[0.99] hover:bg-gray-50" : "hover:bg-gray-50 active:bg-gray-50",
      )}
    >
      {icon}
      <span className="min-w-0 flex-1">
        <span className={cn("block truncate", browse ? "text-[15px] font-semibold text-[#0C1120]" : "text-[15px] text-gray-900")}>
          {title}
        </span>
        {subtitle ? (
          <span className={cn("block truncate text-sm", browse ? "text-[#956EFE]" : "text-gray-500")}>{subtitle}</span>
        ) : null}
      </span>
    </button>
  );
}

type UniversityPickerItem = {
  id: string;
  name: string;
  location?: string | null;
  heroUrl?: string | null;
};

function UniversityResultRow({
  item,
  onClick,
  browse = false,
}: {
  item: UniversityPickerItem;
  onClick: () => void;
  browse?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        browse
          ? "mb-2 flex w-full items-start gap-3 rounded-[1.25rem] border border-gray-100 bg-white px-3 py-3 text-left shadow-[0_4px_14px_rgba(12,17,32,0.06)] active:scale-[0.99] hover:bg-gray-50"
          : "flex w-full items-start gap-3 border-b border-gray-100 px-1 py-3 text-left last:border-b-0 hover:bg-gray-50 active:bg-gray-50",
      )}
    >
      <CollegePickerAvatar name={item.name} src={item.heroUrl ?? null} />
      <span className="min-w-0 flex-1">
        <span className={cn("block leading-snug", browse ? "text-[15px] font-semibold text-[#0C1120]" : "text-[15px] font-medium text-gray-900")}>
          {item.name}
        </span>
        {item.location ? (
          <span className="mt-0.5 flex items-center gap-1 text-left text-xs text-gray-500">
            <MapPin className="h-3 w-3 shrink-0" aria-hidden />
            <span className="truncate">{item.location}</span>
          </span>
        ) : null}
      </span>
    </button>
  );
}

function collegeToPickerItem(college: College): UniversityPickerItem {
  return {
    id: college.id,
    name: college.name,
    location: college.location,
    heroUrl: getCollegeHeroUrl(college),
  };
}

function suggestionToPickerItem(item: Extract<BrowseSuggestion, { kind: "college" }>): UniversityPickerItem {
  return {
    id: item.id,
    name: item.label,
    location: item.location,
    heroUrl: item.heroUrl,
  };
}

export function BrowseSearchPickerBody({
  open,
  title,
  query,
  onQueryChange,
  onClose,
  onSelect,
  mode = "all",
  browseTabs,
  disabledVibeValues,
  showBackButton = false,
  variant = "default",
  popularLayout = "carousel",
  className,
  contentClassName,
}: BrowseSearchPickerBodyProps) {
  const isBrowse = variant === "browse";
  const inputRef = useRef<HTMLInputElement>(null);
  const [popularTab, setPopularTab] = useState<PopularBrowseTab | PopularSchoolsTab>("vibes");
  const visibleBrowseTabs = useMemo(
    () => (browseTabs ? POPULAR_BROWSE_TABS.filter((tab) => browseTabs.includes(tab.id)) : POPULAR_BROWSE_TABS),
    [browseTabs],
  );
  const includesUniversities = visibleBrowseTabs.some((tab) => tab.id === "universities");
  const { vibes, universitySuggestions, locationSuggestions, customQuery, loading } =
    useBrowseSearchSuggestions(query, mode);
  const { colleges: popularColleges, loading: popularLoading } = useBrowsePopularColleges(
    open && includesUniversities && (mode === "all" || mode === "schools"),
  );

  useEffect(() => {
    if (open) {
      setPopularTab(mode === "schools" ? "universities" : visibleBrowseTabs[0]?.id ?? "vibes");
      const t = window.setTimeout(() => inputRef.current?.focus(), 120);
      return () => window.clearTimeout(t);
    }
  }, [open, mode, visibleBrowseTabs]);

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
    includesUniversities &&
    (mode === "schools" ? isSearching : mode === "all" ? popularTab === "universities" : false);
  const showCelebrityResults = mode === "all" && popularTab === "celebrities";
  const showStateResults = mode === "states" || (mode === "schools" && isSearching);

  const customResultSubtitle =
    mode === "states"
      ? "Use this state"
      : mode === "schools"
        ? "Use this search"
        : popularTab === "vibes"
          ? "Use this aesthetic"
          : popularTab === "universities"
            ? "Use this university"
            : "Use this celebrity";

  const isGrid = popularLayout === "grid";
  const pillClass = isBrowse
    ? isGrid
      ? BROWSE_GRID_PILL_BTN_CLASS
      : BROWSE_PILL_BTN_CLASS
    : isGrid
      ? GRID_PILL_BTN_CLASS
      : PILL_BTN_CLASS;
  const popularContainerClass = isGrid ? GRID_CLASS : CAROUSEL_CLASS;
  const universityContainerClass = isGrid ? GRID_UNIVERSITY_CLASS : CAROUSEL_CLASS;
  const universityBtnClass = isBrowse
    ? isGrid
      ? BROWSE_GRID_UNIVERSITY_BTN_CLASS
      : BROWSE_UNIVERSITY_BTN_CLASS
    : isGrid
      ? GRID_UNIVERSITY_BTN_CLASS
      : "snap-start flex max-w-[12rem] shrink-0 items-center gap-2.5 rounded-full border border-gray-200 bg-white min-h-[44px] py-1.5 pl-1.5 pr-3.5 text-left hover:bg-gray-50 active:bg-gray-50";

  const renderTabs = (tabs: { id: PopularBrowseTab | PopularSchoolsTab; label: string }[]) => {
    if (isBrowse) {
      return (
        <div className="mb-4 flex rounded-full border border-gray-100 bg-white p-1 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setPopularTab(tab.id)}
              className={cn(
                "flex flex-1 items-center justify-center rounded-full py-2.5 text-sm font-semibold transition",
                popularTab === tab.id ? "bg-[#956EFE] text-white shadow-sm" : "text-gray-500",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      );
    }

    return (
      <div className="mb-2 flex gap-1 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setPopularTab(tab.id)}
            className={cn(
              "border-b-2 px-3 pb-1.5 pt-0.5 text-sm transition",
              popularTab === tab.id
                ? "border-gray-900 font-medium text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className={cn("flex min-h-0 flex-col", className)}>
      <div className={cn(isBrowse ? "shrink-0 px-4 pb-3 pt-4" : "shrink-0 border-b border-gray-200 px-4 py-3")}>
        <div className="flex items-center gap-2">
          {showBackButton ? (
            <button
              type="button"
              onClick={onClose}
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                isBrowse
                  ? "text-[#0C1120] hover:bg-[#EDE9FE] active:bg-[#EDE9FE]"
                  : "text-gray-600 hover:bg-gray-100 active:bg-gray-100",
              )}
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          ) : null}
          <h2 className={cn(isBrowse ? "font-hero text-xl font-bold text-[#0C1120]" : "text-[17px] font-semibold text-gray-900")}>
            {title}
          </h2>
        </div>

        <form
          className="mt-3 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            submitCustom();
          }}
        >
          <div
            className={cn(
              "flex min-w-0 flex-1 items-center bg-white px-3",
              isBrowse
                ? "rounded-2xl border border-gray-100 shadow-sm focus-within:border-[#956EFE]/40 focus-within:ring-2 focus-within:ring-[#956EFE]/20"
                : "rounded-xl border border-gray-300",
            )}
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="min-w-0 flex-1 py-3 text-base text-[#0C1120] placeholder:text-gray-400 focus:outline-none"
            />
            {trimmed ? (
              <button
                type="button"
                onClick={() => onQueryChange("")}
                className="ml-1 text-gray-400 hover:text-gray-600 active:text-gray-600"
                aria-label="Clear"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={!customQuery}
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center text-white disabled:opacity-35",
              isBrowse ? "rounded-2xl bg-[#956EFE] hover:bg-[#8B5CF6] active:bg-[#8B5CF6]" : "rounded-xl bg-[#3DBFBF]",
            )}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>
      </div>

      <div
        className={cn(
          "px-4 pb-4",
          isSearching || isGrid ? "min-h-0 flex-1 overflow-y-auto pt-2" : "shrink-0 pt-1",
          isBrowse && "bg-[#FAFAFC]",
          contentClassName,
        )}
      >
        {mode === "all" ? renderTabs(visibleBrowseTabs) : mode === "schools" ? renderTabs(POPULAR_SCHOOLS_TABS) : null}

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
                    browse={isBrowse}
                    icon={
                      <span
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full text-gray-600",
                          isBrowse ? "bg-[#EDE9FE] text-[#956EFE]" : "bg-gray-100",
                        )}
                      >
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
                          subtitle="Aesthetic"
                          onClick={() => handleSelect(suggestionToPick(item))}
                          browse={isBrowse}
                          icon={
                            <span
                              className={cn(
                                "flex h-9 w-9 items-center justify-center rounded-full text-lg",
                                isBrowse ? "bg-[#EDE9FE]" : "bg-gray-100",
                              )}
                            >
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
                      <UniversityResultRow
                        item={suggestionToPickerItem(item)}
                        onClick={() => handleSelect(suggestionToPick(item))}
                        browse={isBrowse}
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
                        browse={isBrowse}
                        icon={
                          <span
                            className={cn(
                              "flex h-9 w-9 items-center justify-center rounded-full text-lg",
                              isBrowse ? "bg-[#FCE7F3]" : "bg-gray-100",
                            )}
                          >
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
                        browse={isBrowse}
                        icon={
                          <span
                            className={cn(
                              "flex h-9 w-9 items-center justify-center rounded-full text-gray-500",
                              isBrowse ? "bg-[#EDE9FE] text-[#956EFE]" : "bg-gray-100",
                            )}
                          >
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
          <div className={popularContainerClass}>
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
                className={pillClass}
              >
                {location}
              </button>
            ))}
          </div>
        ) : (
          <>
            {mode === "all" && popularTab === "vibes" ? (
              <div className={popularContainerClass}>
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
                      className={cn(pillClass, disabled && "cursor-not-allowed opacity-40")}
                    >
                      {tag.label}
                    </button>
                  );
                })}
              </div>
            ) : null}

            {(mode === "all" && popularTab === "universities" && includesUniversities) ||
            (mode === "schools" && popularTab === "universities") ? (
              <div className={isBrowse ? "flex flex-col gap-0" : universityContainerClass}>
                {popularLoading ? (
                  <p className="text-sm text-gray-500">Loading…</p>
                ) : isBrowse ? (
                  popularColleges.map((college) => (
                    <UniversityResultRow
                      key={college.id}
                      item={collegeToPickerItem(college)}
                      browse
                      onClick={() =>
                        handleSelect({
                          kind: "college",
                          label: college.name,
                          collegeSlug: college.slug ?? college.id,
                        })
                      }
                    />
                  ))
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
                      className={universityBtnClass}
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
              <div className={popularContainerClass}>
                {POPULAR_BROWSE_CELEBRITIES.map((celebrity) => (
                  <button
                    key={celebrity.name}
                    type="button"
                    onClick={() => handleSelect(customTextPick(celebrity.name))}
                    className={pillClass}
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
  );
}
