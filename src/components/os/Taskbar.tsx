"use client";

import { useEffect, useState } from "react";
import { AnchorLogo } from "@/components/anchor-logo";
import { projectApps, appById } from "@/data/desktopItems";
import type { WinState } from "./Window";
import { useLang } from "./LangContext";
import { t, ui } from "@/data/i18n";

interface TaskbarProps {
  wins: WinState[];
  activeId: string | null;
  onOpen: (id: string) => void;
  onTaskClick: (id: string) => void;
}

export function Taskbar({ wins, activeId, onOpen, onTaskClick }: TaskbarProps) {
  const lang = useLang();
  const [startOpen, setStartOpen] = useState(false);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      setClock(`${hh}:${mm}`);
    };
    tick();
    const t = setInterval(tick, 10_000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* Start menu */}
      {startOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setStartOpen(false)} />
          <div className="fixed bottom-[52px] left-2 z-50 w-[248px] overflow-hidden rounded-[10px] border-[2.5px] border-os-ink bg-os-cream" style={{ boxShadow: "5px 5px 0 0 rgba(8,22,43,0.85)" }}>
            <div className="flex items-center gap-2 border-b-[2.5px] border-os-ink bg-anchor-blue px-3 py-2.5">
              <AnchorLogo className="h-5 w-5 text-white" />
              <span className="font-mono text-[12px] font-extrabold tracking-tight text-white">ANCHORED OS</span>
            </div>
            <div className="p-1.5">
              <StartItem icon="⚓" label={t(ui.startAbout, lang)} onClick={() => { onOpen("about"); setStartOpen(false); }} />
              <StartItem icon="🛠️" label={t(ui.navServices, lang)} onClick={() => { onOpen("services"); setStartOpen(false); }} />
              <StartItem icon="✉️" label={t(ui.navContact, lang)} onClick={() => { onOpen("contact"); setStartOpen(false); }} />
              <div className="my-1.5 border-t-2 border-dashed border-os-ink/20" />
              <p className="px-2.5 py-1 font-mono text-[9.5px] font-bold uppercase tracking-wider text-os-ink/45">{t(ui.portfolio, lang)}</p>
              <div className="max-h-[220px] overflow-y-auto os-scroll">
                {projectApps.map((p) => (
                  <StartItem key={p.id} icon={p.icon} label={p.title} onClick={() => { onOpen(p.id); setStartOpen(false); }} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Taskbar */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex h-[46px] items-center gap-1.5 border-t-[2.5px] border-os-ink bg-[#d7d4c8] px-1.5">
        <button
          onClick={() => setStartOpen((v) => !v)}
          className={`flex h-[34px] shrink-0 items-center gap-1.5 rounded-md border-[2.5px] border-os-ink px-2.5 font-mono text-[12px] font-extrabold text-white transition-all active:translate-y-px ${
            startOpen ? "bg-anchor-blue-dark" : "bg-anchor-blue"
          }`}
          style={{ boxShadow: "2px 2px 0 0 rgba(8,22,43,0.85)" }}
        >
          <AnchorLogo className="h-4 w-4" />
          <span className="hidden xs:inline">{t(ui.start, lang)}</span>
        </button>

        <div className="flex h-full flex-1 items-center gap-1.5 overflow-x-auto os-scroll">
          {wins.map((w) => {
            const app = appById(w.id);
            if (!app) return null;
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
                <span className="text-[13px] leading-none">{app.icon}</span>
                <span className="truncate font-mono">{app.title}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden shrink-0 items-center gap-1.5 rounded-md border-[2px] border-os-ink bg-os-cream px-2.5 py-1 sm:flex">
          <span className="font-mono text-[11px] font-bold text-os-ink/80">{clock}</span>
        </div>
      </div>
    </>
  );
}

function StartItem({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[12.5px] font-bold text-os-ink transition-colors hover:bg-anchor-blue hover:text-white"
    >
      <span className="text-[15px] leading-none">{icon}</span>
      <span className="truncate">{label}</span>
    </button>
  );
}
