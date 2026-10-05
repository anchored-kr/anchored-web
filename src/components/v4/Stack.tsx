"use client";

import Link from "next/link";
import { useEffect, useRef, type RefObject } from "react";
import { useLang } from "@/components/os/LangContext";
import { t } from "@/data/i18n";
import { productions, ui4 } from "@/data/v4";
import { AppIcon } from "./icons";

/**
 * Sidebar card list with the iOS-notification stack: cards that would fall below the
 * visible edge are scaled down and pinned at the bottom, each peeking out a little.
 * Desktop: relative to the fixed sidebar scroller. Mobile: relative to the window.
 */
export function ProductionStack({ scrollerRef, withAbout = true }: { scrollerRef: RefObject<HTMLElement | null>; withAbout?: boolean }) {
  const lang = useLang();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    let raf = 0;
    const update = () => {
      raf = 0;
      const aside = scrollerRef.current;
      const bottom = mq.matches && aside ? aside.getBoundingClientRect().bottom : window.innerHeight;
      const limit = bottom - 56;
      list.querySelectorAll<HTMLElement>("[data-stack]").forEach((wrap) => {
        const card = wrap.firstElementChild as HTMLElement | null;
        if (!card) return;
        const r = wrap.getBoundingClientRect();
        const over = r.bottom - limit;
        if (r.height === 0 || over <= 0) {
          card.style.transform = "";
          card.style.opacity = "";
          card.style.pointerEvents = "";
          return;
        }
        const k = over / (r.height + 8);
        const s = Math.max(0.5, 1 - 0.2 * k);
        const target = limit + 21 * Math.min(k, 2);
        const ty = target - s * r.height - r.top;
        const op = k <= 1.3 ? 1 : Math.max(0, 1 - (k - 1.3) / 0.9);
        card.style.transform = `translate3d(0, ${ty.toFixed(1)}px, 0) scale(${s.toFixed(4)})`;
        card.style.opacity = op.toFixed(3);
        card.style.pointerEvents = op < 0.6 ? "none" : "";
      });
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const aside = scrollerRef.current;
    aside?.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    mq.addEventListener("change", schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(list);
    schedule();
    return () => {
      aside?.removeEventListener("scroll", schedule);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mq.removeEventListener("change", schedule);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scrollerRef]);

  const n = productions.length + 1;
  return (
    <nav ref={listRef} className="flex flex-col gap-2 pb-[72px]" aria-label="Projects">
      {withAbout && (
        <div data-stack className="relative hidden lg:block" style={{ zIndex: n + 1 }}>
          <Link href="/about" className="v4-stack-card block rounded-[10px] bg-v-card p-4 transition-colors hover:bg-v-fg/[0.13]">
            <h2 className="text-v-fg">{t(ui4.about, lang)}</h2>
            <p className="text-v-fg2">{t(ui4.aboutText, lang)}</p>
          </Link>
        </div>
      )}
      {productions.map((p, i) => (
        <div key={p.slug} data-stack className="relative" style={{ zIndex: n - i }}>
          <Link href={`/projects/${p.slug}`} className="v4-stack-card flex gap-3 rounded-[10px] bg-v-card p-4 transition-colors hover:bg-[color-mix(in_oklab,var(--v4-card),var(--v4-fg)_6%)]">
            <AppIcon p={p} />
            <div className="min-w-0 pt-[1px]">
              <div className="flex items-center gap-2">
                <h2 className="truncate text-v-fg">{p.name}</h2>
                {p.app.status === "live" && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#30d158]" title="Live" />}
              </div>
              <p className="line-clamp-2 text-v-fg2">{t(p.app.tagline ?? "", lang)}</p>
            </div>
          </Link>
        </div>
      ))}
    </nav>
  );
}
