"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Partners() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="partners" className="relative py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px line-gradient opacity-50" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative p-10 rounded-2xl border border-border bg-surface/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
            <div className="relative">
              <span className="text-xs font-mono text-accent uppercase tracking-widest">
                For Creators
              </span>
              <h3 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight">
                Build your Roblox world
                <br />
                with Anchored.
              </h3>
              <p className="mt-4 text-muted leading-relaxed">
                앵커드 커뮤니티에 참여하세요. 팀을 만들고, 게임을 만들고, 함께
                성장할 수 있는 환경이 준비되어 있습니다.
              </p>
              <a
                href="https://discord.gg/anchored"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-accent text-background font-semibold text-sm rounded-lg hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] transition-all"
              >
                Join the Community
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative p-10 rounded-2xl border border-border bg-surface/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
            <div className="relative">
              <span className="text-xs font-mono text-accent uppercase tracking-widest">
                For Partners
              </span>
              <h3 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight">
                Partner with Korea&apos;s
                <br />
                Roblox Ecosystem Builder.
              </h3>
              <p className="mt-4 text-muted leading-relaxed">
                앵커드는 게임사, 플랫폼, 브랜드, 교육기관, 투자사와 함께 Roblox
                크리에이터 생태계를 확장합니다. 크리에이터 발굴, 교육, 게임 출시,
                커뮤니티 이벤트, 브랜드 캠페인까지 Roblox-native한 협업을
                설계합니다.
              </p>
              <a
                href="mailto:contact@anchored.kr"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold border border-accent/50 text-accent rounded-lg hover:bg-accent/10 transition-all"
              >
                Get in Touch
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
