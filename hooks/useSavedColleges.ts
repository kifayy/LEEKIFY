"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "pathpicker_saved_college_ids";

function readIdsFromStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function useSavedColleges() {
  const [savedColleges, setSavedColleges] = useState<Set<string>>(new Set());

  useEffect(() => {
    setSavedColleges(new Set(readIdsFromStorage()));
  }, []);

  const toggleSavedCollege = useCallback(async (schoolId: string, _name?: string) => {
    setSavedColleges((prev) => {
      const next = new Set(prev);
      if (next.has(schoolId)) next.delete(schoolId);
      else next.add(schoolId);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
      }
      return next;
    });
  }, []);

  const savedCollegesCount = useMemo(() => savedColleges.size, [savedColleges]);

  return { savedColleges, savedCollegesCount, toggleSavedCollege };
}
