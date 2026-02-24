import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 bg-white px-4">
      <p className="text-center text-lg font-medium text-black">
        Oops! This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="rounded-lg border-2 border-black bg-white px-6 py-3 text-base font-medium text-black transition hover:bg-black hover:text-white"
      >
        Go back home
      </Link>
    </div>
  );
}
