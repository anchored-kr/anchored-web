import { AnchorLogo } from "./anchor-logo";

export function Footer() {
  return (
    <footer className="bg-surface-soft border-t border-border">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <AnchorLogo className="w-4 h-4 text-muted" />
          <span className="text-[14px] text-muted">&copy; {new Date().getFullYear()} Anchored</span>
        </div>
        <div className="flex items-center gap-6">
          {[
            { label: "Discord", href: "https://discord.gg/anchored" },
            { label: "X", href: "https://x.com/anchored_kr" },
            { label: "Email", href: "mailto:contact@anchored.kr" },
          ].map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              className="text-[14px] text-muted hover:text-ink transition-colors">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
