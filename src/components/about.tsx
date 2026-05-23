"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px line-gradient opacity-50" />
      </div>

      <div ref={ref} className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start"
        >
          <div className="md:col-span-4">
            <span className="text-xs font-mono text-accent uppercase tracking-widest">
              About
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
              Roblox
              <br />
              Ecosystem
              <br />
              Builder
            </h2>
          </div>

          <div className="md:col-span-8 space-y-6">
            <p className="text-lg text-muted leading-relaxed">
              Anchored is a Roblox Ecosystem Builder based in Korea. We help
              emerging creators build games, form teams, meet players, and grow
              through community, education, publishing, and partnerships.
            </p>
            <p className="text-base text-muted/80 leading-relaxed">
              앵커드는 한국을 기반으로 한 Roblox Ecosystem Builder입니다. 우리는
              신진 크리에이터들이 게임을 만들고, 팀을 구성하고, 유저와 만나고,
              커뮤니티 · 교육 · 퍼블리싱 · 파트너십을 통해 성장할 수 있는
              환경을 만듭니다.
            </p>

            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { value: "200+", label: "Creators" },
                { value: "10+", label: "Game Projects" },
                { value: "50+", label: "Events" },
                { value: "15+", label: "Partners" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-accent font-mono">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted mt-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
