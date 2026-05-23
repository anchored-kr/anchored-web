"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

function TypeWriter({ texts, className }: { texts: string[]; className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const full = texts[currentIndex];
    if (!isDeleting) {
      setDisplayed(full.slice(0, displayed.length + 1));
      if (displayed.length + 1 === full.length) {
        setTimeout(() => setIsDeleting(true), 2500);
        return;
      }
    } else {
      setDisplayed(full.slice(0, displayed.length - 1));
      if (displayed.length - 1 === 0) {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        return;
      }
    }
  }, [texts, currentIndex, displayed, isDeleting]);

  useEffect(() => {
    const speed = isDeleting ? 25 : 50;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return (
    <span className={className}>
      {displayed}
      <span className="inline-block w-[2px] h-[0.85em] bg-white ml-0.5 animate-pulse align-middle" />
    </span>
  );
}

function GridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gridSize = 80;
      const cols = Math.ceil(canvas.width / gridSize) + 1;
      const rows = Math.ceil(canvas.height / gridSize) + 1;

      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < cols; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
      }
      for (let j = 0; j < rows; j++) {
        ctx.beginPath();
        ctx.moveTo(0, j * gridSize);
        ctx.lineTo(canvas.width, j * gridSize);
        ctx.stroke();
      }

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;
          const dist = Math.sqrt(
            Math.pow(x - canvas.width / 2, 2) + Math.pow(y - canvas.height / 2, 2)
          );
          const wave = Math.sin(dist * 0.003 - time * 2) * 0.5 + 0.5;
          const opacity = wave * 0.12;

          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" aria-hidden />;
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GridCanvas />

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
        <motion.p
          variants={item}
          className="text-xs tracking-[0.3em] uppercase text-muted mb-10"
        >
          Roblox Ecosystem Builder — Seoul, Korea
        </motion.p>

        <motion.h1
          variants={item}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight"
        >
          <span className="block">Building Korea&apos;s</span>
          <span className="block mt-2">
            <TypeWriter texts={["Roblox Creator", "Game Developer", "Creative Studio"]} />
          </span>
          <span className="block mt-2">Ecosystem.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-10 text-lg md:text-xl text-muted max-w-xl mx-auto leading-relaxed"
        >
          크리에이터, 게임, 커뮤니티, 교육, 이벤트, 파트너십을 연결하며
          한국 Roblox 생태계를 만들어가는 회사입니다.
        </motion.p>

        <motion.div variants={item} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-3 px-8 py-3.5 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-colors"
          >
            Explore Projects
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#partners"
            className="inline-flex items-center gap-3 px-8 py-3.5 text-sm font-medium text-white border border-border rounded-full hover:border-dim transition-colors"
          >
            Partner with Us
          </a>
        </motion.div>

        <motion.div variants={item} className="mt-28">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-muted/40"
          >
            <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-0.5 h-1.5 rounded-full bg-white/40"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
