"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      const c = animate(count, target, { duration: 2, ease: "easeOut" });
      return c.stop;
    }
  }, [inView, count, target]);

  useEffect(() => {
    return rounded.on("change", (v) => setDisplay(v));
  }, [rounded]);

  return <span ref={ref} className="tabular-nums">{display}{suffix}</span>;
}

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: 200, suffix: "+", label: "Creators" },
    { value: 10, suffix: "+", label: "Projects" },
    { value: 50, suffix: "+", label: "Events" },
    { value: 15, suffix: "+", label: "Partners" },
  ];

  return (
    <section id="about" className="py-32 border-t border-border">
      <div ref={ref} className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted mb-6">About</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
                Roblox
                <br />
                Ecosystem
                <br />
                Builder.
              </h2>
            </div>

            <div className="space-y-8">
              <p className="text-lg text-dim leading-relaxed">
                Anchored is a Roblox Ecosystem Builder based in Korea. We help
                emerging creators build games, form teams, meet players, and grow
                through community, education, publishing, and partnerships.
              </p>
              <p className="text-base text-muted leading-relaxed">
                앵커드는 한국을 기반으로 한 Roblox Ecosystem Builder입니다. 우리는
                신진 크리에이터들이 게임을 만들고, 팀을 구성하고, 유저와 만나고,
                커뮤니티 · 교육 · 퍼블리싱 · 파트너십을 통해 성장할 수 있는
                환경을 만듭니다.
              </p>
            </div>
          </div>

          <div className="mt-20 pt-20 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl md:text-5xl font-bold font-mono">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-muted mt-3 tracking-[0.2em] uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
