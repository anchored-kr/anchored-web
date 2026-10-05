"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useLang } from "@/components/os/LangContext";
import { t, type LText } from "@/data/i18n";
import { hero, reel, why, model, where, fleet, build, how, sprint, footer, viz, vizData, type FleetTeam } from "@/data/v2";
import { AnchorLogo } from "@/components/anchor-logo";
import { Chip, Sparkline, Meter, Stat, Radar, LegendKey, Funnel, Timeline, Flow, CrewDots, StepGlyph, Doc, Matrix, ConceptCurves, VIZ } from "./visuals";

/* ── helpers ── */

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
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

function Card({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <div id={id} className={`card p-6 md:p-8 ${className}`}>
      {children}
    </div>
  );
}

function Label({ text, className = "" }: { text: string; className?: string }) {
  return <p className={`meta text-accent-strong ${className}`}>{text}</p>;
}

function CardHead({ title, sub, right }: { title: string; sub?: string; right?: ReactNode }) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <h3 className="text-[15px] font-semibold tracking-tight text-ink">{title}</h3>
        {sub && <p className="mt-0.5 text-[12.5px] text-ink-3">{sub}</p>}
      </div>
      {right && <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">{right}</div>}
    </div>
  );
}

const h2 = "display-tight mt-5 font-display text-[clamp(30px,3.6vw,52px)] font-semibold text-ink";

/* ── 1. Hero ── */

