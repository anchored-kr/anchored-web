"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AnchorLogo } from "./anchor-logo";

const navItems = [
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "IP Lab", href: "#ip-lab" },
  { label: "Partners", href: "#partners" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/5" : ""}`}>
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <AnchorLogo className="w-5 h-5" />
          <span className="text-sm font-semibold tracking-[0.2em] uppercase">Anchored</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((i) => (
            <a key={i.href} href={i.href} className="text-xs tracking-wider uppercase text-muted hover:text-white transition-colors">{i.label}</a>
          ))}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden w-6 h-6 flex flex-col items-center justify-center gap-1" aria-label="Menu">
          <motion.span animate={open ? { rotate: 45, y: 4 } : {}} className="w-4 h-px bg-white block" />
          <motion.span animate={open ? { opacity: 0 } : {}} className="w-4 h-px bg-white block" />
          <motion.span animate={open ? { rotate: -45, y: -4 } : {}} className="w-4 h-px bg-white block" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-black border-t border-white/5 overflow-hidden">
            <div className="px-6 py-8 flex flex-col gap-6">
              {navItems.map((i) => (
                <a key={i.href} href={i.href} onClick={() => setOpen(false)} className="text-sm tracking-wider uppercase text-muted hover:text-white transition-colors">{i.label}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
