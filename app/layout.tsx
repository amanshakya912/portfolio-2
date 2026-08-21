import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Amir Shakya — Nepal Tourist Guide for Chinese Travelers",
  description: "Professional Nepal tourist guide certified by Nepal Tourism Board. Specializing in guiding Chinese-speaking travelers through Nepal's most iconic destinations. 专业尼泊尔导游。",
  keywords: ["Nepal guide", "尼泊尔导游", "Himalaya trekking", "Kathmandu", "Everest Base Camp", "Chinese tour guide Nepal"],
  openGraph: {
    title: "Amir Shakya — Nepal Guide",
    description: "15+ years guiding Chinese travelers through Nepal's wonders",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${playfairDisplay.variable} ${cormorantGaramond.variable} ${dmSans.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
