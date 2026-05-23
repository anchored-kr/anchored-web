import { Hero } from "@/components/hero";
import { Vision } from "@/components/about";
import { WhatWeBuild } from "@/components/what-we-build";
import { FeaturedProjects } from "@/components/featured-projects";
import { Partners } from "@/components/partners";

export default function Home() {
  return (
    <>
      <Hero />
      <Vision />
      <WhatWeBuild />
      <FeaturedProjects />
      <Partners />
    </>
  );
}
