import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { WhatWeBuild } from "@/components/what-we-build";
import { FeaturedProjects } from "@/components/featured-projects";
import { Partners } from "@/components/partners";
import { Marquee } from "@/components/marquee";

const marqueeItems = [
  "Roblox",
  "Creator Economy",
  "Game Development",
  "Community",
  "Education",
  "LiveOps",
  "Partnerships",
  "Korea",
  "Ecosystem",
  "Incubation",
  "Publishing",
];

export default function Home() {
  return (
    <>
      <Hero />
      <div className="py-8 border-y border-border/50 overflow-hidden">
        <Marquee items={marqueeItems} speed={35} />
      </div>
      <About />
      <div className="py-8 border-y border-border/50 overflow-hidden">
        <Marquee items={marqueeItems} speed={40} reverse />
      </div>
      <WhatWeBuild />
      <FeaturedProjects />
      <Partners />
    </>
  );
}
