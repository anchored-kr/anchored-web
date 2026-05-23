import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anchored | Building Korea's Roblox Creator Ecosystem",
  description:
    "Anchored is a Roblox Ecosystem Builder connecting creators, games, communities, education, events, and partners in Korea.",
  keywords: [
    "Roblox",
    "Korea",
    "Creator",
    "Ecosystem",
    "Game Development",
    "Community",
    "Education",
    "Anchored",
  ],
  openGraph: {
    title: "Anchored | Building Korea's Roblox Creator Ecosystem",
    description:
      "Anchored is a Roblox Ecosystem Builder connecting creators, games, communities, education, events, and partners.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="noise-overlay" />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
