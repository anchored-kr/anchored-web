"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Partners() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="partners" className="py-32 border-t border-border">
      <div ref={ref} className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted mb-6">Join Us</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-10 md:p-14 border border-border rounded-2xl hover:border-border-hover transition-colors">
              <p className="text-xs tracking-[0.2em] uppercase text-muted mb-6">For Creators</p>
              <h3 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-6">
                Build your
                <br />
                Roblox world.
              </h3>
              <p className="text-muted leading-relaxed mb-8">
                앵커드 커뮤니티에 참여하세요. 팀을 만들고, 게임을 만들고, 함께
                성장할 수 있는 환경이 준비되어 있습니다.
              </p>
              <a
                href="https://discord.gg/anchored"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-7 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-colors"
              >
                Join Community
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            </div>

            <div className="p-10 md:p-14 border border-border rounded-2xl hover:border-border-hover transition-colors">
              <p className="text-xs tracking-[0.2em] uppercase text-muted mb-6">For Partners</p>
              <h3 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-6">
                Partner with
                <br />
                Anchored.
              </h3>
              <p className="text-muted leading-relaxed mb-8">
                앵커드는 게임사, 플랫폼, 브랜드, 교육기관, 투자사와 함께 Roblox
                크리에이터 생태계를 확장합니다.
              </p>
              <a
                href="mailto:contact@anchored.kr"
                className="group inline-flex items-center gap-3 px-7 py-3 text-sm font-medium text-white border border-white/20 rounded-full hover:border-white/40 transition-colors"
              >
                Get in Touch
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
