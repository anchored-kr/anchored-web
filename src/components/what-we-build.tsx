"use client";

import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useRef, type MouseEvent as ReactMouseEvent } from "react";

interface Pillar {
  icon: string;
  title: string;
  titleKo: string;
  description: string;
  gradient: string;
}

const pillars: Pillar[] = [
  {
    icon: "👥", title: "Creator Community", titleKo: "크리에이터 커뮤니티",
    description: "Roblox 크리에이터들이 모이고, 배우고, 협업하는 커뮤니티를 운영합니다.",
    gradient: "from-blue/20 to-blue/5",
  },
  {
    icon: "🎮", title: "Game Projects", titleKo: "게임 프로젝트",
    description: "크리에이터 팀과 함께 Roblox 게임을 기획, 개발, 출시, 운영합니다.",
    gradient: "from-accent/15 to-accent/5",
  },
  {
    icon: "🎓", title: "Education & Incubation", titleKo: "교육 & 인큐베이션",
    description: "초보자와 성장 중인 크리에이터가 실제 게임 제작을 경험할 수 있는 교육과 인큐베이션 프로그램을 운영합니다.",
    gradient: "from-blue-light/20 to-blue-light/5",
  },
  {
    icon: "🎪", title: "Events & Meetups", titleKo: "이벤트 & 밋업",
    description: "Roblox 크리에이터들이 서로 연결될 수 있는 온라인/오프라인 이벤트를 만듭니다.",
    gradient: "from-accent/15 to-accent/5",
  },
  {
    icon: "📊", title: "Publishing & LiveOps", titleKo: "퍼블리싱 & 라이브옵스",
    description: "게임 출시 이후 데이터 분석, 업데이트, 이벤트, 수익화, 커뮤니티 피드백 루프를 설계합니다.",
    gradient: "from-blue/20 to-blue/5",
  },
  {
    icon: "🤝", title: "Partnerships", titleKo: "파트너십",
    description: "게임사, 플랫폼, 브랜드, 교육기관과 함께 Roblox 생태계 확장을 위한 협업을 만듭니다.",
    gradient: "from-accent/15 to-accent/5",
  },
];

function TiltCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const transform = useTransform(
    [rotateX, rotateY],
    ([rx, ry]) => `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`
  );

  const handleMouse = (e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rotateX.set(((y - rect.height / 2) / (rect.height / 2)) * -8);
    rotateY.set(((x - rect.width / 2) / (rect.width / 2)) * 8);
  };

  const handleLeave = () => { rotateX.set(0); rotateY.set(0); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ transform }}
      className="interactive group relative rounded-2xl border border-border bg-surface/50 overflow-hidden cursor-default"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      <div className="relative p-8">
        <motion.div className="text-4xl mb-6" whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }} transition={{ duration: 0.4 }}>
          {pillar.icon}
        </motion.div>
        <div className="flex items-baseline gap-2 mb-1">
          <h3 className="text-lg font-semibold group-hover:text-accent transition-colors duration-300">{pillar.title}</h3>
        </div>
        <p className="text-xs text-muted/60 font-mono mb-3">{pillar.titleKo}</p>
        <p className="text-sm text-muted leading-relaxed">{pillar.description}</p>
        <div className="mt-6 h-[1px] w-0 bg-accent/30 group-hover:w-full transition-all duration-700" />
      </div>
    </motion.div>
  );
}

export function WhatWeBuild() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="what-we-build" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-mono text-blue uppercase tracking-widest">What We Build</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
            Building the ecosystem,
            <br />
            <span className="text-muted">one project at a time.</span>
          </h2>
          <p className="mt-4 text-sm text-muted max-w-lg mx-auto font-mono">
            6개의 축으로 Roblox 크리에이터 생태계를 설계합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <TiltCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
