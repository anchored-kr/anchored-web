import { AnchorLogo } from "./anchor-logo";

export function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AnchorLogo className="w-4 h-4 text-muted" />
          <span className="text-xs text-muted">&copy; {new Date().getFullYear()} Anchored</span>
        </div>
        <div className="flex items-center gap-6">
          {[
            { label: "Discord", href: "https://discord.gg/anchored" },
            { label: "X", href: "https://x.com/anchored_kr" },
            { label: "Email", href: "mailto:contact@anchored.kr" },
          ].map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              className="text-xs text-muted hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