export function Hero() {
  const lang = useLang();
  return (
    <section className="grid gap-4 md:grid-cols-12 md:gap-5">
      <div className="card flex flex-col justify-between p-7 md:col-span-7 md:p-12">
        <div>
          {/* CSS-driven entrance (visible before hydration, unlike whileInView) */}
          <p className="meta animate-rise">{t(hero.meta, lang)}</p>
          <h1 className="display-tight animate-rise mt-7 font-display text-[clamp(40px,5.6vw,84px)] font-semibold text-ink" style={{ animationDelay: "80ms" }}>
            <Lines text={t(hero.headline, lang)} />
          </h1>
        </div>
        <div className="animate-rise mt-12" style={{ animationDelay: "220ms" }}>
          <p className="max-w-[560px] text-[17px] leading-[1.55] text-ink md:text-[18px]">{t(hero.sub, lang)}</p>
          <p className="mt-4 max-w-[560px] text-[14.5px] leading-[1.6] text-ink-2">{t(hero.defense, lang)}</p>
          <p className="mt-5 font-display text-[15px] font-semibold tracking-tight text-accent-strong">{t(hero.accountable, lang)}</p>
          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <a href="#sprint" className="inline-flex h-[44px] items-center rounded-[10px] bg-accent px-5 text-[14px] font-semibold text-white shadow-[0_1px_2px_rgb(28_92_171/0.4)] transition-colors hover:bg-[#256abf] active:bg-accent-strong">
              {t(hero.primary, lang)} →
            </a>
            <a href="#model" className="inline-flex h-[44px] items-center rounded-[10px] bg-surface px-5 text-[14px] font-medium text-ink ring-1 ring-inset ring-line-2 transition-colors hover:bg-subtle">
              {t(hero.secondary, lang)}
            </a>
          </div>
        </div>
      </div>

      {/* production reel — real Anchored Guild captures, crossfading */}
      <div className="card-raised animate-rise relative min-h-[320px] overflow-hidden md:col-span-5 md:min-h-0" style={{ animationDelay: "160ms" }}>
        <div className="absolute inset-0 bg-ink">
          {reel.map((s) => (
            <div key={s.src} className="reel-slide">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} alt="" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 to-transparent px-5 pb-5 pt-20">
                <p className="meta text-white/85">{s.caption}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute left-4 top-4 flex gap-1.5">
          <Chip tone="good" dot>LIVE</Chip>
          <Chip tone="outline">ANCHORED GUILD</Chip>
        </div>
      </div>
    </section>
  );
}

/* ── 1b. Proof strip (numbers that are real today) ── */

export function ProofStrip() {
  const lang = useLang();
  return (
    <Reveal>
      <section className="card grid gap-px overflow-hidden bg-line p-0 sm:grid-cols-2 lg:grid-cols-4">
        {where.stats.map((s, i) => (
          <div key={s.value} className="bg-surface px-6 py-5">
            <p className="num font-display text-[30px] font-semibold tracking-[-0.02em] text-ink md:text-[34px]">{s.value}</p>
            <p className="mt-1 text-[12.5px] leading-snug text-ink-3">{t(s.label, lang)}</p>
            {i === 0 && (
              <div className="mt-3">
                <Chip tone="accent">Anchored Guild</Chip>
              </div>
            )}
            {i === 1 && (
              <div className="mt-3">
                <Chip tone="neutral" icon="clock">Demo Day</Chip>
              </div>
            )}
            {i === 2 && (
              <div className="mt-3 flex items-center gap-2">
                <CrewDots n={4} />
                <span className="text-[11.5px] text-ink-3">Fleet</span>
              </div>
            )}
            {i === 3 && (
              <div className="mt-3">
                <Chip tone="neutral">Concept → Launch → LiveOps</Chip>
              </div>
            )}
          </div>
        ))}
      </section>
    </Reveal>
  );
}

/* ── 2. Why Roblox is different ── */

export function WhyDifferent() {
  const lang = useLang();
  return (
    <section className="grid gap-4 md:grid-cols-12 md:gap-5">
      <Reveal className="md:col-span-5">
        <Card className="h-full">
          <Label text={t(why.label, lang)} />
          <h2 className={h2}>{t(why.headline, lang)}</h2>
          <div className="mt-7 space-y-4 text-[15.5px] leading-[1.65] text-ink-2">
            <p className="text-ink">{t(why.body1, lang)}</p>
            <p>{t(why.body2, lang)}</p>
            <p>{t(why.body3, lang)}</p>
          </div>
        </Card>
      </Reveal>
      <Reveal delay={0.08} className="md:col-span-7">
        <Card className="h-full">
          <CardHead title={t(viz.lifecycleTitle, lang)} sub={t(viz.example, lang)} right={<Chip tone="outline">{t(viz.concept, lang)}</Chip>} />
          <ConceptCurves labelA={t(viz.curveA, lang)} labelB={t(viz.curveB, lang)} launch={t(viz.launch, lang)} update={t(viz.update, lang)} />
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
            <LegendKey color={VIZ.gray} label={t(viz.curveA, lang)} />
            <LegendKey color={VIZ.accent} label={t(viz.curveB, lang)} />
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <div className="panel p-4">
              <p className="meta mb-3">{t(why.trackA, lang)}</p>
              <Flow steps={why.stepsA} tone="gray" />
            </div>
            <div className="panel p-4">
              <p className="meta mb-3 text-accent-strong">{t(why.trackB, lang)}</p>
              <Flow steps={why.stepsB} tone="accent" loop />
            </div>
          </div>
        </Card>
      </Reveal>
    </section>
  );
}

/* ── 3. The Anchored Model ── */

const GLYPHS = ["find", "validate", "assemble", "produce", "operate"] as const;

export function Model() {
  const lang = useLang();
  return (
    <section id="model" className="space-y-4 md:space-y-5">
      <Reveal>
        <Card>
          <Label text={t(model.label, lang)} />
          <h2 className="display-tight mt-5 break-words font-display text-[clamp(24px,3.05vw,46px)] font-semibold text-ink">
            {model.steps
              .map((s, i) => (
                <span key={s.en} className="inline-block">
                  {s.en.toUpperCase()}
                  {i < model.steps.length - 1 && <span className="mx-2.5 text-accent md:mx-4">/</span>}
                </span>
              ))
              .reduce<ReactNode[]>((acc, el, i) => (i === 0 ? [el] : [...acc, " ", el]), [])}
          </h2>
          <div className="relative mt-9 grid gap-3 md:grid-cols-5">
            <div className="absolute left-[10%] right-[10%] top-[38px] hidden h-px bg-line-2 md:block" aria-hidden="true" />
            {model.steps.map((s, i) => (
              <div key={s.en} className="panel relative p-5">
                <div className="flex items-start justify-between">
                  <div className="grid h-[52px] w-[52px] place-items-center rounded-xl bg-surface shadow-card">
                    <StepGlyph kind={GLYPHS[i]} />
                  </div>
                  <span className="num font-mono text-[11px] text-ink-4">0{i + 1}</span>
                </div>
                <h3 className="mt-5 font-display text-[20px] font-semibold tracking-tight text-ink">{t(s.title, lang)}</h3>
                <p className="meta mt-0.5">{s.en}</p>
                <p className="mt-3 text-[13.5px] leading-[1.6] text-ink-2">{t(s.desc, lang)}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-xl bg-accent-soft px-4 py-3.5 ring-1 ring-inset ring-accent/15">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#1c5cab" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0">
              <path d="M9 2v9M5 7l4 4 4-4M3 15h12" />
            </svg>
            <p className="font-display text-[15px] font-semibold tracking-tight text-accent-strong md:text-[16px]">{t(model.continuity, lang)}</p>
          </div>
        </Card>
      </Reveal>
      <Reveal delay={0.06}>
        <Card>
          <CardHead title={t(viz.timelineTitle, lang)} sub={t(viz.example, lang)} right={<Chip tone="outline">{t(viz.example, lang)}</Chip>} />
          <Timeline phases={vizData.timeline.map((p) => ({ ...p, label: t(p.label, lang) }))} total={vizData.timelineTotal} unit={t(viz.weeks, lang)} />
        </Card>
      </Reveal>
    </section>
  );
}

/* ── 4. Where the teams come from ── */

export function WhereTeams() {
  const lang = useLang();
  return (
    <section className="grid gap-4 md:grid-cols-12 md:gap-5">
      <Reveal className="md:col-span-5">
        <Card className="h-full">
          <Label text={t(where.label, lang)} />
          <h2 className={h2}><Lines text={t(where.headline, lang)} /></h2>
          <p className="mt-6 text-[15.5px] leading-[1.65] text-ink-2">{t(where.body, lang)}</p>
          <ol className="mt-7 space-y-0">
            {where.pipeline.map((p, i) => (
              <li key={i} className="rule flex items-center justify-between py-3">
                <span className="text-[15px] font-semibold tracking-tight text-ink">{t(p, lang)}</span>
                <span className="num font-mono text-[11px] text-ink-4">0{i + 1}</span>
              </li>
            ))}
          </ol>
        </Card>
      </Reveal>
      <Reveal delay={0.06} className="md:col-span-4">
        <Card className="h-full">
          <CardHead title={t(viz.pipelineTitle, lang)} sub={t(viz.schematic, lang)} right={<Chip tone="outline">{t(viz.concept, lang)}</Chip>} />
          <Funnel stages={vizData.funnel.map((s) => ({ ...s, label: t(s.label, lang) }))} />
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Stat label="Anchored Guild" value="723" />
            <Stat label="Fleet" value="4" sub={<CrewDots n={4} />} />
          </div>
        </Card>
      </Reveal>
      <Reveal delay={0.12} className="md:col-span-3">
        <Card className="flex h-full flex-col">
          <CardHead title={t(viz.radarTitle, lang)} right={<Chip tone="outline">{t(viz.sample, lang)}</Chip>} />
          <div className="flex flex-1 items-center justify-center">
            <Radar
              axes={vizData.radarAxes}
              series={[
                { label: t(viz.fleetAvg, lang), values: vizData.radarFleet, color: VIZ.gray },
                { label: t(viz.thisTeam, lang), values: vizData.radarTeam, color: VIZ.accent, fill: true },
              ]}
              size={232}
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
            <LegendKey color={VIZ.accent} label={t(viz.thisTeam, lang)} />
            <LegendKey color={VIZ.gray} label={t(viz.fleetAvg, lang)} />
          </div>
        </Card>
      </Reveal>
    </section>
  );
}

/* ── 5. Fleet roster ── */

function TeamCard({ team, index }: { team: FleetTeam; index: number }) {
  const lang = useLang();
  const live = team.status === "LIVE";
  return (
    <Reveal delay={(index % 2) * 0.06}>
      <div className="card group overflow-hidden">
        <div className="relative aspect-[16/10] bg-subtle">
          {team.capture ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={team.capture} alt={team.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
          ) : (
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
              <span className="pointer-events-none select-none font-display text-[clamp(120px,22vw,220px)] font-semibold leading-none tracking-[-0.06em] text-ink/[0.045]" aria-hidden="true">
                {team.name.slice(0, 2)}
              </span>
              <Chip tone="outline" className="absolute bottom-4 right-4" icon="clock">{t(fleet.pending, lang)}</Chip>
            </div>
          )}
          <div className="absolute left-4 top-4 flex gap-1.5">
            {live ? <Chip tone="good" dot>LIVE</Chip> : <Chip tone="accent" icon="clock">IN DEV</Chip>}
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-[22px] font-semibold tracking-tight text-ink">{team.name}</h3>
            <p className="meta">{t(team.genre, lang)}</p>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {team.strengths.map((s) => (
              <Chip key={t(s, lang)} tone="neutral">{t(s, lang)}</Chip>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
            <div className="flex items-center gap-2.5">
              {team.creators != null && <CrewDots n={team.creators} label={t(fleet.creatorsLabel, lang).replace("{n}", String(team.creators))} />}
              <p className="text-[12px] text-ink-3">
                {[team.creators != null ? t(fleet.creatorsLabel, lang).replace("{n}", String(team.creators)) : null, team.base, t(team.experience, lang)].filter(Boolean).join(" · ")}
              </p>
            </div>
            {team.slug && (
              <a href={`/projects/${team.slug}`} className="text-[12.5px] font-semibold text-accent-strong hover:underline">
                {t(fleet.view, lang)}
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Fleet() {
  const lang = useLang();
  return (
    <section id="fleet" className="space-y-4 md:space-y-5">
      <Reveal>
        <Card className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Label text={t(fleet.label, lang)} />
            <h2 className={h2}><Lines text={t(fleet.headline, lang)} /></h2>
          </div>
          <div className="flex items-center gap-3 md:pb-1">
            <p className="text-[14px] text-ink-2">{t(fleet.sub, lang)}</p>
            <Chip tone="accent">{t(viz.teamsCount, lang).replace("{n}", String(fleet.teams.length))}</Chip>
          </div>
        </Card>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {fleet.teams.map((team, i) => (
          <TeamCard key={team.name} team={team} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ── 6. What we build ── */

const BUILD_GLYPHS = ["produce", "operate", "assemble"] as const;

export function WhatWeBuild() {
  const lang = useLang();
  return (
    <section className="space-y-4 md:space-y-5">
      <div className="grid gap-4 md:grid-cols-3 md:gap-5">
        {build.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.06}>
            <Card className="h-full">
              {i === 0 && <Label text={t(build.label, lang)} className="mb-6" />}
              {i !== 0 && <p className="meta mb-6 opacity-0 select-none" aria-hidden="true">·</p>}
              <div className="flex items-start justify-between">
                <div className="grid h-[52px] w-[52px] place-items-center rounded-xl bg-subtle">
                  <StepGlyph kind={BUILD_GLYPHS[i]} />
                </div>
                <span className="num font-mono text-[11px] text-ink-4">0{i + 1}</span>
              </div>
              <h3 className="mt-6 font-display text-[22px] font-semibold leading-[1.15] tracking-tight text-ink md:text-[24px]">{item.title}</h3>
              <p className="mt-4 text-[14.5px] leading-[1.65] text-ink-2">{t(item.desc, lang)}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── 7. How engagement works (+ client dashboard sample + comparison) ── */

function ReportMock() {
  const lang = useLang();
  const r = vizData.report;
  return (
    <Card>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] font-semibold tracking-tight text-ink">{t(viz.reportTitle, lang)}</h3>
            <span className="num font-mono text-[10.5px] text-ink-4">{t(viz.week, lang)}</span>
          </div>
          <p className="mt-0.5 text-[12.5px] text-ink-3">{t(viz.reportSub, lang)}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Chip tone="good" icon="check">{t(viz.onTrack, lang)}</Chip>
          <Chip tone="warning" icon="warn">{t(viz.risk, lang)}</Chip>
          <Chip tone="outline">{t(viz.sample, lang)}</Chip>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label={t(viz.ccu, lang)} value={r.ccuNow} spark={r.ccuSpark} sub="LIVE" />
        <Stat label={t(viz.likes, lang)} value={r.likes} sub={<Meter ratio={0.92} tone="accent" className="mt-1 w-full" />} />
        <Stat label={t(viz.d7, lang)} value={r.d7} sub={<Meter ratio={0.18} tone="accent" className="mt-1 w-full" />} />
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <p className="meta mb-3">{t(viz.milestones, lang)}</p>
          <ul className="space-y-3">
            {r.milestones.map((m) => (
              <li key={t(m.label, lang)}>
                <div className="mb-1.5 flex items-center justify-between text-[12.5px]">
                  <span className="flex items-center gap-2 font-medium text-ink">
                    {t(m.label, lang)}
                    {m.ratio >= 1 && <Chip tone="good" icon="check">Done</Chip>}
                  </span>
                  <span className="num text-ink-3">{Math.round(m.ratio * 100)}%</span>
                </div>
                <Meter ratio={m.ratio} tone={m.tone} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="meta mb-3">{t(viz.nextActions, lang)}</p>
          <ul className="space-y-2">
            {r.actions.map((a, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[12.5px] leading-snug text-ink-2">
                <span className={`mt-[3px] grid h-3.5 w-3.5 shrink-0 place-items-center rounded-[4px] ring-1 ring-inset ${i === 0 ? "bg-accent ring-accent" : "bg-surface ring-line-2"}`}>
                  {i === 0 && (
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.5 6.5l2.3 2.3L9.5 3.8" /></svg>
                  )}
                </span>
                <span className={i === 0 ? "text-ink-3 line-through decoration-line-2" : ""}>{t(a, lang)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}

export function HowWeWork() {
  const lang = useLang();
  return (
    <section className="grid gap-4 md:grid-cols-12 md:gap-5">
      <Reveal className="md:col-span-5">
        <Card className="h-full">
          <Label text={t(how.label, lang)} />
          <h2 className={h2}>{t(how.headline, lang)}</h2>
          <ol className="mt-7">
            {how.points.map((p, i) => (
              <li key={i} className="rule flex gap-4 py-4">
                <span className="num mt-[3px] font-mono text-[11px] text-ink-4">0{i + 1}</span>
                <p className={`text-[14.5px] leading-[1.6] ${i === 2 ? "font-medium text-ink" : "text-ink-2"}`}>{t(p, lang)}</p>
              </li>
            ))}
          </ol>
        </Card>
      </Reveal>
      <div className="space-y-4 md:col-span-7 md:space-y-5">
        <Reveal delay={0.06}>
          <ReportMock />
        </Reveal>
        <Reveal delay={0.1}>
          <Card>
            <CardHead title={t(viz.compareTitle, lang)} />
            <Matrix colA={t(viz.colA, lang)} colB={t(viz.colB, lang)} rows={vizData.compare.map((r) => ({ label: t(r.label, lang), a: t(r.a, lang), b: t(r.b, lang) }))} />
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

/* ── 8. Production Sprint CTA ── */

export function SprintCta() {
  const lang = useLang();
  return (
    <Reveal>
      <section id="sprint" className="rounded-[14px] bg-ink p-7 text-white shadow-raised md:p-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="meta text-white/55">{t(sprint.label, lang)}</p>
            <h2 className="display-tight mt-5 font-display text-[clamp(34px,4.6vw,68px)] font-semibold">
              <Lines text={t(sprint.headline, lang)} />
            </h2>
            <p className="mt-6 text-[17px] text-white/80 md:text-[19px]">{t(sprint.sub, lang)}</p>
            <a
              href="mailto:contact@anchored.kr?subject=Production%20Sprint"
              className="mt-8 inline-flex h-[46px] items-center rounded-[10px] bg-accent px-5 text-[14px] font-semibold text-white transition-colors hover:bg-[#256abf]"
            >
              {t(sprint.cta, lang)} →
            </a>
            <div className="mt-10">
              <p className="meta mb-3 text-white/55">{t(viz.deliverables, lang)}</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {viz.deliverableItems.map((d, i) => (
                  <Doc key={i} n={i + 1} title={t(d, lang)} dark />
                ))}
              </div>
            </div>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <ol>
              {sprint.steps.map((s, i) => (
                <li key={i} className="flex items-baseline gap-4 border-t border-white/10 py-3.5">
                  <span className="num font-mono text-[11px] text-white/40">0{i + 1}</span>
                  <span className="text-[15px] text-white/90">{t(s, lang)}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-[12.5px] leading-[1.6] text-white/50">{t(sprint.note, lang)}</p>
          </div>
        </div>
      </section>
    </Reveal>
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
    <footer id="creators" className="px-2 pb-6 pt-8 md:px-4 md:pt-10">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="meta">{t(footer.clientsLabel, lang)}</p>
          <p className="mt-2 font-display text-[20px] font-semibold tracking-tight text-ink">{t(footer.clients, lang)}</p>
          <p className="meta mt-7">{t(footer.creatorsLabel, lang)}</p>
          <p className="mt-2 font-display text-[20px] font-semibold tracking-tight text-ink">{t(footer.creators, lang)}</p>
          <a href="https://discord.gg/anchored" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-[13px] font-semibold text-accent-strong hover:underline">
            Anchored Guild →
          </a>
        </div>
        <div className="flex flex-col justify-between md:col-span-5 md:col-start-8">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-ink-2 transition-colors hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex items-center gap-3 text-ink-3">
            <AnchorLogo className="h-5 w-5" />
            <span className="meta">© {new Date().getFullYear()} ANCHORED — AN ANCHORED PRODUCTION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Sparkline };
export type { LText };
