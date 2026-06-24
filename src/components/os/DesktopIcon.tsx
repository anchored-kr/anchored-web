"use client";

import { useRef, type PointerEvent } from "react";
import type { DesktopApp } from "@/data/desktopItems";
import { statusLabel, statusColor } from "@/data/desktopItems";

interface DesktopIconProps {
  app: DesktopApp;
  active: boolean;
  onOpen: (id: string) => void;
  /** Free position (desktop). When set, the icon is absolutely placed and draggable. */
  pos?: { x: number; y: number };
  onMove?: (id: string, x: number, y: number) => void;
}

/**
 * A desktop icon. In the mobile grid it's a plain click-to-open button; on desktop
 * (when `pos`/`onMove` are provided) it's absolutely positioned and drag-to-move,
 * opening only on a click that didn't drag.
 */
export function DesktopIcon({ app, active, onOpen, pos, onMove }: DesktopIconProps) {
  const drag = useRef<{ sx: number; sy: number; ox: number; oy: number; moved: boolean } | null>(null);
  const draggable = !!pos && !!onMove;

  const onPointerDown = (e: PointerEvent<HTMLButtonElement>) => {
    if (!draggable || !pos) return;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
    drag.current = { sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y, moved: false };
  };
  const onPointerMove = (e: PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d || !onMove) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (!d.moved && Math.hypot(dx, dy) > 4) d.moved = true;
    if (d.moved) {
      const nx = Math.max(0, Math.min(d.ox + dx, window.innerWidth - 84));
      const ny = Math.max(44, Math.min(d.oy + dy, window.innerHeight - 92));
      onMove(app.id, nx, ny);
    }
  };
  const onPointerUp = (e: PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    drag.current = null;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
    if (draggable && d && !d.moved) onOpen(app.id);
  };

  return (
    <button
      onClick={() => { if (!draggable) onOpen(app.id); }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      title={app.title}
      style={draggable && pos ? { position: "absolute", left: pos.x, top: pos.y, touchAction: "none", zIndex: active ? 6 : 2 } : undefined}
      className="group flex w-[84px] flex-col items-center gap-1.5 rounded-lg p-2 text-center outline-none"
    >
      <span
        className={`relative grid h-[52px] w-[52px] place-items-center rounded-[14px] border-[2.5px] border-os-ink text-[26px] transition-transform group-hover:-translate-y-0.5 group-active:translate-y-0 ${
          active ? "bg-white" : "bg-os-cream"
        }`}
        style={{ boxShadow: "3px 3px 0 0 rgba(8,22,43,0.85)" }}
      >
        {app.icon}
        {app.status && (
          <span
            className="absolute -right-1.5 -top-1.5 rounded-full border-[2px] border-os-ink px-1 font-mono text-[7px] font-bold leading-[1.5] text-white"
            style={{ background: statusColor[app.status] }}
          >
            {statusLabel[app.status]}
          </span>
        )}
      </span>
      <span
        className={`max-w-full rounded px-1 font-mono text-[11px] font-semibold leading-tight ${
          active ? "bg-anchor-blue text-white" : "text-white/95"
        }`}
        style={active ? {} : { textShadow: "0 1px 3px rgba(0,0,0,0.7)" }}
      >
        {app.title}
      </span>
    </button>
  );
}
