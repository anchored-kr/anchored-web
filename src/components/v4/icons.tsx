import type { Glyph as GlyphName, Production } from "@/data/v4";

/** Simple app-icon glyphs (48×48) for each production — drawn in fg, cut-outs in bg. */
export function Glyph({ name, color, bg }: { name: GlyphName; color: string; bg: string }) {
  switch (name) {
    case "flag": {
      const cells = [];
      for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) if ((r + c) % 2 === 0) cells.push(<rect key={`${r}-${c}`} x={14 + c * 6} y={8 + r * 6} width="6" height="6" />);
      return (
        <g fill={color}>
          <rect x="10.5" y="7" width="3" height="34" rx="1.5" />
          {cells}
          <rect x="14" y="8" width="24" height="18" fill="none" stroke={color} strokeWidth="1.6" />
        </g>
      );
    }
    case "horns":
      return (
        <g>
          <g fill={color}>
            <path d="M13 21 L9 6 L21 15 Z" />
            <path d="M35 21 L39 6 L27 15 Z" />
            <path d="M24 13 C33 13 37 19 37 27 C37 36 31 42 24 42 C17 42 11 36 11 27 C11 19 15 13 24 13 Z" />
          </g>
          <g fill={bg}>
            <path d="M15 25 L22 28 L15 30.5 Z" />
            <path d="M33 25 L26 28 L33 30.5 Z" />
            <rect x="19" y="34" width="10" height="2.6" rx="1.3" />
          </g>
        </g>
      );
    case "swarm":
      return (
        <g fill={color}>
          {[
            [14, 16, 3], [22, 12, 2.4], [30, 15, 3.4], [37, 22, 2.2], [18, 24, 2.6], [26, 23, 4.2],
            [34, 30, 3], [14, 32, 2.3], [22, 33, 3.3], [29, 38, 2.4], [38, 37, 1.8], [10, 24, 1.6],
          ].map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} />
          ))}
        </g>
      );
    case "spear":
      return (
        <g>
          <line x1="9" y1="39" x2="30" y2="18" stroke={color} strokeWidth="3.4" strokeLinecap="round" />
          <path d="M27 14 L41 7 L34 21 Z" fill={color} />
          <line x1="22.5" y1="21.5" x2="26.5" y2="25.5" stroke={color} strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    case "spark":
      return <path fill={color} d="M24 6 C25 18 30 23 42 24 C30 25 25 30 24 42 C23 30 18 25 6 24 C18 23 23 18 24 6 Z" />;
    case "rings":
      return (
        <g fill="none" stroke={color} strokeWidth="3.4">
          <circle cx="19" cy="24" r="10" />
          <circle cx="29" cy="24" r="10" />
        </g>
      );
    case "anchor":
      return (
        <svg x="9" y="6.5" width="30" height="35" viewBox="0 0 100 110" fill={color}>
          <path fillRule="evenodd" d="M50 3a11 11 0 1 0 0 22 11 11 0 0 0 0-22zm0 6.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z" />
          <rect x="46.25" y="24" width="7.5" height="70" rx="3.75" />
          <rect x="27" y="36" width="46" height="7" rx="3.5" />
          <path d="M13 58 C13 84 30 97 50 97 C70 97 87 84 87 58" stroke={color} strokeWidth="7.5" strokeLinecap="round" fill="none" />
          <path d="M13 53 L4 70 L22.5 70 Z" />
          <path d="M87 53 L96 70 L77.5 70 Z" />
        </svg>
      );
    case "stage":
      return (
        <g>
          <rect x="19" y="6" width="10" height="19" rx="5" fill={color} />
          <path d="M14 20 a10 10 0 0 0 20 0" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
          <g stroke={color} strokeWidth="3" strokeLinecap="round">
            <line x1="24" y1="31" x2="24" y2="39" />
            <line x1="17" y1="40.5" x2="31" y2="40.5" />
          </g>
        </g>
      );
    case "people":
      return (
        <g fill={color}>
          <circle cx="17" cy="17" r="5.2" />
          <circle cx="31" cy="17" r="5.2" />
          <path d="M6.5 39 a10.5 10.5 0 0 1 21 0 Z" />
          <path d="M20.5 39 a10.5 10.5 0 0 1 21 0 Z" opacity="0.75" />
        </g>
      );
    case "book":
      return (
        <g fill={color}>
          <path d="M23 14 C18 10 12 10 7 12 L7 37 C12 35 18 35 23 39 Z" />
          <path d="M25 14 C30 10 36 10 41 12 L41 37 C36 35 30 35 25 39 Z" opacity="0.7" />
        </g>
      );
    case "radar":
      return (
        <g>
          <polygon points="24,9 39.2,20.1 33.4,37.9 14.6,37.9 8.8,20.1" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" opacity="0.55" />
          <polygon points="24,12.2 32.4,22.3 32.5,36.6 18.4,32.8 12.6,21.3" fill={color} />
        </g>
      );
    case "shell":
      return (
        <g>
          <path fill={color} d="M24 40 L8 20 C10 11 17 7 24 7 C31 7 38 11 40 20 Z" />
          <g stroke={bg} strokeWidth="1.6" strokeLinecap="round">
            <line x1="24" y1="38" x2="12.5" y2="15" />
            <line x1="24" y1="38" x2="18" y2="9.5" />
            <line x1="24" y1="38" x2="24" y2="8.5" />
            <line x1="24" y1="38" x2="30" y2="9.5" />
            <line x1="24" y1="38" x2="35.5" y2="15" />
          </g>
          <rect x="19" y="38" width="10" height="4" rx="1.6" fill={color} />
        </g>
      );
  }
}

