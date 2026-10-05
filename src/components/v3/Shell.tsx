"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { LangContext } from "@/components/os/LangContext";
import { LANGS, t, type Lang } from "@/data/i18n";
import { nav3 } from "@/data/v3";

/** Corporate-editorial shell: white header with logo + tagline, simple menu, language switch, CONTACT box. */
export function Shell({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ko");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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
      <header className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow ${scrolled ? "shadow-[0_1px_0_0_#2a2a2a]" : ""}`}>
        <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between gap-6 px-5 md:px-8">
          <a href="#top" className="flex items-center gap-4" aria-label="Anchored">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/B_anchored_signature_h_eng.png" alt="Anchored" className="h-[22px] w-auto" />
            <span className="hidden border-l border-k-ink/30 pl-4 text-[12px] leading-tight text-k-ink/80 lg:block">{t(nav3.tagline, lang)}</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {nav3.items.map((it) => (
              <a key={it.href} href={it.href} className="group flex flex-col items-start leading-none">
                <span className="text-[14px] font-semibold text-k-ink">{t(it.label, lang)}</span>
                <span className="mt-1 h-[2px] w-0 bg-k-ink transition-all duration-200 group-hover:w-full" aria-hidden="true" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex items-center font-mono text-[10.5px] font-semibold tracking-[0.12em]">
              {LANGS.map((l, i) => (
                <span key={l.code} className="flex items-center">
                  {i > 0 && <span className="mx-1.5 text-k-ink/30">/</span>}
                  <button onClick={() => changeLang(l.code)} aria-pressed={lang === l.code} className={`transition-colors ${lang === l.code ? "text-k-ink underline underline-offset-4" : "text-k-ink/45 hover:text-k-ink"}`}>
                    {l.code.toUpperCase()}
                  </button>
                </span>
              ))}
            </div>
            <a href="#contact" className="hidden border-2 border-k-ink px-3.5 py-2 font-mono text-[10.5px] font-semibold tracking-[0.16em] text-k-ink transition-colors hover:bg-k-ink hover:text-white sm:inline-block">
              {t(nav3.contact, lang)}
            </a>
            <button onClick={() => setOpen((v) => !v)} className="grid h-9 w-9 place-items-center border-2 border-k-ink md:hidden" aria-label="Menu" aria-expanded={open}>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="2">{open ? <path d="M2 2l12 8M14 2L2 10" /> : <path d="M0 1h16M0 6h16M0 11h16" />}</svg>
            </button>
          </div>
        </div>
        {open && (
          <nav className="border-t-2 border-k-ink bg-white md:hidden">
            {nav3.items.map((it) => (
              <a key={it.href} href={it.href} onClick={() => setOpen(false)} className="flex items-baseline justify-between border-b border-k-ink/15 px-5 py-4 text-[16px] font-semibold text-k-ink">
                {t(it.label, lang)}
                <span className="text-[12px] font-normal text-k-ink/50">{t(it.sub, lang)}</span>
              </a>
            ))}
          </nav>
        )}
      </header>
      <main id="top" className="pt-[72px]">{children}</main>
    </LangContext.Provider>
  );
}
