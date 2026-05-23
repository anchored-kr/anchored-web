"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  { num: "01", title: "Creator Community", desc: "Roblox 크리에이터들이 모이고, 배우고, 협업하는 커뮤니티를 운영합니다." },
  { num: "02", title: "Game Projects", desc: "크리에이터 팀과 함께 Roblox 게임을 기획, 개발, 출시, 운영합니다." },
  { num: "03", title: "Education & Incubation", desc: "초보자와 성장 중인 크리에이터가 실제 게임 제작을 경험할 수 있는 교육과 인큐베이션 프로그램을 운영합니다." },
  { num: "04", title: "Events & Meetups", desc: "Roblox 크리에이터들이 서로 연결될 수 있는 온라인/오프라인 이벤트를 만듭니다." },
  { num: "05", title: "Publishing & LiveOps", desc: "게임 출시 이후 데이터 분석, 업데이트, 이벤트, 수익화, 커뮤니티 피드백 루프를 설계합니다." },
  { num: "06", title: "Partnerships", desc: "게임사, 플랫폼, 브랜드, 교육기관과 함께 Roblox 생태계 확장을 위한 협업을 만듭니다." },
];

export function WhatWeBuild() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="what-we-build" className="py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted mb-6">What We Build</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-20">
            Building the ecosystem,
            <br />
            <span className="text-muted">one project at a time.</span>
          </h2>
        </motion.div>

        <div className="space-y-0">
          {pillars.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group grid grid-cols-12 gap-6 py-8 border-t border-border hover:bg-white/[0.02] transition-colors cursor-default"
            >
              <div className="col-span-1 text-xs text-muted font-mono pt-1">
                {p.num}
              </div>
              <div className="col-span-4 md:col-span-4">
                <h3 className="text-lg font-semibold group-hover:text-white transition-colors">
                  {p.title}
                </h3>
              </div>
              <div className="col-span-7 md:col-span-7">
                <p className="text-sm text-muted leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
}
