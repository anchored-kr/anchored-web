"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { apps, projectApps, appById, type DesktopApp } from "@/data/desktopItems";
import { AnchorLogo } from "@/components/anchor-logo";
import { DesktopIcon } from "./DesktopIcon";
import { Taskbar } from "./Taskbar";
import { Window, type WinState } from "./Window";
import { WindowBody } from "./WindowBody";

const DEFAULT_W = 560;

/** Anchored OS — desktop window manager. Orchestrates state; rendering lives in children. */
export function Desktop() {
  const [wins, setWins] = useState<WinState[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
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
      const w = Math.min(DEFAULT_W, vw - 32);
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

  // Open the welcome window on mount. openApp focuses (not duplicates) if already open,
  // so this stays correct under React StrictMode's double-invoked effects.
  useEffect(() => {
    openApp("about");
  }, [openApp]);

  const systemApps = apps.filter((a) => a.group === "system");

  return (
    <div className="anchor-wall fixed inset-0 overflow-hidden font-sans" onPointerDown={() => setSelected(null)}>
      {/* Wallpaper watermark */}
      <AnchorLogo className="pointer-events-none absolute left-1/2 top-1/2 h-[58vmin] w-[58vmin] -translate-x-1/2 -translate-y-1/2 text-white/[0.04]" />

      {/* Top bar */}
      <div className="absolute inset-x-0 top-0 z-30 flex h-10 items-center justify-between border-b border-white/10 bg-anchor-night/40 px-3 backdrop-blur-sm">
        <button onClick={(e) => { e.stopPropagation(); openApp("about"); }} className="flex items-center gap-2">
          <AnchorLogo className="h-4 w-4 text-white" />
          <span className="font-mono text-[12px] font-extrabold tracking-tight text-white">Anchored</span>
          <span className="hidden font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/45 sm:inline">Roblox IP Agency</span>
        </button>
        <div className="flex items-center gap-1.5">
          <TopLink label="Services" onClick={() => openApp("services")} />
          <TopLink label="Contact" onClick={() => openApp("contact")} />
          <a href="https://github.com/anchored-kr" target="_blank" rel="noopener noreferrer">
            <TopLink label="GitHub ↗" />
          </a>
        </div>
      </div>

      {/* Desktop icons */}
      <div
        className="absolute left-0 right-0 top-12 z-10 grid grid-cols-4 gap-x-1 gap-y-1 px-2 sm:right-auto sm:flex sm:max-h-[calc(100dvh-118px)] sm:flex-col sm:flex-wrap sm:content-start sm:gap-0 sm:px-1.5"
        onPointerDown={(e) => e.stopPropagation()}
      >
        {systemApps.map((a) => (
          <DesktopIcon key={a.id} app={a} active={selected === a.id} onOpen={openApp} />
        ))}
        {projectApps.map((a) => (
          <DesktopIcon key={a.id} app={a} active={selected === a.id} onOpen={openApp} />
        ))}
      </div>

      {/* Windows */}
      {wins.map((w) => {
        const app = appById(w.id) as DesktopApp;
        return (
          <Window
            key={w.id}
            win={w}
            title={app.title}
            icon={app.icon}
            accent={app.accent}
            focused={activeId === w.id}
            isMobile={isMobile}
            onFocus={focusWin}
            onClose={closeWin}
            onMinimize={minimizeWin}
            onToggleMax={toggleMax}
            onMove={moveWin}
          >
            <WindowBody app={app} onOpen={openApp} />
          </Window>
        );
      })}

      {/* Taskbar */}
      <Taskbar wins={wins} activeId={activeId} onOpen={openApp} onTaskClick={taskClick} />
    </div>
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
