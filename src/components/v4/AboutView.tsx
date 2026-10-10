"use client";

import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { useLang } from "@/components/os/LangContext";
import { t } from "@/data/i18n";
import { about4, aboutPhotos, captures, statusText, type Photo } from "@/data/v4";
import { HeroReel } from "./HomeView";
import { Pill } from "./controls";

/* ── building blocks ── */

function Card({ label, children, className = "", id }: { label: string; children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`scroll-mt-4 rounded-[8px] bg-v-card p-4 pb-5 md:p-6 ${className}`}>
      <h2 className="text-v-fg2">{label}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

/** Numbered section header inside a card: "02 · What we make" + headline. */
function Head({ n, label, title }: { n: number; label: string; title: string }) {
  return (
    <>
      <p className="text-v-fg2">
        <span className="tabular-nums">{String(n).padStart(2, "0")}</span> · {label}
      </p>
      <h2 className="v4-title mt-2 max-w-[760px] text-v-fg">{title}</h2>
    </>
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

function Tag({ children }: { children: ReactNode }) {
  return <span className="inline-flex h-7 items-center rounded-full bg-v-pill px-2.5 text-[12.5px] text-v-fg">{children}</span>;
}

function PhotoTile({ p, className = "aspect-[16/10]" }: { p: Photo; className?: string }) {
  return (
    <figure className="relative overflow-hidden rounded-[6px] bg-v-bg">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.src} alt={p.caption} loading="lazy" className={`${className} w-full object-cover`} />
      <figcaption className="absolute bottom-2.5 left-2.5 rounded-full bg-black/55 px-2.5 py-1 text-[11.5px] text-white backdrop-blur-md">{p.caption}</figcaption>
    </figure>
  );
}

function StatusChip({ status }: { status: "live" | "upcoming" }) {
  const lang = useLang();
  return (
    <span className="inline-flex items-center gap-1.5 text-[12.5px] text-v-fg2">
      <span className={`h-1.5 w-1.5 rounded-full ${status === "live" ? "bg-[#30d158]" : "border border-v-fg2"}`} aria-hidden="true" />
      {t(statusText[status], lang)}
    </span>
  );
}

/* ── page ── */

export function AboutView() {
  const lang = useLang();
  const heroSlides = aboutPhotos.hero.length ? aboutPhotos.hero : [captures.hall, captures.hall2];
  const communityPhotos = aboutPhotos.community.length ? aboutPhotos.community : [captures.hall2, captures.evergreen, captures.teamwork];

  return (
    <div className="space-y-2">
      {/* 01 · Identity */}
      <HeroReel slides={heroSlides} />
      <div className="grid grid-cols-1 gap-2 xl:grid-cols-3">
        <Card label={`01 · ${about4.identityLabel}`} className="xl:col-span-2">
          <h1 className="max-w-[720px] text-[clamp(28px,2.7vw,38px)] leading-[1.15] tracking-[-0.01em] text-v-fg">{t(about4.headline, lang)}</h1>
          <div className="mt-6 max-w-[680px] space-y-4">
            {about4.identity.map((p, i) => (
              <p key={i} className={i === 0 ? "text-[17px] leading-[1.5] text-v-fg" : "text-[17px] leading-[1.5] text-v-fg2"}>
                {t(p, lang)}
              </p>
            ))}
          </div>
        </Card>
        <Card label={t(about4.figuresLabel, lang)}>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-7 pt-2">
            {about4.figures.map((f) => (
              <div key={f.name}>
                <dd className={`${t(f.value, lang).length > 7 ? "text-[22px]" : "text-[30px]"} whitespace-nowrap leading-[1] tracking-[-0.02em] text-v-fg`}>{t(f.value, lang)}</dd>
                <dt className="mt-2 text-v-fg">{f.name}</dt>
                <dd className="text-[12.5px] leading-[1.4] text-v-fg2">{t(f.sub, lang)}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>

      {/* 02 · What we make */}
      <section className="rounded-[8px] bg-v-card p-4 pb-5 md:p-6">
        <Head n={2} label={t(about4.makeLabel, lang)} title={t(about4.makeTitle, lang)} />
        <div className="mt-6 grid gap-6 md:grid-cols-3 md:gap-5">
          {about4.services.map((s, i) => (
            <div key={s.title} className="border-t border-v-line pt-4">
              <p className="tabular-nums text-v-fg2">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-[22px] leading-[1.15] tracking-[-0.01em] text-v-fg">{s.title}</h3>
              <p className="mt-2 text-v-fg">{t(s.line, lang)}</p>
              <p className="mt-2 leading-[1.5] text-v-fg2">{t(s.desc, lang)}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {s.tags.map((tg) => (
                  <Tag key={t(tg, "en")}>{t(tg, lang)}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03 · Our community */}
      <section id="community" className="scroll-mt-4 rounded-[8px] bg-v-card p-4 pb-5 md:p-6">
        <Head n={3} label={t(about4.communityLabel, lang)} title={t(about4.communityTitle, lang)} />
        <p className="mt-2 max-w-[760px] leading-[1.5] text-v-fg2">{t(about4.communityLead, lang)}</p>
        <div className="mt-6 grid gap-2 sm:grid-cols-3">
          {communityPhotos.slice(0, 3).map((ph) => (
            <PhotoTile key={ph.src} p={ph} />
          ))}
        </div>
        <ul className="mt-6 grid gap-x-5 gap-y-6 sm:grid-cols-2 xl:grid-cols-4">
          {about4.community.map((c) => (
            <li key={c.name} className="border-t border-v-line pt-3">
              <Link href={c.href} className="group block">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-v-fg group-hover:underline">{c.name}</h3>
                  <StatusChip status={c.status} />
                </div>
                <p className="mt-0.5 text-v-fg2">{t(c.meta, lang)}</p>
                <p className="mt-2 leading-[1.5] text-v-fg2">{t(c.desc, lang)}</p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-v-line pt-4">
          <p className="text-v-fg">{t(about4.communityProjects, lang)}</p>
          <Link href="/all" className="v4-ul shrink-0 text-v-fg">
            {t(about4.projectsLink, lang)} →
          </Link>
        </div>
        <div className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <span className="text-v-fg2">{t(about4.creatorsLabel, lang)}</span>
          {about4.creators.map((c) => (
            <ExtLink key={c.href + t(c.label, "en")} href={c.href}>
              {t(c.label, lang)}
            </ExtLink>
          ))}
        </div>
      </section>

      {/* 04 · How we work */}
      <section id="how" className="scroll-mt-4 rounded-[8px] bg-v-card p-4 pb-5 md:p-6">
        <Head n={4} label={t(about4.howLabel, lang)} title={t(about4.howTitle, lang)} />
        <p className="mt-3 text-v-fg2">
          {about4.way} — {t(about4.wayLine, lang)}
        </p>
        <ol className="mt-6 grid gap-x-5 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
          {about4.steps.map((s, i) => (
            <li key={s.en} className="border-t border-v-line pt-3">
              <p className="text-v-fg2">
                <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              </p>
              <h3 className="mt-1 text-[20px] leading-[1.15] text-v-fg">{s.en}</h3>
              <p className="mt-2 text-v-fg">{t(s.head, lang)}</p>
              <p className="mt-1.5 leading-[1.5] text-v-fg2">{t(s.desc, lang)}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6 rounded-[6px] bg-v-pill p-4">
          <p className="text-v-fg">{t(about4.giLabel, lang)}</p>
          <dl className="mt-3 grid gap-x-5 gap-y-2 sm:grid-cols-2 lg:grid-cols-5">
            {about4.giAxes.map((a) => (
              <div key={a.k}>
                <dt className="font-mono text-[12px] tracking-[0.08em] text-v-fg">{a.k}</dt>
                <dd className="leading-[1.4] text-v-fg2">{t(a.v, lang)}</dd>
              </div>
            ))}
          </dl>
        </div>
        {aboutPhotos.work.length > 0 && (
          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {aboutPhotos.work.slice(0, 2).map((ph) => (
              <PhotoTile key={ph.src} p={ph} />
            ))}
          </div>
        )}
        <p className="mt-6 text-[17px] leading-[1.45] text-v-fg">{t(about4.closing, lang)}</p>
      </section>

      {/* 05 · Start a project — contact lives here, at the end of the story */}
      <section id="contact" className="scroll-mt-4 rounded-[8px] bg-v-card p-4 pb-5 md:p-6">
        <Head n={5} label={t(about4.startLabel, lang)} title={t(about4.startTitle, lang)} />
        <div className="mt-5 flex flex-wrap items-center gap-x-1.5 gap-y-2">
          {about4.flow.map((f, i) => (
            <Fragment key={t(f, "en")}>
              <span className={`rounded-full px-3 py-1.5 text-[13px] ${i === 2 ? "bg-v-fg text-v-bg" : "bg-v-pill text-v-fg"}`}>{t(f, lang)}</span>
              {i < about4.flow.length - 1 && <span className="text-v-fg2" aria-hidden="true">→</span>}
            </Fragment>
          ))}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div>
            <p className="text-v-fg2">{t(about4.deliverablesLabel, lang)}</p>
            <ol className="mt-2 border-t border-v-line">
              {about4.deliverables.map((d, i) => (
                <li key={t(d, "en")} className="flex gap-4 border-b border-v-line py-2">
                  <span className="tabular-nums text-v-fg2">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-v-fg">{t(d, lang)}</span>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-v-fg2">{t(about4.startNote, lang)}</p>
          </div>
          <div>
            <p className="text-v-fg2">{t(about4.contactLabel, lang)}</p>
            <dl className="mt-2 space-y-4">
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
            <div className="mt-6">
              <Pill href="mailto:contact@anchored.kr?subject=Production%20Sprint" solid>
                contact@anchored.kr
              </Pill>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
