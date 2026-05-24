import { AnchorLogo } from "./anchor-logo";

export function Footer() {
  return (
    <footer className="bg-surface-elevated">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AnchorLogo className="w-4 h-4 text-white/40" />
          <span className="text-[14px] text-white/40">&copy; {new Date().getFullYear()} Anchored</span>
        </div>
        <div className="flex items-center gap-6">
          {[
            { label: "Discord", href: "https://discord.gg/anchored" },
            { label: "X", href: "https://x.com/anchored_kr" },
            { label: "Email", href: "mailto:contact@anchored.kr" },
          ].map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              className="text-[14px] text-white/40 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