const isLight = (hex: string) => {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
};

export function AppIcon({ p, className = "h-[65px] w-[65px]", radius = 10 }: { p: Production; className?: string; radius?: number }) {
  return (
    <span
      className={`relative grid shrink-0 place-items-center overflow-hidden ${className}`}
      style={{ background: p.bg, borderRadius: radius, boxShadow: `inset 0 0 0 1px ${isLight(p.bg) ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)"}` }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 48" className="h-[64%] w-[64%]">
        <Glyph name={p.glyph} color={p.fg} bg={p.bg} />
      </svg>
    </span>
  );
}

/** Poster tile: the production's color, its glyph cropped large, the name set big. */
export function Poster({ p, className = "aspect-[4/3]", nameSize = "clamp(24px, 2.4vw, 34px)", radius = 6 }: { p: Production; className?: string; nameSize?: string; radius?: number }) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: p.bg, color: p.fg, borderRadius: radius }} aria-hidden="true">
      <svg viewBox="0 0 48 48" className="absolute -right-[8%] -top-[14%] h-[92%] w-auto">
        <Glyph name={p.glyph} color={p.fg} bg={p.bg} />
      </svg>
      <span className="absolute bottom-[7%] left-[6%] font-semibold leading-[0.9] tracking-[-0.035em]" style={{ fontSize: nameSize }}>
        {p.name}
      </span>
    </div>
  );
}

/** Brand poster: Anchored blue, white anchor, domain set big. */
export function BrandPoster({ className = "aspect-[4/3]" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[6px] ${className}`} style={{ background: "#0072CE", color: "#ffffff" }} aria-hidden="true">
      <svg viewBox="0 0 48 48" className="absolute left-1/2 top-[44%] h-[58%] w-auto -translate-x-1/2 -translate-y-1/2">
        <Glyph name="anchor" color="#ffffff" bg="#0072CE" />
      </svg>
      <span className="absolute bottom-[7%] left-1/2 -translate-x-1/2 text-[13px] font-medium tracking-[0.08em]">ANCHORED.KR</span>
    </div>
  );
}
