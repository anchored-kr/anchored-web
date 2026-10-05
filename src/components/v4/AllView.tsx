"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLang } from "@/components/os/LangContext";
import { t, LANGS } from "@/data/i18n";
import { productions, ui4, type Production } from "@/data/v4";
import { Masonry } from "./HomeView";
import { Poster } from "./icons";

const ASPECTS = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[1/1]", "aspect-[4/3]"];

function Tile({ p, i }: { p: Production; i: number }) {
  const lang = useLang();
  const cover = p.media?.[0];
  const aspect = ASPECTS[(i * 3 + p.name.length) % ASPECTS.length];
  return (
    <Link href={`/projects/${p.slug}`} className="group block">
      <div className="overflow-hidden rounded-[6px]">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover.src} alt={cover.caption} loading="lazy" className={`${aspect} w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]`} />
        ) : (
          <div className="transition-transform duration-700 group-hover:scale-[1.03]">
            <Poster p={p} className={aspect} radius={0} />
          </div>
        )}
      </div>
      <p className="mt-2 text-v-fg">{p.name}</p>
      <p className="text-v-fg2">{t(p.app.tagline ?? "", lang)}</p>
    </Link>
  );
}

/** "Show all projects" — full-screen index with a search field, like Porto Rocha's /all. */
export function AllView() {
  const lang = useLang();
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return productions;
    return productions.filter((p) => {
      const hay = [p.name, ...LANGS.map((l) => t(p.app.tagline ?? "", l.code)), ...(p.app.meta ?? []).map((m) => m.value)].join(" ").toLowerCase();
      return hay.includes(s);
    });
  }, [q]);

  return (
    <div className="p-2">
      <div className="sticky top-2 z-10 flex items-center justify-between gap-2">
        <label className="flex h-10 w-full max-w-[350px] items-center gap-2 rounded-[8px] bg-v-card px-3">
          <span className="sr-only">{t(ui4.search, lang)}</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t(ui4.search, lang)}
            className="min-w-0 flex-1 bg-transparent text-[14px] text-v-fg outline-none placeholder:text-v-fg2"
            autoFocus
          />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-v-fg2"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
        </label>
        <Link href="/" aria-label={t(ui4.close, lang)} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-v-card text-v-fg transition-colors hover:bg-v-fg/15">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M2 2l10 10M12 2 2 12" /></svg>
        </Link>
      </div>
      <div className="mt-2">
        {list.length === 0 ? (
          <p className="py-20 text-center text-v-fg2">{t(ui4.noResult, lang)}</p>
        ) : (
          <Masonry items={list} cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} keyOf={(p) => p.slug} render={(p) => <Tile p={p} i={productions.indexOf(p)} />} />
        )}
      </div>
    </div>
  );
}
