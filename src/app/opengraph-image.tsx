import { ImageResponse } from "next/og";

export const alt = "Anchored — We turn IP & content into Roblox games";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Share card. Text is kept to Latin glyphs on purpose: ImageResponse only has the
 * system font here, which has no Korean coverage.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(150deg, #082545 0%, #061d3c 55%, #04152c 100%)",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="52" height="57" viewBox="0 0 100 110" fill="#fff">
            <path
              fillRule="evenodd"
              d="M50 3a11 11 0 1 0 0 22 11 11 0 0 0 0-22zm0 6.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z"
            />
            <rect x="46.25" y="24" width="7.5" height="70" rx="3.75" />
            <rect x="27" y="36" width="46" height="7" rx="3.5" />
            <path
              d="M13 58 C13 84 30 97 50 97 C70 97 87 84 87 58"
              stroke="#fff"
              strokeWidth="7.5"
              strokeLinecap="round"
              fill="none"
            />
            <path d="M13 53 L4 70 L22.5 70 Z" />
            <path d="M87 53 L96 70 L77.5 70 Z" />
          </svg>
          <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: 6 }}>ANCHORED</span>
        </div>

        {/* Satori needs an explicit display on every element with multiple children,
            and has no line-break handling — hence one flex row per line. */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 66, fontWeight: 800, letterSpacing: -1.5 }}>
            We turn IP &amp; content
          </div>
          <div style={{ display: "flex", fontSize: 66, fontWeight: 800, letterSpacing: -1.5 }}>
            into Roblox games.
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#8fc6f5", marginTop: 12 }}>
            Concept → development → launch → LiveOps
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "rgba(255,255,255,0.65)" }}>
          <span>Roblox IP Agency</span>
          <span>anchored.kr</span>
        </div>
      </div>
    ),
    size
  );
}
