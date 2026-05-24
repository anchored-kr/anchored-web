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
    <div className={`relative rounded-lg bg-surface-elevated overflow-hidden ${className}`} style={{ aspectRatio: aspect }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-8 h-8 mx-auto mb-2 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
          </svg>
          <p className="text-[10px] tracking-[0.15em] uppercase text-white/20">{label}</p>
        </div>
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } };

/* ── Data ── */

const featured = projects.filter((p) => p.featured);

const pipeline = [
  { n: "01", t: "Discover", d: "커뮤니티 활동, 미션, 이벤트, 워크숍을 통해 잠재력 있는 신진 크리에이터를 발굴합니다." },
  { n: "02", t: "Incubate", d: "게임 기획, 스크립팅, 빌드, 협업, LiveOps 역량을 키울 수 있도록 돕습니다." },
  { n: "03", t: "Team Up", d: "크리에이터의 역량과 관심사를 바탕으로 팀을 구성합니다." },
  { n: "04", t: "Build", d: "팀이 아이디어를 플레이 가능한 UGC 게임으로 전환하도록 지원합니다." },
  { n: "05", t: "Launch", d: "커뮤니티 테스트와 퍼블리싱 지원을 통해 실제 유저와 만나도록 돕습니다." },
  { n: "06", t: "Grow", d: "유저 피드백과 LiveOps를 활용해 리텐션과 성장을 개선합니다." },
  { n: "07", t: "Expand IP", d: "가능성 있는 게임을 브랜드, 캐릭터, 장기 IP로 확장합니다." },
];

/* ── Page ── */

