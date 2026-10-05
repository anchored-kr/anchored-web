"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState, type ReactNode } from "react";
import { useLang } from "@/components/os/LangContext";
import { t } from "@/data/i18n";
import { ui4 } from "@/data/v4";
import { Clock, LangSwitch, Pill, ThemeToggle } from "./controls";
import { V4Root } from "./Root";
import { ProductionStack } from "./Stack";

type View = "list" | "content";

function Sidebar({ asideRef, view, setView }: { asideRef: React.RefObject<HTMLElement | null>; view: View; setView: (v: View) => void }) {
  const lang = useLang();
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  return (
    <aside ref={asideRef} className="v4-noscroll px-2 lg:fixed lg:inset-y-0 lg:left-0 lg:z-20 lg:w-[395px] lg:overflow-y-auto lg:pr-0">
      <div className="flex items-center justify-between gap-2 pt-2">
        <Pill href="/all">{t(ui4.showAll, lang)}</Pill>
        <div className="flex items-center gap-1.5">
          <LangSwitch />
          <ThemeToggle />
        </div>
      </div>

      <div className="flex flex-col items-center pb-[72px] pt-[76px] text-center lg:pb-[80px]">
        <Link href="/" aria-label="Anchored — home" className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/B_anchored_signature_h_eng.png" alt="Anchored" className="v4-logo h-[24px] w-auto" />
        </Link>
        <Clock className="mt-[44px] text-[22px] leading-[1.25] text-v-fg" />
      </div>

      {/* mobile: tabs / show less (desktop shows both columns at once) */}
      <div className="mb-2 lg:hidden">
        {view === "list" ? (
          <div className="grid grid-cols-2 gap-2">
            <Link href="/about" className="rounded-[10px] bg-v-card px-3 py-3 text-v-fg">{t(ui4.about, lang)}</Link>
            <button
              type="button"
              className="rounded-[10px] bg-v-card px-3 py-3 text-left text-v-fg"
              onClick={() => {
                if (!isHome) router.push("/");
                setView("content");
                window.scrollTo({ top: 0 });
              }}
            >
              {t(ui4.updates, lang)}
            </button>
          </div>
        ) : (
          <div className="flex justify-end">
            <Pill onClick={() => { setView("list"); window.scrollTo({ top: 0 }); }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.5 8 6 4.5 9.5 8" /></svg>
              {t(ui4.showLess, lang)}
            </Pill>
          </div>
        )}
      </div>

      <div className={view === "content" ? "hidden lg:block" : ""}>
        <ProductionStack scrollerRef={asideRef} />
      </div>
    </aside>
  );
}

/** Porto Rocha-style shell: fixed sidebar (wordmark, Seoul clock, stacked project cards) + main column. */
export function Shell({ children }: { children: ReactNode }) {
  const asideRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [override, setOverride] = useState<{ path: string; view: View } | null>(null);
  const view: View = override && override.path === pathname ? override.view : pathname === "/" ? "list" : "content";
  // "Studio updates" from a sub-page opens the home feed; everything else applies to the current page.
  const setView = (v: View) => setOverride(v === "content" && pathname !== "/" ? { path: "/", view: v } : { path: pathname, view: v });

  return (
    <V4Root>
      <Sidebar asideRef={asideRef} view={view} setView={setView} />
      <main className={`px-2 pb-2 lg:ml-[395px] lg:pt-2 ${view === "list" ? "hidden lg:block" : ""}`}>{children}</main>
    </V4Root>
  );
}
