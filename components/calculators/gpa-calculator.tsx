"use client";

import { useMemo, useState } from "react";
import { Plus, X } from "lucide-react";

import { CumulativeGpaGauge } from "@/components/calculators/cumulative-gpa-gauge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  GRADE_OPTIONS,
  WEIGHT_OPTIONS,
  calculateCumulativeGpa,
  calculateSemesterGpa,
  createCourse,
  createSemester,
  formatGpa,
  INITIAL_SEMESTERS,
  type Course,
  type Semester,
} from "@/lib/gpa-calculator";

const selectClassName =
  "flex h-12 w-full min-h-[44px] appearance-none rounded-xl border border-input bg-white bg-[length:16px] bg-[right_12px_center] bg-no-repeat px-4 py-3 pr-10 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pathpicker-purple focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF] md:h-10 md:min-h-0 md:py-2 md:text-sm";

const selectChevronStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
};

function WeightedToggle({
  enabled,
  onChange,
  id,
}: {
  enabled: boolean;
  onChange: (value: boolean) => void;
  id: string;
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-[#58595D]">
      <span>Weighted</span>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={cn(
          "relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pathpicker-purple focus-visible:ring-offset-2",
          enabled ? "bg-[#956EFE]" : "bg-[#D1D5DB]",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform",
            enabled && "translate-x-5",
          )}
        />
      </button>
    </label>
  );
}

function CourseRow({
  course,
  weighted,
  onChange,
  onRemove,
  canRemove,
}: {
  course: Course;
  weighted: boolean;
  onChange: (patch: Partial<Course>) => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 border-b border-[#E8E8EC] py-4 last:border-b-0 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)_minmax(0,0.7fr)_minmax(0,0.9fr)_auto] sm:items-center sm:gap-3">
      <Input
        placeholder="Course name"
        value={course.name}
        onChange={(event) => onChange({ name: event.target.value })}
        aria-label="Course name"
        className="bg-white"
      />
      <select
        value={course.grade}
        onChange={(event) => onChange({ grade: event.target.value as Course["grade"] })}
        aria-label="Grade"
        className={selectClassName}
        style={selectChevronStyle}
      >
        <option value="">Grade</option>
        {GRADE_OPTIONS.map((grade) => (
          <option key={grade.value} value={grade.value}>
            {grade.label}
          </option>
        ))}
      </select>
      <Input
        type="number"
        inputMode="decimal"
        min="0"
        step="0.5"
        placeholder="Credits"
        value={course.credits}
        onChange={(event) => onChange({ credits: event.target.value })}
        aria-label="Credits"
        className="bg-white"
      />
      <select
        value={course.weight}
        onChange={(event) => onChange({ weight: event.target.value as Course["weight"] })}
        aria-label="Course weight"
        disabled={!weighted}
        className={selectClassName}
        style={selectChevronStyle}
      >
        {WEIGHT_OPTIONS.map((weight) => (
          <option key={weight.value} value={weight.value}>
            {weight.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={onRemove}
        disabled={!canRemove}
        className="flex h-10 w-10 shrink-0 items-center justify-center self-end rounded-full text-[#9CA3AF] transition-colors hover:bg-[#F3F4F6] hover:text-[#58595D] disabled:invisible sm:self-center"
        aria-label="Remove course"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

function SemesterBlock({
  semester,
  index,
  onChange,
  onRemove,
  canRemove,
}: {
  semester: Semester;
  index: number;
  onChange: (next: Semester) => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const semesterGpa = calculateSemesterGpa(semester);
  const label = `Semester ${index + 1}`;

  const updateCourse = (courseId: string, patch: Partial<Course>) => {
    onChange({
      ...semester,
      courses: semester.courses.map((course) =>
        course.id === courseId ? { ...course, ...patch } : course,
      ),
    });
  };

  const removeCourse = (courseId: string) => {
    const nextCourses = semester.courses.filter((course) => course.id !== courseId);
    onChange({
      ...semester,
      courses: nextCourses.length > 0 ? nextCourses : [createCourse()],
    });
  };

  return (
    <Card className="overflow-hidden rounded-2xl border-[#E8E8EC] shadow-[0_4px_24px_rgba(24,26,29,0.06)]">
      <div className="flex items-start justify-between gap-4 border-b border-[#E8E8EC] px-5 py-4 md:px-6">
        <h2 className="text-xl font-bold text-[#181A1D]">{label}</h2>
        <div className="flex items-center gap-3">
          <WeightedToggle
            id={`weighted-${semester.id}`}
            enabled={semester.weighted}
            onChange={(weighted) => onChange({ ...semester, weighted })}
          />
          <button
            type="button"
            onClick={onRemove}
            disabled={!canRemove}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E8E8EC] text-[#9CA3AF] transition-colors hover:border-[#956EFE]/30 hover:bg-[#956EFE]/5 hover:text-[#956EFE] disabled:invisible"
            aria-label={`Remove ${label}`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="hidden px-5 pt-4 text-xs font-semibold uppercase tracking-wide text-[#9CA3AF] sm:grid sm:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)_minmax(0,0.7fr)_minmax(0,0.9fr)_auto] sm:gap-3 md:px-6">
        <span>Course name</span>
        <span>Grade</span>
        <span>Credits</span>
        <span>Weight</span>
        <span className="sr-only">Remove</span>
      </div>

      <div className="px-5 md:px-6">
        {semester.courses.map((course) => (
          <CourseRow
            key={course.id}
            course={course}
            weighted={semester.weighted}
            onChange={(patch) => updateCourse(course.id, patch)}
            onRemove={() => removeCourse(course.id)}
            canRemove={semester.courses.length > 1}
          />
        ))}
      </div>

      <div className="flex flex-col gap-4 border-t border-[#E8E8EC] px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
        <p className="text-sm font-medium text-[#58595D]">
          {label} GPA:{" "}
          <span className="font-bold tabular-nums text-[#181A1D]">{formatGpa(semesterGpa)}</span>
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            onChange({
              ...semester,
              courses: [...semester.courses, createCourse()],
            })
          }
          className="h-11 rounded-full border-[#956EFE] px-5 text-[#956EFE] hover:bg-[#956EFE]/5 hover:text-[#7C3AED]"
        >
          <Plus className="h-4 w-4" />
          Add course
        </Button>
      </div>
    </Card>
  );
}

export function GpaCalculator() {
  const [semesters, setSemesters] = useState<Semester[]>(INITIAL_SEMESTERS);

  const cumulative = useMemo(() => calculateCumulativeGpa(semesters), [semesters]);

  const updateSemester = (semesterId: string, next: Semester) => {
    setSemesters((current) =>
      current.map((semester) => (semester.id === semesterId ? next : semester)),
    );
  };

  const removeSemester = (semesterId: string) => {
    setSemesters((current) => {
      const next = current.filter((semester) => semester.id !== semesterId);
      return next.length > 0 ? next : [createSemester()];
    });
  };

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start lg:gap-10 xl:gap-12">
      <div className="min-w-0 space-y-6">
        {semesters.map((semester, index) => (
          <SemesterBlock
            key={semester.id}
            semester={semester}
            index={index}
            onChange={(next) => updateSemester(semester.id, next)}
            onRemove={() => removeSemester(semester.id)}
            canRemove={semesters.length > 1}
          />
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() => setSemesters((current) => [...current, createSemester()])}
          className="h-12 rounded-full border-2 border-[#956EFE] px-6 text-base font-semibold text-[#956EFE] hover:bg-[#956EFE]/5 hover:text-[#7C3AED]"
        >
          <Plus className="h-5 w-5" />
          Add semester
        </Button>
      </div>

      <div className="mt-8 flex justify-center lg:sticky lg:top-36 lg:mt-0 lg:justify-start">
        <CumulativeGpaGauge gpa={cumulative.gpa} maxScale={cumulative.maxScale} />
      </div>
    </div>
  );
}
