"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnchorLogo } from "./anchor-logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/5" : ""
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <AnchorLogo className="w-5 h-5" />
          <span className="text-sm font-semibold tracking-[0.2em] uppercase">Anchored</span>
        </Link>
        <a
          href="mailto:contact@anchored.kr"
          className="text-xs tracking-wider uppercase text-muted hover:text-white transition-colors"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
