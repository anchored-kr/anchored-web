import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { WhatWeBuild } from "@/components/what-we-build";
import { FeaturedProjects } from "@/components/featured-projects";
import { Partners } from "@/components/partners";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <WhatWeBuild />
      <FeaturedProjects />
      <Partners />
    </>
  );
}
