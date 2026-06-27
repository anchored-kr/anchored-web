"use client";

import { createContext, useContext } from "react";
import type { Lang } from "@/data/i18n";

export const LangContext = createContext<Lang>("ko");

/** Active language for the desktop, provided by <Desktop>. */
export const useLang = () => useContext(LangContext);
