"use client";

import { useLang } from "@/components/os/LangContext";
import { t } from "@/data/i18n";
import { mainVisual, news, film, message, purpose, productions, creators, produce, figures, how3, guild, start, footer3, type Production } from "@/data/v3";
import { AnchorLogoHorizontal } from "@/components/anchor-logo";
import { Reveal, Lines, Section, BoxLink, Cap, AMask, AGlyph } from "./ui";

/* ── 01 Main Visual ── */

export function MainVisual() {
  const lang = useLang();
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto grid min-h-[calc(100svh-72px)] max-w-[1320px] grid-cols-1 items-center gap-8 px-5 py-10 md:grid-cols-12 md:gap-10 md:px-8">
        <div className="md:col-span-7">
          <Cap className="animate-rise block text-k-ink/60">{mainVisual.corner}</Cap>
          <h1 className="k-display animate-rise mt-8 text-[clamp(44px,6.3vw,96px)] text-k-ink" style={{ animationDelay: "80ms" }}>
            <Lines text={t(mainVisual.headline, lang)} />
          </h1>
          <p className="animate-rise mt-8 text-[16px] text-k-ink/70 md:text-[18px]" style={{ animationDelay: "200ms" }}>{t(mainVisual.sub, lang)}</p>
        </div>
        <div className="animate-rise md:col-span-5" style={{ animationDelay: "160ms" }}>
          <div className="mx-auto w-[min(100%,420px)] text-k-ink md:w-full">
            <AMask slides={film.stills} />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <Cap className="text-k-ink/50">ANCHORED GUILD — PRODUCTION REEL</Cap>
            <Cap className="text-k-ink/50">01 / 03</Cap>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-6 left-5 hidden items-center gap-3 md:flex md:left-8">
        <span className="h-10 w-px bg-k-ink/40" aria-hidden="true" />
        <Cap className="text-k-ink/50">{t(mainVisual.scroll, lang)}</Cap>
      </div>
    </section>
  );
}

/* ── 02 News ── */

export function News() {
  const lang = useLang();
  return (
    <Section id="news" title={news.title} sub={t(news.sub, lang)}>
      <ul>
        {news.items.map((n, i) => (
          <Reveal key={i} delay={i * 0.04}>
            <li className={`grid gap-2 py-5 md:grid-cols-[150px_120px_1fr] md:items-baseline md:gap-6 ${i === 0 ? "k-rule-1" : "border-t border-k-ink/20"}`}>
              <span className="font-mono text-[12px] font-semibold tracking-[0.08em] text-k-ink">{n.date}</span>
              <span>
                <span className={`inline-block border px-1.5 py-0.5 font-mono text-[9.5px] font-semibold tracking-[0.14em] ${n.tag === "NEW" ? "border-k-blue bg-k-blue text-white" : "border-k-ink text-k-ink"}`}>{n.tag}</span>
              </span>
              <a href={n.href} className="text-[16px] font-medium leading-[1.5] text-k-ink underline decoration-k-ink/0 underline-offset-4 transition-colors hover:decoration-k-ink md:text-[17px]">
                {t(n.title, lang)}
              </a>
            </li>
          </Reveal>
        ))}
      </ul>
      <div className="mt-8 flex justify-end border-t border-k-ink/20 pt-8">
        <BoxLink href="#news">{t(news.viewAll, lang)}</BoxLink>
      </div>
    </Section>
  );
}

/* ── 03 Brand Film ── */

