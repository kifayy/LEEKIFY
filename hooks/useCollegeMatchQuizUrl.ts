"use client";

import { useEffect, useState } from "react";

import { buildCollegeMatchQuizUrl } from "@/lib/attribution";
import { COLLEGE_MATCH_QUIZ_URL } from "@/lib/constants";

/** Quiz URL with session attribution appended (Snapchat UTMs, etc.). */
export function useCollegeMatchQuizUrl(): string {
  const [url, setUrl] = useState(COLLEGE_MATCH_QUIZ_URL);

  useEffect(() => {
    setUrl(buildCollegeMatchQuizUrl());
  }, []);

  return url;
}
