import { GRADE_OPTIONS } from "@/lib/gpa-calculator";

export const GPA_CALCULATOR_SLUG = "gpa-calculator";

export const GPA_CALCULATOR_TITLE =
  "GPA Calculator — Calculate Weighted & Cumulative GPA Online";

export const GPA_CALCULATOR_META_DESCRIPTION =
  "Free GPA calculator to calculate your GPA online. Track semester, weighted, and cumulative GPA on the 4.0 scale. Enter letter grades and credits — no signup required.";

export const GPA_CALCULATOR_H1 = "Free GPA Calculator";

export const GPA_CALCULATOR_INTRO = [
  "Drop in your classes, pick your grades, and see your GPA update live — semester by semester, weighted or not.",
  "Works for high school and college. No account, no spreadsheet, no guessing.",
] as const;

/** Hero feature pills — emojis only here. */
export const GPA_CALCULATOR_HERO_PILLS = [
  { emoji: "🌐", label: "Calculate GPA online" },
  { emoji: "⚖️", label: "Weighted & unweighted" },
  { emoji: "📈", label: "Cumulative GPA" },
  { emoji: "4️⃣", label: "4.0 scale" },
  { emoji: "🔓", label: "No signup" },
] as const;

export type GpaCalculatorFeature = {
  title: string;
  description: string;
};

export const GPA_CALCULATOR_FEATURES: readonly GpaCalculatorFeature[] = [
  {
    title: "Weighted GPA calculator",
    description:
      "Flip on weighted grading per semester. Honors get +0.5, AP/IB gets +1.0 — same logic most U.S. high schools use on a 5.0 scale.",
  },
  {
    title: "Cumulative GPA calculator",
    description:
      "Your cumulative GPA rolls up every course you've entered. We sum quality points and credits so you always see the real overall number.",
  },
  {
    title: "Calculate GPA by semester",
    description:
      "See how each term landed before it blends into your cumulative average. Add semesters, plug in grades and credits, get an instant semester GPA.",
  },
  {
    title: "High school & college GPA",
    description:
      "Whether you're checking a high school transcript or a university semester — this runs on the standard 4.0 grading scale.",
  },
] as const;

export const GPA_SCALE_ROWS = GRADE_OPTIONS.map((grade) => ({
  letter: grade.label,
  points: grade.points.toFixed(1),
}));

export const GPA_HOW_TO_STEPS = [
  {
    title: "Enter your courses",
    body: "Add each class with its letter grade and credit hours. Half credits (0.5) work too if your school uses them.",
  },
  {
    title: "Choose weighted or unweighted",
    body: "Turn on the weighted toggle for honors, AP, or IB. Regular classes stay on 4.0; weighted ones can hit up to 5.0.",
  },
  {
    title: "Read your semester GPA",
    body: "Each semester block shows its own GPA — grade points divided by credits for that term only.",
  },
  {
    title: "Check cumulative GPA",
    body: "The big circle is your overall GPA across every semester you entered. That's the number on most transcripts.",
  },
] as const;

export type GpaCalculatorFaq = {
  question: string;
  answer: string;
};

export const GPA_CALCULATOR_FAQ: readonly GpaCalculatorFaq[] = [
  {
    question: "How do I calculate my GPA online?",
    answer:
      "Multiply each course's grade points by its credit hours to get quality points. Add them up, divide by total credits, round to two decimals. This calculator does that automatically — no spreadsheet required.",
  },
  {
    question: "What is the difference between weighted and unweighted GPA?",
    answer:
      "Unweighted GPA uses the standard 4.0 scale for every class. Weighted GPA adds extra points for advanced courses — typically +0.5 for honors and +1.0 for AP or IB — so strong students in hard classes can go above 4.0 on a 5.0 scale.",
  },
  {
    question: "How do I calculate cumulative GPA?",
    answer:
      "Cumulative GPA is total quality points from every completed course divided by total credit hours. Add all semesters together — don't just average semester GPAs, because terms with more credits should count more.",
  },
  {
    question: "What is a 4.0 GPA scale?",
    answer:
      "The 4.0 scale maps letter grades to points: A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0, with pluses and minuses in between. Most U.S. high schools and colleges report GPA this way.",
  },
  {
    question: "How do I convert GPA to percentage?",
    answer:
      "Rough rule on a 4.0 scale: percentage ≈ (GPA ÷ 4.0) × 100. So a 3.5 GPA is about 87.5%. Schools differ though — check with your registrar before using a converted number officially.",
  },
  {
    question: "How do I calculate high school GPA?",
    answer:
      "List every class from each semester with its letter grade and credits — core, electives, all of it. If your school weights honors/AP, mark those courses. Colleges usually care most about your cumulative GPA.",
  },
  {
    question: "What GPA do colleges look at?",
    answer:
      "Most colleges review cumulative GPA on your transcript, often recalculating core academic courses. Weighted GPA shows rigor, but many admissions offices also look at unweighted GPA and how hard your schedule was.",
  },
  {
    question: "Can I calculate GPA without credits?",
    answer:
      "You can average letter grades, but it's less accurate. A 4-credit class should pull your GPA more than a 1-credit class. That's why this calculator asks for credits.",
  },
] as const;

export const GPA_TYPES_SECTIONS = [
  {
    id: "weighted-gpa",
    title: "Weighted GPA",
    body: "Adds bonus points for advanced coursework. Turn on the weighted toggle and mark honors (+0.5) or AP/IB (+1.0). The cumulative gauge switches to a 5.0 scale when any semester uses weighting.",
  },
  {
    id: "cumulative-gpa",
    title: "Cumulative GPA",
    body: "The running average on most transcripts. Stack semester blocks to mirror your real course history and get an accurate cumulative number without doing the math yourself.",
  },
  {
    id: "gpa-percentage",
    title: "GPA to percentage",
    body: "Quick benchmark: divide your GPA by 4 and multiply by 100. A 3.0 ≈ 75%. Always double-check with your school's conversion policy before using it on anything official.",
  },
] as const;
