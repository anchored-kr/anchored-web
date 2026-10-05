"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { LangContext } from "@/components/os/LangContext";
import type { Lang } from "@/data/i18n";

const SetLangContext = createContext<(l: Lang) => void>(() => {});
export const useSetLang = () => useContext(SetLangContext);

/** v4 root: language state (persisted) + the themed canvas. Theme itself lives on <html data-v4theme>. */
export function V4Root({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [lang, setLang] = useState<Lang>("ko");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const s = localStorage.getItem("anchored:lang");
        if (s === "ko" || s === "en" || s === "ja") setLang(s);
      } catch {}
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const change = useCallback((l: Lang) => {
    setLang(l);
    try { localStorage.setItem("anchored:lang", l); } catch {}
  }, []);

  return (
    <LangContext.Provider value={lang}>
      <SetLangContext.Provider value={change}>
        <div className={`v4 min-h-dvh bg-v-bg text-v-fg ${className}`}>{children}</div>
      </SetLangContext.Provider>
    </LangContext.Provider>
  );
}
