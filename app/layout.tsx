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

export const metadata: Metadata = {
  title: "Ethan Chacko",
  description:
    "Full-stack developer out of Phoenix. I ship software for agencies and businesses who need something built, not pitched.",
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
