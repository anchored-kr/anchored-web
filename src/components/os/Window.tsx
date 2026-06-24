"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";

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
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const nx = Math.min(Math.max(e.clientX - drag.current.dx, -win.w + 120), vw - 120);
    const ny = Math.min(Math.max(e.clientY - drag.current.dy, 0), vh - 96);
    onMove(win.id, nx, ny);
  };
  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    drag.current = null;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
  };

  if (win.minimized) return null;

  const positioned: React.CSSProperties =
    isMobile
      ? { left: 8, right: 8, top: 56, bottom: 64, width: "auto", zIndex: win.z }
      : win.maximized
        ? { left: 12, right: 12, top: 12, bottom: 60, width: "auto", zIndex: win.z }
        : { left: win.x, top: win.y, width: win.w, zIndex: win.z };

  return (
    <div
      className="absolute flex flex-col rounded-[10px] border-[2.5px] border-os-ink bg-os-cream overflow-hidden"
      style={{
        ...positioned,
        boxShadow: focused
          ? "7px 7px 0 0 rgba(8,22,43,0.92)"
          : "4px 4px 0 0 rgba(8,22,43,0.55)",
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
          background: focused
            ? `linear-gradient(${accent}, ${accent})`
            : "#c9c7bb",
          cursor: isMobile || win.maximized ? "default" : "grab",
          touchAction: "none",
        }}
      >
        <span className="text-[13px] leading-none">{icon}</span>
        <span
          className="font-mono text-[12px] font-bold tracking-tight truncate"
          style={{ color: focused ? "#fff" : "#4a4a44" }}
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
