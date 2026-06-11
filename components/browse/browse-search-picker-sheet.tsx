"use client";

import { BrowseSearchPickerBody, type BrowseSearchPickerBodyProps } from "@/components/browse/browse-search-picker-body";
import { cn } from "@/lib/utils";

type Props = Omit<BrowseSearchPickerBodyProps, "showBackButton" | "className" | "contentClassName">;

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
  if (!open) return null;

  const isSearching = query.trim().length > 0;

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
          "absolute inset-x-0 bottom-0 flex flex-col rounded-t-[1.75rem] bg-white shadow-[0_-20px_50px_rgba(12,17,32,0.12)] animate-in slide-in-from-bottom-4 duration-200",
          isSearching ? "h-[76vh] max-h-[92vh]" : "h-auto max-h-[min(72vh,520px)]",
        )}
      >
        <div aria-hidden className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-gray-200" />
        <BrowseSearchPickerBody
          open={open}
          title={title}
          query={query}
          onQueryChange={onQueryChange}
          onClose={onClose}
          onSelect={onSelect}
          mode={mode}
          disabledVibeValues={disabledVibeValues}
          showBackButton
          variant="browse"
          className="min-h-0 flex-1"
        />
      </div>
    </div>
  );
}
