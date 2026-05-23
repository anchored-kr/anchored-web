"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Partners() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="partners" className="py-32 border-t border-border">
      <div ref={ref} className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted mb-6">
            Get Involved
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-10 md:p-14 border border-border rounded-2xl hover:border-border-hover transition-colors">
              <p className="text-xs tracking-[0.2em] uppercase text-muted mb-6">
                For Creators
              </p>
              <h3 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-6">
                Run your game
                <br />
                like a studio.
              </h3>
              <p className="text-muted leading-relaxed mb-8">
                앵커드의 LiveOps 엔진을 가장 먼저 사용해보세요. 크리에이터
                커뮤니티에 참여하고, 게임 운영의 다음 단계를 함께 만들 수 있습니다.
              </p>
              <a
                href="https://discord.gg/anchored"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-7 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-colors"
              >
                Join Early Access
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </a>
            </div>

            <div className="p-10 md:p-14 border border-border rounded-2xl hover:border-border-hover transition-colors">
              <p className="text-xs tracking-[0.2em] uppercase text-muted mb-6">
                For Partners & Investors
              </p>
              <h3 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-6">
                Build the future
                <br />
                of UGC games.
              </h3>
              <p className="text-muted leading-relaxed mb-8">
                게임사, 플랫폼, 브랜드, 투자사와 함께 UGC 게임 크리에이터
                생태계의 인프라를 만듭니다.
              </p>
              <a
                href="mailto:contact@anchored.kr"
                className="group inline-flex items-center gap-3 px-7 py-3 text-sm font-medium text-white border border-white/20 rounded-full hover:border-white/40 transition-colors"
              >
                Get in Touch
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
