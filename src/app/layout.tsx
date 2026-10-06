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
    "Anchored takes responsibility for Roblox production: we decide what to build, assemble the right team, build, launch and run it until it works — one accountable partner, Seoul.",
  openGraph: {
    title: "Anchored — Roblox-native production company",
    description:
      "We take responsibility for Roblox production — concept, team, production, launch and LiveOps, with one accountable partner. People may change; the project carries on.",
    type: "website",
    locale: "ko_KR",
    url: "https://anchored.kr",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${interTight.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* v4 theme (dark default) before first paint — only pages with a .v4 root read it */}
        <script
          dangerouslySetInnerHTML={{
            __html: "(function(){try{var t=localStorage.getItem('anchored:theme');document.documentElement.setAttribute('data-v4theme',t==='light'?'light':'dark')}catch(e){document.documentElement.setAttribute('data-v4theme','dark')}})()",
          }}
        />
        {/* Pretendard Variable — Korean display/body face (dynamic subset) */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-full bg-canvas text-ink">{children}</body>
    </html>
  );
}
