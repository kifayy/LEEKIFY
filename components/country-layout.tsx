import { getRequestCountry } from "@/lib/geo";
import { CountryProvider } from "@/components/country-provider";

/**
 * Wraps children in CountryProvider with request-derived country.
 * Must be inside <Suspense> so headers() does not block the route.
 */
export async function CountryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const country = await getRequestCountry();
  return <CountryProvider country={country}>{children}</CountryProvider>;
}
