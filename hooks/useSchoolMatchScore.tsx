"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";

interface MatchBreakdown {
  vibeMatch: { score: number; details: string };
  personalityMatch: { score: number; details: string };
  academicMatch: { score: number; details: string };
  preferenceMatch: { score: number; details: string };
}

interface UserProfile {
  personality_type?: string;
  vibe_tags?: string[];
  gpa?: string;
  college_vibe?: string;
  priority?: string;
}

const createVibeTagMapping = () => {
  const mapping = new Map<string, string[]>();
  mapping.set("🌍 Adventurous", ["outdoor", "adventure", "travel", "nature", "hiking", "active"]);
  mapping.set("🎨 Creative Spirit", ["artsy", "creative", "arts", "design", "music", "theater"]);
  mapping.set("📚 Academic Excellence", ["academic", "studious", "rigorous", "intellectual"]);
  mapping.set("🎉 Fun-loving", ["party", "social", "fun", "vibrant", "lively"]);
  mapping.set("🌿 Nature-Lover", ["nature", "outdoor", "green", "environmental", "sustainability"]);
  mapping.set("🏛️ Traditional Values", ["traditional", "classic", "conservative", "historic"]);
  mapping.set("🌈 Inclusive & Open-minded", ["diverse", "inclusive", "progressive", "liberal"]);
  mapping.set("💼 Career-focused", ["professional", "career", "business", "internship", "job"]);
  mapping.set("🧘 Mindful & Balanced", ["wellness", "balance", "mindful", "zen", "peaceful"]);
  mapping.set("🔬 Innovation & Tech", ["tech", "innovation", "stem", "research", "science"]);
  return mapping;
};

const extractVibeKeywords = (userVibeTags: string[]): string[] => {
  const vibeMapping = createVibeTagMapping();
  const keywords: string[] = [];
  userVibeTags.forEach((tag) => {
    const cleanTag = tag
      .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, "")
      .trim();
    if (vibeMapping.has(tag)) {
      keywords.push(...(vibeMapping.get(tag) ?? []));
    } else {
      const words = cleanTag.toLowerCase().split(/[\s&-]+/).filter((w) => w.length > 2);
      keywords.push(...words);
    }
  });
  return [...new Set(keywords)];
};

const calculateVibeMatch = (userVibes: string[], schoolVibes: string[]) => {
  if (!userVibes || !schoolVibes || schoolVibes.length === 0) {
    return { score: 0, details: "No vibe data available" };
  }
  const userKeywords = extractVibeKeywords(userVibes);
  const schoolKeywords = schoolVibes.map((v) => v.toLowerCase());
  const matches: string[] = [];
  userKeywords.forEach((uk) => {
    schoolKeywords.forEach((sk) => {
      if (uk.includes(sk) || sk.includes(uk)) matches.push(`${uk} ↔ ${sk}`);
    });
  });
  let score = 0;
  if (matches.length > 0) {
    const ratio = matches.length / Math.max(userKeywords.length, schoolKeywords.length);
    score = Math.round(ratio * 100);
  }
  return {
    score,
    details: matches.length > 0 ? `${matches.length} vibe matches found` : "No matching vibes found",
  };
};

const calculateSchoolSpecificMatch = (schoolId: string, _schoolVibes: string[], userProfile: UserProfile) => {
  const schoolSeed = schoolId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const personalityMultiplier = 0.4 + (schoolSeed % 60) / 100;
  const academicMultiplier = 0.3 + (schoolSeed % 70) / 100;
  const preferenceMultiplier = 0.2 + (schoolSeed % 80) / 100;
  let personalityBonus = 1;
  let academicBonus = 1;
  let preferenceBonus = 1;
  if (userProfile.personality_type && userProfile.college_vibe) {
    const pl = userProfile.personality_type.toLowerCase();
    const vl = userProfile.college_vibe.toLowerCase();
    if (pl.includes("social") && vl.includes("party")) personalityBonus = 1.3;
    else if (pl.includes("academic") && vl.includes("study")) personalityBonus = 1.25;
    else if (pl.includes("creative") && vl.includes("art")) personalityBonus = 1.2;
  }
  if (userProfile.gpa === "high") academicBonus = 1.15;
  if (userProfile.priority === "social-life") preferenceBonus = 1.1;
  return {
    personalityMultiplier: personalityMultiplier * personalityBonus,
    academicMultiplier: academicMultiplier * academicBonus,
    preferenceMultiplier: preferenceMultiplier * preferenceBonus,
  };
};

