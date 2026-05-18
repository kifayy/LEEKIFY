"use client";

import { useEffect } from "react";

function isProtectedMediaTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  if (target instanceof HTMLImageElement) return true;
  if (target instanceof HTMLVideoElement) return true;
  if (target instanceof SVGElement && target.closest("picture, svg")) return true;
  return Boolean(target.closest("picture img, [data-protected-media]"));
}

/** Deters right-click save, drag-out, and image link copy on the site. */
export function SiteImageProtection() {
  useEffect(() => {
    const blockContextMenu = (event: MouseEvent) => {
      if (isProtectedMediaTarget(event.target)) event.preventDefault();
    };

    const blockDragStart = (event: DragEvent) => {
      if (isProtectedMediaTarget(event.target)) event.preventDefault();
    };

    const blockCopy = (event: ClipboardEvent) => {
      if (isProtectedMediaTarget(event.target)) event.preventDefault();
    };

    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("dragstart", blockDragStart);
    document.addEventListener("copy", blockCopy);

    return () => {
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("dragstart", blockDragStart);
      document.removeEventListener("copy", blockCopy);
    };
  }, []);

  return null;
}
