import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Partners | Pathpicker",
  description:
    "Scholarship-hungry Gen Z, captured from first scroll. Qualified leads to your CRM. Partner with Pathpicker.",
};

const MEDIA_KIT_URL =
  "https://www.canva.com/design/DAHFAnUPjKg/Z0r_O5VSkarntV5WmTzzfw/edit?utm_content=DAHFAnUPjKg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton";

const GET_IN_TOUCH_URL = "https://tally.so/r/EkL6Gl";

const statPillColors = ["bg-[#FDE68A]", "bg-[#FDBA74]", "bg-[#5EEAD4]"] as const;

const stats = [
  { value: "40,000+", unit: "Monthly Active Students" },
  { value: "18", unit: "Average Age" },
  { value: "72%", unit: "Need/Have Loans" },
] as const;

function MediaKitButton({ className }: { className?: string }) {
  return (
    <Button
      asChild
      variant="outline"
      size="lg"
      className={`rounded-xl border-[#E5E5E7] bg-white px-8 font-semibold text-[#181A1D] shadow-sm hover:bg-neutral-50 hover:text-[#181A1D] ${className ?? ""}`}
    >
      <a href={MEDIA_KIT_URL} target="_blank" rel="noopener noreferrer">
        Media Kit
      </a>
    </Button>
  );
}

export default function PartnersPage() {
  return (
    <div className="w-full min-w-0 overflow-hidden py-10 md:py-20">
      <div className="container mx-auto max-w-3xl px-4 min-w-0 lg:max-w-5xl lg:px-8">
        <div
          className="flex flex-col gap-10 rounded-2xl bg-white p-8 md:gap-12 md:p-10 lg:gap-14 lg:p-12"
          style={{
            boxShadow:
              "0 8px 24px rgba(149,110,254,0.12), 0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <header className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <div className="min-w-0 max-w-2xl space-y-4 lg:space-y-5">
              <h1 className="text-2xl font-bold tracking-tight text-[#181A1D] md:text-4xl lg:text-[2.5rem] lg:leading-tight">
                Partners
              </h1>
              <p className="text-base leading-relaxed text-[#181A1D]/85 md:text-lg lg:text-[1.0625rem] lg:leading-relaxed">
                Our ecosystem captures scholarship-hungry students from first scroll. We go where
                Gen-Z lives, and turn them into qualified leads delivered straight to your CRM.
              </p>
            </div>
            <div className="shrink-0 pt-1 lg:pt-1">
              <MediaKitButton className="w-full sm:w-auto lg:min-w-[11rem]" />
            </div>
          </header>

          <section
            aria-labelledby="partner-stats-heading"
            className="flex flex-col items-center gap-6 lg:gap-8"
          >
            <h2
              id="partner-stats-heading"
              className="w-full text-center text-2xl font-bold tracking-tight text-[#181A1D] md:text-3xl lg:text-[2rem]"
            >
              Some cool stats.
            </h2>
            <ul className="stats-section__list grid w-full grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
              {stats.map((item, i) => (
                <li
                  key={item.unit}
                  className="stats-section__item flex flex-col items-center justify-center text-center md:rounded-xl md:border md:border-[#E5E5E7] md:bg-[#FAFAFB]/80 md:px-5 md:py-8 lg:px-6 lg:py-10"
                >
                  <p className="paragraph paragraph--type--stat paragraph--view-mode--default flex max-w-[16rem] flex-col items-center justify-center md:max-w-none">
                    <span
                      className={`stats-section__value inline-flex items-center justify-center rounded-full px-4 py-2 text-[1.5rem] font-bold leading-none text-[#181A1D] lg:px-5 lg:py-2.5 lg:text-[1.75rem] ${statPillColors[i]}`}
                    >
                      {item.value}
                    </span>
                    <span
                      className="stats-section__unit mt-3 block text-sm leading-snug md:mt-3.5 md:max-w-[12rem] md:text-base lg:max-w-[14rem] lg:leading-snug"
                      style={{ color: "rgba(25, 24, 37, 0.75)" }}
                    >
                      {item.unit}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-6 border-t border-[#E5E5E7] pt-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:pt-12">
            <p className="min-w-0 max-w-2xl text-base leading-relaxed text-[#181A1D]/85 md:text-lg lg:text-[1.0625rem] lg:leading-relaxed">
              The average user in our ecosystem is 18, which is when they&apos;re forming their
              first real financial habits; becoming a trusted face for them at this stage sets the
              foundation for lifelong loyalty and influence.
            </p>
            <div className="shrink-0 lg:pl-4">
              <MediaKitButton className="w-full sm:w-auto lg:min-w-[11rem]" />
            </div>
          </section>

          <div className="border-t border-[#E5E5E7] pt-8 lg:pt-10">
            <Button
              asChild
              variant="pathpicker"
              className="h-14 w-full rounded-xl px-6 text-lg font-semibold shadow-[0_2px_8px_rgba(149,110,254,0.3)] md:h-16 md:text-xl"
            >
              <a href={GET_IN_TOUCH_URL} target="_blank" rel="noopener noreferrer">
                Get in Touch
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
