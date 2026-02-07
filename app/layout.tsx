import type { Metadata } from "next";
import Script from "next/script";
import { Poppins, Dancing_Script, Volkhov } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Pathpicker | Find Your Student Archetype & Scholarships",
  description:
    "Join 40k+ students. Take our viral archetype quiz to discover your student persona, social habits, and financial cheat codes. Built by Awarded.",
};

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-pathpicker-script",
  display: "swap",
  subsets: ["latin"],
});

const volkhov = Volkhov({
  weight: "700",
  variable: "--font-volkhov",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} ${poppins.variable} ${dancingScript.variable} ${volkhov.variable} antialiased`}>
          <Script async src="https://subscribe-forms.beehiiv.com/embed.js" strategy="afterInteractive" />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
