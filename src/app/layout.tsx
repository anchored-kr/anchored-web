import type { Metadata } from "next";
import { Nunito, Noto_Sans_KR, Geist_Mono } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anchored | We turn IP & content into Roblox games",
  description:
    "Anchored is a Roblox agency that turns IP, content, and brands into games people actually play — from concept to development, launch, and LiveOps.",
  openGraph: {
    title: "Anchored | We turn IP & content into Roblox games",
    description:
      "A Roblox agency that turns IP, content, and brands into games — concept to launch to LiveOps.",
    type: "website",
    locale: "ko_KR",
    url: "https://anchored.kr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${nunito.variable} ${notoSansKR.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-anchor-night text-white">{children}</body>
    </html>
  );
}
