"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { projects, categoryLabels } from "@/data/projects";

/* ── Utils ── */

function TypeWriter({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  const tick = useCallback(() => {
    const full = texts[idx];
    if (!del) { setText(full.slice(0, text.length + 1)); if (text.length + 1 === full.length) { setTimeout(() => setDel(true), 2500); return; } }
    else { setText(full.slice(0, text.length - 1)); if (text.length - 1 === 0) { setDel(false); setIdx((i) => (i + 1) % texts.length); return; } }
  }, [texts, idx, text, del]);
  useEffect(() => { const t = setTimeout(tick, del ? 25 : 50); return () => clearTimeout(t); }, [tick, del]);
  return <>{text}<span className="inline-block w-[2px] h-[0.8em] bg-white ml-0.5 animate-pulse align-middle" /></>;
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [d, setD] = useState(0);
  useEffect(() => { if (inView) return animate(count, target, { duration: 2, ease: "easeOut" }).stop; }, [inView, count, target]);
  useEffect(() => rounded.on("change", setD), [rounded]);
  return <span ref={ref} className="tabular-nums">{d}{suffix}</span>;
}

function Img({ label, aspect = "16/9", className = "" }: { label: string; aspect?: string; className?: string }) {
  return (
    <div className={`relative rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden ${className}`} style={{ aspectRatio: aspect }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-8 h-8 mx-auto mb-2 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
          </svg>
          <p className="text-[10px] tracking-[0.15em] uppercase text-white/15">{label}</p>
        </div>
      </div>
    </div>
  );
}

function Grid() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let id: number, t = 0;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const draw = () => {
      t += 0.003; ctx.clearRect(0, 0, c.width, c.height);
      const g = 80, cols = Math.ceil(c.width / g) + 1, rows = Math.ceil(c.height / g) + 1;
      ctx.strokeStyle = "rgba(255,255,255,0.025)"; ctx.lineWidth = 0.5;
      for (let i = 0; i < cols; i++) { ctx.beginPath(); ctx.moveTo(i * g, 0); ctx.lineTo(i * g, c.height); ctx.stroke(); }
      for (let j = 0; j < rows; j++) { ctx.beginPath(); ctx.moveTo(0, j * g); ctx.lineTo(c.width, j * g); ctx.stroke(); }
      for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
        const x = i * g, y = j * g, d = Math.sqrt((x - c.width / 2) ** 2 + (y - c.height * 0.4) ** 2);
        ctx.beginPath(); ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${(Math.sin(d * 0.003 - t * 2) * 0.5 + 0.5) * 0.1})`; ctx.fill();
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 pointer-events-none" aria-hidden />;
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const } } };

/* ── Data ── */

const featured = projects.filter((p) => p.featured);

const pipeline = [
  { n: "01", t: "Discover", d: "커뮤니티 활동, 미션, 이벤트, 워크숍, 프로젝트 제출을 통해 잠재력 있는 신진 크리에이터를 발굴합니다." },
  { n: "02", t: "Incubate", d: "게임 기획, 스크립팅, 빌드, 협업, Roblox 네이티브 감각, LiveOps 역량을 키울 수 있도록 돕습니다." },
  { n: "03", t: "Team Up", d: "크리에이터의 역량, 관심사, 프로젝트 적합도를 바탕으로 팀을 구성합니다." },
  { n: "04", t: "Build", d: "팀이 아이디어를 플레이 가능한 UGC 게임 프로젝트로 전환할 수 있도록 지원합니다." },
  { n: "05", t: "Launch", d: "커뮤니티 테스트, 출시 준비, 퍼블리싱 지원을 통해 프로젝트가 실제 유저와 만날 수 있도록 돕습니다." },
  { n: "06", t: "Grow", d: "유저 피드백, 커뮤니티 신호, LiveOps를 활용해 리텐션과 성장을 개선합니다." },
  { n: "07", t: "Expand IP", d: "가능성 있는 게임이 브랜드, 캐릭터, 커뮤니티, 장기 IP로 확장될 수 있도록 돕습니다." },
];

const provides = [
  { t: "Creator Community", d: "UGC 크리에이터들이 만나고, 배우고, 협업하는 Discord 기반 커뮤니티." },
  { t: "Education & Mentorship", d: "신진 크리에이터를 위한 워크숍, 캠프, 멘토링 프로그램." },
  { t: "Team Building", d: "개발자, 빌더, 아티스트, 기획자, 애니메이터, 운영자를 연결하는 팀 빌딩." },
  { t: "Project Incubation", d: "팀이 아이디어를 플레이 가능하고 출시 가능한 게임으로 발전시키도록 돕는 인큐베이션." },
  { t: "Publishing & LiveOps", d: "출시, 업데이트, 이벤트, 데이터 분석, 커뮤니티 피드백, 수익화 운영 지원." },
  { t: "IP Development", d: "가능성 있는 UGC 프로젝트를 장기 IP로 성장시키는 IP 개발." },
  { t: "Partnerships", d: "크리에이터를 플랫폼, 퍼블리셔, 스폰서, 브랜드, 투자자와 연결." },
];

const journey = [
  "길드 참여", "미션과 퀘스트 수행", "워크숍과 이벤트 참여", "프로토타입 공유",
  "협업자 발견", "팀 구성", "플레이 가능한 프로젝트 제작", "커뮤니티 피드백 기반 출시", "IP로 성장",
];

/* ── Page ── */

export default function Home() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Grid />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        <motion.div variants={stagger} initial="hidden" animate="visible" className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div variants={fadeUp} className="mb-10">
            <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 text-[11px] tracking-[0.15em] uppercase text-dim">
              <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute h-full w-full rounded-full bg-white opacity-50" /><span className="relative rounded-full h-1.5 w-1.5 bg-white" /></span>
              Starting with Roblox
            </span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
            Discovering the Next<br />
            <TypeWriter texts={["Mega-Hit UGC IPs.", "Creator-Led Worlds.", "Future Game Studios."]} />
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-10 text-base md:text-lg text-dim max-w-2xl mx-auto leading-relaxed">
            Anchored is a creator ecosystem that discovers, incubates, and launches emerging UGC game creators and their worlds — starting with Roblox.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://discord.gg/anchored" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 px-8 py-3.5 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-colors">
              Join Anchored Guild
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
            </a>
            <a href="#partners" className="inline-flex items-center gap-3 px-8 py-3.5 text-sm font-medium text-white border border-white/15 rounded-full hover:border-white/30 transition-colors">Partner with Us</a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Hero Image ── */}
      <section className="pb-24 -mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 60, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] as const }}>
            <Img label="Anchored Ecosystem Visual" aspect="21/9" className="shadow-2xl shadow-white/5" />
          </motion.div>
        </div>
      </section>

      {/* ── 2. Thesis ── */}
      <section className="py-28 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug tracking-tight mb-10">
              The next mega-hit IPs will be born<br />from creator communities.
            </h2>
            <p className="text-base text-dim leading-relaxed mb-6">
              과거의 게임 IP는 대형 스튜디오와 퍼블리셔 중심으로 만들어졌습니다. 하지만 Roblox, Fortnite UEFN, Minecraft 같은 UGC 플랫폼에서는 개인 크리에이터와 소규모 팀이 새로운 세계관, 캐릭터, 게임 시스템, 팬덤을 만들어내고 있습니다.
            </p>
            <div className="mt-12 p-8 md:p-10 border border-white/5 rounded-2xl">
              <p className="text-xl md:text-2xl font-bold leading-snug tracking-tight">
                &quot;Great IPs do not appear overnight.<br />
                <span className="text-muted">They are discovered, nurtured, tested, and grown.&quot;</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. Anchored Guild ── */}
      <section id="ecosystem" className="py-28 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-xs tracking-[0.3em] uppercase text-muted mb-6">Anchored Guild</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Where UGC creators begin.</h2>
                <p className="text-base text-dim leading-relaxed mb-6">
                  앵커드 길드는 Roblox를 중심으로 한 UGC 게임 크리에이터 커뮤니티입니다. 개발자, 빌더, 기획자, 아티스트, 애니메이터, 운영자들이 모여 배우고, 협업하고, 프로젝트를 만들고, 서로의 성장을 돕습니다.
                </p>
                <p className="text-sm text-muted leading-relaxed mb-8">
                  앵커드에게 커뮤니티는 단순한 Discord 서버가 아닙니다. 미래의 크리에이터, 팀, 게임, IP를 발굴하는 가장 중요한 기반입니다.
                </p>
                <div className="p-6 border border-white/5 rounded-xl">
                  <p className="text-sm font-semibold mb-1">A community is not just an audience.</p>
                  <p className="text-sm text-muted">It is the birthplace of future IP.</p>
                </div>
              </div>
              <Img label="Guild Community Screenshot" aspect="4/3" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. Incubation Pipeline ── */}
      <section className="py-28 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-xs tracking-[0.3em] uppercase text-muted mb-6">Incubation Pipeline</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">From creator spark to mega-hit IP.</h2>
            <p className="text-sm text-muted mb-16">크리에이터의 작은 불꽃에서 메가 히트 IP까지.</p>
          </motion.div>

          {/* Pipeline visual */}
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {["Discover", "Incubate", "Team Up", "Build", "Launch", "Grow", "Expand IP"].map((s, i) => (
              <motion.div key={s} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.06 }}
                className="flex items-center gap-2"
              >
                <span className="px-4 py-2 text-xs font-medium tracking-wider uppercase border border-white/10 rounded-full hover:border-white/20 transition-colors">{s}</span>
                {i < 6 && <span className="text-white/20">→</span>}
              </motion.div>
            ))}
          </div>

          <div className="space-y-0">
            {pipeline.map((p, i) => (
              <motion.div key={p.n} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.03 }}
                className="group grid grid-cols-12 gap-4 py-6 border-t border-white/5 hover:bg-white/[0.015] transition-colors"
              >
                <span className="col-span-1 text-xs text-muted font-mono pt-0.5">{p.n}</span>
                <h3 className="col-span-3 text-sm font-semibold">{p.t}</h3>
                <p className="col-span-8 text-sm text-muted">{p.d}</p>
              </motion.div>
            ))}
            <div className="border-t border-white/5" />
          </div>
        </div>
      </section>

      {/* ── 5. What We Provide ── */}
      <section className="py-28 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-xs tracking-[0.3em] uppercase text-muted mb-6">What We Provide</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16">The ecosystem creators need to build worlds.</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {provides.map((p, i) => (
              <motion.div key={p.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }}
                className="p-7 border border-white/5 rounded-2xl hover:border-white/10 transition-colors"
              >
                <h3 className="text-sm font-semibold mb-2">{p.t}</h3>
                <p className="text-sm text-muted leading-relaxed">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. IP Lab ── */}
      <section id="ip-lab" className="py-28 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-xs tracking-[0.3em] uppercase text-muted mb-6">IP Lab</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Projects growing inside the Anchored ecosystem.</h2>
            <p className="text-sm text-muted max-w-xl leading-relaxed mb-16">
              앵커드의 프로젝트는 단순한 게임 개발 목록이 아닙니다. 각 프로젝트는 크리에이터 팀, 커뮤니티 피드백, LiveOps 실험, IP 가능성을 검증하는 인큐베이션 사례입니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((p, i) => (
              <motion.div key={p.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }}>
                <Link href={`/projects/${p.slug}`} className="group block p-7 border border-white/5 rounded-2xl hover:border-white/10 hover:bg-white/[0.015] transition-all h-full">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags.map((tag) => <span key={tag} className="text-[10px] tracking-wider uppercase text-muted">{tag}</span>)}
                  </div>
                  <h3 className="text-base font-semibold mb-2 group-hover:text-white transition-colors">{p.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{p.descriptionKo}</p>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/projects" className="group inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors">
              View all projects
              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. Creator Journey ── */}
      <section className="py-28 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-xs tracking-[0.3em] uppercase text-muted mb-6">Creator Journey</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16">A path for creators to become IP builders.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="relative pl-8">
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
              {journey.map((step, i) => (
                <motion.div key={step} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="relative mb-6 last:mb-0"
                >
                  <div className="absolute -left-8 top-1.5 w-[7px] h-[7px] rounded-full bg-white/30 border border-white/20" />
                  <p className="text-sm">{step}</p>
                </motion.div>
              ))}
            </div>
            <div>
              <Img label="Creator Journey Illustration" aspect="3/4" />
              <div className="mt-8 p-6 border border-white/5 rounded-xl">
                <p className="text-sm font-semibold mb-1">We do not just find talent.</p>
                <p className="text-sm text-muted">We build the path for talent to become IP.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8 & 9. For Creators + Partners ── */}
      <section id="partners" className="py-28 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="p-10 md:p-12 border border-white/5 rounded-2xl hover:border-white/10 transition-colors"
            >
              <p className="text-xs tracking-[0.2em] uppercase text-muted mb-6">For Creators</p>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Build your world<br />with Anchored.</h3>
              <p className="text-sm text-muted leading-relaxed mb-8">
                Roblox 게임을 만들고 싶거나, 이미 프로젝트가 있다면 앵커드 길드에서 시작하세요. 커뮤니티, 교육, 팀 빌딩, 퍼블리싱, LiveOps를 통해 함께 성장합니다.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://discord.gg/anchored" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-colors">
                  Join Guild
                  <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                </a>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="p-10 md:p-12 border border-white/5 rounded-2xl hover:border-white/10 transition-colors"
            >
              <p className="text-xs tracking-[0.2em] uppercase text-muted mb-6">For Partners & Investors</p>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Partner with the next<br />generation of UGC IP.</h3>
              <p className="text-sm text-muted leading-relaxed mb-8">
                플랫폼, 퍼블리셔, 브랜드, 교육기관, 투자자는 앵커드를 통해 신진 크리에이터, 성장 중인 게임 프로젝트, 커뮤니티, IP 기회와 연결될 수 있습니다.
              </p>
              <a href="mailto:contact@anchored.kr" className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white border border-white/15 rounded-full hover:border-white/30 transition-colors">
                Get in Touch <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 10. About ── */}
      <section className="py-28 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-xs tracking-[0.3em] uppercase text-muted mb-6">About Anchored</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">From community to mega-hit IP.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <p className="text-base text-dim leading-relaxed">
                앵커드는 한국 Roblox 크리에이터 커뮤니티에서 시작했습니다. 우리는 크리에이터들이 만나고, 배우고, 팀을 만들고, 게임을 출시하고, 유저와 함께 성장할 수 있는 생태계를 만들고 있습니다.
              </p>
              <p className="text-base text-dim leading-relaxed">
                앵커드의 목표는 단순히 더 많은 게임을 만드는 것이 아닙니다. 커뮤니티 속에서 미래의 IP 창업가를 발굴하고, 그들이 자신만의 세계를 만들고, 그 세계가 메가 히트 IP로 성장할 수 있도록 돕습니다.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-10">
              {[
                { v: 200, s: "+", l: "Creators" },
                { v: 10, s: "+", l: "Game Projects" },
                { v: 50, s: "+", l: "Events" },
                { v: 15, s: "+", l: "Partners" },
              ].map((s, i) => (
                <motion.div key={s.l} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <div className="text-3xl md:text-4xl font-bold font-mono"><Counter target={s.v} suffix={s.s} /></div>
                  <div className="text-xs text-muted mt-2 tracking-[0.2em] uppercase">{s.l}</div>
                </motion.div>
              ))}
            </div>

            <p className="mt-16 text-lg font-semibold">Anchored inspires future IP entrepreneurs.</p>
          </motion.div>
        </div>
      </section>

      {/* ── 11. Contact ── */}
      <section id="contact" className="py-28 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-xs tracking-[0.3em] uppercase text-muted mb-6">Contact</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">From creator community to mega-hit UGC IP.</h2>
            <p className="text-sm text-muted mb-10">크리에이터 커뮤니티에서 메가 히트 UGC IP까지.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://discord.gg/anchored" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 px-8 py-3.5 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-colors">
                Join Guild <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
              </a>
              <a href="mailto:contact@anchored.kr" className="inline-flex items-center gap-3 px-8 py-3.5 text-sm font-medium text-white border border-white/15 rounded-full hover:border-white/30 transition-colors">contact@anchored.kr</a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
