"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { LangContext } from "@/components/os/LangContext";
import { LANGS, t, type Lang } from "@/data/i18n";
import { nav } from "@/data/v2";

/** Editorial site shell: language state + fixed top navigation. */
export function V2Shell({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ko");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem("anchored:lang");
      if (s === "ko" || s === "en" || s === "ja") setLang(s);
    } catch {}
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const changeLang = useCallback((l: Lang) => {
    setLang(l);
    try { localStorage.setItem("anchored:lang", l); } catch {}
  }, []);

  return (
    <LangContext.Provider value={lang}>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-paper/85 backdrop-blur-md border-b border-line" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:px-10">
          <a href="#top" className="flex items-center" aria-label="Anchored">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/B_anchored_signature_h_eng.png" alt="Anchored" className="h-[20px] w-auto" />
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {[
              ["#fleet", nav.work],
              ["#model", nav.model],
              ["#sprint", nav.sprint],
              ["#creators", nav.creators],
            ].map(([href, label]) => (
              <a key={href as string} href={href as string} className="meta text-carbon/70 transition-colors hover:text-carbon">
                {t(label as typeof nav.work, lang)}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5 rounded-full border border-line p-0.5">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => changeLang(l.code)}
                  aria-pressed={lang === l.code}
                  className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider transition-colors ${
                    lang === l.code ? "bg-carbon text-paper" : "text-carbon/55 hover:text-carbon"
                  }`}
                >
                  {l.code.toUpperCase()}
                </button>
              ))}
            </div>
            <a
              href="#sprint"
              className="hidden rounded-full bg-carbon px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-paper transition-colors hover:bg-anchor-blue sm:inline-block"
            >
              {t(nav.cta, lang)}
            </a>
          </div>
        </div>
      </header>
      <main id="top">{children}</main>
    </LangContext.Provider>
  );
}
