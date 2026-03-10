"use client";

import { createContext, useContext } from "react";

/**
 * ISO 3166-1 alpha-2 country code (e.g. "US", "GB"). Null when unknown (e.g. local dev; Vercel sets x-vercel-ip-country in production).
 * Use in client components: const country = useCountry(); then e.g. show different CTAs for US vs international.
 */
export type CountryCode = string | null;

const CountryContext = createContext<CountryCode>(null);

export function useCountry(): CountryCode {
  return useContext(CountryContext);
}

export function CountryProvider({
  children,
  country,
}: {
  children: React.ReactNode;
  country: CountryCode;
}) {
  return (
    <CountryContext.Provider value={country}>
      {children}
    </CountryContext.Provider>
  );
}
