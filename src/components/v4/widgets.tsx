"use client";

import { Fragment } from "react";
import { useLang } from "@/components/os/LangContext";
import { t } from "@/data/i18n";
import { strategy } from "@/data/v4";
import { Glyph } from "./icons";

const BLUE = "#0072CE";

/** Small round Anchored mark — "this one is ours". */
function AnchorDot() {
  return (
    <span className="grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full" style={{ background: BLUE }} aria-hidden="true">
      <svg viewBox="0 0 48 48" className="h-[13px] w-[13px]">
        <Glyph name="anchor" color="#ffffff" bg={BLUE} />
      </svg>
    </span>
  );
}

/** "We take responsibility for Roblox production." set big on Anchored blue. */
export function SloganPoster({ className = "aspect-[4/3]" }: { className?: string }) {
  return (
    <div className={`@container flex flex-col justify-end rounded-[6px] p-[6%] text-white ${className}`} style={{ background: BLUE }} aria-label={strategy.slogan.join(" ")}>
      {strategy.slogan.map((w) => (
        <p key={w} className="font-semibold leading-[0.98] tracking-[-0.035em]" style={{ fontSize: "10.5cqw" }}>
          {w}
        </p>
      ))}
    </div>
  );
}

/** The eight questions a client no longer has to manage — each answered by Anchored. */
export function Checklist({ wide = false }: { wide?: boolean }) {
  const lang = useLang();
  return (
    <div>
      <ul className={wide ? "grid gap-x-8 border-t border-v-line sm:grid-cols-2" : "border-t border-v-line"}>
        {strategy.questions.map((q) => (
          <li key={t(q, "en")} className="flex items-center justify-between gap-3 border-b border-v-line py-2">
            <span className="leading-[1.35] text-v-fg">{t(q, lang)}</span>
            <AnchorDot />
          </li>
        ))}
      </ul>
      <p className="mt-3 text-v-fg">{t(strategy.questionsClose, lang)}</p>
    </div>
  );
}

function ShiftList({ items, up }: { items: typeof strategy.cheaper; up?: boolean }) {
  const lang = useLang();
  return (
    <ul className="border-t border-v-line">
      {items.map((it) => (
        <li key={t(it.label, "en")} className="flex items-center justify-between gap-3 border-b border-v-line py-1.5">
          <span className="text-v-fg">{t(it.label, lang)}</span>
          <span className={`shrink-0 font-mono text-[13px] tracking-[-0.1em] ${up ? "text-v-accent" : "text-v-fg2"}`} aria-label={`${up ? "up" : "down"} ${it.n}`}>
            {(up ? "↑" : "↓").repeat(it.n)}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** What AI makes cheaper vs. what it makes scarcer. */
export function Shift({ wide = false }: { wide?: boolean }) {
  const lang = useLang();
  return (
    <div className={wide ? "grid gap-6 sm:grid-cols-2" : "space-y-4"}>
      <div>
        <p className="mb-1.5 text-v-fg2">{t(strategy.cheaperLabel, lang)}</p>
        <ShiftList items={strategy.cheaper} />
      </div>
      <div>
        <p className="mb-1.5 text-v-fg2">{t(strategy.pricierLabel, lang)}</p>
        <ShiftList items={strategy.pricier} up />
      </div>
    </div>
  );
}

/** Concept → … → Scale, with launch marked as the halfway point. */
export function LifecycleChain() {
  const lang = useLang();
  const L = strategy.launchIndex;
  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-1 gap-y-1.5">
        {strategy.lifecycle.map((s, i) => (
          <Fragment key={s.en}>
            <span
              className={`rounded-full px-2.5 py-1 text-[12.5px] ${
                i < L ? "bg-v-pill text-v-fg" : i === L ? "bg-v-fg text-v-bg" : "text-white"
              }`}
              style={i > L ? { background: BLUE } : undefined}
            >
              {s.en}
            </span>
            {i < strategy.lifecycle.length - 1 && <span className="text-[11px] text-v-fg2" aria-hidden="true">→</span>}
          </Fragment>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-2 text-[12px] text-v-fg2">
        <span className="h-2 w-2 rounded-full bg-v-fg" aria-hidden="true" />
        {t(strategy.launchNote, lang)}
      </p>
    </div>
  );
}

/** Production-company structure: Anchored → director/producer → creators → crew that changes per game. */
export function OrgDiagram() {
  const lang = useLang();
  return (
    <div className="flex flex-col items-stretch">
      {strategy.org.map((o, i) => (
        <Fragment key={t(o, "en")}>
          <div
            className={`rounded-[6px] px-3 py-2 text-center ${i === 0 ? "text-white" : "bg-v-pill text-v-fg"}`}
            style={i === 0 ? { background: BLUE } : undefined}
          >
            {t(o, lang)}
          </div>
          <div className="mx-auto h-3 w-px bg-v-fg2/60" aria-hidden="true" />
        </Fragment>
      ))}
      <div className="flex flex-wrap justify-center gap-1.5">
        {strategy.orgCrew.map((c) => (
          <span key={t(c, "en")} className="rounded-full border border-dashed border-v-fg2/60 px-2.5 py-1 text-[12px] text-v-fg2">
            {t(c, lang)}
          </span>
        ))}
      </div>
      <p className="mt-3 text-center text-[12px] text-v-fg2">{t(strategy.orgNote, lang)}</p>
    </div>
  );
}

/** Five ways to get a Roblox game made; Anchored is the fifth. */
export function Options() {
  const lang = useLang();
  const last = strategy.options.length - 1;
  return (
    <ol className="space-y-1.5">
      {strategy.options.map((o, i) => {
        const me = i === last;
        return (
          <li key={t(o.who, "en")} className={`flex gap-3 rounded-[6px] px-3 py-2 ${me ? "text-white" : "bg-v-pill"}`} style={me ? { background: BLUE } : undefined}>
            <span className={`tabular-nums ${me ? "text-white/70" : "text-v-fg2"}`}>{i + 1}</span>
            <div className="min-w-0">
              <p className={me ? "text-white" : "text-v-fg"}>{t(o.who, lang)}</p>
              <p className={`leading-[1.4] ${me ? "text-white/90" : "text-v-fg2"}`}>{t(o.says, lang)}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** Record → judge → propose: why every project makes the next one better. */
export function RecordSteps() {
  const lang = useLang();
  const last = strategy.record.length - 1;
  return (
    <ol className="relative space-y-3 pl-6">
      <span className="absolute bottom-3 left-[7px] top-2 w-px bg-v-line" aria-hidden="true" />
      {strategy.record.map((r, i) => (
        <li key={t(r.head, "en")} className="relative">
          <span
            className={`absolute -left-6 top-[2px] h-[15px] w-[15px] rounded-full border-2 ${i === last ? "" : "border-v-fg2 bg-v-card"}`}
            style={i === last ? { background: BLUE, borderColor: BLUE } : undefined}
            aria-hidden="true"
          />
          <p className="text-v-fg">{t(r.head, lang)}</p>
          <p className="leading-[1.4] text-v-fg2">{t(r.text, lang)}</p>
        </li>
      ))}
    </ol>
  );
}
