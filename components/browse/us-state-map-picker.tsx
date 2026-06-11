"use client";

import { useMemo, useState, type ComponentProps } from "react";
import {
  StateAbbreviations,
  StateNames,
  USAMap,
  type USAStateAbbreviation,
} from "@mirawision/usa-map-react";

import { US_STATE_ABBR_TO_NAME } from "@/lib/us-states";
import { cn } from "@/lib/utils";

type Props = {
  onSelect: (stateName: string, abbr: string) => void;
  selectedAbbr?: string | null;
  compact?: boolean;
};

const DEFAULT_FILL = "#ebe6fa";
const DEFAULT_STROKE = "#c9bdf5";
const HOVER_FILL = "#ddd0ff";
const HOVER_STROKE = "#956EFE";
const SELECTED_FILL = "#956EFE";
const SELECTED_STROKE = "#6b46c1";

export function UsStateMapPicker({ onSelect, selectedAbbr, compact = false }: Props) {
  const [hoveredAbbr, setHoveredAbbr] = useState<USAStateAbbreviation | null>(null);

  const customStates = useMemo(() => {
    const settings: NonNullable<ComponentProps<typeof USAMap>["customStates"]> = {};

    for (const abbr of StateAbbreviations) {
      const state = abbr as USAStateAbbreviation;
      const isSelected = selectedAbbr === state;
      const isHovered = hoveredAbbr === state;

      let fill = DEFAULT_FILL;
      let stroke = DEFAULT_STROKE;

      if (isSelected) {
        fill = SELECTED_FILL;
        stroke = SELECTED_STROKE;
      } else if (isHovered) {
        fill = HOVER_FILL;
        stroke = HOVER_STROKE;
      }

      settings[state] = {
        fill,
        stroke,
        label: {
          enabled: true,
          render: () => (
            <tspan
              style={{
                fontSize: "7px",
                fontWeight: 700,
                fill: isSelected ? "#ffffff" : "#4b5563",
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              {state}
            </tspan>
          ),
        },
        tooltip: {
          enabled: true,
          render: () => (
            <span className="text-sm font-medium text-[#0C1120]">
              {StateNames[state] ?? US_STATE_ABBR_TO_NAME[state]}
            </span>
          ),
        },
        onClick: () => {
          const name = US_STATE_ABBR_TO_NAME[state] ?? StateNames[state];
          if (name) onSelect(name, state);
        },
        onHover: () => setHoveredAbbr(state),
        onLeave: () => setHoveredAbbr((prev) => (prev === state ? null : prev)),
      };
    }

    return settings;
  }, [hoveredAbbr, onSelect, selectedAbbr]);

  const activeLabel =
    (selectedAbbr && US_STATE_ABBR_TO_NAME[selectedAbbr]) ||
    (hoveredAbbr && (US_STATE_ABBR_TO_NAME[hoveredAbbr] ?? StateNames[hoveredAbbr])) ||
    null;

  return (
    <div
      className={cn(
        compact
          ? "rounded-xl border border-gray-200 bg-[#faf8ff] p-2"
          : "rounded-2xl border border-[#e4dcff] bg-gradient-to-b from-[#faf8ff] to-white p-4 shadow-sm sm:p-6",
      )}
    >
      {!compact ? (
        <div className="mb-4 text-center">
          <p className="text-sm font-medium text-[#956EFE]">Explore by state</p>
          <p className="mt-1 text-sm text-gray-600">Click a state to find colleges there.</p>
        </div>
      ) : null}

      <div
        className={cn(
          "mx-auto w-full overflow-hidden rounded-xl bg-white/80",
          compact ? "p-1" : "max-w-3xl p-2 sm:p-4",
        )}
      >
        <USAMap
          className={cn(
            "w-full [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:w-full [&_svg]:cursor-pointer",
            compact ? "[&_svg]:max-h-[200px]" : "[&_svg]:max-h-[420px]",
          )}
          mapSettings={{
            width: "100%",
            height: "fit-content",
            title: "Interactive United States map — click a state to browse colleges",
          }}
          defaultState={{
            fill: DEFAULT_FILL,
            stroke: DEFAULT_STROKE,
          }}
          customStates={customStates}
        />
      </div>

      <div
        aria-live="polite"
        className={cn(
          "rounded-xl border px-3 py-2 text-center transition-colors",
          compact ? "mt-2 min-h-[2rem] text-xs" : "mt-4 min-h-[2.5rem] text-sm",
          activeLabel
            ? "border-[#956EFE]/30 bg-[#f3eeff] text-[#0C1120]"
            : "border-gray-100 bg-gray-50 text-gray-500",
        )}
      >
        {activeLabel ? (
          compact ? (
            <span className="font-semibold text-[#956EFE]">{activeLabel}</span>
          ) : (
            <>
              <span className="font-semibold text-[#956EFE]">{activeLabel}</span>
              <span className="text-gray-600"> — click to explore colleges</span>
            </>
          )
        ) : compact ? (
          "Tap a state"
        ) : (
          "Hover or click a state"
        )}
      </div>
    </div>
  );
}
