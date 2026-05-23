"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { projects, categoryLabels } from "@/data/projects";

/* ─── Typewriter ─── */

function TypeWriter({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const tick = useCallback(() => {
    const full = texts[idx];
    if (!deleting) {
      setText(full.slice(0, text.length + 1));
      if (text.length + 1 === full.length) {
        setTimeout(() => setDeleting(true), 2500);
        return;
      }
    } else {
      setText(full.slice(0, text.length - 1));
      if (text.length - 1 === 0) {
        setDeleting(false);
        setIdx((i) => (i + 1) % texts.length);
        return;
      }
    }
  }, [texts, idx, text, deleting]);

  useEffect(() => {
    const t = setTimeout(tick, deleting ? 25 : 50);
    return () => clearTimeout(t);
  }, [tick, deleting]);

  return (
    <>
      {text}
      <span className="inline-block w-[2px] h-[0.8em] bg-white ml-0.5 animate-pulse align-middle" />
    </>
  );
}

/* ─── Counter ─── */

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [d, setD] = useState(0);

  useEffect(() => {
    if (inView) return animate(count, target, { duration: 2, ease: "easeOut" }).stop;
  }, [inView, count, target]);

  useEffect(() => rounded.on("change", setD), [rounded]);

  return <span ref={ref} className="tabular-nums">{d}{suffix}</span>;
}

/* ─── Grid Background ─── */

function Grid() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let id: number, t = 0;

    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      t += 0.003;
      ctx.clearRect(0, 0, c.width, c.height);
      const g = 80;
      const cols = Math.ceil(c.width / g) + 1;
      const rows = Math.ceil(c.height / g) + 1;

      ctx.strokeStyle = "rgba(255,255,255,0.025)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < cols; i++) { ctx.beginPath(); ctx.moveTo(i * g, 0); ctx.lineTo(i * g, c.height); ctx.stroke(); }
      for (let j = 0; j < rows; j++) { ctx.beginPath(); ctx.moveTo(0, j * g); ctx.lineTo(c.width, j * g); ctx.stroke(); }

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * g, y = j * g;
          const d = Math.sqrt((x - c.width / 2) ** 2 + (y - c.height * 0.4) ** 2);
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${(Math.sin(d * 0.003 - t * 2) * 0.5 + 0.5) * 0.1})`;
          ctx.fill();
        }
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 pointer-events-none" aria-hidden />;
}

/* ─── Animations ─── */

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

/* ─── Page ─── */

const featured = projects.filter((p) => p.featured).slice(0, 6);

const layers = [
  { n: "01", t: "Analytics & Insights", d: "실시간 플레이어 데이터, 리텐션 분석, 코호트 추적" },
  { n: "02", t: "LiveOps Engine", d: "이벤트 스케줄링, A/B 테스트, 시즌 관리, 보상 시스템" },
  { n: "03", t: "Community Layer", d: "인게임 피드백 루프, 크리에이터-플레이어 커뮤니케이션" },
  { n: "04", t: "Monetization", d: "수익 모델 설계, 인앱 이코노미 밸런싱, 결제 인프라" },
  { n: "05", t: "Publishing", d: "게임 출시 파이프라인, 스토어 최적화, 크로스 프로모션" },
];

const stats = [
  { v: 200, s: "+", l: "Creators" },
  { v: 10, s: "+", l: "Game Projects" },
  { v: 50, s: "+", l: "Events" },
  { v: 15, s: "+", l: "Partners" },
];

export default function Home() {
  const vRef = useRef(null);
  const vInView = useInView(vRef, { once: true, margin: "-100px" });

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Grid />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />

        <motion.div variants={stagger} initial="hidden" animate="visible" className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div variants={fadeUp} className="mb-10">
            <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 text-[11px] tracking-[0.15em] uppercase text-dim">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute h-full w-full rounded-full bg-white opacity-50" />
                <span className="relative rounded-full h-1.5 w-1.5 bg-white" />
              </span>
              Starting with Roblox
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight">
            <span className="block">The OS for</span>
            <span className="block mt-2"><TypeWriter texts={["UGC Game Creators.", "LiveOps at Scale.", "Creator-Led Games."]} /></span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-10 text-lg md:text-xl text-dim max-w-xl mx-auto leading-relaxed">
            Anchored is building a LiveOps engine for creator-led games.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:contact@anchored.kr" className="group inline-flex items-center gap-3 px-8 py-3.5 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-colors">
              Get in Touch
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Vision ── */}
      <section className="py-32 border-t border-white/5">
        <div ref={vRef} className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={vInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
            <p className="text-lg md:text-xl text-dim leading-relaxed mb-10">
              Millions of creators build games on platforms like Roblox. But after launch, they&apos;re on their own — no analytics, no update pipeline, no community tools, no monetization framework.
            </p>
            <p className="text-lg md:text-xl text-white leading-relaxed">
              Anchored is building the operating system that closes this gap.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Product ── */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-xs tracking-[0.3em] uppercase text-muted mb-6">Product</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-20">The LiveOps Operating System.</h2>
          </motion.div>

          <div className="space-y-0">
            {layers.map((l, i) => (
              <motion.div key={l.n} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group grid grid-cols-12 gap-6 py-7 border-t border-white/5 hover:bg-white/[0.015] transition-colors"
              >
                <span className="col-span-1 text-xs text-muted font-mono pt-0.5">{l.n}</span>
                <h3 className="col-span-4 text-base font-semibold">{l.t}</h3>
                <p className="col-span-7 text-sm text-muted">{l.d}</p>
              </motion.div>
            ))}
            <div className="border-t border-white/5" />
          </div>
        </div>
      </section>

      {/* ── Track Record ── */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-xs tracking-[0.3em] uppercase text-muted mb-6">Track Record</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Built on real ecosystem experience.
            </h2>
            <p className="text-base text-muted max-w-xl leading-relaxed mb-16">
              Roblox 생태계에서 커뮤니티, 게임 운영, 교육, 이벤트, 데이터 분석을 직접 수행하며 크리에이터가 실제로 필요한 것을 학습했습니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20">
            {stats.map((s, i) => (
              <motion.div key={s.l} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                <div className="text-4xl md:text-5xl font-bold font-mono"><Counter target={s.v} suffix={s.s} /></div>
                <div className="text-xs text-muted mt-3 tracking-[0.2em] uppercase">{s.l}</div>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-16">
            <p className="text-xs tracking-[0.3em] uppercase text-muted mb-8">Projects</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map((p, i) => (
                <motion.div key={p.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }}>
                  <Link href={`/projects/${p.slug}`}
                    className="group block p-7 border border-white/5 rounded-2xl hover:border-white/10 hover:bg-white/[0.015] transition-all h-full"
                  >
                    <span className="text-[10px] tracking-[0.2em] uppercase text-muted">{categoryLabels[p.category]}</span>
                    <h3 className="text-base font-semibold mt-3 mb-2 group-hover:text-white transition-colors">{p.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{p.descriptionKo}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/projects" className="group inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors">
                View all
                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Let&apos;s build the future of UGC games.
            </h2>
            <p className="text-base text-muted leading-relaxed mb-10 max-w-lg mx-auto">
              크리에이터, 게임사, 플랫폼, 투자사 — 함께 만들어갈 파트너를 찾고 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:contact@anchored.kr" className="group inline-flex items-center gap-3 px-8 py-3.5 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-colors">
                contact@anchored.kr
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="https://discord.gg/anchored" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3.5 text-sm font-medium text-white border border-white/15 rounded-full hover:border-white/30 transition-colors"
              >
                Discord
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
