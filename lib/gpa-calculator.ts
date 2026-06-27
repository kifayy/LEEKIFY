export const GRADE_OPTIONS = [
  { value: "A+", label: "A+", points: 4.0 },
  { value: "A", label: "A", points: 4.0 },
  { value: "A-", label: "A-", points: 3.7 },
  { value: "B+", label: "B+", points: 3.3 },
  { value: "B", label: "B", points: 3.0 },
  { value: "B-", label: "B-", points: 2.7 },
  { value: "C+", label: "C+", points: 2.3 },
  { value: "C", label: "C", points: 2.0 },
  { value: "C-", label: "C-", points: 1.7 },
  { value: "D+", label: "D+", points: 1.3 },
  { value: "D", label: "D", points: 1.0 },
  { value: "D-", label: "D-", points: 0.7 },
  { value: "F", label: "F", points: 0.0 },
] as const;

export const WEIGHT_OPTIONS = [
  { value: "regular", label: "Regular", bonus: 0 },
  { value: "honors", label: "Honors (+0.5)", bonus: 0.5 },
  { value: "ap", label: "AP / IB (+1.0)", bonus: 1.0 },
] as const;

export type GradeValue = (typeof GRADE_OPTIONS)[number]["value"];
export type WeightValue = (typeof WEIGHT_OPTIONS)[number]["value"];

export type Course = {
  id: string;
  name: string;
  grade: GradeValue | "";
  credits: string;
  weight: WeightValue;
};

export type Semester = {
  id: string;
  weighted: boolean;
  courses: Course[];
};

const GRADE_POINTS = Object.fromEntries(
  GRADE_OPTIONS.map((grade) => [grade.value, grade.points]),
) as Record<GradeValue, number>;

const WEIGHT_BONUS = Object.fromEntries(
  WEIGHT_OPTIONS.map((weight) => [weight.value, weight.bonus]),
) as Record<WeightValue, number>;

export function parseCredits(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed) || parsed <= 0) return null;
  return parsed;
}

export function courseQualityPoints(course: Course, weighted: boolean): number | null {
  if (!course.grade) return null;
  const credits = parseCredits(course.credits);
  if (credits == null) return null;

  let points = GRADE_POINTS[course.grade];
  if (weighted) {
    points = Math.min(points + WEIGHT_BONUS[course.weight], 5);
  }

  return points * credits;
}

export function courseCredits(course: Course): number | null {
  if (!course.grade) return null;
  return parseCredits(course.credits);
}

export function calculateSemesterGpa(semester: Semester): number | null {
  let totalPoints = 0;
  let totalCredits = 0;

  for (const course of semester.courses) {
    const qualityPoints = courseQualityPoints(course, semester.weighted);
    const credits = courseCredits(course);
    if (qualityPoints == null || credits == null) continue;
    totalPoints += qualityPoints;
    totalCredits += credits;
  }

  if (totalCredits === 0) return null;
  return totalPoints / totalCredits;
}

export function calculateCumulativeGpa(semesters: Semester[]): {
  gpa: number | null;
  maxScale: 4 | 5;
  totalCredits: number;
} {
  let totalPoints = 0;
  let totalCredits = 0;
  const hasWeightedSemester = semesters.some((semester) => semester.weighted);

  for (const semester of semesters) {
    for (const course of semester.courses) {
      const qualityPoints = courseQualityPoints(course, semester.weighted);
      const credits = courseCredits(course);
      if (qualityPoints == null || credits == null) continue;
      totalPoints += qualityPoints;
      totalCredits += credits;
    }
  }

  if (totalCredits === 0) {
    return { gpa: null, maxScale: hasWeightedSemester ? 5 : 4, totalCredits: 0 };
  }

  return {
    gpa: totalPoints / totalCredits,
    maxScale: hasWeightedSemester ? 5 : 4,
    totalCredits,
  };
}

export function formatGpa(value: number | null): string {
  if (value == null || Number.isNaN(value)) return "0.00";
  return value.toFixed(2);
}

/** Fixed initial tree so SSR and hydration render identical markup. */
export const INITIAL_SEMESTERS: Semester[] = [
  {
    id: "semester-1",
    weighted: false,
    courses: [
      {
        id: "course-1",
        name: "",
        grade: "",
        credits: "",
        weight: "regular",
      },
    ],
  },
];

let nextEntityId = 1;

function allocId(prefix: "semester" | "course"): string {
  nextEntityId += 1;
  return `${prefix}-${nextEntityId}`;
}

export function createCourse(): Course {
  return {
    id: allocId("course"),
    name: "",
    grade: "",
    credits: "",
    weight: "regular",
  };
}

export function createSemester(): Semester {
  return {
    id: allocId("semester"),
    weighted: false,
    courses: [createCourse()],
  };
}
