"use client";

import { useEffect, useId, useRef, type ReactNode, type PointerEvent } from "react";
import { useLang } from "./LangContext";
import { t, ui } from "@/data/i18n";

/** Height of the fixed top bar (h-14) plus a small gap — windows never cover it. */
const HEADER_CLEAR = 60;
/** Taskbar height (46) plus breathing room — windows never sit under it. */
const TASKBAR_CLEAR = 58;

const isDesktopViewport = () =>
  typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;

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
  onFocus: (id: string) => void;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onToggleMax: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  children: ReactNode;
}

/**
 * A draggable, retro-OS window. Chrome only — content comes from children.
 *
 * Sizing/placement is CSS-driven: desktop values come from inline styles, and the
 * `.os-window` rules in globals.css override them below `md` so the window becomes
 * a bottom sheet. That keeps the first paint correct without a JS `isMobile` flag.
 */
export function Window({
  win, title, icon, accent, focused,
  onFocus, onClose, onMinimize, onToggleMax, onMove, children,
}: WindowProps) {
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const lang = useLang();
  const titleId = useId();

  // Move focus into the window when it opens, so keyboard users land inside it
  // and Escape/Tab operate on the right surface.
  useEffect(() => {
    frameRef.current?.focus({ preventScroll: true });
  }, []);

  const startDrag = (e: PointerEvent<HTMLDivElement>) => {
    onFocus(win.id);
    if (win.maximized || !isDesktopViewport()) return;
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

  // Desktop geometry. Position and height are clamped in CSS against the live
  // viewport, so a cascaded window can never land off-screen or under the taskbar
  // — and it stays correct on resize and during server rendering, where JS has no
  // width to measure.
  const positioned: React.CSSProperties = win.maximized
    ? { left: 12, right: 12, top: HEADER_CLEAR + 2, bottom: 54, width: "auto", zIndex: win.z }
    : {
        left: `clamp(12px, ${win.x}px, max(12px, calc(100dvw - ${win.w}px - 12px)))`,
        top: `clamp(${HEADER_CLEAR}px, ${win.y}px, max(${HEADER_CLEAR}px, calc(100dvh - 180px)))`,
        width: `min(${win.w}px, calc(100dvw - 24px))`,
        zIndex: win.z,
        maxHeight: `min(640px, calc(100dvh - ${win.y}px - ${TASKBAR_CLEAR}px))`,
      };

  const maxLabel = t(win.maximized ? ui.winRestore : ui.winMaximize, lang);

  return (
    <div
      ref={frameRef}
      role="dialog"
      aria-labelledby={titleId}
      tabIndex={-1}
      className="os-window win-pop pointer-events-auto absolute flex flex-col overflow-hidden rounded-[10px] border-[2.5px] border-os-ink bg-os-cream outline-none"
      style={{
        ...positioned,
        boxShadow: focused
          ? "7px 7px 0 0 rgba(8,22,43,0.92), 0 24px 48px -16px rgba(2,10,26,0.55)"
          : "4px 4px 0 0 rgba(8,22,43,0.55), 0 16px 32px -18px rgba(2,10,26,0.4)",
      }}
      onPointerDown={() => onFocus(win.id)}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          onClose(win.id);
        }
      }}
    >
      {/* ── Title bar ── */}
      <div
        onPointerDown={startDrag}
        onPointerMove={onDrag}
        onPointerUp={endDrag}
        onDoubleClick={() => isDesktopViewport() && onToggleMax(win.id)}
        className="os-window-bar flex h-9 shrink-0 select-none items-center gap-2 border-b-[2.5px] border-os-ink px-2.5"
        style={{
          backgroundColor: focused ? accent : "#c9c7bb",
          backgroundImage: focused
            ? `linear-gradient(180deg, color-mix(in srgb, ${accent} 78%, #ffffff) 0%, ${accent} 55%)`
            : "repeating-linear-gradient(0deg, rgba(255,255,255,0.35) 0 1px, transparent 1px 4px)",
          boxShadow: focused ? "inset 0 1px 0 rgba(255,255,255,0.25)" : undefined,
          touchAction: "none",
        }}
      >
        <span aria-hidden="true" className="text-[13px] leading-none">{icon}</span>
        <span
          id={titleId}
          className="truncate font-mono text-[12px] font-bold tracking-tight"
          style={{ color: focused ? "#fff" : "#3f3f3a", textShadow: focused ? "0 1px 0 rgba(8,22,43,0.35)" : undefined }}
        >
          {title}
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <TitleBtn glyph="–" label={t(ui.winMinimize, lang)} onClick={() => onMinimize(win.id)} />
          <TitleBtn
            glyph={win.maximized ? "❐" : "□"}
            label={maxLabel}
            className="hidden md:grid"
            onClick={() => onToggleMax(win.id)}
          />
          <TitleBtn glyph="✕" label={t(ui.winClose, lang)} danger onClick={() => onClose(win.id)} />
        </div>
      </div>

      {/* ── Body ── */}
      <div className="os-scroll flex-1 overflow-y-auto overscroll-contain">{children}</div>
    </div>
  );
}

function TitleBtn({
  glyph, label, onClick, danger, className = "",
}: {
  glyph: string;
  label: string;
  onClick: () => void;
  danger?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onPointerDown={(e) => e.stopPropagation()}
      className={`grid h-[18px] w-[18px] place-items-center rounded-[4px] border-[1.5px] border-os-ink text-[10px] font-bold leading-none transition-transform active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-os-ink ${
        danger ? "bg-[#ff6a5a] text-os-ink hover:bg-[#ff5040]" : "bg-os-cream text-os-ink hover:bg-white"
      } ${className}`}
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true">{glyph}</span>
    </button>
  );
}