export function BrandFilm() {
  const lang = useLang();
  return (
    <Section title={film.title} sub={t(film.sub, lang)}>
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Cap className="text-k-ink/60">{t(film.tagline, lang)}</Cap>
            <h3 className="k-display mt-2 text-[clamp(30px,3.6vw,48px)] text-k-ink">{film.name}</h3>
          </div>
          <div className="flex items-center gap-3">
            <Cap className="text-k-ink/50">{t(film.soon, lang)}</Cap>
            <span className="inline-flex items-stretch border-2 border-k-ink/40 font-mono text-[11px] font-semibold tracking-[0.16em] text-k-ink/50" aria-disabled="true">
              <span className="flex items-center px-4 py-2.5">{t(film.play, lang)}</span>
              <span className="flex w-10 items-center justify-center border-l-2 border-k-ink/40">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M2 1l9 5-9 5z" /></svg>
              </span>
            </span>
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.06} className="mt-7 grid grid-cols-3 gap-2 md:gap-3">
        {film.stills.map((s) => (
          <figure key={s.src} className="group relative aspect-[4/3] overflow-hidden bg-k-dark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.src} alt={s.caption} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <figcaption className="absolute bottom-2 left-2 bg-white px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-[0.14em] text-k-ink">{s.caption}</figcaption>
          </figure>
        ))}
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-10 max-w-[720px] font-display text-[22px] font-semibold leading-[1.3] tracking-tight text-k-ink md:text-[28px]">
          <Lines text={t(film.closing, lang)} />
        </p>
      </Reveal>
    </Section>
  );
}

/* ── 04 Message ── */

export function Message() {
  const lang = useLang();
  return (
    <Section id="message" title={message.title} sub={t(message.sub, lang)}>
      <Reveal>
        <p className="font-display text-[clamp(24px,2.6vw,34px)] font-medium leading-[1.3] tracking-tight text-k-ink">{t(message.headline, lang)}</p>
      </Reveal>
      <Reveal delay={0.06}>
        <div className="mt-8 max-w-[760px] space-y-5 text-[17px] leading-[1.75] text-k-ink/85 md:text-[19px]">
          {message.body.map((p, i) => (
            <p key={i}>{t(p, lang)}</p>
          ))}
        </div>
        <p className="mt-8 font-mono text-[11px] font-semibold tracking-[0.16em] text-k-ink/60">{message.signature}</p>
        <div className="mt-8">
          <BoxLink href="#how">{t(message.more, lang)}</BoxLink>
        </div>
      </Reveal>
    </Section>
  );
}

/* ── 05 Purpose ── */

