"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useLang } from "@/components/os/LangContext";
import { t, type LText } from "@/data/i18n";
import { hero, reel, why, model, where, fleet, build, how, sprint, footer, type FleetTeam } from "@/data/v2";
import { AnchorLogo } from "@/components/anchor-logo";

/* ── helpers ── */

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((l, i) => (
        <span key={i} className="block">{l}</span>
      ))}
    </>
  );
}

function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`mx-auto max-w-[1440px] px-6 md:px-10 ${className}`}>
      {children}
    </section>
  );
}

function Label({ text }: { text: string }) {
  return <p className="meta text-anchor-blue">{text}</p>;
}

/* ── 1. Hero ── */

export function Hero() {
  const lang = useLang();
  return (
    <Section className="flex min-h-[100svh] flex-col justify-between pb-10 pt-32 md:pt-40">
      <div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="meta text-stone">
          {t(hero.meta, lang)}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="display-tight mt-8 font-display text-[clamp(52px,9.2vw,152px)] font-semibold text-carbon"
        >
          <Lines text={t(hero.headline, lang)} />
        </motion.h1>
      </div>

      <div className="mt-16 grid gap-10 md:grid-cols-12 md:items-end">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="md:col-span-6 lg:col-span-5">
          <p className="text-[18px] leading-[1.5] text-carbon md:text-[20px]">{t(hero.sub, lang)}</p>
          <p className="mt-5 text-[15px] leading-[1.6] text-carbon/65">{t(hero.defense, lang)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-wrap items-center gap-4 md:col-span-6 md:justify-end lg:col-span-7">
          <a href="#sprint" className="rounded-full bg-carbon px-6 py-3.5 text-[14px] font-semibold text-paper transition-colors hover:bg-anchor-blue">
            {t(hero.primary, lang)} →
          </a>
          <a href="#model" className="meta text-carbon/70 underline underline-offset-[6px] decoration-line transition-colors hover:text-carbon">
            {t(hero.secondary, lang)}
          </a>
        </motion.div>
      </div>
    </Section>
  );
}

/* ── 2. Reel (placeholder for the production reel — real guild captures) ── */

export function Reel() {
  return (
    <div className="relative h-[70svh] w-full overflow-hidden bg-carbon md:h-[100svh]" aria-hidden="true">
      {reel.map((s) => (
        <div key={s.src} className="reel-slide">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.src} alt="" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-carbon/70 to-transparent px-6 pb-6 pt-24 md:px-10">
            <p className="meta text-paper/80">{s.caption}</p>
          </div>
        </div>
      ))}
      <p className="meta absolute right-6 top-6 text-paper/60 md:right-10">PRODUCTION REEL — PLACEHOLDER</p>
    </div>
  );
}

/* ── 3. Why Roblox is different ── */

