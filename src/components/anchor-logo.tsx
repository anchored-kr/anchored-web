export function AnchorLogo({ className = "w-8 h-8", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="50" cy="16" r="10" stroke={color} strokeWidth="6" fill="none" />
      <circle cx="50" cy="16" r="3" fill={color} />
      <line x1="50" y1="26" x2="50" y2="100" stroke={color} strokeWidth="6" strokeLinecap="round" />
      <line x1="25" y1="50" x2="75" y2="50" stroke={color} strokeWidth="6" strokeLinecap="round" />
      <path
        d="M20 85 C20 100, 50 110, 50 100"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M80 85 C80 100, 50 110, 50 100"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
