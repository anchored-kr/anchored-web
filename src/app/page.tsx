import { V2Shell } from "@/components/v2/V2Shell";
import { Hero, ProofStrip, WhyDifferent, Model, WhereTeams, Fleet, WhatWeBuild, HowWeWork, SprintCta, Footer } from "@/components/v2/sections";

export default function Home() {
  return (
    <V2Shell>
      <Hero />
      <ProofStrip />
      <WhyDifferent />
      <Model />
      <WhereTeams />
      <Fleet />
      <WhatWeBuild />
      <HowWeWork />
      <SprintCta />
      <Footer />
    </V2Shell>
  );
}
