"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ target, suffix = "", duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, target, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, count, target, duration]);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return unsub;
  }, [rounded]);

  return <span ref={ref} className="tabular-nums">{display}{suffix}</span>;
}

function GlitchText({ text }: { text: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [revealed, setRevealed] = useState(false);
  const [display, setDisplay] = useState(text.replace(/./g, " "));

  useEffect(() => {
    if (!inView || revealed) return;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text.split("").map((char, i) => {
          if (char === " " || char === "\n") return char;
          if (i < iteration) return text[i];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      iteration += 0.5;
      if (iteration >= text.length) {
        clearInterval(interval);
        setRevealed(true);
        setDisplay(text);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [inView, revealed, text]);

  return <span ref={ref} className="font-mono">{display}</span>;
}

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: 200, suffix: "+", label: "Creators" },
    { value: 10, suffix: "+", label: "Game Projects" },
    { value: 50, suffix: "+", label: "Events" },
    { value: 15, suffix: "+", label: "Partners" },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px line-gradient opacity-50" />
      </div>

      <div ref={ref} className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start"
        >
          <div className="md:col-span-5">
            <span className="text-xs font-mono text-blue uppercase tracking-widest">About</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              <GlitchText text="Roblox Ecosystem Builder" />
            </h2>

            <div className="mt-10 grid grid-cols-2 gap-8">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="group"
                >
                  <div className="text-3xl md:text-4xl font-bold text-accent font-mono group-hover:scale-110 transition-transform origin-left">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-muted mt-2 uppercase tracking-wider font-mono">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative p-8 rounded-2xl glass"
            >
              <div className="absolute top-0 left-8 w-12 h-[2px] bg-accent" />
              <p className="text-lg text-foreground/90 leading-relaxed">
                Anchored is a Roblox Ecosystem Builder based in Korea. We help
                emerging creators build games, form teams, meet players, and grow
                through community, education, publishing, and partnerships.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative p-8 rounded-2xl glass"
            >
              <div className="absolute top-0 left-8 w-12 h-[2px] bg-blue" />
              <p className="text-base text-muted leading-relaxed">
                앵커드는 한국을 기반으로 한 Roblox Ecosystem Builder입니다. 우리는
                신진 크리에이터들이 게임을 만들고, 팀을 구성하고, 유저와 만나고,
                커뮤니티 · 교육 · 퍼블리싱 · 파트너십을 통해 성장할 수 있는
                환경을 만듭니다.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              {["Roblox", "Creator Economy", "Game Dev", "Community", "Education", "LiveOps", "Korea"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-xs font-mono rounded-lg glass text-muted hover:text-accent hover:border-accent/30 transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
