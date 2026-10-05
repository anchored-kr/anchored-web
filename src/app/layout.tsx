import type { Metadata } from "next";
import { Inter_Tight, Geist_Mono } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anchored — Roblox-native production company",
  description:
    "Anchored finds creators native to Roblox, assembles the right team, and stays responsible from concept to live operations.",
  openGraph: {
    title: "Anchored — Roblox-native production company",
    description:
      "Build with creators native to Roblox. We select the team, shape the product, manage production, and stay through live operations.",
    type: "website",
    locale: "ko_KR",
    url: "https://anchored.kr",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${interTight.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        {/* Pretendard Variable — Korean display/body face (dynamic subset) */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-full bg-paper text-carbon">{children}</body>
    </html>
  );
}
