"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/* ── reveal (restrained) ── */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((l, i) => (
        <span key={i} className="block">{l}</span>
      ))}
    </>
  );
}

/* ── Kodansha-style section: big English title in the left column, content right ── */
export function Section({ id, title, sub, ghost, children, dark, className = "" }: { id?: string; title: string; sub?: string; ghost?: string; children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <section id={id} className={`relative overflow-hidden ${dark ? "bg-k-dark text-white" : "k-rule-2"} ${className}`}>
      {ghost && (
        <span aria-hidden="true" className="k-ghost pointer-events-none absolute -left-2 top-4 select-none whitespace-nowrap">
          {ghost}
        </span>
      )}
      <div className="relative mx-auto grid max-w-[1320px] gap-8 px-5 py-16 md:grid-cols-12 md:gap-10 md:px-8 md:py-24">
        <div className="md:col-span-3">
          <h2 className="k-title">{title}</h2>
          {sub && <p className={`mt-2 text-[13px] ${dark ? "text-white/60" : "text-k-ink/60"}`}>{sub}</p>}
        </div>
        <div className="md:col-span-9">{children}</div>
      </div>
    </section>
  );
}

/* ── outlined box link with the arrow square (VIEW MORE →) ── */
export function BoxLink({ href, children, dark, external, className = "" }: { href: string; children: ReactNode; dark?: boolean; external?: boolean; className?: string }) {
  const border = dark ? "border-white text-white hover:bg-white hover:text-k-dark" : "border-k-ink text-k-ink hover:bg-k-ink hover:text-white";
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-stretch border-2 font-mono text-[11px] font-semibold tracking-[0.16em] transition-colors ${border} ${className}`}
    >
      <span className="flex items-center px-4 py-2.5">{children}</span>
      <span className={`flex w-10 items-center justify-center border-l-2 ${dark ? "border-white group-hover:border-k-dark" : "border-k-ink group-hover:border-white"}`} aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square">
          <path d="M1 7h11M8 2l5 5-5 5" />
        </svg>
      </span>
    </a>
  );
}

/* ── small caps label ── */
export function Cap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`font-mono text-[10.5px] font-semibold tracking-[0.16em] ${className}`}>{children}</span>;
}

/* ── Anchored signature: the wordmark "A" as a clip mask around crossfading captures ── */
export const A_PATH = "M0 52 L18 0 h8 L44 52 h-9 L31 42 H13 L9 52 H0z M16 34 h12 L22 12 16 34z";

export function AMask({ slides, className = "", id = "amask" }: { slides: { src: string; caption?: string }[]; className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 44 52" className={`block h-auto w-full ${className}`} role="img" aria-label="Anchored — production reel">
      <defs>
        <clipPath id={id} clipPathUnits="userSpaceOnUse">
          <path d={A_PATH} clipRule="evenodd" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect width="44" height="52" fill="#101114" />
        {slides.map((s) => (
          <image key={s.src} href={s.src} x="-4" y="0" width="52" height="52" preserveAspectRatio="xMidYMid slice" className="a-slide" />
        ))}
      </g>
    </svg>
  );
}

/* ── solid "A" glyph for small marks / posters ── */
export function AGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 52" className={className} aria-hidden="true">
      <path d={A_PATH} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
