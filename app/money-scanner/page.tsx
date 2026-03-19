import { redirect } from "next/navigation";

/** Legacy path: redirect to the new canonical URL. */
export default function MoneyScannerRedirect() {
  redirect("/scholarship-scanner");
}
