import { Suspense } from "react";
import Link from "next/link";
import { getScholarshipsForMonth, getFeaturedScholarships, getAllScholarships } from "@/lib/supabase/queries/scholarships";
import { Card, CardContent } from "@/components/ui/card";

function formatDeadline(deadline: string | null): string {
  if (!deadline) return "No deadline";
  const d = new Date(deadline);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export const metadata = {
  title: "Featured Scholarships | Pathpicker",
  description:
    "Browse featured scholarships for students. Find opportunities matched to your profile and apply with ease.",
};

async function ScholarshipsList() {
  let scholarships = await getScholarshipsForMonth();
  if (scholarships.length === 0) {
    scholarships = await getFeaturedScholarships();
  }
  if (scholarships.length === 0) {
    scholarships = await getAllScholarships();
  }
  const now = new Date();
  const monthName = now.toLocaleString("en-US", { month: "long" });
  const year = now.getFullYear();

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-16">
      <h1 className="text-2xl font-bold tracking-tight text-[#181A1D] md:text-4xl">
        Featured scholarships for {monthName} {year}
      </h1>
      <p className="mt-2 text-sm font-normal text-muted-foreground md:text-base">
        Opportunities updated regularly. Click a card to see full details and apply.
      </p>
      {scholarships.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground md:mt-8">No featured scholarships at the moment. Check back soon.</p>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {scholarships.map((s) => (
            <li key={s.id}>
              <Link href={`/scholarships/${s.slug}`} className="block active:opacity-95">
                <Card className="h-full overflow-hidden transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] active:scale-[0.99]">
                  <div className="relative aspect-video w-full bg-muted">
                    {s.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.image_url} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        {s.provider.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h2 className="font-semibold line-clamp-2">{s.title}</h2>
                    <p className="mt-1 text-sm font-normal text-muted-foreground">{s.provider}</p>
                    {s.amount && (
                      <p className="mt-1 text-sm font-medium text-pathpicker-purple">{s.amount}</p>
                    )}
                    <p className="mt-1 text-xs font-normal text-muted-foreground">
                      Deadline: {formatDeadline(s.deadline)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ScholarshipsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto max-w-5xl px-4 py-12 text-center text-muted-foreground">Loading…</div>}>
      <ScholarshipsList />
    </Suspense>
  );
}
