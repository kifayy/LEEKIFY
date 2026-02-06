import { redirect } from "next/navigation";

const NEWSLETTER_URL = "https://awarded.app/newsletter";

export default function NewsletterPage() {
  redirect(NEWSLETTER_URL);
}