function Track({ label, steps, strong }: { label: string; steps: string[]; strong?: boolean }) {
  return (
    <div className="rule pt-5">
      <p className={`meta ${strong ? "text-anchor-blue" : "text-stone"}`}>{label}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <span className={`font-display text-[22px] font-semibold tracking-tight md:text-[28px] ${strong ? "text-carbon" : "text-stone"}`}>{s}</span>
            {i < steps.length - 1 && <span className={`font-mono text-[14px] ${strong ? "text-anchor-blue" : "text-stone/60"}`}>→</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function WhyDifferent() {
  const lang = useLang();
  return (
    <Section className="py-28 md:py-40">
      <div className="grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <Label text={t(why.label, lang)} />
          <h2 className="display-tight mt-6 font-display text-[clamp(36px,4.6vw,64px)] font-semibold">{t(why.headline, lang)}</h2>
        </Reveal>
        <Reveal delay={0.1} className="space-y-5 text-[17px] leading-[1.6] text-carbon/80 md:col-span-6 md:col-start-7 md:text-[19px]">
          <p>{t(why.body1, lang)}</p>
          <p>{t(why.body2, lang)}</p>
          <p>{t(why.body3, lang)}</p>
        </Reveal>
      </div>
      <Reveal delay={0.15} className="mt-20 grid gap-10 md:grid-cols-2">
        <Track label={t(why.trackA, lang)} steps={why.stepsA} />
        <Track label={t(why.trackB, lang)} steps={why.stepsB} strong />
      </Reveal>
    </Section>
  );
}

/* ── 4. The Anchored Model ── */

export function Model() {
  const lang = useLang();
  return (
    <Section id="model" className="py-28 md:py-40">
      <Reveal>
        <Label text={t(model.label, lang)} />
        <h2 className="display-tight mt-6 break-words font-display text-[clamp(32px,5.6vw,84px)] font-semibold">
          {model.steps.map((s, i) => (
            <span key={s.en} className="inline-block">
              {s.en.toUpperCase()}
              {i < model.steps.length - 1 && <span className="mx-3 text-anchor-blue md:mx-5">/</span>}
            </span>
          )).reduce<React.ReactNode[]>((acc, el, i) => (i === 0 ? [el] : [...acc, " ", el]), [])}
        </h2>
      </Reveal>
      <div className="mt-16 grid gap-px bg-line md:grid-cols-5">
        {model.steps.map((s, i) => (
          <Reveal key={s.en} delay={i * 0.06} className="bg-paper py-8 pr-6 md:pr-8">
            <p className="font-mono text-[11px] text-stone">0{i + 1}</p>
            <h3 className="mt-6 font-display text-[26px] font-semibold tracking-tight">{t(s.title, lang)}</h3>
            <p className="meta mt-1 text-stone">{s.en}</p>
            <p className="mt-5 text-[15px] leading-[1.6] text-carbon/75">{t(s.desc, lang)}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="rule mt-16 pt-6">
        <p className="font-display text-[20px] font-medium tracking-tight text-anchor-blue md:text-[24px]">{t(model.continuity, lang)}</p>
      </Reveal>
    </Section>
  );
}

/* ── 5. Where the teams come from ── */

export function WhereTeams() {
  const lang = useLang();
  return (
    <Section className="py-28 md:py-40">
      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-6">
          <Label text={t(where.label, lang)} />
          <h2 className="display-tight mt-6 font-display text-[clamp(36px,4.6vw,64px)] font-semibold">{t(where.headline, lang)}</h2>
          <p className="mt-8 text-[17px] leading-[1.65] text-carbon/80 md:text-[19px]">{t(where.body, lang)}</p>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-5 md:col-start-8">
          <ol className="space-y-0">
            {where.pipeline.map((p, i) => (
              <li key={i} className="rule flex items-baseline justify-between py-4">
                <span className="font-display text-[22px] font-semibold tracking-tight md:text-[26px]">{t(p, lang)}</span>
                <span className="font-mono text-[11px] text-stone">0{i + 1}</span>
              </li>
            ))}
          </ol>
          <div className="mt-12 grid grid-cols-3 gap-6">
            {where.stats.map((s) => (
              <div key={s.value}>
                <p className="font-display text-[40px] font-semibold tracking-tight md:text-[52px]">{s.value}</p>
                <p className="meta mt-1 text-stone">{t(s.label, lang)}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ── 6. Fleet lookbook ── */

function TeamCard({ team, index }: { team: FleetTeam; index: number }) {
  const lang = useLang();
  const offset = index % 2 === 1;
  return (
    <Reveal delay={(index % 2) * 0.08} className={`group ${offset ? "md:mt-20" : ""}`}>
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
        {team.capture ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={team.capture} alt={team.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="meta text-stone">{t(fleet.pending, lang)}</p>
          </div>
        )}
        <span className={`meta absolute left-4 top-4 rounded-full px-2.5 py-1 ${team.status === "LIVE" ? "bg-anchor-blue text-paper" : "bg-paper text-carbon"}`}>
          {team.status}
        </span>
      </div>
      <div className="mt-5 flex items-baseline justify-between">
        <h3 className="font-display text-[28px] font-semibold tracking-tight">{team.name}</h3>
        <p className="meta text-stone">{t(team.genre, lang)}</p>
      </div>
      <p className="mt-2 text-[14px] text-carbon/70">{team.strengths.map((s) => t(s, lang)).join(" · ")}</p>
      <p className="meta mt-3 text-stone">{t(team.experience, lang)}</p>
    </Reveal>
  );
}

export function Fleet() {
  const lang = useLang();
  return (
    <Section id="fleet" className="py-28 md:py-40">
      <Reveal>
        <Label text={t(fleet.label, lang)} />
        <h2 className="display-tight mt-6 font-display text-[clamp(36px,5vw,72px)] font-semibold">
          <Lines text={t(fleet.headline, lang)} />
        </h2>
      </Reveal>
      <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 md:items-start">
        {fleet.teams.map((team, i) => (
          <TeamCard key={team.name} team={team} index={i} />
        ))}
      </div>
    </Section>
  );
}

/* ── 7. What we build ── */

export function WhatWeBuild() {
  const lang = useLang();
  return (
    <Section className="py-28 md:py-40">
      <Reveal>
        <Label text={t(build.label, lang)} />
      </Reveal>
      <div className="mt-10 grid gap-px bg-line md:grid-cols-3">
        {build.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08} className="bg-paper py-10 pr-8">
            <p className="font-mono text-[11px] text-stone">0{i + 1}</p>
            <h3 className="mt-6 font-display text-[26px] font-semibold leading-[1.1] tracking-tight md:text-[30px]">{item.title}</h3>
            <p className="mt-6 text-[15px] leading-[1.65] text-carbon/75">{t(item.desc, lang)}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── 8. How engagement works ── */

export function HowWeWork() {
  const lang = useLang();
  return (
    <Section className="py-28 md:py-40">
      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <Label text={t(how.label, lang)} />
          <h2 className="display-tight mt-6 font-display text-[clamp(36px,4.6vw,64px)] font-semibold">{t(how.headline, lang)}</h2>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-7 md:col-start-6">
          <ol>
            {how.points.map((p, i) => (
              <li key={i} className="rule flex gap-6 py-6">
                <span className="font-mono text-[11px] text-stone">0{i + 1}</span>
                <p className={`text-[17px] leading-[1.55] md:text-[19px] ${i === 2 ? "font-medium text-carbon" : "text-carbon/80"}`}>{t(p, lang)}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  );
}

/* ── 9. Production Sprint CTA ── */

export function SprintCta() {
  const lang = useLang();
  return (
    <section id="sprint" className="bg-carbon text-paper">
      <div className="mx-auto max-w-[1440px] px-6 py-28 md:px-10 md:py-40">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <p className="meta text-paper/55">{t(sprint.label, lang)}</p>
            <h2 className="display-tight mt-6 font-display text-[clamp(40px,6vw,96px)] font-semibold">
              <Lines text={t(sprint.headline, lang)} />
            </h2>
            <p className="mt-8 text-[19px] text-paper/80 md:text-[22px]">{t(sprint.sub, lang)}</p>
            <a
              href="mailto:contact@anchored.kr?subject=Production%20Sprint"
              className="mt-10 inline-block rounded-full bg-paper px-7 py-4 text-[15px] font-semibold text-carbon transition-colors hover:bg-anchor-blue hover:text-paper"
            >
              {t(sprint.cta, lang)} →
            </a>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 md:col-start-9">
            <ol>
              {sprint.steps.map((s, i) => (
                <li key={i} className="flex items-baseline gap-5 border-t border-paper/15 py-4">
                  <span className="font-mono text-[11px] text-paper/45">0{i + 1}</span>
                  <span className="text-[16px] text-paper/90">{t(s, lang)}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-[13px] leading-[1.6] text-paper/55">{t(sprint.note, lang)}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Footer (dual-facing) ── */

export function Footer() {
  const lang = useLang();
  const links = [
    { label: "Email", href: "mailto:contact@anchored.kr" },
    { label: "Discord", href: "https://discord.gg/anchored" },
    { label: "GitHub", href: "https://github.com/anchored-kr" },
    { label: "X", href: "https://x.com/anchored_kr" },
  ];
  return (
    <footer id="creators" className="mx-auto max-w-[1440px] px-6 py-20 md:px-10">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="meta text-stone">{t(footer.clientsLabel, lang)}</p>
          <p className="mt-3 font-display text-[24px] font-medium tracking-tight">{t(footer.clients, lang)}</p>
          <p className="meta mt-10 text-stone">{t(footer.creatorsLabel, lang)}</p>
          <p className="mt-3 font-display text-[24px] font-medium tracking-tight">{t(footer.creators, lang)}</p>
          <a href="https://discord.gg/anchored" target="_blank" rel="noopener noreferrer" className="meta mt-4 inline-block text-anchor-blue underline underline-offset-[6px]">
            Anchored Guild →
          </a>
        </div>
        <div className="flex flex-col justify-between md:col-span-5 md:col-start-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="meta text-carbon/70 transition-colors hover:text-carbon">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-16 flex items-center gap-3 text-stone">
            <AnchorLogo className="h-5 w-5" />
            <span className="meta">© {new Date().getFullYear()} ANCHORED — AN ANCHORED PRODUCTION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* keep LText import referenced for type-only usage in data */
export type { LText };
