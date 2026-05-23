"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AnchorLogo } from "./anchor-logo";

const navItems = [
  { label: "Vision", href: "#vision" },
  { label: "Product", href: "#what-we-build" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#partners" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-xl border-b border-border" : ""
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <AnchorLogo className="w-6 h-6" />
          <span className="text-sm font-semibold tracking-[0.2em] uppercase">
            Anchored
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs tracking-wider uppercase text-muted hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-6 h-6 flex flex-col items-center justify-center gap-1"
          aria-label="Menu"
        >
          <motion.span animate={mobileOpen ? { rotate: 45, y: 4 } : {}} className="w-4 h-px bg-white block" />
          <motion.span animate={mobileOpen ? { opacity: 0 } : {}} className="w-4 h-px bg-white block" />
          <motion.span animate={mobileOpen ? { rotate: -45, y: -4 } : {}} className="w-4 h-px bg-white block" />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-t border-border overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm tracking-wider uppercase text-muted hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
