/** True for localhost dev (not Vercel preview/production hosts). */
export function isLocalDevHost(host: string | null | undefined): boolean {
  if (!host) return false;
  const h = host.split(":")[0]?.toLowerCase() ?? "";
  return h === "localhost" || h === "127.0.0.1" || h === "[::1]";
}
