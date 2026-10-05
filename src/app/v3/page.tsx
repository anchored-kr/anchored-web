import type { Metadata } from "next";
import { Shell } from "@/components/v3/Shell";
import { MainVisual, News, BrandFilm, Message, Purpose, Productions, Creators, WhatWeProduce, Figures, HowWeProduce, Guild, StartProduction, Footer } from "@/components/v3/sections";

/** Draft variant (Kodansha-style editorial) — reachable but kept out of search results. */
export const metadata: Metadata = { title: "v3 draft — Anchored", robots: { index: false, follow: false } };

export default function V3Page() {
  return (
    <Shell>
      <MainVisual />
      <News />
      <BrandFilm />
      <Message />
      <Purpose />
      <Productions />
      <Creators />
      <WhatWeProduce />
      <Figures />
      <HowWeProduce />
      <Guild />
      <StartProduction />
      <Footer />
    </Shell>
  );
}
