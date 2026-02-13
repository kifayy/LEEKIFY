import type { Metadata } from "next";
import Script from "next/script";
import { Poppins, Dancing_Script, Volkhov, Luckiest_Guy } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "PathPicker: Personalized Student Quizzes & Scholarship Finder",
  description:
    "What student path should you take? Take our viral student quizzes to find your archetype, scholarships & more.",
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

const luckiestGuy = Luckiest_Guy({
  weight: "400",
  variable: "--font-luckiest-guy",
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
      <body className={`${poppins.className} ${poppins.variable} ${dancingScript.variable} ${volkhov.variable} ${luckiestGuy.variable} antialiased`}>
          <Script async src="https://subscribe-forms.beehiiv.com/embed.js" strategy="afterInteractive" />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen min-w-0 flex-col overflow-x-hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
            <SiteHeader />
            <main className="min-w-0 flex-1 overflow-x-hidden pt-24 md:pt-32 lg:pt-36">{children}</main>
            <div className="w-full bg-white">
              <img
                src="https://storage.googleapis.com/images_592/Group%201000005829.png"
                alt=""
                className="mx-auto block w-full max-w-4xl object-contain px-4 py-6"
              />
            </div>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
