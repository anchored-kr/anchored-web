"use client";

/**
 * Client-facing visuals in the Finance idiom (white cards, blue accent, status chips).
 * Charts follow the dataviz method: single-hue / emphasis forms, thin marks, direct
 * labels, text in ink tokens, status colors only with icon + label. All sample data
 * is labeled as such by the caller.
 */

import type { ReactNode } from "react";

export const VIZ = {
  accent: "#2a78d6",
  accentStrong: "#1c5cab",
  gray: "#a9adb5",
  grid: "#eef0f2",
  surface: "#ffffff",
  /** ordinal blue ramp (reference palette steps 250→550; 450 = Finance accent) */
  ramp: ["#86b6ef", "#5598e7", "#2a78d6", "#256abf", "#1c5cab"],
} as const;

/* ── Chip (status always with icon/dot + label) ─────────────────── */
const CHIP = {
  neutral: "bg-subtle text-ink-2 ring-line-2/70",
  accent: "bg-accent-soft text-accent-strong ring-accent/15",
  good: "bg-good-soft text-good-ink ring-good/20",
  warning: "bg-warning-soft text-warning-ink ring-warning/40",
  critical: "bg-critical-soft text-critical-ink ring-critical/20",
  outline: "bg-surface text-ink-2 ring-line-2",
} as const;
export type ChipTone = keyof typeof CHIP;

