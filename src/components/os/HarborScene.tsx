"use client";

/**
 * Decorative Pacific scene: the whole desktop is open sea — gentle waves fading
 * in and out everywhere, and one small sailboat bobbing on top. Pure SVG + CSS
 * (see globals.css: .harbor-wave / .harbor-boat) — pointer-transparent.
 */

const WAVES: { left: string; bottom: string; scale: number; dur: number; delay: number }[] = [
  { left: "6%", bottom: "8%", scale: 1.1, dur: 7.5, delay: 0 },
  { left: "20%", bottom: "22%", scale: 0.7, dur: 6.5, delay: 2.1 },
  { left: "34%", bottom: "10%", scale: 1.2, dur: 8.5, delay: 4.2 },
  { left: "52%", bottom: "18%", scale: 0.8, dur: 7, delay: 1.2 },
  { left: "68%", bottom: "7%", scale: 1.1, dur: 8, delay: 5.4 },
  { left: "88%", bottom: "14%", scale: 0.8, dur: 6.8, delay: 3.3 },
  { left: "12%", bottom: "42%", scale: 0.6, dur: 7.8, delay: 6.2 },
  { left: "42%", bottom: "38%", scale: 0.55, dur: 8.2, delay: 2.8 },
  { left: "76%", bottom: "46%", scale: 0.65, dur: 7.2, delay: 0.9 },
  { left: "27%", bottom: "60%", scale: 0.5, dur: 8.8, delay: 5 },
  { left: "60%", bottom: "66%", scale: 0.55, dur: 7.6, delay: 3.9 },
  { left: "85%", bottom: "72%", scale: 0.45, dur: 8.4, delay: 1.7 },
  { left: "8%", bottom: "78%", scale: 0.45, dur: 9, delay: 4.6 },
  { left: "48%", bottom: "84%", scale: 0.4, dur: 8.6, delay: 6.8 },
];

function Wave() {
  return (
    <svg viewBox="0 0 44 16" width="44" height="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2 10 Q 12 2 22 10 T 42 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function HarborScene() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {WAVES.map((w, i) => (
        <span
          key={i}
          className="harbor-wave"
          style={{
            left: w.left,
            bottom: w.bottom,
            transform: `scale(${w.scale})`,
            ["--dur" as string]: `${w.dur}s`,
            ["--delay" as string]: `${w.delay}s`,
          }}
        >
          <Wave />
        </span>
      ))}

      {/* Sailboat at anchor, bobbing */}
      <div className="harbor-boat">
        <svg viewBox="0 0 120 100" width="86" xmlns="http://www.w3.org/2000/svg">
          <rect x="57" y="10" width="3" height="66" rx="1.5" fill="#dce9fb" />
          <path d="M58 8 L58 1 L73 4.5 Z" fill="#2f96ff" />
          <path d="M54 20 L54 72 L22 72 Z" fill="rgba(236,245,255,0.95)" />
          <path d="M63 28 L63 72 L94 72 Z" fill="rgba(198,221,246,0.85)" />
          <path d="M18 78 L102 78 L88 93 L32 93 Z" fill="#0d1b30" stroke="rgba(220,235,255,0.4)" strokeWidth="2" />
        </svg>
        {/* waterline under the hull */}
        <span className="harbor-wave" style={{ left: -14, bottom: 0, ["--dur" as string]: "6s", ["--delay" as string]: "0.6s" }}>
          <Wave />
        </span>
        <span className="harbor-wave" style={{ right: -18, bottom: 4, ["--dur" as string]: "7s", ["--delay" as string]: "2.4s" }}>
          <Wave />
        </span>
      </div>
    </div>
  );
}
