import type { Metadata } from "next";
import localFont from "next/font/local";
import { Instrument_Serif } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CommandPaletteProvider } from "@/components/command-palette";
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

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
});

const DESCRIPTION =
  "Full-stack developer out of Phoenix. I ship software for agencies and businesses who need something built, not pitched.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ethanchacko.com"),
  title: {
    template: "%s | Ethan Chacko",
    default: "Ethan Chacko, Full-Stack Developer",
  },
  description: DESCRIPTION,
  applicationName: "Ethan Chacko",
  authors: [{ name: "Ethan Chacko" }],
  keywords: [
    "full-stack developer",
    "Next.js",
    "TypeScript",
    "Phoenix",
    "contract developer",
    "freelance developer",
    "agency subcontracting",
  ],
  openGraph: {
    type: "website",
    title: "Ethan Chacko, Full-Stack Developer",
    description: DESCRIPTION,
    url: "https://ethanchacko.com",
    siteName: "Ethan Chacko",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethan Chacko, Full-Stack Developer",
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
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} font-sans antialiased`}
      >
        <CommandPaletteProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[300] focus:bg-bg-elev focus:text-fg focus:border focus:border-signal focus:px-3 focus:py-2 focus:font-mono focus:text-mono focus:uppercase focus:tracking-widest"
          >
            Skip to main content
          </a>
          <Nav />
          <main id="main" className="pt-16">{children}</main>
          <Footer />
        </CommandPaletteProvider>
      </body>
    </html>
  );
}
