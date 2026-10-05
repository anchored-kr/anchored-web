"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { useLang } from "@/components/os/LangContext";
import { LANGS, t } from "@/data/i18n";
import { ui4 } from "@/data/v4";
import { useSetLang } from "./Root";

/* ── pill link / button ── */
export function Pill({ href, children, onClick, className = "", external, solid }: { href?: string; children: ReactNode; onClick?: () => void; className?: string; external?: boolean; solid?: boolean }) {
  const tone = solid ? "bg-v-fg text-v-bg hover:opacity-85" : "bg-v-pill text-v-fg hover:bg-v-fg/15";
  const cls = `inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full px-4 text-[14px] transition-[background-color,opacity] ${tone} ${className}`;
  if (href && (external || href.startsWith("mailto:") || href.startsWith("http")))
    return (
      <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

/* ── KO / EN / JA ── */
export function LangSwitch() {
  const lang = useLang();
  const setLang = useSetLang();
  return (
    <div className="flex h-[38px] items-center rounded-full bg-v-pill p-1" role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          className={`h-[30px] rounded-full px-2.5 text-[12px] font-medium tracking-[0.04em] transition-colors ${lang === l.code ? "bg-v-fg text-v-bg" : "text-v-fg2 hover:text-v-fg"}`}
        >
          {l.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

/* ── iOS-style light/dark switch (dark = knob right, like Porto Rocha) ── */
export function ThemeToggle() {
  const lang = useLang();
  const [light, setLight] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setLight(document.documentElement.getAttribute("data-v4theme") === "light"));
    return () => cancelAnimationFrame(frame);
  }, []);
  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.setAttribute("data-v4theme", next ? "light" : "dark");
    try { localStorage.setItem("anchored:theme", next ? "light" : "dark"); } catch {}
  };
  return (
    <button type="button" role="switch" aria-checked={light} aria-label={t(ui4.light, lang)} onClick={toggle} className="relative h-[38px] w-[62px] shrink-0 rounded-full bg-v-track transition-colors">
      <span
        className={`absolute left-0 top-[3px] h-[32px] w-[32px] rounded-full bg-v-knob shadow-[0_1px_3px_rgba(0,0,0,0.25)] transition-transform duration-200 ${light ? "translate-x-[3px]" : "translate-x-[27px]"}`}
      />
    </button>
  );
}

/* ── live Seoul clock (client-only; server renders blank lines of equal height) ── */
const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
};
const getSnapshot = () => Math.floor(Date.now() / 1000);
const getServerSnapshot = () => 0;
const LOCALE = { ko: "ko-KR", en: "en-US", ja: "ja-JP" } as const;

export function Clock({ className = "" }: { className?: string }) {
  const lang = useLang();
  const sec = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (!sec)
    return (
      <p className={className} aria-hidden="true">
        {" "}
        <br />
        {" "}
      </p>
    );
  const d = new Date(sec * 1000);
  const date = new Intl.DateTimeFormat(LOCALE[lang], { weekday: "long", month: "long", day: "numeric", timeZone: "Asia/Seoul" }).format(d);
  const time = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23", timeZone: "Asia/Seoul" }).format(d);
  return (
    <p className={className}>
      <time dateTime={d.toISOString()}>
        {date}
        <br />
        {t(ui4.city, lang)}, <span className="tabular-nums">{time}</span>
      </time>
    </p>
  );
}
