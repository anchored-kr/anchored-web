"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { useLang } from "@/components/os/LangContext";
import { t, type Lang } from "@/data/i18n";
import { feed, heroSlides, productionBySlug, ui4, type FeedItem, type FeedMedia } from "@/data/v4";
import { AppIcon, BrandPoster, Poster } from "./icons";
import { Checklist, LifecycleChain, Options, OrgDiagram, RecordSteps, Shift, SloganPoster } from "./widgets";

/* ── hero: crossfading guild captures in one big media card ── */
export function HeroReel({ slides = heroSlides, className = "aspect-[16/9]" }: { slides?: { src: string; caption: string }[]; className?: string }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [slides.length]);
  return (
    <div className={`relative overflow-hidden rounded-[10px] bg-v-card ${className}`}>
      {slides.map((s, i) => (
        <figure key={s.src} className={`absolute inset-0 transition-opacity duration-1000 ${i === idx ? "opacity-100" : "opacity-0"}`} aria-hidden={i !== idx}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.src} alt={s.caption} className="h-full w-full object-cover" />
          <figcaption className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1.5 text-[12px] text-white backdrop-blur-md">{s.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

/* ── feed media ── */
function Media({ m, lang }: { m: FeedMedia; lang: Lang }) {
  switch (m.kind) {
    case "image":
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={m.src} alt={m.caption} loading="lazy" className="aspect-[16/10] w-full rounded-[4px] object-cover" />;
    case "brand":
      return <BrandPoster />;
    case "poster": {
      const p = productionBySlug(m.slug);
      return p ? <Poster p={p} /> : null;
    }
    case "icons":
      return (
        <div className="grid grid-cols-3 gap-2">
          {m.slugs.map((s) => {
            const p = productionBySlug(s);
            return p ? (
              <div key={s}>
                <AppIcon p={p} className="aspect-square w-full" radius={14} />
                <p className="mt-1.5 truncate text-[12px] text-v-fg2">{p.name}</p>
              </div>
            ) : null;
          })}
        </div>
      );
    case "words":
      return <SloganPoster />;
    case "checklist":
      return <Checklist />;
    case "shift":
      return <Shift />;
    case "lifecycle":
      return <LifecycleChain />;
    case "org":
      return <OrgDiagram />;
    case "options":
      return <Options />;
    case "record":
      return <RecordSteps />;
    case "cta":
      return (
        <span className="inline-flex h-10 items-center gap-2 rounded-full bg-v-fg px-4 text-[14px] text-v-bg">
          {t(ui4.start, lang)}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4" /></svg>
        </span>
      );
  }
}

function CardLink({ href, children, className }: { href: string; children: ReactNode; className: string }) {
  if (href.startsWith("mailto:") || href.startsWith("http")) return <a href={href} className={className}>{children}</a>;
  return <Link href={href} className={className}>{children}</Link>;
}

export function FeedCard({ item }: { item: FeedItem }) {
  const lang = useLang();
  return (
    <CardLink href={item.href} className="v4-fade block rounded-[8px] bg-v-card p-4 transition-colors hover:bg-[color-mix(in_oklab,var(--v4-card),var(--v4-fg)_5%)]">
      <p className="text-v-fg2">{t(item.label, lang)}</p>
      <h3 className="v4-title mt-2 text-v-fg">{t(item.title, lang).replace(/\n/g, " ")}</h3>
      {item.body && <p className="mt-3 leading-[1.5] text-v-fg2">{t(item.body, lang)}</p>}
      {item.media && (
        <div className="mt-5">
          <Media m={item.media} lang={lang} />
        </div>
      )}
    </CardLink>
  );
}

/** Round-robin masonry: item 1 → col 1, item 2 → col 2 … (reading order kept across columns).
 *  Renders one block per breakpoint (display:none on the others) so SSR and client agree. */
export function Masonry<T>({ items, render, keyOf, weight, cols = { base: 1, sm: 2, xl: 3 } }: { items: T[]; render: (item: T) => ReactNode; keyOf: (item: T, i: number) => string; weight?: (item: T) => number; cols?: { base: number; sm: number; lg?: number; xl: number } }) {
  // With a weight (estimated height), place each item in the currently shortest column — deterministic, so SSR and client agree.
  const split = (n: number) => {
    const out: { it: T; i: number }[][] = Array.from({ length: n }, () => []);
    if (!weight) {
      items.forEach((it, i) => out[i % n].push({ it, i }));
      return out;
    }
    const h = Array(n).fill(0);
    items.forEach((it, i) => {
      const c = h.indexOf(Math.min(...h));
      out[c].push({ it, i });
      h[c] += weight(it) + 8;
    });
    return out;
  };
  const block = (n: number, cls: string) => (
    <div key={cls} className={`${cls} gap-2`}>
      {split(n).map((col, c) => (
        <div key={c} className="flex min-w-0 flex-1 flex-col gap-2">
          {col.map(({ it, i }) => (
            <div key={keyOf(it, i)}>{render(it)}</div>
          ))}
        </div>
      ))}
    </div>
  );
  return cols.lg
    ? [block(cols.base, "flex sm:hidden"), block(cols.sm, "hidden sm:flex lg:hidden"), block(cols.lg, "hidden lg:flex xl:hidden"), block(cols.xl, "hidden xl:flex")]
    : [block(cols.base, "flex sm:hidden"), block(cols.sm, "hidden sm:flex xl:hidden"), block(cols.xl, "hidden xl:flex")];
}

const MEDIA_H: Record<FeedMedia["kind"], number> = {
  image: 190, brand: 230, poster: 230, words: 230, icons: 130, checklist: 330,
  shift: 460, lifecycle: 130, org: 250, options: 300, record: 190, cta: 60,
};
/** Rough card height at ~300px width (Korean copy is the longest), used only to balance columns. */
const feedWeight = (f: FeedItem) => 96 + t(f.body ?? "", "ko").length * 1.1 + (f.media ? MEDIA_H[f.media.kind] + 20 : 0);

export function HomeView() {
  return (
    <>
      <HeroReel />
      <section id="updates" className="mt-2" aria-label="Studio updates">
        <Masonry items={feed} weight={feedWeight} keyOf={(f, i) => `${i}-${typeof f.title === "string" ? f.title : f.title.en}`} render={(f) => <FeedCard item={f} />} />
      </section>
    </>
  );
}
