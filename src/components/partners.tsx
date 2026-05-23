"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function GlowCard({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ scale: 1.02 }}
      className={`interactive relative rounded-2xl border border-border bg-surface/50 overflow-hidden group ${className}`}
      style={{
        background:
          "radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(0,229,255,0.04) 0%, rgba(17,17,17,0.6) 50%)",
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(600px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(0,229,255,0.08) 0%, transparent 40%)",
        }}
      />
      {children}
    </motion.div>
  );
}

export function Partners() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="partners" className="relative py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px line-gradient opacity-50" />
      </div>

      <div ref={ref} className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-accent uppercase tracking-widest">
            Join Us
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
            Ready to build
            <br />
            <span className="text-muted">together?</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GlowCard delay={0}>
            <div className="relative p-10">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
                  <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
                  <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
                  <circle cx="50" cy="50" r="3" fill="currentColor" className="text-accent" />
                </svg>
              </div>

              <motion.span
                className="text-5xl block mb-6"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                🚀
              </motion.span>
              <span className="text-xs font-mono text-accent uppercase tracking-widest">
                For Creators
              </span>
              <h3 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight">
                Build your Roblox world
                <br />
                with Anchored.
              </h3>
              <p className="mt-4 text-muted leading-relaxed">
                앵커드 커뮤니티에 참여하세요. 팀을 만들고, 게임을 만들고, 함께
                성장할 수 있는 환경이 준비되어 있습니다.
              </p>
              <a
                href="https://discord.gg/anchored"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive mt-8 inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-background font-semibold text-sm rounded-xl hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] transition-all group/btn relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                <span className="relative flex items-center gap-2">
                  Join the Community
                  <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </span>
              </a>
            </div>
          </GlowCard>

          <GlowCard delay={0.15}>
            <div className="relative p-10">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                  <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
                  <rect x="30" y="30" width="40" height="40" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
                  <rect x="40" y="40" width="20" height="20" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
                  <rect x="47" y="47" width="6" height="6" fill="currentColor" className="text-accent" />
                </svg>
              </div>

              <motion.span
                className="text-5xl block mb-6"
                whileHover={{ scale: 1.2, rotate: -10 }}
              >
                🤝
              </motion.span>
              <span className="text-xs font-mono text-accent uppercase tracking-widest">
                For Partners
              </span>
              <h3 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight">
                Partner with Korea&apos;s
                <br />
                Roblox Ecosystem Builder.
              </h3>
              <p className="mt-4 text-muted leading-relaxed">
                앵커드는 게임사, 플랫폼, 브랜드, 교육기관, 투자사와 함께 Roblox
                크리에이터 생태계를 확장합니다. 크리에이터 발굴, 교육, 게임 출시,
                커뮤니티 이벤트, 브랜드 캠페인까지 Roblox-native한 협업을
                설계합니다.
              </p>
              <a
                href="mailto:contact@anchored.kr"
                className="interactive mt-8 inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold border border-accent/50 text-accent rounded-xl hover:bg-accent/10 transition-all group/btn"
              >
                Get in Touch
                <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </a>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
