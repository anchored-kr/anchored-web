/** Refined admiralty anchor — ring, stock, shank, curved arms with barbed flukes. */
export function AnchorLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 110"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path fillRule="evenodd" d="M50 3a11 11 0 1 0 0 22 11 11 0 0 0 0-22zm0 6.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z" />
      <rect x="46.25" y="24" width="7.5" height="70" rx="3.75" />
      <rect x="27" y="36" width="46" height="7" rx="3.5" />
      <path d="M13 58 C13 84 30 97 50 97 C70 97 87 84 87 58" stroke="currentColor" strokeWidth="7.5" strokeLinecap="round" fill="none" />
      <path d="M13 53 L4 70 L22.5 70 Z" />
      <path d="M87 53 L96 70 L77.5 70 Z" />
    </svg>
  );
}
