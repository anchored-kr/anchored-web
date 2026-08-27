"use client";

import type { DeskFolder } from "@/data/desktopItems";
import { appById, statusLabel, statusColor, type DesktopApp } from "@/data/desktopItems";
import { useLang } from "./LangContext";
import { t } from "@/data/i18n";

/** Contents of a folder window — a grid of app launchers. */
export function FolderBody({ folder, onOpen }: { folder: DeskFolder; onOpen: (id: string) => void }) {
  const lang = useLang();
  const items = folder.children.map(appById).filter(Boolean) as DesktopApp[];

  return (
    <div className="p-4 sm:p-5">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {items.map((a) => (
          <button
            key={a.id}
            onClick={() => onOpen(a.id)}
            className="group flex flex-col items-center gap-1.5 rounded-lg border-2 border-transparent p-3 text-center transition-all hover:border-os-ink hover:bg-white"
          >
            <span
              className="relative grid h-12 w-12 place-items-center rounded-[12px] border-[2.5px] border-os-ink bg-os-cream text-[24px] transition-transform group-hover:-translate-y-0.5"
              style={{ boxShadow: "2.5px 2.5px 0 0 rgba(8,22,43,0.8)" }}
            >
              {a.icon}
              {a.status && (
                <span
                  className="absolute -right-1.5 -top-1.5 rounded-full border-[2px] border-os-ink px-1 font-mono text-[7px] font-bold leading-[1.5] text-white"
                  style={{ background: statusColor[a.status] }}
                >
                  {statusLabel[a.status]}
                </span>
              )}
            </span>
            <span className="font-mono text-[10.5px] font-bold leading-tight text-os-ink">{a.title}</span>
            {a.tagline && (
              <span className="line-clamp-2 text-[9.5px] leading-snug text-os-ink/55">{t(a.tagline, lang)}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