export function Purpose() {
  const lang = useLang();
  const tones = ["bg-k-blue text-white", "bg-k-dark text-white", "bg-white text-k-ink border-2 border-k-ink"];
  return (
    <Section title={purpose.title} sub={t(purpose.sub, lang)}>
      <Reveal>
        <p className="k-display text-[clamp(30px,4.4vw,60px)] text-k-ink">{purpose.statement}</p>
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
        {purpose.blocks.map((b, i) => (
          <Reveal key={b.word} delay={i * 0.06}>
            <div className={`flex h-full flex-col justify-between ${tones[i]} p-6 md:min-h-[360px] md:p-7`}>
              <span className="font-mono text-[10.5px] font-semibold tracking-[0.16em] opacity-70">0{i + 1}</span>
              <div>
                <p className="k-display text-[clamp(32px,3.4vw,46px)]">{b.word}</p>
                <p className="mt-5 text-[14.5px] leading-[1.7] opacity-90">{t(b.body, lang)}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── 06 Productions ── */

function Poster({ p, i }: { p: Production; i: number }) {
  const lang = useLang();
  const even = i % 2 === 0;
  return (
    <Reveal>
      <article className={`grid gap-5 py-10 md:grid-cols-12 md:gap-10 md:py-14 ${i === 0 ? "k-rule-1" : "border-t border-k-ink/20"}`}>
        <div className={`md:col-span-8 ${even ? "" : "md:order-2"}`}>
          <a href={p.slug ? `/projects/${p.slug}` : "#"} className="group relative block aspect-[16/9] overflow-hidden bg-k-dark text-white">
            {p.capture ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.capture} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            ) : (
              <div className="absolute inset-0">
                <AGlyph className="absolute -right-[6%] -top-[12%] h-[128%] w-auto text-white/[0.07] transition-transform duration-700 group-hover:scale-[1.03]" />
                <p className="k-display absolute bottom-6 left-6 text-[clamp(40px,6vw,96px)] text-white md:bottom-8 md:left-8">{p.name}</p>
                <Cap className="absolute right-6 top-6 text-white/50">CAPTURE PENDING</Cap>
              </div>
            )}
          </a>
        </div>
        <div className={`flex flex-col justify-between md:col-span-4 ${even ? "" : "md:order-1"}`}>
          <div>
            <div className="flex items-center justify-between">
              <Cap className="text-k-ink/50">0{i + 1}</Cap>
              <span className={`inline-flex items-center gap-1.5 border px-1.5 py-0.5 font-mono text-[9.5px] font-semibold tracking-[0.14em] ${p.live ? "border-k-blue text-k-blue" : "border-k-ink text-k-ink"}`}>
                {p.live && <span className="h-1.5 w-1.5 rounded-full bg-k-blue" />}
                {p.status}
              </span>
            </div>
            <h3 className="k-display mt-6 text-[clamp(30px,3.2vw,44px)] text-k-ink">{p.name}</h3>
            <p className="mt-2 font-mono text-[11px] font-semibold tracking-[0.14em] text-k-ink/60">{t(p.line, lang)}</p>
            {p.team && (
              <p className="mt-5 text-[14px] leading-[1.6] text-k-ink/75">
                {p.team.strengths.map((s) => t(s, lang)).join(" · ")}
              </p>
            )}
          </div>
          {p.slug && (
            <div className="mt-6">
              <BoxLink href={`/projects/${p.slug}`}>{t(productions.detail, lang).toUpperCase()}</BoxLink>
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}

export function Productions() {
  const lang = useLang();
  return (
    <Section id="productions" title={productions.title} sub={t(productions.sub, lang)} ghost="PRODUCTIONS">
      {productions.items.map((p, i) => (
        <Poster key={p.name} p={p} i={i} />
      ))}
    </Section>
  );
}

/* ── 07 Creators ── */

export function Creators() {
  const lang = useLang();
  return (
    <Section id="creators" title={creators.title} sub={t(creators.sub, lang)} ghost="CREATORS">
      <Reveal>
        <Cap className="text-k-ink/60">{creators.eyebrow}</Cap>
      </Reveal>
      <div className="mt-6 grid gap-px border-2 border-k-ink bg-k-ink sm:grid-cols-2 lg:grid-cols-4">
        {creators.teams.map((team, i) => (
          <Reveal key={team.name} delay={i * 0.05} className="bg-white">
            <div className="flex h-full flex-col p-5 md:p-6">
              <div className="flex items-center justify-between">
                <Cap className="text-k-ink/50">{creators.fleetLabel} 0{i + 1}</Cap>
                <span className={`font-mono text-[9.5px] font-semibold tracking-[0.14em] ${team.status === "LIVE" ? "text-k-blue" : "text-k-ink/60"}`}>{team.status}</span>
              </div>
              <div className="mt-6 flex aspect-square items-center justify-center border border-k-ink/15 bg-k-off">
                <AGlyph className="h-[46%] w-auto text-k-ink/15" />
              </div>
              <h3 className="k-display mt-6 text-[26px] text-k-ink">{team.name}</h3>
              <p className="mt-2 font-mono text-[10.5px] font-semibold tracking-[0.14em] text-k-ink/60">{t(team.genre, lang).toUpperCase()}</p>
              <p className="mt-4 text-[13px] leading-[1.6] text-k-ink/75">{team.strengths.map((s) => t(s, lang)).join(" / ")}</p>
              <p className="mt-auto pt-6 font-mono text-[10.5px] tracking-[0.1em] text-k-ink/50">
                {[team.creators != null ? t(creators.creatorsLabel, lang).replace("{n}", String(team.creators)) : null, team.base].filter(Boolean).join(" · ")}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="mt-6 max-w-[640px] text-[14px] leading-[1.7] text-k-ink/70">{t(creators.note, lang)}</p>
      </Reveal>
    </Section>
  );
}

/* ── 08 What We Produce ── */

const ICONS = [
  <svg key="a" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" aria-hidden="true"><rect x="5" y="9" width="30" height="22" /><path d="M11 25l6-7 4 4 5-7 4 5" /></svg>,
  <svg key="b" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" aria-hidden="true"><path d="M32 20a12 12 0 1 1-3.5-8.5" /><path d="M32 7v7h-7" /><circle cx="20" cy="20" r="2.5" fill="currentColor" stroke="none" /></svg>,
  <svg key="c" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" aria-hidden="true"><circle cx="13" cy="15" r="4" /><circle cx="27" cy="15" r="4" /><circle cx="20" cy="27" r="4" /><path d="M16 18l4 5M24 18l-4 5" /></svg>,
];

export function WhatWeProduce() {
  const lang = useLang();
  return (
    <Section title={produce.title} sub={t(produce.sub, lang)}>
      <div className="grid gap-px border-2 border-k-ink bg-k-ink md:grid-cols-3">
        {produce.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.06} className="bg-white">
            <div className="flex h-full flex-col p-6 md:min-h-[340px] md:p-7">
              <div className="flex items-start justify-between">
                <span className="h-10 w-10 text-k-ink">{ICONS[i]}</span>
                <Cap className="text-k-ink/40">0{i + 1}</Cap>
              </div>
              <h3 className="k-display mt-8 text-[clamp(24px,2.3vw,30px)] text-k-ink">
                <Lines text={item.display} />
              </h3>
              <p className="mt-5 text-[14px] leading-[1.7] text-k-ink/75">{t(item.desc, lang)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── 09 Figures ── */

export function Figures() {
  const lang = useLang();
  return (
    <Section title={figures.title} sub={t(figures.sub, lang)} ghost="FIGURES">
      <div className="grid border-t-2 border-k-ink sm:grid-cols-2 lg:grid-cols-4">
        {figures.items.map((f, i) => (
          <Reveal key={f.value} delay={i * 0.05}>
            <div className={`border-b border-k-ink/30 py-8 pr-6 ${i % 2 === 1 ? "sm:border-l sm:pl-6" : ""} ${i > 0 ? "lg:border-l lg:pl-6" : ""} lg:border-k-ink/30`}>
              <p className="k-display text-[clamp(36px,3.8vw,54px)] text-k-ink">{f.value}</p>
              <p className="mt-3 text-[13px] text-k-ink/65">{t(f.label, lang)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── 10 How We Produce ── */

export function HowWeProduce() {
  const lang = useLang();
  return (
    <Section id="how" title={how3.title} sub={t(how3.sub, lang)}>
      <ol className="grid border-t-2 border-k-ink sm:grid-cols-2 lg:grid-cols-5">
        {how3.steps.map((s, i) => (
          <Reveal key={s.en} delay={i * 0.04}>
            <li className={`h-full border-b border-k-ink/30 py-6 pr-5 ${i > 0 ? "lg:border-l lg:border-k-ink/30 lg:pl-5" : ""}`}>
              <Cap className="text-k-ink/45">0{i + 1}</Cap>
              <p className="k-display mt-4 text-[22px] text-k-ink">{s.en.toUpperCase()}</p>
              <p className="mt-1 text-[12px] text-k-ink/55">{t(s.title, lang)}</p>
              <p className="mt-4 text-[13px] leading-[1.65] text-k-ink/75">{t(s.desc, lang)}</p>
            </li>
          </Reveal>
        ))}
      </ol>
      <Reveal>
        <p className="mt-8 font-display text-[18px] font-semibold tracking-tight text-k-ink md:text-[20px]">{t(how3.continuity, lang)}</p>
      </Reveal>
    </Section>
  );
}

/* ── 11 Community / Guild ── */

export function Guild() {
  const lang = useLang();
  return (
    <Section id="guild" title={guild.title} sub={t(guild.sub, lang)}>
      <div className="grid gap-8 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-7">
          <figure className="relative aspect-[16/10] overflow-hidden bg-k-dark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={guild.image} alt="Anchored Guild" className="k-duotone h-full w-full object-cover" />
            <div className="k-duotone-tint absolute inset-0" aria-hidden="true" />
            <figcaption className="absolute bottom-3 left-3 bg-white px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-[0.14em] text-k-ink">ANCHORED GUILD HALL</figcaption>
          </figure>
        </Reveal>
        <Reveal delay={0.06} className="md:col-span-5">
          <p className="k-display text-[clamp(26px,2.8vw,36px)] text-k-ink">{t(guild.headline, lang)}</p>
          <p className="mt-5 text-[15px] leading-[1.75] text-k-ink/80">{t(guild.body, lang)}</p>
          <dl className="mt-7 border-t border-k-ink/30">
            {guild.points.map((p) => (
              <div key={p.k} className="flex items-baseline justify-between border-b border-k-ink/30 py-3">
                <dt className="font-mono text-[12px] font-semibold tracking-[0.1em] text-k-ink">{p.k}</dt>
                <dd className="text-[13px] text-k-ink/65">{t(p.v, lang)}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-7">
            <BoxLink href={guild.href} external>{t(guild.join, lang)}</BoxLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ── 12 Start a Production ── */

export function StartProduction() {
  const lang = useLang();
  return (
    <Section id="contact" title={start.title} sub={t(start.sub, lang)} dark>
      <div className="grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <p className="k-display text-[clamp(32px,4vw,56px)] text-white">
            <Lines text={t(start.headline, lang)} />
          </p>
          <p className="mt-6 text-[17px] text-white/75 md:text-[19px]">{t(start.body, lang)}</p>
          <div className="mt-8">
            <BoxLink href={start.mail} dark>{t(start.cta, lang)}</BoxLink>
          </div>
        </Reveal>
        <Reveal delay={0.06} className="md:col-span-5">
          <Cap className="text-white/50">{start.sprintLabel}</Cap>
          <ol className="mt-3 border-t border-white/30">
            {start.steps.map((s, i) => (
              <li key={i} className="flex items-baseline gap-4 border-b border-white/20 py-3">
                <span className="font-mono text-[10.5px] text-white/40">0{i + 1}</span>
                <span className="text-[15px] text-white/90">{t(s, lang)}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-[12.5px] leading-[1.6] text-white/50">{t(start.note, lang)}</p>
        </Reveal>
      </div>
    </Section>
  );
}

/* ── 13 Footer ── */

export function Footer() {
  const lang = useLang();
  return (
    <footer className="bg-k-dark text-white">
      <div className="mx-auto max-w-[1320px] px-5 pb-10 pt-16 md:px-8 md:pt-20">
        <AnchorLogoHorizontal className="h-7 w-auto" color="#ffffff" />
        <p className="mt-6 font-display text-[22px] font-semibold tracking-tight md:text-[28px]">{footer3.tagline}</p>
        <div className="mt-12 grid gap-10 border-t border-white/20 pt-10 md:grid-cols-12">
          {footer3.columns.map((c) => (
            <div key={t(c.head, "en")} className="md:col-span-2">
              <p className="font-mono text-[10.5px] font-semibold tracking-[0.16em] text-white/50">{t(c.head, lang).toUpperCase()}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="text-[13.5px] text-white/85 underline decoration-white/0 underline-offset-4 transition-colors hover:decoration-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="md:col-span-4 md:col-start-9">
            <p className="font-mono text-[10.5px] font-semibold tracking-[0.16em] text-white/50">OFFICE</p>
            <p className="mt-4 text-[13.5px] text-white/85">{t(footer3.office, lang)}</p>
            <p className="mt-8 text-[13.5px] leading-[1.6] text-white/60">{t(footer3.forCreators, lang)}</p>
          </div>
        </div>
      </div>
      <div className="overflow-hidden border-t border-white/15">
        <p className="k-display mx-auto max-w-[1320px] translate-y-[8%] px-5 text-[clamp(48px,15.5vw,236px)] leading-none text-white md:px-8" aria-hidden="true">ANCHORED</p>
      </div>
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-5 md:px-8">
        <Cap className="text-white/45">© {new Date().getFullYear()} ANCHORED. ALL RIGHTS RESERVED.</Cap>
        <Cap className="text-white/45">SEOUL</Cap>
      </div>
    </footer>
  );
}
