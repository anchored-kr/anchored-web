import { V2Shell } from "@/components/v2/V2Shell";
import { Hero, ProofStrip, WhyDifferent, Model, WhereTeams, Fleet, WhatWeBuild, HowWeWork, SprintCta, Footer } from "@/components/v2/sections";

/** Finance-theme variant of the v2 homepage, kept for comparison. */
export default function V2Page() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
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
    </div>
  );
}
