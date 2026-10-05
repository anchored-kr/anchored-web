"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { LangContext } from "@/components/os/LangContext";
import { LANGS, t, type Lang } from "@/data/i18n";
import { nav } from "@/data/v2";

/** Editorial site shell on the Finance theme: language state + fixed top navigation. */
export function V2Shell({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ko");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    // restore the saved language + initial scroll state in a frame callback (not synchronously in the effect body)
    const frame = requestAnimationFrame(() => {
      try {
        const s = localStorage.getItem("anchored:lang");
        if (s === "ko" || s === "en" || s === "ja") setLang(s);
      } catch {}
      onScroll();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const changeLang = useCallback((l: Lang) => {
    setLang(l);
    try { localStorage.setItem("anchored:lang", l); } catch {}
  }, []);

  return (
    <LangContext.Provider value={lang}>
      <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${scrolled ? "bg-canvas/85 backdrop-blur-md shadow-[0_1px_0_0_var(--color-line-2)]" : "bg-transparent"}`}>
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-8">
          <a href="#top" className="flex items-center" aria-label="Anchored">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/B_anchored_signature_h_eng.png" alt="Anchored" className="h-[20px] w-auto" />
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {[
              ["#fleet", nav.work],
              ["#model", nav.model],
              ["#sprint", nav.sprint],
              ["#creators", nav.creators],
            ].map(([href, label]) => (
              <a key={href as string} href={href as string} className="text-[13px] font-medium text-ink-2 transition-colors hover:text-ink">
                {t(label as typeof nav.work, lang)}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2.5">
            <div className="flex h-[30px] items-center gap-0.5 rounded-[9px] bg-surface p-0.5 ring-1 ring-inset ring-line-2">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => changeLang(l.code)}
                  aria-pressed={lang === l.code}
                  className={`h-full rounded-[7px] px-2 font-mono text-[10.5px] font-semibold tracking-wider transition-colors ${
                    lang === l.code ? "bg-ink text-white" : "text-ink-3 hover:text-ink"
                  }`}
                >
                  {l.code.toUpperCase()}
                </button>
              ))}
            </div>
            <a
              href="#sprint"
              className="hidden h-[34px] items-center rounded-[10px] bg-accent px-3.5 text-[13px] font-semibold text-white shadow-[0_1px_2px_rgb(28_92_171/0.4)] transition-colors hover:bg-[#256abf] active:bg-accent-strong sm:inline-flex"
            >
              {t(nav.cta, lang)}
            </a>
          </div>
        </div>
      </header>
      <main id="top" className="mx-auto max-w-[1440px] px-4 pb-6 pt-20 md:px-8 md:pt-24">
        <div className="space-y-4 md:space-y-5">{children}</div>
      </main>
    </LangContext.Provider>
  );
}
