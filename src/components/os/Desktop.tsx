"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { apps, appById, folders, folderById } from "@/data/desktopItems";
import { LangContext } from "./LangContext";
import { LANGS, t, ui, type Lang } from "@/data/i18n";
import { DesktopIcon, type DeskEntry } from "./DesktopIcon";
import { Taskbar } from "./Taskbar";
import { Window, type WinState } from "./Window";
import { WindowBody } from "./WindowBody";
import { FolderBody } from "./FolderBody";
import { HarborScene } from "./HarborScene";

const DEFAULT_W = 560;
const FOLDER_W = 470;

/** What sits on the desktop: system apps as-is, portfolio grouped into folders. */
const desktopEntries: DeskEntry[] = [
  ...apps
    .filter((a) => a.group === "system")
    .map((a) => ({ id: a.id, title: a.title, icon: a.icon, status: a.status })),
  ...folders.map((f) => ({
    id: f.id,
    title: f.title,
    icon: f.icon,
    preview: f.children.map((c) => appById(c)?.icon ?? "❔"),
    count: f.children.length,
  })),
];

/** Anchored OS — desktop window manager. Orchestrates state; rendering lives in children. */
export function Desktop() {
  const [wins, setWins] = useState<WinState[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [iconPos, setIconPos] = useState<Record<string, { x: number; y: number }>>({});
  const [lang, setLang] = useState<Lang>("ko");
  const topZ = useRef(10);
  const opened = useRef(0);

  // Lock body scroll while the desktop owns the viewport.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Track viewport size for mobile layout / window placement.
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // Restore saved language.
  useEffect(() => {
    try {
      const s = localStorage.getItem("anchored:lang");
      if (s === "ko" || s === "en" || s === "ja") setLang(s);
    } catch {}
  }, []);
  const changeLang = useCallback((l: Lang) => {
    setLang(l);
    try { localStorage.setItem("anchored:lang", l); } catch {}
  }, []);

  const focusWin = useCallback((id: string) => {
    topZ.current += 1;
    const z = topZ.current;
    setActiveId(id);
    setWins((ws) => ws.map((w) => (w.id === id ? { ...w, z, minimized: false } : w)));
  }, []);

  const openApp = useCallback((id: string) => {
    setSelected(id);
    setWins((ws) => {
      const existing = ws.find((w) => w.id === id);
      topZ.current += 1;
      const z = topZ.current;
      if (existing) {
        setActiveId(id);
        return ws.map((w) => (w.id === id ? { ...w, z, minimized: false } : w));
      }
      const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
      const base = folderById(id) ? FOLDER_W : DEFAULT_W;
      const w = Math.min(base, vw - 32);
      const step = opened.current % 6;
      opened.current += 1;
      const x = Math.max(20, vw / 2 - w / 2 - 80 + step * 30);
      const y = 64 + step * 28;
      setActiveId(id);
      return [...ws, { id, z, x, y, w, minimized: false, maximized: false }];
    });
  }, []);

  const closeWin = useCallback((id: string) => {
    setWins((ws) => ws.filter((w) => w.id !== id));
    setActiveId((a) => (a === id ? null : a));
  }, []);

  const minimizeWin = useCallback((id: string) => {
    setWins((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
    setActiveId((a) => (a === id ? null : a));
  }, []);

  const toggleMax = useCallback((id: string) => {
    focusWin(id);
    setWins((ws) => ws.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)));
  }, [focusWin]);

  const moveWin = useCallback((id: string, x: number, y: number) => {
    setWins((ws) => ws.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }, []);

  const taskClick = useCallback((id: string) => {
    const w = wins.find((x) => x.id === id);
    if (!w) return;
    if (w.minimized) return focusWin(id);
    if (id === activeId) return minimizeWin(id);
    focusWin(id);
  }, [wins, activeId, focusWin, minimizeWin]);

  const moveIcon = useCallback((id: string, x: number, y: number) => {
    setIconPos((p) => {
      const next = { ...p, [id]: { x, y } };
      try { localStorage.setItem("anchored:iconpos", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  // Lay out desktop icons: free-positioned & draggable on desktop, restored from
  // localStorage if the user has rearranged them. Defaults always fill in ids the
  // saved layout doesn't know yet (e.g. new folders). (Mobile keeps the static grid.)
  useEffect(() => {
    if (isMobile) return;
    const perCol = Math.max(3, Math.floor((window.innerHeight - 60 - 64) / 92));
    const defaults: Record<string, { x: number; y: number }> = {};
    desktopEntries.forEach((en, i) => {
      defaults[en.id] = { x: 12 + Math.floor(i / perCol) * 94, y: 68 + (i % perCol) * 92 };
    });
    let saved: Record<string, { x: number; y: number }> = {};
    try {
      const s = localStorage.getItem("anchored:iconpos");
      if (s) saved = JSON.parse(s) ?? {};
    } catch {}
    setIconPos({ ...defaults, ...saved });
  }, [isMobile]);

  // Open the welcome window on mount. openApp focuses (not duplicates) if already open,
  // so this stays correct under React StrictMode's double-invoked effects.
  useEffect(() => {
    openApp("about");
  }, [openApp]);

  return (
    <LangContext.Provider value={lang}>
    <div className="anchor-wall fixed inset-0 overflow-hidden font-sans" onPointerDown={() => setSelected(null)}>
      {/* Pacific backdrop: the whole desktop is open sea — watermark, water texture, waves & one sailboat */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/C_anchored_signature_h_eng.png`}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute left-1/2 top-1/2 w-[78vmin] max-w-[960px] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.07]"
        style={{ filter: "brightness(0) invert(1)" }}
      />
      <div className="anchor-sea" />
      <HarborScene />

      {/* Top bar */}
      <div
        className="absolute inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-white/10 px-4 backdrop-blur-md"
        style={{
          background: "linear-gradient(180deg, rgba(4,17,36,0.88), rgba(4,17,36,0.45))",
          boxShadow: "0 1px 0 rgba(0,114,206,0.35)",
        }}
      >
        <button onClick={(e) => { e.stopPropagation(); openApp("about"); }} className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/B_anchored_signature_h_eng.png`}
            alt="Anchored"
            className="h-[24px] w-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <span className="hidden font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/45 sm:inline">{t(ui.agencyTag, lang)}</span>
        </button>
        <div className="flex items-center gap-1.5">
          <TopLink label={t(ui.navServices, lang)} onClick={() => openApp("services")} />
          <TopLink label={t(ui.navContact, lang)} onClick={() => openApp("contact")} />
          <a href="https://github.com/anchored-kr" target="_blank" rel="noopener noreferrer" className="hidden sm:block">
            <TopLink label="GitHub ↗" />
          </a>
          <LangToggle lang={lang} onChange={changeLang} />
        </div>
      </div>

      {/* Desktop icons — static grid on mobile, free-draggable on desktop */}
      {isMobile ? (
        <div
          className="absolute inset-x-0 top-[64px] z-10 grid grid-cols-4 gap-1 px-2"
          onPointerDown={(e) => e.stopPropagation()}
        >
          {desktopEntries.map((en) => (
            <DesktopIcon key={en.id} entry={en} active={selected === en.id} onOpen={openApp} />
          ))}
        </div>
      ) : (
        <div className="pointer-events-none absolute inset-0 z-10 [&>*]:pointer-events-auto">
          {desktopEntries.map((en) =>
            iconPos[en.id] ? (
              <DesktopIcon
                key={en.id}
                entry={en}
                active={selected === en.id}
                onOpen={openApp}
                pos={iconPos[en.id]}
                onMove={moveIcon}
              />
            ) : null
          )}
        </div>
      )}

      {/* Windows — isolated stacking context so they never cover the header/taskbar */}
      <div className="pointer-events-none absolute inset-0 z-20" style={{ isolation: "isolate" }}>
        {wins.map((w) => {
          const app = appById(w.id);
          const folder = folderById(w.id);
          if (!app && !folder) return null;
          return (
            <Window
              key={w.id}
              win={w}
              title={(app?.title ?? folder?.title) as string}
              icon={(app?.icon ?? folder?.icon) as string}
              accent={(app?.accent ?? folder?.accent) as string}
              focused={activeId === w.id}
              isMobile={isMobile}
              onFocus={focusWin}
              onClose={closeWin}
              onMinimize={minimizeWin}
              onToggleMax={toggleMax}
              onMove={moveWin}
            >
              {folder ? (
                <FolderBody folder={folder} onOpen={openApp} />
              ) : (
                <WindowBody app={app!} onOpen={openApp} />
              )}
            </Window>
          );
        })}
      </div>

      {/* Taskbar */}
      <Taskbar wins={wins} activeId={activeId} onOpen={openApp} onTaskClick={taskClick} />
    </div>
    </LangContext.Provider>
  );
}

function TopLink({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-md px-2 py-1 font-mono text-[11px] font-bold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
    >
      {label}
    </button>
  );
}

function LangToggle({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  return (
    <div className="ml-1 flex items-center gap-0.5 rounded-md border border-white/15 bg-white/5 p-0.5">
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => onChange(l.code)}
          aria-pressed={lang === l.code}
          className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold transition-colors ${
            lang === l.code ? "bg-anchor-blue text-white" : "text-white/55 hover:text-white"
          }`}
        >
          {l.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
