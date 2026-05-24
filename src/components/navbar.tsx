"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-xl shadow-[rgba(0,0,0,0.03)_0px_1px_4px]" : "bg-white"}`}>
      <nav className="mx-auto max-w-[1280px] px-6 md:px-12 h-16 flex items-center justify-between">
        <Link href="/">
          <Image src="/C_anchored_signature_h_eng.png" alt="Anchored" width={1394} height={329} className="h-8 w-auto" priority />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((i) => (
            <a key={i.href} href={i.href} className="text-sm font-medium text-body hover:text-ink transition-colors">{i.label}</a>
          ))}
          <a href="mailto:contact@anchored.kr" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">Contact</a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden w-6 h-6 flex flex-col items-center justify-center gap-1" aria-label="Menu">
          <motion.span animate={open ? { rotate: 45, y: 4 } : {}} className="w-4 h-px bg-ink block" />
          <motion.span animate={open ? { opacity: 0 } : {}} className="w-4 h-px bg-ink block" />
          <motion.span animate={open ? { rotate: -45, y: -4 } : {}} className="w-4 h-px bg-ink block" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white border-t border-border overflow-hidden">
            <div className="px-6 py-6 flex flex-col gap-4">
              {navItems.map((i) => (
                <a key={i.href} href={i.href} onClick={() => setOpen(false)} className="text-sm font-medium text-body hover:text-ink transition-colors">{i.label}</a>
              ))}
              <a href="mailto:contact@anchored.kr" className="text-sm font-medium text-primary">Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
