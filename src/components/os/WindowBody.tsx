"use client";

import Link from "next/link";
import type { DesktopApp } from "@/data/desktopItems";
import { statusLabel, statusColor, services, socials } from "@/data/desktopItems";
import { AnchorLogo } from "@/components/anchor-logo";

/** Renders the inner content of a window based on the app kind. */
export function WindowBody({ app, onOpen }: { app: DesktopApp; onOpen: (id: string) => void }) {
  if (app.kind === "about") return <AboutBody onOpen={onOpen} />;
  if (app.kind === "services") return <ServicesBody onOpen={onOpen} />;
  if (app.kind === "contact") return <ContactBody />;
  return <ProjectBody app={app} />;
}

/* ───────────────────────────── About ───────────────────────────── */

function AboutBody({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div className="p-5 sm:p-7">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] border-[2.5px] border-os-ink bg-anchor-blue text-white" style={{ boxShadow: "3px 3px 0 0 rgba(8,22,43,0.85)" }}>
          <AnchorLogo className="h-6 w-6" />
        </span>
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-anchor-blue">Anchored Agency</p>
          <h2 className="text-[19px] font-extrabold leading-tight text-os-ink">IP·콘텐츠를 Roblox 게임으로</h2>
        </div>
      </div>

      <p className="mt-5 text-[14px] font-bold leading-snug text-os-ink">
        We turn your IP &amp; content into Roblox games.
      </p>
      <div className="mt-3 space-y-3 text-[13.5px] leading-relaxed text-os-ink/80">
        <p>
          앵커드는 IP·콘텐츠·브랜드를 Roblox에서 <b>실제로 플레이되는 게임</b>으로 만드는 에이전시입니다.
          기획부터 개발, 출시, 라이브옵스까지 한 팀에서 책임집니다.
        </p>
        <p>
          월 2억 명이 노는 Roblox는 더 이상 게임 플랫폼이 아니라 <b>새로운 미디어</b>입니다.
          우리는 한국 UGC 크리에이터 씬에서 발굴한 팀과 함께, 당신의 IP가 이 미디어 위에서 살아 움직이게 합니다.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2.5">
        {[
          { k: "4+", v: "게임 프로젝트" },
          { k: "200M+", v: "월 Roblox 유저" },
          { k: "Full", v: "기획→런칭→운영" },
        ].map((s) => (
          <div key={s.v} className="rounded-lg border-[2px] border-os-ink bg-white px-2 py-3 text-center">
            <div className="font-mono text-[17px] font-extrabold text-anchor-blue">{s.k}</div>
            <div className="mt-0.5 text-[10.5px] font-semibold text-os-ink/70">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <PixelButton primary onClick={() => onOpen("services")}>서비스 보기 →</PixelButton>
        <PixelButton onClick={() => onOpen("speed-obby")}>포트폴리오 열기</PixelButton>
        <PixelButton onClick={() => onOpen("contact")}>문의하기</PixelButton>
      </div>

      <p className="mt-5 border-t-2 border-dashed border-os-ink/20 pt-3 font-mono text-[10.5px] text-os-ink/55">
        💡 바탕화면의 아이콘을 클릭해 각 작업물을 열어보세요.
      </p>
    </div>
  );
}

/* ──────────────────────────── Services ──────────────────────────── */

function ServicesBody({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div className="p-5 sm:p-7">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-anchor-blue">What we do</p>
      <h2 className="mt-1 text-[19px] font-extrabold leading-tight text-os-ink">
        IP를 게임으로 만드는 네 가지 방법
      </h2>
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
            <p className="mt-2 text-[12.5px] leading-relaxed text-os-ink/75">{s.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <PixelButton primary onClick={() => onOpen("contact")}>프로젝트 문의 →</PixelButton>
        <PixelButton onClick={() => onOpen("about")}>회사 소개</PixelButton>
      </div>
    </div>
  );
}

/* ──────────────────────────── Contact ──────────────────────────── */

function ContactBody() {
  return (
    <div className="p-5 sm:p-7">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-anchor-blue">Get in touch</p>
      <h2 className="mt-1 text-[19px] font-extrabold leading-tight text-os-ink">
        당신의 IP를 게임으로.
      </h2>
      <p className="mt-2 text-[13.5px] leading-relaxed text-os-ink/75">
        IP·콘텐츠·브랜드의 Roblox 게임화, 크리에이터 협업, 파트너십 — 무엇이든 편하게 연락주세요.
      </p>
      <div className="mt-4 divide-y-2 divide-dashed divide-os-ink/15 overflow-hidden rounded-lg border-[2.5px] border-os-ink bg-white">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-3 transition-colors hover:bg-os-cream"
          >
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
  return (
    <div>
      {/* Hero strip */}
      <div
        className="relative flex items-center gap-3 border-b-[2.5px] border-os-ink px-5 py-5 sm:px-7"
        style={{ background: `linear-gradient(135deg, ${app.accent}1f, ${app.accent}0a)` }}
      >
        <span
          className="grid h-14 w-14 shrink-0 place-items-center rounded-[14px] border-[2.5px] border-os-ink bg-white text-[30px]"
          style={{ boxShadow: "3px 3px 0 0 rgba(8,22,43,0.85)" }}
        >
          {app.icon}
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-[20px] font-extrabold leading-tight text-os-ink">{app.title}</h2>
            {app.status && (
              <span
                className="shrink-0 rounded border-[1.5px] border-os-ink px-1.5 font-mono text-[9px] font-bold text-white"
                style={{ background: statusColor[app.status] }}
              >
                {statusLabel[app.status]}
              </span>
            )}
          </div>
          {app.tagline && <p className="mt-1 text-[12.5px] font-semibold text-os-ink/70">{app.tagline}</p>}
        </div>
      </div>

      <div className="p-5 sm:p-7">
        {app.summary && <p className="text-[13.5px] leading-relaxed text-os-ink/85">{app.summary}</p>}

        {app.role && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {app.role.map((r) => (
              <span key={r} className="rounded-md border-[2px] border-os-ink bg-anchor-blue/10 px-2 py-0.5 font-mono text-[10.5px] font-bold text-anchor-blue">
                {r}
              </span>
            ))}
          </div>
        )}

        {app.bullets && (
          <div className="mt-5">
            <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-os-ink/55">우리가 한 일</p>
            <ul className="mt-2 space-y-1.5">
              {app.bullets.map((b) => (
                <li key={b} className="flex gap-2 text-[13px] leading-snug text-os-ink/85">
                  <span className="mt-[3px] text-anchor-blue">▸</span>
                  <span>{b}</span>
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
              <PixelButton primary>{l.label} ↗</PixelButton>
            </a>
          ))}
          {app.slug && (
            <Link href={`/projects/${app.slug}`}>
              <PixelButton>전체 케이스 보기 →</PixelButton>
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
