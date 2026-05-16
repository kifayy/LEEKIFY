import {
  HOME2_SECTION_HEADLINE_SCALE_CLASS,
} from "@/components/home2/constants";

/** Pick one: lightPurple | softSky | blush | sage | coolMist */
export type StudentsLoveSectionThemeId =
  | "lightPurple"
  | "softSky"
  | "blush"
  | "sage"
  | "coolMist";

export const STUDENTS_LOVE_SECTION_THEME_ID: StudentsLoveSectionThemeId = "lightPurple";

export type StudentsLoveSectionTheme = {
  id: StudentsLoveSectionThemeId;
  label: string;
  description: string;
  bg: string;
  gradient: string;
  borderClass: string;
  radialGlow: string;
  blobs: string[];
  headlineClass: string;
  headlineLeadClass: string;
  subtextClass: string;
  /** “Dream School” phrase styling */
  accentPhraseClass: string;
};

export const STUDENTS_LOVE_SECTION_THEMES: Record<
  StudentsLoveSectionThemeId,
  StudentsLoveSectionTheme
> = {
  lightPurple: {
    id: "lightPurple",
    label: "Light purple",
    description: "Soft lavender band — on-brand without heavy saturation; dark text throughout.",
    bg: "#ebe6ff",
    gradient:
      "linear-gradient(180deg, #f7f4ff 0%, #ebe6ff 20%, #e2d9ff 46%, #e8e2ff 70%, #f3efff 100%)",
    borderClass: "border-violet-200/55",
    radialGlow:
      "radial-gradient(ellipse 88% 68% at 50% 38%, rgba(149, 110, 254, 0.16) 0%, transparent 65%)",
    blobs: [
      "absolute -left-[10%] top-[8%] h-[min(400px,52vw)] w-[min(400px,52vw)] rounded-full bg-violet-300/40 blur-[80px]",
      "absolute -right-[8%] top-[20%] h-[min(340px,46vw)] w-[min(340px,46vw)] rounded-full bg-purple-200/45 blur-[72px]",
      "absolute left-[32%] bottom-[5%] h-[min(260px,36vw)] w-[min(300px,40vw)] rounded-full bg-indigo-200/30 blur-[68px]",
    ],
    headlineClass: HOME2_SECTION_HEADLINE_SCALE_CLASS,
    headlineLeadClass: "text-neutral-800",
    subtextClass:
      "text-[0.9rem] text-neutral-600 md:text-[clamp(0.9375rem,0.45vw+0.68rem,1.2rem)]",
    accentPhraseClass:
      "inline-block rounded-lg bg-[#956EFE] px-2.5 py-0.5 text-white shadow-[0_2px_10px_rgba(149,110,254,0.35)]",
  },
  softSky: {
    id: "softSky",
    label: "Soft sky",
    description: "Calm blue-gray — trustworthy, “guidance” feel; purple accent pops.",
    bg: "#e8f2fa",
    gradient:
      "linear-gradient(180deg, #f4f9fd 0%, #e8f2fa 24%, #dceaf6 52%, #e4eff8 78%, #f0f7fc 100%)",
    borderClass: "border-sky-200/55",
    radialGlow:
      "radial-gradient(ellipse 85% 65% at 50% 35%, rgba(56, 189, 248, 0.12) 0%, transparent 62%)",
    blobs: [
      "absolute -left-[10%] top-[8%] h-[min(400px,52vw)] w-[min(400px,52vw)] rounded-full bg-sky-300/40 blur-[80px]",
      "absolute -right-[8%] top-[20%] h-[min(340px,46vw)] w-[min(340px,46vw)] rounded-full bg-blue-200/45 blur-[72px]",
      "absolute left-[32%] bottom-[5%] h-[min(260px,36vw)] w-[min(300px,40vw)] rounded-full bg-slate-300/30 blur-[68px]",
    ],
    headlineClass: HOME2_SECTION_HEADLINE_SCALE_CLASS,
    headlineLeadClass: "text-neutral-800",
    subtextClass:
      "text-[0.9rem] text-slate-600 md:text-[clamp(0.9375rem,0.45vw+0.68rem,1.2rem)]",
    accentPhraseClass:
      "underline decoration-sky-400/60 decoration-[3px] underline-offset-[0.22em] text-neutral-800",
  },
  blush: {
    id: "blush",
    label: "Blush",
    description: "Warm rose wash — friendly and energetic without beige or heavy purple.",
    bg: "#fce8ee",
    gradient:
      "linear-gradient(180deg, #fff5f7 0%, #fce8ee 22%, #f9dce6 48%, #fae4ec 72%, #fff8fa 100%)",
    borderClass: "border-rose-200/50",
    radialGlow:
      "radial-gradient(ellipse 85% 65% at 50% 35%, rgba(244, 114, 182, 0.1) 0%, transparent 62%)",
    blobs: [
      "absolute -left-[10%] top-[8%] h-[min(400px,52vw)] w-[min(400px,52vw)] rounded-full bg-rose-300/35 blur-[80px]",
      "absolute -right-[8%] top-[20%] h-[min(340px,46vw)] w-[min(340px,46vw)] rounded-full bg-pink-200/40 blur-[72px]",
      "absolute left-[32%] bottom-[5%] h-[min(260px,36vw)] w-[min(300px,40vw)] rounded-full bg-orange-100/35 blur-[68px]",
    ],
    headlineClass: HOME2_SECTION_HEADLINE_SCALE_CLASS,
    headlineLeadClass: "text-neutral-800",
    subtextClass:
      "text-[0.9rem] text-rose-900/70 md:text-[clamp(0.9375rem,0.45vw+0.68rem,1.2rem)]",
    accentPhraseClass:
      "underline decoration-rose-400/60 decoration-[3px] underline-offset-[0.22em] text-neutral-800",
  },
  sage: {
    id: "sage",
    label: "Sage",
    description: "Muted green — fresh “growth” tone; pairs well with photo cards and amber stars.",
    bg: "#e6f0ea",
    gradient:
      "linear-gradient(180deg, #f3faf6 0%, #e6f0ea 24%, #dcebe3 50%, #e4f2e9 76%, #f2f9f5 100%)",
    borderClass: "border-emerald-200/50",
    radialGlow:
      "radial-gradient(ellipse 85% 65% at 50% 35%, rgba(52, 211, 153, 0.1) 0%, transparent 62%)",
    blobs: [
      "absolute -left-[10%] top-[8%] h-[min(400px,52vw)] w-[min(400px,52vw)] rounded-full bg-emerald-200/40 blur-[80px]",
      "absolute -right-[8%] top-[20%] h-[min(340px,46vw)] w-[min(340px,46vw)] rounded-full bg-teal-200/35 blur-[72px]",
      "absolute left-[32%] bottom-[5%] h-[min(260px,36vw)] w-[min(300px,40vw)] rounded-full bg-green-100/40 blur-[68px]",
    ],
    headlineClass: HOME2_SECTION_HEADLINE_SCALE_CLASS,
    headlineLeadClass: "text-neutral-800",
    subtextClass:
      "text-[0.9rem] text-emerald-900/70 md:text-[clamp(0.9375rem,0.45vw+0.68rem,1.2rem)]",
    accentPhraseClass:
      "underline decoration-emerald-400/55 decoration-[3px] underline-offset-[0.22em] text-neutral-800",
  },
  coolMist: {
    id: "coolMist",
    label: "Cool mist",
    description: "Neutral cool gray-blue — clearly tinted, minimal color opinion, very clean.",
    bg: "#eef1f6",
    gradient:
      "linear-gradient(180deg, #f8f9fb 0%, #eef1f6 26%, #e4e9f1 52%, #eceff4 78%, #f6f7f9 100%)",
    borderClass: "border-slate-300/45",
    radialGlow:
      "radial-gradient(ellipse 85% 65% at 50% 35%, rgba(100, 116, 139, 0.08) 0%, transparent 62%)",
    blobs: [
      "absolute -left-[10%] top-[8%] h-[min(400px,52vw)] w-[min(400px,52vw)] rounded-full bg-slate-300/35 blur-[80px]",
      "absolute -right-[8%] top-[20%] h-[min(340px,46vw)] w-[min(340px,46vw)] rounded-full bg-slate-200/50 blur-[72px]",
      "absolute left-[32%] bottom-[5%] h-[min(260px,36vw)] w-[min(300px,40vw)] rounded-full bg-blue-100/30 blur-[68px]",
    ],
    headlineClass: HOME2_SECTION_HEADLINE_SCALE_CLASS,
    headlineLeadClass: "text-neutral-800",
    subtextClass:
      "text-[0.9rem] text-slate-600 md:text-[clamp(0.9375rem,0.45vw+0.68rem,1.2rem)]",
    accentPhraseClass:
      "underline decoration-slate-400/50 decoration-[3px] underline-offset-[0.22em] text-neutral-800",
  },
};

export function getActiveStudentsLoveSectionTheme(): StudentsLoveSectionTheme {
  return STUDENTS_LOVE_SECTION_THEMES[STUDENTS_LOVE_SECTION_THEME_ID];
}
