export function AnchorLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 110"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="50" cy="12" r="10" stroke="currentColor" strokeWidth="5" fill="none" />
      <circle cx="50" cy="12" r="3" fill="currentColor" />
      <rect x="47" y="22" width="6" height="68" rx="3" />
      <rect x="26" y="44" width="48" height="6" rx="3" />
      <path d="M20 78 C20 96, 50 106, 50 93" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M80 78 C80 96, 50 106, 50 93" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
      <circle cx="20" cy="76" r="4" fill="currentColor" />
      <circle cx="80" cy="76" r="4" fill="currentColor" />
    </svg>
  );
}

export function AnchorLogoHorizontal({ className = "h-8", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 520 100"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Anchor Symbol */}
      <g transform="translate(0, 5)">
        <circle cx="42" cy="10" r="8.5" stroke={color} strokeWidth="4.5" fill="none" />
        <circle cx="42" cy="10" r="2.5" fill={color} />
        <rect x="39.5" y="18.5" width="5" height="58" rx="2.5" />
        <rect x="22" y="38" width="40" height="5" rx="2.5" />
        <path d="M16 66 C16 82, 42 90, 42 79" stroke={color} strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M68 66 C68 82, 42 90, 42 79" stroke={color} strokeWidth="5" strokeLinecap="round" fill="none" />
        <circle cx="16" cy="64.5" r="3.5" fill={color} />
        <circle cx="68" cy="64.5" r="3.5" fill={color} />
      </g>

      {/* ANCHORED Text */}
      <g transform="translate(95, 28)" fill={color}>
        {/* A */}
        <path d="M0 52 L18 0 h8 L44 52 h-9 L31 42 H13 L9 52 H0zM16 34 h12 L22 12 16 34z" />
        {/* N */}
        <path d="M52 0 h8 L84 38 V0 h8 V52 h-8 L60 14 V52 h-8 V0z" />
        {/* C */}
        <path d="M118 0 h24 v8 h-16 v36 h16 v8 h-24 C106 52 100 46 100 34 V18 C100 6 106 0 118 0z" />
        {/* H */}
        <path d="M152 0 h8 V22 h20 V0 h8 V52 h-8 V30 h-20 V52 h-8 V0z" />
        {/* O */}
        <path d="M210 0 h16 C236 0 240 6 240 18 V34 C240 46 236 52 226 52 h-16 C200 52 196 46 196 34 V18 C196 6 200 0 210 0zM212 8 C207 8 204 11 204 18 V34 C204 41 207 44 212 44 h12 C229 44 232 41 232 34 V18 C232 11 229 8 224 8 h-12z" />
        {/* R */}
        <path d="M248 0 h24 C280 0 284 6 284 14 V18 C284 24 281 28 276 30 L288 52 h-10 L266 30 h-10 V52 h-8 V0zM256 8 V22 h14 C275 22 276 18 276 14 V16 C276 11 275 8 270 8 h-14z" />
        {/* E */}
        <path d="M292 0 h32 v8 h-24 V22 h20 v8 h-20 V44 h24 v8 h-32 V0z" />
        {/* D */}
        <path d="M332 0 h20 C364 0 368 6 368 18 V34 C368 46 364 52 352 52 h-20 V0zM340 8 V44 h12 C358 44 360 41 360 34 V18 C360 11 358 8 352 8 h-12z" />
      </g>
    </svg>
  );
}
