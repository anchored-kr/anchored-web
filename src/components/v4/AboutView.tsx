"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { useLang } from "@/components/os/LangContext";
import { t } from "@/data/i18n";
import { about4, captures, productionBySlug, statusText } from "@/data/v4";
import { HeroReel } from "./HomeView";
import { AppIcon } from "./icons";
import { Pill } from "./controls";

function Card({ label, children, className = "", id }: { label: string; children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`rounded-[8px] bg-v-card p-4 pb-5 ${className}`}>
      <h2 className="text-v-fg2">{label}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

const ExtLink = ({ href, children }: { href: string; children: ReactNode }) =>
  href.startsWith("/") ? (
    <Link href={href} className="v4-ul text-v-fg">{children}</Link>
  ) : (
    <a href={href} className="v4-ul text-v-fg" {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );

const Pin = () => (
  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true" className="shrink-0">
    <path d="M6 13s4.5-4.2 4.5-7.5a4.5 4.5 0 1 0-9 0C1.5 8.8 6 13 6 13z" />
    <circle cx="6" cy="5.5" r="1.6" />
  </svg>
);

export function AboutView() {
  const lang = useLang();
  const [tab, setTab] = useState(-1);
  const caps = tab < 0 ? about4.capabilities.flatMap((c) => c.items) : about4.capabilities[tab].items;

  return (
    <div className="space-y-2">
      <HeroReel slides={[captures.hall, captures.hall2]} />

      <div className="grid grid-cols-1 gap-2 xl:grid-cols-3">
        {/* Our studio */}
        <Card label={t(about4.studioLabel, lang)} className="xl:col-span-2">
          <div className="max-w-[640px] space-y-5">
            {about4.studio.map((p, i) => (
              <p key={i} className="v4-title text-v-fg">{t(p, lang)}</p>
            ))}
          </div>
        </Card>

        {/* Contact */}
        <Card label={t(about4.contactLabel, lang)}>
          <dl className="space-y-4 pt-4">
            {about4.contact.map((c) => (
              <div key={t(c.label, "en")}>
                <dt className="text-v-fg2">{t(c.label, lang)}</dt>
                <dd>
                  {"links" in c && c.links ? (
                    <span className="flex gap-1">
                      {c.links.map((l, i) => (
                        <span key={l.href}>
                          {i > 0 && <span className="text-v-fg2"> / </span>}
                          <ExtLink href={l.href}>{l.label}</ExtLink>
                        </span>
                      ))}
                    </span>
                  ) : "href" in c && c.href ? (
                    <ExtLink href={c.href}>{t(c.value, lang)}</ExtLink>
                  ) : (
                    <span className="text-v-fg">{t(c.value, lang)}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Card>

        {/* Capabilities with category tabs (Porto Rocha "Clients" card) */}
        <Card label={t(about4.capLabel, lang)} className="xl:col-span-2">
          <div className="flex flex-wrap gap-x-4 gap-y-1" role="tablist">
            {[t(about4.capAll, lang), ...about4.capabilities.map((c) => t(c.tab, lang))].map((label, i) => (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={tab === i - 1}
                onClick={() => setTab(i - 1)}
                className={`transition-colors ${tab === i - 1 ? "text-v-fg" : "text-v-fg2 hover:text-v-fg"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <ul className="mt-6 columns-1 gap-6 sm:columns-2 lg:columns-3">
            {caps.map((c) => (
              <li key={t(c, "en")} className="break-inside-avoid text-v-fg">{t(c, lang)}</li>
            ))}
          </ul>
        </Card>

        {/* For creators (Porto Rocha "Current openings") */}
        <Card label={t(about4.creatorsLabel, lang)}>
          <ul className="space-y-3 pt-4">
            {about4.creators.map((c) => (
              <li key={c.href + t(c.label, "en")}>
                <ExtLink href={c.href}>{t(c.label, lang)}</ExtLink>
              </li>
            ))}
          </ul>
        </Card>

        {/* How we produce */}
        <Card id="how" label={t(about4.howLabel, lang)} className="xl:col-span-2">
          <ol className="border-t border-v-line">
            {about4.steps.map((s, i) => (
              <li key={s.en} className="grid gap-1 border-b border-v-line py-3 sm:grid-cols-[180px_1fr] sm:gap-6">
                <p className="text-v-fg">
                  <span className="mr-3 tabular-nums text-v-fg2">0{i + 1}</span>
                  {s.en} <span className="text-v-fg2">— {t(s.title, lang)}</span>
                </p>
                <p className="leading-[1.5] text-v-fg2">{t(s.desc, lang)}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-v-fg">{t(about4.continuity, lang)}</p>
        </Card>

        {/* Events */}
        <Card label={t(about4.eventsLabel, lang)}>
          <ul>
            {about4.events.map((e) => (
              <li key={e.title} className="border-t border-v-line py-3 first:mt-3">
                <Link href={e.href} className="group block">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-v-fg group-hover:underline">{e.title}</span>
                    <span className="shrink-0 text-v-fg2">{t(e.when, lang)}</span>
                  </div>
                  <p className="text-v-fg2">{t(e.who, lang)}</p>
                  <p className="mt-2 flex items-center gap-1.5 text-v-fg2">
                    <Pin />
                    {t(e.where, lang)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        {/* Fleet */}
        <Card label={t(about4.fleetLabel, lang)} className="xl:col-span-2">
          <p className="max-w-[560px] text-v-fg2">{t(about4.fleetNote, lang)}</p>
          <ul className="mt-4 border-t border-v-line">
            {about4.teams.map((team) => {
              const p = productionBySlug(team.slug ?? "");
              return (
                <li key={team.name} className="border-b border-v-line">
                  <Link href={`/projects/${team.slug}`} className="flex items-center gap-3 py-3">
                    {p && <AppIcon p={p} className="h-10 w-10" radius={8} />}
                    <span className="min-w-0 flex-1">
                      <span className="block text-v-fg">{team.name}</span>
                      <span className="block truncate text-v-fg2">{t(team.genre, lang)} · {team.strengths.map((s) => t(s, lang)).join(" · ")}</span>
                    </span>
                    <span className="hidden shrink-0 text-v-fg2 sm:block">{t(about4.creatorsCount, lang).replace("{n}", String(team.creators))}</span>
                    <span className="flex shrink-0 items-center gap-1.5 text-v-fg">
                      {team.status === "LIVE" && <span className="h-1.5 w-1.5 rounded-full bg-[#30d158]" />}
                      {t(statusText[team.status === "LIVE" ? "live" : "in-progress"], lang)}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Card>

        {/* Figures */}
        <Card label={t(about4.figuresLabel, lang)}>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-6 pt-3">
            {about4.figures.map((f) => (
              <div key={t(f.label, "en")}>
                <dt className="sr-only">{t(f.label, lang)}</dt>
                <dd className="text-[30px] leading-[1] tracking-[-0.02em] text-v-fg">{t(f.value, lang)}</dd>
                <dd className="mt-2 text-v-fg2">{t(f.label, lang)}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>

      {/* "office photos" → guild captures */}
      <div className="grid gap-2 sm:grid-cols-2">
        {[captures.evergreen, captures.teamwork].map((c) => (
          <figure key={c.src} className="relative overflow-hidden rounded-[8px] bg-v-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.src} alt={c.caption} loading="lazy" className="aspect-[16/10] w-full object-cover" />
            <figcaption className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1.5 text-[12px] text-white backdrop-blur-md">{c.caption}</figcaption>
          </figure>
        ))}
      </div>

      {/* Start a production */}
      <section className="rounded-[8px] bg-v-card p-4 pb-5">
        <h2 className="text-v-fg2">{about4.startLabel}</h2>
        <div className="mt-3 grid gap-6 lg:grid-cols-2">
          <div>
            <p className="v4-title text-v-fg">{t(about4.startTitle, lang).replace(/\n/g, " ")}</p>
            <div className="mt-6">
              <Pill href="mailto:contact@anchored.kr?subject=Production%20Sprint" solid>
                contact@anchored.kr
              </Pill>
            </div>
          </div>
          <div>
            <ol className="border-t border-v-line">
              {about4.startSteps.map((s, i) => (
                <li key={i} className="flex gap-4 border-b border-v-line py-2">
                  <span className="tabular-nums text-v-fg2">0{i + 1}</span>
                  <span className="text-v-fg">{t(s, lang)}</span>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-v-fg2">{t(about4.startNote, lang)}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
