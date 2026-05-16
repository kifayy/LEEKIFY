import { getActiveStudentsLoveSectionTheme } from "@/components/home2/students-love-section-themes";
import { StudentsLoveCtaBand } from "./StudentsLoveCtaBand";

type StudentsLoveSectionProps = {
  className?: string;
};

export function StudentsLoveSection({ className }: StudentsLoveSectionProps = {}) {
  const theme = getActiveStudentsLoveSectionTheme();

  return (
    <section
      className={`relative w-full overflow-hidden border-y px-0 py-12 md:py-16 lg:py-20 ${theme.borderClass} ${className ?? ""}`}
      style={{ backgroundColor: theme.bg }}
      aria-label="Student college match reviews"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: theme.gradient }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: theme.radialGlow }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {theme.blobs.map((blobClass) => (
          <div key={blobClass} className={blobClass} />
        ))}
      </div>
      <div className="relative z-10">
        <StudentsLoveCtaBand />
      </div>
    </section>
  );
}
