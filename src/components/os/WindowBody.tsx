"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { DesktopApp } from "@/data/desktopItems";
import { statusLabel, statusColor, services, socials } from "@/data/desktopItems";
import { AnchorLogo } from "@/components/anchor-logo";
import { useLang } from "./LangContext";
import { t, ui, type Lang } from "@/data/i18n";

/** Renders the inner content of a window based on the app kind, in the active language. */
export function WindowBody({ app, onOpen }: { app: DesktopApp; onOpen: (id: string) => void }) {
  if (app.kind === "about") return <AboutBody onOpen={onOpen} />;
  if (app.kind === "services") return <ServicesBody onOpen={onOpen} />;
  if (app.kind === "contact") return <ContactBody />;
  return <ProjectBody app={app} />;
}

/* ───────────────────────────── About ───────────────────────────── */

function AboutBody({ onOpen }: { onOpen: (id: string) => void }) {
  const lang = useLang();
  const stats = [
    { k: "4+", v: ui.statProjects },
    { k: "200M+", v: ui.statUsers },
    { k: t(ui.statTeamValue, lang), v: ui.statTeam },
  ];
  return (
    <div className="p-5 sm:p-7">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] border-[2.5px] border-os-ink bg-anchor-blue text-white" style={{ boxShadow: "3px 3px 0 0 rgba(8,22,43,0.85)" }}>
          <AnchorLogo className="h-6 w-6" />
        </span>
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-anchor-blue-dark">Anchored Agency</p>
          <h2 className="text-[19px] font-extrabold leading-tight text-os-ink">{t(ui.aboutTitle, lang)}</h2>
        </div>
      </div>

      <p className="mt-5 text-[14px] font-bold leading-snug text-os-ink">{t(ui.aboutLead, lang)}</p>
      <div className="mt-3 space-y-3 text-[13.5px] leading-relaxed text-os-ink/85">
        <p>{t(ui.aboutP1, lang)}</p>
        <p>{t(ui.aboutP2, lang)}</p>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2.5">
        {stats.map((s) => (
          <div key={s.k} className="rounded-lg border-[2px] border-os-ink bg-white px-2 py-3 text-center">
            <div className="font-mono text-[17px] font-extrabold text-anchor-blue-dark">{s.k}</div>
            <div className="mt-0.5 text-[10.5px] font-semibold text-os-ink/75">{t(s.v, lang)}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <PixelButton primary onClick={() => onOpen("services")}>{t(ui.ctaServices, lang)}</PixelButton>
        <PixelButton onClick={() => onOpen("folder-games")}>{t(ui.ctaPortfolio, lang)}</PixelButton>
        <PixelButton onClick={() => onOpen("contact")}>{t(ui.ctaContact, lang)}</PixelButton>
      </div>

      <p className="mt-5 border-t-2 border-dashed border-os-ink/25 pt-3 font-mono text-[10.5px] text-os-ink/70">{t(ui.aboutHint, lang)}</p>
    </div>
  );
}

/* ──────────────────────────── Services ──────────────────────────── */

function ServicesBody({ onOpen }: { onOpen: (id: string) => void }) {
  const lang = useLang();
  return (
    <div className="p-5 sm:p-7">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-anchor-blue-dark">{t(ui.svcKicker, lang)}</p>
      <h2 className="mt-1 text-[19px] font-extrabold leading-tight text-os-ink">{t(ui.svcTitle, lang)}</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {services.map((s) => (
          <div key={s.en} className="rounded-lg border-[2.5px] border-os-ink bg-white p-3.5" style={{ boxShadow: "3px 3px 0 0 rgba(8,22,43,0.12)" }}>
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="text-[20px]">{s.icon}</span>
              <div>
                <div className="text-[14px] font-extrabold leading-tight text-os-ink">{t(s.title, lang)}</div>
                <div className="font-mono text-[9.5px] uppercase tracking-wider text-anchor-blue-dark">{s.en}</div>
              </div>
            </div>
            <p className="mt-2 text-[12.5px] leading-relaxed text-os-ink/80">{t(s.desc, lang)}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <PixelButton primary onClick={() => onOpen("contact")}>{t(ui.ctaProjectInquiry, lang)}</PixelButton>
        <PixelButton onClick={() => onOpen("about")}>{t(ui.ctaAbout, lang)}</PixelButton>
      </div>
    </div>
  );
}

/* ──────────────────────────── Contact ──────────────────────────── */

function ContactBody() {
  const lang = useLang();
  return (
    <div className="p-5 sm:p-7">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-anchor-blue-dark">{t(ui.contactKicker, lang)}</p>
      <h2 className="mt-1 text-[19px] font-extrabold leading-tight text-os-ink">{t(ui.contactTitle, lang)}</h2>
      <p className="mt-2 text-[13.5px] leading-relaxed text-os-ink/80">{t(ui.contactDesc, lang)}</p>
      <div className="mt-4 divide-y-2 divide-dashed divide-os-ink/20 overflow-hidden rounded-lg border-[2.5px] border-os-ink bg-white">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-3 transition-colors hover:bg-os-cream focus-visible:bg-os-cream focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-anchor-blue"
          >
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-os-ink/70">{s.label}</span>
            <span className="text-[13.5px] font-bold text-anchor-blue-dark">{s.value} ↗</span>
          </a>
        ))}
      </div>
      <PixelButton primary full href="mailto:contact@anchored.kr" className="mt-4">
        ✉️  contact@anchored.kr
      </PixelButton>
    </div>
  );
}

/* ─────────────────────── Roblox live stats ─────────────────────── */

interface RobloxData {
  name: string | null;
  playing: number | null;
  visits: number | null;
  likeRatio: number | null;
  thumb: string | null;
  url: string;
}

const numLocale: Record<Lang, string> = { ko: "ko", en: "en", ja: "ja" };
const POLL_MS = 45_000;

function useRobloxStats(placeId: number) {
  const [data, setData] = useState<RobloxData | null>(null);
  const [failed, setFailed] = useState(false);
  const got = useRef(false);

  useEffect(() => {
    let alive = true;
    let timer: ReturnType<typeof setInterval> | null = null;

    const load = async () => {
      try {
        const r = await fetch(`/api/roblox?placeId=${placeId}`);
        if (!r.ok) throw new Error(String(r.status));
        const j = (await r.json()) as RobloxData;
        if (!alive) return;
        got.current = true;
        setData(j);
        setFailed(false);
      } catch {
        // Keep showing the last good numbers if we ever had them; only a cold
        // failure hides the block entirely.
        if (alive && !got.current) setFailed(true);
      }
    };

    // Don't poll a tab nobody is looking at.
    const start = () => { if (!timer) timer = setInterval(load, POLL_MS); };
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
    const onVisibility = () => {
      if (document.visibilityState === "visible") { load(); start(); } else stop();
    };

    load();
    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      alive = false;
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [placeId]);

  return { data, failed };
}

/** Thumbnail + live CCU / like-ratio / visits, fed by /api/roblox. */
function RobloxLive({ placeId, fallbackIcon }: { placeId: number; fallbackIcon: string }) {
  const lang = useLang();
  const { data, failed } = useRobloxStats(placeId);
  const nf = useCallback(
    (n: number | null) =>
      n == null ? "—" : new Intl.NumberFormat(numLocale[lang], { notation: "compact", maximumFractionDigits: 1 }).format(n),
    [lang]
  );

  if (failed) return null;

  return (
    <div className="border-b-[2.5px] border-os-ink">
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0a1e3a]">
        {data?.thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={data.thumb} alt={data.name ?? ""} className="h-full w-full object-cover" />
        ) : (
          <div aria-hidden="true" className="grid h-full w-full animate-pulse place-items-center text-[44px]">{fallbackIcon}</div>
        )}
        {data?.playing != null && (
          <span className="absolute right-2.5 top-2.5 flex items-center gap-1.5 rounded-md border-[2px] border-os-ink bg-white/95 px-2 py-1 font-mono text-[11px] font-extrabold text-os-ink">
            <LiveDot />
            <span className="sr-only">{t(ui.liveLabel, lang)} </span>
            {new Intl.NumberFormat(numLocale[lang]).format(data.playing)}
          </span>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 divide-x-2 divide-os-ink/15 border-t-[2.5px] border-os-ink bg-white">
        <StatTile label={t(ui.statPlaying, lang)} value={data ? new Intl.NumberFormat(numLocale[lang]).format(data.playing ?? 0) : "—"} live />
        <StatTile label={t(ui.statLikes, lang)} value={data?.likeRatio != null ? `${data.likeRatio}%` : "—"} icon="👍" />
        <StatTile label={t(ui.statVisits, lang)} value={nf(data?.visits ?? null)} icon="👣" />
      </div>
    </div>
  );
}

function LiveDot() {
  return (
    <span aria-hidden="true" className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1f9e5a] opacity-60" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1f9e5a]" />
    </span>
  );
}

function StatTile({ label, value, icon, live }: { label: string; value: string; icon?: string; live?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-0.5 px-2 py-2.5 text-center">
      <span className="flex items-center gap-1.5 font-mono text-[15px] font-extrabold leading-none text-os-ink">
        {live && <LiveDot />}
        {icon && <span aria-hidden="true" className="text-[13px]">{icon}</span>}
        {value}
      </span>
      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-os-ink/65">{label}</span>
    </div>
  );
}

/* ──────────────────────────── Project ──────────────────────────── */

function ProjectBody({ app }: { app: DesktopApp }) {
  const lang = useLang();
  return (
    <div>
      {/* Hero strip */}
      <div className="relative flex items-center gap-3 border-b-[2.5px] border-os-ink px-5 py-5 sm:px-7" style={{ background: `linear-gradient(135deg, ${app.accent}1f, ${app.accent}0a)` }}>
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[14px] border-[2.5px] border-os-ink bg-white text-[30px]" style={{ boxShadow: "3px 3px 0 0 rgba(8,22,43,0.85)" }}>
          <span aria-hidden="true">{app.icon}</span>
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-[20px] font-extrabold leading-tight text-os-ink">{app.title}</h2>
            {app.status && (
              <span className="shrink-0 rounded border-[1.5px] border-os-ink px-1.5 font-mono text-[9px] font-bold text-white" style={{ background: statusColor[app.status] }}>
                {statusLabel[app.status]}
              </span>
            )}
          </div>
          {app.tagline && <p className="mt-1 text-[12.5px] font-semibold text-os-ink/80">{t(app.tagline, lang)}</p>}
        </div>
      </div>

      {/* Live Roblox block: thumbnail + CCU / likes / visits */}
      {app.roblox && <RobloxLive placeId={app.roblox.placeId} fallbackIcon={app.icon} />}

      <div className="p-5 sm:p-7">
        {app.roblox && (
          <PixelButton
            href={`https://www.roblox.com/games/${app.roblox.placeId}`}
            external
            full
            className="mb-5 border-[2.5px] bg-[#1f9e5a] text-[14px] text-white hover:bg-[#23b167]"
          >
            ▶ {t(ui.playCta, lang)}
          </PixelButton>
        )}
        {app.summary && <p className="text-[13.5px] leading-relaxed text-os-ink/90">{t(app.summary, lang)}</p>}

        {app.role && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {app.role.map((r) => (
              <span key={t(r, "ko")} className="rounded-md border-[2px] border-os-ink bg-anchor-blue/10 px-2 py-0.5 font-mono text-[10.5px] font-bold text-anchor-blue-dark">
                {t(r, lang)}
              </span>
            ))}
          </div>
        )}

        {app.bullets && (
          <div className="mt-5">
            <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-os-ink/70">{t(ui.weDid, lang)}</p>
            <ul className="mt-2 space-y-1.5">
              {app.bullets.map((b) => (
                <li key={t(b, "ko")} className="flex gap-2 text-[13px] leading-snug text-os-ink/90">
                  <span aria-hidden="true" className="mt-[3px] text-anchor-blue-dark">▸</span>
                  <span>{t(b, lang)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {app.meta && (
          <div className="mt-5 overflow-hidden rounded-lg border-[2.5px] border-os-ink bg-white">
            {app.meta.map((m, i) => (
              <div key={m.label} className={`flex items-center justify-between px-3.5 py-2 ${i ? "border-t-2 border-dashed border-os-ink/20" : ""}`}>
                <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-os-ink/65">{m.label}</span>
                <span className="text-[12.5px] font-bold text-os-ink">{m.value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {app.links?.map((l) => (
            <PixelButton key={l.href} primary href={l.href} external>
              {t(l.label, lang)} ↗
            </PixelButton>
          ))}
          {app.slug && (
            <PixelButton internalHref={`/projects/${app.slug}?lang=${lang}`}>{t(ui.ctaCaseStudy, lang)}</PixelButton>
          )}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────── Button ──────────────────────────── */

/**
 * One chunky retro button, rendered as <button>, <a> or next/link depending on the
 * props — so a link is never nested inside a button (or the other way round).
 */
function PixelButton({
  children, onClick, href, internalHref, external, primary, full, className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  /** external / mailto destination */
  href?: string;
  /** in-app route, rendered with next/link */
  internalHref?: string;
  external?: boolean;
  primary?: boolean;
  full?: boolean;
  className?: string;
}) {
  const cls = `inline-flex items-center justify-center rounded-lg border-[2.5px] border-os-ink px-3.5 py-2 text-[12.5px] font-extrabold transition-all active:translate-x-px active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-anchor-blue ${
    full ? "w-full" : ""
  } ${primary ? "bg-anchor-blue text-white" : "bg-os-cream text-os-ink hover:bg-white"} ${className}`;
  const style = { boxShadow: "3px 3px 0 0 rgba(8,22,43,0.85)" };

  if (internalHref) {
    return (
      <Link href={internalHref} className={cls} style={style}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        className={cls}
        style={style}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls} style={style}>
      {children}
    </button>
  );
}
