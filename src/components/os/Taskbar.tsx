"use client";

import { useEffect, useState } from "react";
import { AnchorLogo } from "@/components/anchor-logo";
import { appById, folderById, folders, statusColor, statusLabel } from "@/data/desktopItems";
import type { WinState } from "./Window";
import { useLang } from "./LangContext";
import { t, ui, type Lang } from "@/data/i18n";

interface TaskbarProps {
  wins: WinState[];
  activeId: string | null;
  onOpen: (id: string) => void;
  onTaskClick: (id: string) => void;
}

const localeOf: Record<Lang, string> = { ko: "ko-KR", en: "en-US", ja: "ja-JP" };

export function Taskbar({ wins, activeId, onOpen, onTaskClick }: TaskbarProps) {
  const lang = useLang();
  const [startOpen, setStartOpen] = useState(false);
  const [openFolderId, setOpenFolderId] = useState<string | null>(null);
  const [clock, setClock] = useState("");
  const [dateStr, setDateStr] = useState("");

  const closeMenus = () => { setStartOpen(false); setOpenFolderId(null); };

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      setClock(`${hh}:${mm}`);
      try {
        setDateStr(new Intl.DateTimeFormat(localeOf[lang], { month: "numeric", day: "numeric", weekday: "short" }).format(d));
      } catch {
        setDateStr("");
      }
    };
    tick();
    const t = setInterval(tick, 10_000);
    return () => clearInterval(t);
  }, [lang]);

  return (
    <>
      {/* Start menu */}
      {startOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={closeMenus} />
          <div className="fixed bottom-[52px] left-2 z-50 w-[248px] overflow-hidden rounded-[10px] border-[2.5px] border-os-ink bg-os-cream" style={{ boxShadow: "5px 5px 0 0 rgba(8,22,43,0.85)" }}>
            <div className="flex items-center gap-2 border-b-[2.5px] border-os-ink bg-anchor-blue px-3 py-2.5" style={{ backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.16), transparent)" }}>
              <AnchorLogo className="h-5 w-5 text-white" />
              <span className="font-mono text-[12px] font-extrabold tracking-tight text-white">ANCHORED OS</span>
            </div>
            <div className="p-1.5">
              <StartItem icon="⚓" label={t(ui.startAbout, lang)} onClick={() => { onOpen("about"); closeMenus(); }} />
              <StartItem icon="🛠️" label={t(ui.navServices, lang)} onClick={() => { onOpen("services"); closeMenus(); }} />
              <StartItem icon="✉️" label={t(ui.navContact, lang)} onClick={() => { onOpen("contact"); closeMenus(); }} />
              <div className="my-1.5 border-t-2 border-dashed border-os-ink/20" />
              <p className="px-2.5 py-1 font-mono text-[9.5px] font-bold uppercase tracking-wider text-os-ink/45">{t(ui.portfolio, lang)}</p>
              {folders.map((f) => (
                <StartItem
                  key={f.id}
                  icon={f.icon}
                  label={f.title}
                  right={`${f.children.length} ▸`}
                  activeRow={openFolderId === f.id}
                  onClick={() => setOpenFolderId((cur) => (cur === f.id ? null : f.id))}
                />
              ))}
            </div>
          </div>

          {/* Cascading submenu: the selected folder's contents */}
          {openFolderId && (() => {
            const f = folders.find((x) => x.id === openFolderId);
            if (!f) return null;
            const items = f.children.map(appById).filter(Boolean);
            return (
              <div className="fixed bottom-[52px] left-[258px] z-50 w-[252px] overflow-hidden rounded-[10px] border-[2.5px] border-os-ink bg-os-cream" style={{ boxShadow: "5px 5px 0 0 rgba(8,22,43,0.85)" }}>
                <div className="flex items-center gap-2 border-b-[2.5px] border-os-ink px-3 py-2" style={{ background: f.accent, backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.16), transparent)" }}>
                  <span className="text-[14px] leading-none">{f.icon}</span>
                  <span className="font-mono text-[11.5px] font-extrabold tracking-tight text-white">{f.title}</span>
                </div>
                <div className="p-1.5">
                  {items.map((a) => (
                    <button
                      key={a!.id}
                      onClick={() => { onOpen(a!.id); closeMenus(); }}
                      className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left transition-colors hover:bg-anchor-blue group"
                    >
                      <span className="text-[15px] leading-none">{a!.icon}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[12.5px] font-bold text-os-ink group-hover:text-white">{a!.title}</span>
                        {a!.tagline && (
                          <span className="block truncate text-[10px] text-os-ink/55 group-hover:text-white/75">{t(a!.tagline, lang)}</span>
                        )}
                      </span>
                      {a!.status && (
                        <span className="shrink-0 rounded border-[1.5px] border-os-ink px-1 font-mono text-[8px] font-bold text-white" style={{ background: statusColor[a!.status] }}>
                          {statusLabel[a!.status]}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}
        </>
      )}

      {/* Taskbar */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 flex h-[46px] items-center gap-1.5 border-t-[2.5px] border-os-ink bg-[#d7d4c8] px-1.5"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)" }}
      >
        <button
          onClick={() => { setStartOpen((v) => !v); setOpenFolderId(null); }}
          className={`flex h-[34px] shrink-0 items-center gap-1.5 rounded-md border-[2.5px] border-os-ink px-2.5 font-mono text-[12px] font-extrabold text-white transition-all active:translate-y-px ${
            startOpen ? "bg-anchor-blue-dark" : "bg-anchor-blue"
          }`}
          style={{ boxShadow: "2px 2px 0 0 rgba(8,22,43,0.85)", backgroundImage: startOpen ? undefined : "linear-gradient(180deg, rgba(255,255,255,0.18), transparent 60%)" }}
        >
          <AnchorLogo className="h-4 w-4" />
          <span className="hidden xs:inline">{t(ui.start, lang)}</span>
        </button>

        <div className="flex h-full flex-1 items-center gap-1.5 overflow-x-auto os-scroll">
          {wins.map((w) => {
            const app = appById(w.id);
            const folder = folderById(w.id);
            const icon = app?.icon ?? folder?.icon;
            const title = app?.title ?? folder?.title;
            if (!icon || !title) return null;
            const active = w.id === activeId && !w.minimized;
            return (
              <button
                key={w.id}
                onClick={() => onTaskClick(w.id)}
                className={`flex h-[34px] min-w-0 max-w-[150px] shrink-0 items-center gap-1.5 rounded-md border-[2px] border-os-ink px-2 text-[11.5px] font-bold transition-all ${
                  active ? "bg-white text-os-ink" : "bg-[#c4c1b5] text-os-ink/70 hover:bg-[#cecbbf]"
                }`}
                style={active ? { boxShadow: "inset 2px 2px 0 0 rgba(8,22,43,0.18)" } : {}}
              >
                <span className="text-[13px] leading-none">{icon}</span>
                <span className="truncate font-mono">{title}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden shrink-0 items-center gap-1.5 rounded-md border-[2px] border-os-ink bg-os-cream px-2.5 py-1 sm:flex">
          <span className="font-mono text-[10.5px] font-bold text-os-ink/55">{dateStr}</span>
          <span className="font-mono text-[11px] font-bold text-os-ink/80">{clock}</span>
        </div>
      </div>
    </>
  );
}

function StartItem({ icon, label, right, activeRow, onClick }: { icon: string; label: string; right?: string; activeRow?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[12.5px] font-bold transition-colors hover:bg-anchor-blue hover:text-white ${
        activeRow ? "bg-anchor-blue text-white" : "text-os-ink"
      }`}
    >
      <span className="text-[15px] leading-none">{icon}</span>
      <span className="truncate">{label}</span>
      {right && (
        <span className="ml-auto rounded-full border border-os-ink/25 bg-os-ink/5 px-1.5 font-mono text-[9.5px] font-bold text-os-ink/55 group-hover:border-white/40 group-hover:bg-white/15 group-hover:text-white">
          {right}
        </span>
      )}
    </button>
  );
}
