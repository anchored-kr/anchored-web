import type { Metadata, Viewport } from "next";
import { Nunito, Noto_Sans_KR, Geist_Mono } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const SITE_URL = "https://anchored.kr";

const title = "Anchored | We turn IP & content into Roblox games";
const description =
  "Anchored is a Roblox agency that turns IP, content, and brands into games people actually play — from concept to development, launch, and LiveOps.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | Anchored",
  },
  description,
  applicationName: "Anchored",
  keywords: ["Roblox", "Roblox agency", "IP", "게임 개발", "로블록스", "LiveOps", "UGC", "Anchored", "앵커드"],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description: "A Roblox agency that turns IP, content, and brands into games — concept to launch to LiveOps.",
    type: "website",
    locale: "ko_KR",
    alternateLocale: ["en_US", "ja_JP"],
    url: SITE_URL,
    siteName: "Anchored",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: "A Roblox agency that turns IP, content, and brands into games.",
  },
};

export const viewport: Viewport = {
  themeColor: "#061d3c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko-KR"
      className={`${nunito.variable} ${notoSansKR.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-anchor-night text-white">{children}</body>
    </html>
  );
}
