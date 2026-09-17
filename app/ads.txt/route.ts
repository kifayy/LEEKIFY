/** Leekify does not run programmatic ads; serve valid plain text for crawlers. */
export function GET() {
  return new Response("# Leekify — no authorized digital sellers\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