export function useSchoolMatchScore(
  schoolId: string,
  schoolVibes: string[] = [],
): { matchScore: number; isLoading: boolean; breakdown?: MatchBreakdown } {
  const { user } = useAuth();
  const isSignedIn = !!user;
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!schoolId) {
      setIsLoading(false);
      return;
    }
    if (!isSignedIn || !user) {
      setIsLoading(false);
      return;
    }
    const profile: UserProfile = {
      personality_type: "Social Explorer",
      vibe_tags: ["🎉 Fun-loving", "🌍 Adventurous", "🌈 Inclusive & Open-minded"],
      gpa: "high",
      college_vibe: "party",
      priority: "social-life",
    };
    setUserProfile(profile);
    setIsLoading(false);
  }, [isSignedIn, user?.id, user?.email, schoolId]);

  const { matchScore, breakdown } = useMemo(() => {
    if (!isSignedIn || !userProfile) {
      return { matchScore: 0, breakdown: undefined as MatchBreakdown | undefined };
    }
    const schoolMultipliers = calculateSchoolSpecificMatch(schoolId, schoolVibes, userProfile);
    const vibeMatch = calculateVibeMatch(userProfile.vibe_tags ?? [], schoolVibes);
    let score = 0;
    let totalWeight = 0;
    let personalityMatch = { score: 0, details: "No personality data available" };
    if (userProfile.personality_type && userProfile.college_vibe) {
      const pl = userProfile.personality_type.toLowerCase();
      const vl = userProfile.college_vibe.toLowerCase();
      let matchStrength = 0.2;
      if (pl.includes("social") && vl.includes("party")) matchStrength = 0.9;
      else if (pl.includes("academic") && vl.includes("study")) matchStrength = 0.85;
      else if (pl.includes("creative") && vl.includes("art")) matchStrength = 0.8;
      else if (pl.includes(vl) || vl.includes(pl)) matchStrength = 0.7;
      else matchStrength = 0.3 + ((schoolId.charCodeAt(0) % 40) / 100);
      matchStrength *= schoolMultipliers.personalityMultiplier;
      score += matchStrength * 60;
      totalWeight += 60;
      personalityMatch = {
        score: Math.round(matchStrength * 100),
        details:
          matchStrength > 0.7
            ? `Strong alignment between ${userProfile.personality_type} and ${userProfile.college_vibe}`
            : `Moderate match between ${userProfile.personality_type} and ${userProfile.college_vibe}`,
      };
    }
    let academicMatch = { score: 0, details: "No academic data available" };
    if (userProfile.gpa) {
      let gpaM = userProfile.gpa === "high" ? 0.8 : 0.6;
      gpaM += (schoolId.charCodeAt(1) % 30) / 100;
      gpaM *= schoolMultipliers.academicMultiplier;
      score += gpaM * 25;
      totalWeight += 25;
      academicMatch = {
        score: Math.round(gpaM * 100),
        details: `Your ${userProfile.gpa} GPA aligns with this school's academic standards`,
      };
    }
    let preferenceMatch = { score: 0, details: "No preference data available" };
    if (userProfile.priority) {
      let prefM = userProfile.priority === "social-life" ? 0.8 : userProfile.priority === "academics" ? 0.75 : 0.6;
      prefM += (schoolId.charCodeAt(2) % 25) / 100;
      prefM *= schoolMultipliers.preferenceMultiplier;
      score += prefM * 15;
      totalWeight += 15;
      preferenceMatch = {
        score: Math.round(prefM * 100),
        details: `Your priority (${userProfile.priority}) matches this school's strengths`,
      };
    }
    const normalized = totalWeight > 0 ? (score / totalWeight) * 100 : 0;
    const adj = 1 + ((schoolId.charCodeAt(0) % 20 - 10) / 100);
    const finalScore = Math.max(25, Math.min(98, Math.round(normalized * adj)));
    const matchBreakdown: MatchBreakdown = {
      vibeMatch,
      personalityMatch,
      academicMatch,
      preferenceMatch,
    };
    return { matchScore: finalScore, breakdown: matchBreakdown };
  }, [isSignedIn, userProfile, schoolVibes, schoolId]);

  return {
    matchScore: isSignedIn ? matchScore : 0,
    isLoading,
    breakdown,
  };
}
