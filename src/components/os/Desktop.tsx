"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { apps, appById, folders, folderById } from "@/data/desktopItems";
import { LangContext } from "./LangContext";
import { LANGS, htmlLang, isLang, t, ui, type Lang } from "@/data/i18n";
import { DesktopIcon, type DeskEntry } from "./DesktopIcon";
import { Taskbar } from "./Taskbar";
import { Window, type WinState } from "./Window";
import { WindowBody } from "./WindowBody";
import { FolderBody } from "./FolderBody";
import { HarborScene } from "./HarborScene";
import { AnchorLogo } from "@/components/anchor-logo";
import { createLocalStore, useLocalStore } from "./persist";

const DEFAULT_W = 540;
const FOLDER_W = 470;
/** Left edge reserved for the icon columns, so opened windows never cover them. */
const ICON_GUTTER = 500;

/** What sits on the desktop: system apps as-is, portfolio grouped into folders. */
const desktopEntries: DeskEntry[] = [
  ...apps
    .filter((a) => a.group === "system")
    .map((a) => ({ id: a.id, title: a.title, icon: a.icon, status: a.status })),
  ...folders.map((f) => ({
    id: f.id,
    title: f.title,
    icon: f.icon,
    isFolder: true,
    count: f.children.length,
  })),
];

/** Deterministic icon grid: row 1 system apps, row 2 folders. Computed at module
 *  scope so the server and the first client render agree (saved positions are
 *  layered on top by the store, which returns {} until localStorage is read). */
const defaultIconPos: Record<string, { x: number; y: number }> = (() => {
  const out: Record<string, { x: number; y: number }> = {};
  let sys = 0;
  let fold = 0;
  for (const en of desktopEntries) {
    if (en.isFolder) {
      out[en.id] = { x: 12 + fold * 94, y: 164 };
      fold += 1;
    } else {
      out[en.id] = { x: 12 + sys * 94, y: 68 };
      sys += 1;
    }
  }
  return out;
})();

type IconPos = Record<string, { x: number; y: number }>;

const langStore = createLocalStore<Lang>("anchored:lang", "ko", (v) => (isLang(v) ? v : null));

/** Icon-position storage key — bump to force a fresh default layout for everyone. */
const iconPosStore = createLocalStore<IconPos>("anchored:iconpos2", {}, (v) => {
  if (typeof v !== "object" || v == null) return null;
  const out: IconPos = {};
  for (const [k, p] of Object.entries(v as Record<string, unknown>)) {
    const q = p as { x?: unknown; y?: unknown };
    if (typeof q?.x === "number" && typeof q?.y === "number") out[k] = { x: q.x, y: q.y };
  }
  return out;
});

/** The welcome window, open from the very first render so crawlers and no-JS
 *  visitors see the pitch, and so nothing has to be opened from an effect. */
const INITIAL_WINS: WinState[] = [
  { id: "about", z: 10, x: ICON_GUTTER + 20, y: 76, w: DEFAULT_W, minimized: false, maximized: false },
];

/** Anchored OS — desktop window manager. Orchestrates state; rendering lives in children. */
export function Desktop() {
  const [wins, setWins] = useState<WinState[]>(INITIAL_WINS);
  const [activeId, setActiveId] = useState<string | null>("about");
  const [selected, setSelected] = useState<string | null>(null);
  const topZ = useRef(10);
  const opened = useRef(1);

  const lang = useLocalStore(langStore);
  const savedIconPos = useLocalStore(iconPosStore);
  const iconPos: IconPos = { ...defaultIconPos, ...savedIconPos };

  // Lock body scroll while the desktop owns the viewport.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Keep the document language in sync with the toggle, for screen readers,
  // hyphenation and translation tools.
  useEffect(() => {
    document.documentElement.lang = htmlLang[lang];
  }, [lang]);

  const changeLang = useCallback((l: Lang) => langStore.set(l), []);

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
      const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
      const base = folderById(id) ? FOLDER_W : DEFAULT_W;
      const w = Math.min(base, vw - 32);
      const step = opened.current % 6;
      opened.current += 1;
      // Start right of the icon columns and cascade; Window clamps both axes in CSS
      // so a window can never land under the taskbar or off-screen.
      const x = Math.max(20, Math.min(ICON_GUTTER + 20, vw - w - 20)) + step * 30;
      const y = 76 + step * 26;
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
    iconPosStore.set({ ...iconPosStore.get(), [id]: { x, y } });
  }, []);

  return (
    <LangContext.Provider value={lang}>
    <div className="anchor-wall fixed inset-0 overflow-hidden font-sans" onPointerDown={() => setSelected(null)}>
      {/* Pacific backdrop: the whole desktop is open sea — depth shading, waves & one sailboat */}
      <div className="anchor-sea" />
      <HarborScene />

      {/* Top bar */}
      <header
        className="absolute inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-white/10 px-4 backdrop-blur-md"
        style={{
          background: "linear-gradient(180deg, rgba(4,17,36,0.88), rgba(4,17,36,0.45))",
          boxShadow: "0 1px 0 rgba(0,114,206,0.35)",
        }}
      >
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); openApp("about"); }}
          className="flex items-center gap-2.5 rounded-md px-1 py-1 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <AnchorLogo className="h-[22px] w-[22px]" />
          <span className="font-mono text-[15px] font-extrabold uppercase tracking-[0.16em]">Anchored</span>
          <span className="hidden font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/70 sm:inline">
            {t(ui.agencyTag, lang)}
          </span>
        </button>
        <nav aria-label="Anchored" className="flex items-center gap-1.5">
          <TopLink label={t(ui.navServices, lang)} onClick={() => openApp("services")} />
          <TopLink label={t(ui.navContact, lang)} onClick={() => openApp("contact")} />
          <LangToggle lang={lang} onChange={changeLang} />
        </nav>
      </header>

      {/* Desktop icons. Both layouts render; CSS picks one, so the first paint is
          already correct (no post-hydration jump). */}
      <div
        className="absolute inset-x-0 top-[64px] z-10 grid grid-cols-4 gap-1 px-2 md:hidden"
        onPointerDown={(e) => e.stopPropagation()}
        aria-label={t(ui.desktopIcons, lang)}
      >
        {desktopEntries.map((en) => (
          <DesktopIcon key={en.id} entry={en} active={selected === en.id} onOpen={openApp} />
        ))}
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-10 hidden md:block [&>*]:pointer-events-auto"
        aria-label={t(ui.desktopIcons, lang)}
      >
        {desktopEntries.map((en) => (
          <DesktopIcon
            key={en.id}
            entry={en}
            active={selected === en.id}
            onOpen={openApp}
            pos={iconPos[en.id]}
            onMove={moveIcon}
          />
        ))}
      </div>

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
      type="button"
      onClick={onClick}
      className="rounded-md px-2 py-1 font-mono text-[11px] font-bold text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {label}
    </button>
  );
}

function LangToggle({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  return (
    <div
      role="group"
      aria-label={t(ui.langLabel, lang)}
      className="ml-1 flex items-center gap-0.5 rounded-md border border-white/15 bg-white/5 p-0.5"
    >
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => onChange(l.code)}
          aria-pressed={lang === l.code}
          lang={htmlLang[l.code]}
          className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white ${
            lang === l.code ? "bg-anchor-blue text-white" : "text-white/70 hover:text-white"
          }`}
        >
          {l.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
