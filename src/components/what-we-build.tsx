"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const layers = [
  {
    num: "01",
    title: "Analytics & Insights",
    desc: "실시간 플레이어 데이터, 리텐션 분석, 코호트 추적. 크리에이터가 자기 게임을 숫자로 이해할 수 있는 대시보드.",
    descEn: "Real-time player data, retention analysis, and cohort tracking for creator-led games.",
  },
  {
    num: "02",
    title: "LiveOps Engine",
    desc: "이벤트 스케줄링, A/B 테스트, 시즌 관리, 보상 시스템. 업데이트를 코드 없이 운영하는 엔진.",
    descEn: "Event scheduling, A/B testing, season management, and reward systems — without code.",
  },
  {
    num: "03",
    title: "Community Layer",
    desc: "인게임 피드백 루프, 크리에이터-플레이어 커뮤니케이션, 커뮤니티 기반 콘텐츠 사이클.",
    descEn: "In-game feedback loops, creator-player communication, and community-driven content cycles.",
  },
  {
    num: "04",
    title: "Monetization Framework",
    desc: "수익 모델 설계, 인앱 이코노미 밸런싱, 결제 인프라. 크리에이터가 지속 가능한 비즈니스를 만들 수 있도록.",
    descEn: "Revenue model design, in-app economy balancing, and payment infrastructure for sustainable creator businesses.",
  },
  {
    num: "05",
    title: "Publishing & Distribution",
    desc: "게임 출시 파이프라인, 스토어 최적화, 크로스 프로모션. 만든 게임이 유저에게 닿도록.",
    descEn: "Launch pipelines, store optimization, and cross-promotion to connect games with players.",
  },
];

export function WhatWeBuild() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="what-we-build" className="py-32 border-t border-border">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-muted mb-6">
            What We&apos;re Building
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            The LiveOps Operating System.
          </h2>
          <p className="text-lg text-dim max-w-2xl leading-relaxed mb-20">
            A full-stack platform that turns individual creators into
            game operations teams — from analytics to monetization.
          </p>
        </motion.div>

        <div className="space-y-0">
          {layers.map((l, i) => (
            <motion.div
              key={l.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group grid grid-cols-12 gap-6 py-8 border-t border-border hover:bg-white/[0.015] transition-colors cursor-default"
            >
              <div className="col-span-1 text-xs text-muted font-mono pt-1">
                {l.num}
              </div>
              <div className="col-span-11 md:col-span-4">
                <h3 className="text-lg font-semibold group-hover:text-white transition-colors">
                  {l.title}
                </h3>
              </div>
              <div className="hidden md:block col-span-7">
                <p className="text-sm text-muted leading-relaxed">{l.desc}</p>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
}
