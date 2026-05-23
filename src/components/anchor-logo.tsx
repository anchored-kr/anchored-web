export function AnchorLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="50" cy="14" r="9" stroke="currentColor" strokeWidth="5" fill="none" />
      <circle cx="50" cy="14" r="2.5" fill="currentColor" />
      <rect x="47" y="23" width="6" height="74" rx="3" />
      <rect x="24" y="47" width="52" height="6" rx="3" />
      <path
        d="M18 82 C18 100, 50 110, 50 97"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M82 82 C82 100, 50 110, 50 97"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="18" cy="80" r="4" fill="currentColor" />
      <circle cx="82" cy="80" r="4" fill="currentColor" />
    </svg>
  );
}
