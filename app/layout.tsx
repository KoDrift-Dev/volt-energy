import type { Metadata } from "next";
import { Anton, Bitter, Archivo } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const bitter = Bitter({
  weight: "900",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-bitter",
  display: "swap",
});

const archivo = Archivo({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VOLT Energy — Ignite Your Pulse",
  description:
    "VOLT Energy drink. Fearless flavour, raw caffeine, zero compromise. Ignite your pulse.",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${bitter.variable} ${archivo.variable}`}
    >
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
