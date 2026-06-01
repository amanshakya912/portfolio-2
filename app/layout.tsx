import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pemba Sherpa — Nepal Tourist Guide for Chinese Travelers",
  description: "Professional Nepal tourist guide certified by Nepal Tourism Board. Specializing in guiding Chinese-speaking travelers through Nepal's most iconic destinations. 专业尼泊尔导游。",
  keywords: ["Nepal guide", "尼泊尔导游", "Himalaya trekking", "Kathmandu", "Everest Base Camp", "Chinese tour guide Nepal"],
  openGraph: {
    title: "Pemba Sherpa — Nepal Guide",
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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
