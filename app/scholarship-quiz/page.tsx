import { redirect } from "next/navigation";
import { SCHOLARSHIP_QUIZ_URL } from "@/lib/constants";

/** Scholarship Quiz: send visitors to Awarded web quiz. Restore from app/_archive/scholarship-quiz/page.tsx if needed. */
export default function ScholarshipQuizRedirect() {
  redirect(SCHOLARSHIP_QUIZ_URL);
}
