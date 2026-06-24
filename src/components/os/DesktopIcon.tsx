"use client";

import type { DesktopApp } from "@/data/desktopItems";
import { statusLabel, statusColor } from "@/data/desktopItems";

interface DesktopIconProps {
  app: DesktopApp;
  active: boolean;
  onOpen: (id: string) => void;
}

/** A single clickable icon on the desktop wallpaper. Click opens its window. */
export function DesktopIcon({ app, active, onOpen }: DesktopIconProps) {
  return (
    <button
      onClick={() => onOpen(app.id)}
      className="group flex w-[88px] flex-col items-center gap-1.5 rounded-lg p-2 text-center outline-none sm:w-[84px]"
      title={app.title}
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
