"use client";

import Link from "next/link";
import { useLang } from "@/components/os/LangContext";
import { t } from "@/data/i18n";
import { productions, productionBySlug, statusText, ui4 } from "@/data/v4";
import { HeroReel } from "./HomeView";
import { AppIcon, Poster } from "./icons";
import { Pill } from "./controls";

export function ProjectView({ slug }: { slug: string }) {
  const lang = useLang();
  const p = productionBySlug(slug);
  if (!p) return null;
  const a = p.app;
  const idx = productions.findIndex((x) => x.slug === slug);
  const next = productions[(idx + 1) % productions.length];
  const status = a.status ?? "in-progress";

  return (
    <article className="space-y-2">
      {/* hero */}
      {p.media && p.media.length > 0 ? (
        <HeroReel slides={p.media.slice(0, 2)} />
      ) : (
        <Poster p={p} className="aspect-[16/9]" nameSize="clamp(44px, 7vw, 112px)" radius={10} />
      )}

      {/* overview / role — Porto Rocha "The Challenge / The Solution" */}
      <div className="grid gap-2 md:grid-cols-2">
        <section className="rounded-[8px] bg-v-card p-4 pb-6 md:p-6">
          <h2 className="text-v-fg2">{t(ui4.overview, lang)}</h2>
          <h1 className="sr-only">{p.name}</h1>
          <p className="v4-title mt-3 text-v-fg">{t(a.summary ?? "", lang)}</p>
        </section>
        <section className="rounded-[8px] bg-v-card p-4 pb-6 md:p-6">
          <h2 className="text-v-fg2">{t(ui4.role, lang)}</h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {(a.role ?? []).map((r) => (
              <span key={t(r, "en")} className="inline-flex h-8 items-center rounded-full bg-v-pill px-3 text-[13px] text-v-fg">{t(r, lang)}</span>
            ))}
          </div>
          <ul className="mt-5 space-y-2.5">
            {(a.bullets ?? []).map((b) => (
              <li key={t(b, "en")} className="flex gap-3 leading-[1.5] text-v-fg">
                <span className="text-v-fg2">—</span>
                {t(b, lang)}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* media pair: icon tile + tagline / extra captures */}
      <div className="grid gap-2 sm:grid-cols-2">
        {p.media && p.media.length > 2 ? (
          p.media.slice(2, 4).map((m) => (
            <figure key={m.src} className="relative overflow-hidden rounded-[8px] bg-v-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.src} alt={m.caption} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1.5 text-[12px] text-white backdrop-blur-md">{m.caption}</figcaption>
            </figure>
          ))
        ) : (
          <>
            <div className="grid aspect-[4/3] place-items-center rounded-[8px] bg-v-card">
              <AppIcon p={p} className="h-[46%] w-auto aspect-square" radius={28} />
            </div>
            <div className="flex aspect-[4/3] flex-col justify-between rounded-[8px] bg-v-card p-5 md:p-7">
              <span className="text-v-fg2">{p.name}</span>
              <p className="text-[clamp(24px,2.6vw,38px)] leading-[1.15] tracking-[-0.01em] text-v-fg">{t(a.tagline ?? "", lang)}</p>
            </div>
          </>
        )}
      </div>

      {/* details */}
      <section className="rounded-[8px] bg-v-card p-4 pb-5 md:p-6">
        <h2 className="text-v-fg2">{t(ui4.details, lang)}</h2>
        <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-4">
          <div>
            <dt className="text-v-fg2">Status</dt>
            <dd className="flex items-center gap-1.5 text-v-fg">
              {status === "live" && <span className="h-1.5 w-1.5 rounded-full bg-[#30d158]" />}
              {t(statusText[status], lang)}
            </dd>
          </div>
          {(a.meta ?? []).filter((m) => m.label !== "Status").map((m) => (
            <div key={m.label}>
              <dt className="text-v-fg2">{m.label}</dt>
              <dd className="text-v-fg">{m.value}</dd>
            </div>
          ))}
        </dl>
        {(a.links?.length ?? 0) > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {a.links!.map((l) => (
              <Pill key={l.href} href={l.href} external>
                {t(l.label, lang)} ↗
              </Pill>
            ))}
          </div>
        )}
      </section>

      {/* giant name panel */}
      <div className="@container overflow-hidden rounded-[8px] px-[3%] pb-[2.5%] pt-[18%]" style={{ background: `color-mix(in oklab, ${p.bg} 30%, #c9cfd4)`, color: "#25292d" }} aria-hidden="true">
        <p className="whitespace-nowrap font-semibold leading-[0.8] tracking-[-0.045em]" style={{ fontSize: `min(190px, calc(94cqw / ${Math.max(p.name.length, 4) * 0.6}))` }}>
          {p.name}
        </p>
      </div>

      {/* next */}
      <Link href={`/projects/${next.slug}`} className="flex items-center gap-3 rounded-[10px] bg-v-card p-4 transition-colors hover:bg-[color-mix(in_oklab,var(--v4-card),var(--v4-fg)_6%)]">
        <AppIcon p={next} />
        <span className="min-w-0 flex-1">
          <span className="block text-v-fg2">{t(ui4.next, lang)}</span>
          <span className="block text-v-fg">{next.name}</span>
          <span className="block truncate text-v-fg2">{t(next.app.tagline ?? "", lang)}</span>
        </span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-v-fg2"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
      </Link>
    </article>
  );
}
