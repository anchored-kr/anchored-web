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
  title: "Anchored | Discovering the Next Mega-Hit UGC IPs",
  description:
    "Anchored is a creator ecosystem that discovers, incubates, and launches emerging UGC game creators and their worlds — starting with Roblox.",
  openGraph: {
    title: "Anchored | Discovering the Next Mega-Hit UGC IPs",
    description:
      "A creator ecosystem that discovers, incubates, and launches emerging UGC game creators and their worlds.",
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
      <body className="min-h-full flex flex-col bg-black text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
