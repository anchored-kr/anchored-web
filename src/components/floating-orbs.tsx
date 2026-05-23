"use client";

import { motion } from "framer-motion";

const orbs = [
  { size: 400, x: "10%", y: "20%", color: "rgba(0,114,206,0.05)", duration: 20, delay: 0 },
  { size: 300, x: "80%", y: "60%", color: "rgba(241,196,0,0.03)", duration: 25, delay: 2 },
  { size: 500, x: "50%", y: "80%", color: "rgba(27,58,95,0.06)", duration: 30, delay: 4 },
  { size: 250, x: "70%", y: "10%", color: "rgba(0,114,206,0.04)", duration: 22, delay: 1 },
];

export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size, height: orb.size, left: orb.x, top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          }}
          animate={{ x: [0, 50, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.1, 0.9, 1] }}
          transition={{ duration: orb.duration, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
        />
      ))}
    </div>
  );
}
