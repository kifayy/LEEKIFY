import Link from "next/link";

const linkClassName =
  "rounded-lg border-2 border-[#18062E] bg-white px-5 py-2.5 text-sm font-medium text-[#18062E] transition hover:bg-[#18062E] hover:text-white";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 bg-white px-4 py-16">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#956EFE]">404</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#181A1D] md:text-3xl">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-3 text-base text-[#181A1D]/70">
          The link may be broken or the page was moved. Try one of these paths instead.
        </p>
      </div>

      <nav aria-label="Helpful links" className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className={linkClassName}>
          Home
        </Link>
        <Link href="/#search" className={linkClassName}>
          Check for leaks
        </Link>
        <Link href="/pricing" className={linkClassName}>
          Pricing
        </Link>
        <Link href="/contact" className={linkClassName}>
          Contact
        </Link>
      </nav>
    </div>
  );
}
