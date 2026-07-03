import type { Metadata } from "next";
import localFont from "next/font/local";
import { Source_Serif_4 } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-source-serif",
  display: "swap",
});

const DESCRIPTION =
  "I build the operational systems service businesses run on. CRMs that actually get used, lead engines the client owns outright, and AI that still works a month after the demo. Everything is a real system I built, with real screenshots to prove it. Based in Surprise, Arizona.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ethanchacko.com"),
  title: {
    template: "%s · Ethan Chacko",
    default: "Ethan Chacko · Systems builder in Surprise, AZ",
  },
  description: DESCRIPTION,
  applicationName: "Ethan Chacko",
  authors: [{ name: "Ethan Chacko" }],
  keywords: [
    "systems builder",
    "CRM implementation",
    "GoHighLevel",
    "operations automation",
    "AI implementation",
    "lead generation systems",
    "Surprise Arizona",
    "Phoenix West Valley",
    "service business systems",
  ],
  openGraph: {
    type: "website",
    title: "Ethan Chacko · Systems builder in Surprise, AZ",
    description: DESCRIPTION,
    url: "https://ethanchacko.com",
    siteName: "Ethan Chacko",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethan Chacko · Systems builder in Surprise, AZ",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} font-serif antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[300] focus:bg-paper focus:text-ink focus:border focus:border-ink focus:px-3 focus:py-2 focus:font-mono focus:text-mono focus:uppercase focus:tracking-widest"
        >
          Skip to main content
        </a>
        <SmoothScroll />
        <Nav />
        <main id="main" className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
