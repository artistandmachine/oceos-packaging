import type { Metadata, Viewport } from "next";
import { Ballet, Montserrat, Oranienbaum } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import site from "@/lib/site";
import "./globals.css";

// ERA's type system, rebuilt from Google Fonts (theirs are licensed
// Adobe/commercial faces). All three download at build time via
// next/font, then self-host. Swap here once OCEOS brand type is decided;
// which role uses which face is set in app/theme.css.
//   Display: Oranienbaum, a condensed Didone (stands in for Ambroise).
//   Script:  Ballet, the flourished accent word ("Live in", "Cookies").
//   Text/UI: Montserrat (wide by nature; Maison Neue Extended stand-in).
const serif = Oranienbaum({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-oranienbaum",
  display: "swap",
});
const script = Ballet({
  subsets: ["latin"],
  variable: "--font-ballet",
  display: "swap",
});
const sans = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const { title, description, url } = site.meta;

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  openGraph: { title, description, url, siteName: title, locale: "en_US", type: "website" },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#F3F3EC",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${script.variable} ${sans.variable}`}>
      <body id="top">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