export function Chip({ tone = "neutral", dot, icon, children, className = "" }: { tone?: ChipTone; dot?: boolean; icon?: "check" | "warn" | "clock"; children: ReactNode; className?: string }) {
  const dotColor = { neutral: "#868991", accent: "#2a78d6", good: "#0ca30c", warning: "#fab219", critical: "#d03b3b", outline: "#868991" }[tone];
  return (
    <span className={`inline-flex h-[20px] items-center gap-1.5 whitespace-nowrap rounded-md px-1.5 text-[11.5px] font-medium ring-1 ring-inset ${CHIP[tone]} ${className}`}>
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${tone === "good" ? "animate-pulse-dot" : ""}`} style={{ background: dotColor }} />}
      {icon === "check" && (
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.5 6.5l2.3 2.3L9.5 3.8" /></svg>
      )}
      {icon === "warn" && (
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 1.8L11 10.2H1z" /><path d="M6 5v2.4M6 8.9v.1" /></svg>
      )}
      {icon === "clock" && (
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="6" cy="6" r="4.6" /><path d="M6 3.4V6l1.8 1.2" /></svg>
      )}
      {children}
    </span>
  );
}

/* ── Sparkline: gray flow, accent endpoint, soft fill ─────────────── */
export function Sparkline({ values, width = 132, height = 40, color = VIZ.accent, title }: { values: number[]; width?: number; height?: number; color?: string; title?: string }) {
  if (values.length < 2) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = 5;
  const x = (i: number) => pad + (i / (values.length - 1)) * (width - pad * 2);
  const y = (v: number) => (max === min ? height / 2 : pad + (1 - (v - min) / (max - min)) * (height - pad * 2));
  const d = values.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const last = values.length - 1;
  return (
    <svg width={width} height={height} className="block overflow-visible" role="img" aria-label={title}>
      {title && <title>{title}</title>}
      <path d={`${d} L${x(last)},${height} L${x(0)},${height} Z`} fill={color} fillOpacity={0.08} />
      <path d={d} fill="none" stroke={VIZ.gray} strokeWidth={1.75} strokeLinejoin="round" strokeLinecap="round" pathLength={1} className="line-draw" />
      <circle cx={x(last)} cy={y(values[last])} r={4.5} fill={color} stroke={VIZ.surface} strokeWidth={2} />
    </svg>
  );
}

/* ── Meter: fill and track share a hue ─────────────────────────── */
export function Meter({ ratio, tone = "accent", className = "" }: { ratio: number; tone?: "accent" | "good" | "warning" | "critical"; className?: string }) {
  const fill = { accent: "#2a78d6", good: "#0ca30c", warning: "#fab219", critical: "#d03b3b" }[tone];
  const track = { accent: "#dbe9fb", good: "#d3efd3", warning: "#fdeec4", critical: "#f6d5d5" }[tone];
  return (
    <div className={`h-[6px] overflow-hidden rounded-full ${className}`} style={{ background: track }} role="meter" aria-valuenow={Math.round(ratio * 100)} aria-valuemin={0} aria-valuemax={100}>
      <div className="bar-right h-full rounded-full" style={{ width: `${Math.min(100, Math.max(0, ratio * 100))}%`, background: fill }} />
    </div>
  );
}

/* ── Stat tile ─────────────────────────────────────────────────── */
export function Stat({ label, value, sub, spark, big }: { label: string; value: string; sub?: ReactNode; spark?: number[]; big?: boolean }) {
  return (
    <div className="panel flex items-end justify-between gap-3 px-4 py-3.5">
      <div className="min-w-0">
        <p className="text-[12px] font-medium text-ink-3">{label}</p>
        <p className={`num mt-1 font-display font-semibold tracking-[-0.02em] text-ink ${big ? "text-[34px] leading-none" : "text-[24px] leading-none"}`}>{value}</p>
        {sub && <div className="mt-1.5 text-[11.5px] text-ink-3">{sub}</div>}
      </div>
      {spark && <Sparkline values={spark} width={96} height={32} />}
    </div>
  );
}

/* ── Radar (emphasis form: one accent series + gray context) ───── */
export function Radar({ axes, series, size = 220 }: { axes: string[]; series: { label: string; values: number[]; color: string; fill?: boolean }[]; size?: number }) {
  const c = size / 2;
  const r = size / 2 - 28;
  const n = axes.length;
  const ang = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const pt = (i: number, v: number) => [c + Math.cos(ang(i)) * r * (v / 5), c + Math.sin(ang(i)) * r * (v / 5)] as const;
  const ring = (lvl: number) => axes.map((_, i) => pt(i, lvl).join(",")).join(" ");
  const M = 44; // horizontal margin for axis labels
  return (
    <svg viewBox={`${-M} 0 ${size + M * 2} ${size}`} className="block h-auto w-full max-w-[340px]" role="img" aria-label="Growth Index radar">
      {[1, 2, 3, 4, 5].map((l) => (
        <polygon key={l} points={ring(l)} fill="none" stroke={VIZ.grid} strokeWidth={1} />
      ))}
      {axes.map((_, i) => {
        const [x, y] = pt(i, 5);
        return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke={VIZ.grid} strokeWidth={1} />;
      })}
      {series.map((s) => {
        const pts = s.values.map((v, i) => pt(i, v).join(",")).join(" ");
        return (
          <g key={s.label}>
            <title>{s.label}</title>
            <polygon points={pts} fill={s.fill ? s.color : "none"} fillOpacity={s.fill ? 0.14 : 0} stroke={s.color} strokeWidth={2} strokeLinejoin="round" />
            {s.values.map((v, i) => {
              const [x, y] = pt(i, v);
              return <circle key={i} cx={x} cy={y} r={4} fill={s.color} stroke={VIZ.surface} strokeWidth={2} />;
            })}
          </g>
        );
      })}
      {axes.map((a, i) => {
        const [x, y] = pt(i, 5.75);
        const cx = Math.cos(ang(i));
        const anchor = cx > 0.2 ? "start" : cx < -0.2 ? "end" : "middle";
        return (
          <text key={a} x={x} y={y} textAnchor={anchor} dominantBaseline="middle" fontSize={10.5} fontWeight={600} fill="#53565e" fontFamily="var(--font-mono)">
            {a}
          </text>
        );
      })}
    </svg>
  );
}

export function LegendKey({ color, label, shape = "line" }: { color: string; label: string; shape?: "line" | "rect" }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] text-ink-2">
      <span className={shape === "rect" ? "h-2.5 w-2.5 rounded-[3px]" : "h-[2px] w-3.5 rounded-full"} style={{ background: color }} />
      {label}
    </span>
  );
}

/* ── Funnel: ordinal stages, one-hue ramp, direct labels ────────── */
export function Funnel({ stages }: { stages: { label: string; width: number; value?: string }[] }) {
  return (
    <ol className="space-y-2.5">
      {stages.map((s, i) => (
        <li key={s.label} className="grid grid-cols-[1fr_auto] items-center gap-3">
          <div className="min-w-0">
            <div className="mb-1 flex items-baseline justify-between text-[12.5px]">
              <span className="font-medium text-ink">
                <span className="num mr-1.5 text-[10.5px] text-ink-4">0{i + 1}</span>
                {s.label}
              </span>
              {s.value && <span className="num font-semibold text-ink">{s.value}</span>}
            </div>
            <div className="h-[8px] overflow-hidden rounded-r-[4px] bg-subtle">
              <div className="bar-right h-full rounded-r-[4px]" style={{ width: `${Math.max(4, s.width * 100)}%`, background: VIZ.ramp[Math.min(i, VIZ.ramp.length - 1)], animationDelay: `${i * 70}ms` }} />
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ── Timeline: ordered phases on one scale ─────────────────────── */
export function Timeline({ phases, total, unit }: { phases: { label: string; start: number; end: number; ongoing?: boolean }[]; total: number; unit: string }) {
  return (
    <div className="space-y-2">
      {phases.map((p, i) => {
        const left = (p.start / total) * 100;
        const w = ((p.end - p.start) / total) * 100;
        return (
          <div key={p.label} className="grid grid-cols-[112px_1fr] items-center gap-3 text-[12.5px]">
            <span className="truncate font-medium text-ink">{p.label}</span>
            <div className="relative h-[18px] rounded-md bg-subtle">
              <div
                className="bar-right absolute top-[3px] h-[12px] rounded-[4px]"
                style={{ left: `${left}%`, width: `${w}%`, background: VIZ.ramp[Math.min(i, VIZ.ramp.length - 1)], animationDelay: `${i * 70}ms`, ...(p.ongoing ? { backgroundImage: `linear-gradient(90deg, ${VIZ.ramp[Math.min(i, VIZ.ramp.length - 1)]} 70%, transparent)` } : {}) }}
                title={`${p.label}: ${p.start}–${p.ongoing ? "…" : p.end} ${unit}`}
              />
            </div>
          </div>
        );
      })}
      <div className="grid grid-cols-[112px_1fr] gap-3">
        <span />
        <div className="flex justify-between text-[10.5px] text-ink-4">
          <span>0 {unit}</span>
          <span>{total} {unit}+</span>
        </div>
      </div>
    </div>
  );
}

/* ── Flow chips: linear (gray) vs loop (accent) ────────────────── */
export function Flow({ steps, tone, loop }: { steps: string[]; tone: "gray" | "accent"; loop?: boolean }) {
  const chip = tone === "accent" ? "bg-accent-soft text-accent-strong ring-accent/15" : "bg-subtle text-ink-3 ring-line-2";
  const arrow = tone === "accent" ? "text-accent" : "text-ink-4";
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <span className={`rounded-md px-2.5 py-1 text-[13px] font-semibold ring-1 ring-inset ${chip}`}>{s}</span>
          {i < steps.length - 1 && <span className={`font-mono text-[13px] ${arrow}`}>→</span>}
        </div>
      ))}
      {loop ? (
        <span className="ml-1 inline-flex items-center gap-1 font-mono text-[11px] text-accent">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M13 8a5 5 0 1 1-1.5-3.6" />
            <path d="M13 2v3h-3" />
          </svg>
          LOOP
        </span>
      ) : (
        <span className="ml-1 font-mono text-[11px] text-ink-4">END</span>
      )}
    </div>
  );
}

/* ── Crew dots: n creators as overlapping avatars ──────────────── */
export function CrewDots({ n, label }: { n: number; label?: string }) {
  const palette = ["#dbe9fb", "#eaf2fd", "#c9ccd3", "#e3e4e8", "#f5f6f8"];
  return (
    <span className="inline-flex items-center" title={label}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className="-ml-1.5 first:ml-0 grid h-6 w-6 place-items-center rounded-full ring-2 ring-surface" style={{ background: palette[i % palette.length] }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="#53565e" aria-hidden="true">
            <circle cx="6" cy="4" r="2.4" />
            <path d="M1.5 11a4.5 4.5 0 0 1 9 0z" />
          </svg>
        </span>
      ))}
    </span>
  );
}

/* ── Step glyphs for the model ─────────────────────────────────── */
export function StepGlyph({ kind }: { kind: "find" | "validate" | "assemble" | "produce" | "operate" }) {
  const stroke = VIZ.accent;
  const common = { width: 40, height: 40, viewBox: "0 0 40 40", fill: "none", stroke, strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  switch (kind) {
    case "find":
      return (
        <svg {...common}>
          <circle cx="17" cy="17" r="9" />
          <path d="M24 24l8 8" />
          <circle cx="17" cy="17" r="3" fill={stroke} stroke="none" />
        </svg>
      );
    case "validate":
      return (
        <svg {...common}>
          <polygon points="20,6 33,15 28,31 12,31 7,15" />
          <polygon points="20,12 28,17 25,27 15,27 12,17" fill={stroke} fillOpacity={0.15} />
        </svg>
      );
    case "assemble":
      return (
        <svg {...common}>
          <circle cx="13" cy="15" r="4" />
          <circle cx="27" cy="15" r="4" />
          <circle cx="20" cy="27" r="4" fill={stroke} fillOpacity={0.15} />
          <path d="M16 18l4 5M24 18l-4 5" />
        </svg>
      );
    case "produce":
      return (
        <svg {...common}>
          <rect x="6" y="9" width="28" height="22" rx="3" />
          <path d="M11 24l5-6 4 4 5-7 4 5" />
        </svg>
      );
    case "operate":
      return (
        <svg {...common}>
          <path d="M31 20a11 11 0 1 1-3.2-7.8" />
          <path d="M31 8v6h-6" />
          <circle cx="20" cy="20" r="2.5" fill={stroke} stroke="none" />
        </svg>
      );
  }
}

/* ── Deliverable doc card ──────────────────────────────────────── */
export function Doc({ n, title, dark }: { n: number; title: string; dark?: boolean }) {
  return (
    <div className={`flex items-start gap-3 rounded-xl p-3.5 ring-1 ring-inset ${dark ? "bg-white/[0.06] ring-white/10" : "panel"}`}>
      <svg width="22" height="26" viewBox="0 0 22 26" fill="none" stroke={dark ? "#9cc0ec" : VIZ.accent} strokeWidth="1.6" aria-hidden="true">
        <path d="M3 1.5h10l6 6V24a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2.5a1 1 0 0 1 1-1z" />
        <path d="M13 1.5v6h6M6 13h10M6 17h10M6 21h6" />
      </svg>
      <div className="min-w-0">
        <p className={`num text-[10.5px] ${dark ? "text-white/45" : "text-ink-4"}`}>0{n}</p>
        <p className={`mt-0.5 text-[13px] font-semibold leading-snug ${dark ? "text-white" : "text-ink"}`}>{title}</p>
      </div>
    </div>
  );
}

/* ── Comparison matrix ─────────────────────────────────────────── */
export function Matrix({ rows, colA, colB }: { rows: { label: string; a: string; b: string }[]; colA: string; colB: string }) {
  return (
    <div className="overflow-hidden rounded-xl ring-1 ring-inset ring-line">
      <table className="w-full border-separate border-spacing-0 text-[13px]">
        <thead>
          <tr className="bg-subtle text-[11px] font-semibold uppercase tracking-wider text-ink-3">
            <th className="px-4 py-2.5 text-left font-semibold" />
            <th className="px-4 py-2.5 text-left font-semibold">{colA}</th>
            <th className="px-4 py-2.5 text-left font-semibold text-accent-strong">{colB}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-t border-line">
              <td className="border-t border-line px-4 py-3 font-medium text-ink">{r.label}</td>
              <td className="border-t border-line px-4 py-3 text-ink-3">
                <span className="mr-1.5 inline-block font-mono text-[11px] text-ink-4">✕</span>
                {r.a}
              </td>
              <td className="border-t border-line px-4 py-3 text-ink">
                <span className="mr-1.5 inline-block font-mono text-[11px] text-good-ink">✓</span>
                {r.b}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Concept curves: post-launch trajectory, illustrative only ─── */
export function ConceptCurves({ labelA, labelB, launch, update }: { labelA: string; labelB: string; launch: string; update: string }) {
  const W = 600, H = 232, L = 14, R = 14, base = 196, lx = 150;
  const a = `M${L},${base - 18} C 70,${base - 26} 110,112 ${lx},110 C 230,108 330,158 ${W - R},176`;
  const b = `M${L},${base - 18} C 70,${base - 26} 110,112 ${lx},110 C 200,112 232,98 262,92 C 302,86 322,76 352,72 C 402,66 422,56 452,52 C 502,46 542,38 ${W - R},32`;
  const marks: [number, number][] = [[262, 92], [352, 72], [452, 52]];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`${labelA} vs ${labelB}`}>
      <title>{`${labelA} / ${labelB}`}</title>
      <line x1={L} y1={base} x2={W - R} y2={base} stroke="#d5d8de" strokeWidth={1} />
      <line x1={lx} y1={18} x2={lx} y2={base} stroke="#d5d8de" strokeWidth={1} strokeDasharray="3 4" />
      <text x={lx} y={12} textAnchor="middle" fontSize={10} fontWeight={600} letterSpacing="0.12em" fill="#868991" fontFamily="var(--font-mono)">{launch}</text>
      <path d={a} fill="none" stroke={VIZ.gray} strokeWidth={2} strokeLinecap="round" pathLength={1} className="line-draw" />
      <path d={b} fill="none" stroke={VIZ.accent} strokeWidth={2} strokeLinecap="round" pathLength={1} className="line-draw" style={{ animationDelay: "0.35s" }} />
      {marks.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={4} fill={VIZ.accent} stroke={VIZ.surface} strokeWidth={2} />
          <text x={x} y={y - 11} textAnchor="middle" fontSize={9.5} fontWeight={600} letterSpacing="0.1em" fill="#53565e" fontFamily="var(--font-mono)">{update}</text>
        </g>
      ))}
      <circle cx={W - R} cy={176} r={4} fill={VIZ.gray} stroke={VIZ.surface} strokeWidth={2} />
      <circle cx={W - R} cy={32} r={4} fill={VIZ.accent} stroke={VIZ.surface} strokeWidth={2} />
      <text x={W - R - 10} y={176 + 16} textAnchor="end" fontSize={11.5} fontWeight={600} fill="#53565e">{labelA}</text>
      <text x={W - R - 10} y={32 + 17} textAnchor="end" fontSize={11.5} fontWeight={600} fill="#17181c">{labelB}</text>
    </svg>
  );
}
