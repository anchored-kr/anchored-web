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
  return <>{text}<span className="inline-block w-[2px] h-[0.85em] bg-white ml-0.5 animate-pulse align-middle" /></>;
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

function IPLabCarousel({ featured }: { featured: typeof projects }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 5);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => { el.removeEventListener("scroll", checkScroll); window.removeEventListener("resize", checkScroll); };
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>(":scope > div > div")?.offsetWidth || 300;
    el.scrollBy({ left: dir === "right" ? cardWidth + 20 : -(cardWidth + 20), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div ref={scrollRef} className="overflow-hidden -mx-6 md:-mx-12 px-6 md:px-12">
        <div className="flex gap-5">
          {featured.map((p, i) => (
            <motion.div key={p.slug} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }}
              className="w-[calc(25%-15px)] min-w-[260px] flex-shrink-0">
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
      </div>
      {canLeft && (
        <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 rounded-full bg-white border border-border shadow-[rgba(0,0,0,0.08)_0px_4px_16px] flex items-center justify-center hover:bg-surface-soft transition-colors z-10">
          <svg className="w-5 h-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
      )}
      {canRight && (
        <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 rounded-full bg-white border border-border shadow-[rgba(0,0,0,0.08)_0px_4px_16px] flex items-center justify-center hover:bg-surface-soft transition-colors z-10">
          <svg className="w-5 h-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      )}
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
                The Creator Label for UGC Games
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-[clamp(2rem,5.5vw,3.5rem)] font-extrabold leading-[1.1] tracking-[-1px] max-w-4xl text-white hidden md:block">
              We debut creators as games.
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 text-lg text-white/70 leading-[1.5] max-w-2xl hidden md:block">
              앵커드는 가능성 있는 UGC 게임 크리에이터를 발굴하고, 그들을 게임으로 데뷔시키고, 미래의 메가 히트 IP로 성장시키는 크리에이터 레이블입니다.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex-wrap gap-3 hidden md:flex">
              <a href="https://discord.gg/anchored" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-[13px] bg-white text-ink text-base font-semibold rounded-xl hover:bg-white/90 transition-colors">
                Join the Guild
              </a>
              <a href="#partners"
                className="inline-flex items-center gap-2 px-5 py-[13px] text-base font-semibold text-white border border-white/20 rounded-xl hover:border-white/40 transition-colors">
                Partner with Us
              </a>
            </motion.div>
          </motion.div>
        </div>
        </div>
      </section>

      {/* ━━ Manifesto ━━ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-[12px] font-bold tracking-[0.3px] uppercase text-primary mb-8">Creator Label</p>
            <h2 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold leading-[1.3] tracking-[-0.5px] text-ink mb-8">
              음악 산업에 아티스트를 발굴하고 데뷔시키는 레이블이 있다면,<br />
              <span className="text-primary">앵커드는 UGC 게임 크리에이터를 위한 크리에이터 레이블입니다.</span>
            </h2>
            <div className="space-y-5 text-base text-body leading-[1.6]">
              <p>
                세상에는 아직 이름을 얻지 못한 창작자들이 많습니다. 아이디어는 있지만 팀이 없는 사람. 감각은 있지만 완성까지 가본 적 없는 사람. 게임을 사랑하지만, 그 열정을 어떻게 작품과 커리어로 바꿔야 할지 모르는 사람.
              </p>
              <p>
                앵커드는 그런 크리에이터들을 위한 출발점이 되고자 합니다. 우리는 가능성 있는 UGC 게임 크리에이터를 발굴하고, 그들이 첫 번째 게임을 만들고, 출시하고, 운영하고, 나아가 자신만의 IP와 팬덤을 가진 창작자로 성장할 수 있도록 돕습니다.
              </p>
            </div>
            <div className="mt-12 p-8 bg-surface-soft rounded-2xl">
              <p className="text-xl md:text-2xl font-extrabold text-ink leading-[1.3]">
                &quot;우리는 재능을 게임으로 데뷔시킵니다.&quot;
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━ Guild — Underground Scene ━━ */}
      <section id="ecosystem" className="bg-surface-dark py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-[12px] font-bold tracking-[0.3px] uppercase text-primary mb-8">Anchored Guild</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold leading-[1.22] tracking-[-0.5px] text-white mb-6">
                  우리의 언더그라운드 씬.
                </h2>
                <div className="space-y-4 text-base text-white/70 leading-[1.6]">
                  <p>
                    크리에이터는 갑자기 등장하지 않습니다. 씬 안에서 자라고, 서로 영향을 주고받으며, 작은 시도를 반복하면서 만들어집니다.
                  </p>
                  <p>
                    앵커드 길드는 단순한 디스코드 커뮤니티가 아닙니다. 한국 UGC 게임 크리에이터들의 언더그라운드 씬입니다. 누군가는 처음으로 Roblox Studio를 켜고, 누군가는 팀원을 찾고, 누군가는 첫 번째 피드백을 받습니다.
                  </p>
                  <p className="text-white font-semibold">
                    이 모든 과정이 앵커드에게는 발굴의 순간입니다.
                  </p>
                </div>
                <a href="https://discord.gg/anchored" target="_blank" rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 px-5 py-[13px] bg-primary text-on-primary text-base font-semibold rounded-xl hover:bg-primary-dark transition-colors">
                  Join the Guild
                </a>
              </div>
              <Img label="Guild Community" aspect="4/3" className="bg-[#1a1a1f]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━ School — Growth ━━ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-[12px] font-bold tracking-[0.3px] uppercase text-primary mb-8">Anchored School</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Img label="School Program" aspect="4/3" />
              <div>
                <h2 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold leading-[1.22] tracking-[-0.5px] text-ink mb-6">
                  가능성을 성장으로 바꾸는 곳.
                </h2>
                <div className="space-y-4 text-base text-body leading-[1.6]">
                  <p>
                    재능만으로는 충분하지 않습니다. 게임을 끝까지 완성하는 힘, 플레이어를 이해하는 힘, 팀과 협업하는 힘, 데이터를 보고 판단하는 힘. 이 모든 역량은 훈련되어야 합니다.
                  </p>
                  <p>
                    앵커드 스쿨은 크리에이터가 자신의 감각을 언어화하고, 아이디어를 구조화하고, 게임 제작의 기본기를 익히는 곳입니다.
                  </p>
                </div>
                <div className="mt-8 p-6 bg-surface-soft rounded-2xl">
                  <p className="text-sm font-semibold text-ink">앵커드에게 교육은 목적지가 아닙니다.</p>
                  <p className="text-sm text-body mt-1">교육은 데뷔를 위한 준비 과정입니다.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━ Fleet — Debut Lineup ━━ */}
      <section className="bg-surface-soft py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-[12px] font-bold tracking-[0.3px] uppercase text-primary mb-8">Anchored Fleet</p>
            <h2 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold leading-[1.22] tracking-[-0.5px] text-ink mb-6">
              크리에이터의 데뷔 라인업.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <p className="text-base text-body leading-[1.6]">
                앵커드 플릿은 가능성 있는 팀들이 실제 게임을 만들고 출시하는 무대입니다. 각 팀은 서로 다른 색깔과 장르, 감각을 가집니다. 앵커드는 각 크리에이터와 팀이 가진 고유한 색을 살리되, 시장에서 살아남기 위해 필요한 제작 시스템과 운영 체계를 제공합니다.
              </p>
              <p className="text-base text-body leading-[1.6]">
                우리는 팀에게 단순히 &quot;게임을 만들어라&quot;라고 말하지 않습니다. 함께 목표를 정하고, 출시까지의 길을 설계하고, 플레이어 반응을 보며 다음 선택을 합니다. 앵커드 플릿은 미래의 UGC 게임 IP들이 데뷔를 준비하는 라인업입니다.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━ IP Lab ━━ */}
      <section id="ip-lab" className="bg-white py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[12px] font-bold tracking-[0.3px] uppercase text-primary mb-6">IP Lab</p>
                <h2 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold leading-[1.22] tracking-[-0.5px] text-ink">
                  앵커드 생태계에서 자라고 있는 프로젝트들.
                </h2>
              </div>
              <Link href="/projects" className="hidden md:inline-flex items-center gap-2 px-4 py-[10px] text-sm font-medium text-primary-dark border border-primary-dark rounded-xl hover:bg-primary-subtle transition-colors whitespace-nowrap">
                View all
              </Link>
            </div>
          </motion.div>

          <IPLabCarousel featured={featured} />

          <div className="mt-8 md:hidden">
            <Link href="/projects" className="inline-flex items-center gap-2 px-4 py-[10px] text-sm font-medium text-primary-dark border border-primary-dark rounded-xl hover:bg-primary-subtle transition-colors">
              View all projects
            </Link>
          </div>
        </div>
      </section>

      {/* ━━ Vision ━━ */}
      <section className="bg-surface-dark py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-[12px] font-bold tracking-[0.3px] uppercase text-primary mb-8">Our Vision</p>
            <h2 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold leading-[1.3] tracking-[-0.5px] text-white mb-8">
              우리는 게임이 아니라,<br />크리에이터의 커리어를 만듭니다.
            </h2>
            <div className="space-y-5 text-base text-white/70 leading-[1.6]">
              <p>
                앵커드가 진짜로 만들고 싶은 것은 단기적인 게임 하나가 아닙니다. 우리는 크리에이터가 계속해서 더 큰 작품을 만들고, 자신만의 팬덤과 IP를 가진 창작자로 성장하기를 바랍니다.
              </p>
              <p>
                게임 하나가 실패해도 크리에이터는 남습니다. 출시 과정에서 배운 감각, 팀워크, 데이터, 운영 경험은 다음 게임의 자산이 됩니다.
              </p>
              <p className="text-white font-semibold">
                그래서 앵커드는 프로젝트만 보지 않습니다. 우리는 사람을 봅니다.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { v: 200, s: "+", l: "Creators" },
                { v: 10, s: "+", l: "Projects" },
                { v: 50, s: "+", l: "Events" },
                { v: 15, s: "+", l: "Partners" },
              ].map((s, i) => (
                <motion.div key={s.l} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <div className="text-3xl md:text-4xl font-extrabold text-white font-mono"><Counter target={s.v} suffix={s.s} /></div>
                  <div className="text-[12px] font-medium text-white/40 mt-2 uppercase tracking-wider">{s.l}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━ CTA ━━ */}
      <section id="partners" className="bg-primary py-20 md:py-28">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-[12px] font-bold tracking-[0.3px] uppercase text-on-primary/60 mb-5">For Creators</p>
              <h3 className="text-[clamp(1.5rem,3.5vw,2rem)] font-extrabold leading-[1.22] tracking-[-0.5px] text-on-primary mb-4">
                당신의 세계를 앵커드에서 시작하세요.
              </h3>
              <p className="text-base text-on-primary/75 leading-[1.5] mb-8">
                Roblox 게임을 만들고 싶은 사람. 팀원을 찾고 있는 사람. 자신만의 IP를 만들고 싶은 사람. 앵커드는 당신의 데뷔를 함께합니다.
              </p>
              <a href="https://discord.gg/anchored" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-[13px] bg-white text-primary text-base font-semibold rounded-xl hover:bg-white/90 transition-colors">
                Join the Guild
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <p className="text-[12px] font-bold tracking-[0.3px] uppercase text-on-primary/60 mb-5">For Partners</p>
              <h3 className="text-[clamp(1.5rem,3.5vw,2rem)] font-extrabold leading-[1.22] tracking-[-0.5px] text-on-primary mb-4">
                차세대 UGC IP 생태계와 함께하세요.
              </h3>
              <p className="text-base text-on-primary/75 leading-[1.5] mb-8">
                플랫폼, 퍼블리셔, 브랜드, 투자자는 앵커드를 통해 신진 크리에이터, 게임 프로젝트, IP 기회와 연결됩니다.
              </p>
              <a href="mailto:contact@anchored.kr"
                className="inline-flex items-center gap-2 px-5 py-[13px] text-base font-semibold text-on-primary border border-on-primary/30 rounded-xl hover:border-on-primary/60 transition-colors">
                Get in Touch
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━ Closing ━━ */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-base text-body leading-[1.6] mb-8">
              우리는 크리에이터를 발굴합니다. 훈련합니다. 팀과 연결합니다.<br className="hidden md:block" />
              게임을 출시합니다. IP가 성장하도록 운영합니다.
            </p>
            <p className="text-xl md:text-2xl font-extrabold text-ink leading-[1.3]">
              앵커드는 UGC 게임 크리에이터를 위한<br />크리에이터 레이블입니다.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
