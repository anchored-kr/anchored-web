"use client";

import { useRef, type PointerEvent } from "react";
import type { AppStatus } from "@/data/desktopItems";
import { statusLabel, statusColor } from "@/data/desktopItems";

/** A desktop tile — a single app, or a folder (when `isFolder` is set). */
export interface DeskEntry {
  id: string;
  title: string;
  icon: string;
  status?: AppStatus;
  /** renders a manila folder glyph with the emoji on its front */
  isFolder?: boolean;
  count?: number;
}

/** Chunky retro manila folder (tab + body), stroked in os-ink. */
export function FolderGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 46" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M4.5 9.5 a4 4 0 0 1 4 -4 h13 l5 5.5 h20.5 a4 4 0 0 1 4 4 v22 a4 4 0 0 1 -4 4 h-39 a4 4 0 0 1 -4 -4 Z"
        fill="#f2cf6e"
        stroke="#0d1b30"
        strokeWidth="2.5"
      />
      <path
        d="M4.5 17 h46.5 v19.5 a4 4 0 0 1 -4 4 h-39 a4 4 0 0 1 -4 -4 Z"
        fill="#f8dd8d"
        stroke="#0d1b30"
        strokeWidth="2.5"
      />
    </svg>
  );
}

interface DesktopIconProps {
  entry: DeskEntry;
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
export function DesktopIcon({ entry, active, onOpen, pos, onMove }: DesktopIconProps) {
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
      const ny = Math.max(60, Math.min(d.oy + dy, window.innerHeight - 92));
      onMove(entry.id, nx, ny);
    }
  };
  const onPointerUp = (e: PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    drag.current = null;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
    if (draggable && d && !d.moved) onOpen(entry.id);
  };

  return (
    <button
      onClick={() => { if (!draggable) onOpen(entry.id); }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      title={entry.title}
      style={draggable && pos ? { position: "absolute", left: pos.x, top: pos.y, touchAction: "none", zIndex: active ? 6 : 2 } : undefined}
      className="group flex w-[84px] flex-col items-center gap-1.5 rounded-lg p-2 text-center outline-none"
    >
      {entry.isFolder ? (
        <span
          className="relative grid h-[52px] w-[58px] place-items-center transition-transform group-hover:-translate-y-0.5 group-active:translate-y-0"
          style={{ filter: "drop-shadow(3px 3px 0 rgba(8,22,43,0.85))" }}
        >
          <FolderGlyph className="absolute inset-x-0 top-[3px] h-[46px] w-full" />
          <span className="relative mt-[10px] text-[17px] leading-none">{entry.icon}</span>
          {typeof entry.count === "number" && (
            <span className="absolute -bottom-0.5 -right-0.5 grid h-[17px] min-w-[17px] place-items-center rounded-full border-[2px] border-os-ink bg-anchor-blue px-0.5 font-mono text-[8.5px] font-bold leading-none text-white">
              {entry.count}
            </span>
          )}
        </span>
      ) : (
        <span
          className={`relative grid h-[52px] w-[52px] place-items-center rounded-[14px] border-[2.5px] border-os-ink text-[26px] transition-transform group-hover:-translate-y-0.5 group-active:translate-y-0 ${
            active ? "bg-white" : "bg-os-cream"
          }`}
          style={{ boxShadow: "3px 3px 0 0 rgba(8,22,43,0.85)" }}
        >
          {entry.icon}
          {entry.status && (
            <span
              className="absolute -right-1.5 -top-1.5 rounded-full border-[2px] border-os-ink px-1 font-mono text-[7px] font-bold leading-[1.5] text-white"
              style={{ background: statusColor[entry.status] }}
            >
              {statusLabel[entry.status]}
            </span>
          )}
        </span>
      )}
      <span
        className={`max-w-full rounded px-1 font-mono text-[11px] font-semibold leading-tight ${
          active ? "bg-anchor-blue text-white" : "text-white/95"
        }`}
        style={active ? {} : { textShadow: "0 1px 3px rgba(0,0,0,0.7)" }}
      >
        {entry.title}
      </span>
    </button>
  );
}
