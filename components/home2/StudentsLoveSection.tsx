import { StudentsLoveCtaBand } from "./StudentsLoveCtaBand";

type StudentsLoveSectionProps = {
  className?: string;
};

export function StudentsLoveSection({ className }: StudentsLoveSectionProps = {}) {
  return (
    <section
      className={`w-full overflow-hidden bg-white px-0 py-12 md:py-16 lg:py-20 ${className ?? ""}`}
    >
      <StudentsLoveCtaBand />
    </section>
  );
}
