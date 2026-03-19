import Link from "next/link";

export function SchoolNotFound({ message }: { message?: string }) {
  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">School not found</h1>
      <p className="text-gray-600 mb-8">{message ?? "We couldn’t find that school."}</p>
      <Link
        href="/browse-schools"
        className="inline-flex items-center justify-center rounded-full bg-[#956efe] px-6 py-3 text-white font-medium hover:bg-[#8360e8]"
      >
        Explore colleges
      </Link>
    </div>
  );
}
