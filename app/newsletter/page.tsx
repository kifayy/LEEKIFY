import { NewsletterWidget } from "@/components/newsletter-widget";

export default function NewsletterPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-2xl">
        <NewsletterWidget />
      </div>
    </div>
  );
}
