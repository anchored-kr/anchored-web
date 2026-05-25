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
  return <><span className="text-white">{text}</span><span className="inline-block w-[2px] h-[0.8em] bg-white ml-0.5 animate-pulse align-middle" /></>;
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
    <div className={`relative rounded-xl bg-surface-soft overflow-hidden ${className}`} style={{ aspectRatio: aspect }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-8 h-8 mx-auto mb-2 text-border" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
          </svg>
          <p className="text-[10px] tracking-[0.15em] uppercase text-muted">{label}</p>
        </div>
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };

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
      {/* ━━ Hero ━━ */}
      <section className="relative bg-surface-dark overflow-hidden" style={{ aspectRatio: "21/9" }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/hero-bg.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-dark/95 via-surface-dark/80 to-surface-dark/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/90 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-end pb-12 md:pb-16 lg:pb-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 w-full">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="mb-6 hidden md:block">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/80">
                Starting with Roblox
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-[clamp(2.5rem,5.5vw,3rem)] font-extrabold leading-[1.17] tracking-[-1px] max-w-3xl text-white hidden md:block">
              Discovering the Next<br />
              <TypeWriter texts={["Mega-Hit UGC IPs.", "Creator-Led Worlds.", "Future Game Studios."]} />
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 text-base text-white/70 leading-[1.38] max-w-xl hidden md:block">
              Anchored is a creator ecosystem that discovers, incubates, and launches emerging UGC game creators and their worlds.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex-wrap gap-3 hidden md:flex">
              <a href="https://discord.gg/anchored" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-[13px] bg-white text-ink text-base font-medium rounded-xl hover:bg-white/90 transition-colors">
                Join Anchored Guild
              </a>
              <a href="#partners"
                className="inline-flex items-center gap-2 px-4 py-[13px] text-base font-medium text-white border border-white/20 rounded-xl hover:border-white/40 transition-colors">
                Partner with Us
              </a>
            </motion.div>
          </motion.div>
        </div>
        </div>
      </section>

      {/* ━━ IP Lab ━━ */}
      <section id="ip-lab" className="bg-white py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-[12px] font-bold tracking-[0.3px] uppercase text-primary mb-6">IP Lab</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-extrabold leading-[1.22] tracking-[-0.5px] text-ink mb-3">
              Projects growing inside the Anchored ecosystem.
            </h2>
            <p className="text-sm text-muted max-w-xl leading-[1.43] mb-12">
              각 프로젝트는 크리에이터 팀, 커뮤니티 피드백, LiveOps 실험, IP 가능성을 검증하는 인큐베이션 사례입니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((p, i) => (
              <motion.div key={p.slug} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }}>
                <Link href={`/projects/${p.slug}`} className="group block bg-white rounded-2xl border border-border overflow-hidden hover:shadow-[rgba(0,0,0,0.06)_0px_8px_32px] transition-all h-full">
                  <Img label={p.title} aspect="16/9" className="rounded-none" />
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {p.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-border-subtle text-body uppercase tracking-wider">{tag}</span>
                      ))}
                    </div>
                    <h3 className="text-base font-semibold text-ink mb-1.5 group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="text-sm text-body leading-[1.43]">{p.descriptionKo}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/projects" className="inline-flex items-center gap-2 px-4 py-[13px] text-base font-medium text-primary-dark border border-primary-dark rounded-xl hover:bg-primary-subtle transition-colors">
              View all projects
            </Link>
          </div>
        </div>
      </section>

      {/* ━━ About ━━ */}
      <section className="bg-surface-soft py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-[12px] font-bold tracking-[0.3px] uppercase text-primary mb-6">About Anchored</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-extrabold leading-[1.22] tracking-[-0.5px] text-ink mb-8">
              From community to mega-hit IP.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
              <p className="text-base text-body leading-[1.38]">
                앵커드는 한국 Roblox 크리에이터 커뮤니티에서 시작했습니다. 크리에이터들이 만나고, 배우고, 팀을 만들고, 게임을 출시하고, 유저와 함께 성장할 수 있는 생태계를 만들고 있습니다.
              </p>
              <p className="text-base text-body leading-[1.38]">
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
                <motion.div key={s.l} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <div className="text-4xl font-bold text-ink font-mono"><Counter target={s.v} suffix={s.s} /></div>
                  <div className="text-[12px] font-medium text-muted mt-2 uppercase tracking-wider">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━ Guild ━━ */}
      <section id="ecosystem" className="bg-white py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-[12px] font-bold tracking-[0.3px] uppercase text-primary mb-6">Anchored Guild</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-extrabold leading-[1.22] tracking-[-0.5px] text-ink mb-5">
                  Where UGC creators begin.
                </h2>
                <p className="text-base text-body leading-[1.38] mb-5">
                  앵커드 길드는 Roblox를 중심으로 한 UGC 게임 크리에이터 커뮤니티입니다. 개발자, 빌더, 기획자, 아티스트들이 모여 배우고, 협업하고, 프로젝트를 만들고, 서로의 성장을 돕습니다.
                </p>
                <p className="text-sm text-muted leading-[1.43] mb-6">
                  앵커드에게 커뮤니티는 단순한 Discord 서버가 아닙니다. 미래의 크리에이터, 팀, 게임, IP를 발굴하는 가장 중요한 기반입니다.
                </p>
                <a href="https://discord.gg/anchored" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-[13px] bg-primary text-on-primary text-base font-medium rounded-xl hover:bg-primary-dark transition-colors">
                  Join the Guild
                </a>
              </div>
              <Img label="Guild Community" aspect="4/3" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━ Pipeline ━━ */}
      <section className="bg-surface-soft py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-[12px] font-bold tracking-[0.3px] uppercase text-primary mb-6">Incubation Pipeline</p>
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-extrabold leading-[1.22] tracking-[-0.5px] text-ink mb-3">
              From creator spark to mega-hit IP.
            </h2>
            <p className="text-sm text-muted mb-10">크리에이터의 작은 불꽃에서 메가 히트 IP까지.</p>
          </motion.div>

          <div className="flex flex-wrap gap-2 mb-10">
            {["Discover", "Incubate", "Team Up", "Build", "Launch", "Grow", "Expand IP"].map((s, i) => (
              <motion.div key={s} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.04 }}
                className="flex items-center gap-2">
                <span className="px-3 py-1.5 text-[12px] font-medium text-primary bg-primary-subtle rounded-lg">{s}</span>
                {i < 6 && <span className="text-border">→</span>}
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-[rgba(0,0,0,0.03)_0px_4px_24px] overflow-hidden">
            {pipeline.map((p, i) => (
              <motion.div key={p.n} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.03 }}
                className={`grid grid-cols-12 gap-4 py-5 px-6 ${i > 0 ? "border-t border-border" : ""}`}>
                <span className="col-span-1 text-[14px] text-muted font-mono">{p.n}</span>
                <h3 className="col-span-3 text-base font-semibold text-ink">{p.t}</h3>
                <p className="col-span-8 text-sm text-body leading-[1.43]">{p.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ CTA ━━ */}
      <section id="partners" className="bg-primary py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-[12px] font-bold tracking-[0.3px] uppercase text-on-primary/60 mb-5">For Creators</p>
              <h3 className="text-[clamp(1.5rem,3.5vw,2rem)] font-extrabold leading-[1.22] tracking-[-0.5px] text-on-primary mb-4">
                Build your world with Anchored.
              </h3>
              <p className="text-base text-on-primary/75 leading-[1.38] mb-8">
                Roblox 게임을 만들고 싶거나 이미 프로젝트가 있다면, 앵커드 길드에서 시작하세요.
              </p>
              <a href="https://discord.gg/anchored" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-[13px] bg-white text-primary text-base font-medium rounded-xl hover:bg-white/90 transition-colors">
                Join Guild
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <p className="text-[12px] font-bold tracking-[0.3px] uppercase text-on-primary/60 mb-5">For Partners & Investors</p>
              <h3 className="text-[clamp(1.5rem,3.5vw,2rem)] font-extrabold leading-[1.22] tracking-[-0.5px] text-on-primary mb-4">
                Partner with the next generation of UGC IP.
              </h3>
              <p className="text-base text-on-primary/75 leading-[1.38] mb-8">
                플랫폼, 퍼블리셔, 브랜드, 투자자는 앵커드를 통해 크리에이터, 프로젝트, IP 기회와 연결됩니다.
              </p>
              <a href="mailto:contact@anchored.kr"
                className="inline-flex items-center gap-2 px-4 py-[13px] text-base font-medium text-on-primary border border-on-primary/30 rounded-xl hover:border-on-primary/60 transition-colors">
                Get in Touch
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
