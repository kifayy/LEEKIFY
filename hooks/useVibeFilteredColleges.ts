"use client";

import type { College } from "@/types/college";

/**
 * Browse page uses parent `Directory` Supabase query (search + `.contains` on 2 vibes).
 * This hook is kept for API compatibility; `SchoolGrid` uses parent `colleges` only.
 */
export function useVibeFilteredColleges(_selectedVibes: string[]): {
  colleges: College[];
  loading: boolean;
  error: string | null;
} {
  return { colleges: [], loading: false, error: null };
}