export default function Home() {
  return (
    <>
      {/* ━━ BAND 1: Dark Hero ━━ */}
      <section className="relative bg-black py-24 md:py-32 lg:py-40">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-hairline-dark text-[12px] font-medium tracking-[0.3px] text-dim">
                <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute h-full w-full rounded-full bg-primary opacity-60" /><span className="relative rounded-full h-1.5 w-1.5 bg-primary" /></span>
                Starting with Roblox
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-[clamp(2.5rem,6vw,3.75rem)] font-light leading-[1.25] tracking-[-0.1px] max-w-3xl">
              Discovering the Next<br />
              <TypeWriter texts={["Mega-Hit UGC IPs.", "Creator-Led Worlds.", "Future Game Studios."]} />
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-8 text-lg text-dim leading-[1.5] tracking-[0.1px] max-w-2xl">
              Anchored is a creator ecosystem that discovers, incubates, and launches emerging UGC game creators and their worlds.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
              <a href="https://discord.gg/anchored" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-on-primary text-sm font-bold tracking-[0.45px] rounded-full hover:bg-primary-pressed transition-colors">
                Join Anchored Guild
              </a>
              <a href="#partners"
                className="inline-flex items-center gap-2 px-7 py-3 text-sm font-bold tracking-[0.45px] text-white border border-hairline-dark rounded-full hover:border-white/40 transition-colors">
                Partner with Us
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ━━ BAND 2: Light — About ━━ */}
      <section className="bg-canvas-light py-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-[12px] font-bold tracking-[0.324px] uppercase text-primary mb-8">About Anchored</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-[1.25] text-ink tracking-[-0.1px] mb-10">
              From community to mega-hit IP.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <p className="text-lg text-body-light leading-[1.5] tracking-[0.1px]">
                앵커드는 한국 Roblox 크리에이터 커뮤니티에서 시작했습니다. 크리에이터들이 만나고, 배우고, 팀을 만들고, 게임을 출시하고, 유저와 함께 성장할 수 있는 생태계를 만들고 있습니다.
              </p>
              <p className="text-lg text-body-light leading-[1.5] tracking-[0.1px]">
                앵커드의 목표는 단순히 더 많은 게임을 만드는 것이 아닙니다. 커뮤니티 속에서 미래의 IP 창업가를 발굴하고, 그들의 세계가 메가 히트 IP로 성장할 수 있도록 돕습니다.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { v: 200, s: "+", l: "Creators" },
                { v: 10, s: "+", l: "Game Projects" },
                { v: 50, s: "+", l: "Events" },
                { v: 15, s: "+", l: "Partners" },
              ].map((s, i) => (
                <motion.div key={s.l} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <div className="text-4xl md:text-5xl font-light text-ink font-mono"><Counter target={s.v} suffix={s.s} /></div>
                  <div className="text-[12px] font-bold tracking-[0.324px] uppercase text-muted mt-2">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━ BAND 3: Dark — Guild ━━ */}
      <section id="ecosystem" className="bg-black py-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-[12px] font-bold tracking-[0.324px] uppercase text-primary mb-8">Anchored Guild</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-[1.25] tracking-[-0.1px] mb-6">
                  Where UGC creators begin.
                </h2>
                <p className="text-lg text-dim leading-[1.5] tracking-[0.1px] mb-6">
                  앵커드 길드는 Roblox를 중심으로 한 UGC 게임 크리에이터 커뮤니티입니다. 개발자, 빌더, 기획자, 아티스트들이 모여 배우고, 협업하고, 프로젝트를 만들고, 서로의 성장을 돕습니다.
                </p>
                <p className="text-base text-mute-dark leading-[1.5] mb-8">
                  앵커드에게 커뮤니티는 단순한 Discord 서버가 아닙니다. 미래의 크리에이터, 팀, 게임, IP를 발굴하는 가장 중요한 기반입니다.
                </p>
                <a href="https://discord.gg/anchored" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-on-primary text-sm font-bold tracking-[0.45px] rounded-full hover:bg-primary-pressed transition-colors">
                  Join the Guild
                </a>
              </div>
              <Img label="Guild Community" aspect="4/3" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━ BAND 4: Light — Pipeline ━━ */}
      <section className="bg-canvas-light py-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-[12px] font-bold tracking-[0.324px] uppercase text-primary mb-8">Incubation Pipeline</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-[1.25] text-ink tracking-[-0.1px] mb-4">
              From creator spark to mega-hit IP.
            </h2>
            <p className="text-base text-body-light tracking-[0.1px] mb-12">크리에이터의 작은 불꽃에서 메가 히트 IP까지.</p>
          </motion.div>

          <div className="flex flex-wrap justify-start gap-2 mb-12">
            {["Discover", "Incubate", "Team Up", "Build", "Launch", "Grow", "Expand IP"].map((s, i) => (
              <motion.div key={s} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center gap-2">
                <span className="px-4 py-2 text-[12px] font-bold tracking-[0.324px] uppercase text-ink border border-ink/10 rounded-full">{s}</span>
                {i < 6 && <span className="text-ink/20">→</span>}
              </motion.div>
            ))}
          </div>

          <div>
            {pipeline.map((p, i) => (
              <motion.div key={p.n} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.03 }}
                className="grid grid-cols-12 gap-4 py-5 border-t border-hairline-light">
                <span className="col-span-1 text-[14px] text-muted font-mono">{p.n}</span>
                <h3 className="col-span-3 text-base font-semibold text-ink">{p.t}</h3>
                <p className="col-span-8 text-base text-body-light leading-[1.5]">{p.d}</p>
              </motion.div>
            ))}
            <div className="border-t border-hairline-light" />
          </div>
        </div>
      </section>

      {/* ━━ BAND 5: Dark — IP Lab ━━ */}
      <section id="ip-lab" className="bg-black py-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-[12px] font-bold tracking-[0.324px] uppercase text-primary mb-8">IP Lab</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-[1.25] tracking-[-0.1px] mb-4">
              Projects growing inside the Anchored ecosystem.
            </h2>
            <p className="text-base text-dim max-w-xl leading-[1.5] tracking-[0.1px] mb-16">
              각 프로젝트는 크리에이터 팀, 커뮤니티 피드백, LiveOps 실험, IP 가능성을 검증하는 인큐베이션 사례입니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => (
              <motion.div key={p.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }}>
                <Link href={`/projects/${p.slug}`} className="group block bg-surface-card rounded-lg overflow-hidden hover:ring-1 hover:ring-primary/30 transition-all h-full">
                  <Img label={p.title} aspect="16/9" className="rounded-none" />
                  <div className="p-6">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {p.tags.map((tag) => <span key={tag} className="text-[10px] font-bold tracking-[0.324px] uppercase text-mute-dark">{tag}</span>)}
                    </div>
                    <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="text-sm text-dim leading-[1.5]">{p.descriptionKo}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/projects" className="inline-flex items-center gap-2 px-7 py-3 text-sm font-bold tracking-[0.45px] text-white border border-hairline-dark rounded-full hover:border-white/40 transition-colors">
              View all projects
            </Link>
          </div>
        </div>
      </section>

      {/* ━━ BAND 6: Primary Blue — CTA ━━ */}
      <section id="partners" className="bg-primary py-24">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-[12px] font-bold tracking-[0.324px] uppercase text-on-primary/70 mb-6">For Creators</p>
              <h3 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-light leading-[1.25] text-on-primary mb-4">
                Build your world with Anchored.
              </h3>
              <p className="text-base text-on-primary/80 leading-[1.5] tracking-[0.1px] mb-8">
                Roblox 게임을 만들고 싶거나 이미 프로젝트가 있다면, 앵커드 길드에서 시작하세요.
              </p>
              <a href="https://discord.gg/anchored" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 bg-white text-primary text-sm font-bold tracking-[0.45px] rounded-full hover:bg-white/90 transition-colors">
                Join Guild
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <p className="text-[12px] font-bold tracking-[0.324px] uppercase text-on-primary/70 mb-6">For Partners & Investors</p>
              <h3 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-light leading-[1.25] text-on-primary mb-4">
                Partner with the next generation of UGC IP.
              </h3>
              <p className="text-base text-on-primary/80 leading-[1.5] tracking-[0.1px] mb-8">
                플랫폼, 퍼블리셔, 브랜드, 투자자는 앵커드를 통해 크리에이터, 프로젝트, IP 기회와 연결됩니다.
              </p>
              <a href="mailto:contact@anchored.kr"
                className="inline-flex items-center gap-2 px-7 py-3 text-sm font-bold tracking-[0.45px] text-on-primary border border-on-primary/30 rounded-full hover:border-on-primary/60 transition-colors">
                Get in Touch
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
