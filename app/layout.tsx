import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import {
  Poppins,
  Inter,
  Dancing_Script,
} from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ConsentGatedScripts } from "@/components/consent-gated-scripts";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { CountryLayout } from "@/components/country-layout";
import { AttributionCapture } from "@/components/attribution-capture";
import { SiteImageProtection } from "@/components/site-image-protection";
import { DevChromeProvider } from "@/components/dev-chrome-provider";
import { DevToolbar } from "@/components/dev-toolbar";
import { ScrollToTopOnNavigate } from "@/components/scroll-to-top-on-navigate";
import { getBaseUrlForMetadata } from "@/lib/metadata-base-url";
import { DEFAULT_SITE_DESCRIPTION, DEFAULT_SITE_TITLE } from "@/lib/site-metadata";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = await getBaseUrlForMetadata();
  return {
    metadataBase: new URL(baseUrl),
    title: DEFAULT_SITE_TITLE,
    description: DEFAULT_SITE_DESCRIPTION,
    alternates: { canonical: baseUrl },
    other: { "impact-site-verification": "f3e4ac5b-cbf4-4dcb-bdf3-61eda8835162" },
    openGraph: {
      title: DEFAULT_SITE_TITLE,
      description: DEFAULT_SITE_DESCRIPTION,
      siteName: "Leekify",
    },
    twitter: {
      card: "summary_large_image",
      title: DEFAULT_SITE_TITLE,
      description: DEFAULT_SITE_DESCRIPTION,
    },
  };
}

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
  subsets: ["latin"],
});

/** Mobile hero headlines — matches clean landing reference (SF/Inter style). */
const inter = Inter({
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-pathpicker-script",
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
      <head>
        <meta name="impact-site-verification" content="506f7160-3dd6-4477-8a3e-bb29d178f99a" />
        <link rel="preconnect" href="https://storage.googleapis.com" />
      </head>
      <body
        className={`${poppins.className} ${poppins.variable} ${inter.variable} ${dancingScript.variable} antialiased`}
      >
          <ConsentGatedScripts />
          <SiteImageProtection />
          <Suspense fallback={null}>
            <AttributionCapture />
          </Suspense>
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <CountryLayout>
            <DevChromeProvider>
            <ScrollToTopOnNavigate />
            <div className="relative flex min-w-0 flex-col overflow-x-hidden">
              <SiteHeader />
              <main className="min-w-0 flex-shrink-0 overflow-x-hidden pt-32 md:pt-44 lg:pt-0">
                {children}
              </main>
              <div className="w-full">
                <Image
                  src="https://storage.googleapis.com/images_592/Icodn.png"
                  alt="Leekify data breach monitoring"
                  width={1600}
                  height={400}
                  className="block h-auto w-full object-cover"
                  draggable={false}
                  sizes="100vw"
                  quality={80}
                />
              </div>
              <SiteFooter />
              <CookieConsentBanner />
              <Suspense fallback={null}>
                <DevToolbar />
              </Suspense>
            </div>
            </DevChromeProvider>
            </CountryLayout>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
