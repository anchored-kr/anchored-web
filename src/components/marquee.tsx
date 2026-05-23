"use client";

import { motion } from "framer-motion";

interface MarqueeProps {
  items: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
}

export function Marquee({ items, speed = 30, reverse = false, className = "" }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex gap-8"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 text-sm font-mono text-muted/40 uppercase tracking-widest select-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent/30" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
