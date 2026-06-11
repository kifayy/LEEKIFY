"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "pathpicker-dev-chrome";
const SYNC_EVENT = "pathpicker-dev-chrome";

export type DevChromeMode = "expanded" | "minimized" | "hidden";

function readMode(): DevChromeMode {
  if (typeof window === "undefined") return "minimized";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "expanded" || saved === "minimized" || saved === "hidden") return saved;
  return "minimized";
}

type DevChromeContextValue = {
  mode: DevChromeMode;
  isExpanded: boolean;
  isMinimized: boolean;
  isHidden: boolean;
  expand: () => void;
  minimize: () => void;
  hide: () => void;
};

const DevChromeContext = createContext<DevChromeContextValue | null>(null);

export function DevChromeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<DevChromeMode>("minimized");

  useEffect(() => {
    setMode(readMode());
    const sync = () => setMode(readMode());
    window.addEventListener(SYNC_EVENT, sync);
    return () => window.removeEventListener(SYNC_EVENT, sync);
  }, []);

  const persist = useCallback((next: DevChromeMode) => {
    setMode(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new Event(SYNC_EVENT));
  }, []);

  const value = useMemo<DevChromeContextValue>(
    () => ({
      mode,
      isExpanded: mode === "expanded",
      isMinimized: mode === "minimized",
      isHidden: mode === "hidden",
      expand: () => persist("expanded"),
      minimize: () => persist("minimized"),
      hide: () => persist("hidden"),
    }),
    [mode, persist],
  );

  return <DevChromeContext.Provider value={value}>{children}</DevChromeContext.Provider>;
}

export function useDevChromePreference() {
  const ctx = useContext(DevChromeContext);
  if (!ctx) {
    throw new Error("useDevChromePreference must be used within DevChromeProvider");
  }
  return ctx;
}
