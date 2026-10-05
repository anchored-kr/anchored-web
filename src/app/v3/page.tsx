import { Shell } from "@/components/v3/Shell";
import { MainVisual, News, BrandFilm, Message, Purpose, Productions, Creators, WhatWeProduce, Figures, HowWeProduce, Guild, StartProduction, Footer } from "@/components/v3/sections";

export default function Home() {
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
