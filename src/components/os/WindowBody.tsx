"use client";

import Link from "next/link";
import type { DesktopApp } from "@/data/desktopItems";
import { statusLabel, statusColor, services, socials } from "@/data/desktopItems";
import { AnchorLogo } from "@/components/anchor-logo";
import { useLang } from "./LangContext";
import { t, ui } from "@/data/i18n";

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
  return (
    <div className="p-5 sm:p-7">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] border-[2.5px] border-os-ink bg-anchor-blue text-white" style={{ boxShadow: "3px 3px 0 0 rgba(8,22,43,0.85)" }}>
          <AnchorLogo className="h-6 w-6" />
        </span>
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-anchor-blue">Anchored Agency</p>
          <h2 className="text-[19px] font-extrabold leading-tight text-os-ink">{t(ui.aboutTitle, lang)}</h2>
        </div>
      </div>

      <p className="mt-5 text-[14px] font-bold leading-snug text-os-ink">{t(ui.aboutLead, lang)}</p>
      <div className="mt-3 space-y-3 text-[13.5px] leading-relaxed text-os-ink/80">
        <p>{t(ui.aboutP1, lang)}</p>
        <p>{t(ui.aboutP2, lang)}</p>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2.5">
        {[
          { k: "4+", v: ui.statProjects },
          { k: "200M+", v: ui.statUsers },
          { k: "Full", v: ui.statFull },
        ].map((s) => (
          <div key={s.k} className="rounded-lg border-[2px] border-os-ink bg-white px-2 py-3 text-center">
            <div className="font-mono text-[17px] font-extrabold text-anchor-blue">{s.k}</div>
            <div className="mt-0.5 text-[10.5px] font-semibold text-os-ink/70">{t(s.v, lang)}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <PixelButton primary onClick={() => onOpen("services")}>{t(ui.ctaServices, lang)}</PixelButton>
        <PixelButton onClick={() => onOpen("speed-obby")}>{t(ui.ctaPortfolio, lang)}</PixelButton>
        <PixelButton onClick={() => onOpen("contact")}>{t(ui.ctaContact, lang)}</PixelButton>
      </div>

      <p className="mt-5 border-t-2 border-dashed border-os-ink/20 pt-3 font-mono text-[10.5px] text-os-ink/55">{t(ui.aboutHint, lang)}</p>
    </div>
  );
}

/* ──────────────────────────── Services ──────────────────────────── */

function ServicesBody({ onOpen }: { onOpen: (id: string) => void }) {
  const lang = useLang();
  return (
    <div className="p-5 sm:p-7">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-anchor-blue">{t(ui.svcKicker, lang)}</p>
      <h2 className="mt-1 text-[19px] font-extrabold leading-tight text-os-ink">{t(ui.svcTitle, lang)}</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {services.map((s) => (
          <div key={s.title} className="rounded-lg border-[2.5px] border-os-ink bg-white p-3.5" style={{ boxShadow: "3px 3px 0 0 rgba(8,22,43,0.12)" }}>
            <div className="flex items-center gap-2">
              <span className="text-[20px]">{s.icon}</span>
              <div>
                <div className="text-[14px] font-extrabold leading-tight text-os-ink">{s.title}</div>
                <div className="font-mono text-[9.5px] uppercase tracking-wider text-anchor-blue">{s.en}</div>
              </div>
            </div>
            <p className="mt-2 text-[12.5px] leading-relaxed text-os-ink/75">{t(s.desc, lang)}</p>
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
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-anchor-blue">{t(ui.contactKicker, lang)}</p>
      <h2 className="mt-1 text-[19px] font-extrabold leading-tight text-os-ink">{t(ui.contactTitle, lang)}</h2>
      <p className="mt-2 text-[13.5px] leading-relaxed text-os-ink/75">{t(ui.contactDesc, lang)}</p>
      <div className="mt-4 divide-y-2 divide-dashed divide-os-ink/15 overflow-hidden rounded-lg border-[2.5px] border-os-ink bg-white">
        {socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-3.5 py-3 transition-colors hover:bg-os-cream">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-os-ink/55">{s.label}</span>
            <span className="text-[13.5px] font-bold text-anchor-blue">{s.value} ↗</span>
          </a>
        ))}
      </div>
      <a href="mailto:contact@anchored.kr" className="mt-4 block">
        <PixelButton primary full>✉️  contact@anchored.kr</PixelButton>
      </a>
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
          {app.icon}
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
          {app.tagline && <p className="mt-1 text-[12.5px] font-semibold text-os-ink/70">{t(app.tagline, lang)}</p>}
        </div>
      </div>

      <div className="p-5 sm:p-7">
        {app.summary && <p className="text-[13.5px] leading-relaxed text-os-ink/85">{t(app.summary, lang)}</p>}

        {app.role && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {app.role.map((r) => (
              <span key={t(r, "ko")} className="rounded-md border-[2px] border-os-ink bg-anchor-blue/10 px-2 py-0.5 font-mono text-[10.5px] font-bold text-anchor-blue">
                {t(r, lang)}
              </span>
            ))}
          </div>
        )}

        {app.bullets && (
          <div className="mt-5">
            <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-os-ink/55">{t(ui.weDid, lang)}</p>
            <ul className="mt-2 space-y-1.5">
              {app.bullets.map((b) => (
                <li key={t(b, "ko")} className="flex gap-2 text-[13px] leading-snug text-os-ink/85">
                  <span className="mt-[3px] text-anchor-blue">▸</span>
                  <span>{t(b, lang)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {app.meta && (
          <div className="mt-5 overflow-hidden rounded-lg border-[2.5px] border-os-ink bg-white">
            {app.meta.map((m, i) => (
              <div key={m.label} className={`flex items-center justify-between px-3.5 py-2 ${i ? "border-t-2 border-dashed border-os-ink/15" : ""}`}>
                <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-os-ink/50">{m.label}</span>
                <span className="text-[12.5px] font-bold text-os-ink">{m.value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {app.links?.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
              <PixelButton primary>{t(l.label, lang)} ↗</PixelButton>
            </a>
          ))}
          {app.slug && (
            <Link href={`/projects/${app.slug}`}>
              <PixelButton>{t(ui.ctaCaseStudy, lang)}</PixelButton>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────── Button ──────────────────────────── */

function PixelButton({
  children, onClick, primary, full,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
  full?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-lg border-[2.5px] border-os-ink px-3.5 py-2 text-[12.5px] font-extrabold transition-all active:translate-x-px active:translate-y-px ${
        full ? "w-full" : ""
      } ${primary ? "bg-anchor-blue text-white" : "bg-os-cream text-os-ink hover:bg-white"}`}
      style={{ boxShadow: "3px 3px 0 0 rgba(8,22,43,0.85)" }}
    >
      {children}
    </button>
  );
}
