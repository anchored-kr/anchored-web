"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorFollower() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 });

  const glowX = useSpring(cursorX, { damping: 40, stiffness: 100 });
  const glowY = useSpring(cursorY, { damping: 40, stiffness: 100 });

  const isHovering = useRef(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], .interactive")) {
        isHovering.current = true;
        if (dotRef.current) dotRef.current.style.transform = "scale(2.5)";
        if (glowRef.current) glowRef.current.style.opacity = "0.3";
      }
    };

    const handleOut = () => {
      isHovering.current = false;
      if (dotRef.current) dotRef.current.style.transform = "scale(1)";
      if (glowRef.current) glowRef.current.style.opacity = "0.15";
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    window.addEventListener("mouseout", handleOut, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-accent z-[9998] pointer-events-none mix-blend-difference hidden md:block"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%", transition: "transform 0.2s" }}
      />
      <motion.div
        ref={glowRef}
        className="fixed top-0 left-0 w-40 h-40 rounded-full pointer-events-none z-[9997] hidden md:block"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 70%)",
          opacity: 0.15,
          transition: "opacity 0.3s",
        }}
      />
    </>
  );
}
