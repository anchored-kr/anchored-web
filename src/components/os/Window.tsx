"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";

/** Height of the fixed top bar (h-14) plus a small gap — windows never cover it. */
const HEADER_CLEAR = 60;

export interface WinState {
  id: string;
  z: number;
  x: number;
  y: number;
  w: number;
  minimized: boolean;
  maximized: boolean;
}

interface WindowProps {
  win: WinState;
  title: string;
  icon: string;
  accent: string;
  focused: boolean;
  isMobile: boolean;
  onFocus: (id: string) => void;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onToggleMax: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  children: ReactNode;
}

/** A draggable, retro-OS window. Chrome only — content comes from children. */
export function Window({
  win, title, icon, accent, focused, isMobile,
  onFocus, onClose, onMinimize, onToggleMax, onMove, children,
}: WindowProps) {
  const drag = useRef<{ dx: number; dy: number } | null>(null);

  const startDrag = (e: PointerEvent<HTMLDivElement>) => {
    onFocus(win.id);
    if (isMobile || win.maximized) return;
    drag.current = { dx: e.clientX - win.x, dy: e.clientY - win.y };
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
  };
  const onDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const nx = Math.min(Math.max(e.clientX - drag.current.dx, -win.w + 120), vw - 120);
    // Keep the title bar below the fixed header and above the taskbar.
    const ny = Math.min(Math.max(e.clientY - drag.current.dy, HEADER_CLEAR), vh - 96);
    onMove(win.id, nx, ny);
  };
  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    drag.current = null;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
  };

  if (win.minimized) return null;

  const positioned: React.CSSProperties =
    isMobile
      ? { left: 8, right: 8, top: 72, bottom: 64, width: "auto", zIndex: win.z }
      : win.maximized
        ? { left: 12, right: 12, top: HEADER_CLEAR + 2, bottom: 54, width: "auto", zIndex: win.z }
        : { left: win.x, top: win.y, width: win.w, zIndex: win.z };

  return (
    <div
      className="win-pop pointer-events-auto absolute flex flex-col rounded-[10px] border-[2.5px] border-os-ink bg-os-cream overflow-hidden"
      style={{
        ...positioned,
        boxShadow: focused
          ? "7px 7px 0 0 rgba(8,22,43,0.92), 0 24px 48px -16px rgba(2,10,26,0.55)"
          : "4px 4px 0 0 rgba(8,22,43,0.55), 0 16px 32px -18px rgba(2,10,26,0.4)",
        maxHeight: isMobile || win.maximized ? undefined : "min(80vh, 640px)",
      }}
      onPointerDown={() => onFocus(win.id)}
    >
      {/* ── Title bar ── */}
      <div
        onPointerDown={startDrag}
        onPointerMove={onDrag}
        onPointerUp={endDrag}
        onDoubleClick={() => !isMobile && onToggleMax(win.id)}
        className="flex items-center gap-2 px-2.5 h-9 shrink-0 select-none border-b-[2.5px] border-os-ink"
        style={{
          backgroundColor: focused ? accent : "#c9c7bb",
          backgroundImage: focused
            ? `linear-gradient(180deg, color-mix(in srgb, ${accent} 78%, #ffffff) 0%, ${accent} 55%)`
            : "repeating-linear-gradient(0deg, rgba(255,255,255,0.35) 0 1px, transparent 1px 4px)",
          boxShadow: focused ? "inset 0 1px 0 rgba(255,255,255,0.25)" : undefined,
          cursor: isMobile || win.maximized ? "default" : "grab",
          touchAction: "none",
        }}
      >
        <span className="text-[13px] leading-none">{icon}</span>
        <span
          className="font-mono text-[12px] font-bold tracking-tight truncate"
          style={{ color: focused ? "#fff" : "#4a4a44", textShadow: focused ? "0 1px 0 rgba(8,22,43,0.35)" : undefined }}
        >
          {title}
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <TitleBtn label="–" onClick={() => onMinimize(win.id)} />
          {!isMobile && (
            <TitleBtn label={win.maximized ? "❐" : "□"} onClick={() => onToggleMax(win.id)} />
          )}
          <TitleBtn label="✕" danger onClick={() => onClose(win.id)} />
        </div>
      </div>

      {/* ── Body ── */}
      <div className="os-scroll flex-1 overflow-y-auto overscroll-contain">{children}</div>
    </div>
  );
}

function TitleBtn({ label, onClick, danger }: { label: string; onClick: () => void; danger?: boolean }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onPointerDown={(e) => e.stopPropagation()}
      className={`grid place-items-center w-[18px] h-[18px] rounded-[4px] border-[1.5px] border-os-ink text-[10px] font-bold leading-none transition-transform active:translate-y-px ${
        danger ? "bg-[#ff6a5a] text-os-ink hover:bg-[#ff5040]" : "bg-os-cream text-os-ink hover:bg-white"
      }`}
      aria-label={label}
    >
      {label}
    </button>
  );
}
