import { redirect } from "next/navigation";

/** Scholarship Quiz page removed; redirect to scholarships. Restore from app/_archive/scholarship-quiz/page.tsx if needed. */
export default function ScholarshipQuizRedirect() {
  redirect("/scholarships");
}
