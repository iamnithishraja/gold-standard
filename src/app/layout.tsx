import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gold Standard Omakase | Luxury Japanese Dining Experience",
  description:
    "An immersive Japanese omakase experience featuring the finest seafood flown fresh from Japan, premium A5 wagyu, and seasonal ingredients curated by our master chef.",
  keywords: [
    "omakase",
    "Japanese restaurant",
    "fine dining",
    "sushi",
    "A5 wagyu",
    "luxury dining",
  ],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Gold Standard Omakase",
    description: "An immersive Japanese omakase experience",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-[#0a0a0a] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
