"use client";

import { BrowseSearchPickerBody, type BrowseSearchPickerBodyProps } from "@/components/browse/browse-search-picker-body";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Props = Omit<BrowseSearchPickerBodyProps, "showBackButton" | "className" | "contentClassName">;

export function BrowseSearchPickerDialog(props: Props) {
  const { open, onClose, ...bodyProps } = props;

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent
        className={cn(
          "hidden h-[min(85vh,720px)] max-h-[min(85vh,720px)] max-w-xl gap-0 overflow-hidden p-0 sm:rounded-2xl lg:grid",
        )}
      >
        <DialogTitle className="sr-only">{bodyProps.title}</DialogTitle>
        <BrowseSearchPickerBody
          {...bodyProps}
          open={open}
          onClose={onClose}
          popularLayout="grid"
          className="h-full min-h-0"
          contentClassName="min-h-0 flex-1"
        />
      </DialogContent>
    </Dialog>
  );
}
